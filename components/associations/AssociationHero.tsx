"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Terminal } from "lucide-react";

export default function AssociationHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".gsap-hero-anim", {
        y: 35,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
      });
    },
    { scope: heroRef },
  );

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden rounded-2xl border-4 border-neutral-900 bg-neutral-900/80 p-8 shadow-[6px_6px_0_#202020] backdrop-blur-xl sm:p-10"
    >
      <div className="pointer-events-none absolute top-0 right-0 h-48 w-48 rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="max-w-3xl space-y-4">
        <div className="gsap-hero-anim inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-bold tracking-wider text-yellow-400 uppercase">
          <Terminal className="h-4 w-4" />
          <span>// COMUNIDAD_ESTUDIANTIL</span>
        </div>

        <h1 className="gsap-hero-anim text-3xl font-black tracking-tight uppercase sm:text-5xl">
          Asociaciones de la <span className="text-yellow-400">ETSII</span>
        </h1>

        <p className="gsap-hero-anim font-sans text-sm leading-relaxed text-neutral-400 sm:text-base">
          Forma parte activa de la comunidad universitaria. Participa en
          proyectos, talleres, eventos tecnológicos y conecta con otros
          estudiantes.
        </p>
      </div>
    </div>
  );
}
