import { type Database } from '@/types/supabase';
import { createBrowserClient } from '@supabase/ssr';

/**
 * 
 * Supabase には 2 つの異なるタイプのクライアントがあります。

クライアント コンポーネント クライアント- ブラウザで実行されるクライアント コンポーネントから Supabase にアクセスします。
サーバー コンポーネント クライアント- サーバー上でのみ実行されるサーバー コンポーネント、サーバー アクション、およびルート ハンドラーから Supabase にアクセスします。
 */
export function createClient() {
  // Create a supabase client on the browser with project's credentials
  //Databaseの型を渡す！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
