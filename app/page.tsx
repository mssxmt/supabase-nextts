import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col bg-sky-500 pb-5 pt-10 text-red-500">
      <Link href="/login">ログインページ</Link>
      <Link href="/account">Accountページ</Link>
    </main>
  );
}
