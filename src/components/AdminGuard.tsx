"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      if (pathname === "/admin/login") {
        setAllowed(true);
        setLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        window.location.href = "/admin/login";
        return;
      }

      const { data: admin } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

      if (!admin) {
        await supabase.auth.signOut();
        window.location.href = "/admin/login";
        return;
      }

      setAllowed(true);
      setLoading(false);
    }

    checkLogin();
  }, [pathname]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
        <section className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center">
          <div className="text-5xl">✨</div>
          <p className="mt-5 text-white/70">Đang kiểm tra quyền admin...</p>
        </section>
      </main>
    );
  }

  if (!allowed) return null;

  return <>{children}</>;
}