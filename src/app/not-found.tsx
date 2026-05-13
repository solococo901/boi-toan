import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-24 text-white">
      <section className="mx-auto max-w-2xl text-center">
        <div className="text-8xl">🌙</div>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-pink-300">
          404
        </p>

        <h1 className="mt-4 text-4xl font-black md:text-6xl">
          Trang này đã lạc vào vũ trụ
        </h1>

        <p className="mt-6 text-white/70">
          Có thể đường dẫn không tồn tại hoặc nội dung đã được di chuyển.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 px-7 py-3 font-bold shadow-lg shadow-purple-900/40"
          >
            Về trang chủ
          </Link>

          <Link
            href="/tarot"
            className="rounded-full border border-white/20 bg-white/10 px-7 py-3 font-bold hover:bg-white/20"
          >
            Rút bài Tarot
          </Link>
        </div>
      </section>
    </main>
  );
}