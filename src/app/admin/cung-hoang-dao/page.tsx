import { supabase } from "@/lib/supabase";
import AdminHoroscopeForm from "@/components/AdminHoroscopeForm";

export const dynamic = "force-dynamic";

export default async function AdminHoroscopePage() {
  const { data: signs } = await supabase
    .from("zodiac_signs")
    .select("*")
    .order("created_at");

  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-purple-300">
          Admin Cung hoàng đạo
        </p>

        <h1 className="text-4xl font-black">Nhập bói hằng ngày</h1>

        <p className="mt-4 text-white/70">
          Chọn cung hoàng đạo, nhập nội dung hôm nay rồi lưu vào Supabase.
        </p>

        <AdminHoroscopeForm signs={signs || []} />
      </section>
    </main>
  );
}