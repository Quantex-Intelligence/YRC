"use client";

import React from "react";
import Link from "next/link";
import {
  Megaphone,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award,
  Users,
  Building2,
  ArrowRight,
  Send,
  Sparkles,
} from "lucide-react";

export default function AdvertisePage() {
  const tiers = [
    {
      name: "Verified OEM Listing",
      price: "₹25,000",
      period: "per year",
      desc: "Essential digital showroom for original equipment manufacturers with verified provenance audit.",
      features: [
        "Full Company & Brand Profile",
        "Unlimited Product Catalogue Ingestion",
        "Direct RFQ Routing to Corporate Email",
        "Verified OEM Security Seal",
        "Scanned Brochure Lightbox Integration",
      ],
      popular: false,
    },
    {
      name: "Category Exclusive Sponsor",
      price: "₹75,000",
      period: "per year",
      desc: "Top placement in specific categories (e.g. Roots Blowers, Ultrafiltration, Valves) with high buyer intent.",
      features: [
        "All Verified OEM Listing Features",
        "Top 3 Guaranteed Placement in Category",
        "Homepage Featured Equipment Carousel",
        "Engineering Calculator Product Linkage",
        "Monthly Buyer Traffic & RFQ Analytics",
      ],
      popular: true,
    },
    {
      name: "Turnkey EPC Enterprise Partner",
      price: "₹1,50,000",
      period: "per year",
      desc: "Comprehensive lead generation for large turnkey plants, Bio-CBG skids, and municipal tenders.",
      features: [
        "All Category Sponsor Privileges",
        "Direct GeM & Government Tender Leads",
        "Multi-Vendor RFQ Priority Consortium",
        "Dedicated Technical Sales Account Manager",
        "Custom Video & 3D Render Asset Showcase",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header Breadcrumbs */}
        <div className="space-y-2">
          <nav className="text-xs text-slate-500 flex items-center space-x-2">
            <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Advertise with YRC Global</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full mb-2">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" /> High-Intent B2B Industrial Reach
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Advertise on India&apos;s Premier Industrial Marketplace
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
                Connect your industrial machinery, process equipment, and engineering solutions directly with plant managers, procurement heads, and EPC contractors.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Verified Buyer Inquiries Only</span>
            </div>
          </div>
        </div>

        {/* Metric Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs">
            <div className="text-2xl font-extrabold text-sky-700">50,000+</div>
            <div className="text-xs text-slate-500 mt-1">Monthly Procurement Views</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs">
            <div className="text-2xl font-extrabold text-emerald-600">100%</div>
            <div className="text-xs text-slate-500 mt-1">Direct Manufacturer Inquiries</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs">
            <div className="text-2xl font-extrabold text-orange-600">Zero</div>
            <div className="text-xs text-slate-500 mt-1">Third-Party Broker Intermediaries</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs">
            <div className="text-2xl font-extrabold text-rose-700">35+</div>
            <div className="text-xs text-slate-500 mt-1">Key Process Sectors Covered</div>
          </div>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-3xl p-8 flex flex-col justify-between space-y-6 transition-all ${
                t.popular
                  ? "bg-gradient-to-b from-sky-50/70 via-white to-slate-50 text-slate-900 border-2 border-sky-500 shadow-xl relative"
                  : "bg-white text-slate-900 border border-slate-200 shadow-xs hover:border-sky-300 hover:shadow-md"
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-600 to-blue-600 px-4 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md">
                  Most Selected by Manufacturers
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold">{t.name}</h3>
                  <p className="text-xs mt-1 text-slate-500">{t.desc}</p>
                </div>

                <div className="flex items-baseline space-x-1 pt-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t.price}</span>
                  <span className="text-xs text-slate-500">/{t.period}</span>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70 text-slate-500">
                    Included Privileges:
                  </span>
                  {t.features.map((f) => (
                    <div key={f} className="flex items-center text-xs space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#lead-form"
                className={`w-full text-center py-3 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] ${
                  t.popular
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                    : "bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white"
                }`}
              >
                Select Package
              </a>
            </div>
          ))}
        </div>

        {/* Lead Capture Form */}
        <div id="lead-form" className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
              Manufacturer Onboarding
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
              List Your Industrial Equipment on YRC Global
            </h2>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Our engineering team will digitize your catalogues, extract your technical tables, and publish verified product listings.
            </p>
          </div>

          <form action="/rfq" method="GET" className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Company / OEM Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alpha Engineering Works Pvt Ltd"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Equipment Category *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Roots Blowers, Valves, STP Plants"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official Corporate Email *</label>
                <input
                  type="email"
                  required
                  placeholder="director@alpha-engineering.com"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mobile / Direct Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Catalogue PDF Link or Information</label>
              <textarea
                rows={3}
                placeholder="Share your website or brochure URL for our provenance extraction team..."
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 py-3.5 text-center text-xs font-bold text-white hover:shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <Megaphone className="h-4 w-4" />
              <span>Submit Listing &amp; Advertising Application</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
