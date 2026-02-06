import { createClient } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { config } from "@/lib/sanity.config";

const client = createClient(config);

export default async function Page() {
  const posts = await client.fetch(`*[_type == "post"] | order(date desc)`);

  return (
    <main className="max-w-3xl mx-auto pt-32 pb-20 px-6 font-sans">
      <h1 className="text-4xl font-black uppercase mb-12 tracking-tighter">
        Actualités
      </h1>
      <div className="space-y-12">
        {posts.map((post: any) => (
          <article key={post._id} className="border-l-2 border-black pl-6">
            <div className="text-xs font-mono opacity-50 mb-2">
              {post.date} — {post.category}
            </div>
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight">
              {post.title}
            </h2>
            <div className="prose dark:prose-invert">
              <PortableText value={post.content} />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}