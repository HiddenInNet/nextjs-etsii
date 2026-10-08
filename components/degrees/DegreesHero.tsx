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
      className="relative overflow-hidden rounded-2xl border-4 border-neutral-900 bg-neutral-900/80 p-8 shadow-[6px_6px_0_#202020] backdrop-blur-xl sm:p-10"
    >
      <div className="pointer-events-none absolute top-0 right-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="max-w-3xl space-y-4">
        <div className="gsap-hero-degree inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold tracking-wider text-emerald-400 uppercase">
          <BookOpen className="h-4 w-4" />
          <span>// PLAN_DE_ESTUDIOS</span>
        </div>

        <h1 className="gsap-hero-degree text-3xl font-black tracking-tight uppercase sm:text-5xl">
          Titulaciones <span className="text-emerald-400">ETSII</span>
        </h1>

        <p className="gsap-hero-degree font-sans text-sm leading-relaxed text-neutral-400 sm:text-base">
          Explora los grados universitarios, consulta el plan de estudios y
          descubre las asignaturas que forman parte de tu formación académica.
        </p>
      </div>
    </div>
  );
}
