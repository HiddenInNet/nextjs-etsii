"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Newspaper } from "lucide-react";

export default function NewsHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useGSAP(
    () => {
      gsap.from(".gsap-masthead", {
        y: -30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });
    },
    { scope: headerRef },
  );

  return (
    <header
      ref={headerRef}
      className="border-b-8 border-neutral-950 pb-6 text-center"
    >
      <div className="gsap-masthead mb-4 flex items-center justify-between border-b-2 border-neutral-950 pb-2 text-xs font-bold tracking-widest uppercase sm:text-sm">
        <span className="hidden sm:inline-block">Noticias ETSII</span>
        <span>{today}</span>
      </div>

      <div className="gsap-masthead flex justify-center py-4">
        <h1 className="font-serif text-5xl font-black tracking-tighter text-neutral-950 uppercase sm:text-7xl md:text-8xl lg:text-9xl">
          ETSII <span className="text-pantone-124 italic">News</span>
        </h1>
      </div>

      <div className="gsap-masthead mt-2 flex items-center justify-center gap-2 border-t-2 border-neutral-950 pt-3 text-sm font-bold uppercase">
        <Newspaper className="h-5 w-5" />
        <span>Toda la actualidad en 0 y 1</span>
        <Newspaper className="h-5 w-5" />
      </div>
    </header>
  );
}
