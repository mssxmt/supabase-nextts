'use client';
import { useState, useEffect, Suspense } from 'react';
import Auth from '../components/Auth';
import Account from '../components/Account';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/libs/supabaseClient';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // セッションデータを返す
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
    })();

    // 認証のイベントを受け取る
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <main className='container' style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Auth />
        </Suspense>
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </main>
  );
}
