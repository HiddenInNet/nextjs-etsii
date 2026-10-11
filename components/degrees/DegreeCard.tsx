// components/degrees/DegreeCard.tsx
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
        boxShadow: "10px 10px 0 #0a0a0a",
        borderColor: "#0a0a0a",
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && !isSelected) {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: "6px 6px 0 #0a0a0a",
        borderColor: "#0a0a0a",
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
      className={`group flex h-full cursor-pointer flex-col justify-between rounded-2xl border-4 p-6 transition-all ${
        isSelected
          ? "border-neutral-950 bg-emerald-300 text-neutral-950 shadow-[6px_6px_0_#0a0a0a]"
          : "border-neutral-950 bg-white text-neutral-950 shadow-[6px_6px_0_#0a0a0a]"
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div
            className={`inline-flex items-center justify-center rounded-xl border-2 border-neutral-950 p-2.5 shadow-[2px_2px_0_#0a0a0a] ${
              isSelected
                ? "bg-white text-neutral-950"
                : "bg-emerald-200 text-emerald-900"
            }`}
          >
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="rounded-md border-2 border-neutral-950 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-bold text-neutral-800 uppercase shadow-[2px_2px_0_#0a0a0a]">
            {degree.total_credits ? `${degree.total_credits} ECTS` : "Grado"}
          </span>
        </div>

        <h3 className="font-mono text-xl font-black tracking-wide text-neutral-950 uppercase">
          {degree.name}
        </h3>

        <p className="line-clamp-3 font-sans text-xs leading-relaxed text-neutral-700">
          {degree.description ||
            "Información del plan de estudios no disponible."}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t-2 border-neutral-950 pt-4">
        <span className="font-mono text-xs font-bold text-neutral-900 uppercase">
          {isSelected ? "Cerrar Asignaturas" : "Ver Asignaturas"}
        </span>
        <ArrowRight
          className={`h-4 w-4 transition-transform ${isSelected ? "rotate-90" : "group-hover:translate-x-1"}`}
        />
      </div>
    </div>
  );
}
