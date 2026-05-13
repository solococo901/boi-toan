import { supabase } from "@/lib/supabase";
import AdminTarotForm from "@/components/AdminTarotForm";

export const dynamic = "force-dynamic";

export default async function AdminTarotPage() {
  const { data: cards } = await supabase
    .from("tarot_cards")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-pink-300">
          Admin Tarot
        </p>

        <h1 className="text-4xl font-black">Danh sách lá bài Tarot</h1>

        <AdminTarotForm />

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10 text-white">
              <tr>
                <th className="p-4">Tên lá bài</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Ý nghĩa</th>
              </tr>
            </thead>

            <tbody>
              {cards?.map((card) => (
                <tr key={card.id} className="border-t border-white/10">
                  <td className="p-4 font-bold">{card.name}</td>
                  <td className="p-4 text-purple-300">{card.slug}</td>
                  <td className="p-4 text-white/70">
                    {card.meaning_general}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}