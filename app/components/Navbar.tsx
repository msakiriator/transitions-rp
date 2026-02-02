import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-black/5 dark:border-white/10">
      <div className="font-bold tracking-tighter text-xl">TRANSITIONS</div>
      <div className="flex gap-8 text-sm font-medium uppercase tracking-widest">
        <Link href="/posts" className="px-4 py-2 bg-white dark:bg-black hover:opacity-50 transition">Actualités</Link>
        <Link href="/login" className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:invert transition">
          Se Connecter
        </Link>
      </div>
    </nav>
  );
}