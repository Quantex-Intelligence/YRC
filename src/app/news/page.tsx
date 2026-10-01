"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Newspaper,
  Globe,
  Droplets,
  Zap,
  Cpu,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calendar,
  FileText,
} from "lucide-react";

export default function NewsKnowledgePage() {
  const [activeTab, setActiveTab] = useState<
    "all" | "current" | "industry" | "water" | "energy" | "manufacturing" | "msme" | "tech"
  >("all");

  const articles = [
    {
      id: "cpcb-zld-mandate",
      category: "water",
      categoryName: "Water & Environment",
      badge: "Regulatory Mandate",
      title: "CPCB Mandates Continuous Effluent Monitoring (OCEMS) & Zero Liquid Discharge for Textile Clusters",
      date: "October 2026",
      readTime: "4 min read",
      summary: "Central Pollution Control Board tightens COD and ammoniacal nitrogen limits, mandating multi-stage ultrafiltration and reverse osmosis recycling for industrial estates.",
      tags: ["CPCB", "ZLD", "Membranes", "ETP"],
      source: "Ministry of Environment, Forest & Climate Change",
    },
    {
      id: "satat-cbg-expansion",
      category: "energy",
      categoryName: "Energy",
      badge: "National Policy",
      title: "SATAT Scheme Expands Capital Subsidy to ₹4 Crore for Turnkey Agro-Residue Bio-CBG Projects",
      date: "September 2026",
      readTime: "5 min read",
      summary: "Ministry of Petroleum enhances procurement tariffs and provides 10-year sovereign purchase guarantees for compressed biogas injected into city gas distribution networks.",
      tags: ["Bio-CBG", "SATAT", "IOCL", "Biogas"],
      source: "MoP&NG Press Bureau",
    },
    {
      id: "sidbi-cgtmse-cap",
      category: "msme",
      categoryName: "MSME",
      badge: "Credit Policy",
      title: "SIDBI Extends CGTMSE Guarantee Limit to ₹5 Crore for Green Manufacturing Enterprises",
      date: "September 2026",
      readTime: "3 min read",
      summary: "Micro and small enterprises purchasing energy-efficient roots blowers, solar structures, and automated waste converters now qualify for collateral-free bank financing.",
      tags: ["CGTMSE", "SIDBI", "Subsidies", "Financing"],
      source: "Ministry of MSME",
    },
    {
      id: "hollow-fiber-tech",
      category: "tech",
      categoryName: "Technology",
      badge: "Engineering Innovation",
      title: "Advancements in Thermally Induced Phase Separation (TIPS) PVDF Hollow Fiber Membranes",
      date: "August 2026",
      readTime: "6 min read",
      summary: "How Asahi Kasei Microza uniform 0.1-micron pore distribution prevents fouling, resists harsh chemical cleaning, and achieves 3x longer membrane lifespan in wastewater reuse.",
      tags: ["PVDF", "TIPS", "Ultrafiltration", "Membrane Science"],
      source: "Industrial Membrane Technology Journal",
    },
    {
      id: "injection-servo-trends",
      category: "manufacturing",
      categoryName: "Manufacturing",
      badge: "Industrial Automation",
      title: "Servo-Hydraulic Drives Reduce Energy Consumption in Injection Moulding by up to 60%",
      date: "August 2026",
      readTime: "4 min read",
      summary: "Analysis of Prikan Ultra Servo PAS technology demonstrating dynamic proportional pressure control and rapid cycle times for automotive component manufacturing.",
      tags: ["Prikan", "Servo Drive", "Plastics", "Energy Efficiency"],
      source: "Plastic Machinery Review",
    },
    {
      id: "water-testing-spectro",
      category: "current",
      categoryName: "Current Affairs",
      badge: "Analytical Instrumentation",
      title: "BIS 10500 Drinking Water Guidelines Enforce Direct UV-VIS Spectrophotometric Trace Testing",
      date: "July 2026",
      readTime: "4 min read",
      summary: "Laboratory compliance norms require dual-beam spectrophotometers with automatic wavelength verification for detection of heavy metals, phosphates, and nitrates.",
      tags: ["Lovibond", "UV-VIS", "Water Testing", "BIS 10500"],
      source: "Bureau of Indian Standards",
    },
  ];

  const filtered = activeTab === "all" ? articles : articles.filter((a) => a.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Breadcrumb & Header */}
        <div className="space-y-2">
          <nav className="text-xs text-slate-500 flex items-center space-x-2">
            <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">News &amp; Knowledge Hub</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full mb-2">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" /> Industrial Intelligence
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                News, Current Affairs &amp; Technical Insights
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Authoritative technical briefings on water treatment, renewable energy, manufacturing policy, and MSME regulations.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Verified Industry Sources</span>
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex border-b border-slate-200 bg-white rounded-2xl p-2 gap-1.5 shadow-2xs overflow-x-auto">
          {[
            { id: "all", label: "All Insights", icon: Globe },
            { id: "current", label: "Current Affairs", icon: Newspaper },
            { id: "water", label: "Water & Environment", icon: Droplets },
            { id: "energy", label: "Energy", icon: Zap },
            { id: "manufacturing", label: "Manufacturing", icon: Cpu },
            { id: "msme", label: "MSME Updates", icon: Award },
            { id: "tech", label: "Technology", icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isTabActive
                    ? "bg-sky-600 text-white shadow-md shadow-sky-100"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isTabActive ? "text-white" : "text-sky-600"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-sky-300 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="rounded-full bg-sky-50 text-sky-800 border border-sky-100 px-2.5 py-0.5 font-bold uppercase tracking-wider">
                    {item.categoryName}
                  </span>
                  <span className="text-slate-400 font-medium">{item.date}</span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 leading-snug hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.summary}
                </p>

                <div className="flex flex-wrap gap-1 pt-2">
                  {item.tags.map((t) => (
                    <span key={t} className="rounded-md bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-600">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">{item.source}</span>
                <Link
                  href={`/products?q=${encodeURIComponent(item.tags[0])}`}
                  className="font-bold text-sky-600 hover:text-sky-800 inline-flex items-center gap-1 hover:translate-x-0.5 transition-transform"
                >
                  <span>Explore Equipment</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
