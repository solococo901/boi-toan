"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Sign = {
  id: string;
  name: string;
  slug: string;
};

export default function AdminHoroscopeForm({ signs }: { signs: Sign[] }) {
  const [zodiacId, setZodiacId] = useState(signs[0]?.id || "");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [overview, setOverview] = useState("");
  const [love, setLove] = useState("");
  const [career, setCareer] = useState("");
  const [money, setMoney] = useState("");
  const [luckyNumber, setLuckyNumber] = useState("");
  const [luckyColor, setLuckyColor] = useState("");
  const [advice, setAdvice] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Đang lưu...");

    const { error } = await supabase.from("daily_horoscopes").upsert(
      {
        zodiac_id: zodiacId,
        horoscope_date: date,
        overview,
        love,
        career,
        money,
        lucky_number: luckyNumber,
        lucky_color: luckyColor,
        advice,
      },
      {
        onConflict: "zodiac_id,horoscope_date",
      }
    );

    if (error) {
      setMessage("Lỗi: " + error.message);
      return;
    }

    setMessage("Đã lưu nội dung bói hằng ngày!");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-3xl border border-white/10 bg-white/10 p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <select
          value={zodiacId}
          onChange={(e) => setZodiacId(e.target.value)}
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        >
          {signs.map((sign) => (
            <option key={sign.id} value={sign.id} className="bg-[#10051f]">
              {sign.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />
      </div>

      <div className="mt-5 grid gap-4">
        <textarea
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          placeholder="Tổng quan hôm nay"
          rows={3}
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <textarea
          value={love}
          onChange={(e) => setLove(e.target.value)}
          placeholder="Tình yêu"
          rows={3}
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <textarea
          value={career}
          onChange={(e) => setCareer(e.target.value)}
          placeholder="Công việc"
          rows={3}
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <textarea
          value={money}
          onChange={(e) => setMoney(e.target.value)}
          placeholder="Tài chính"
          rows={3}
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={luckyNumber}
            onChange={(e) => setLuckyNumber(e.target.value)}
            placeholder="Con số may mắn"
            className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
          />

          <input
            value={luckyColor}
            onChange={(e) => setLuckyColor(e.target.value)}
            placeholder="Màu sắc may mắn"
            className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
          />
        </div>

        <textarea
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
          placeholder="Lời khuyên hôm nay"
          rows={3}
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <button className="rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 px-7 py-3 font-bold">
          Lưu nội dung
        </button>

        {message && <p className="text-sm text-pink-200">{message}</p>}
      </div>
    </form>
  );
}