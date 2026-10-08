"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BookOpen, Users, Shield } from "lucide-react";

// Registrar el plugin es obligatorio antes de usarlo
gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Gestión de Grados",
    desc: "Matricúlate en asignaturas de tu plan de estudios y lleva un control de tus créditos.",
    icon: BookOpen,
  },
  {
    title: "Asociaciones",
    desc: "Descubre grupos, únete y adquiere roles dentro de las distintas asociaciones de la escuela.",
    icon: Users,
  },
  {
    title: "Seguridad RLS",
    desc: "Tus datos protegidos mediante políticas a nivel de fila en Supabase.",
    icon: Shield,
  },
];

export default function FeaturesSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".gsap-feature-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // La animación empieza cuando el top del contenedor alcanza el 80% del viewport
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.5)",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="gsap-feature-card flex flex-col justify-between overflow-hidden rounded-2xl border-4 border-neutral-900 bg-neutral-900/60 p-6 shadow-[6px_6px_0_#202020] transition-colors hover:border-yellow-400/50"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-yellow-400 bg-yellow-400/10 text-yellow-400">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-mono text-xl font-bold tracking-wide text-white uppercase">
                {item.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-neutral-400">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
