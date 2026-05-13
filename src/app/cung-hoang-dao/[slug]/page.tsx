import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

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

export default async function ZodiacDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: sign } = await supabase
    .from("zodiac_signs")
    .select("*")
    .eq("slug", slug)
    .single();

  const { data: horoscope } = sign
    ? await supabase
      .from("daily_horoscopes")
      .select("*")
      .eq("zodiac_id", sign.id)
      .order("horoscope_date", { ascending: false })
      .limit(1)
      .maybeSingle()
    : { data: null };

  if (!sign) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <section className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur md:p-12">
        <div className="absolute right-[-120px] top-[-120px] h-80 w-80 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[-120px] h-80 w-80 rounded-full bg-pink-500/20 blur-3xl" />

        {sign && (
          <div className="relative">
            <Link
              href="/cung-hoang-dao"
              className="mb-8 inline-block text-sm font-bold text-purple-300"
            >
              ← Quay lại 12 cung
            </Link>

            <div className="grid gap-8 md:grid-cols-[220px_1fr]">
              <div className="flex aspect-square items-center justify-center rounded-[2rem] border border-white/10 bg-black/20 text-8xl shadow-2xl shadow-purple-950/50">
                {icons[sign.slug] || "✨"}
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-pink-300">
                  Cung hoàng đạo hôm nay
                </p>

                <h1 className="mt-3 text-5xl font-black md:text-7xl">
                  {sign.name}
                </h1>

                <p className="mt-3 text-pink-200">{sign.date_range}</p>

                <p className="mt-6 max-w-2xl text-white/70">
                  {sign.description}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-6 md:col-span-2">
                <h2 className="text-xl font-bold text-purple-300">
                  ✨ Tổng quan
                </h2>
                <p className="mt-3 text-white/75">
                  {horoscope?.overview ||
                    "Hôm nay là ngày bạn nên lắng nghe cảm xúc của mình, giữ bình tĩnh trước các lựa chọn và ưu tiên những điều khiến bạn thấy nhẹ lòng."}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                <h2 className="text-xl font-bold text-pink-300">
                  💖 Tình yêu
                </h2>
                <p className="mt-3 text-white/75">
                  {horoscope?.love ||
                    "Chuyện tình cảm cần sự chân thành và lắng nghe nhiều hơn. Một lời nói nhẹ nhàng có thể giúp mọi thứ dễ chịu hơn."}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                <h2 className="text-xl font-bold text-indigo-300">
                  💼 Công việc
                </h2>
                <p className="mt-3 text-white/75">
                  {horoscope?.career ||
                    "Bạn nên tập trung vào việc quan trọng nhất thay vì ôm đồm quá nhiều. Làm chậm nhưng chắc sẽ tốt hơn."}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                <h2 className="text-xl font-bold text-yellow-200">
                  💰 Tài chính
                </h2>
                <p className="mt-3 text-white/75">
                  {horoscope?.money ||
                    "Hãy cẩn thận với những khoản chi cảm tính. Đây là lúc nên ưu tiên sự ổn định hơn là mạo hiểm."}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                <h2 className="text-xl font-bold text-emerald-300">
                  🍀 May mắn
                </h2>
                <p className="mt-3 text-white/75">
                  Con số: {horoscope?.lucky_number || "7"}
                </p>
                <p className="mt-2 text-white/75">
                  Màu sắc: {horoscope?.lucky_color || "Tím ánh sao"}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 p-6 md:col-span-2">
                <h2 className="text-xl font-bold text-white">
                  🌙 Lời khuyên hôm nay
                </h2>
                <p className="mt-3 text-white/80">
                  {horoscope?.advice ||
                    "Đừng vội ép bản thân phải có câu trả lời ngay. Hãy cho mình thêm thời gian để cảm nhận rõ điều thật sự phù hợp."}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}