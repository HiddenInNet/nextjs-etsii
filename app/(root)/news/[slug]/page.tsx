import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ArticleHeader from "@/components/news/ArticleHeader";
import ArticleContent from "@/components/news/ArticleContent";
import { MDXContent } from "@/components/mdx/mdx-content";

// Añadimos manejo de errores por si el archivo no existe
async function getArticleData(slug: string) {
  try {
    const { default: Post, frontmatter } = await import(
      `@/content/news/${slug}.mdx`
    );
    return { Post, frontmatter };
  } catch (error) {
    return { Post: null, frontmatter: null };
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticleData(params.slug);

  if (!article.frontmatter) {
    return { title: "Noticia no encontrada | The ETSII Gazette" };
  }

  return {
    title: `${article.frontmatter.title} | The ETSII Gazette`,
    description: article.frontmatter.excerpt,
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { Post, frontmatter } = await getArticleData(params.slug);

  // Manejo de estado 404 si el archivo MDX no se encuentra
  if (!Post || !frontmatter) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 font-mono">
        <h1 className="text-2xl font-bold">404 - Noticia no encontrada</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-100 px-4 pt-28 pb-16 font-mono text-neutral-950 selection:bg-purple-400 selection:text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 border-2 border-neutral-950 bg-white px-3 py-1.5 font-mono text-xs font-bold uppercase shadow-[4px_4px_0_#0a0a0a] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[0px_0px_0_#0a0a0a]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a Portada</span>
          </Link>
        </div>

        <ArticleHeader frontmatter={frontmatter} />

        <ArticleContent>
          <MDXContent component={Post} />
        </ArticleContent>
      </div>
    </main>
  );
}
