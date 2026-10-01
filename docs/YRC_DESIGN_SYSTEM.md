# YRC design system

Status: Phase 0 design requirements, 30 September 2026. These are proposed interface rules, not a claim that an application or an accessibility audit is complete.

## Source and brand identity

The supplied `PHOTO-2026-09-23-17-12-32.jpg` is a 1254 × 1254 JPEG. It depicts a navy globe, metallic gold detailing, YRC lettering, the name **YRC EXPO MARKETING PRIVATE LIMITED**, and the tagline **CONNECTING BRANDS, CREATING IMPACT**. The requested application title is **YRC Global**. These are distinct observed names; the asset does not establish a legal relationship between them.

Preserve the original JPEG byte-for-byte. Do not redraw, recolor, stretch, crop away its wording, or invent a transparent background. Render the complete image with `object-fit: contain`, a white backing, its original aspect ratio, and reserved width/height to avoid layout movement. Use a separate text title, “YRC Global,” in the interface. Alt text should describe the observed asset: “YRC Expo Marketing Private Limited logo.” Do not publish invented company registration, address, ownership, accreditation, or contact details. A legal name and brand usage decision remains a launch dependency.

The remaining two JPEGs are handwritten business-scope notes. They indicate MSME schemes, channel partners, manufacturing units, franchises, advertising, eco-friendly products, best deals, firms information, doorstep information/deals, and sector current affairs. They are planning material, not product evidence or proof of a sustainability claim.

## Palette and contrast

Palette choices are derived from the supplied logo, then adjusted to practical flat interface colors. A read-only pixel analysis grouped RGB values into 16-level bins. Dominant navy candidate bins included `#081838` (32,458 pixels), `#080818` (23,673), and `#081828` (23,118). Gold candidate bins included `#684818` (3,349), `#A88858` (3,165), and `#785828` (3,149). Because the source has gradients, compression, and shadows, these counts are approximate image observations, not an official brand color specification.

Use these proposed tokens:

- `brand-navy: #102A46` — primary buttons, header, selected navigation. White text measures **14.57:1**.
- `brand-ink: #0B1D33` — headings and high-emphasis text. White background measures **16.97:1**.
- `brand-gold: #BB944C` — decorative rules, subtle accents, or a gold button with navy text (**5.17:1**). Gold on white is **2.82:1**; never use that combination for ordinary text, focus rings, or an essential control boundary.
- `brand-gold-text: #876119` — accessible gold-colored text or links on white (**5.59:1**); underline links within prose.
- `text: #334155`, `muted-text: #64748B` — body and secondary text. Muted text on white measures **4.76:1**; body text on `#F5F7FA` measures **9.65:1**.
- `surface: #FFFFFF`, `canvas: #F5F7FA`, `border-subtle: #D9E0E8` — neutral surfaces. Subtle borders are decorative; controls still need a sufficiently visible shape/label/focus indicator.
- `success: #146C43`, `danger: #A52834`, `information: #2459A4` — semantic text on white at **6.45:1**, **7.11:1**, and **6.91:1** respectively. Pair every state with text and an icon where useful.

Ratios above were computed using sRGB relative luminance on the exact flat hex pairs, not sampled screenshot colors. The text contrast target is at least 4.5:1 for normal text and 3:1 for qualifying large text, consistent with [W3C's contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Other accessibility requirements still need testing; passing these color pairs is not a WCAG conformance claim. Check every actual pair, including disabled, hover, focus, chart, badge, and dark header states.

## Typography, space, and motion

Use a system sans-serif stack initially so the application works without a font download. Headings are compact, medium/semibold, and sentence case; body copy is 16px with roughly 1.5 line height. Dense admin metadata may use 14px, with zoom and wrapping preserved. Use tabular numerals for values and currency, and monospace only for identifiers or diagnostic details. Never encode units as decorative superscripts that screen readers cannot interpret.

Use a 4px spacing scale: 4, 8, 12, 16, 24, 32, 48, and 64px. Content containers should usually remain within 1280px; wide technical tables and admin workspaces may extend further. Use 6–10px corner radii, light separators, and restrained shadows. Avoid oversized catalogue cards, decorative graphs, persistent animation, and gradients outside the supplied logo. Use 120–180ms control transitions and respect reduced-motion preferences. Loading placeholders are short-lived and reflect a real pending request.

## Public information hierarchy

The public shell prioritizes Marketplace, Companies, Solutions, Business Opportunities, RFQ, Deals, MSME, News & Knowledge, Advertise, About YRC, and Contact. On desktop, group secondary destinations into labeled menus so the header remains readable. Keep global search and Request Quote prominent. Mobile navigation must expose the same destinations through an accessible menu rather than squeezing eleven links into a row.

The homepage opens with a concise business-oriented headline and search across products, companies, and solutions. Follow with category/industry discovery, a small set of genuinely published listings, a procurement CTA, and reviewed knowledge content. Show a section only when its data or useful explanatory content exists. “Trusted by,” transaction totals, bestseller ranks, reviews, ratings, discounts, and verification badges require actual supporting records.

Use compact catalogue rows or cards containing: entity type, title, manufacturer when known, model when known, three comparable category-specific attributes, available image, pricing mode, comparison action, and primary purchase/enquiry action. A Product, Solution, Service, and Turnkey Project must be visibly distinguishable. Source-extracted data stays private until human review and publication. Public search, counts, recommendations, sitemaps, structured data, and assistant responses use the same publication rule.

## Catalogue and procurement patterns

- Search results: count, query, active filter chips, clear-all control, sort, pagination, and separate empty/error states. Facets come from actual published attributes; category, industry, and application are separate filters.
- Technical detail: overview followed by grouped specifications, applications, permitted documents, supplier information, and enquiry/purchase action. Preserve original units, qualifiers, ranges, and table headings. Unavailable values read “Not provided”; they do not become zero.
- Comparison: compatible categories only; a labeled specification axis, original unit, each model's value, “Not provided” for missing data, and a citation/details action where permitted. Flag incompatible units rather than guessing a conversion. On small screens, scroll the comparison region horizontally with a visible cue while preserving the row labels.
- Pricing: null price renders “Request Quote.” Direct purchase requires an eligible variant and validated price. A starting price/range must be labeled explicitly. MOQ, lead time, availability, taxes, shipping, and warranty remain absent or unknown until supported.
- RFQ: short staged form for item/solution, quantity and unit where relevant, project requirements, location, permitted attachments, and review. Preserve draft input after errors. Show delivery/submission confirmation only after server acknowledgement.
- Quotes: compare actual line prices, units, quantities, taxes, freight, currency, expiry, payment/fulfilment terms, and source supplier. Do not calculate a winner from missing costs. Acceptance states clearly identify the exact quote revision.
- Solution enquiry: capacity, industry, location, project brief, and attachments; do not force an unpriced engineered system into a cart.

## Company, opportunity, and knowledge content

Company pages distinguish a platform-reviewed profile from individual supplier claims. Do not imply that a brochure mention is a verified customer relationship. Certifications, environmental claims, and logos require evidence and usage review. Channel partner/franchise/manufacturing-unit listings use their own inquiry details rather than product specifications.

MSME and government content must show the official source, jurisdiction, last verification date, important dates when supported, and review status. Expired or unverified information cannot look current. Sponsored placements need a visible “Sponsored” label. Ads and deals require approved publication and date boundaries; a genuine absence of offers is preferable to fabricated discounts.

## Admin and supplier workspace

Use a restrained enterprise layout: persistent desktop sidebar grouped by work area, compact page heading, contextual actions, search/filter toolbar, and paginated data table. Preserve column preferences only when useful. Mobile uses a drawer and selected priority columns with expandable row details. Bulk actions require explicit item selection and a preview of the affected records.

Admin dashboard metrics come from persisted records and distinguish zero from “Unavailable.” Default focus is actionable queues: documents awaiting processing, extracted fields awaiting review, publication candidates, RFQs needing response, and failed jobs. Never seed revenue, orders, users, or sales solely to fill a dashboard.

The catalogue review workspace places a source-page viewer beside extracted fields on wide screens and switches between labeled Source/Fields tabs on narrow screens. Every important field exposes source document, 1-based page, extraction method, confidence if available, original value, reviewer decision, and revision history. Confidence is an extraction aid, never a verification badge. Reviewers can correct, reject, or flag a value; approval and publication are separate operations. Editing an approved record creates a new review revision.

Supplier views must explicitly show the active company. A supplier can manage authorized company drafts and responses but cannot silently publish catalogue changes, inspect competitor quotations, or use another company's private documents. Hidden controls improve usability; the server must enforce permissions independently.

## Accessibility and responsive acceptance criteria

- Use semantic headings, landmarks, real links/buttons, labeled form fields, a skip link, and descriptive document download names.
- All tasks work by keyboard. Menus/dialogs manage focus, Escape dismissal, and return focus. Sticky headers and footers must not cover the focused control.
- Show a high-contrast, offset focus outline. Pair error text with its field, summarize errors at submission, and move focus intentionally without losing input.
- Announce asynchronous results and submission success with restrained live regions. Avoid repeated announcements during every keystroke.
- Design primary touch controls around 44px; retain adequate separation in compact tables. Support zoom and text reflow at narrow widths.
- At approximately 360px, 768px, 1024px, and 1440px, verify no whole-page horizontal overflow. Contain technical table overflow within a labeled region. Breakpoints follow content fit, not device branding.
- Test long company names, multi-line specifications, large quantities, INR and other configured currencies, null values, absent images, and multiple units. Do not truncate critical technical or financial meaning without an accessible way to read it.
- Preserve a visible distinction among loading, empty, failed, unauthorized, archived, and unavailable states.

## Truthful initial states

Before human-reviewed catalogue publication, public results should say “No published listings yet” and offer a relevant browse or enquiry path only if that path is functional. Filtered zero-results says “No listings match these filters” with reset controls. A failed API request says “We couldn't load these results” and offers retry; it must not pretend that the catalogue is empty.

In admin, distinguish “No documents registered,” “Extraction pending,” “Needs review,” “Approved, not published,” and “Published.” Demo fixtures must be unmistakably labeled in the interface and isolated from production/source-derived records. A functional local workflow can exist without inventing a real company's price, availability, certifications, product images, or commercial claims.
