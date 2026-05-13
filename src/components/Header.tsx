"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminNavLink from "@/components/AdminNavLink";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkScreen() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        setOpen(false);
      }
    }

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#10051f]">
      <div className="mx-auto max-w-6xl px-5 text-white">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600">
              ✨
            </span>

            <span className="text-xl font-black">Bói Vui</span>
          </Link>

          {/* Desktop nav */}
          {!isMobile && (
            <nav className="flex items-center gap-8 text-sm font-semibold text-white/70">
              <Link href="/" className="hover:text-white">
                Trang chủ
              </Link>

              <Link href="/tarot" className="hover:text-white">
                Tarot
              </Link>

              <Link
                href="/cung-hoang-dao"
                className="whitespace-nowrap hover:text-white"
              >
                Cung hoàng đạo
              </Link>

              <Link href="/bai-viet" className="hover:text-white">
                Bài viết
              </Link>

              <Link href="/quiz" className="hover:text-white">
                Quiz
              </Link>
            </nav>
          )}

          {/* Desktop button */}
          {!isMobile && (
            <Link
              href="/tarot"
              className="rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-purple-900/40"
            >
              Rút bài
            </Link>
          )}

          {/* Mobile button */}
          {isMobile && (
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="  px-4 py-2 text-sm font-bold text-white"
            >
              {open ? "Đóng" : "Menu"}
            </button>
          )}
        </div>

        {/* Mobile nav */}
        {isMobile && open && (
          <nav className="border-t border-white/10 py-4">
            <div className="flex flex-col gap-2 text-sm font-semibold text-white/80">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 hover:bg-white/10"
              >
                Trang chủ
              </Link>

              <Link
                href="/tarot"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 hover:bg-white/10"
              >
                Tarot
              </Link>

              <Link
                href="/cung-hoang-dao"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 hover:bg-white/10"
              >
                Cung hoàng đạo
              </Link>

              <Link
                href="/bai-viet"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 hover:bg-white/10"
              >
                Bài viết
              </Link>

              <Link
                href="/quiz"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 hover:bg-white/10"
              >
                Quiz
              </Link>

              <div className="border-t border-white/10 px-3 py-3">
                <AdminNavLink />
              </div>

              <Link
                href="/tarot"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-500 px-4 py-3 text-center font-bold text-white"
              >
                Rút bài Tarot
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}