"use client";

import Link from "next/link";
import { useState } from "react";
import AdminNavLink from "@/components/AdminNavLink";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl font-bold text-white"
      >
        {open ? "×" : "☰"}
      </button>

      {open && (
        <div className="fixed left-4 right-4 top-[76px] z-50 rounded-2xl border border-white/10 bg-[#16072c] p-4 shadow-2xl shadow-black/50">
          <nav className="grid gap-2 text-sm font-semibold text-white/85">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-white/10"
            >
              Trang chủ
            </Link>

            <Link
              href="/tarot"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-white/10"
            >
              Tarot
            </Link>

            <Link
              href="/cung-hoang-dao"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-white/10"
            >
              Cung hoàng đạo
            </Link>

            <Link
              href="/bai-viet"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-white/10"
            >
              Bài viết
            </Link>

            <Link
              href="/quiz"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-white/10"
            >
              Quiz
            </Link>

            <div className="border-t border-white/10 px-4 pt-3">
              <AdminNavLink />
            </div>

            <Link
              href="/tarot"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-500 px-4 py-3 text-center font-bold text-white"
            >
              Rút bài Tarot
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}