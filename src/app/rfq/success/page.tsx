import Link from "next/link";
import { CheckCircle2, FileText, ArrowRight, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

interface SuccessPageProps {
  searchParams: Promise<{
    rfqNumber?: string;
  }>;
}

export default async function RfqSuccessPage({ searchParams }: SuccessPageProps) {
  const { rfqNumber } = await searchParams;

  return (
    <div className="bg-slate-50 min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center space-y-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
            Inquiry Transmitted
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Request for Quotation Submitted
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
            Your commercial and technical RFQ has been logged and routed to the authorized manufacturer engineering desk.
          </p>
        </div>

        {rfqNumber && (
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1">
            <span className="text-xs text-slate-500">Official Tracking Reference:</span>
            <div className="text-lg font-mono font-bold text-sky-700 tracking-wider">
              {rfqNumber}
            </div>
          </div>
        )}

        <div className="rounded-lg bg-sky-50 border border-sky-200 p-3 text-[11px] text-sky-900 flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-sky-600 shrink-0" />
          <span>Manufacturers typically respond within 24 to 48 business hours with verified quotation pricing.</span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/products"
            className="rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-6 py-3 text-xs font-bold text-white hover:-translate-y-0.5 active:scale-[0.98] transition-all text-center shadow-xs"
          >
            Explore More Equipment
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-slate-300 px-6 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:-translate-y-0.5 active:scale-[0.98] transition-all text-center"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
