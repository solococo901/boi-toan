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

export default function AdminTarotForm() {
  const [name, setName] = useState("");
  const [meaningGeneral, setMeaningGeneral] = useState("");
  const [meaningLove, setMeaningLove] = useState("");
  const [meaningCareer, setMeaningCareer] = useState("");
  const [advice, setAdvice] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Đang thêm...");

    const { error } = await supabase.from("tarot_cards").insert({
      name,
      slug: slugify(name),
      meaning_general: meaningGeneral,
      meaning_love: meaningLove,
      meaning_career: meaningCareer,
      advice,
    });

    if (error) {
      setMessage("Lỗi: " + error.message);
      return;
    }

    setMessage("Đã thêm lá bài thành công!");
    setName("");
    setMeaningGeneral("");
    setMeaningLove("");
    setMeaningCareer("");
    setAdvice("");

    window.location.reload();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-3xl border border-white/10 bg-white/10 p-6"
    >
      <h2 className="text-2xl font-black">Thêm lá bài Tarot</h2>

      <div className="mt-6 grid gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên lá bài, ví dụ: The Star"
          required
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <textarea
          value={meaningGeneral}
          onChange={(e) => setMeaningGeneral(e.target.value)}
          placeholder="Ý nghĩa tổng quan"
          required
          rows={3}
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <textarea
          value={meaningLove}
          onChange={(e) => setMeaningLove(e.target.value)}
          placeholder="Ý nghĩa tình yêu"
          rows={3}
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <textarea
          value={meaningCareer}
          onChange={(e) => setMeaningCareer(e.target.value)}
          placeholder="Ý nghĩa công việc"
          rows={3}
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <textarea
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
          placeholder="Lời khuyên"
          rows={3}
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <button className="rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 px-7 py-3 font-bold">
          Thêm lá bài
        </button>

        {message && <p className="text-sm text-pink-200">{message}</p>}
      </div>
    </form>
  );
}