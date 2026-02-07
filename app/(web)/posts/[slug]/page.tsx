import { client } from '@/sanity/client';
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Définition du type pour l'article
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  _createdAt: string;
  body: any;
  author: string;
  category?: string;
}

// 1. GENERATION STATIQUE
// Cette fonction liste tous les slugs existants pour que Next.js puisse créer les fichiers HTML
export async function generateStaticParams() {
  const query = `*[_type == "post"]{ "slug": slug.current }`;
  const posts = await client.fetch(query);

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// 2. RECUPERATION DES DONNEES
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    _createdAt,
    body,
    author,
    category
  }`;

  return client.fetch(query, { slug });
}

// 3. COMPOSANTS DE STYLE POUR LE TEXTE RICHE
const ptComponents: PortableTextComponents = {
    block: {
      h1: ({children}) => <h1 className="text-3xl font-black mt-10 mb-6 uppercase tracking-tight">{children}</h1>,
      h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4 uppercase tracking-tight border-l-4 border-black dark:border-white pl-4">{children}</h2>,
      h3: ({children}) => <h3 className="text-xl font-bold mt-6 mb-3 text-zinc-800 dark:text-white">{children}</h3>,
      h4: ({children}) => <h4 className="text-lg font-bold mt-4 mb-2 uppercase tracking-wide text-zinc-800 dark:text-white">{children}</h4>,
      normal: ({children}) => <p className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</p>,
      blockquote: ({children}) => <blockquote className="border-l-4 border-black dark:border-white pl-4 italic my-6 opacity-80 bg-zinc-50 dark:bg-zinc-900 py-2 pr-2 rounded-r">{children}</blockquote>,
    },
    list: {
      bullet: ({children}) => <ul className="list-disc pl-5 mb-4 space-y-2 marker:text-zinc-400">{children}</ul>,
      number: ({children}) => <ol className="list-decimal pl-5 mb-4 space-y-2 marker:font-bold">{children}</ol>,
    },
    marks: {
      link: ({value, children}) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
        return (
          <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : undefined} className="underline decoration-1 underline-offset-2 hover:decoration-2 text-blue-600 dark:text-blue-400 font-medium">
            {children}
          </a>
        )
      },
    },
  }

// 4. LA PAGE DE L'ARTICLE
export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post: Post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const dateToDisplay = post.publishedAt || post._createdAt;

  return (
    <article className="min-h-screen max-w-3xl mx-auto pt-32 pb-20 px-6 font-sans">
      
      {/* Navigation retour */}
      <Link href="/posts" className="inline-block mb-8 text-sm font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
        ← Retour aux actualités
      </Link>

      {/* En-tête */}
      <header className="mb-12 border-b border-black/10 dark:border-white/10 pb-8">
      {post.category && (
            <span className="inline-block mb-4 px-3 py-1 border border-black dark:border-white rounded-full text-xs font-bold uppercase tracking-widest">
                {post.category}
            </span>
        )}
        
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-zinc-500 uppercase tracking-wider">
          <time dateTime={dateToDisplay}>
            {new Date(dateToDisplay).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          
          {post.author && (
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-current rounded-full" />
              <span className="text-black dark:text-white font-bold">{post.author}</span>
            </span>
          )}
        </div>
      </header>

      {/* Contenu */}
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <PortableText value={post.body} components={ptComponents} />
      </div>
      
    </article>
  );
}