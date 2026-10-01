"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Layers, Sparkles } from "lucide-react";
import { BrochurePreviewModal } from "@/components/BrochurePreviewModal";

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    entityKind: string;
    pricingMode: string;
    shortDescription?: string | null;
    sourcePage?: number | null;
    sourceDocumentId?: string | null;
    sourceDocument?: {
      originalFilename: string;
      pageCount: number;
    } | null;
    company?: {
      legalName: string;
      slug: string;
    } | null;
    brand?: {
      name: string;
    } | null;
    category: {
      name: string;
      slug: string;
    };
    variants?: Array<{
      id: string;
      modelNumber?: string | null;
      priceMinorUnits?: bigint | number | null;
      currency?: string;
    }>;
    images?: Array<{
      id: string;
      imageUrl: string;
      isPrimary?: boolean;
    }>;
    specifications?: Array<{
      attributeKey?: string;
      attributeValue?: string;
      valueText?: string | null;
      valueNumeric?: number | null;
      unit?: string | null;
      specDefinition?: {
        name: string;
        unit?: string | null;
      };
    }>;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const primaryImage =
    product.images?.find((img) => img.isPrimary)?.imageUrl ||
    product.images?.[0]?.imageUrl ||
    "/images/products/roots-blower.jpg";

  const displayImageUrl = imageError ? "/images/products/roots-blower.jpg" : primaryImage;

  const firstVariant = product.variants?.[0];
  const hasFixedPrice =
    product.pricingMode === "FIXED_PRICE" &&
    firstVariant?.priceMinorUnits !== null &&
    firstVariant?.priceMinorUnits !== undefined;

  const priceFormatted = hasFixedPrice
    ? `₹${(Number(firstVariant.priceMinorUnits) / 100).toLocaleString("en-IN")}`
    : "Request RFQ";

  const brandOrCompany = product.brand?.name || product.company?.legalName || "OEM Certified";

  const keySpecs = product.specifications?.slice(0, 2) || [];

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 overflow-hidden transform-gpu hover:-translate-y-1">
      {/* Top Image Preview Container in Luminous Light Palette */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gradient-to-b from-sky-50/50 via-white to-slate-50 border-b border-slate-100 flex items-center justify-center p-3">
        {displayImageUrl ? (
          <img
            src={displayImageUrl}
            alt={product.name}
            onError={() => setImageError(true)}
            className="max-h-full max-w-full object-contain group-hover:scale-106 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center text-slate-400">
            <Layers className="h-10 w-10 text-slate-300 mb-2" />
            <span className="text-xs font-semibold">OEM Industrial Equipment</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-800 border border-sky-200 shadow-2xs">
            <ShieldCheck className="h-3 w-3 text-emerald-600" />
            Verified OEM
          </span>

          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide backdrop-blur-md shadow-2xs ${
              hasFixedPrice
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-orange-50 text-orange-700 border border-orange-200"
            }`}
          >
            {hasFixedPrice ? "Instant Buy" : "B2B RFQ"}
          </span>
        </div>

        {/* Bottom Bar inside image: Category & Page Reference */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] z-10">
          <span className="font-semibold text-slate-700 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-slate-200/80 truncate max-w-[180px] shadow-2xs">
            {product.category.name}
          </span>
          {product.sourcePage && (
            <span className="rounded-lg bg-white/90 backdrop-blur-sm px-1.5 py-0.5 text-[10px] text-slate-600 border border-slate-200/80 font-mono shadow-2xs">
              p. {product.sourcePage}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Brand & Kind */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-sky-700 tracking-wide uppercase text-[11px] truncate max-w-[200px]">
              {brandOrCompany}
            </span>
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 rounded-lg px-2 py-0.5 uppercase tracking-wider">
              {product.entityKind.replace(/_/g, " ")}
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.slug}`} className="block group-hover:text-sky-700">
            <h3 className="text-base font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Key Specs Pills if available */}
          {keySpecs.length > 0 && (
            <div className="pt-2 flex flex-wrap gap-1.5">
              {keySpecs.map((spec, idx) => {
                const label = spec.specDefinition?.name || spec.attributeKey;
                const val = spec.valueText || (spec.valueNumeric !== undefined ? spec.valueNumeric : spec.attributeValue);
                const unit = spec.unit || spec.specDefinition?.unit || "";
                if (!label || val === null || val === undefined) return null;
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-lg bg-sky-50 border border-sky-100 px-2 py-0.5 text-[10px] font-medium text-sky-900"
                  >
                    <span className="text-slate-500 mr-1">{label}:</span>
                    <span className="font-bold text-slate-900">
                      {val} {unit}
                    </span>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Card Footer: Pricing, Actions, Brochure Modal */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-end justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                {hasFixedPrice ? "Starting Rate" : "Procurement Mode"}
              </span>
              <div className="flex items-baseline gap-1">
                <span className={`text-base sm:text-lg font-extrabold ${hasFixedPrice ? "text-slate-900" : "text-orange-700"}`}>
                  {priceFormatted}
                </span>
                {hasFixedPrice && (
                  <span className="text-[10px] text-emerald-700 font-bold">+18% GST</span>
                )}
              </div>
            </div>

            <Link
              href={`/products/${product.slug}`}
              className={`inline-flex items-center space-x-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer hover:-translate-y-0.5 active:scale-[0.98] ${
                hasFixedPrice
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xs"
                  : "bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white shadow-xs"
              }`}
            >
              <span>{hasFixedPrice ? "Order Now" : "Request RFQ"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Brochure Inspector Trigger Button */}
          {product.sourceDocumentId && product.sourceDocument && (
            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-dashed border-slate-200">
              <span className="text-slate-500 truncate max-w-[150px] text-[10px] flex items-center gap-1 font-mono">
                <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                {product.sourceDocument.originalFilename}
              </span>
              <BrochurePreviewModal
                docId={product.sourceDocumentId}
                docFilename={product.sourceDocument.originalFilename}
                pageNumber={product.sourcePage || 1}
                productName={product.name}
                companyName={product.company?.legalName}
                imageUrl={primaryImage}
                specs={keySpecs.map((s) => ({
                  label: s.specDefinition?.name || s.attributeKey || "Specification",
                  value: `${s.valueText || (s.valueNumeric !== undefined ? s.valueNumeric : s.attributeValue) || ""} ${s.unit || s.specDefinition?.unit || ""}`.trim(),
                }))}
                triggerLabel={`Datasheet (p. ${product.sourcePage || 1})`}
                triggerClassName="inline-flex items-center space-x-1.5 rounded-xl border border-sky-200 bg-sky-50/80 px-2.5 py-1 text-[11px] font-bold text-sky-800 hover:bg-sky-100 hover:border-sky-300 transition-all shadow-2xs cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
