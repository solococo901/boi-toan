"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminNavLink() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) return;

      const { data: admin } = await supabase
        .from("admin_users")
        .select("id")
        .eq("email", user.email)
        .maybeSingle();

      setIsAdmin(!!admin);
    }

    checkAdmin();
  }, []);

  if (!isAdmin) return null;

  return (
    <Link href="/admin" className="hover:text-white">
      Admin
    </Link>
  );
}