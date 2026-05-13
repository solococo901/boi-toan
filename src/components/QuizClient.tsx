"use client";

import { useState } from "react";

type Answer = {
  id: string;
  answer_text: string;
  result_key: string;
};

type Question = {
  id: string;
  question_text: string;
  quiz_answers: Answer[];
};

type Result = {
  id: string;
  result_key: string;
  title: string;
  description: string;
};

export default function QuizClient({
  title,
  description,
  questions,
  results,
}: {
  title: string;
  description: string | null;
  questions: Question[];
  results: Result[];
}) {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [finalResult, setFinalResult] = useState<Result | null>(null);

  const question = questions[current];


  if (!questions || questions.length === 0) {
  return (
    <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/10 p-8 text-white backdrop-blur md:p-12">
      <h1 className="text-3xl font-black">Quiz chưa có câu hỏi</h1>
      <p className="mt-4 text-white/70">
        Bạn cần thêm dữ liệu câu hỏi và đáp án trong Supabase trước.
      </p>
      <a
        href="/quiz"
        className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-bold text-[#10051f]"
      >
        Quay lại danh sách quiz
      </a>
    </section>
  );
}

  function chooseAnswer(answer: Answer) {
    const nextScores = {
      ...scores,
      [answer.result_key]: (scores[answer.result_key] || 0) + 1,
    };

    setScores(nextScores);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      return;
    }

    const winnerKey = Object.entries(nextScores).sort((a, b) => b[1] - a[1])[0][0];
    const result = results.find((item) => item.result_key === winnerKey) || null;

    setFinalResult(result);
  }

  function restart() {
    setCurrent(0);
    setScores({});
    setFinalResult(null);
  }

  if (finalResult) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/10 p-8 text-white backdrop-blur md:p-12">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-pink-300">
          Kết quả của bạn
        </p>

        <div className="text-7xl">💖</div>

        <h1 className="mt-6 text-4xl font-black md:text-6xl">
          {finalResult.title}
        </h1>

        <p className="mt-6 text-lg text-white/75">
          {finalResult.description}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={restart}
            className="rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 px-7 py-3 font-bold shadow-lg shadow-purple-900/40 transition hover:scale-105"
          >
            Làm lại quiz
          </button>

          <a
            href="/quiz"
            className="rounded-full border border-white/20 bg-white/10 px-7 py-3 text-center font-bold transition hover:bg-white/20"
          >
            Xem quiz khác
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/10 p-8 text-white backdrop-blur md:p-12">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-purple-300">
        Câu {current + 1}/{questions.length}
      </p>

      <h1 className="text-3xl font-black md:text-5xl">{title}</h1>

      {description && <p className="mt-4 text-white/65">{description}</p>}

      <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold">{question.question_text}</h2>

        <div className="mt-6 grid gap-4">
          {question.quiz_answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => chooseAnswer(answer)}
              className="rounded-2xl border border-white/10 bg-black/20 p-5 text-left font-semibold text-white/85 transition hover:-translate-y-1 hover:bg-white/15"
            >
              {answer.answer_text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}