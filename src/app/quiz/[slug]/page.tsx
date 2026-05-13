import Link from "next/link";
import { supabase } from "@/lib/supabase";
import QuizClient from "@/components/QuizClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function QuizDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: quiz } = await supabase
    .from("quizzes")
    .select(`
      *,
      quiz_questions (
        *,
        quiz_answers (*)
      ),
      quiz_results (*)
    `)
    .eq("slug", slug)
    .single();

  if (!quiz) {
    notFound();
  }

  const questions = [...quiz.quiz_questions].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  const sortedQuestions = questions.map((question) => ({
    ...question,
    quiz_answers: [...question.quiz_answers].sort(
      (a, b) => a.sort_order - b.sort_order
    ),
  }));

  const results = [...quiz.quiz_results];

  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <QuizClient
        title={quiz.title}
        description={quiz.description}
        questions={sortedQuestions}
        results={results}
      />
    </main>
  );
}