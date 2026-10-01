import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const docId = searchParams.get("docId"); // e.g. "src_144681700dd4d80e" or document UUID
  const pageParam = searchParams.get("page") || "1";

  if (!docId) {
    return new NextResponse("Missing docId parameter", { status: 400 });
  }

  const pageNum = parseInt(pageParam, 10);
  const formattedPage = `page-${String(isNaN(pageNum) ? 1 : pageNum).padStart(3, "0")}.jpg`;

  // Find doc to resolve extraction directory
  let extractionFolder = docId;

  // If docId is a UUID, find the document in DB to get originalFilename
  if (docId.includes("-") && docId.length > 20) {
    const doc = await prisma.document.findUnique({ where: { id: docId } });
    if (doc) {
      // Find matching manifest entry by sha256
      try {
        const manifestPath = path.resolve(process.cwd(), "data/source-manifest.json");
        const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
        const match = manifest.documents.find((d: any) => d.sha256 === doc.sha256);
        if (match) {
          extractionFolder = match.id;
        }
      } catch (e) {}
    }
  }

  const imagePath = path.resolve(
    process.cwd(),
    "data/extractions",
    extractionFolder,
    formattedPage
  );

  if (!fs.existsSync(imagePath)) {
    // Fallback to page-001.jpg if requested page doesn't exist
    const fallbackPath = path.resolve(
      process.cwd(),
      "data/extractions",
      extractionFolder,
      "page-001.jpg"
    );
    if (fs.existsSync(fallbackPath)) {
      const fallbackBuffer = fs.readFileSync(fallbackPath);
      return new NextResponse(fallbackBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        },
      });
    }
    return new NextResponse("Preview image not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(imagePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
