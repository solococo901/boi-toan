import { supabase } from "@/lib/supabase";
import AdminPostForm from "@/components/AdminPostForm";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*, categories(*)")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-pink-300">
          Admin SEO
        </p>

        <h1 className="text-4xl font-black">Quản lý bài viết SEO</h1>

        <AdminPostForm />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {posts?.map((post: any) => (
            <div
              key={post.id}
              className="rounded-3xl border border-white/10 bg-white/10 p-6"
            >
              <p className="text-sm text-purple-300">
                {post.categories?.name || "Chưa có danh mục"}
              </p>

              <h2 className="mt-2 text-2xl font-bold">{post.title}</h2>

              <p className="mt-3 text-white/70">{post.excerpt}</p>

              <a
                href={`/bai-viet/${post.slug}`}
                target="_blank"
                className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-sm font-bold text-[#10051f]"
              >
                Xem bài
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}