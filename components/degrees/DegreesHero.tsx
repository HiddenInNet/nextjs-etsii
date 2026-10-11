// components/degrees/DegreesHero.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BookOpen } from "lucide-react";

export default function DegreesHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".gsap-hero-degree", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
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
        <div className="gsap-hero-degree inline-flex items-center gap-2 rounded-full border-2 border-neutral-950 bg-emerald-200 px-3 py-1 font-mono text-xs font-bold tracking-wider text-emerald-950 uppercase shadow-[2px_2px_0_#0a0a0a]">
          <span>// TITULACIONES</span>
        </div>

        {/* Título Principal */}
        <h1 className="gsap-hero-degree text-3xl font-black tracking-tight text-neutral-950 uppercase sm:text-5xl">
          Titulaciones{" "}
          <span className="inline-block rounded-lg border-2 border-neutral-950 bg-emerald-300 px-2 py-0.5 shadow-[2px_2px_0_#0a0a0a]">
            ETSII
          </span>
        </h1>

        {/* Descripción */}
        <p className="gsap-hero-degree font-sans text-sm leading-relaxed text-neutral-700 sm:text-base">
          Explora los grados universitarios, consulta el plan de estudios y
          descubre las asignaturas que forman parte de tu formación académica.
        </p>
      </div>
    </div>
  );
}
