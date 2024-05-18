import AccountForm from './accountForm';
import { createClient } from '@/utils/server';

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AccountForm user={user} />;
}
