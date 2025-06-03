import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">إنشاء حساب جديد</h1>
      <form className="flex flex-col gap-4 w-full max-w-sm">
        <input type="text" placeholder="الاسم الكامل" className="border p-2 rounded" />
        <input type="email" placeholder="البريد الإلكتروني" className="border p-2 rounded" />
        <input type="password" placeholder="كلمة المرور" className="border p-2 rounded" />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">تسجيل</button>
      </form>
      <p className="mt-4">
        لديك حساب بالفعل؟ <Link href="/login" className="text-blue-500">سجل الدخول</Link>
      </p>
    </main>
  );
}
