import AdminLoginForm from "@/components/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-[#10051f] px-6 py-16 text-white">
      <section className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-8">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-pink-300">
          Admin Login
        </p>

        <h1 className="text-4xl font-black">Đăng nhập quản trị</h1>

        <AdminLoginForm />
      </section>
    </main>
  );
}