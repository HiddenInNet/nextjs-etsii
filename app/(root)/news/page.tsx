import { Metadata } from "next";
import NewsHeader from "@/components/news/NewsHeader";
import NewsGrid from "@/components/news/NewsGrid";
import { getAllNews } from "@/utils/news/getAllNews";

export const metadata: Metadata = {
  title: "ETSII APP - Noticias",
  description: "Últimas novedades, artículos y reportajes de la Escuela.",
};

export default async function NewsPage() {
  // Cargamos las noticias reales ordenadas en el servidor
  const news = await getAllNews();

  return (
    <main className="min-h-screen bg-neutral-100 px-4 pt-28 pb-16 font-mono text-neutral-950 selection:bg-purple-400 selection:text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <NewsHeader />
        <NewsGrid articles={news} />
      </div>
    </main>
  );
}
