import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*, categories(*)")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-pink-300">
          Bài viết
        </p>

        <h1 className="text-4xl font-black md:text-6xl">
          Góc chiêm tinh & tarot
        </h1>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts?.map((post: any) => (
            <Link
              key={post.id}
              href={`/bai-viet/${post.slug}`}
              className="rounded-3xl border border-white/10 bg-white/10 p-6 transition hover:-translate-y-1 hover:bg-white/15"
            >
              <p className="text-sm text-purple-300">
                {post.categories?.name || "Bài viết"}
              </p>

              <h2 className="mt-3 text-2xl font-bold">{post.title}</h2>

              <p className="mt-3 line-clamp-3 text-white/70">{post.excerpt}</p>

              <span className="mt-6 inline-block font-bold text-pink-300">
                Đọc bài →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}