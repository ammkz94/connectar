import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">تسجيل الدخول</h1>
      <form className="flex flex-col gap-4 w-full max-w-sm">
        <input type="email" placeholder="البريد الإلكتروني" className="border p-2 rounded" />
        <input type="password" placeholder="كلمة المرور" className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">دخول</button>
      </form>
      <p className="mt-4">
        ليس لديك حساب؟ <Link href="/signup" className="text-blue-500">سجل الآن</Link>
      </p>
    </main>
  );
}
