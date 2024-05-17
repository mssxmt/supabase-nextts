import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/middleware';

export async function middleware(request: NextRequest) {
  // update user's auth session
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * 以下で始まるリクエストパスを除くすべてのリクエストパスにマッチします:
     * - _next/static (静的ファイル)
     * - _next/image (画像最適化ファイル)
     * - favicon.ico (ファビコンファイル)
     * このパターンに他のパスを含めるように自由に変更してください。
     */

    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
