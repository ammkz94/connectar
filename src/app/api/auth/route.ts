import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password } = body

  // تحقق من وجود الحقول
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // مثال: تسجيل دخول وهمي
  if (email === 'admin@example.com' && password === '123456') {
    return NextResponse.json({
      message: 'Login successful',
      user: { email },
    })
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
