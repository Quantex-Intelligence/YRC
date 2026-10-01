import Link from "next/link";
import { prisma } from "@/lib/db";
import { FileText, Send, ShieldCheck, CheckCircle2 } from "lucide-react";
import { submitRfqAction } from "@/app/actions/rfq";

export const dynamic = "force-dynamic";

export default async function RfqPortalPage() {
  const products = await prisma.product.findMany({
    where: { isPublished: true },
    select: { id: true, name: true, entityKind: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200 p-8 text-slate-900 shadow-sm space-y-3 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
              Enterprise Procurement
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Request for Quotation (RFQ) Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Connect directly with verified Indian manufacturers for custom industrial blowers, bio-CBG gas upgrading skids, liquid ring vacuum systems, water treatment plants, and injection moulding machines.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 pointer-events-none">
            <FileText className="h-64 w-64 text-sky-600" />
          </div>
        </div>

        {/* RFQ Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Procurement Specification Form</h2>
            <p className="text-xs text-slate-500">
              Fill in your required capacity, project timeline, and operating location.
            </p>
          </div>

          <form action={submitRfqAction} className="space-y-5 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800">Target Catalogue Equipment (Optional)</label>
              <select
                name="productId"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
              >
                <option value="">— Custom Engineering Project / Unlisted Machine —</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    [{p.entityKind}] {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Procurement Officer / Contact Name *</label>
                <input
                  type="text"
                  name="buyerName"
                  placeholder="e.g. Vikramaditya Reddy"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Corporate Email Address *</label>
                <input
                  type="email"
                  name="buyerEmail"
                  placeholder="procurement@reddy-infra.com"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Direct Phone / WhatsApp *</label>
                <input
                  type="tel"
                  name="buyerPhone"
                  placeholder="+91 98765 43210"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Inquiry / Project Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. 5 TPD Pressmud Bio-CBG Turnkey Plant / 500 m3/hr Aeration Blower"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Quantity / Unit Requirement *</label>
                <input
                  type="number"
                  name="quantity"
                  min={1}
                  defaultValue={1}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Installation / Delivery Destination (City, State) *</label>
                <input
                  type="text"
                  name="deliveryLocation"
                  placeholder="e.g. Hyderabad, Telangana / Surat, Gujarat"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Target Delivery / Commissioning Date</label>
                <input
                  type="date"
                  name="targetDate"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800">Technical Details, Fluid Specs & Compliance Requirements</label>
              <textarea
                name="description"
                rows={4}
                placeholder="Specify design parameters: flow rates, inlet/outlet pressures, gas composition (CH4/H2S %), metallurgy (SS304/SS316/CI), or power supply voltage..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-8 py-3.5 text-xs font-bold text-white shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="h-4 w-4 text-white" />
                <span>Submit RFQ to Verified Suppliers</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
