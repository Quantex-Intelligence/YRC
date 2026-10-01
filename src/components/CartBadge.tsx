"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart/cart-context";

export function CartBadge() {
  const { totalCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Shopping Cart with ${totalCount} items`}
      className="relative flex items-center justify-center rounded-xl p-2.5 text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-all border border-slate-200/80 bg-white shadow-2xs group"
    >
      <ShoppingCart className="h-5 w-5 text-sky-600 group-hover:scale-110 transition-transform" />
      {totalCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-[10px] font-extrabold text-white shadow-sm animate-in fade-in">
          {totalCount > 99 ? "99+" : totalCount}
        </span>
      )}
    </Link>
  );
}
