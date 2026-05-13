"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminQuizQuestionForm({ quizId }: { quizId: string }) {
  const [questionText, setQuestionText] = useState("");
  const [sortOrder, setSortOrder] = useState("1");

  const [answer1, setAnswer1] = useState("");
  const [key1, setKey1] = useState("A");

  const [answer2, setAnswer2] = useState("");
  const [key2, setKey2] = useState("B");

  const [answer3, setAnswer3] = useState("");
  const [key3, setKey3] = useState("C");

  const [answer4, setAnswer4] = useState("");
  const [key4, setKey4] = useState("D");

  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Đang thêm câu hỏi...");

    const { data: question, error: questionError } = await supabase
      .from("quiz_questions")
      .insert({
        quiz_id: quizId,
        question_text: questionText,
        sort_order: Number(sortOrder),
      })
      .select()
      .single();

    if (questionError || !question) {
      setMessage("Lỗi: " + questionError?.message);
      return;
    }

    const answers = [
      { answer_text: answer1, result_key: key1.toUpperCase(), sort_order: 1 },
      { answer_text: answer2, result_key: key2.toUpperCase(), sort_order: 2 },
      { answer_text: answer3, result_key: key3.toUpperCase(), sort_order: 3 },
      { answer_text: answer4, result_key: key4.toUpperCase(), sort_order: 4 },
    ]
      .filter((item) => item.answer_text.trim() !== "")
      .map((item) => ({
        question_id: question.id,
        ...item,
      }));

    const { error: answerError } = await supabase
      .from("quiz_answers")
      .insert(answers);

    if (answerError) {
      setMessage("Lỗi thêm đáp án: " + answerError.message);
      return;
    }

    setMessage("Đã thêm câu hỏi và đáp án!");
    setQuestionText("");
    setSortOrder("1");
    setAnswer1("");
    setAnswer2("");
    setAnswer3("");
    setAnswer4("");
    window.location.reload();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/10 p-6"
    >
      <h2 className="text-2xl font-black">Thêm câu hỏi</h2>

      <div className="mt-6 grid gap-4">
        <input
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          type="number"
          placeholder="Thứ tự câu hỏi"
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Nội dung câu hỏi"
          required
          rows={3}
          className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
        />

        <div className="grid gap-3">
          <input
            value={answer1}
            onChange={(e) => setAnswer1(e.target.value)}
            placeholder="Đáp án 1"
            required
            className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
          />
          <input
            value={key1}
            onChange={(e) => setKey1(e.target.value)}
            placeholder="Key kết quả cho đáp án 1, ví dụ A"
            className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
          />
        </div>

        <div className="grid gap-3">
          <input
            value={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
            placeholder="Đáp án 2"
            required
            className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
          />
          <input
            value={key2}
            onChange={(e) => setKey2(e.target.value)}
            placeholder="Key kết quả cho đáp án 2, ví dụ B"
            className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
          />
        </div>

        <div className="grid gap-3">
          <input
            value={answer3}
            onChange={(e) => setAnswer3(e.target.value)}
            placeholder="Đáp án 3"
            className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
          />
          <input
            value={key3}
            onChange={(e) => setKey3(e.target.value)}
            placeholder="Key kết quả cho đáp án 3, ví dụ C"
            className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
          />
        </div>

        <div className="grid gap-3">
          <input
            value={answer4}
            onChange={(e) => setAnswer4(e.target.value)}
            placeholder="Đáp án 4"
            className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
          />
          <input
            value={key4}
            onChange={(e) => setKey4(e.target.value)}
            placeholder="Key kết quả cho đáp án 4, ví dụ D"
            className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
          />
        </div>

        <button className="rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 px-7 py-3 font-bold">
          Thêm câu hỏi
        </button>

        {message && <p className="text-sm text-pink-200">{message}</p>}
      </div>
    </form>
  );
}