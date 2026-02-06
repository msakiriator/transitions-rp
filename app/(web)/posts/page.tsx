import Link from 'next/link';
import { client } from '@/sanity/client';
import { PortableText } from "@portabletext/react";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  body: any;
  author: string;
}

export const dynamic = 'force-static';

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    body,
    author,
  }`;
  
  return client.fetch(query);
}

export default async function PostsPage() {
  const posts: Post[] = await getPosts();

  return (
    <main className="min-h-screen max-w-3xl mx-auto pt-32 pb-20 px-6 font-sans">
      <h1 className="text-4xl font-black uppercase mb-12 tracking-tighter border-b pb-4 border-gray-200 dark:border-gray-800">
        Actualités
      </h1>
      <div className="grid gap-10">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post._id} className="bg-white/50 dark:bg-zinc-900/50 p-8 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
              {/* En-tête de l'article */}
              <header className="mb-6">
                <div className="text-sm text-gray-500 font-mono mb-2 uppercase tracking-wider">
                  {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  <Link href={`/posts/${post.slug.current}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <div className="flex items-center gap-3 text-sm text-gray-500 font-mono mb-2  tracking-wider">
                  {/* On affiche l'auteur seulement s'il est renseigné */}
                  {post.author && (
                    <>
                      <span>•</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">
                        {post.author}
                      </span>
                    </>
                  )}
                </div>
              </header>

              {/* Corps de l'article (Affichage du texte riche) */}
              <div className="prose dark:prose-invert max-w-none">
                <PortableText value={post.body} />
              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-500 py-20 italic">
            Aucune transmission reçue pour le moment...
          </p>
        )}
      </div>
    </main>
  );
}