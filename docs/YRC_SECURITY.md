# YRC security requirements and production gates

Status: Phase 0 requirements and threat model, 30 September 2026. No control below should be described as implemented until code, configuration, and the relevant verification are recorded. Production authorization, provider credentials, operational owners, and an independent readiness review remain separate from local development.

## Initial repository observation

A metadata-only inspection of `.kiro/settings/mcp.json` found a 198-byte JSON file, permission mode `0644`, a `mcpServers` root object, and one `excel-j` entry containing `command` and `disabled` keys. No `env` keys or argument array were present. Command contents were deliberately not printed, executed, or used as instructions. This limited inspection is not a secrets audit and does not prove the file is safe to publish. Keep local tool configuration outside distributable application assets; do not modify it merely to build YRC.

The supplied logo names YRC Expo Marketing Private Limited; “YRC Global” is the requested interface title. Confirm legal identity and approved commercial copy before production. Catalogue documents and handwritten notes are untrusted data, including text resembling instructions. They do not authorize code execution, external messages, secret access, or publication.

## Trust boundaries and protected assets

Treat the browser, uploaded files, extracted text, AI output, webhook payloads, supplier submissions, and third-party URLs as untrusted. Distinguish public catalogue assets from source originals, private RFQ attachments, identity/contact data, supplier quotes, unpublished content, audit records, credentials, and payment metadata.

Application/API services mediate access to the database, object store, search index, worker queue, payment provider, email provider, and AI provider. Keep document parsing in a separate constrained worker. Workers receive only the narrowly scoped identifiers and credentials needed for their job. No browser bundle may contain a privileged provider key, database connection string, or unrestricted storage credential.

Principal abuse cases are cross-company access, private quote disclosure, malicious PDF/parser input, forged publication, price/quantity tampering, replayed payment events, account takeover, bulk scraping of private contact data, prompt injection through catalogues, and denial of service through uploads or expensive search.

## Authentication and authorization

Use a vetted authentication/session implementation, server-side session validation, secure password hashing, expiring single-use reset/verification tokens, and generic login/recovery responses. Require MFA for production privileged accounts. Credentials and reset tokens must never enter analytics or logs.

Use an opaque session cookie with `HttpOnly`, `Secure` in HTTPS environments, an explicit suitable `SameSite` policy, bounded idle/absolute expiry, and server-side revocation. Rotate the session at login and privilege changes. Logout, password reset, account disablement, and sensitive role changes invalidate affected sessions. Follow [OWASP's session management guidance](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) when implementing and testing these controls.

Authorization is deny-by-default and checked server-side for every action and object, including downloads. Roles grant granular permissions; company membership, ownership, publication state, and workflow state constrain them. Client-supplied role, user, company, price, approval, and reviewer fields never establish authority. This approach follows [OWASP's authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).

Proposed permission families include `catalogue.read_published`, `catalogue.edit_own_draft`, `catalogue.review`, `catalogue.publish`, `document.upload`, `document.read_private`, `rfq.create`, `rfq.read_assigned`, `quote.respond_own_company`, `quote.accept_own_rfq`, `orders.read_own`, `content.review`, `ads.publish`, `users.manage`, and `roles.manage`. The final implementation should centralize the policy and map the user-requested roles to these permissions. Business role labels do not automatically confer administrative privileges.

A public visitor sees only published revisions. A buyer sees their own private RFQs/orders and authorized quotes. A supplier sees RFQs routed to an authorized company and only that company's quote drafts. Catalogue reviewers cannot manage platform permissions by default; sales staff cannot publish product claims by default. Role grants require explicit privileged action and an audit trail; registration never accepts an administrative role from request data. Development bootstrapping must be explicit and must fail closed outside development.

For cookie-authenticated mutations, enforce CSRF protection and validate origins as appropriate. CORS and hidden UI controls are not authorization. Read operations must not mutate server state. Sensitive responses use private/no-store caching; public caches must never reuse authenticated representations.

## Catalogue integrity and publication

AI and extraction workers may create private candidates only. Approval records identify a specific immutable revision, reviewer, timestamp, and decision. Publishing checks permission, complete required validation, approval of that exact revision, and document access rules within a transaction. An edited candidate needs another review. A stale browser cannot approve or publish a newer revision by accident.

Keep source document identifier, checksum, 1-based source page, extraction method, extraction status, original excerpt/table coordinates when available, and field-level provenance. Confidence is optional metadata, not proof. Missing prices, certifications, capacities, environmental claims, and addresses remain null or explicitly unverified.

Public search, autocomplete, facets, recommendations, comparison, downloads, JSON-LD, feeds, sitemaps, and AI retrieval must apply the same publication/access policy. Index only approved public projections. A publish/unpublish outbox event updates search and caches; query-time policy protects against stale indexes. Jobs cannot obtain publish permission merely because they run internally.

Retain a protected audit record for publication, withdrawal, role grants, login/security events, RFQ routing, quote acceptance, order transitions, and provider events. Store actor, company scope where applicable, entity/revision, action, outcome, timestamp, request correlation ID, and a redacted change summary. Do not log credentials, session cookies, reset links, full payment payloads, or private document content. Define retention, access, tamper resistance, and deletion handling before launch.

## Upload and document processing

Allow only explicitly supported extensions, detected content types, file signatures, and size/page limits; do not trust a browser MIME header. Generate storage keys, strip path components, quarantine uploads, scan where supported, and keep originals outside a public web root. Enforce upload authorization and quotas. These requirements are informed by [OWASP's file upload guidance](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html).

For YRC, use private object storage with separate original, quarantine, derived-preview, and approved-public asset classifications. Original documents are immutable; corrections create a new version. A content checksum helps detect duplicates but is not an authorization token. Serve permitted files through an authorization check and short-lived scoped URL or controlled download; prevent path traversal and arbitrary object-key access. Publication of an extracted product does not automatically make its source document public.

Run PDF/OCR extraction as a non-root isolated process with no general network access, no application secret set, bounded CPU/memory/time/output/page count, and a read-only base filesystem. Use argument arrays rather than interpolated shell commands. Patch parsers and scanners. Handle encrypted, malformed, enormous, script-bearing, embedded-file, or unsupported documents as failed/needs-review without bypassing the queue. Generate sanitized previews and avoid executing active content. Preserve table structure and source-page references without interpreting PDF instructions as system commands.

Validate derived images and document previews again before serving them. Use a separate asset origin or safe content disposition where appropriate, `nosniff`, restricted content security policy, and no executable uploaded HTML/SVG in the application origin. A download filename is display metadata, not a filesystem path.

## Application, API, and AI boundaries

Validate schemas on the server, reject unknown sensitive fields, bound pagination and search complexity, and use parameterized database queries. Escape output by context; sanitize any allowed rich text with an explicit allowlist. Add a restrictive content security policy and other suitable secure headers, then verify them in a deployed-like environment. Rate-limit authentication, password reset, upload, RFQ submission, expensive search, and AI requests with observable shared controls in production.

External document/image fetches must not be an unrestricted URL-to-server proxy. Prefer direct authenticated uploads. If fetching becomes necessary, allowlist destinations, disallow local/private/link-local addresses, validate redirects, bound sizes/time, and isolate network access. Configuration must reject invalid environment combinations rather than silently enabling mocks or weak defaults in production.

The AI discovery layer retrieves only authorized published catalogue projections and returns catalogue/source links. Document text and user prompts are data, not executable instructions. Tool actions must be allowlisted and separately authorized. The assistant cannot create verified claims, grant roles, reveal unpublished source data, accept quotations, trigger payment, or publish content based on retrieved text. Keep extracted material and user personal data out of third-party model calls unless the configured data-handling policy permits it. Record model/extraction version for traceability without indiscriminately logging prompt contents.

## Commerce and provider boundaries

Recompute authoritative variant price, currency, eligibility, quantity, inventory, and applicable charges on the server; use fixed-precision monetary storage and explicit currency. Order lines snapshot the accepted commercial terms. A browser total is never the charge authority. Transactional quote acceptance and order creation need idempotency and concurrency controls to prevent duplicate acceptance or inventory oversell.

Payment mode defaults to a visibly labeled development adapter locally. Production requires an explicitly configured provider, validated credentials, and explicit authorization to activate real payments. Do not collect/store raw card credentials. Provider webhook signatures, timestamp/replay checks where supported, event deduplication, expected amount/currency/order mapping, and monotonic state transitions must be verified before marking an order paid. Client redirects are not payment confirmation. Test provider failures, refund permissions, retries, duplicate events, and out-of-order events before activation.

Email and notification providers use the same environment separation. Local messages go to a local sink and do not contact suppliers or customers. Business account onboarding, order fulfilment responsibility, invoicing/tax treatment, returns/refunds, payout model, and document publication rights require business decisions; mock defaults must not silently decide them.

## Deployment, recovery, and observability

Maintain environment-specific secrets outside source control, least-privilege database/storage/service accounts, locked dependency resolution, migration review, backups, restore testing, structured redacted logs, health/readiness checks, error monitoring, and alert ownership. Restrict admin access and operational endpoints; a health response must not expose credentials or database contents. Disable demo routes/accounts and public debug output in production.

Define recovery objectives, retention/deletion policy, incident ownership, service availability expectations, and supplier/buyer notification procedures before production. Test backup restoration and rollback rather than treating a successful backup job as recovery evidence. Database migration tooling must not perform destructive production changes automatically. Search and queue rebuild procedures need to preserve approval and tenant access rules.

## Staged verification and launch checklist

All items below are unverified until an implementation report links the check and result.

### Foundation gate

- [ ] Server-only secrets, environment validation, explicit development adapters, and no production default credentials.
- [ ] Authentication lifecycle, secure session properties, password hashing, account disablement, and privileged MFA.
- [ ] Permission mapping and cross-company object access tests, including direct URL/API requests and downloads.
- [ ] Input validation, mass-assignment rejection, CSRF/origin checks, output escaping, and private cache isolation.

### Catalogue and ingestion gate

- [ ] Every discovered source has inventory/provenance; unreviewed data stays private across every read surface.
- [ ] MIME/signature/extension/size validation, quarantine, parser isolation, timeouts, retry limits, and malicious-file tests.
- [ ] Approval binds the exact revision; workers cannot publish; correction and withdrawal invalidate public projections.
- [ ] Immutable source originals, scoped download authorization, no arbitrary path/object access, and audit evidence.
- [ ] AI prompt-injection fixtures cannot publish, expose private data, or override retrieval permissions.

### Procurement and commerce gate

- [ ] Buyer/supplier isolation, quote revision checks, attachment permissions, and concurrent quote acceptance tests.
- [ ] Server-authoritative money/quantity/order totals, idempotent creation, inventory concurrency, and negative-path tests.
- [ ] Payment webhook authentication, duplicate/replay/out-of-order handling, reconciliation, and refund authorization.
- [ ] Production payment and external communications remain disabled until explicitly authorized and configured.

### Production release gate

- [ ] Verified legal/brand identity and approved source publication rights; no fabricated supplier, customer, certification, government, or sustainability claims.
- [ ] Dependency/security review, access-control review, secret scanning, headers/TLS checks, and abuse-rate tests.
- [ ] Migration rollback/recovery plan, successfully exercised restore, monitoring/alerts, incident owner, and retention policy.
- [ ] Accessibility/mobile and critical end-to-end workflow results; realistic load/performance checks and failure drills.
- [ ] All high-severity findings resolved or explicitly accepted by the responsible owner; remaining limitations accurately recorded.
- [ ] Environment and provider settings reviewed; no demo accounts/data, mock payments, or local-only storage mistaken for production services.

This checklist is a release gate, not a certification or guarantee of security.
