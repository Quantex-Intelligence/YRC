import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600 text-sm">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Corporate Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white p-1 border border-slate-200 shadow-xs">
                <Image
                  src="/images/yrc-logo.jpg"
                  alt="YRC Expo Marketing Private Limited logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">YRC Global</h3>
                <p className="text-xs font-semibold text-sky-600">YRC Expo Marketing Private Limited</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              India&apos;s comprehensive B2B + B2C industrial marketplace and business discovery ecosystem.
              Connecting verified manufacturers, channel partners, and buyers with precision engineering
              information, RFQ procurement, and MSME government schemes.
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
              <span className="font-semibold text-slate-800">The Guiding Vision:</span> &ldquo;Best information and deals at your doorstep.&rdquo;
            </div>
          </div>

          {/* Marketplace Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products" className="text-slate-600 hover:text-sky-600 hover:translate-x-1 transition-all inline-block">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-slate-600 hover:text-sky-600 hover:translate-x-1 transition-all inline-block">
                  Manufacturer Directory
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-orange-600 font-semibold hover:text-orange-700 hover:translate-x-1 transition-all inline-block">
                  Engineering Calculators
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-rose-700 font-semibold hover:text-rose-800 hover:translate-x-1 transition-all inline-block">
                  Spec Comparison Matrix
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-emerald-600 font-semibold hover:text-emerald-700 hover:translate-x-1 transition-all inline-block">
                  Best Deals &amp; Offers
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-slate-600 hover:text-sky-600 hover:translate-x-1 transition-all inline-block">
                  All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Procurement & B2B */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Procurement &amp; B2B
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/rfq" className="text-slate-600 hover:text-sky-600 hover:translate-x-1 transition-all inline-block">
                  Request a Quote (RFQ)
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-slate-600 hover:text-sky-600 hover:translate-x-1 transition-all inline-block">
                  Franchise &amp; Channel Partners
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-slate-600 hover:text-sky-600 hover:translate-x-1 transition-all inline-block">
                  Manufacturing Bays
                </Link>
              </li>
              <li>
                <Link href="/register?role=SUPPLIER" className="text-slate-600 hover:text-sky-600 hover:translate-x-1 transition-all inline-block">
                  Supplier Onboarding
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-slate-600 hover:text-sky-600 hover:translate-x-1 transition-all inline-block">
                  Advertise on YRC
                </Link>
              </li>
            </ul>
          </div>

          {/* MSME & Knowledge Hub */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Knowledge & MSME
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/msme" className="text-slate-600 hover:text-sky-600 hover:translate-x-1 transition-all inline-block">
                  MSME Schemes & Subsidies
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-slate-600 hover:text-sky-600 hover:translate-x-1 transition-all inline-block">
                  Industry & Sector News
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-sky-600 hover:translate-x-1 transition-all inline-block">
                  About YRC Global
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-sky-600 hover:translate-x-1 transition-all inline-block">
                  Contact & Assistance
                </Link>
              </li>
              <li>
                <Link href="/api/health" className="text-slate-400 hover:text-sky-600 transition-colors font-mono text-[11px] inline-block">
                  System Health
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Truth in Engineering & Provenance Disclaimer */}
        <div className="mt-8 border-t border-slate-200 pt-6">
          <div className="rounded-xl bg-white p-4 border border-slate-200 text-[11px] text-slate-500 space-y-1 shadow-2xs">
            <span className="font-bold text-slate-800">Catalogue Verification & Disclaimer:</span>
            <p>
              Product specifications, engineering tables, capacities, and certifications displayed on YRC Global originate
              from supplier brochures and manufacturer technical data sheets. In accordance with platform governance, all
              extracted data is maintained in review until verified by authorized administrators. Missing prices are marked
              &ldquo;Request Quote&rdquo;. No specifications, certifications, reviews, or commercial ratings are fabricated.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} YRC Expo Marketing Private Limited. All rights reserved.</p>
          <div className="flex space-x-6 text-slate-500">
            <Link href="/privacy" className="hover:text-sky-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-sky-600 transition-colors">
              Terms of Use
            </Link>
            <Link href="/security" className="hover:text-sky-600 transition-colors">
              Security Architecture
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
