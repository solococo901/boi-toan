import Link from "next/link";

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-pink-300">
          Quiz
        </p>

        <h1 className="text-4xl font-black md:text-6xl">
          Quiz tính cách vui
        </h1>

        <p className="mt-5 max-w-2xl text-white/70">
          Làm quiz để khám phá tính cách, tình yêu, năng lượng và thông điệp
          dành riêng cho bạn.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Link
            href="/quiz/ban-thuoc-kieu-nguoi-yeu-nao"
            className="rounded-3xl border border-white/10 bg-white/10 p-7 transition hover:-translate-y-1 hover:bg-white/15"
          >
            <div className="text-5xl">💖</div>
            <h2 className="mt-5 text-2xl font-bold">
              Bạn thuộc kiểu người yêu nào?
            </h2>
            <p className="mt-3 text-white/70">
              Khám phá phong cách yêu của bạn qua vài câu hỏi đơn giản.
            </p>
            <span className="mt-6 inline-block font-bold text-pink-300">
              Làm quiz →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}