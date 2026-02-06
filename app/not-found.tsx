import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-9xl font-black text-black/10 dark:text-white/10 select-none">
        404
      </h1>
      <div className="space-y-6 relative -mt-12">
        <h2 className="text-2xl font-bold uppercase tracking-widest">
          Transmission Perdue
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
          La fréquence que vous essayez d'atteindre ne répond pas ou n'existe pas dans ce secteur.
        </p>
        <div>
          <Link 
            href="/" 
            className="inline-block bg-black text-white dark:bg-white dark:text-black px-8 py-3 font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
          >
            Retour au QG
          </Link>
        </div>
      </div>
    </div>
  );
}