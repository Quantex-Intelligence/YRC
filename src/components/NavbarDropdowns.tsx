"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function NavbarDropdowns() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150);
  };

  return (
    <nav
      aria-label="Hierarchical Category Navigation"
      className="border-b-2 border-sky-300 bg-white/95 px-4 py-2 text-xs font-bold text-slate-700 relative z-40 shadow-xs"
    >
      <div className="mx-auto flex max-w-7xl items-center space-x-1 sm:space-x-3 overflow-x-visible">
        {/* Home */}
        <Link
          href="/"
          className="rounded-xl px-2.5 py-1.5 text-slate-800 hover:text-sky-700 hover:bg-white border border-transparent hover:border-slate-200 transition-all shrink-0 font-bold"
        >
          Home
        </Link>

        {/* 1. Products Dropdown */}
        <div
          className="relative shrink-0"
          onMouseEnter={() => handleMouseEnter("products")}
          onMouseLeave={handleMouseLeave}
        >
          <button
            type="button"
            className={`flex items-center space-x-1 rounded-xl px-2.5 py-1.5 transition-all cursor-pointer ${
              openMenu === "products"
                ? "text-sky-700 bg-white border border-slate-200 shadow-2xs font-bold"
                : "hover:text-sky-700 hover:bg-white"
            }`}
          >
            <span>Products</span>
            <ChevronDown className="h-3 w-3 opacity-60" />
          </button>

          {openMenu === "products" && (
            <div className="absolute top-full left-0 mt-1 w-64 rounded-2xl border border-slate-200 bg-white/98 backdrop-blur-xl p-3 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-1 z-50">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 px-2 py-1 border-b border-slate-100 flex items-center justify-between">
                <span>Equipment Taxonomies</span>
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              </div>
              <div className="max-h-80 overflow-y-auto space-y-0.5 pt-1 pr-1">
                {[
                  { name: "Water & Wastewater", href: "/products?category=water-wastestate-treatment" },
                  { name: "Pumps", href: "/products?q=Pump" },
                  { name: "Vacuum Systems", href: "/products?q=Vacuum+Pump" },
                  { name: "Filtration", href: "/products?q=Filter" },
                  { name: "Blowers", href: "/products?q=Roots+Blower" },
                  { name: "Bioenergy", href: "/products?category=renewable-energy-bio-cbg" },
                  { name: "Renewable Energy", href: "/products?q=Solar" },
                  { name: "Environmental Products", href: "/products?category=waste-management-circular-cleantech" },
                  { name: "Industrial Equipment", href: "/products?category=industrial-machinery-flow-control" },
                  { name: "Automation & Controls", href: "/products?q=Analyzer" },
                  { name: "Testing Equipment", href: "/products?q=Spectrophotometer" },
                  { name: "Eco-Friendly Products", href: "/products?q=Eco" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                    className="block rounded-xl px-2.5 py-1.5 text-xs text-slate-700 hover:text-sky-800 hover:bg-sky-50 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-1.5 border-t border-slate-100 mt-1">
                  <Link
                    href="/categories"
                    onClick={() => setOpenMenu(null)}
                    className="block rounded-xl px-2.5 py-1.5 text-xs font-bold text-sky-600 hover:bg-sky-50 transition-colors"
                  >
                    All Categories Index →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. Companies Dropdown */}
        <div
          className="relative shrink-0"
          onMouseEnter={() => handleMouseEnter("companies")}
          onMouseLeave={handleMouseLeave}
        >
          <button
            type="button"
            className={`flex items-center space-x-1 rounded-xl px-2.5 py-1.5 transition-all cursor-pointer ${
              openMenu === "companies"
                ? "text-sky-700 bg-white border border-slate-200 shadow-2xs font-bold"
                : "hover:text-sky-700 hover:bg-white"
            }`}
          >
            <span>Companies</span>
            <ChevronDown className="h-3 w-3 opacity-60" />
          </button>

          {openMenu === "companies" && (
            <div className="absolute top-full left-0 mt-1 w-56 rounded-2xl border border-slate-200 bg-white/98 backdrop-blur-xl p-3 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-1 z-50">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 px-2 py-1 border-b border-slate-100 flex items-center justify-between">
                <span>Supplier Directory</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="space-y-0.5 pt-1">
                {[
                  { name: "Manufacturers", href: "/companies?type=Manufacturer" },
                  { name: "Suppliers", href: "/companies?type=Supplier" },
                  { name: "Channel Partners", href: "/business" },
                  { name: "Service Providers", href: "/companies?type=Service" },
                  { name: "Firms Directory", href: "/companies" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                    className="block rounded-xl px-2.5 py-1.5 text-xs text-slate-700 hover:text-sky-800 hover:bg-sky-50 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Deals Dropdown in Mint / Light Green */}
        <div
          className="relative shrink-0"
          onMouseEnter={() => handleMouseEnter("deals")}
          onMouseLeave={handleMouseLeave}
        >
          <button
            type="button"
            className={`flex items-center space-x-1 rounded-xl px-2.5 py-1.5 transition-all cursor-pointer font-bold ${
              openMenu === "deals"
                ? "text-emerald-700 bg-emerald-50 border border-emerald-200 shadow-2xs"
                : "text-emerald-700 hover:bg-emerald-50/80"
            }`}
          >
            <span>Deals</span>
            <ChevronDown className="h-3 w-3 opacity-70 text-emerald-600" />
          </button>

          {openMenu === "deals" && (
            <div className="absolute top-full left-0 mt-1 w-56 rounded-2xl border border-emerald-200 bg-white/98 backdrop-blur-xl p-3 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-1 z-50">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 px-2 py-1 border-b border-emerald-100 flex items-center justify-between">
                <span>Factory Direct Offers</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="space-y-0.5 pt-1">
                {[
                  { name: "Today's Deals", href: "/deals" },
                  { name: "Best Deals", href: "/deals" },
                  { name: "Supplier Offers", href: "/deals" },
                  { name: "Bulk Deals", href: "/deals" },
                  { name: "Featured Deals", href: "/deals" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                    className="block rounded-xl px-2.5 py-1.5 text-xs text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. MSME Dropdown in Coral / Light Orange */}
        <div
          className="relative shrink-0"
          onMouseEnter={() => handleMouseEnter("msme")}
          onMouseLeave={handleMouseLeave}
        >
          <button
            type="button"
            className={`flex items-center space-x-1 rounded-xl px-2.5 py-1.5 transition-all cursor-pointer font-bold ${
              openMenu === "msme"
                ? "text-orange-700 bg-orange-50 border border-orange-200 shadow-2xs"
                : "text-slate-700 hover:text-orange-700 hover:bg-orange-50/80"
            }`}
          >
            <span>MSME</span>
            <ChevronDown className="h-3 w-3 opacity-60" />
          </button>

          {openMenu === "msme" && (
            <div className="absolute top-full left-0 mt-1 w-56 rounded-2xl border border-orange-200 bg-white/98 backdrop-blur-xl p-3 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-1 z-50">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-orange-700 px-2 py-1 border-b border-orange-100 flex items-center justify-between">
                <span>Government Schemes</span>
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              </div>
              <div className="space-y-0.5 pt-1">
                {[
                  { name: "MSME Schemes", href: "/msme" },
                  { name: "Government Updates", href: "/msme" },
                  { name: "Funding & CGTMSE", href: "/msme" },
                  { name: "Subsidies & Grants", href: "/msme" },
                  { name: "Opportunities", href: "/msme" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                    className="block rounded-xl px-2.5 py-1.5 text-xs text-slate-700 hover:text-orange-800 hover:bg-orange-50 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 5. Business Dropdown in Soft Burgundy / Rose */}
        <div
          className="relative shrink-0"
          onMouseEnter={() => handleMouseEnter("business")}
          onMouseLeave={handleMouseLeave}
        >
          <button
            type="button"
            className={`flex items-center space-x-1 rounded-xl px-2.5 py-1.5 transition-all cursor-pointer font-bold ${
              openMenu === "business"
                ? "text-rose-700 bg-rose-50 border border-rose-200 shadow-2xs"
                : "text-slate-700 hover:text-rose-700 hover:bg-rose-50/80"
            }`}
          >
            <span>Business</span>
            <ChevronDown className="h-3 w-3 opacity-60" />
          </button>

          {openMenu === "business" && (
            <div className="absolute top-full left-0 mt-1 w-60 rounded-2xl border border-rose-200 bg-white/98 backdrop-blur-xl p-3 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-1 z-50">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 px-2 py-1 border-b border-rose-100 flex items-center justify-between">
                <span>Commercial Partnerships</span>
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              </div>
              <div className="space-y-0.5 pt-1">
                {[
                  { name: "Manufacturing Units", href: "/business" },
                  { name: "Franchise Opportunities", href: "/business" },
                  { name: "Channel Partners", href: "/business" },
                  { name: "Business Opportunities", href: "/business" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                    className="block rounded-xl px-2.5 py-1.5 text-xs text-slate-700 hover:text-rose-800 hover:bg-rose-50 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 6. News & Knowledge */}
        <div
          className="relative shrink-0"
          onMouseEnter={() => handleMouseEnter("news")}
          onMouseLeave={handleMouseLeave}
        >
          <button
            type="button"
            className={`flex items-center space-x-1 rounded-xl px-2.5 py-1.5 transition-all cursor-pointer ${
              openMenu === "news"
                ? "text-sky-700 bg-white border border-slate-200 shadow-2xs font-bold"
                : "hover:text-sky-700 hover:bg-white"
            }`}
          >
            <span>News &amp; Knowledge</span>
            <ChevronDown className="h-3 w-3 opacity-60" />
          </button>

          {openMenu === "news" && (
            <div className="absolute top-full left-0 mt-1 w-56 rounded-2xl border border-slate-200 bg-white/98 backdrop-blur-xl p-3 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-1 z-50">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 px-2 py-1 border-b border-slate-100">
                Technical Insights
              </div>
              <div className="space-y-0.5 pt-1">
                {[
                  { name: "Current Affairs", href: "/news" },
                  { name: "Industry News", href: "/news" },
                  { name: "Water & Environment", href: "/news" },
                  { name: "Energy", href: "/news" },
                  { name: "Manufacturing", href: "/news" },
                  { name: "MSME Updates", href: "/news" },
                  { name: "Technology", href: "/news" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                    className="block rounded-xl px-2.5 py-1.5 text-xs text-slate-700 hover:text-sky-800 hover:bg-sky-50 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 7. Engineering Calculators in Light Orange */}
        <Link
          href="/calculator"
          className="rounded-xl px-3 py-1.5 text-orange-700 hover:bg-orange-50 transition-all flex items-center space-x-1.5 shrink-0 font-bold border border-transparent hover:border-orange-200"
        >
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          <span>Calculators</span>
        </Link>

        {/* 8. Compare in Light Burgundy */}
        <Link
          href="/compare"
          className="rounded-xl px-3 py-1.5 text-rose-700 hover:bg-rose-50 transition-all shrink-0 font-bold border border-transparent hover:border-rose-200"
        >
          Compare
        </Link>

        {/* 9. Advertise */}
        <Link
          href="/advertise"
          className="rounded-xl px-2.5 py-1.5 text-slate-700 hover:text-sky-700 hover:bg-white transition-all shrink-0 font-medium"
        >
          Advertise
        </Link>

        {/* 10. About YRC */}
        <Link
          href="/about"
          className="rounded-xl px-2.5 py-1.5 text-slate-700 hover:text-sky-700 hover:bg-white transition-all shrink-0 font-medium"
        >
          About YRC
        </Link>
      </div>
    </nav>
  );
}
