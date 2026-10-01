import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/lib/auth/session";
import { logoutAction } from "@/app/actions/auth";
import { Search, FileText, Shield, LogOut } from "lucide-react";
import { CartBadge } from "@/components/CartBadge";
import { NavbarDropdowns } from "@/components/NavbarDropdowns";

export async function Header() {
  const user = await getCurrentUser();
  const isAdmin = user?.roles.includes("SUPER_ADMIN") || user?.roles.includes("ADMIN") || user?.roles.includes("CATALOGUE_ADMIN");

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Banner Bar: Premium Deep Azure Ribbon for Instant Contrast */}
      <div className="bg-gradient-to-r from-sky-900 via-blue-900 to-sky-900 px-4 py-2 text-xs font-medium text-sky-100 border-b border-sky-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-3 text-[11px] sm:text-xs">
            <span className="font-extrabold text-white flex items-center gap-1.5 bg-sky-800/80 px-2.5 py-0.5 rounded-full border border-sky-600/40">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              B2B &amp; B2C INDUSTRIAL PLATFORM
            </span>
            <span className="hidden md:inline text-sky-300">•</span>
            <span className="hidden md:inline text-sky-200">100% Genuine OEM Equipment</span>
            <span className="hidden lg:inline text-sky-300">•</span>
            <span className="hidden lg:inline text-sky-200">GST-Compliant Tax Invoices</span>
            <span className="hidden xl:inline text-sky-300">•</span>
            <span className="hidden xl:inline text-sky-200">Direct Factory Freight</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px] sm:text-xs font-semibold">
            <Link href="/deals" className="text-amber-300 hover:text-white transition-colors flex items-center gap-1 font-bold">
              <span>🔥 Flash Deals</span>
            </Link>
            <span className="text-sky-400">•</span>
            <Link href="/msme" className="text-sky-200 hover:text-white transition-colors">
              MSME Subsidies
            </Link>
            <span className="text-sky-400">•</span>
            <Link href="/contact" className="text-sky-200 hover:text-white transition-colors">
              Customer Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar: Distinct Luminous Ice-Blue Canvas */}
      <div className="px-4 py-3 bg-gradient-to-b from-sky-50/90 via-white to-sky-50/60 border-b border-sky-200 shadow-2xs backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Logo and Brand Title: 3X ENLARGED LOGO FOR EFFORTLESS VIEWING */}
          <Link href="/" className="flex items-center space-x-3.5 shrink-0 group py-0.5">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl bg-white p-1.5 border-2 border-sky-300 shadow-md group-hover:scale-105 group-hover:border-sky-500 transition-all shrink-0">
              <Image
                src="/images/yrc-logo.jpg"
                alt="YRC Expo Marketing Private Limited logo"
                width={160}
                height={160}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                  YRC Global
                </span>
                <span className="hidden sm:inline-flex rounded-md bg-sky-100 text-sky-800 text-[10px] font-black uppercase px-2 py-0.5 border border-sky-200">
                  B2B &amp; B2C
                </span>
              </div>
              <span className="text-xs sm:text-sm tracking-wider uppercase text-slate-600 font-bold leading-tight">
                Connecting Brands • Creating Impact
              </span>
              <span className="text-[11px] text-sky-700 font-semibold flex items-center gap-1 mt-0.5">
                <Shield className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                Verified Industrial OEM Procurement Marketplace
              </span>
            </div>
          </Link>

          {/* Global Search Bar: Wide E-Commerce Input with Instant Search Button */}
          <div className="hidden md:flex flex-1 max-w-xl items-center">
            <form action="/products" method="GET" className="relative w-full flex rounded-2xl overflow-hidden bg-white border-2 border-sky-200 focus-within:border-sky-500 focus-within:ring-3 focus-within:ring-sky-100 transition-all shadow-xs">
              <input
                type="text"
                name="q"
                placeholder="Search equipment, blower CFM, spectrophotometer, UF membrane, valve..."
                className="w-full bg-white px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden"
              />
              <button
                type="submit"
                aria-label="Search catalogue"
                className="flex items-center justify-center space-x-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-5 text-white font-bold text-xs transition-all cursor-pointer shadow-xs hover:-translate-y-0.5 active:scale-[0.98] shrink-0"
              >
                <Search className="h-4 w-4" />
                <span className="hidden lg:inline">Search</span>
              </button>
            </form>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3 shrink-0">
            {/* Request Quote in Energetic Coral Orange */}
            <Link
              href="/rfq"
              className="hidden lg:flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              <FileText className="h-4 w-4" />
              <span>Request Quote</span>
            </Link>

            {/* Shopping Cart Indicator */}
            <CartBadge />

            {user ? (
              <div className="flex items-center space-x-3">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center space-x-1 rounded-xl bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors border border-rose-200 shadow-2xs"
                  >
                    <Shield className="h-3.5 w-3.5 text-rose-600" />
                    <span>Admin</span>
                  </Link>
                )}
                <div className="hidden sm:flex flex-col text-right text-xs">
                  <span className="font-bold text-slate-900">{user.firstName || user.email}</span>
                  <span className="text-[10px] text-sky-700 font-semibold capitalize">{user.roles[0]?.toLowerCase().replace(/_/g, " ")}</span>
                </div>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    title="Log out"
                    className="rounded-xl p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-sky-700 hover:bg-sky-50 transition-all border border-sky-300 shadow-2xs hover:-translate-y-0.5"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-xs hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Navigation Bar with Hierarchical Dropdowns */}
      <NavbarDropdowns />
    </header>
  );
}
