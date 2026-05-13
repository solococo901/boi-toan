"use client";

import { supabase } from "@/lib/supabase";

export default function AdminLogoutButton() {
  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold text-white hover:bg-white/20"
    >
      Đăng xuất
    </button>
  );
}