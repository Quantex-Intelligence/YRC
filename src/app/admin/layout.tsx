import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { logoutAction } from "@/app/actions/auth";

export const dynamic = "force-dynamic";
import {
  LayoutDashboard,
  FileCheck2,
  FileSpreadsheet,
  Building,
  Package,
  Layers,
  SlidersHorizontal,
  FileText,
  BadgeDollarSign,
  ShoppingCart,
  Tag,
  Megaphone,
  BookOpen,
  Users,
  History,
  Settings,
  ArrowLeft,
  ShieldAlert,
  LogOut,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  const isAuthorized =
    user &&
    (user.roles.includes("SUPER_ADMIN") ||
      user.roles.includes("ADMIN") ||
      user.roles.includes("CATALOGUE_ADMIN"));

  if (!isAuthorized) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="max-w-md rounded-xl border border-red-200 bg-white p-8 shadow-sm text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Administrator Access Required</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            You must be authenticated with administrative privileges (SUPER_ADMIN, ADMIN, or CATALOGUE_ADMIN)
            to access the YRC Global Control Center.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/login"
              className="rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:from-sky-700 hover:to-blue-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all shadow-xs"
            >
              Sign in as Admin
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navGroups = [
    {
      group: "Core Control",
      items: [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { label: "Ingestion Queue", href: "/admin/ingestion", icon: FileSpreadsheet },
        { label: "Catalogue Review", href: "/admin/review", icon: FileCheck2 },
      ],
    },
    {
      group: "Master Catalogue",
      items: [
        { label: "Companies & Brands", href: "/admin/companies", icon: Building },
        { label: "Products & SKUs", href: "/admin/products", icon: Package },
        { label: "Categories", href: "/admin/categories", icon: Layers },
        { label: "Specifications", href: "/admin/specifications", icon: SlidersHorizontal },
      ],
    },
    {
      group: "Procurement & Commerce",
      items: [
        { label: "RFQs Triage", href: "/admin/rfqs", icon: FileText },
        { label: "Supplier Quotes", href: "/admin/quotes", icon: BadgeDollarSign },
        { label: "Orders & Invoices", href: "/admin/orders", icon: ShoppingCart },
      ],
    },
    {
      group: "Commercial & CMS",
      items: [
        { label: "Deals Engine", href: "/admin/deals", icon: Tag },
        { label: "Advertising", href: "/admin/ads", icon: Megaphone },
        { label: "MSME Schemes", href: "/admin/msme", icon: BookOpen },
        { label: "News & CMS", href: "/admin/news", icon: BookOpen },
      ],
    },
    {
      group: "Security & Governance",
      items: [
        { label: "Users & Roles", href: "/admin/users", icon: Users },
        { label: "Audit Ledger", href: "/admin/audit", icon: History },
        { label: "System Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-140px)] bg-slate-50">
      {/* Admin Sidebar Navigation */}
      <aside className="w-64 shrink-0 bg-white text-slate-700 border-r border-slate-200 flex flex-col justify-between hidden md:flex">
        <div className="p-4 space-y-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Admin Console
            </span>
            <Link
              href="/"
              className="text-[11px] text-sky-600 hover:underline flex items-center font-semibold"
            >
              <ArrowLeft className="h-3 w-3 mr-1" /> Public Site
            </Link>
          </div>

          <div className="space-y-6">
            {navGroups.map((g) => (
              <div key={g.group} className="space-y-1">
                <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {g.group}
                </div>
                {g.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center space-x-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 transition-colors"
                    >
                      <Icon className="h-4 w-4 text-sky-600" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Admin User Footer in Sidebar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="space-y-0.5 overflow-hidden">
            <div className="text-xs font-bold text-slate-900 truncate">{user.firstName || user.email}</div>
            <div className="text-[10px] text-sky-700 font-mono font-semibold">{user.roles[0]}</div>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              title="Sign Out"
              className="rounded-lg p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </aside>

      {/* Main Admin Workspace Content */}
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
