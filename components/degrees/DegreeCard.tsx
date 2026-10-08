"use client";

import { useRef } from "react";
import gsap from "gsap";
import { GraduationCap, ArrowRight } from "lucide-react";
import { Degree } from "./DegreesContainer";

interface DegreeCardProps {
  degree: Degree;
  isSelected: boolean;
  onClick: () => void;
}

export default function DegreeCard({
  degree,
  isSelected,
  onClick,
}: DegreeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current && !isSelected) {
      gsap.to(cardRef.current, {
        y: -4,
        boxShadow: "10px 10px 0 #202020",
        borderColor: "rgba(16, 185, 129, 0.4)", // emerald-500
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && !isSelected) {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: "6px 6px 0 #202020",
        borderColor: "rgba(23, 23, 23, 1)", // neutral-900
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group flex h-full cursor-pointer flex-col justify-between rounded-2xl border-4 p-6 transition-colors ${
        isSelected
          ? "border-emerald-500 bg-emerald-500 text-neutral-950 shadow-[6px_6px_0_#10b981] hover:bg-emerald-400"
          : "border-neutral-900 bg-neutral-900/70 shadow-[6px_6px_0_#202020]"
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div
            className={`inline-flex items-center justify-center rounded-xl border-2 p-2.5 ${
              isSelected
                ? "border-neutral-950 bg-neutral-950/10 text-neutral-950"
                : "border-emerald-500 bg-emerald-500/10 text-emerald-400"
            }`}
          >
            <GraduationCap className="h-6 w-6" />
          </div>
          <span
            className={`font-mono text-xs font-bold uppercase ${isSelected ? "text-neutral-800" : "text-neutral-500"}`}
          >
            {degree.total_credits ? `${degree.total_credits} ECTS` : "Grado"}
          </span>
        </div>

        <h3
          className={`font-mono text-xl font-black tracking-wide uppercase ${isSelected ? "text-neutral-950" : "text-white"}`}
        >
          {degree.name}
        </h3>

        <p
          className={`line-clamp-3 font-sans text-xs leading-relaxed ${isSelected ? "text-neutral-800" : "text-neutral-400"}`}
        >
          {degree.description ||
            "Información del plan de estudios no disponible."}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-current pt-4 opacity-80">
        <span className="font-mono text-xs font-bold uppercase">
          {isSelected ? "Cerrar Asignaturas" : "Ver Asignaturas"}
        </span>
        <ArrowRight
          className={`h-4 w-4 transition-transform ${isSelected ? "rotate-90" : "group-hover:translate-x-1"}`}
        />
      </div>
    </div>
  );
}
