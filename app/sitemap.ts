import { getAllNews, NewsFrontmatter } from "@/utils/news/getAllNews";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages: MetadataRoute.Sitemap = [
    {
      url: "https://etsii.es",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://etsii.es/associations",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://etsii.es/titulations",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://etsii.es/news",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const news: NewsFrontmatter[] = await getAllNews();

  const newsPages: MetadataRoute.Sitemap = news.map((article: any) => ({
    url: `https://etsii.es/news/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...defaultPages, ...newsPages];
}
