import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      
      <main className="flex flex-col items-center justify-center pt-32 pb-20 px-6">
        {/* Hero Section */}
        <section className="max-w-4xl w-full flex flex-col items-start gap-8">
          <div className="border-l-4 border-black dark:border-white pl-6">
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter">
              Transi<br />tions
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-light max-w-2xl leading-relaxed">
              Système de jeu de rôle émergent, universel & sans dé.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link 
              href="/register" 
              className="bg-black text-white dark:bg-white dark:text-black px-8 py-4 text-lg font-bold hover:scale-105 transition-transform"
            >
              COMMENCER UNE CAMPAGNE
            </Link>
            <a 
              href="/Transitions v1.0.pdf" 
              target="_blank"
              className="border border-black dark:border-white px-8 py-4 text-lg font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              LIRE LES RÈGLES (PDF)
            </a>
          </div>
        </section>

        {/* Features Preview */}
        <section className="max-w-4xl w-full mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-black/10 dark:border-white/10 pt-16">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4">Pour les Guides</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Gérez votre réserve dramatique, introduisez des complications et arbitrez la cohérence narrative de vos univers maison.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4">Pour les Joueurs</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Créez vos personnages en quelques minutes, définissez vos traits et gérez votre réserve commune de jetons.
            </p>
          </div>
        </section>

        <footer className="mt-32 text-xs uppercase tracking-widest opacity-50">
          Écrit par Pierre Ragois — Club des Goules
        </footer>
      </main>
    </div>
  );
}