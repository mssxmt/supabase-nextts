'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/server';

/**
 * ユーザーの情報を取得します。
その情報をサインアップ リクエストとして Supabase に送信すると、確認メールが送信されます。
発生したエラーを処理します。
*/
export async function login(formData: FormData) {
  const supabase = createClient();

  // 便宜上、ここで型キャストを行っています
  // 実際には、入力を検証する必要があります

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // 便宜上、ここで型キャストを行っています
  // 実際には、入力を検証する必要があります

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}
