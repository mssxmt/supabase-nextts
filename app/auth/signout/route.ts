import { createClient } from '@/utils/server';
import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

// サーバー側からのサインアウトを処理するルート ハンドラー。
// 最初にユーザーがログインしているかどうかを必ず確認してください。
export async function POST(req: NextRequest) {
  const supabase = createClient();

  // 最初にユーザーがログインしているかどうかを確認
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  revalidatePath('/', 'layout');
  return NextResponse.redirect(new URL('/login', req.url), {
    status: 302,
  });
}
