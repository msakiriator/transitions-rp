'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-black/5 dark:border-white/10">
      <div className="flex justify-between items-center px-8 py-6">
      <Link href="/" className="font-bold tracking-tighter text-xl hover:opacity-70 transition-opacity">TRANSITIONS</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
          <Link href="/posts" className="px-4 py-2 bg-white dark:bg-black hover:opacity-50 transition">Actualités</Link>
          <Link href="/login" className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:invert transition">
            Se Connecter
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? <path d="M18 6 6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-black border-b border-black/5 dark:border-white/10 flex flex-col items-center py-8 gap-6 text-sm font-medium uppercase tracking-widest shadow-lg">
          <Link href="/posts" onClick={() => setIsOpen(false)} className="hover:opacity-50 transition">Actualités</Link>
          <Link href="/login" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:invert transition">
            Se Connecter
          </Link>
        </div>
      )}
    </nav>
  );
}