#!/usr/bin/env python3
"""Extract every source PDF without turning OCR output into published claims.

Run: python3 scripts/extract_sources.py --workers 4
Requires PyMuPDF and Tesseract. Exact duplicates share extraction artifacts.
No source files are changed. All paths in output are relative to --root.
"""
from __future__ import annotations

import argparse
import concurrent.futures
import csv
import hashlib
import io
import json
import os
import shutil
import subprocess
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

import fitz

SCHEMA_VERSION = 1
PIPELINE_VERSION = "1.0.0"
SKIP_DIRS = {".git", "node_modules", ".next", ".venv", "venv", "extractions"}


def dump(path: Path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temporary.replace(path)


def digest(path: Path):
    hasher = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def discover(root: Path):
    files = []
    for directory, dirs, names in os.walk(root, followlinks=False):
        dirs[:] = sorted(d for d in dirs if d not in SKIP_DIRS)
        for name in sorted(names):
            path = Path(directory) / name
            if path.is_file() and not path.is_symlink() and path.suffix.lower() == ".pdf":
                files.append(path)
    return sorted(files)


def ocr_words(tsv, width_points, height_points, width_pixels, height_pixels):
    words = []
    for row in csv.DictReader(io.StringIO(tsv), delimiter="\t", quoting=csv.QUOTE_NONE):
        if row.get("level") != "5" or not row.get("text", "").strip():
            continue
        left, top, width, height = [int(row[k]) for k in ("left", "top", "width", "height")]
        words.append({
            "text": row["text"], "confidence": float(row["conf"]),
            "bbox_pixels": [left, top, left + width, top + height],
            "bbox_points": [round(left / width_pixels * width_points, 3),
                            round(top / height_pixels * height_points, 3),
                            round((left + width) / width_pixels * width_points, 3),
                            round((top + height) / height_pixels * height_points, 3)],
            "block": int(row["block_num"]), "paragraph": int(row["par_num"]),
            "line": int(row["line_num"]), "word": int(row["word_num"]),
        })
    return words


def extract_lines(words):
    groups = defaultdict(list)
    for word in words:
        groups[(word["block"], word["paragraph"], word["line"])].append(word)
    lines = []
    for key, group in groups.items():
        bbox = [min(w["bbox_points"][0] for w in group), min(w["bbox_points"][1] for w in group),
                max(w["bbox_points"][2] for w in group), max(w["bbox_points"][3] for w in group)]
        lines.append({"block": key[0], "paragraph": key[1], "line": key[2],
                      "bbox_points": bbox, "text": " ".join(w["text"] for w in group),
                      "word_indexes": [words.index(w) for w in group]})
    return lines


def spatial_rows(words):
    """Unverified geometric rows: preserve x order without pretending to infer cells."""
    rows = []
    for index, word in sorted(enumerate(words), key=lambda item: (item[1]["bbox_points"][1], item[1]["bbox_points"][0])):
        x0, y0, x1, y1 = word["bbox_points"]
        center = (y0 + y1) / 2
        candidate = next((r for r in reversed(rows[-6:])
                          if abs(r["y_center"] - center) <= max(2.0, min(r["height"], y1 - y0) * .45)), None)
        if candidate is None:
            candidate = {"y_center": center, "height": y1-y0, "word_indexes": []}
            rows.append(candidate)
        candidate["word_indexes"].append(index)
    for row in rows:
        row["word_indexes"].sort(key=lambda i: words[i]["bbox_points"][0])
        row["y_center"] = round(row["y_center"], 3)
        row["height"] = round(row["height"], 3)
        row["text"] = " | ".join(words[i]["text"] for i in row["word_indexes"])
    return rows


def extract_document(job):
    root = Path(job["root"])
    source = job["document"]
    output = root / source["extraction_directory"]
    output.mkdir(parents=True, exist_ok=True)
    pages = []
    document = fitz.open(root / source["canonical_path"])
    source["page_count"] = len(document)
    combined = []
    for index, page in enumerate(document):
        number = index + 1
        stem = "page-%03d" % number
        metadata_path = output / (stem + ".json")
        if metadata_path.exists() and not job["force"]:
            cached = json.loads(metadata_path.read_text())
            if cached.get("source_sha256") == source["sha256"] and cached.get("pipeline_version") == PIPELINE_VERSION and cached.get("status") == "EXTRACTED":
                pages.append(cached)
                combined.append("\n\n===== PAGE %s =====\n%s" % (number, cached["text"]))
                continue
        native = page.get_text("text", sort=True).strip()
        words = []
        native_tables = []
        warnings = []
        method = "NATIVE_TEXT" if len(native) >= job["native_min_chars"] else "TESSERACT_OCR"
        pix = page.get_pixmap(matrix=fitz.Matrix(job["dpi"] / 72, job["dpi"] / 72), alpha=False)
        preview_path = output / (stem + ".jpg")
        pix.save(preview_path, jpg_quality=85)
        text = native
        status = "EXTRACTED"
        tsv_ref = None
        if method == "TESSERACT_OCR":
            temp_image = output / (stem + ".ocr-input.png")
            pix.save(temp_image)
            target = output / (stem + ".ocr")
            try:
                proc = subprocess.run([job["tesseract"], str(temp_image), str(target),
                                       "-l", job["language"], "--psm", "3", "--dpi", str(job["dpi"]), "txt", "tsv"],
                                      capture_output=True, text=True, timeout=job["timeout"],
                                      env={**os.environ, "OMP_THREAD_LIMIT": "1"})
                if proc.returncode:
                    raise RuntimeError("Tesseract exit %s: %s" % (proc.returncode, proc.stderr[-1200:]))
                text_path = output / (stem + ".ocr.txt")
                tsv_path = output / (stem + ".ocr.tsv")
                text = text_path.read_text(encoding="utf-8").strip()
                words = ocr_words(tsv_path.read_text(encoding="utf-8"), page.rect.width, page.rect.height, pix.width, pix.height)
                tsv_ref = tsv_path.relative_to(root).as_posix()
                if not text:
                    warnings.append("NO_TEXT_DETECTED: inspect source page for image-only content or OCR failure")
            except Exception as exc:
                status = "FAILED"
                warnings.append(str(exc))
            finally:
                temp_image.unlink(missing_ok=True)
        else:
            for item in page.get_text("words", sort=True):
                words.append({"text": item[4], "confidence": None,
                              "bbox_points": list(item[:4]), "block": item[5], "paragraph": 0,
                              "line": item[6], "word": item[7]})
            try:
                for table in page.find_tables().tables:
                    native_tables.append({"bbox_points": list(table.bbox), "rows": table.extract(),
                                          "row_count": table.row_count, "column_count": table.col_count,
                                          "review_status": "NEEDS_REVIEW"})
            except Exception as exc:
                warnings.append("Native table extraction unavailable: " + str(exc))
        images = []
        for item in page.get_images(full=True):
            xref = item[0]
            try:
                rects = [list(rect) for rect in page.get_image_rects(xref)]
            except Exception:
                rects = []
            images.append({"xref": xref, "width": item[2], "height": item[3], "bbox_points": rects,
                           "source_page": number, "source_document_id": source["id"],
                           "review_status": "NEEDS_REVIEW", "asset_reference": preview_path.relative_to(root).as_posix()})
        confidences = [w["confidence"] for w in words if w["confidence"] is not None and w["confidence"] >= 0]
        metadata = {
            "schema_version": SCHEMA_VERSION, "pipeline_version": PIPELINE_VERSION,
            "source_document_id": source["id"], "source_sha256": source["sha256"],
            "source_path": source["canonical_path"], "page_number": number,
            "extraction_method": method, "status": status, "review_status": "NEEDS_REVIEW",
            "width_points": page.rect.width, "height_points": page.rect.height,
            "render_dpi": job["dpi"], "render_width_pixels": pix.width, "render_height_pixels": pix.height,
            "native_character_count": len(native), "text": text, "character_count": len(text),
            "words": words, "lines": extract_lines(words), "spatial_rows": spatial_rows(words),
            "table_extraction": {"status": "EXTRACTED_UNVERIFIED" if native_tables else "NEEDS_VISUAL_REVIEW",
                                 "tables": native_tables,
                                 "note": "Raster tables are not inferred as logical cells. Word bounding boxes, geometric rows, raw TSV and page image preserve the original layout for review."},
            "image_references": images, "page_image": preview_path.relative_to(root).as_posix(),
            "ocr_tsv": tsv_ref,
            "mean_word_confidence": round(sum(confidences) / len(confidences), 2) if confidences else None,
            "low_confidence_word_count": sum(c < 60 for c in confidences),
            "confidence_note": "OCR recognition confidence is not a confidence or verification score for business claims.",
            "warnings": warnings,
        }
        (output / (stem + ".txt")).write_text(text + "\n", encoding="utf-8")
        if native:
            (output / (stem + ".native.txt")).write_text(native + "\n", encoding="utf-8")
        dump(metadata_path, metadata)
        pages.append(metadata)
        combined.append("\n\n===== PAGE %s =====\n%s" % (number, text))
    document.close()
    (output / "full-text.txt").write_text("".join(combined).lstrip() + "\n", encoding="utf-8")
    summary_fields = ["page_number", "extraction_method", "status", "review_status", "character_count",
                      "mean_word_confidence", "low_confidence_word_count", "page_image", "ocr_tsv", "warnings"]
    source["pages"] = [{**{k: page[k] for k in summary_fields},
                        "page_json": (output / ("page-%03d.json" % page["page_number"])).relative_to(root).as_posix(),
                        "page_text": (output / ("page-%03d.txt" % page["page_number"])).relative_to(root).as_posix()}
                       for page in pages]
    source["document_type"] = "SCANNED_BROCHURE_OR_CATALOGUE"
    source["text_type"] = "SCANNED_IMAGE_BASED" if all(p["extraction_method"] == "TESSERACT_OCR" for p in pages) else "TEXT_NATIVE_OR_MIXED"
    source["extraction_status"] = "EXTRACTED" if all(p["status"] == "EXTRACTED" for p in pages) else "PARTIALLY_FAILED"
    source["review_status"] = "NEEDS_REVIEW"
    source["full_text"] = (output / "full-text.txt").relative_to(root).as_posix()
    source["extracted_character_count"] = sum(p["character_count"] for p in pages)
    dump(output / "document.json", source)
    return source


def write_inventory(root, manifest):
    rows = ["# YRC source inventory", "", "Generated by `python3 scripts/extract_sources.py --workers 4`.", "",
            "Every discovered PDF is listed below. Exact SHA-256 duplicates share page artifacts; original files are preserved.",
            "Extraction is machine OCR and **NEEDS_REVIEW**. No company identity, technical value, certification, price or claim has been verified or published.", "",
            "## Coverage", "",
            "- PDF files: %s" % manifest["totals"]["pdf_files"],
            "- Unique source documents: %s" % manifest["totals"]["unique_documents"],
            "- Pages across physical files: %s" % manifest["totals"]["physical_pages"],
            "- Unique pages processed: %s" % manifest["totals"]["unique_pages"],
            "- Failed pages: %s" % manifest["totals"]["failed_pages"], "",
            "## Per-file records", ""]
    lookup = {doc["id"]: doc for doc in manifest["documents"]}
    annotations_path = root / "data" / "source-annotations.json"
    annotations = json.loads(annotations_path.read_text()) if annotations_path.exists() else {}
    for file in manifest["files"]:
        doc = lookup[file["source_document_id"]]
        ann = annotations.get(doc["id"], annotations.get(doc["canonical_path"], {})) if isinstance(annotations, dict) else {}
        rows += ["### " + file["path"], "",
                 "- Source ID: `%s`" % doc["id"],
                 "- Detected company/brand: %s" % ann.get("company", "Pending evidence review; filename label: " + Path(file["path"]).stem),
                 "- Document type: %s" % doc.get("document_type", "PENDING"),
                 "- Pages: %s; source form: %s" % (doc.get("page_count"), doc.get("text_type", "PENDING")),
                 "- Categories represented: %s" % ", ".join(ann.get("categories", ["Pending all-document semantic review"])),
                 "- Extraction: %s; review: NEEDS_REVIEW" % doc.get("extraction_status"),
                 "- Traceability: `%s`; `%s`" % (doc["extraction_directory"], doc.get("full_text", "PENDING")),
                 "- Tables/images/specifications: per-page image, image xrefs, words with coordinates, OCR TSV, geometric rows and native tables where detectable. Raster table cells require manual validation.",
                 "- Confidence/review: OCR word confidence is recorded per page; it is not a verification of claims. Company names, model identifiers, units and all values must be checked against the source page.",
                 "- SHA-256: `%s`" % file["sha256"],
                 "- Duplicate of: %s" % ("`" + doc["canonical_path"] + "`" if file["path"] != doc["canonical_path"] else "none (canonical source)"), ""]
    rows += ["## Extraction contract and limitations", "",
             "Every unique page has JSON, extracted text and a JPEG review image. OCR pages also preserve Tesseract's raw TSV, including block/paragraph/line/word relationships and pixel coordinates. JSON adds PDF-point bounding boxes and geometric row groups; those groups do not assert table cells or headers. Technical diagrams, imagery and full scan boundaries remain accessible through their page images and original PDF image xrefs. Technical tables require visual cell-by-cell validation before structured specifications may be approved.", "",
             "The machine manifest is `data/source-manifest.json`. Identity, taxonomy and semantic annotations are reviewed in `docs/YRC_MASTER_CATALOGUE.md` and `docs/YRC_PRODUCT_TAXONOMY.md`; this inventory reports extraction coverage and explicitly retains unknown values.", "",
             "The extractor does not edit any source document or project configuration, does not send content to an external API and never changes approval or publication state."]
    (root / "docs" / "YRC_SOURCE_INVENTORY.md").write_text("\n".join(rows) + "\n", encoding="utf-8")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--workers", type=int, default=4)
    parser.add_argument("--dpi", type=int, default=150)
    parser.add_argument("--timeout", type=int, default=90)
    parser.add_argument("--native-min-chars", type=int, default=80)
    parser.add_argument("--language", default="eng")
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    if not 1 <= args.workers <= 8 or not 72 <= args.dpi <= 300 or args.timeout < 1:
        parser.error("workers must be 1..8, dpi 72..300 and timeout positive")
    root = args.root.resolve()
    tesseract = shutil.which("tesseract")
    if not tesseract:
        parser.error("Tesseract is required for scanned pages")
    files = []
    documents = {}
    for path in discover(root):
        sha256 = digest(path)
        relative = path.relative_to(root).as_posix()
        source_id = "src_" + sha256[:16]
        files.append({"path": relative, "size_bytes": path.stat().st_size, "sha256": sha256,
                      "source_document_id": source_id})
        if source_id not in documents:
            with fitz.open(path) as pdf:
                pages = len(pdf)
            documents[source_id] = {"id": source_id, "sha256": sha256, "canonical_path": relative,
                                    "original_files": [], "page_count": pages,
                                    "extraction_directory": "data/extractions/" + source_id,
                                    "extraction_status": "PROCESSING", "review_status": "NEEDS_REVIEW",
                                    "detected_company": None, "categories": [], "pages": []}
        documents[source_id]["original_files"].append(relative)
    version = subprocess.run([tesseract, "--version"], capture_output=True, text=True).stdout.splitlines()[0]
    manifest = {"schema_version": SCHEMA_VERSION, "pipeline_version": PIPELINE_VERSION,
                "generated_at": datetime.now(timezone.utc).isoformat(),
                "status": "PROCESSING", "review_status": "NEEDS_REVIEW",
                "tools": {"python": sys.version.split()[0], "pymupdf": fitz.VersionBind,
                          "tesseract": version, "ocr_language": args.language, "render_dpi": args.dpi,
                          "ocr_psm": 3, "timeout_seconds_per_page": args.timeout},
                "files": files, "documents": list(documents.values()), "totals": {}}
    manifest_path = root / "data/source-manifest.json"
    dump(manifest_path, manifest)
    print("DISCOVERED files=%s unique_documents=%s unique_pages=%s" %
          (len(files), len(documents), sum(d["page_count"] for d in documents.values())), flush=True)
    jobs = [{"root": str(root), "document": doc, "dpi": args.dpi, "timeout": args.timeout,
             "tesseract": tesseract, "language": args.language, "native_min_chars": args.native_min_chars,
             "force": args.force} for doc in documents.values()]
    errors = []
    with concurrent.futures.ProcessPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(extract_document, job): job for job in jobs}
        for future in concurrent.futures.as_completed(futures):
            job = futures[future]
            try:
                result = future.result()
                documents[result["id"]] = result
                print("COMPLETE %s pages=%s characters=%s status=%s" %
                      (result["canonical_path"], result["page_count"], result["extracted_character_count"], result["extraction_status"]), flush=True)
            except Exception as exc:
                doc = documents[job["document"]["id"]]
                doc["extraction_status"] = "FAILED"
                doc["error"] = str(exc)
                errors.append({"source_document_id": doc["id"], "error": str(exc)})
                print("FAILED %s %s" % (doc["canonical_path"], exc), flush=True)
            manifest["documents"] = list(documents.values())
            dump(manifest_path, manifest)
    manifest["totals"] = {
        "pdf_files": len(files), "unique_documents": len(documents),
        "duplicate_files": len(files) - len(documents),
        "physical_pages": sum(documents[f["source_document_id"]]["page_count"] for f in files),
        "unique_pages": sum(doc["page_count"] for doc in documents.values()),
        "extracted_pages": sum(page["status"] == "EXTRACTED" for doc in documents.values() for page in doc["pages"]),
        "failed_pages": sum(page["status"] == "FAILED" for doc in documents.values() for page in doc["pages"]),
        "ocr_pages": sum(page["extraction_method"] == "TESSERACT_OCR" for doc in documents.values() for page in doc["pages"]),
        "native_pages": sum(page["extraction_method"] == "NATIVE_TEXT" for doc in documents.values() for page in doc["pages"]),
        "empty_pages": sum(page["character_count"] == 0 for doc in documents.values() for page in doc["pages"]),
        "characters": sum(doc.get("extracted_character_count", 0) for doc in documents.values()),
    }
    manifest["errors"] = errors
    manifest["status"] = "EXTRACTED" if not errors and not manifest["totals"]["failed_pages"] else "PARTIALLY_FAILED"
    dump(manifest_path, manifest)
    write_inventory(root, manifest)
    print("TOTALS " + json.dumps(manifest["totals"]), flush=True)
    return 0 if manifest["status"] == "EXTRACTED" else 1


if __name__ == "__main__":
    raise SystemExit(main())
