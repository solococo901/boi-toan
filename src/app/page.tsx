import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#10051f] text-white">
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-purple-600/40 blur-3xl" />
        <div className="absolute right-[-120px] top-20 h-96 w-96 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="absolute bottom-[-160px] left-1/2 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" />

        <div className="relative mx-auto max-w-6xl text-center">
          <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-purple-100 backdrop-blur">
            ✨ Quiz vui • Chiêm tinh • Tarot mỗi ngày
          </p>

          <h1 className="mx-auto max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            Khám phá thông điệp vũ trụ dành cho bạn hôm nay
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Rút bài tarot, xem cung hoàng đạo và làm quiz tính cách để hiểu thêm
            về bản thân theo cách vui vẻ, nhẹ nhàng và đầy cảm hứng.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/tarot"
              className="rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 px-8 py-4 font-bold shadow-lg shadow-purple-900/40 transition hover:scale-105"
            >
              Rút bài Tarot
            </Link>

            <Link
              href="/cung-hoang-dao"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold backdrop-blur transition hover:bg-white/20"
            >
              Xem cung hoàng đạo
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">
        <Link
          href="/tarot"
          className="group rounded-3xl border border-white/10 bg-white/10 p-7 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
        >
          <div className="mb-5 text-5xl">🔮</div>
          <h2 className="text-2xl font-bold">Tarot hôm nay</h2>
          <p className="mt-3 text-white/70">
            Rút một lá bài để nhận thông điệp dành riêng cho ngày hôm nay.
          </p>
          <span className="mt-6 inline-block font-semibold text-pink-300">
            Rút bài ngay →
          </span>
        </Link>

        <Link
          href="/cung-hoang-dao"
          className="group rounded-3xl border border-white/10 bg-white/10 p-7 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
        >
          <div className="mb-5 text-5xl">🌙</div>
          <h2 className="text-2xl font-bold">12 cung hoàng đạo</h2>
          <p className="mt-3 text-white/70">
            Xem tổng quan tình yêu, công việc, tài chính và may mắn hôm nay.
          </p>
          <span className="mt-6 inline-block font-semibold text-purple-300">
            Xem ngay →
          </span>
        </Link>

        <Link
          href="/quiz"
          className="group rounded-3xl border border-white/10 bg-white/10 p-7 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
        >
          <div className="mb-5 text-5xl">💫</div>
          <h2 className="text-2xl font-bold">Quiz tính cách</h2>
          <p className="mt-3 text-white/70">
            Làm quiz vui để khám phá tính cách, tình yêu và năng lượng của bạn.
          </p>
          <span className="mt-6 inline-block font-semibold text-indigo-300">
            Làm quiz →
          </span>
        </Link>
      </section>
    </main>
  );
}