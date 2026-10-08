"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { NewsFrontmatter } from "@/app/(root)/news/page";

interface NewsCardProps {
  article: NewsFrontmatter;
  isHeadliner: boolean;
}

export default function NewsCard({ article, isHeadliner }: NewsCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -6,
        boxShadow: "12px 12px 0 #0a0a0a",
        borderColor: "#9333ea",
        duration: 0.2,
        ease: "power2.out",
      });
      // Animamos la imagen interior
      const img = cardRef.current.querySelector("img");
      if (img)
        gsap.to(img, { filter: "grayscale(0%)", scale: 1.05, duration: 0.3 });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: "6px 6px 0 #0a0a0a",
        borderColor: "#0a0a0a",
        duration: 0.2,
        ease: "power2.out",
      });
      const img = cardRef.current.querySelector("img");
      if (img)
        gsap.to(img, { filter: "grayscale(100%)", scale: 1, duration: 0.3 });
    }
  };

  return (
    <Link
      ref={cardRef}
      href={`/news/${article.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group flex h-full flex-col overflow-hidden border-4 border-neutral-950 bg-white p-4 shadow-[6px_6px_0_#0a0a0a] transition-colors ${
        isHeadliner ? "sm:p-6" : "p-4"
      }`}
    >
      {/* Metadatos superiores */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b-2 border-neutral-950 pb-2">
        <span className="bg-purple-600 px-2 py-1 font-mono text-[10px] font-bold text-white uppercase">
          {article.category}
        </span>
        <span className="font-mono text-xs font-bold text-neutral-600">
          {article.date} • POR {article.author.toUpperCase()}
        </span>
      </div>

      {/* Titular */}
      <h2
        className={`mb-4 font-serif leading-none font-black text-neutral-950 transition-colors group-hover:text-purple-700 ${
          isHeadliner
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-2xl sm:text-3xl"
        }`}
      >
        {article.title}
      </h2>

      {/* Contenido (Imagen y Extracto) */}
      <div
        className={`flex flex-grow flex-col gap-4 ${isHeadliner ? "sm:flex-row-reverse" : ""}`}
      >
        {/* Imagen Neobrutalista */}
        <div
          className={`relative flex-shrink-0 overflow-hidden border-2 border-neutral-950 ${
            isHeadliner
              ? "aspect-video sm:aspect-auto sm:w-1/2"
              : "aspect-video w-full"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.cover_url}
            alt={`Portada para ${article.title}`}
            className="h-full w-full object-cover grayscale transition-all duration-300"
          />
          <div className="absolute inset-0 bg-purple-600/10 opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Extracto y botón de leer más */}
        <div className="flex flex-grow flex-col justify-between">
          <p
            className={`font-serif leading-relaxed text-neutral-800 ${
              isHeadliner ? "text-lg font-medium lg:text-xl" : "text-sm"
            }`}
          >
            {article.excerpt}
          </p>

          <div className="mt-6 flex items-center gap-2 font-mono text-xs font-black text-neutral-950 uppercase">
            <span className="border-b-2 border-transparent transition-colors group-hover:border-purple-600">
              Leer Noticia Completa
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
