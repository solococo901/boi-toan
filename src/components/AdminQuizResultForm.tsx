"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminQuizResultForm({ quizId }: { quizId: string }) {
  const [resultKey, setResultKey] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Đang thêm kết quả...");

    const { error } = await supabase.from("quiz_results").insert({
      quiz_id: quizId,
      result_key: resultKey.toUpperCase(),
      title,
      description,
    });

    if (error) {
      setMessage("Lỗi: " + error.message);
      return;
    }

    setMessage("Đã thêm kết quả!");
    setResultKey("");
    setTitle("");
    setDescription("");
    window.location.reload();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/10 p-6"
    >
      <h2 className="text-2xl font-black">Thêm kết quả quiz</h2>

      <div className="mt-6 grid gap-4">
        <input
          value={resultKey}
          onChange={(e) => setResultKey(e.target.value)}
          placeholder="Key kết quả, ví dụ: A"
          required
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề kết quả"
          required
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả kết quả"
          rows={4}
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <button className="rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 px-7 py-3 font-bold">
          Thêm kết quả
        </button>

        {message && <p className="text-sm text-pink-200">{message}</p>}
      </div>
    </form>
  );
}