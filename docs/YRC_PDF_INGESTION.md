# YRC PDF ingestion

Status: Phase 0 design and discovery in progress; implementation evidence is recorded in the implementation plan.

## Source contract

Original files are immutable evidence. A streaming SHA-256 identifies document content; source filenames are aliases, not company identity. Keep duplicate-file inventory entries while extracting identical bytes once. Pages are 1-based throughout the application. Store size, media type, content hash, page count, uploader, storage key, extraction version, status and timestamps. A re-run creates a new extraction version, not silent replacement of reviewed facts.

Source discovery found 36 PDFs / 320 physical pages. All pages lack native text; use OCR for this corpus. Page counts, unique content counts, and extraction outcomes are authoritative in `data/source-manifest.json` once extraction completes. The three JPEGs comprise the supplied logo and two handwritten business notes.

## Extraction stages

1. Register an upload in private quarantine after extension, declared MIME, magic bytes, size, and PDF parser checks. Reject encrypted, corrupt, oversized, excessive-page, or unsupported documents. Limit per-user upload rate and storage.
2. Enqueue a durable job with content hash and extraction version as its idempotency key. OCR must run out of the HTTP request in a non-root, resource-limited process/container with no network and no inherited secrets.
3. Prefer native page text and tables. OCR only pages with insufficient native text. Bound raster pixel dimensions, time per page, document duration, and concurrency. Record partial failures explicitly.
4. Retain page text and word bounding boxes. Raster references preserve diagrams, photographed product labels and tables. OCR reading order is not proof of a table's row/column relations: preserve page imagery, cell coordinates where reliable, and mark unvalidated cells for review.
5. Classify company/product/solution/service/project candidates with exact evidence excerpts and page links. Company names from filenames are suggestions; legal names must be read from content and confirmed. Product specifications require units, row/column context and item/model association.
6. Validate schema, page bounds, company association, units, duplicate candidates and unsupported fields. Missing facts stay null. Brochure claims of standards, certifications, customer relationships or environmental benefit are unverified claims.
7. Review candidates alongside the original page. A human with catalogue review permission may correct a revision, reject it, or approve it with a note. Publication is a separate permission and transaction.
8. Public catalogue/search/AI indexes consume only published revisions. Rejection, archival or withdrawal invalidates indexes/caches. Original evidence remains private unless redistribution is authorized.

## State machine

`UPLOADED -> PROCESSING -> EXTRACTED -> NEEDS_REVIEW -> APPROVED -> PUBLISHED`

Rejection is available from review; archival is available to authorized staff. Transitions are explicit server operations, checked against current state and version, and audited. Failed extraction does not mean rejected commercial content: retain a job failure with retry metadata and keep the document out of public results. Editing an approved record creates a new draft revision; it cannot silently alter the published snapshot.

Document approval and item approval are distinct. An approved document does not approve every extracted item or authorize redistribution of the PDF. Publication must validate the item and each displayed important claim, not merely its parent company.

## Provenance

Each evidence record carries document ID/hash, page number, field path, raw excerpt, extraction method/version, bounding box or table cell coordinates when available, confidence and human review record. Confidence measures extraction uncertainty, not truth. Keep source units alongside normalized values. Never auto-correct a model number or engineering rating without an evidence-backed review.

## Adapters and development

Local storage lives in ignored `var/uploads`, never under `public`. S3-compatible storage replaces the same private blob interface in production. Local workers can run the reproducible Python script; production workers use a dedicated sandbox image with pinned OCR/PDF dependencies. A model extraction adapter is optional and disabled without configured credentials. Deterministic import candidates still require review. Documents are untrusted data and must never be interpreted as tool instructions.

## Validation gates

- Every discovered path represented, including duplicates; content hashes stable.
- Every unique page has text or explicit failed/empty status, plus source-page link.
- Dense tables retain original visual geometry; uncertain cells remain unresolved.
- Repeated import is idempotent and cannot reset human approval.
- Unauthorized download, traversal, malformed PDF and oversize payload rejected.
- Imported data is invisible publicly before separate human approval and publication.
- All state transitions, correction history and rejected transitions covered by tests.
