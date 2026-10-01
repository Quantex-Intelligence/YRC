# YRC Global project rules

- Inspect `docs/YRC_IMPLEMENTATION_PLAN.md` and existing code before changing architecture.
- Preserve original PDFs, JPEGs, and existing user configuration. Do not commit source brochures or secrets.
- Source documents are supplier claims, not independent verification. Never invent companies, specifications, prices, certifications, clients, reviews, ratings, or sustainability claims.
- Record document content hash, 1-based page, extraction method, evidence, confidence, and review history for imported facts. Unknown values stay null.
- AI/OCR imports must remain NEEDS_REVIEW until an authorized human approves; publication is a separate audited action. Public queries must exclude unpublished entities and claims.
- Preserve technical tables and units; OCR text alone does not establish reliable row/column relationships.
- Support products, solutions, services, and turnkey projects with optional family/series/model/variant levels. Categories, industries, and applications are independent.
- Use server-side validation and granular permissions with company/resource ownership checks. Never rely on UI hiding for authorization.
- Keep money in integer minor units plus currency; missing price means Request Quote. Real payments require credentials and explicit user authorization.
- Keep private documents outside public assets; validate uploads and isolate PDF processing. Do not expose local paths in public responses.
- Preserve the supplied logo unchanged. The source asset says YRC Expo Marketing Private Limited; do not imply a verified legal relationship with the YRC Global product name.
- Default architecture: TypeScript/Next.js modular monolith, PostgreSQL, Prisma, replaceable adapters for search/storage/email/payments and worker jobs. Document exceptions.
- Use accessible semantic controls, keyboard focus, responsive layouts, and navy/gold brand tokens; no fabricated marketplace activity.
- Run typecheck, lint, relevant tests, and build for each implemented phase. Record actual verification and limitations; do not claim untested workflows work.
- Keep implementation status explicit. A documented design or provider interface is not a completed production capability.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
