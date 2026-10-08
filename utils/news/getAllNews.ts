export interface NewsFrontmatter {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  cover_url: string;
}

export async function getAllNews(): Promise<NewsFrontmatter[]> {
  try {
    const mdxModules = import.meta.glob("/content/news/*.mdx");

    const newsPromises = Object.entries(mdxModules).map(
      async ([filepath, resolver]) => {
        const slug = filepath.split("/").pop()?.replace(".mdx", "") || "";

        const module = (await resolver()) as {
          frontmatter: Omit<NewsFrontmatter, "slug">;
        };

        return {
          slug,
          ...module.frontmatter,
        } as NewsFrontmatter;
      },
    );

    const newsList = await Promise.all(newsPromises);

    // Ordenamos el array de más reciente a más antigua
    newsList.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Orden descendente
    });

    return newsList;
  } catch (error) {
    console.error("Error al obtener las noticias con Vite glob:", error);
    return [];
  }
}
