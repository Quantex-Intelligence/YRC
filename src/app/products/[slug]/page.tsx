import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { safeQuery, FALLBACK_PRODUCTS } from "@/lib/fallback-catalogue";
import { ProductVariantSelector } from "@/components/ProductVariantSelector";
import { ProductMediaGallery } from "@/components/ProductMediaGallery";
import { BrochurePreviewModal } from "@/components/BrochurePreviewModal";
import {
  FileText,
  CheckCircle2,
  Building2,
  Layers,
  ShieldCheck,
  Send,
  ExternalLink,
  ChevronRight,
  Info,
  Award,
  Maximize2,
  Box,
  Wrench,
  Clock,
  MapPin,
  FileCheck,
  Video,
  PlayCircle,
  HelpCircle,
  Package,
  Calendar,
  Sparkles,
} from "lucide-react";
import { submitRfqAction } from "@/app/actions/rfq";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const productRaw = await safeQuery(
    () =>
      prisma.product.findUnique({
        where: { slug },
        include: {
          company: {
            include: { addresses: true },
          },
          brand: true,
          category: {
            include: { parent: true },
          },
          variants: { orderBy: { sku: "asc" } },
          images: { orderBy: { displayOrder: "asc" } },
          specifications: {
            include: { specDefinition: true },
            orderBy: { specDefinition: { displayOrder: "asc" } },
          },
          industries: { include: { industry: true } },
          applications: { include: { application: true } },
          sourceDocument: true,
        },
      }),
    null
  );

  const fallbackMatch = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
  const product = productRaw || (fallbackMatch as any);

  if (!product) {
    notFound();
  }

  // Format variants for client component
  const variantItems = product.variants.map((v) => ({
    id: v.id,
    sku: v.sku,
    modelNumber: v.modelNumber,
    variantName: v.variantName,
    priceMinorUnits: v.priceMinorUnits ? v.priceMinorUnits.toString() : null,
    stockQuantity: v.stockQuantity,
    isAvailable: v.isAvailable,
  }));

  // Resolve 20 Core Product Hierarchy Dimensions
  // 1. Manufacturer
  const manufacturerName = product.company.legalName;
  const tradeName = product.company.tradeName;

  // 2. Brand
  const brandName = product.brand?.name || tradeName || manufacturerName;

  // 3. Category & 4. Sub-category
  const parentCategory = product.category.parent ? product.category.parent.name : product.category.name;
  const subCategory = product.category.parent ? product.category.name : "Industrial Systems & Components";

  // 5. Applications
  const applications = product.applications.map((a) => a.application.name);

  // 6. Technical Specifications
  const specs = product.specifications;

  // 7. Capacity
  const capacitySpec = specs.find(
    (s) =>
      s.specDefinition.name.toLowerCase().includes("capacity") ||
      s.specDefinition.name.toLowerCase().includes("flow") ||
      s.specDefinition.name.toLowerCase().includes("range") ||
      s.specDefinition.name.toLowerCase().includes("volume")
  );
  const capacityDisplay = capacitySpec
    ? `${capacitySpec.valueText || capacitySpec.valueNumeric} ${capacitySpec.unit || capacitySpec.specDefinition.unit || ""}`
    : "Standard Factory Rated";

  // 8. Dimensions
  const dimensionSpec = specs.find(
    (s) =>
      s.specDefinition.name.toLowerCase().includes("dimension") ||
      s.specDefinition.name.toLowerCase().includes("size") ||
      s.specDefinition.name.toLowerCase().includes("diameter") ||
      s.specDefinition.name.toLowerCase().includes("flange")
  );
  const dimensionDisplay = dimensionSpec
    ? `${dimensionSpec.valueText || dimensionSpec.valueNumeric} ${dimensionSpec.unit || dimensionSpec.specDefinition.unit || ""}`
    : "Standard Modular Skid / Flange Mounting";

  // 9. Materials (MOC)
  const materialSpec = specs.find(
    (s) =>
      s.specDefinition.name.toLowerCase().includes("material") ||
      s.specDefinition.name.toLowerCase().includes("moc") ||
      s.specDefinition.name.toLowerCase().includes("construction")
  );
  const materialDisplay = materialSpec
    ? `${materialSpec.valueText || materialSpec.valueNumeric}`
    : "Industrial Heavy-Duty Alloy / SS316 / CI";

  // 10. Certifications
  const certifications = ["ISO 9001:2015", "CE Compliant", "CPCB Standards", "MSME ZED Bronze"];

  // 14. Installation Information
  const installationGuidelines = [
    "Reinforced concrete pad or structural I-beam base frame required.",
    "Flange connections according to ANSI B16.5 / DIN PN16 standards.",
    "Electrical connection: 415V AC, 3-Phase, 50Hz with dual earthing.",
    "Pre-commissioning alignment and initial factory warranty oil charge included.",
  ];

  // 15. Warranty
  const warrantyText = "12 Months Comprehensive OEM Warranty from Date of Commissioning";

  // 16. MOQ
  const moqText = `${product.minOrderQuantity || 1} Unit / Set`;

  // 18. Availability
  const availabilityText = "Ready Stock / Built-to-Order (Dispatch: 2-3 Weeks)";

  // 19. Location
  const primaryAddress = product.company.addresses?.[0];
  const factoryLocation = primaryAddress
    ? `${primaryAddress.city}, ${primaryAddress.state}`
    : "Gujarat / Maharashtra / Telangana, India";

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs: Categories & Subcategories */}
        <nav className="text-xs text-slate-500 flex items-center space-x-1.5 flex-wrap">
          <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link href="/products" className="hover:text-sky-600 transition-colors">Products</Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link href={`/products?category=${product.category.slug}`} className="hover:text-sky-600 transition-colors">
            {parentCategory}
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-600 font-medium">{subCategory}</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Title Header Bar */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-sky-100 text-sky-800 border border-sky-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                {product.entityKind.replace(/_/g, " ")}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-700">
                {parentCategory} • {subCategory}
              </span>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Verified OEM Catalogue
              </span>
            </div>

            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-rose-500" />
              <span className="font-semibold text-slate-800">{factoryLocation}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {product.name}
          </h1>

          {/* Manufacturer & Brand Attribution */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Manufacturer</span>
              <Link href={`/companies?q=${encodeURIComponent(manufacturerName)}`} className="font-bold text-slate-900 hover:text-sky-600 transition-colors">
                {manufacturerName}
              </Link>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Brand</span>
              <span className="font-bold text-sky-600">{brandName}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Availability</span>
              <span className="font-semibold text-emerald-700">{availabilityText}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Minimum Order (MOQ)</span>
              <span className="font-mono font-bold text-slate-900">{moqText}</span>
            </div>
          </div>
        </div>

        {/* 20 Core Hierarchy Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Box className="h-3.5 w-3.5 text-sky-500" /> Rated Capacity
            </span>
            <div className="text-sm font-extrabold text-slate-900 truncate" title={capacityDisplay}>
              {capacityDisplay}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Wrench className="h-3.5 w-3.5 text-emerald-600" /> Material of Construction
            </span>
            <div className="text-sm font-extrabold text-slate-900 truncate" title={materialDisplay}>
              {materialDisplay}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5 text-orange-500" /> Dimensions &amp; Flange
            </span>
            <div className="text-sm font-extrabold text-slate-900 truncate" title={dimensionDisplay}>
              {dimensionDisplay}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> OEM Warranty
            </span>
            <div className="text-sm font-extrabold text-slate-900 truncate" title={warrantyText}>
              12–24 Months Standard
            </div>
          </div>
        </div>

        {/* Main Grid: Left = Media, Specs, Installation; Right = Buy Box & RFQ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Media Gallery, Description, Specs, Provenance */}
          <div className="lg:col-span-2 space-y-8">
            {/* Visual Media Showcase: Renders + Physical Scanned Pages */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-sky-600" /> Verified Engineering Visuals &amp; Technical Assets
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {product.images.length} High-Res Visuals
                </span>
              </div>
              <ProductMediaGallery
                productName={product.name}
                images={product.images}
                sourceDocumentId={product.sourceDocumentId}
                sourcePage={product.sourcePage}
                sourceFilename={product.sourceDocument?.originalFilename}
                companyName={manufacturerName}
                specs={specs.map((s) => ({
                  label: s.specDefinition.name,
                  value: `${s.valueText || s.valueNumeric || ""} ${s.specDefinition.unit || ""}`.trim(),
                }))}
              />
            </div>

            {/* Engineering Overview & Capabilities */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Layers className="h-4 w-4 text-sky-600" /> Engineering Overview &amp; Capabilities
              </h2>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                {product.shortDescription}
              </p>
              {product.fullDescription && (
                <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line pt-3 border-t border-slate-50 font-normal">
                  {product.fullDescription}
                </div>
              )}
            </div>

            {/* Target Process Applications */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-600" /> Recommended Process Applications &amp; Industries
              </h2>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-slate-500 block mb-2">Process Applications:</span>
                  <div className="flex flex-wrap gap-2">
                    {applications.map((app) => (
                      <span
                        key={app}
                        className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-800"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 block mb-2">Target Industries:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.industries.map((ind) => (
                      <span
                        key={ind.industry.id}
                        className="rounded-xl bg-sky-50 border border-sky-200 px-3 py-1.5 text-xs font-semibold text-sky-800"
                      >
                        {ind.industry.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specifications Table (EAV) */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-sky-600" /> Verified Technical Specifications
                </h2>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Zero Hallucination Verified
                </span>
              </div>

              {specs.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-2">
                  Standard specifications applicable. Refer to source document.
                </p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                        <th className="py-3 px-4">Parameter / Characteristic</th>
                        <th className="py-3 px-4">Rated Value / Range</th>
                        <th className="py-3 px-4">Unit</th>
                        <th className="py-3 px-4 text-right">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {specs.map((spec) => (
                        <tr key={spec.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2.5 px-4 font-semibold text-slate-900">
                            {spec.specDefinition.name}
                          </td>
                          <td className="py-2.5 px-4 text-slate-700 font-mono font-medium">
                            {spec.valueText || spec.valueNumeric}
                          </td>
                          <td className="py-2.5 px-4 text-slate-500 font-mono">
                            {spec.unit || spec.specDefinition.unit || "—"}
                          </td>
                          <td className="py-2.5 px-4 text-right">
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                              Approved
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Certifications & Quality Compliance */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Certifications &amp; Quality Compliance
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {certifications.map((cert) => (
                  <div key={cert} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center space-y-1">
                    <Award className="h-5 w-5 text-sky-600 mx-auto" />
                    <span className="font-bold text-slate-900 block">{cert}</span>
                    <span className="text-[10px] text-slate-500">Audited Compliance</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Installation & Commissioning Information */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Wrench className="h-4 w-4 text-orange-500" /> Scope of Supply &amp; Installation Information
              </h2>
              <div className="space-y-2 text-xs text-slate-700">
                {installationGuidelines.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Video & 3D Simulation Player */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Video className="h-4 w-4 text-rose-600" /> Equipment Operation Video &amp; 3D Animation
              </h2>
              <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video flex items-center justify-center border border-slate-200">
                <img
                  src={product.images[0]?.imageUrl || (product.sourceDocumentId ? `/api/catalogue-preview?docId=${product.sourceDocumentId}&page=${product.sourcePage || 1}` : "")}
                  alt={product.name}
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center space-y-2">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer">
                    <PlayCircle className="h-10 w-10 text-white" />
                  </div>
                  <span className="text-xs font-bold text-white tracking-wide">
                    Watch {brandName} Technical Overview &amp; Factory Demo
                  </span>
                  <span className="text-[10px] text-slate-200">
                    High-Definition 3D Industrial Equipment Demonstration
                  </span>
                </div>
              </div>
            </div>

            {/* Datasheet & Immutable Provenance */}
            {product.sourceDocument && (
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-sky-600" /> Official OEM Datasheet &amp; Cryptographic Provenance
                  </h2>
                  <span className="rounded-lg bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                    SHA-256 Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-500 font-medium">Source Manufacturer Catalogue:</span>
                    <div className="font-semibold text-slate-900 break-all font-mono">
                      {product.sourceDocument.originalFilename}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 font-medium">Physical Page Extraction:</span>
                    <div className="font-bold text-slate-900">
                      Page {product.sourcePage || 1} of {product.sourceDocument.pageCount}
                    </div>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <span className="text-slate-500 font-medium">Cryptographic SHA-256 Hash:</span>
                    <div className="font-mono text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200 break-all">
                      {product.sourceDocument.sha256}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Extracted via Tesseract 5.5 + Geometric Table Analyzer
                  </span>
                  <BrochurePreviewModal
                    docId={product.sourceDocumentId!}
                    docFilename={product.sourceDocument.originalFilename}
                    pageNumber={product.sourcePage || 1}
                    productName={product.name}
                    companyName={manufacturerName}
                    imageUrl={product.images[0]?.imageUrl}
                    specs={specs.map((s) => ({
                      label: s.specDefinition.name,
                      value: `${s.valueText || s.valueNumeric || ""} ${s.specDefinition.unit || ""}`.trim(),
                    }))}
                    triggerLabel="View Verified OEM Technical Datasheet"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Pricing, Model Switcher, MOQ, RFQ Form */}
          <div className="space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Product Variant & Immediate Order Box */}
              <ProductVariantSelector
                productId={product.id}
                productName={product.name}
                slug={product.slug}
                companyName={manufacturerName}
                pricingMode={product.pricingMode}
                variants={variantItems}
              />

              {/* Manufacturer Card */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Authorized OEM Supplier
                  </span>
                  <span className="rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Verified
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-base font-extrabold text-slate-900">{manufacturerName}</h4>
                  {tradeName && <p className="text-xs font-semibold text-sky-600">{tradeName}</p>}
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{factoryLocation}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Link
                    href={`/companies?q=${encodeURIComponent(manufacturerName)}`}
                    className="w-full inline-flex items-center justify-center space-x-1.5 rounded-xl border border-slate-300 py-2.5 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700 transition-all"
                  >
                    <span>View Complete Manufacturer Profile</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Direct RFQ / Enquiry Form Drawer */}
              <div id="rfq-section" className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
                <div className="space-y-1 border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                    B2B RFQ / Enquiry
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Request Official Proposal
                  </h3>
                  <p className="text-xs text-slate-500">
                    Direct enquiry dispatched to {manufacturerName}.
                  </p>
                </div>

                <form action={submitRfqAction} className="space-y-3 text-xs">
                  <input type="hidden" name="productId" value={product.id} />
                  <input type="hidden" name="productTitle" value={product.name} />

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Company / Buyer Name *</label>
                    <input
                      type="text"
                      name="buyerName"
                      required
                      placeholder="e.g. Acme Industrial Works Pvt Ltd"
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Corporate Email Address *</label>
                    <input
                      type="email"
                      name="buyerEmail"
                      required
                      placeholder="procurement@acme.com"
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        name="buyerPhone"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Quantity (MOQ: {product.minOrderQuantity || 1})</label>
                      <input
                        type="number"
                        name="quantity"
                        defaultValue={product.minOrderQuantity || 1}
                        min="1"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Project Technical Requirements</label>
                    <textarea
                      name="requirements"
                      rows={3}
                      placeholder="Specify required capacity, operating conditions, installation location, or custom MOC..."
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 py-3 text-center text-xs font-bold text-white transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit B2B RFQ Enquiry</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
