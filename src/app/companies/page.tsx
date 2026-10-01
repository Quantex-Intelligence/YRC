import Link from "next/link";
import { prisma } from "@/lib/db";
import { safeQuery, FALLBACK_COMPANIES } from "@/lib/fallback-catalogue";
import {
  Building2,
  ExternalLink,
  Mail,
  MapPin,
  CheckCircle2,
  Package,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CompaniesDirectoryPage() {
  const companiesRaw = await safeQuery(
    () =>
      prisma.company.findMany({
        include: {
          brands: true,
          _count: { select: { products: true } },
        },
        orderBy: { legalName: "asc" },
      }),
    []
  );

  const companies = companiesRaw && companiesRaw.length > 0 ? companiesRaw : (FALLBACK_COMPANIES as any);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Header */}
        <div className="space-y-1">
          <nav className="text-xs text-slate-500 flex items-center space-x-2">
            <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Verified Manufacturers</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Verified Manufacturers &amp; Technology Partners
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Authorized OEM manufacturers, EPC turnkey contractors, and engineering providers discovered in YRC catalogues.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl px-3.5 py-2 shadow-2xs shrink-0">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>{companies.length} Verified Enterprises</span>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-sky-300 hover:shadow-lg hover:-translate-y-1 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    {company.companyType}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    Verified OEM
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
                    {company.legalName}
                  </h2>
                  {company.tradeName && company.tradeName !== company.legalName && (
                    <div className="text-xs font-semibold text-sky-600">
                      {company.tradeName}
                    </div>
                  )}
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed pt-1">
                    {company.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  {company.email && (
                    <div className="flex items-center space-x-2 truncate">
                      <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <a href={`mailto:${company.email}`} className="hover:underline hover:text-sky-600 truncate">
                        {company.email}
                      </a>
                    </div>
                  )}
                  {company.websiteUrl && (
                    <div className="flex items-center space-x-2 truncate">
                      <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <a
                        href={company.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-sky-600 font-medium truncate"
                      >
                        {company.websiteUrl.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <Package className="h-3.5 w-3.5 text-sky-600" />
                  {company._count.products} Product{company._count.products === 1 ? "" : "s"}
                </span>

                <Link
                  href={`/products?q=${encodeURIComponent(company.legalName)}`}
                  className="inline-flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-3.5 py-2 text-xs font-bold text-white hover:shadow-md hover:shadow-sky-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all shadow-2xs"
                >
                  <span>View Catalogue</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
