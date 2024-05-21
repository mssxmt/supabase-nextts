import { type Database } from '@/types/supabase';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * 
 * Supabase には 2 つの異なるタイプのクライアントがあります。

クライアント コンポーネント クライアント- ブラウザで実行されるクライアント コンポーネントから Supabase にアクセスします。
サーバー コンポーネント クライアント- サーバー上でのみ実行されるサーバー コンポーネント、サーバー アクション、およびルート ハンドラーから Supabase にアクセスします。
 */
export function createClient() {
  const cookieStore = cookies();

  // 新しく設定されたクッキーを使用してサーバーの Supabase クライアントを作成します。
  // これはユーザーのセッションを維持するために使用できます。
  /**cookieセットのところで
   * Unsafe argument of type `any` assigned to a parameter of type `[key: string, value: string] | [options: RequestCookie]`
   * と出るがどうにもならないので黙らせてる
   */
  //Databaseの型を渡す！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // `set` メソッドはサーバーコンポーネントから呼び出されました。
            // ユーザーセッションを更新するミドルウェアがある場合は、これは無視できます。
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // `delete` メソッドはサーバーコンポーネントから呼び出されました。
            // ユーザーセッションを更新するミドルウェアがある場合は、これは無視できます。
          }
        },
      },
    },
  );
}
