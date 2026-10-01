import Link from "next/link";
import { prisma } from "@/lib/db";
import { safeQuery, FALLBACK_CATEGORIES } from "@/lib/fallback-catalogue";
import { Layers, ArrowRight, Package } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CategoriesDirectoryPage() {
  const categoriesRaw = await safeQuery(
    () =>
      prisma.category.findMany({
        where: { parentId: null },
        include: {
          children: {
            include: {
              _count: { select: { products: true } },
            },
          },
          _count: { select: { products: true } },
        },
        orderBy: { displayOrder: "asc" },
      }),
    []
  );

  const categories = categoriesRaw && categoriesRaw.length > 0 ? categoriesRaw : (FALLBACK_CATEGORIES as any);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-1">
          <nav className="text-xs text-slate-500 flex items-center space-x-2">
            <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Industry Categories</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Industrial Category Directory
          </h1>
          <p className="text-sm text-slate-600">
            Browse engineering machinery, water treatment skids, and process instrumentation by specialized discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4 hover:border-sky-300 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900">
                    {cat.name}
                  </h2>
                  <Layers className="h-4 w-4 text-sky-600" />
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              {/* Subcategories list */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Subcategories ({cat.children.length})
                </span>
                <div className="space-y-1.5 text-xs">
                  {cat.children.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/products?category=${sub.slug}`}
                      className="flex items-center justify-between rounded-xl p-2 hover:bg-sky-50 text-slate-700 transition-all group"
                    >
                      <span className="group-hover:text-sky-600 font-medium">
                        {sub.name}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 group-hover:text-sky-600">
                        {sub._count.products} item{sub._count.products === 1 ? "" : "s"}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-sky-600 hover:text-sky-800 hover:translate-x-1 transition-all"
                >
                  <span>Explore All {cat.name}</span>
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
