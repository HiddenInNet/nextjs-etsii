// components/associations/AssociationHero.tsx
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
      className="relative overflow-hidden rounded-2xl border-4 border-neutral-950 bg-white p-8 shadow-[6px_6px_0_#0a0a0a] backdrop-blur-xl sm:p-10"
    >

      <div className="max-w-3xl space-y-4">
        {/* Badge superior */}
        <div className="gsap-hero-anim inline-flex items-center gap-2 rounded-full border-2 border-neutral-950 bg-yellow-300 px-3 py-1 font-mono text-xs font-bold tracking-wider text-neutral-950 uppercase shadow-[2px_2px_0_#0a0a0a]">
          <span>// ASOCIACIONES</span>
        </div>

        {/* Título Principal */}
        <h1 className="gsap-hero-anim text-3xl font-black tracking-tight text-neutral-950 uppercase sm:text-5xl">
          Asociaciones de la{" "}
          <span className="inline-block rounded-lg border-2 border-neutral-950 bg-yellow-300 px-2 py-0.5 shadow-[2px_2px_0_#0a0a0a]">
            ETSII
          </span>
        </h1>

        {/* Descripción */}
        <p className="gsap-hero-anim font-sans text-sm leading-relaxed text-neutral-700 sm:text-base">
          Forma parte activa de la comunidad universitaria. Participa en
          proyectos, talleres, eventos tecnológicos y conecta con otros
          estudiantes.
        </p>
      </div>
    </div>
  );
}
