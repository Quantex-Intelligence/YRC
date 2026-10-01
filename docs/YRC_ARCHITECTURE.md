# YRC Global System Architecture

Status: Phase 0 Architectural Blueprint, 30 September 2026. Defines the modular monolith architecture, data contracts, security perimeters, and service boundaries for the YRC Global B2B + B2C industrial ecosystem.

---

## 1. Architectural Philosophy & Strategy

YRC Global is not a generic consumer storefront. It is an industrial B2B and B2C digital commerce ecosystem combining high-precision equipment catalogues, multi-tier procurement workflows, turnkey engineering proposals, supplier directories, business franchise opportunities, and MSME knowledge portals.

### Guiding Principles:
1. **Modular Monolith**: Clean domain boundaries within a unified Next.js (App Router) + TypeScript codebase. Enables low operational overhead, unified type safety from database to UI, atomic cross-domain transactions, and simplified local development.
2. **Replaceable Adapter Interfaces**: Clean interface contracts for external services (Search: Postgres FTS / OpenSearch; Storage: Local Disk / S3; Payments: Dev Mock / Razorpay; Email: Local Log / SendGrid / Postmark; AI: Grounded Retrieval / OpenAI / Gemini).
3. **Strict Source Traceability**: Every extracted catalogue fact maintains an immutable provenance trail (`source_document_id`, `source_file`, `source_page`, `extraction_method`, `confidence`, `review_status`).
4. **Mandatory Human-in-the-Loop Review**: Machine-extracted data (`NEEDS_REVIEW`) never touches public read surfaces until an authorized administrator explicitly reviews and publishes the revision.
5. **Decoupled Facet Taxonomies**: Product Categories, Industries, and Applications are independent, orthogonal dimensions.
6. **Granular Permission-Based RBAC**: Authorization is verified strictly on the server using granular capabilities (`catalogue.review`, `rfq.read_assigned`, etc.) constrained by tenant/company ownership, not simple UI hiding.

---

## 2. High-Level System Architecture Diagram

```mermaid
graph TB
    subgraph ClientLayer["Client & User Interfaces"]
        Browser[Modern Web Browsers: Desktop / Tablet / Mobile]
        PublicUI["Public Marketplace & Discovery
(SSR + Static Rendering)"]
        BuyerPortal["Buyer Dashboard
(RFQs, Orders, Quotes)"]
        SupplierPortal["Supplier Portal
(Products, RFQs, Quotes, Leads)"]
        AdminWorkspace["Enterprise Admin Control Center
(Catalogue Review, Ingestion, Users, CMS)"]
    end

    subgraph AppLayer["Next.js Application Core (App Router + Server Actions)"]
        AuthMiddleware["Authentication & Session Middleware
(HttpOnly Cookies + CSRF Protection)"]
        RBACEngine["Granular RBAC & Tenant Policy Guard"]
        
        subgraph Domains["Modular Domain Services"]
            CatalogueDomain["Catalogue Domain
(Sparse Hierarchy: Prod/Sol/Serv/Proj)"]
            IngestionDomain["PDF Ingestion & Review Pipeline
(OCR Extraction, Provenance, Revisions)"]
            ProcurementDomain["Procurement & RFQ Engine
(RFQs, Multi-Supplier Quotes, Comparison)"]
            CommerceDomain["Commerce & Checkout Engine
(Cart, Pricing, Orders, Idempotency)"]
            NetworkDomain["Commercial Network & Deals
(Deals Engine, Channel Partners, Franchises)"]
            KnowledgeDomain["MSME & News CMS
(Verified Schemes, Industry News)"]
            AIDomain["Grounded AI Assistant
(Intent Parser, Semantic Retrieval, Citations)"]
        end
        
        subgraph Adapters["Replaceable Service Adapters"]
            SearchAdapter["Search Adapter
[Postgres pg_trgm / OpenSearch]"]
            StorageAdapter["Private Storage Adapter
[Local var/uploads / AWS S3]"]
            PaymentAdapter["Payment Adapter
[Dev Mock / Razorpay]"]
            EmailAdapter["Notification Adapter
[Console Sink / Postmark]"]
        end
    end

    subgraph DataLayer["Persistence & Infrastructure"]
        PostgreSQL[("PostgreSQL 16+
(Relational Schema + JSONB + FTS)")]
        PrismaORM["Prisma ORM 7.x
(Type-Safe Queries & Migrations)"]
        WorkerQueue["Background Workers
(Python/PyMuPDF/Tesseract OCR Sandbox)"]
    end

    Browser --> AuthMiddleware
    AuthMiddleware --> RBACEngine
    RBACEngine --> Domains
    Domains --> Adapters
    CatalogueDomain --> PrismaORM
    ProcurementDomain --> PrismaORM
    CommerceDomain --> PrismaORM
    IngestionDomain --> WorkerQueue
    PrismaORM --> PostgreSQL
    Adapters --> PostgreSQL
```

---

## 3. Modular Monolith Domain Boundaries

The application is structured into clearly separated domain packages under `src/modules/` or `src/lib/`:

```
src/
├── app/                      # Next.js App Router (Public routes, Portals, Admin)
│   ├── (public)/             # Public pages (Marketplace, Products, Companies, Deals, MSME, News)
│   ├── (auth)/               # Authentication (Login, Register, Reset, Verify)
│   ├── buyer/                # Authenticated Buyer Workspace (RFQs, Quotes, Orders)
│   ├── supplier/             # Authenticated Supplier Dashboard (Catalogue, RFQ responses)
│   ├── admin/                # Enterprise Admin Console (Review workspace, Ingestion, Roles)
│   └── api/                  # API endpoints, Webhooks, Health probes
├── modules/
│   ├── auth/                 # Session management, Password hashing, RBAC definitions
│   ├── catalogue/            # Products, Variants, Specifications, Categories, Industries, Applications
│   ├── ingestion/            # PDF registration, OCR workers, Revision control, Provenance
│   ├── procurement/          # RFQ submission, Multi-supplier distribution, Quotation comparison
│   ├── commerce/             # Cart validation, Server-authoritative totals, Orders, Invoices
│   ├── network/              # Deals engine, Channel partner directory, Franchise opportunities
│   ├── cms/                  # MSME scheme registry, Industry news, Editorial workflows
│   └── ai/                   # Grounded natural-language query parser, Catalog retrieval
└── lib/
    ├── adapters/             # Replaceable provider implementations (Search, Storage, Payment, Email)
    ├── db/                   # Prisma client singleton, connection pooling
    ├── security/             # Input sanitization, CSRF tokens, Rate limiting, Audit logging
    └── ui/                   # Design system tokens, accessible primitives, icons
```

---

## 4. Entity Architecture & Sparse Hierarchy

To handle heterogeneous industrial machinery, chemicals, turnkey projects, and services, the catalogue implements a sparse 8-level hierarchy:

```mermaid
graph TD
    Company[Company / Supplier Entity] --> Brand[Brand]
    Brand --> Category[Category / Subcategory]
    Category --> ProdFamily[Product Family]
    ProdFamily --> Product[Product / Solution / Service / Project]
    Product --> Series[Series]
    Series --> Model[Model]
    Model --> Variant[Variant / SKU]
    Variant --> Specs[Normalized Technical Specifications]
```

### Classification Archetypes:
1. **PRODUCT**:
   - Physical equipment, machines, consumables, instruments.
   - Supports: Pricing mode (`FIXED_PRICE`, `PRICE_RANGE`, `PRICE_ON_REQUEST`, `BULK_PRICING`), Cart checkout (if priced and in-stock), or RFQ.
2. **SOLUTION**:
   - Engineered process schemes (e.g. `Effluent Treatment Plant`, `Zero Liquid Discharge`).
   - Supports: Capacity envelope, input/output characteristics, P&ID schematics, "Solution Enquiry" workflow.
3. **SERVICE**:
   - Intangible operational services (e.g. `Gas Analyzer Calibration`, `Boiler Descaling`, `O&M Contracts`).
   - Supports: Scope of work, service area coverage, hourly/annual retainer terms.
4. **PROJECT / TURNKEY SYSTEM**:
   - Large capital EPC contracts (e.g. `Bio-CBG Turnkey Plant`, `150T Weighbridge Installation`).
   - Supports: Scope boundaries (battery limits), civil/mechanical engineering requirements, milestone procurement RFQ.

---

## 5. Flexible Technical Specifications System

Different industrial domains have completely incompatible engineering attributes (e.g. Clamping force in kN for injection moulding machines vs. Pore size in microns for hollow fiber membranes vs. Methane percentage for biogas analyzers).

The specification subsystem utilizes an **EAV (Entity-Attribute-Value) with Typed Definitions** pattern:

```mermaid
erDiagram
    SPECIFICATION_DEFINITION {
        uuid id PK
        uuid category_id FK
        string name "e.g. Clamping Force, Flow Rate"
        string data_type "NUMERIC, TEXT, BOOLEAN, RANGE"
        string unit "kN, m3/hr, bar, microns"
        string group_name "Mechanical, Electrical, Performance"
        boolean filterable "Index for faceted navigation"
        boolean comparable "Display on comparison axis"
    }

    PRODUCT_SPECIFICATION {
        uuid id PK
        uuid product_id FK
        uuid variant_id FK "Nullable: applies to product or variant"
        uuid spec_definition_id FK
        string value_text
        float value_numeric
        string unit "Overrides default unit if necessary"
        uuid source_document_id FK "Traceability back to PDF"
        int source_page "1-based source page"
        string verification_status "NEEDS_REVIEW, APPROVED"
    }

    SPECIFICATION_DEFINITION ||--o{ PRODUCT_SPECIFICATION : "defines"
```

---

## 6. PDF Ingestion & Intelligence Pipeline Architecture

The ingestion pipeline isolates untrusted binary files and CPU-intensive OCR processes from web requests:

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Catalogue Admin
    participant Web as Next.js Web App
    participant Storage as Private Storage (var/uploads)
    participant DB as PostgreSQL (Prisma)
    participant Worker as Background Extraction Worker

    Admin->>Web: Upload PDF Brochure / Catalogue
    Web->>Web: Magic byte, MIME, size & page bounds validation
    Web->>Storage: Store in private quarantine directory
    Web->>DB: Register Document (Status: UPLOADED, Hash: SHA-256)
    Web-->>Admin: Document registered, queued for extraction
    
    Web->>Worker: Enqueue background job (doc_id, sha256)
    Worker->>DB: Update Status: PROCESSING
    Worker->>Worker: PyMuPDF rasterization + Tesseract OCR (words, bboxes, tables)
    Worker->>Storage: Store page images, OCR TSVs, and full text
    Worker->>DB: Populate DocumentPages, Geometric Rows, Extracted Text
    Worker->>DB: Classify Candidates (Company, Products, Specs)
    Worker->>DB: Update Status: EXTRACTED, Review Status: NEEDS_REVIEW
    
    Admin->>Web: Access Admin Review Workspace
    Web->>DB: Fetch extracted candidates + page image coordinates
    Admin->>Web: Verify against source page, correct fields
    Admin->>DB: Approve Revision (Status: APPROVED)
    Admin->>DB: Publish to Marketplace (Status: PUBLISHED)
    Web->>DB: Update Search Index & Public Projections
```

---

## 7. Role-Based Access Control (RBAC) & Tenant Security

YRC Global enforces deny-by-default server-side authorization. Roles map to granular permission strings:

| Role Category | Roles | Core Capabilities |
|---|---|---|
| **Platform Admins** | `SUPER_ADMIN`, `ADMIN` | System configuration, role assignment, audit log inspection, provider toggles. |
| **Operational Staff** | `CATALOGUE_ADMIN`, `CONTENT_ADMIN` | PDF candidate review, item approval, publication, CMS moderation, SEO. |
| **Commercial Staff** | `SALES_ADMIN`, `SUPPORT_ADMIN` | RFQ triage, platform-wide quotation review, buyer assistance, dispute handling. |
| **Buyers** | `BUYER`, `BUSINESS_BUYER` | Catalogue search, RFQ creation, quote acceptance, cart checkout, order tracking. |
| **Suppliers** | `MANUFACTURER`, `SUPPLIER` | Own-company profile management, draft product creation, RFQ receipt & quotation response. |
| **Ecosystem Partners** | `CHANNEL_PARTNER`, `FRANCHISE_PARTNER` | Franchise inquiries, manufacturing unit directory, opportunity listings. |
| **Commercial Users** | `ADVERTISER` | Campaign management, banner asset submissions, impression/click metrics. |

### Authorization Guards:
- **Server Actions & Route Handlers**: Every mutating call validates session cookie, extracts caller user ID and role, and verifies required permission.
- **Tenant Scope Check**: When a user accesses an entity (e.g. Company profile, Quote, Order), the query enforces `company_id == user.active_company_id` or `user_id == session.user.id`.

---

## 8. Multi-Workflow Procurement & Commerce Engine

The platform supports three distinct commercial exchange modes:

```mermaid
graph TD
    User([User / Buyer]) --> Decision{Purchase Intent}
    
    Decision -->|Standard Catalog Product| DirectPurchase[A. Direct Purchase Workflow]
    DirectPurchase --> Cart[Add to Cart with Verified Variant Price]
    Cart --> Checkout[Checkout & Address Selection]
    Checkout --> OrderAtomic[Atomic Order Creation & Idempotency Key]
    OrderAtomic --> PayGate[Payment Provider Abstraction]
    PayGate --> Invoice[Authoritative Invoice Generation]
    
    Decision -->|Custom Specs / Bulk Volume| RFQWorkflow[B. RFQ & Quotation Workflow]
    RFQWorkflow --> CreateRFQ[Create RFQ with Line Items & Specs]
    CreateRFQ --> RouteSuppliers[Intelligent Multi-Supplier Routing]
    RouteSuppliers --> SupplierQuotes[Suppliers Submit Formal Quotations]
    SupplierQuotes --> QuoteCompare[Buyer Compares Line-by-Line Quotes]
    QuoteCompare --> AcceptQuote[Transactional Acceptance -> Order Conversion]
    
    Decision -->|Engineered Plant / Turnkey Project| SolutionEnquiry[C. Solution & Turnkey Project Enquiry]
    SolutionEnquiry --> TechEnquiry[Submit Capacity, Location & Project Brief]
    TechEnquiry --> EPCResponse[EPC Supplier Technical Feasibility Review]
    EPCResponse --> Proposal[Formal Engineering Proposal & Milestone Contract]
```

---

## 9. Search & Grounded AI Assistant Architecture

### 9.1 Search Abstraction Layer
The search layer defines an abstract `SearchProvider` interface:
```typescript
interface SearchProvider {
  search(query: SearchQuery): Promise<SearchResults>;
  autocomplete(prefix: string): Promise<AutocompleteSuggestions>;
  reindex(entityType: string, entityId: string): Promise<void>;
}
```
- **Development & Small Deployments**: `PostgresSearchProvider` leveraging PostgreSQL `tsvector`, `tsquery`, GIN indexes, and `pg_trgm` fuzzy matching.
- **Production High-Scale**: `OpenSearchProvider` mapping approved catalogue projections to OpenSearch indices with sub-millisecond faceted filtering.

### 9.2 Grounded AI Assistant (No Hallucinations)
The discovery assistant uses **Retrieval-Augmented Generation (RAG)** strictly grounded in YRC's verified database:
1. **User Prompt**: "I need a 150 ton injection moulding machine with servo motor."
2. **Intent & Entity Extraction**: Parses `{ entity_type: 'PRODUCT', category: 'Plastics Machinery', clamping_force: 150, drive: 'Servo' }`.
3. **Database Retrieval**: Executes structured query returning `Prikan Ultra Servo US-150` (`PRIKAN.pdf`, Page 5).
4. **Response Synthesis**: Cites verified technical specs (1500 kN force, 510x510mm tie bar clearance, 22 kW motor) and provides clickable links to the product detail page and source catalogue page.
5. **Strict Guardrail**: If no verified catalogue record matches, the assistant replies: *"No published listings currently match these specifications. Would you like to create an RFQ to broadcast your requirements to registered manufacturers?"* It never fabricates fictional suppliers or specs.

---

## 10. Commercial Ecosystem: Deals, Advertising, MSME & News

- **Deals Engine**: Manages scheduled discounts, volume pricing tiers, and manufacturer clearance deals. Automatically transitions expired deals based on server UTC timestamp.
- **Advertising Engine**: Manages homepage hero carousels, category sponsored banners, and featured company badges. Strictly tracks impressions and clicks with fraud deduplication. Requires admin review before publishing ad creatives.
- **MSME Information Hub**: Structured repository of government schemes (e.g. PMEGP, CGTMSE, Credit Linked Capital Subsidy), eligibility criteria, application documents, and official ministry URLs.
- **Industry News & Current Affairs**: Full-featured CMS for publishing sector updates (Water, Energy, Waste, Manufacturing) with draft/review/schedule/publish states, tags, and SEO metadata.

---

## 11. Production Readiness, Observability & Security

- **Database Performance**: All foreign keys, slug lookups, status filters, and search vectors are indexed with dedicated B-Tree and GIN indexes.
- **Health Probes**: `/api/health` reports status of database connection, storage read/write accessibility, and worker queue heartbeat without exposing credentials.
- **Error Boundaries**: Next.js `error.tsx` and `global-error.tsx` catch client/server failures gracefully with error reporting hooks and user-friendly fallback actions.
- **Container Ready**: Dockerfile support for non-root execution, standalone Next.js server bundle, and secure environment variable injection.
