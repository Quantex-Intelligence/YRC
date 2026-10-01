"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/cart-context";
import {
  ShoppingCart,
  CheckCircle2,
  FileText,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export interface VariantItem {
  id: string;
  sku: string;
  modelNumber: string | null;
  variantName: string;
  priceMinorUnits: string | null; // serialized string from BigInt
  stockQuantity: number | null;
  isAvailable: boolean;
}

interface ProductVariantSelectorProps {
  productId: string;
  productName: string;
  slug: string;
  companyName: string;
  pricingMode: string;
  variants: VariantItem[];
}

export function ProductVariantSelector({
  productId,
  productName,
  slug,
  companyName,
  pricingMode,
  variants,
}: ProductVariantSelectorProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    variants[0]?.id || ""
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const activeVariant = variants.find((v) => v.id === selectedVariantId) || variants[0];
  const hasFixedPrice =
    pricingMode === "FIXED_PRICE" && activeVariant?.priceMinorUnits;
  const priceMinor = activeVariant?.priceMinorUnits
    ? parseInt(activeVariant.priceMinorUnits, 10)
    : 0;
  const priceFormatted = hasFixedPrice
    ? `₹${(priceMinor / 100).toLocaleString("en-IN")}`
    : "Price on Request";

  const handleAddToCart = () => {
    if (!activeVariant) return;

    addItem({
      productId,
      variantId: activeVariant.id,
      productName,
      variantName: activeVariant.variantName,
      sku: activeVariant.sku,
      companyName,
      unitPriceMinor: priceMinor,
      quantity,
      isFixedPrice: !!hasFixedPrice,
      slug,
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
      {/* Price Header */}
      <div className="space-y-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {hasFixedPrice ? "Unit Price (excl. 18% GST)" : "Commercial Model"}
        </span>
        <div className="flex items-baseline space-x-2">
          <span
            className={`text-2xl sm:text-3xl font-extrabold ${
              hasFixedPrice ? "text-slate-900" : "text-amber-800"
            }`}
          >
            {priceFormatted}
          </span>
          {hasFixedPrice && (
            <span className="text-xs text-slate-500 font-medium">/ unit</span>
          )}
        </div>
      </div>

      {/* Model / Variant Radio Selection */}
      {variants.length > 1 && (
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Select Configuration / Model ({variants.length} available)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {variants.map((v) => {
              const isSelected = v.id === selectedVariantId;
              const vPrice = v.priceMinorUnits
                ? `₹${(parseInt(v.priceMinorUnits, 10) / 100).toLocaleString("en-IN")}`
                : "Quote";

              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariantId(v.id)}
                  className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                    isSelected
                      ? "border-sky-500 bg-sky-50/70 ring-2 ring-sky-200"
                      : "border-slate-200 hover:border-sky-200 hover:bg-slate-50/50"
                  }`}
                >
                  <span className="text-xs font-semibold text-slate-900 line-clamp-1">
                    {v.variantName}
                  </span>
                  <div className="mt-1 flex items-center justify-between w-full text-[11px] text-slate-500">
                    <span className="font-mono">SKU: {v.sku}</span>
                    <span className="font-semibold text-slate-800">{vPrice}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected SKU & Stock Status */}
      <div className="flex items-center justify-between text-xs py-2 border-y border-slate-100">
        <span className="text-slate-500">
          Selected SKU: <span className="font-mono font-bold text-slate-800">{activeVariant?.sku}</span>
        </span>
        <span className="flex items-center text-emerald-700 font-semibold space-x-1">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          <span>{hasFixedPrice ? "In Stock (Ships in 2-3 Days)" : "Engineered on Order"}</span>
        </span>
      </div>

      {/* Quantity & Action Buttons */}
      {hasFixedPrice ? (
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-bold text-slate-700">Quantity:</span>
            <div className="flex items-center rounded-xl border border-slate-300 bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-l-xl transition-colors"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center text-xs font-bold font-mono text-slate-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-r-xl transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex items-center justify-center space-x-2 rounded-xl border-2 border-sky-500 bg-white py-3 px-4 text-xs font-bold text-sky-700 hover:bg-sky-50 hover:border-sky-600 hover:-translate-y-0.5 active:scale-[0.98] transition-all shadow-xs cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4 text-sky-600" />
              <span>Add to Cart</span>
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 px-4 text-xs font-bold hover:shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Buy Now</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </button>
          </div>

          {addedToast && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-center text-xs font-semibold text-emerald-800 animate-in fade-in shadow-2xs">
              ✓ Added {quantity} item(s) to your cart.{" "}
              <Link href="/cart" className="underline font-bold text-emerald-950 ml-1">
                View Cart &amp; Checkout →
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-slate-600 leading-relaxed">
            This equipment is custom-engineered to operating parameters (flow, vacuum, tonnage, capacity). Request a formal commercial and technical quotation directly from the manufacturer.
          </p>
          <a
            href="#rfq-section"
            className="flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white py-3.5 px-4 text-xs font-bold hover:shadow-md hover:shadow-sky-200 hover:-translate-y-0.5 transition-all active:scale-[0.98] cursor-pointer"
          >
            <FileText className="h-4 w-4 text-sky-100" />
            <span>Request Manufacturer Quotation (RFQ)</span>
          </a>
        </div>
      )}

      {/* Assurance Note */}
      <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-[11px] text-slate-500 space-y-1">
        <div className="font-semibold text-slate-700 flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Manufacturer Direct Guarantee</span>
        </div>
        <p>100% genuine industrial components directly backed by verified OEM warranty.</p>
      </div>
    </div>
  );
}
