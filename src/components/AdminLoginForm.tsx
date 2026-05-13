"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Đang đăng nhập...");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Lỗi: " + error.message);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <form onSubmit={handleLogin} className="mt-8 grid gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email admin"
        required
        className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu"
        required
        className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
      />

      <button className="rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 px-7 py-3 font-bold">
        Đăng nhập
      </button>

      {message && <p className="text-sm text-pink-200">{message}</p>}
    </form>
  );
}