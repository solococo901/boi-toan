import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("*, categories(*)")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!post) {
  notFound();
}

  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <article className="mx-auto max-w-3xl">
        <Link href="/bai-viet" className="text-sm font-bold text-purple-300">
          ← Quay lại bài viết
        </Link>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-pink-300">
          {post.categories?.name || "Bài viết"}
        </p>

        <h1 className="mt-4 text-4xl font-black md:text-6xl">
          {post.title}
        </h1>

        <p className="mt-6 text-xl text-white/70">{post.excerpt}</p>

        <div className="mt-10 whitespace-pre-line rounded-[2rem] border border-white/10 bg-white/10 p-8 text-lg leading-8 text-white/80">
          {post.content}
        </div>
      </article>
    </main>
  );
}