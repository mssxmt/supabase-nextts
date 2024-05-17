import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**Next.js ミドルウェア#
サーバー コンポーネントは Cookie を書き込むことができないため、期限切れの認証トークンを更新して保存するためのミドルウェアが必要です。
これは次のようにして実現されます。

supabase.auth.getUserへの呼び出しで認証トークンを更新します。
更新された認証トークンを request.cookies.setを通じてサーバー コンポーネントに渡すため、コンポーネント自体が同じトークンを更新しようとしません。
更新された認証トークンをブラウザーに渡して、古いトークンを置き換えます。これは response.cookies.setで行われます。
*/
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // refreshing the auth token
  await supabase.auth.getUser();

  return response;
}
