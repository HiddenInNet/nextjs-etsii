"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Frontmatter {
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  cover_url: string;
}

export default function ArticleHeader({
  frontmatter,
}: {
  frontmatter: Frontmatter;
}) {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".gsap-meta", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          ".gsap-title",
          { y: 40, opacity: 0, duration: 0.8, ease: "power4.out" },
          "-=0.4",
        )
        .from(".gsap-excerpt", { opacity: 0, x: -20, duration: 0.6 }, "-=0.4")
        .from(
          ".gsap-cover",
          {
            scale: 0.95,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
            filter: "grayscale(100%)",
          },
          "-=0.2",
        )
        .to(".gsap-cover", { filter: "grayscale(0%)", duration: 1 });
    },
    { scope: headerRef },
  );

  return (
    <header
      ref={headerRef}
      className="mb-12 border-b-8 border-neutral-950 pb-10"
    >
      {/* Metadatos (Categoría y Fecha) */}
      <div className="gsap-meta mb-6 flex flex-wrap items-center justify-between border-b-4 border-neutral-950 pb-2">
        <span className="bg-pantone-201 px-3 py-1 font-mono text-xs font-black text-white uppercase">
          {frontmatter.category}
        </span>
        <span className="font-mono text-sm font-bold text-neutral-600 uppercase">
          Edición • {frontmatter.date}
        </span>
      </div>

      {/* Titular */}
      <h1 className="gsap-title mb-6 font-serif text-4xl leading-[1.1] font-black tracking-tight text-neutral-950 sm:text-6xl md:text-7xl">
        {frontmatter.title}
      </h1>

      {/* Extracto y Autor */}
      <div className="gsap-excerpt mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <p className="max-w-2xl border-l-4 border-pantone-201 pl-4 font-serif text-xl leading-relaxed font-medium text-neutral-700 sm:text-2xl">
          {frontmatter.excerpt}
        </p>
        <div className="shrink-0 text-right">
          <p className="font-mono text-xs text-neutral-500 uppercase">
            Reportaje por
          </p>
          <p className="font-mono text-sm font-black uppercase">
            {frontmatter.author}
          </p>
        </div>
      </div>

      {/* Imagen de Portada Neobrutalista */}
      <div className="gsap-cover relative w-full overflow-hidden border-4 border-neutral-950 bg-neutral-950 md:shadow-[12px_12px_0_#0a0a0a]">
        <img
          src={frontmatter.cover_url}
          alt={frontmatter.title}
          className="aspect-video w-full object-cover sm:aspect-21/9"
        />
      </div>
    </header>
  );
}
