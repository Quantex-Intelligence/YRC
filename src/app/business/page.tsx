"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Building,
  Handshake,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Layers,
  Award,
} from "lucide-react";

export default function BusinessOpportunitiesPage() {
  const [activeTab, setActiveTab] = useState<"units" | "franchise" | "channel" | "opportunities">("units");

  const manufacturingUnits = [
    {
      title: "Bio-CBG & Biogas Skid Manufacturing Facility",
      location: "Sanand Industrial Estate, Ahmedabad, Gujarat",
      area: "25,000 sq.ft covered workshop",
      capacity: "Up to 50 skids/year • High-pressure piping & ASME welding certified",
      specs: ["PESO Approved Testing Bay", "CNC Plate Bending", "Automated Tig/Mig Welding"],
      investment: "Turnkey Contract Manufacturing & Assembly",
      contact: "OEM Partnership Available",
    },
    {
      title: "Precision Roots Blower & Liquid Ring Assembly Line",
      location: "Bhiwandi / Turbhe, Maharashtra",
      area: "18,000 sq.ft CNC machining facility",
      capacity: "Twin-lobe & Tri-lobe blowers up to 10,000 m³/hr",
      specs: ["Dynamic Rotor Balancing Rig", "Acoustic Test Chamber", "ISO 9001:2015"],
      investment: "OEM Co-Manufacturing Available",
      contact: "Factory Direct",
    },
    {
      title: "Turnkey Packaged STP/ETP Fabrication Works",
      location: "Cherlapally, Hyderabad, Telangana",
      area: "30,000 sq.ft heavy structural bay",
      capacity: "10 KLD to 1 MLD pre-fabricated containerized plants",
      specs: ["Epoxy Coating Bay", "FRP Winding Rig", "Hydrostatic Pressure Testing"],
      investment: "Joint Venture / Subcontracting",
      contact: "EPC Partnership",
    },
  ];

  const franchises = [
    {
      title: "Regional Industrial Consumables & Valve Dealership",
      territory: "North India (Delhi-NCR, Haryana, Punjab)",
      products: "Planet Valves, GSE Filter Cartridges, Organica Biocultures",
      investmentRange: "₹15 Lakhs – ₹35 Lakhs",
      roi: "Estimated 22%–28% Annual Gross Margin",
      support: "Guaranteed Regional RFQ Lead Allocation & Dedicated Technical Support",
    },
    {
      title: "Water Treatment Skid EPC Franchise",
      territory: "South India (Tamil Nadu, Karnataka, Andhra Pradesh)",
      products: "PTC Watertech & Asahi Kasei Microza Packaged Plants",
      investmentRange: "₹40 Lakhs – ₹80 Lakhs",
      roi: "Turnkey EPC Margin 18%–25%",
      support: "Engineering Drawing Support, Direct Membrane Supply, Bank DPR Advisory",
    },
    {
      title: "Cleantech & Decentralized Waste Management Franchise",
      territory: "Western India (Maharashtra, Gujarat, Goa)",
      products: "Greeneria Automated Organic Waste Converters (OWC) & Bio-Bins",
      investmentRange: "₹20 Lakhs – ₹45 Lakhs",
      roi: "Municipal & Corporate Capex Margin 25%+",
      support: "Government GeM Tender Assistance & On-Site Commissioning Training",
    },
  ];

  const channelPartners = [
    {
      name: "Authorized Industrial Distribution Partner (AIDP)",
      description: "Exclusive stockist and delivery network for fast-moving components (cartridges, instruments, valves).",
      tier: "Tier-1 Stockist",
      benefits: ["Direct OEM Factory Invoicing", "Preferred Distributor Margin", "Co-branded Marketing"],
    },
    {
      name: "Certified Systems Integrator (CSI)",
      description: "Authorized engineering partners capable of designing, installing, and servicing turnkey skids.",
      tier: "Engineering Partner",
      benefits: ["Technical Sizing Tools Access", "Engineering RFQ Priority Dispatch", "OEM Factory Certification"],
    },
    {
      name: "Institutional Project Liaison (IPL)",
      description: "Advisors managing state municipal corporation, smart city, and large industrial park tenders.",
      tier: "Strategic Advisor",
      benefits: ["Turnkey DPR Support", "Consortium Bidding Structure", "Success-Linked Referral Fees"],
    },
  ];

  const businessOpportunities = [
    {
      title: "Joint Venture for Bio-CBG Commercial Plants under SATAT",
      sector: "Renewable Energy & Biofuels",
      scope: "Partnership to establish 5 TPD to 20 TPD CBG generation and bottling plants with commercial offtake guarantee from Indian Oil / HPCL.",
      subsidy: "Up to ₹4 Crore Central Government Subsidy Applicable",
      roi: "High IRR with 10-year sovereign offtake agreements",
    },
    {
      title: "Zero Liquid Discharge (ZLD) BOT / BOO Concessions",
      sector: "Industrial Wastewater Recycling",
      scope: "Build-Operate-Transfer (BOT) models for textile, chemical, and pharma clusters needing effluent recycling.",
      subsidy: "Eligible for State Industrial Investment Promotion Subsidies",
      roi: "Assured monthly utility tariff per cubic meter of treated water",
    },
    {
      title: "Biomass Briquetting & White Coal Pellet Supply Contracts",
      sector: "Thermal Power & Boiler Decarbonization",
      scope: "Long-term biomass supply contracts to supply 500 MT/month to industrial boiler plants seeking coal replacement.",
      subsidy: "Priority Sector MSME Lending with CGTMSE Coverage",
      roi: "Rapid payback with continuous boiler plant demand",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Breadcrumb & Header */}
        <div className="space-y-2">
          <nav className="text-xs text-slate-500 flex items-center space-x-2">
            <Link href="/" className="hover:text-sky-600">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Business Opportunities</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" /> Corporate Ecosystem
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Business Opportunities &amp; Partnerships
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Explore manufacturing infrastructure, dealership franchises, channel distribution, and turnkey joint ventures.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Verified Corporate Network</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-white rounded-2xl p-2 gap-2 shadow-2xs overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("units")}
            className={`flex items-center space-x-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "units"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Building className={`h-4 w-4 ${activeTab === "units" ? "text-white" : "text-sky-600"}`} />
            <span>Manufacturing Units</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("franchise")}
            className={`flex items-center space-x-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "franchise"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Briefcase className={`h-4 w-4 ${activeTab === "franchise" ? "text-white" : "text-orange-500"}`} />
            <span>Franchise Opportunities</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("channel")}
            className={`flex items-center space-x-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "channel"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Handshake className={`h-4 w-4 ${activeTab === "channel" ? "text-white" : "text-emerald-600"}`} />
            <span>Channel Partners</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("opportunities")}
            className={`flex items-center space-x-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "opportunities"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <TrendingUp className={`h-4 w-4 ${activeTab === "opportunities" ? "text-white" : "text-rose-600"}`} />
            <span>Turnkey Opportunities</span>
          </button>
        </div>

        {/* Tab 1: Manufacturing Units */}
        {activeTab === "units" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {manufacturingUnits.map((unit) => (
              <div
                key={unit.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-sky-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 hover:-translate-y-1 duration-300"
              >
                <div className="space-y-3">
                  <span className="rounded-full bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    {unit.contact}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{unit.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                    <span>{unit.location}</span>
                  </p>
                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div><strong>Facility Area:</strong> {unit.area}</div>
                    <div><strong>Rated Capacity:</strong> {unit.capacity}</div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Key Certifications &amp; Infra:</span>
                    <div className="flex flex-wrap gap-1">
                      {unit.specs.map((s) => (
                        <span key={s} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href="/rfq"
                    className="w-full inline-flex items-center justify-center space-x-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                  >
                    <span>Enquire for Contract Manufacturing</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Franchise Opportunities */}
        {activeTab === "franchise" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {franchises.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-orange-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 hover:-translate-y-1 duration-300"
              >
                <div className="space-y-3">
                  <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    Regional Territory Exclusive
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{f.title}</h3>
                  <p className="text-xs text-slate-600 font-medium"><strong>Territory:</strong> {f.territory}</p>
                  <p className="text-xs text-slate-500"><strong>Covered Lines:</strong> {f.products}</p>

                  <div className="rounded-xl bg-slate-50 p-3 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Capex Investment:</span>
                      <span className="font-bold text-slate-900">{f.investmentRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Projected Returns:</span>
                      <span className="font-bold text-emerald-700">{f.roi}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    <strong>OEM Support:</strong> {f.support}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href="/rfq"
                    className="w-full inline-flex items-center justify-center space-x-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                  >
                    <span>Apply for Franchise License</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Channel Partners */}
        {activeTab === "channel" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {channelPartners.map((cp) => (
              <div
                key={cp.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 hover:-translate-y-1 duration-300"
              >
                <div className="space-y-3">
                  <span className="rounded-full bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    {cp.tier}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{cp.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{cp.description}</p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Partner Privileges:</span>
                    {cp.benefits.map((b) => (
                      <div key={b} className="flex items-center text-xs text-slate-700 gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href="/rfq"
                    className="w-full inline-flex items-center justify-center space-x-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                  >
                    <span>Register as Channel Partner</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Business Opportunities */}
        {activeTab === "opportunities" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessOpportunities.map((bo) => (
              <div
                key={bo.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-rose-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 hover:-translate-y-1 duration-300"
              >
                <div className="space-y-3">
                  <span className="rounded-full bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    {bo.sector}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{bo.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{bo.scope}</p>

                  <div className="rounded-xl bg-slate-50 p-3 space-y-1.5 text-xs">
                    <div className="text-slate-700">
                      <strong>Subsidy:</strong> <span className="text-emerald-700">{bo.subsidy}</span>
                    </div>
                    <div className="text-slate-700">
                      <strong>Commercial Return:</strong> {bo.roi}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href="/rfq"
                    className="w-full inline-flex items-center justify-center space-x-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                  >
                    <span>Request Project Brief &amp; DPR</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
