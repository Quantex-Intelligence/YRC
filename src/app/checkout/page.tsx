"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/cart-context";
import { createOrderAction } from "@/app/actions/order";
import {
  CreditCard,
  Building2,
  MapPin,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShoppingCart,
  AlertCircle,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalMinor, gstMinor, totalMinor, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    customerName: "Satya Alugolu",
    email: "buyer@yrcglobal.com",
    phone: "+91 98765 43210",
    companyName: "Alugolu Engineering Solutions LLP",
    gstin: "36AAACH7409R1ZZ",
    line1: "Plot 42, Industrial Development Area, Phase II",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500051",
    country: "India",
    paymentMode: "DEV_SIMULATION",
  });

  const formatRupees = (minorUnits: number) => {
    return `₹${(minorUnits / 100).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty. Please add items before checking out.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      companyName: formData.companyName,
      gstin: formData.gstin,
      shippingAddress: {
        line1: formData.line1,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      billingAddress: {
        line1: formData.line1,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      items: items.map((i) => ({
        variantId: i.variantId,
        snapshotTitle: i.productName,
        snapshotSku: i.sku,
        unitPriceMinor: i.unitPriceMinor,
        quantity: i.quantity,
        totalPriceMinor: i.unitPriceMinor * i.quantity,
      })),
      subtotalMinor,
      taxMinor: gstMinor,
      totalAmountMinor: totalMinor,
    };

    const res = await createOrderAction(payload);
    setLoading(false);

    if (res.success && res.orderNumber) {
      clearCart();
      router.push(`/orders/${res.orderNumber}`);
    } else {
      setError(res.error || "Order placement failed. Please verify your details.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center p-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 max-w-md w-full text-center space-y-4 shadow-sm">
          <ShoppingCart className="mx-auto h-12 w-12 text-slate-300" />
          <h2 className="text-lg font-bold text-slate-900">Your cart is empty</h2>
          <p className="text-xs text-slate-500">
            Please add industrial products or consumables to your cart before proceeding to checkout.
          </p>
          <Link
            href="/products"
            className="inline-block rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:shadow-sky-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Header */}
        <div className="space-y-1">
          <nav className="text-xs text-slate-500 flex items-center space-x-2">
            <Link href="/cart" className="hover:text-sky-600 transition-colors">← Back to Cart</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Enterprise Checkout</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Checkout &amp; Commercial Invoicing
          </h1>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-xs text-red-800 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Form Columns: Buyer Info, Shipping Address, Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Buyer Contact & Corporate Profile */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Building2 className="h-4 w-4 text-sky-600" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  1. Corporate Identity & Contact Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Authorized Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma (Head of Procurement)"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Official Corporate Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="procurement@acme-engineering.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Company Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Process Technologies Pvt Ltd"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Company GSTIN (For Input Tax Credit) *</label>
                  <input
                    type="text"
                    required
                    maxLength={15}
                    placeholder="e.g. 24AAACA1234A1Z5"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 font-mono uppercase text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Destination */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  2. Industrial Shipping & Site Address
                </h2>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Factory / Warehouse Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Plot No. 45, Phase II, GIDC Industrial Estate, Vatva"
                    value={formData.line1}
                    onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">City / District *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ahmedabad"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">State *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gujarat"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Postal PIN Code *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="e.g. 382445"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value.replace(/\D/g, "") })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 font-mono text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Mode Selection */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <CreditCard className="h-4 w-4 text-orange-500" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  3. Settlement & Payment Gateway
                </h2>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border-2 border-sky-500 bg-sky-50/40 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-emerald-600" />
                      YRC Instant Development Gateway (Instant Verification)
                    </span>
                    <span className="rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                      Active Sandbox
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Processes the order, generates an official YRC commercial invoice, and assigns inventory units without real financial debits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & Placement */}
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5 sticky top-24">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
                Items In This Order ({items.length})
              </h2>

              <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 pr-1 text-xs">
                {items.map((i) => (
                  <div key={i.variantId} className="py-2.5 flex justify-between gap-2">
                    <div>
                      <div className="font-semibold text-slate-900 line-clamp-1">{i.productName}</div>
                      <div className="text-[11px] text-slate-500">
                        {i.variantName} × {i.quantity}
                      </div>
                    </div>
                    <div className="font-bold text-slate-900 shrink-0">
                      {formatRupees(i.unitPriceMinor * i.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-900">{formatRupees(subtotalMinor)}</span>
                </div>
                <div className="flex justify-between">
                  <span>18% GST (Tax):</span>
                  <span className="font-semibold text-slate-900">{formatRupees(gstMinor)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Industrial Logistics:</span>
                  <span className="font-semibold text-emerald-700">Free Promotion</span>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">Total Payable:</span>
                  <span className="text-xl font-extrabold text-sky-700">
                    {formatRupees(totalMinor)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 py-3.5 px-4 text-xs font-bold text-white hover:shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Generating Tax Invoice &amp; Placing Order...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Authorize Order</span>
                    <ArrowRight className="h-4 w-4 text-white" />
                  </>
                )}
              </button>

              <div className="text-[10px] text-center text-slate-400">
                By clicking Confirm, an official B2B purchase contract is registered under YRC Global terms.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
