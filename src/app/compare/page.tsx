import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { safeQuery, FALLBACK_PRODUCTS } from "@/lib/fallback-catalogue";
import {
  SlidersHorizontal,
  ShieldCheck,
  CheckCircle2,
  FileText,
  ArrowRight,
  Package,
  Layers,
  Sparkles,
} from "lucide-react";
import { BrochurePreviewModal } from "@/components/BrochurePreviewModal";

export const dynamic = "force-dynamic";

interface ComparePageProps {
  searchParams: Promise<{
    items?: string;
  }>;
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { items } = await searchParams;

  // Default comparison slugs if none specified
  const defaultSlugs = [
    "alpha-roots-blowers-ab-series",
    "garuda-gvp-liquid-ring-vacuum-pump",
    "ppi-pumps-heavy-two-stage-liquid-ring-vacuum-pump",
    "asahi-microza-una-620a-uf-module",
  ];

  const selectedSlugs = items ? items.split(",").filter(Boolean) : defaultSlugs;

  // Fetch selected products from PostgreSQL with error resilience
  const productsRaw = await safeQuery(
    () =>
      prisma.product.findMany({
        where: {
          slug: { in: selectedSlugs },
        },
        include: {
          company: true,
          brand: true,
          category: true,
          variants: { orderBy: { sku: "asc" } },
          specifications: {
            include: { specDefinition: true },
            orderBy: { specDefinition: { displayOrder: "asc" } },
          },
          images: { orderBy: { displayOrder: "asc" } },
          sourceDocument: true,
        },
      }),
    []
  );

  const products = productsRaw && productsRaw.length > 0 ? productsRaw : (FALLBACK_PRODUCTS.slice(0, 3) as any);

  // Collect all unique specification names across all products
  const specKeySet = new Set<string>();
  products.forEach((p) => {
    p.specifications.forEach((s) => {
      specKeySet.add(s.specDefinition.name);
    });
  });
  const allSpecKeys = Array.from(specKeySet);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Breadcrumb & Header */}
        <div className="space-y-2">
          <nav className="text-xs text-slate-500 flex items-center space-x-2">
            <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-sky-600 transition-colors">Products</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Technical Specification Matrix</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full mb-2">
                <Sparkles className="h-3.5 w-3.5 text-rose-600" /> Engineering Evaluation
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Side-by-Side Equipment Comparison
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Zero-hallucination technical specifications extracted directly from certified OEM catalogues.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Comparing {products.length} Industrial Units</span>
            </div>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-800 divide-x divide-slate-200 border-b border-slate-200">
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-slate-500 w-56 sticky left-0 bg-slate-50 z-10 shadow-r">
                    Equipment Parameter
                  </th>
                  {products.map((p) => {
                    const primaryImg = p.images[0]?.imageUrl || (p.sourceDocumentId ? `/api/catalogue-preview?docId=${p.sourceDocumentId}&page=${p.sourcePage || 1}` : null);
                    return (
                      <th key={p.id} className="py-4 px-5 min-w-[260px] align-top bg-white">
                        <div className="space-y-3">
                          {primaryImg && (
                            <div className="h-28 w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-200 p-1">
                              <img src={primaryImg} alt={p.name} className="h-full w-full object-contain" />
                            </div>
                          )}
                          <div>
                            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wide block">
                              {p.brand?.name || p.company.legalName}
                            </span>
                            <Link href={`/products/${p.slug}`} className="text-sm font-bold text-slate-900 hover:text-sky-600 transition-colors line-clamp-2">
                              {p.name}
                            </Link>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {/* Commercial Pricing */}
                <tr className="bg-amber-50/50 hover:bg-amber-50 divide-x divide-slate-200">
                  <td className="py-3 px-5 font-bold text-slate-900 sticky left-0 bg-amber-50/90 z-10">
                    Commercial Terms
                  </td>
                  {products.map((p) => {
                    const v = p.variants[0];
                    const hasFixed = p.pricingMode === "FIXED_PRICE" && v?.priceMinorUnits;
                    const priceFmt = hasFixed
                      ? `₹${(Number(v.priceMinorUnits) / 100).toLocaleString("en-IN")}`
                      : "Price on Request";
                    return (
                      <td key={p.id} className="py-3 px-5">
                        <div className="font-extrabold text-sm text-slate-900">{priceFmt}</div>
                        <div className="text-[10px] text-slate-500">{hasFixed ? "+18% GST Applicable" : "B2B Custom RFQ"}</div>
                      </td>
                    );
                  })}
                </tr>

                {/* Classification */}
                <tr className="hover:bg-slate-50/70 divide-x divide-slate-200">
                  <td className="py-3 px-5 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                    Category &amp; Sector
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="py-3 px-5 text-slate-700 font-medium">
                      {p.category.name}
                    </td>
                  ))}
                </tr>

                {/* Entity Kind */}
                <tr className="hover:bg-slate-50/70 divide-x divide-slate-200">
                  <td className="py-3 px-5 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                    Equipment Nature
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="py-3 px-5">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                        {p.entityKind.replace(/_/g, " ")}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Available Variants */}
                <tr className="hover:bg-slate-50/70 divide-x divide-slate-200">
                  <td className="py-3 px-5 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                    Engineered Variants
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="py-3 px-5 text-slate-700">
                      <span className="font-bold text-slate-900">{p.variants.length}</span> models available
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">
                        {p.variants.map((v) => v.modelNumber || v.sku).slice(0, 3).join(", ")}
                        {p.variants.length > 3 ? "..." : ""}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Dynamic Extracted Specifications */}
                {allSpecKeys.map((key) => (
                  <tr key={key} className="hover:bg-slate-50/70 divide-x divide-slate-200">
                    <td className="py-3 px-5 font-semibold text-slate-700 sticky left-0 bg-white z-10">
                      {key}
                    </td>
                    {products.map((p) => {
                      const spec = p.specifications.find((s) => s.specDefinition.name === key);
                      return (
                        <td key={p.id} className="py-3 px-5 font-mono text-slate-900">
                          {spec ? (
                            <span>
                              {spec.valueText || spec.valueNumeric} {spec.unit || ""}
                            </span>
                          ) : (
                            <span className="text-slate-400 font-sans italic">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* Provenance & Catalogue Traceability */}
                <tr className="bg-slate-50 hover:bg-slate-100 divide-x divide-slate-200">
                  <td className="py-3 px-5 font-semibold text-slate-700 sticky left-0 bg-slate-50 z-10">
                    OEM Catalogue Provenance
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="py-3 px-5 space-y-2">
                      {p.sourceDocument && (
                        <div className="space-y-1">
                          <div className="text-[10px] font-mono text-slate-600 truncate">
                            {p.sourceDocument.originalFilename}
                          </div>
                          <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Page {p.sourcePage || 1}
                          </div>
                          <BrochurePreviewModal
                            docId={p.sourceDocumentId!}
                            docFilename={p.sourceDocument.originalFilename}
                            pageNumber={p.sourcePage || 1}
                            productName={p.name}
                          />
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Direct Order / RFQ Action Row */}
                <tr className="bg-white divide-x divide-slate-200">
                  <td className="py-4 px-5 font-bold text-slate-900 sticky left-0 bg-white z-10">
                    Procurement Action
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="py-4 px-5">
                      <Link
                        href={`/products/${p.slug}`}
                        className="w-full inline-flex items-center justify-center space-x-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-4 py-2 text-xs font-bold text-white shadow-md hover:shadow-sky-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                      >
                        <span>{p.pricingMode === "FIXED_PRICE" ? "Buy Online" : "Request RFQ"}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
