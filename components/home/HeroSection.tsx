"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Terminal } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".gsap-hero-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8"
    >
      {/* <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/10 blur-3xl" /> */}

      {/* <div className="gsap-hero-item mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-bold tracking-wider text-yellow-400 uppercase">
        <Terminal className="h-4 w-4" />
        <span>v2.0 // ETSII Portal</span>
      </div> */}

      <h1 className="gsap-hero-item mx-auto max-w-4xl text-4xl font-black tracking-tighter uppercase sm:text-6xl lg:text-7xl">
        ETSII <br />
        <span className="bg-linear-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
          Virtual
        </span>
      </h1>

      <p className="gsap-hero-item mx-auto mt-6 max-w-2xl font-sans text-sm text-neutral-400 sm:text-base">
        Gestiona tus asignaturas, explora asociaciones estudiantiles y conecta
        con la comunidad de la Escuela Técnica Superior de Ingeniería
        Informática.
      </p>

      <div className="gsap-hero-item mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/auth/register"
          className="group inline-flex items-center gap-2 rounded-xl border-4 border-neutral-900 bg-yellow-400 px-6 py-3 font-mono text-sm font-bold tracking-wider text-neutral-950 uppercase shadow-[6px_6px_0_#202020] transition-all hover:bg-yellow-300 active:translate-x-1 active:translate-y-1 active:shadow-[0_0_0_#202020]"
        >
          <span>Comenzar Ahora</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/associations"
          className="inline-flex items-center gap-2 rounded-xl border-4 border-neutral-800 bg-neutral-900 px-6 py-3 font-mono text-sm font-bold tracking-wider text-neutral-300 uppercase transition-all hover:border-neutral-700 hover:text-white"
        >
          Explorar Asociaciones
        </Link>
      </div>
    </section>
  );
}
