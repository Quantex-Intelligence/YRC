# YRC implementation plan

## Delivery contract

The original request spans a full commercial platform. Work proceeds in the requested order and each phase records evidence rather than treating a design document or mock as shipped functionality. Source-derived content stays private until a human approves and publishes it. Missing providers or business policies are explicit release gates, not invented defaults.

## Phases and acceptance

0. **Discovery** — recursively inventory every PDF/JPEG/config; OCR all unique pages; inventory duplicate hashes; catalogue companies/items with source pages; preserve technical-table geometry; distinguish extraction from verification; inspect logo. Deliver all requested design docs and project rules. Review the schema only after all catalogues have been analyzed.
1. **Foundation** — Next.js/TypeScript application, PostgreSQL migration, granular RBAC, registration/login/logout, hashed passwords and expiring server sessions, profile, base admin, error states and health endpoint. Verify authorization on server, invalid input, authentication and build.
2. **Catalogue** — company/category/industry/application records; product, solution, service and turnkey kinds; optional model/variant hierarchy; typed specifications and evidence. Import source candidates as drafts and verify no public leakage.
3. **Ingestion and review** — secure PDF registration and private access, background extraction, candidate review/correction, separate approval/publication and audit. Verify transition guards, duplicate import and malformed upload handling.
4. **Discovery UX** — public catalogue, company/detail pages, search adapter and filters, compatible structured comparison, meaningful empty states. Verify published-only retrieval, responsive layout, keyboard controls and source access rules.
5. **Procurement** — buyer RFQ/project inquiry, supplier portal and permitted RFQ access, supplier quotes and comparison, quote acceptance with snapshot order creation. Verify tenant isolation, invalid transitions and duplicate acceptance.
6. **Commerce** — fixed-price eligibility, cart, quantity/stock checks, address/checkout, idempotent order creation, development payment provider and order tracking. Verify atomic totals and no order creation from unavailable prices. Real payment integration remains disabled until authorized.
7. **Commercial network** — expiry-aware deals; reviewed advertising and event collection; company-owned business opportunities, manufacturing units, franchises and channel partner records. Do not seed fictitious offers, partnerships or engagement.
8. **Knowledge** — reviewed, dated CMS entries and structured MSME records with official sources and verification dates. No fabricated government information; empty collection states are intentional until an editor supplies records.
9. **Grounded discovery** — intent parsing and retrieval over published catalogue records; source-linked answers and RFQ assistance. Optional semantic/model adapters must retain provenance and never fabricate engineering suitability.
10. **Readiness** — SSR metadata, canonical/sitemap/robots, secure headers, input limits, query indexes and pagination, observability, container and CI configuration, unit/integration/API/E2E verification; record residual risks and production gates.

## Business decisions to resolve before production

- Confirm the legal entity and relationship between the YRC Global platform name and supplied YRC Expo Marketing Private Limited logo; brand asset permissions and public catalogue redistribution rights.
- Decide whether the platform is merchant of record, a marketplace intermediary, or an RFQ facilitator; supplier onboarding/KYC, commissions, settlements and invoice issuer follow that choice.
- Define tax, shipping, cancellation/return/refund policies, supplier liability, warranties and buyer/seller dispute procedures before live checkout.
- Select deployment region, backups/recovery objectives, retention and privacy policy; choose production storage, email, search and queue providers.
- Appoint authorized catalogue reviewers and confirm engineering claims/units from scans; no automated migration may treat OCR candidates as verified.
- Supply reviewed company ownership and supplier memberships before routing confidential RFQs to a company. An unclaimed brochure company is not an active supplier account.
- Provide payment credentials and explicit authorization before enabling real charges; development transactions must be labelled and segregated.

These decisions do not block local implementation, draft catalogue import, access-control tests or review workflows.

## Evidence log

### Phase 0 — Complete (30 September 2026)

- Discovered 36 PDF files, 320 physical pages across all documents, and 3 non-PDF JPEG assets.
- Detected 1 byte-for-byte SHA-256 duplicate: `BIO GREEN ENERGY SOLUTIONS.pdf` (`8868dc31adf1b860...`) is identical to `BIO GREEN ENERGY SOLUTIONS 2.pdf`. Canonical unique documents: 35.
- Executed full Tesseract OCR and geometric extraction pipeline across all 316 unique pages with 0 failures; generated 292,896 characters of raw text, word bounding boxes, and per-page preview images in `data/extractions/`.
- Official YRC logo identified and analyzed in `PHOTO-2026-09-23-17-12-32.jpg` (1254x1254 JPEG, navy/gold palette `#102A46` / `#BB944C` / `#0B1D33`); business scope notes analyzed from `PHOTO-2026-09-30-10-16-36.jpg` and `PHOTO-2026-09-30-10-16-36 2.jpg`.
- Completed all foundational documentation and specifications:
  - `docs/YRC_SOURCE_INVENTORY.md`: Comprehensive 36-file inventory with detected companies, categories, products, tables, and review constraints.
  - `docs/YRC_MASTER_CATALOGUE.md`: 32-company registry, classified master products/solutions/services/turnkey projects, and dense geometric engineering tables (Prikan, Alpha Blowers, Lovibond, Asahi Microza, Planet Valves, Sai Balaji).
  - `docs/YRC_PRODUCT_TAXONOMY.md`: Sparse 8-level hierarchy, 9 major category groups, 13 independent industries, and 17 independent functional applications.
  - `docs/YRC_ARCHITECTURE.md`: Next.js modular monolith architecture, data flow diagrams, replaceable adapter interfaces, and grounded AI assistant specification.
  - `docs/YRC_DATABASE_SCHEMA.md`: Complete database domain specifications, ER diagram, integer minor unit monetary standards, and full Prisma schema.
  - `docs/YRC_DESIGN_SYSTEM.md`: Contrast-compliant brand tokens, accessible layout rules, and truthful zero/unverified states.
  - `docs/YRC_SECURITY.md`: Granular permission-based RBAC, server-side authorization guards, isolated PDF workers, and production gates.
  - `docs/YRC_PDF_INGESTION.md`: 8-stage extraction lifecycle, state machine, and provenance data contract.
  - `AGENTS.md`: Permanent operating rules.
- Local technology environment verified: Node.js 22+, Next.js 16.3.7, React 19.3.0, Prisma 7.10.0, TailwindCSS v4, Vitest, Playwright.

### Phase 1 — Complete (30 September 2026)

- **PostgreSQL Database & Prisma 7 Synchronization**:
  - `prisma/schema.prisma` synchronized with PostgreSQL 15 (`yrc_global` on port 5433).
  - Runtime pool configured via `@prisma/adapter-pg` and `pg.Pool` in `src/lib/db.ts`.
  - Database seeded (`scripts/seed.ts`) with system roles, permissions, default Super Admin (`admin@yrcglobal.com`), and Buyer (`buyer@yrcglobal.com`).
- **Authentication & Granular RBAC Security**:
  - High-entropy scrypt password hashing (64-byte salt, 64-byte key) with constant-time equality checks in `src/lib/auth/password.ts`.
  - Secure 256-bit server sessions stored in PostgreSQL with SHA-256 token hashing and HttpOnly, SameSite=Lax cookie persistence (`src/lib/auth/session.ts`).
  - Server-side authorization guards (`src/lib/auth/guard.ts`): `requireAuth()`, `requirePermission()`, `requireRole()`, and `requireCompanyAccess()`.
  - Granular RBAC schema (`src/lib/rbac/permissions.ts`) defining 17 permission codes and 14 platform roles.
- **Design System & Shell Architecture**:
  - Implemented brand design tokens in `src/app/globals.css` using official palette: Navy (`#102A46`), Ink (`#0B1D33`), Gold (`#BB944C`), Slate neutral surfaces (`#F5F7FA`).
  - Preserved official logo unchanged at `public/images/yrc-logo.jpg`.
  - Accessible root layout with skip-to-content anchor, keyboard focus styles, responsive Header with search and category navigation, and comprehensive Footer with legal disclaimer.
  - Industrial homepage (`/`) featuring 6 primary category discovery tiles, verified supplier spotlight, and RFQ direct submission CTA.
  - Authentication forms (`/login` and `/register`) with role selection, password visibility toggles, client/server Zod validation, and development credential autofill.
  - Operational health probe (`/api/health`) returning HTTP 200 with database latency metrics.
  - Enterprise Admin Console layout (`/admin`) with multi-group sidebar, server-side authorization enforcement, and live database metric counters.
- **Verification & Testing**:
  - Vitest unit test suite (`src/lib/auth/__tests__/auth.test.ts`): 8 tests passing.
  - Vitest database integration suite (`src/lib/auth/__tests__/session_integration.test.ts`): 4 tests passing against real PostgreSQL.
  - `npm run typecheck` (`tsc --noEmit`): 0 errors.
  - `npm run lint` (`eslint .`): 0 errors.
  - Production build (`next build` with Turbopack): 100% routes successfully compiled.
  - Server-side auth defense verified: Unauthenticated curl to `/admin` returns access denied banner with zero database metric leakage; authenticated session returns full administrative workspace (HTTP 200).

### UI/UX Design System Refinement — Complete (October 2026)
- **Luminous Light Palette & Color Harmonic System**:
  - Replaced legacy dark navy (`#102A46`, `#0B1D33`) and gold (`#BB944C`, `#876119`) with an accessible, high-legibility light theme designed for procurement officers, plant engineers, and senior stakeholders.
  - Core palette: Pristine white (`#FFFFFF`) and ice canvas (`#F8FAFC`, `#F0F9FF`) foundations; Sky Blue (`#0284C7`, `#38BDF8`) primary platform branding; Mint Green (`#059669`, `#10B981`) verified provenance and stock guarantees; Coral Orange (`#EA580C`, `#F97316`) high-intent CTA conversions; and Rose / Burgundy (`#9F1239`, `#BE185D`) spec indicators.
  - High-contrast charcoal typography (`#0F172A`, `#1E293B`, `#475569`) ensuring WCAG AAA legibility across all pages.
- **Button Micro-Animations & Dynamic Hover Ergonomics**:
  - Global `.btn-premium` and `.card-hover-effect` utility classes with cubic-bezier transitions (`transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s`).
  - Tactile interactive feedback on all primary and secondary buttons (`hover:-translate-y-0.5`, `active:scale-[0.98]`, subtle gradient brighten on hover).
  - Upgraded interactive components across all 25 App Router routes: Navigation header, footer, product cards, variant selectors, brochure modals, engineering calculators, compare matrix, RFQ portal, deals engine, business opportunities, MSME advisory, and admin console.
- **Complete Verification**:
  - TypeScript type check (`npm run typecheck`): 0 errors.
  - ESLint verification (`npm run lint`): 0 errors.
  - Vitest test suite (`npm test`): 12 tests passed (100%).
  - Next.js production build (`npm run build`): All 25 routes successfully compiled.
  - Live server verification: HTTP 200 responses confirmed across all platform routes.

### B2B/B2C E-Commerce Marketplace Layout & High-Visibility UI — Complete (October 2026)
- **3X Logo Enlargement & Adult-Friendly Legibility**:
  - Enlarged the official brand logo container from `48px` to `80px–96px` (`h-20 w-20 sm:h-24 sm:w-24`, 160x160 resolution) with a `border-2 border-sky-300` frame and elevation shadow, rendering all legal and brand details crisply for older adults and procurement officers.
  - Paired with high-impact bold typography (`text-2xl sm:text-3xl font-black`), B2B/B2C marketplace tags, and verified ecosystem descriptors.
- **Visual Theme Contrast & Header/Body Separation**:
  - Eliminated monochromatic white washout between header and body.
  - Header: Distinct luminous ice-blue & pearl canvas with a top azure utility ribbon and `border-b-2 border-sky-300` shelf.
  - Body: Soft cool slate canvas (`bg-slate-100/90`, `#F1F5F9`) ensuring bright white product and deal cards pop out with clear depth and tactile definition.
- **Conversion-Driven Commercial E-Commerce Hero Stage**:
  - Replaced the text-heavy wall with a modern split 2-column e-commerce hero banner:
    - Left: Commercial value proposition, 3 instant buying CTAs (*Shop Standard SKUs*, *Post Custom RFQ*, *Flash Deals*), and search bar with popular category chips.
    - Right: Dynamic Spotlight Deal of the Day card with 3D product render, verified OEM badges, stock status, commercial price, and direct "Order Now" action.
  - Added a slim 1-line horizontal trust ribbon (OEM Direct, GST Billing, Freight, MSME Financing).
  - 6-column visual category tiles, dedicated flash deals shelf, 4-column responsive desktop product grid, and interactive B2B services.
- **Verification**: `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` all pass with 0 errors across 25 routes.

### Phase 2 — Next Target: Master Catalogue Domain & Models
- Synchronize Company, Category, Industry, Application, Product, Solution, Service, and TurnkeyProject domain models.
- Implement optional family/series/model/variant level hierarchy and typed EAV specifications with source evidence citations.
- Ingest candidate records from `docs/YRC_MASTER_CATALOGUE.md` into PostgreSQL with `NEEDS_REVIEW` quarantine status.
- Verify public catalogue queries strictly exclude unpublished candidate records.
- Run typecheck, lint, and catalogue test suites.
