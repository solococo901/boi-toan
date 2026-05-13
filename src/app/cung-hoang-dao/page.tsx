import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const icons: Record<string, string> = {
  "bach-duong": "♈",
  "kim-nguu": "♉",
  "song-tu": "♊",
  "cu-giai": "♋",
  "su-tu": "♌",
  "xu-nu": "♍",
  "thien-binh": "♎",
  "bo-cap": "♏",
  "nhan-ma": "♐",
  "ma-ket": "♑",
  "bao-binh": "♒",
  "song-ngu": "♓",
};

export default async function ZodiacPage() {
  const { data: signs } = await supabase
    .from("zodiac_signs")
    .select("*")
    .order("created_at");

  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-purple-300">
          Chiêm tinh
        </p>

        <h1 className="max-w-3xl text-4xl font-black md:text-6xl">
          Xem bói 12 cung hoàng đạo hôm nay
        </h1>

        <p className="mt-5 max-w-2xl text-white/70">
          Chọn cung hoàng đạo của bạn để xem thông điệp tổng quan, tình yêu,
          công việc và năng lượng may mắn trong ngày.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {signs?.map((sign) => (
            <Link
              key={sign.id}
              href={`/cung-hoang-dao/${sign.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
            >
              <div className="absolute right-[-40px] top-[-40px] h-32 w-32 rounded-full bg-fuchsia-500/20 blur-2xl transition group-hover:bg-fuchsia-400/30" />

              <div className="relative">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  {icons[sign.slug] || "✨"}
                </div>

                <h2 className="text-2xl font-black">{sign.name}</h2>

                <p className="mt-1 text-sm text-pink-200">
                  {sign.date_range}
                </p>

                <p className="mt-4 line-clamp-3 text-sm text-white/65">
                  {sign.description}
                </p>

                <span className="mt-6 inline-block text-sm font-bold text-purple-300">
                  Xem hôm nay →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}