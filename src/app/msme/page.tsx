"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Calculator,
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileCheck,
  Building2,
  Coins,
} from "lucide-react";

export default function MsmeSchemesPage() {
  const [projectCostLakhs, setProjectCostLakhs] = useState<number>(100); // 100 Lakhs = 1 Crore
  const [promoterCategory, setPromoterCategory] = useState<"general" | "special">("general");
  const [locationType, setLocationType] = useState<"urban" | "rural">("rural");
  const [schemeType, setSchemeType] = useState<"cgtmse" | "pmegp" | "satat">("cgtmse");

  // Subsidy calculations
  let subsidyPercent = 0;
  let maxSubsidyLakhs = 0;
  let ownContributionPercent = 10;
  let bankLoanPercent = 90;

  if (schemeType === "pmegp") {
    // PMEGP: Manufacturing project max 50 Lakhs
    const cappedCost = Math.min(projectCostLakhs, 50);
    if (promoterCategory === "special") {
      subsidyPercent = locationType === "rural" ? 35 : 25;
      ownContributionPercent = 5;
    } else {
      subsidyPercent = locationType === "rural" ? 25 : 15;
      ownContributionPercent = 10;
    }
    maxSubsidyLakhs = (cappedCost * subsidyPercent) / 100;
    bankLoanPercent = 100 - ownContributionPercent - subsidyPercent;
  } else if (schemeType === "satat") {
    // SATAT: Up to 4 Crore (400 Lakhs) capital subsidy under Ministry of Petroleum & Natural Gas
    subsidyPercent = 20;
    maxSubsidyLakhs = Math.min(400, (projectCostLakhs * subsidyPercent) / 100);
    ownContributionPercent = 15;
    bankLoanPercent = 85;
  } else {
    // CGTMSE: Collateral-free loan up to 500 Lakhs (5 Crore), 85% credit guarantee coverage
    subsidyPercent = 0;
    maxSubsidyLakhs = 0;
    ownContributionPercent = 15;
    bankLoanPercent = 85;
  }

  const eligibleLoanLakhs = Math.min(500, (projectCostLakhs * bankLoanPercent) / 100);
  const promoterEquityLakhs = (projectCostLakhs * ownContributionPercent) / 100;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header Breadcrumbs */}
        <div className="space-y-2">
          <nav className="text-xs text-slate-500 flex items-center space-x-2">
            <Link href="/" className="hover:text-sky-600">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">MSME Government Subsidies &amp; Financing</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" /> Government Industrial Incentives
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                MSME Schemes &amp; Capital Subsidy Advisory
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Official financing schemes to subsidize plant machinery, Bio-CBG skids, and industrial water treatment installations.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>MoMSME &amp; SIDBI Recognized</span>
            </div>
          </div>
        </div>

        {/* 3 Core Scheme Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Scheme 1: CGTMSE */}
          <button
            type="button"
            onClick={() => setSchemeType("cgtmse")}
            className={`text-left rounded-2xl p-5 border transition-all cursor-pointer hover:-translate-y-0.5 duration-200 ${
              schemeType === "cgtmse"
                ? "bg-sky-50 text-slate-900 border-sky-500 shadow-md ring-2 ring-sky-200"
                : "bg-white text-slate-900 border-slate-200 hover:border-slate-300 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                schemeType === "cgtmse" ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"
              }`}>
                Credit Guarantee
              </span>
              <Coins className={`h-5 w-5 ${schemeType === "cgtmse" ? "text-sky-600" : "text-slate-400"}`} />
            </div>
            <h3 className="text-base font-bold mt-3 text-slate-900">CGTMSE Scheme</h3>
            <p className="text-xs mt-1 leading-relaxed text-slate-600">
              Collateral-free term loans up to ₹5 Crore for plant machinery procurement with 85% sovereign guarantee coverage.
            </p>
          </button>

          {/* Scheme 2: SATAT */}
          <button
            type="button"
            onClick={() => setSchemeType("satat")}
            className={`text-left rounded-2xl p-5 border transition-all cursor-pointer hover:-translate-y-0.5 duration-200 ${
              schemeType === "satat"
                ? "bg-emerald-50 text-slate-900 border-emerald-500 shadow-md ring-2 ring-emerald-200"
                : "bg-white text-slate-900 border-slate-200 hover:border-slate-300 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                schemeType === "satat" ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-800"
              }`}>
                Renewable Energy
              </span>
              <Building2 className={`h-5 w-5 ${schemeType === "satat" ? "text-emerald-600" : "text-slate-400"}`} />
            </div>
            <h3 className="text-base font-bold mt-3 text-slate-900">SATAT Bio-CBG Grant</h3>
            <p className="text-xs mt-1 leading-relaxed text-slate-600">
              Up to ₹4 Crore capital subsidy plus commercial offtake guarantee by PSU oil marketing companies (IOCL, HPCL, BPCL).
            </p>
          </button>

          {/* Scheme 3: PMEGP */}
          <button
            type="button"
            onClick={() => setSchemeType("pmegp")}
            className={`text-left rounded-2xl p-5 border transition-all cursor-pointer hover:-translate-y-0.5 duration-200 ${
              schemeType === "pmegp"
                ? "bg-amber-50 text-slate-900 border-amber-500 shadow-md ring-2 ring-amber-200"
                : "bg-white text-slate-900 border-slate-200 hover:border-slate-300 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                schemeType === "pmegp" ? "bg-amber-600 text-white" : "bg-amber-100 text-amber-800"
              }`}>
                Capital Margin
              </span>
              <Award className={`h-5 w-5 ${schemeType === "pmegp" ? "text-amber-600" : "text-slate-400"}`} />
            </div>
            <h3 className="text-base font-bold mt-3 text-slate-900">PMEGP Capital Subsidy</h3>
            <p className="text-xs mt-1 leading-relaxed text-slate-600">
              15% to 35% non-repayable government margin money subsidy on manufacturing project setups up to ₹50 Lakhs.
            </p>
          </button>
        </div>

        {/* Interactive Subsidy Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {/* Left Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Configure Industrial Project Capital</h3>
              <p className="text-xs text-slate-500">Estimate project capital structure and eligible grants.</p>
            </div>

            {/* Project Cost Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-slate-700">Total Project / Equipment Investment</label>
                <span className="font-mono font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded">
                  ₹{projectCostLakhs >= 100 ? `${(projectCostLakhs / 100).toFixed(2)} Crore` : `${projectCostLakhs} Lakhs`}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={projectCostLakhs}
                onChange={(e) => setProjectCostLakhs(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹10 Lakhs</span>
                <span>₹2.5 Crore</span>
                <span>₹5.0 Crore (Max CGTMSE)</span>
              </div>
            </div>

            {/* Promoter Category */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Promoter Beneficiary Category</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPromoterCategory("general")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    promoterCategory === "general"
                      ? "bg-sky-600 text-white border-sky-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  General Category
                </button>
                <button
                  type="button"
                  onClick={() => setPromoterCategory("special")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    promoterCategory === "special"
                      ? "bg-sky-600 text-white border-sky-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Special (SC/ST/Women/NER)
                </button>
              </div>
            </div>

            {/* Location Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Industrial Site Location</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLocationType("rural")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    locationType === "rural"
                      ? "bg-sky-600 text-white border-sky-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Rural Area (Higher Subsidy)
                </button>
                <button
                  type="button"
                  onClick={() => setLocationType("urban")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    locationType === "urban"
                      ? "bg-sky-600 text-white border-sky-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Urban Industrial Zone
                </button>
              </div>
            </div>
          </div>

          {/* Right Results Panel */}
          <div className="lg:col-span-5 bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900 rounded-2xl p-6 flex flex-col justify-between shadow-md space-y-6 border border-sky-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                  Project Capital Structure
                </span>
                <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono px-2.5 py-0.5 border border-emerald-200 font-bold">
                  {schemeType.toUpperCase()}
                </span>
              </div>

              {/* Subsidy Amount */}
              {maxSubsidyLakhs > 0 ? (
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-1">
                  <span className="text-[10px] text-emerald-800 uppercase tracking-wider font-bold">
                    Eligible Government Capital Grant
                  </span>
                  <div className="text-2xl font-extrabold text-emerald-700">
                    ₹{maxSubsidyLakhs >= 100 ? `${(maxSubsidyLakhs / 100).toFixed(2)} Crore` : `${maxSubsidyLakhs.toFixed(1)} Lakhs`}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">({subsidyPercent}% Non-Repayable Margin Money)</span>
                </div>
              ) : (
                <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 space-y-1">
                  <span className="text-[10px] text-sky-800 uppercase tracking-wider font-bold">
                    Collateral-Free Loan Guarantee
                  </span>
                  <div className="text-2xl font-extrabold text-sky-700">₹5.00 Crore</div>
                  <span className="text-[11px] text-sky-600 font-medium">No third-party mortgage required</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-500 block">Bank Debt Portion</span>
                  <span className="text-base font-extrabold text-slate-900">
                    ₹{eligibleLoanLakhs >= 100 ? `${(eligibleLoanLakhs / 100).toFixed(2)} Cr` : `${eligibleLoanLakhs.toFixed(1)} L`}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1 font-mono">({bankLoanPercent}%)</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-500 block">Promoter Margin</span>
                  <span className="text-base font-extrabold text-orange-600">
                    ₹{promoterEquityLakhs >= 100 ? `${(promoterEquityLakhs / 100).toFixed(2)} Cr` : `${promoterEquityLakhs.toFixed(1)} L`}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1 font-mono">({ownContributionPercent}%)</span>
                </div>
              </div>
            </div>

            {/* Advisory CTA */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="rounded-xl bg-white p-3.5 border border-sky-100 text-xs space-y-1 shadow-2xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <FileCheck className="h-4 w-4 text-sky-600" />
                  DPR &amp; Bankable Project Report
                </div>
                <p className="text-[11px] text-slate-600">
                  Connect with CED ALEAP advisors to prepare your Detailed Project Report (DPR) and submit applications to nationalized banks.
                </p>
              </div>

              <Link
                href="/rfq"
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 py-3 text-center text-xs font-bold text-white shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Request Project Subsidy Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
