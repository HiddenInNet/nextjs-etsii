"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NewsCard from "@/components/news/NewsCard";
import { NewsFrontmatter } from "@/utils/news/getAllNews";

interface NewsGridProps {
  articles: NewsFrontmatter[];
}

export default function NewsGrid({ articles }: NewsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".gsap-news-item", {
        y: 50,
        opacity: 0,
        rotation: 2,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(1.2)",
      });
    },
    { scope: gridRef },
  );

  if (!articles.length) return null;

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
    >
      {articles.map((article, index) => {
        // La primera noticia es la destacada ("Headliner")
        const isHeadliner = index === 0;

        return (
          <div
            key={article.slug}
            className={`gsap-news-item h-full ${
              isHeadliner ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""
            }`}
          >
            <NewsCard article={article} isHeadliner={isHeadliner} />
          </div>
        );
      })}
    </div>
  );
}
