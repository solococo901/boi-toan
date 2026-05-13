"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function AdminQuizForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Đang tạo quiz...");

    const { error } = await supabase.from("quizzes").insert({
      title,
      slug: slugify(title),
      description,
      is_published: true,
    });

    if (error) {
      setMessage("Lỗi: " + error.message);
      return;
    }

    setMessage("Đã tạo quiz thành công!");
    setTitle("");
    setDescription("");

    window.location.reload();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-3xl border border-white/10 bg-white/10 p-6"
    >
      <h2 className="text-2xl font-black">Tạo quiz mới</h2>

      <div className="mt-6 grid gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tên quiz, ví dụ: Bạn hợp với cung nào?"
          required
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả ngắn cho quiz"
          rows={3}
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <button className="rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 px-7 py-3 font-bold">
          Tạo quiz
        </button>

        {message && <p className="text-sm text-pink-200">{message}</p>}
      </div>
    </form>
  );
}