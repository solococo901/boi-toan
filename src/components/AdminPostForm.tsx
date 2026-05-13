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

export default function AdminPostForm() {
  const [title, setTitle] = useState("");
  const [categoryName, setCategoryName] = useState("Tarot");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Đang lưu bài viết...");

    const categorySlug = slugify(categoryName);

    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .upsert(
        {
          name: categoryName,
          slug: categorySlug,
        },
        { onConflict: "slug" }
      )
      .select()
      .single();

    if (categoryError || !category) {
      setMessage("Lỗi danh mục: " + categoryError?.message);
      return;
    }

    const { error } = await supabase.from("posts").insert({
      category_id: category.id,
      title,
      slug: slugify(title),
      excerpt,
      content,
      is_published: true,
    });

    if (error) {
      setMessage("Lỗi bài viết: " + error.message);
      return;
    }

    setMessage("Đã lưu bài viết!");
    setTitle("");
    setExcerpt("");
    setContent("");
    window.location.reload();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-3xl border border-white/10 bg-white/10 p-6"
    >
      <h2 className="text-2xl font-black">Thêm bài viết mới</h2>

      <div className="mt-6 grid gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề bài viết"
          required
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Danh mục, ví dụ: Tarot"
          required
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Mô tả ngắn"
          rows={3}
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nội dung bài viết"
          rows={10}
          required
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <button className="rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 px-7 py-3 font-bold">
          Lưu bài viết
        </button>

        {message && <p className="text-sm text-pink-200">{message}</p>}
      </div>
    </form>
  );
}