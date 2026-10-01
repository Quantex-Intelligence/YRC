import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import {
  Search,
  Building2,
  Wrench,
  Cpu,
  Layers,
  Zap,
  Leaf,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FlaskConical,
  Package,
  Calculator,
  SlidersHorizontal,
  Sparkles,
  Award,
  Truck,
  Coins,
  FileText,
  Tag,
  Percent,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Parallel fetch: Flagship products, live promotional deals, and ecosystem statistics
  const [featuredProducts, activeDeals, totalProductCount, totalCompanyCount, totalVariantCount, totalDocCount] = await Promise.all([
    prisma.product.findMany({
      where: { isPublished: true },
      take: 8,
      include: {
        company: true,
        brand: true,
        category: true,
        variants: true,
        images: {
          orderBy: { displayOrder: "asc" },
        },
        specifications: true,
        sourceDocument: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.deal.findMany({
      where: { isActive: true },
      take: 4,
      include: {
        company: true,
        product: {
          include: {
            brand: true,
            category: true,
            variants: true,
            images: { orderBy: { displayOrder: "asc" } },
            sourceDocument: true,
          },
        },
        variant: true,
      },
      orderBy: { discountPercent: "desc" },
    }),
    prisma.product.count({ where: { isPublished: true } }),
    prisma.company.count(),
    prisma.productVariant.count(),
    prisma.document.count(),
  ]);

  // Spotlight Product for the Hero Commercial Card
  const spotlightProduct = featuredProducts[0];
  const spotlightImage = spotlightProduct?.images?.[0]?.imageUrl || "/images/placeholders/industrial-machine.jpg";
  const spotlightVariant = spotlightProduct?.variants?.[0];
  const spotlightPrice = spotlightVariant?.priceMinorUnits
    ? `₹${(Number(spotlightVariant.priceMinorUnits) / 100).toLocaleString("en-IN")}`
    : "Price on Request";

  const categories = [
    {
      title: "Water & Wastewater",
      desc: "STP, ETP, RO, hollow-fiber ultrafiltration membranes & aeration",
      href: "/products?category=water-wastewater-treatment",
      icon: Layers,
      highlight: "Asahi Kasei & PTC",
      colorClass: "bg-sky-50 text-sky-700 border-sky-200 group-hover:bg-sky-600 group-hover:text-white",
      badgeClass: "bg-sky-100 text-sky-800",
    },
    {
      title: "Renewable Energy & Bio-CBG",
      desc: "Biogas upgrading skids, cascades & biomass pellet mills",
      href: "/products?category=renewable-energy-bio-cbg",
      icon: Zap,
      highlight: "Airshuddhi & Bio Green",
      colorClass: "bg-orange-50 text-orange-700 border-orange-200 group-hover:bg-orange-500 group-hover:text-white",
      badgeClass: "bg-orange-100 text-orange-800",
    },
    {
      title: "Industrial Machinery & Pumps",
      desc: "Positive displacement roots blowers, liquid ring vacuum & moulding",
      href: "/products?category=industrial-machinery-flow-control",
      icon: Wrench,
      highlight: "Alpha & Prikan",
      colorClass: "bg-blue-50 text-blue-700 border-blue-200 group-hover:bg-blue-600 group-hover:text-white",
      badgeClass: "bg-blue-100 text-blue-800",
    },
    {
      title: "Laboratory & Gas Analyzers",
      desc: "Flameproof biogas analyzers, NDIR multi-gas & spectrophotometers",
      href: "/products?category=process-instrumentation-laboratory",
      icon: FlaskConical,
      highlight: "Lovibond & Ambetronics",
      colorClass: "bg-rose-50 text-rose-700 border-rose-200 group-hover:bg-rose-600 group-hover:text-white",
      badgeClass: "bg-rose-100 text-rose-800",
    },
    {
      title: "Waste Cleantech & OWC",
      desc: "Organic waste converters, rotary trommels & municipal bio-bins",
      href: "/products?category=waste-management-circular-cleantech",
      icon: Leaf,
      highlight: "Greeneria & Jainum",
      colorClass: "bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white",
      badgeClass: "bg-emerald-100 text-emerald-800",
    },
    {
      title: "Biotechnology & Enzymes",
      desc: "High-potency bacterial cultures for ETP/STP & eco-descaling",
      href: "/products?category=biotechnology-specialized-chemicals",
      icon: Cpu,
      highlight: "Organica & JKET",
      colorClass: "bg-teal-50 text-teal-700 border-teal-200 group-hover:bg-teal-600 group-hover:text-white",
      badgeClass: "bg-teal-100 text-teal-800",
    },
  ];

  const featuredSuppliers = [
    { name: "Alpha Blowers", loc: "Ahmedabad, Gujarat", type: "Roots Blowers & Aeration", est: "1989", logo: "AB", color: "text-sky-700 bg-sky-50 border-sky-200" },
    { name: "Ambetronics Engineers", loc: "Mumbai, Maharashtra", type: "Biogas Analyzers & Detectors", est: "1992", logo: "AE", color: "text-rose-700 bg-rose-50 border-rose-200" },
    { name: "Prikan Machinery", loc: "Ahmedabad, Gujarat", type: "Ultra Servo Injection Moulding", est: "2005", logo: "PM", color: "text-orange-700 bg-orange-50 border-orange-200" },
    { name: "Planet Valves", loc: "Ahmedabad, Gujarat", type: "Industrial Valves & Flow Control", est: "2010", logo: "PV", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { name: "Asahi Kasei Microza", loc: "Tokyo, Japan / India", type: "Hollow Fiber MF/UF Membranes", est: "Global", logo: "AK", color: "text-blue-700 bg-blue-50 border-blue-200" },
    { name: "Tintometer India / Lovibond", loc: "Hyderabad, Telangana", type: "Water Testing Instruments", est: "1885", logo: "TL", color: "text-purple-700 bg-purple-50 border-purple-200" },
    { name: "Sai Balaji Infra & Power", loc: "Hyderabad, Telangana", type: "Cable Trays & Solar Structures", est: "2015", logo: "SB", color: "text-amber-700 bg-amber-50 border-amber-200" },
    { name: "PTC Watertech", loc: "Ahmedabad, Gujarat", type: "Turnkey STP, ETP & RO Plants", est: "2015", logo: "PW", color: "text-teal-700 bg-teal-50 border-teal-200" },
  ];

  return (
    <div className="flex flex-col bg-slate-100 min-h-screen">
      {/* 1. Top Slim Trust Ribbon: Compact Enterprise Capabilities */}
      <div className="bg-white border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-y-2 text-xs text-slate-700">
          <div className="flex items-center gap-2 font-bold text-sky-800">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Verified OEM Direct</span>
            <span className="text-slate-400 font-normal hidden sm:inline">• Direct Factory Quotes</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0" />
            <span>Instant GST Invoicing</span>
            <span className="text-slate-400 font-normal hidden sm:inline">• 100% Tax Compliant B2B Billing</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Truck className="h-4 w-4 text-orange-600 shrink-0" />
            <span>Pan-India Logistics</span>
            <span className="text-slate-400 font-normal hidden sm:inline">• Insured Factory Crated Freight</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Coins className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>MSME Financing</span>
            <span className="text-slate-400 font-normal hidden sm:inline">• CGTMSE Loans up to ₹5 Cr</span>
          </div>
        </div>
      </div>

      {/* 2. Main E-Commerce Commercial Hero Stage (2-Column Desktop Grid) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sky-100/70 via-white to-blue-50/60 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b-2 border-sky-200/80 shadow-xs">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (7 cols): High-Impact Commercial Callout & Search */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 rounded-full bg-orange-100/90 px-3.5 py-1 text-xs font-black text-orange-800 border border-orange-200 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-orange-600" />
              <span>B2B &amp; B2C FACTORY DIRECT INDUSTRIAL EXPO</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Buy Factory-Direct Industrial Machinery at{" "}
              <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                OEM Wholesale Prices
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-2xl">
              Procure standard industrial spares, roots blowers, pumps, membranes &amp; valves online with instant GST tax billing — or post custom RFQs for multi-vendor turnkey engineering bids.
            </p>

            {/* 3 High-Conversion Commercial Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/products?pricing=fixed"
                className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Package className="h-4 w-4" />
                <span>Shop Standard SKUs (Instant Buy)</span>
              </Link>
              <Link
                href="/rfq"
                className="rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center space-x-2 cursor-pointer"
              >
                <FileText className="h-4 w-4" />
                <span>Post Custom RFQ</span>
              </Link>
              <Link
                href="/deals"
                className="rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-4 py-3 text-xs sm:text-sm font-bold shadow-2xs hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Zap className="h-4 w-4 text-emerald-600" />
                <span>Flash Deals</span>
              </Link>
            </div>

            {/* Fast Keyword Search Bar */}
            <div className="pt-2">
              <form action="/products" method="GET" className="flex items-center rounded-2xl bg-white p-1.5 border-2 border-sky-300 focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-100 shadow-md transition-all">
                <Search className="h-5 w-5 text-slate-400 ml-3 mr-2 shrink-0" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search equipment, blower CFM, spectrophotometer, UF membrane, valve..."
                  className="w-full text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden bg-transparent py-1.5"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:-translate-y-0.5 active:scale-[0.98] transition-all shrink-0 cursor-pointer"
                >
                  Search
                </button>
              </form>

              {/* Popular Keyword Chips */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                <span className="font-bold text-slate-700 text-[11px]">Popular:</span>
                <Link href="/products?q=Alpha+Roots+Blower" className="rounded-lg bg-white px-2.5 py-0.5 text-slate-700 hover:text-sky-700 hover:bg-sky-50 border border-slate-200 shadow-2xs transition-all text-[11px] font-semibold">
                  Roots Blower
                </Link>
                <Link href="/products?q=Lovibond" className="rounded-lg bg-white px-2.5 py-0.5 text-slate-700 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 shadow-2xs transition-all text-[11px] font-semibold">
                  UV-VIS Spectrophotometer
                </Link>
                <Link href="/products?q=Microza+UF" className="rounded-lg bg-white px-2.5 py-0.5 text-slate-700 hover:text-sky-700 hover:bg-sky-50 border border-slate-200 shadow-2xs transition-all text-[11px] font-semibold">
                  Asahi Kasei UF
                </Link>
                <Link href="/products?q=Vacuum+Pump" className="rounded-lg bg-white px-2.5 py-0.5 text-slate-700 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 shadow-2xs transition-all text-[11px] font-semibold">
                  Vacuum Pump
                </Link>
                <Link href="/products?q=Valves" className="rounded-lg bg-white px-2.5 py-0.5 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 shadow-2xs transition-all text-[11px] font-semibold">
                  SS316 Valves
                </Link>
                <Link href="/products?q=Bio-CBG" className="rounded-lg bg-white px-2.5 py-0.5 text-slate-700 hover:text-orange-700 hover:bg-orange-50 border border-slate-200 shadow-2xs transition-all text-[11px] font-semibold">
                  Bio-CBG Skids
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Spotlight Deal of the Day Product Showcase */}
          {spotlightProduct && (
            <div className="lg:col-span-5">
              <div className="rounded-3xl border-2 border-sky-300 bg-white p-5 shadow-xl space-y-4 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-800">
                    <Sparkles className="h-3.5 w-3.5 text-orange-600" />
                    <span>FEATURED OEM SPOTLIGHT</span>
                  </div>
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Ready for Dispatch
                  </span>
                </div>

                <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-2 border border-sky-100 group">
                  <Image
                    src={spotlightImage}
                    alt={spotlightProduct.name}
                    width={320}
                    height={192}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 rounded-md bg-white/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-extrabold text-sky-800 border border-sky-200 shadow-2xs">
                    {spotlightProduct.company.legalName}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700">
                    {spotlightProduct.category.name}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 truncate" title={spotlightProduct.name}>
                    {spotlightProduct.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {spotlightProduct.shortDescription || "Verified industrial machinery with zero-hallucination OEM technical specifications."}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Factory Direct Commercial Rate:</span>
                    <span className="text-lg font-black text-slate-900">{spotlightPrice}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/products/${spotlightProduct.slug}`}
                      className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                    >
                      Order Now
                    </Link>
                    <Link
                      href={`/products/${spotlightProduct.slug}`}
                      className="rounded-xl border border-sky-300 bg-sky-50 px-3 py-2 text-xs font-bold text-sky-800 hover:bg-sky-100 transition-all hover:-translate-y-0.5"
                    >
                      View Specs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Shop by Industrial Category (6-Column Grid on Desktop) */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                Primary Industrial Sectors
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
                Shop Equipment by Category
              </h2>
            </div>
            <Link
              href="/categories"
              className="text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center group"
            >
              Browse All Categories <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-4 shadow-2xs hover:bg-white hover:border-sky-400 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors shadow-2xs ${cat.colorClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-black ${cat.badgeClass}`}>
                        OEM
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug">
                        {cat.title}
                      </h3>
                      <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 leading-tight">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/80 text-[11px] font-bold text-sky-700 group-hover:text-sky-900">
                    <span>Explore</span>
                    <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Flash Deals & Volume Discounts Shelf */}
      {activeDeals.length > 0 && (
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-50/70 via-white to-sky-50/70 border-b border-slate-200">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  <Percent className="h-3.5 w-3.5 text-emerald-600" />
                  Direct Factory Rebates
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
                  ⚡ Flash Commercial Deals &amp; Volume Pricing
                </h2>
              </div>
              <Link
                href="/deals"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center group"
              >
                View All {activeDeals.length} Flash Deals <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeDeals.filter((d) => d.product !== null).map((deal) => {
                const product = deal.product!;
                const dealImage = product.images?.[0]?.imageUrl || "/images/placeholders/industrial-machine.jpg";
                const basePrice = deal.variant?.priceMinorUnits
                  ? Number(deal.variant.priceMinorUnits) / 100
                  : null;
                const discount = deal.discountPercent ?? 10;
                const dealPrice = basePrice
                  ? Math.round(basePrice * (1 - discount / 100))
                  : null;

                return (
                  <div
                    key={deal.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs hover:border-emerald-400 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-black text-white shadow-2xs">
                          {discount}% OFF
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">
                          {deal.company.legalName}
                        </span>
                      </div>

                      <div className="relative h-32 w-full overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center p-2 border border-slate-100">
                        <Image
                          src={dealImage}
                          alt={deal.title}
                          width={180}
                          height={128}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm line-clamp-1">{deal.title}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{product.name}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-baseline gap-2">
                        {dealPrice ? (
                          <>
                            <span className="text-base font-black text-slate-900">₹{dealPrice.toLocaleString("en-IN")}</span>
                            <span className="text-xs text-slate-400 line-through">₹{basePrice?.toLocaleString("en-IN")}</span>
                          </>
                        ) : (
                          <span className="text-xs font-bold text-emerald-700">Promotional Lot Allocation</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <Link
                        href={`/products/${product.slug}`}
                        className="w-full inline-flex items-center justify-center space-x-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-3 py-2 text-xs font-bold text-white shadow-2xs hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                      >
                        <Tag className="h-3 w-3" />
                        <span>Claim Deal</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. Featured Trending Industrial Equipment (Product Grid) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-100 border-b border-slate-200">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                Featured Equipment &amp; Spares
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
                Trending Industrial Products &amp; Machinery
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Verified technical specifications, genuine OEM warranties, and instant online purchasing.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:-translate-y-0.5 active:scale-[0.98] transition-all shrink-0"
            >
              <span>Explore All {totalProductCount} Products</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Grid of ProductCards: 4 Columns on Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Key B2B Procurement Services (Interactive 4-Card Shelf) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Procurement Infrastructure
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Enterprise Procurement &amp; Engineering Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1: Direct Buying */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-xs hover:border-sky-400 hover:bg-white hover:shadow-lg transition-all duration-200 group hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-sky-100">
                <Package className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Direct Procurement</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Purchase consumables, valves, and analytical meters with instant GST compliant invoicing.
              </p>
              <Link href="/products?pricing=FIXED_PRICE" className="inline-flex items-center text-xs font-bold text-sky-700 hover:text-sky-900 mt-3 group-hover:translate-x-1 transition-transform">
                <span>Browse SKUs</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>

            {/* Pillar 2: Engineering Calculators */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-xs hover:border-orange-400 hover:bg-white hover:shadow-lg transition-all duration-200 group hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-orange-100">
                <Calculator className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Engineering Sizing Tools</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Size STP/ETP aeration blowers (CFM/pressure) and UF membrane flux with interactive models.
              </p>
              <Link href="/calculator" className="inline-flex items-center text-xs font-bold text-orange-700 hover:text-orange-900 mt-3 group-hover:translate-x-1 transition-transform">
                <span>Launch Calculator</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>

            {/* Pillar 3: Technical Comparison */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-xs hover:border-rose-400 hover:bg-white hover:shadow-lg transition-all duration-200 group hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-rose-100">
                <SlidersHorizontal className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Spec Comparison Matrix</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Compare industrial equipment side-by-side: flow rate, power, pressure, MOC &amp; certificates.
              </p>
              <Link href="/compare" className="inline-flex items-center text-xs font-bold text-rose-700 hover:text-rose-900 mt-3 group-hover:translate-x-1 transition-transform">
                <span>Compare Specs</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>

            {/* Pillar 4: MSME Subsidies */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-xs hover:border-emerald-400 hover:bg-white hover:shadow-lg transition-all duration-200 group hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-emerald-100">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">MSME Capital Schemes</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Access up to ₹5 Cr collateral-free CGTMSE loans, SATAT CBG grants, and PMEGP capital subsidies.
              </p>
              <Link href="/msme" className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-900 mt-3 group-hover:translate-x-1 transition-transform">
                <span>Check Eligibility</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Verified OEM Suppliers & Brands */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-100 border-b border-slate-200">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Authorized Manufacturers
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
                Verified Industrial Suppliers &amp; Brands
              </h2>
            </div>
            <Link
              href="/companies"
              className="text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center group"
            >
              View All {totalCompanyCount} Suppliers <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {featuredSuppliers.map((sup) => (
              <div
                key={sup.name}
                className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-sky-300 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl font-extrabold text-xs border ${sup.color}`}>
                      {sup.logo}
                    </span>
                    <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                      Est. {sup.est}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{sup.name}</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">{sup.type}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{sup.loc}</p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  <Link
                    href={`/products?q=${encodeURIComponent(sup.name)}`}
                    className="text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center group"
                  >
                    <span>View Catalogue</span>
                    <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Cryptographic Provenance Guarantee Banner */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-sky-50 via-white to-emerald-50 border border-sky-200/80 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 shadow-2xs">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                The YRC Global Zero-Hallucination &amp; Integrity Guarantee
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                Industrial procurement requires uncompromising precision. Every product specification, CFM airflow rating,
                membrane flux rate, and electrical load on YRC Global is cryptographically traced to an authentic manufacturer catalogue.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-0.5">
              <span className="font-bold text-sky-800 flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                SHA-256 Provenance
              </span>
              <p className="text-[11px] text-slate-500">
                Every extracted spec stores document hash &amp; 1-based page number.
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-0.5">
              <span className="font-bold text-orange-800 flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Dual Commerce
              </span>
              <p className="text-[11px] text-slate-500">
                Direct online purchasing alongside turnkey multi-vendor RFQ bidding.
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-0.5">
              <span className="font-bold text-rose-800 flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Verified OEM Direct
              </span>
              <p className="text-[11px] text-slate-500">
                Quotes routed directly to authorized manufacturers without middleman markups.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
