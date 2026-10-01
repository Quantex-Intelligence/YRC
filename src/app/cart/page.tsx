"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/cart-context";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotalMinor,
    gstMinor,
    totalMinor,
  } = useCart();

  const formatRupees = (minorUnits: number) => {
    return `₹${(minorUnits / 100).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Breadcrumbs */}
        <div className="space-y-1">
          <nav className="text-xs text-slate-500 flex items-center space-x-2">
            <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-sky-600 transition-colors">Catalogue</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Procurement Cart</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart &amp; Order Summary
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-4 shadow-xs">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
              <ShoppingCart className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900">Your procurement cart is empty</h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Discover industrial consumables, spectrophotometers, valves, and filtration media available for online procurement.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white px-5 py-2.5 text-xs font-bold shadow-md hover:shadow-sky-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              <span>Explore Industrial Catalogue</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Order Items ({items.length})
                  </span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs font-semibold text-red-600 hover:underline"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {items.map((item) => {
                    const lineTotalMinor = item.unitPriceMinor * item.quantity;

                    return (
                      <div
                        key={item.variantId}
                        className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1 flex-1">
                          <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                            {item.companyName}
                          </span>
                          <Link href={`/products/${item.slug}`}>
                            <h3 className="text-sm font-bold text-slate-900 hover:text-sky-600 transition-colors">
                              {item.productName}
                            </h3>
                          </Link>
                          <div className="text-xs text-slate-600 font-medium">
                            {item.variantName}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400">
                            SKU: {item.sku}
                          </div>
                          <div className="text-xs font-semibold text-slate-800 pt-1">
                            Unit Price: {formatRupees(item.unitPriceMinor)}
                          </div>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                          <div className="flex items-center rounded-xl border border-slate-300 bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-l-xl transition-colors"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold font-mono text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-r-xl transition-colors"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-bold text-slate-900">
                              {formatRupees(lineTotalMinor)}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.variantId)}
                              className="text-slate-400 hover:text-rose-600 transition-colors mt-1"
                              title="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary & Checkout Card */}
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
                  Commercial Order Summary
                </h2>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Taxable Subtotal:</span>
                    <span className="font-semibold text-slate-900">{formatRupees(subtotalMinor)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18% Harmonized):</span>
                    <span className="font-semibold text-slate-900">{formatRupees(gstMinor)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Industrial Freight:</span>
                    <span className="font-semibold text-emerald-700">Free Promotion</span>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-900">Total Payable:</span>
                    <span className="text-xl font-extrabold text-sky-700">
                      {formatRupees(totalMinor)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Link
                    href="/checkout"
                    className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 py-3.5 px-4 text-xs font-bold text-white hover:shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                  >
                    <span>Proceed to Enterprise Checkout</span>
                    <ArrowRight className="h-4 w-4 text-white" />
                  </Link>
                  <Link
                    href="/products"
                    className="block text-center text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline pt-1 transition-colors"
                  >
                    ← Continue Shopping
                  </Link>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-[11px] text-slate-500 space-y-1">
                  <div className="font-semibold text-slate-700 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span>B2B Tax Invoice &amp; GST Compliance</span>
                  </div>
                  <p>Tax input credit (ITC) compliant tax invoice will be generated upon checkout.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
