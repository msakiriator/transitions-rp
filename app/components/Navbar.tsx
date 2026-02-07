'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();


  useEffect(() => {
    setMounted(true);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  const ThemeToggle = ({ className }: { className?: string }) => {
    if (!mounted) return null;
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${className}`}
        aria-label="Changer le thème"
      >
        {theme === "dark" ? (
          // Soleil (Mode Sombre activé -> vers Clair)
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          // Lune (Mode Clair activé -> vers Sombre)
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    );
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-black/5 dark:border-white/10">
      <div className="flex justify-between items-center px-8 py-6">
        <Link href="/" className="font-bold tracking-tighter text-xl hover:opacity-70 transition-opacity">TRANSITIONS</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 text-sm font-medium uppercase tracking-widest">
          <Link href="/posts" className="px-4 py-2 bg-white dark:bg-black hover:opacity-50 transition">
            Actualités
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white ransition border border-red-600"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <Link href="/login" className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:invert transition border border-black dark:border-white">
              Se Connecter
            </Link>
          )}

          <div className="border-l border-black/10 dark:border-white/20 pl-6 ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-black border-b border-black/5 dark:border-white/10 flex flex-col items-center py-8 gap-6 text-sm font-medium uppercase tracking-widest shadow-lg">
          <Link href="/posts" onClick={() => setIsOpen(false)} className="hover:opacity-50 transition">
            Actualités
          </Link>

          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-600 transition w-auto"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:invert transition">
              Se Connecter
            </Link>
          )}

          <div className="pt-4 mt-2 border-t border-black/10 dark:border-white/10 w-1/3 flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}