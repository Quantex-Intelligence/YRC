import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  CheckCircle2,
  Package,
  Printer,
  ArrowRight,
  ShieldCheck,
  Building2,
  MapPin,
  Calendar,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface OrderPageProps {
  params: Promise<{
    orderNumber: string;
  }>;
}

export default async function OrderConfirmationPage({ params }: OrderPageProps) {
  const { orderNumber } = await params;

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: {
        include: { variant: true },
      },
      payments: true,
      buyer: {
        include: { profile: true },
      },
    },
  });

  if (!order) {
    notFound();
  }

  const formatRupees = (minorUnits: bigint | number) => {
    const val = typeof minorUnits === "bigint" ? Number(minorUnits) : minorUnits;
    return `₹${(val / 100).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  let shippingAddress: any = {};
  try {
    shippingAddress = JSON.parse(order.shippingAddressJson);
  } catch (e) {}

  const payment = order.payments[0];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success Header Card */}
        <div className="rounded-2xl border border-emerald-200 bg-white p-8 shadow-xs text-center space-y-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Commercial Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Thank You for Your Order
            </h1>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your official order has been registered in the YRC Global B2B procurement ledger and queued for manufacturer fulfillment.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 rounded-xl bg-slate-50 border border-slate-200 px-5 py-2.5 text-xs font-mono">
            <span className="text-slate-500 font-sans">Order Reference:</span>
            <span className="font-bold text-slate-900 text-sm">{order.orderNumber}</span>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-sky-600" /> Order Date
            </span>
            <div className="font-semibold text-slate-900">
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="text-[11px] text-slate-500">
              Status: <span className="font-bold text-emerald-700">{order.status}</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5 text-emerald-600" /> Settlement
            </span>
            <div className="font-semibold text-slate-900">
              {payment ? `${payment.provider} (${payment.status})` : "Verified"}
            </div>
            <div className="text-[11px] text-slate-500 font-mono truncate">
              Txn: {payment?.providerTransactionId || "N/A"}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-rose-500" /> Destination
            </span>
            <div className="font-semibold text-slate-900">
              {shippingAddress.city || "India"}, {shippingAddress.state || ""}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              PIN: {shippingAddress.postalCode || "—"}
            </div>
          </div>
        </div>

        {/* Order Items & Totals */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Line Items Snapshot ({order.items.length})
            </h2>
            <span className="text-xs text-slate-400">All prices in INR (₹)</span>
          </div>

          <div className="divide-y divide-slate-100">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{item.snapshotTitle}</div>
                  <div className="text-[11px] font-mono text-slate-500">
                    SKU: {item.snapshotSku} • Quantity: {item.quantity}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">
                    {formatRupees(item.totalPriceMinor)}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {formatRupees(item.unitPriceMinor)} / unit
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600 max-w-sm ml-auto">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-900">{formatRupees(order.subtotalMinor)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18% Harmonized):</span>
              <span className="font-semibold text-slate-900">{formatRupees(order.taxMinor)}</span>
            </div>
            <div className="flex justify-between">
              <span>Industrial Freight:</span>
              <span className="font-semibold text-emerald-700">Free Promotion</span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-slate-900">
              <span className="text-sm font-bold">Total Paid:</span>
              <span className="text-xl font-extrabold text-sky-700">
                {formatRupees(order.totalAmountMinor)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/products"
            className="rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-6 py-3 text-xs font-bold text-white shadow-md hover:shadow-sky-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all text-center"
          >
            Continue Procuring
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all text-center shadow-xs"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
