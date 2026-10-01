import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Users,
  Award,
  Globe,
  ArrowRight,
  Sparkles,
  Layers,
  Lock,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Breadcrumb & Header */}
        <div className="space-y-2">
          <nav className="text-xs text-slate-500 flex items-center space-x-2">
            <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">About YRC Global</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full mb-2">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" /> Corporate Overview &amp; Mission
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                About YRC Global
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                India&apos;s authoritative B2B and B2C industrial engineering marketplace and manufacturer ecosystem.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Zero-Hallucination Integrity</span>
            </div>
          </div>
        </div>

        {/* Hero Card with Official Logo */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-white p-2 shadow-xs border border-slate-200">
              <Image
                src="/images/yrc-logo.jpg"
                alt="Official YRC logo"
                width={112}
                height={112}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-900 block">YRC Global</span>
              <span className="text-[10px] text-sky-700 font-semibold uppercase tracking-wider">Connecting Brands, Creating Impact</span>
            </div>
            <p className="text-[10px] text-slate-500 max-w-xs leading-normal">
              Brand asset registered under YRC Expo Marketing Private Limited.
            </p>
          </div>

          <div className="md:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full inline-block">
              Our Foundational Purpose
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
              Democratizing Industrial Procurement Through Cryptographic Provenance &amp; Engineering Accuracy
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Industrial procurement is too critical for generic e-commerce templates and fabricated marketplace ratings. Plant engineers, wastewater consultants, and energy developers need exact CFM airflow curves, pump head ratings, and membrane flux metrics that match factory test certificates.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              YRC Global solves this by directly ingesting and cryptographically auditing authorized OEM catalogues, creating an integrated ecosystem where standard consumables can be purchased with instant GST invoicing, while complex capital skids can be sized, compared, and quoted transparently.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Integrity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-2 hover:-translate-y-1 transition-all">
            <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Zero Hallucinations</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every technical metric is bound to a physical PDF brochure with SHA-256 cryptographic verification.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-2 hover:-translate-y-1 transition-all">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Verified OEM Direct</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Quotes and commercial orders connect directly to authorized manufacturers without middleman commissions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-2 hover:-translate-y-1 transition-all">
            <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Dual Commercial Model</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Instant B2C/B2B online checkout for consumables alongside milestone-based B2B RFQs for turnkey EPC plants.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-2 hover:-translate-y-1 transition-all">
            <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-700 border border-rose-100 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">MSME Empowerment</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Direct linkage to CGTMSE collateral-free loans, SATAT CBG capital subsidies, and PMEGP government schemes.
            </p>
          </div>
        </div>

        {/* Corporate Disclosure Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-sky-50 via-white to-slate-50 text-slate-800 p-6 sm:p-8 border border-sky-200 space-y-3 shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-bold text-sky-800 uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> Official Brand Asset &amp; Provenance Disclosure
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The brand logo presented across this platform is the authentic source asset of YRC Expo Marketing Private Limited. In strict compliance with YRC architectural standards, supplier claims in uploaded catalogues remain the representations of respective manufacturers until verified through independent third-party audits. YRC Global maintains complete audit logs, extraction page references, and SHA-256 hashes for all platform content.
          </p>
        </div>
      </div>
    </div>
  );
}
