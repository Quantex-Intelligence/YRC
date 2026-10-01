import Link from "next/link";
import { prisma } from "@/lib/db";
import { Search, SlidersHorizontal, CheckCircle2, Package, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

interface SearchParamsProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    kind?: string;
    pricing?: string;
    industry?: string;
  }>;
}

export default async function ProductsCatalogPage({ searchParams }: SearchParamsProps) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q?.trim();
  const category = resolvedParams.category?.trim();
  const kind = resolvedParams.kind?.trim();
  const pricing = resolvedParams.pricing?.trim();
  const industry = resolvedParams.industry?.trim();

  // Construct dynamic Prisma where clause
  const where: any = {
    isPublished: true,
  };

  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { shortDescription: { contains: q, mode: "insensitive" } },
      { fullDescription: { contains: q, mode: "insensitive" } },
      {
        company: {
          legalName: { contains: q, mode: "insensitive" },
        },
      },
      {
        brand: {
          name: { contains: q, mode: "insensitive" },
        },
      },
    ];
  }

  if (category) {
    where.category = {
      slug: category,
    };
  }

  if (kind) {
    where.entityKind = kind;
  }

  if (pricing) {
    where.pricingMode = pricing === "fixed" ? "FIXED_PRICE" : "RFQ_ONLY";
  }

  if (industry) {
    where.industries = {
      some: {
        industry: {
          slug: industry,
        },
      },
    };
  }

  // Execute database queries in parallel
  const [products, categories, industries] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        company: true,
        brand: true,
        category: true,
        variants: true,
        images: {
          orderBy: { displayOrder: "asc" },
        },
        specifications: true,
        sourceDocument: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      where: { parentId: null },
      include: { children: true },
      orderBy: { displayOrder: "asc" },
    }),
    prisma.industry.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Breadcrumbs & Banner */}
        <div className="space-y-2">
          <nav className="text-xs text-slate-500 flex items-center space-x-2">
            <Link href="/" className="hover:text-sky-700 font-semibold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Catalogue &amp; Products</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Industrial Products &amp; Solutions
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Extracted directly from authorized manufacturer catalogues. Verified technical parameters and zero-hallucination specifications.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-2xs shrink-0">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>{products.length} Items Found</span>
            </div>
          </div>
        </div>

        {/* Search Console Bar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs">
          <form method="GET" action="/products" className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                name="q"
                defaultValue={q || ""}
                placeholder="Search by equipment, blower CFM, spectrophotometer, UF membrane, valve..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-sky-500 focus:outline-hidden focus:ring-2 focus:ring-sky-100 transition-all"
              />
            </div>
            {category && <input type="hidden" name="category" value={category} />}
            {kind && <input type="hidden" name="kind" value={kind} />}
            {pricing && <input type="hidden" name="pricing" value={pricing} />}
            {industry && <input type="hidden" name="industry" value={industry} />}
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                type="submit"
                className="flex-1 sm:flex-none rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-6 py-2.5 text-xs font-bold text-white hover:-translate-y-0.5 active:scale-[0.98] transition-all shadow-xs cursor-pointer text-center"
              >
                Apply Filters
              </button>
              {(q || category || kind || pricing || industry) && (
                <Link
                  href="/products"
                  className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 active:scale-[0.98] transition-all text-center cursor-pointer shrink-0"
                >
                  Reset
                </Link>
              )}
            </div>
          </form>
        </div>

        {/* Content Grid: Filters Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <SlidersHorizontal className="h-4 w-4 text-sky-600" /> Equipment Filters
                </span>
                {(category || kind || pricing || industry) && (
                  <Link href="/products" className="text-[11px] font-bold text-rose-600 hover:underline">
                    Clear All
                  </Link>
                )}
              </div>

              {/* Entity Kind Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Solution Archetype</label>
                <div className="space-y-1 text-xs">
                  {[
                    { label: "All Offerings", value: "" },
                    { label: "Products / Machinery", value: "PRODUCT" },
                    { label: "Engineering Solutions", value: "SOLUTION" },
                    { label: "Industrial Services", value: "SERVICE" },
                    { label: "Turnkey EPC Projects", value: "PROJECT" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={`/products?${new URLSearchParams({
                        ...(q ? { q } : {}),
                        ...(category ? { category } : {}),
                        ...(item.value ? { kind: item.value } : {}),
                        ...(pricing ? { pricing } : {}),
                        ...(industry ? { industry } : {}),
                      }).toString()}`}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-all ${
                        (kind === item.value || (!kind && !item.value))
                          ? "bg-sky-50 text-sky-800 font-extrabold border-l-3 border-sky-500 shadow-2xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                      }`}
                    >
                      <span>{item.label}</span>
                      {(kind === item.value || (!kind && !item.value)) && (
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Pricing Mode Filter */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Procurement Model</label>
                <div className="space-y-1 text-xs">
                  {[
                    { label: "All Models", value: "" },
                    { label: "Fixed Price (Instant Buy)", value: "fixed" },
                    { label: "Request Quote (Custom RFQ)", value: "rfq" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={`/products?${new URLSearchParams({
                        ...(q ? { q } : {}),
                        ...(category ? { category } : {}),
                        ...(kind ? { kind } : {}),
                        ...(item.value ? { pricing: item.value } : {}),
                        ...(industry ? { industry } : {}),
                      }).toString()}`}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-all ${
                        (pricing === item.value || (!pricing && !item.value))
                          ? "bg-sky-50 text-sky-800 font-extrabold border-l-3 border-sky-500 shadow-2xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                      }`}
                    >
                      <span>{item.label}</span>
                      {(pricing === item.value || (!pricing && !item.value)) && (
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Category Hierarchy Filter */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Top Categories</label>
                <div className="space-y-1 text-xs max-h-64 overflow-y-auto pr-1">
                  <Link
                    href={`/products?${new URLSearchParams({
                      ...(q ? { q } : {}),
                      ...(kind ? { kind } : {}),
                      ...(pricing ? { pricing } : {}),
                      ...(industry ? { industry } : {}),
                    }).toString()}`}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-all ${
                      !category
                        ? "bg-sky-50 text-sky-800 font-extrabold border-l-3 border-sky-500 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <span>All Categories</span>
                    {!category && <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />}
                  </Link>
                  {categories.map((cat) => (
                    <div key={cat.id} className="space-y-0.5">
                      <Link
                        href={`/products?${new URLSearchParams({
                          ...(q ? { q } : {}),
                          category: cat.slug,
                          ...(kind ? { kind } : {}),
                          ...(pricing ? { pricing } : {}),
                          ...(industry ? { industry } : {}),
                        }).toString()}`}
                        className={`flex items-center justify-between rounded-xl px-3 py-1.5 text-xs transition-all ${
                          category === cat.slug
                            ? "bg-sky-50 text-sky-800 font-extrabold border-l-3 border-sky-500 shadow-2xs"
                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium"
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        {category === cat.slug && <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />}
                      </Link>
                      {cat.children.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/products?${new URLSearchParams({
                            ...(q ? { q } : {}),
                            category: sub.slug,
                            ...(kind ? { kind } : {}),
                            ...(pricing ? { pricing } : {}),
                            ...(industry ? { industry } : {}),
                          }).toString()}`}
                          className={`flex items-center justify-between rounded-xl pl-6 pr-2.5 py-1 text-[11px] transition-all ${
                            category === sub.slug
                              ? "bg-sky-50 text-sky-800 font-extrabold border-l-2 border-sky-500"
                              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                          }`}
                        >
                          <span className="truncate">{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Industry Filter */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Industry</label>
                <div className="space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
                  <Link
                    href={`/products?${new URLSearchParams({
                      ...(q ? { q } : {}),
                      ...(category ? { category } : {}),
                      ...(kind ? { kind } : {}),
                      ...(pricing ? { pricing } : {}),
                    }).toString()}`}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-all ${
                      !industry
                        ? "bg-sky-50 text-sky-800 font-extrabold border-l-3 border-sky-500 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <span>All Industries</span>
                    {!industry && <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />}
                  </Link>
                  {industries.map((ind) => (
                    <Link
                      key={ind.id}
                      href={`/products?${new URLSearchParams({
                        ...(q ? { q } : {}),
                        ...(category ? { category } : {}),
                        ...(kind ? { kind } : {}),
                        ...(pricing ? { pricing } : {}),
                        industry: ind.slug,
                      }).toString()}`}
                      className={`flex items-center justify-between rounded-xl px-3 py-1.5 text-xs transition-all ${
                        industry === ind.slug
                          ? "bg-sky-50 text-sky-800 font-extrabold border-l-3 border-sky-500 shadow-2xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                      }`}
                    >
                      <span className="truncate">{ind.name}</span>
                      {industry === ind.slug && <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Listing Cards */}
          <main className="lg:col-span-3 space-y-4">
            {products.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-3 shadow-xs">
                <Package className="mx-auto h-12 w-12 text-slate-300" />
                <h3 className="text-lg font-bold text-slate-800">No matching industrial equipment found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try adjusting your search criteria or clearing selected category and industry filters.
                </p>
                <Link
                  href="/products"
                  className="inline-block rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:from-sky-700 hover:to-blue-700 transition-all shadow-xs"
                >
                  Reset All Filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
