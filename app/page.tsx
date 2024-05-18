import Link from 'next/link';

export default function Home() {
  return (
    <main className="container" style={{ padding: '50px 0 100px 0' }}>
      <Link href="/login">ログインページ</Link>
      <Link href="/account">Accountページ</Link>
    </main>
  );
}
