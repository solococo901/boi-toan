import TarotDrawClient from "@/components/TarotDrawClient";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function TarotPage() {
  const { data: cards, error } = await supabase
    .from("tarot_cards")
    .select("*")
    .eq("is_active", true)
    .order("number_order", { ascending: true });

  if (error) {
    return (
      <main className="min-h-screen bg-[#10051f] px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-red-400/20 bg-red-500/10 p-8">
          <h1 className="text-3xl font-black">Không tải được bộ bài Tarot</h1>
          <p className="mt-3 text-white/70">{error.message}</p>
        </div>
      </main>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <main className="min-h-screen bg-[#10051f] px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-yellow-400/20 bg-yellow-500/10 p-8">
          <h1 className="text-3xl font-black">Chưa có dữ liệu Tarot</h1>
          <p className="mt-3 text-white/70">
            Hãy kiểm tra bảng tarot_cards trong Supabase và seed đủ 78 lá bài.
          </p>
        </div>
      </main>
    );
  }

  return <TarotDrawClient cards={cards} />;
}