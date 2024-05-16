// 'use client';
import { supabase } from '@/libs/supabaseClient';
import { redirect } from 'next/navigation';
import { FormEventHandler } from 'react';

export const handleSubmit = async (form: FormData) => {
  'use server';
  // const form = new FormData(event.currentTarget);
  const email = (form.get('email') || '') as string;
  console.log('コンソール', email);
  // redirect(`/`);
  // alert(`email: ${email}`);
  try {
    //   setLoading(true);
    // @supabase/supabase-js V1の書き方
    //   const { error } = await supabase.auth.signIn({ email })
    // supabase/supabase-js V2の書き方
    const {
      error,
      data: { session, user },
    } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      throw error;
    }

    console.log('Check your email for the login link!');
  } catch (error: any) {
    console.error('エラー', error.error_description || error.message);
  } finally {
    //   setLoading(false);
  }
};
