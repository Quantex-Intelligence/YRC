import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  Tag,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingDown,
  PackageCheck,
  Building2,
} from "lucide-react";
import { BrochurePreviewModal } from "@/components/BrochurePreviewModal";
import { safeQuery, FALLBACK_DEALS } from "@/lib/fallback-catalogue";

export const dynamic = "force-dynamic";

export default async function DealsPage() {
  const dealsRaw = await safeQuery(
    () =>
      prisma.deal.findMany({
        where: { isActive: true },
        include: {
          company: true,
          product: {
            include: {
              brand: true,
              category: true,
              variants: true,
              images: { orderBy: { displayOrder: "asc" } },
              sourceDocument: true,
            },
          },
          variant: true,
        },
        orderBy: { discountPercent: "desc" },
      }),
    FALLBACK_DEALS as any
  );

  const deals = dealsRaw && dealsRaw.length > 0 ? dealsRaw : (FALLBACK_DEALS as any);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Breadcrumb & Header */}
        <div className="space-y-2">
          <nav className="text-xs text-slate-500 flex items-center space-x-2">
            <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Factory Direct Allocations &amp; Bulk Deals</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-2">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> Direct Manufacturer Batches
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Verified Industrial Deals &amp; Volume Pricing
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Direct factory-gate pricing on consumables, instrumentation, and standard valves. No distributor intermediaries.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>{deals.length} Active Factory Allocations</span>
            </div>
          </div>
        </div>

        {/* Value Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 text-slate-800 p-6 shadow-xs border border-emerald-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Clock className="h-4 w-4 text-emerald-600" /> Limited Commercial Availability
            </div>
            <h2 className="text-lg font-bold text-slate-900">Standard 18% GST Compliant B2B Tax Invoicing</h2>
            <p className="text-xs text-slate-600 max-w-2xl">
              All bulk offers include formal e-way billing, factory test certificates (TC), and direct warranty coverage from the original equipment manufacturer.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="rounded-xl bg-emerald-100 text-emerald-800 px-3.5 py-1.5 text-xs font-mono font-bold border border-emerald-300">
              100% Guaranteed Stock
            </span>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => {
            const p = deal.product;
            if (!p) return null;

            const primaryImg = p.images[0]?.imageUrl || (p.sourceDocumentId ? `/api/catalogue-preview?docId=${p.sourceDocumentId}&page=${p.sourcePage || 1}` : null);
            const originalPriceMinor = Number(deal.variant?.priceMinorUnits || 0);
            const dealPriceMinor = Number(deal.dealPriceMinor || 0);

            const origFmt = `₹${(originalPriceMinor / 100).toLocaleString("en-IN")}`;
            const dealFmt = `₹${(dealPriceMinor / 100).toLocaleString("en-IN")}`;
            const savingsFmt = `₹${((originalPriceMinor - dealPriceMinor) / 100).toLocaleString("en-IN")}`;

            return (
              <div
                key={deal.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden transform-gpu hover:-translate-y-1"
              >
                {/* Media Preview Container */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-50 border-b border-slate-100 p-2 flex items-center justify-center">
                  {primaryImg && (
                    <img
                      src={primaryImg}
                      alt={p.name}
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-2.5 py-0.5 text-xs font-extrabold text-white shadow-md">
                      <TrendingDown className="h-3 w-3" /> {deal.discountPercent}% OFF
                    </span>
                  </div>

                  {/* OEM Verified Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      <ShieldCheck className="h-3 w-3 text-white" />
                      Factory Gate
                    </span>
                  </div>

                  {/* Category info */}
                  <div className="absolute bottom-2.5 left-3 text-[11px] text-slate-700 font-semibold bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-slate-200">
                    {p.category.name}
                  </div>
                </div>

                {/* Deal Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                      {p.brand?.name || deal.company.legalName}
                    </div>

                    <Link href={`/products/${p.slug}`}>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                        {p.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {p.shortDescription}
                    </p>
                  </div>

                  {/* Price Comparison */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 line-through font-medium">{origFmt}</span>
                          <span className="text-xs font-bold text-rose-600">Save {savingsFmt}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-extrabold text-slate-900">{dealFmt}</span>
                          <span className="text-[10px] text-slate-500">+18% GST</span>
                        </div>
                      </div>

                      <Link
                        href={`/products/${p.slug}`}
                        className="inline-flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-4 py-2 text-xs font-bold text-white hover:shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                      >
                        <span>Claim Deal</span>
                        <ArrowRight className="h-3.5 w-3.5 text-white" />
                      </Link>
                    </div>

                    {/* Source Document Modal */}
                    {p.sourceDocument && (
                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-dashed border-slate-200">
                        <span className="text-slate-500 truncate max-w-[140px] text-[10px] flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                          {p.sourceDocument.originalFilename}
                        </span>
                        <BrochurePreviewModal
                          docId={p.sourceDocumentId!}
                          docFilename={p.sourceDocument.originalFilename}
                          pageNumber={p.sourcePage || 1}
                          productName={p.name}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
