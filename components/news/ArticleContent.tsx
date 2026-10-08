"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ArticleContentProps {
  children: React.ReactNode;
}

export default function ArticleContent({ children }: ArticleContentProps) {
  const contentRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Al pasar un componente MDX directamente, 'children' generará múltiples nodos en el DOM.
      // Seleccionamos los elementos de primer nivel (p, h1, ul, blockquote) dentro del article.
      const elements = gsap.utils.toArray(contentRef.current?.children || []);

      elements.forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    },
    { scope: contentRef },
  );

  return (
    <article
      ref={contentRef}
      className="prose prose-lg sm:prose-xl prose-neutral prose-p:font-serif prose-p:text-neutral-800 prose-p:leading-relaxed prose-headings:font-serif prose-headings:font-black prose-headings:text-neutral-950 prose-a:border-b-2 prose-a:border-purple-600 prose-a:font-bold prose-a:text-neutral-950 prose-a:no-underline hover:prose-a:bg-purple-600 hover:prose-a:text-white prose-blockquote:border-l-8 prose-blockquote:border-neutral-950 prose-blockquote:bg-white prose-blockquote:p-6 prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:font-medium prose-blockquote:italic prose-li:font-serif prose-li:text-neutral-800 prose-code:rounded prose-code:border prose-code:border-neutral-950 prose-code:bg-neutral-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:font-bold prose-code:text-purple-700 prose-hr:border-t-4 prose-hr:border-neutral-950 prose-hr:my-12 mx-auto max-w-3xl marker:font-bold marker:text-purple-600"
    >
      {children}
    </article>
  );
}
