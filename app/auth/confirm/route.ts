import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/server';

/**
コード交換用の証明キー (PKCE) #
サインアップすると、一意のハッシュ コードが記載された電子メールがユーザーに送信されます。このキーは検証のためにアプリケーションに送り返され、ユーザーが認証されます。この方法は、Proof Key for Code Exchange (PKCE) と呼ばれます。認証フローで PKCE を使用しているため、セッションのコード交換を担当するルート ハンドラーを作成する必要があります。

次のコード スニペットでは、次の手順を実行します。

クエリパラメータを使用して、Supabase Auth サーバーから返送されたコードを取得しますtoken_hash。
このコードをセッションと交換し、選択したストレージ メカニズム (この場合は Cookie) に保存します。
最後に、ユーザーをaccountページにリダイレクトします。
 */

// ルート /auth/confirm への GET リクエストのハンドラーを作成
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = '/account';

  // シークレットトークンを含まないリダイレクトリンクを作成
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete('token_hash');
  redirectTo.searchParams.delete('type');

  if (token_hash && type) {
    const supabase = createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      redirectTo.searchParams.delete('next');
      return NextResponse.redirect(redirectTo);
    }
  }

  // ユーザーをエラーページに戻し、いくつかの指示を表示する
  redirectTo.pathname = '/error';
  return NextResponse.redirect(redirectTo);
}
