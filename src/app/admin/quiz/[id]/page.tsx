import Link from "next/link";
import { supabase } from "@/lib/supabase";
import AdminQuizResultForm from "@/components/AdminQuizResultForm";
import AdminQuizQuestionForm from "@/components/AdminQuizQuestionForm";

export const dynamic = "force-dynamic";

export default async function AdminQuizDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: quiz } = await supabase
    .from("quizzes")
    .select(`
      *,
      quiz_results (*),
      quiz_questions (
        *,
        quiz_answers (*)
      )
    `)
    .eq("id", id)
    .single();

  if (!quiz) {
    return (
      <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
        <h1 className="text-3xl font-black">Không tìm thấy quiz</h1>
      </main>
    );
  }

  const questions = [...quiz.quiz_questions].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <Link href="/admin/quiz" className="text-sm font-bold text-purple-300">
          ← Quay lại danh sách quiz
        </Link>

        <h1 className="mt-6 text-4xl font-black">{quiz.title}</h1>
        <p className="mt-3 text-white/70">{quiz.description}</p>
        <p className="mt-2 text-sm text-purple-300">Slug: {quiz.slug}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <AdminQuizResultForm quizId={quiz.id} />
          <AdminQuizQuestionForm quizId={quiz.id} />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
            <h2 className="text-2xl font-black">Kết quả hiện có</h2>

            <div className="mt-5 space-y-4">
              {quiz.quiz_results?.map((result: any) => (
                <div
                  key={result.id}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="text-sm font-bold text-pink-300">
                    Key: {result.result_key}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{result.title}</h3>
                  <p className="mt-2 text-white/70">{result.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
            <h2 className="text-2xl font-black">Câu hỏi hiện có</h2>

            <div className="mt-5 space-y-4">
              {questions.map((question: any) => (
                <div
                  key={question.id}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="text-sm text-purple-300">
                    Thứ tự: {question.sort_order}
                  </p>
                  <h3 className="mt-2 text-lg font-bold">
                    {question.question_text}
                  </h3>

                  <div className="mt-4 space-y-2">
                    {question.quiz_answers
                      ?.sort((a: any, b: any) => a.sort_order - b.sort_order)
                      .map((answer: any) => (
                        <p
                          key={answer.id}
                          className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white/75"
                        >
                          {answer.answer_text}{" "}
                          <span className="text-pink-300">
                            → {answer.result_key}
                          </span>
                        </p>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}