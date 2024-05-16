import { supabase } from '@/libs/supabaseClient';
import { FormEventHandler } from 'react';
import { handleSubmit } from './handler';

export default function Auth() {
  //   const [loading, setLoading] = useState(false);
  //   const [email, setEmail] = useState('');

  const handleLogin = async (email: string) => {
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

      alert('Check your email for the login link!');
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      //   setLoading(false);
    }
  };
  //   const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
  //     const form = new FormData(event.currentTarget);
  //     const email = form.get('email') || '';

  //     alert(`email: ${email}`);
  //   };
  return (
    <div className='row flex flex-center'>
      <div className='col-6 form-widget'>
        <h1 className='header'>Supabase + Next.js</h1>
        <p className='description'>
          Sign in via magic link with your email below
        </p>
        {/* <div>
          <input
            className='inputField'
            type='email'
            placeholder='Your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            className='button block'
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div> */}
        <form action={handleSubmit}>
          <input type='text' defaultValue='' name='email' />
          <input type='submit' value='Submit' />
        </form>
      </div>
    </div>
  );
}
