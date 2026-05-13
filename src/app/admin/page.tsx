import Link from "next/link";
import AdminLogoutButton from "@/components/AdminLogoutButton";

const adminItems = [
  {
    title: "Quản lý Tarot",
    description: "Thêm, sửa lá bài tarot và ý nghĩa từng lá.",
    href: "/admin/tarot",
    icon: "🔮",
  },
  {
    title: "Quản lý Cung hoàng đạo",
    description: "Nhập nội dung bói hằng ngày cho 12 cung.",
    href: "/admin/cung-hoang-dao",
    icon: "🌙",
  },
  {
    title: "Quản lý Quiz",
    description: "Tạo quiz, câu hỏi, đáp án và kết quả.",
    href: "/admin/quiz",
    icon: "💫",
  },
  {
    title: "Bài viết SEO",
    description: "Viết bài kéo traffic từ Google.",
    href: "/admin/posts",
    icon: "📝",
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-pink-300">
          Dashboard
        </p>

        <h1 className="text-4xl font-black md:text-6xl">
          Quản trị nội dung
        </h1>

        <p className="mt-5 max-w-2xl text-white/70">
          Khu vực quản lý quiz, tarot, cung hoàng đạo và bài viết cho website.
        </p>

        <div className="mt-6">
          <AdminLogoutButton />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {adminItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-3xl border border-white/10 bg-white/10 p-7 transition hover:-translate-y-1 hover:bg-white/15"
            >
              <div className="text-5xl">{item.icon}</div>
              <h2 className="mt-5 text-2xl font-bold">{item.title}</h2>
              <p className="mt-3 text-white/70">{item.description}</p>
              <span className="mt-6 inline-block font-bold text-purple-300">
                Vào quản lý →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}