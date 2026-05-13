import { supabase } from "@/lib/supabase";
import AdminQuizForm from "@/components/AdminQuizForm";

export const dynamic = "force-dynamic";

export default async function AdminQuizPage() {
    const { data: quizzes } = await supabase
        .from("quizzes")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
            <section className="mx-auto max-w-6xl">
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-pink-300">
                    Admin Quiz
                </p>

                <h1 className="text-4xl font-black">Quản lý Quiz</h1>

                <p className="mt-4 text-white/70">
                    Tạo quiz mới. Sau đó bạn sẽ thêm câu hỏi, đáp án và kết quả.
                </p>

                <AdminQuizForm />

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {quizzes?.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="rounded-3xl border border-white/10 bg-white/10 p-6"
                        >
                            <h2 className="text-2xl font-bold">{quiz.title}</h2>
                            <p className="mt-2 text-sm text-purple-300">/{quiz.slug}</p>
                            <p className="mt-4 text-white/70">{quiz.description}</p>

                            <div className="mt-5 flex gap-3">
                                <a
                                    href={`/admin/quiz/${quiz.id}`}
                                    className="rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 px-5 py-2 text-sm font-bold text-white"
                                >
                                    Chỉnh sửa
                                </a>

                                <a
                                    href={`/quiz/${quiz.slug}`}
                                    target="_blank"
                                    className="rounded-full bg-white px-5 py-2 text-sm font-bold text-[#10051f]"
                                >
                                    Xem quiz
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}