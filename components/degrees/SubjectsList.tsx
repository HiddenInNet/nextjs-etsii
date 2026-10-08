"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Loader2, FolderOpen } from "lucide-react";
import { Degree, DegreeSubject } from "./DegreesContainer";

interface SubjectsListProps {
  degree: Degree;
  degreeSubjects: DegreeSubject[];
  isLoading: boolean;
}

// Función auxiliar para formatear el cuatrimestre
const formatTerm = (term: number) => {
  if (term === 1) return "1º Cuat.";
  if (term === 2) return "2º Cuat.";
  return "Anual";
};

// Función auxiliar para dar color según el tipo de asignatura
const getTypeStyles = (type: string) => {
  const t = type.toUpperCase();
  if (t === "BASIC" || t === "BÁSICA")
    return "bg-blue-500/10 text-blue-400 border-blue-500/30";
  if (t === "OBLIGATORY" || t === "OBLIGATORIA")
    return "bg-red-500/10 text-red-400 border-red-500/30";
  return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"; // OPTATIVE
};

export default function SubjectsList({
  degree,
  degreeSubjects,
  isLoading,
}: SubjectsListProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isLoading && degreeSubjects.length > 0) {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        );

        gsap.from(".gsap-subject-item", {
          opacity: 0,
          x: -20,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.1,
        });
      }
    },
    { scope: sectionRef, dependencies: [degreeSubjects, isLoading] },
  );

  return (
    <div
      ref={sectionRef}
      className="rounded-2xl border-4 border-neutral-900 bg-neutral-950 p-6 sm:p-8"
    >
      <div className="mb-6 border-b-2 border-neutral-900 pb-4">
        <h2 className="font-mono text-2xl font-black text-white uppercase">
          Plan de Estudios:{" "}
          <span className="text-emerald-400">{degree.slug || degree.name}</span>
        </h2>
        <p className="mt-1 font-sans text-sm text-neutral-300">
          {degree.description}
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-emerald-400">
          <Loader2 className="mb-4 h-8 w-8 animate-spin" />
          <p className="font-mono text-sm tracking-wider uppercase">
            Cargando asignaturas...
          </p>
        </div>
      ) : degreeSubjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-neutral-500">
          <FolderOpen className="mb-4 h-10 w-10 opacity-50" />
          <p className="font-mono text-sm uppercase">
            No hay asignaturas registradas
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {degreeSubjects.map((item) => (
            <div
              key={`${item.subject.id}-${item.year}-${item.term}`}
              className="gsap-subject-item flex flex-col justify-between rounded-xl border-2 border-neutral-800 bg-neutral-900/50 p-4 transition-colors hover:border-emerald-500/50"
            >
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-neutral-800 px-2 py-0.5 font-mono text-[10px] font-bold text-neutral-300">
                    {item.subject.code}
                  </span>
                  {item.type !== "OPTATIVE" ? (
                    <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase">
                      Curso {item.year} • {formatTerm(item.term)}
                    </span>
                  ) : (
                    <span></span>
                  )}
                </div>
                <h4 className="font-mono text-sm leading-snug font-bold text-white uppercase">
                  {item.subject.name}
                </h4>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-3">
                <span
                  className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${getTypeStyles(item.type)}`}
                >
                  {item.type}
                </span>
                <span className="font-sans text-xs font-bold text-white">
                  {item.subject.credits} ECTS
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
