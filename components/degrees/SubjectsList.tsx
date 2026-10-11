// components/degrees/SubjectsList.tsx
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

const formatTerm = (term: number) => {
  if (term === 1) return "1º Cuat.";
  if (term === 2) return "2º Cuat.";
  return "Anual";
};

const getTypeStyles = (type: string) => {
  const t = type.toUpperCase();
  if (t === "BASIC" || t === "BÁSICA")
    return "bg-blue-100 text-blue-900 border-blue-400";
  if (t === "OBLIGATORY" || t === "OBLIGATORIA")
    return "bg-red-100 text-red-900 border-red-400";
  return "bg-yellow-100 text-yellow-900 border-yellow-400"; // OPTATIVE
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
      className="rounded-2xl border-4 border-neutral-950 bg-white p-6 shadow-[8px_8px_0_#0a0a0a] sm:p-8"
    >
      <div className="mb-6 border-b-2 border-neutral-950 pb-4">
        <h2 className="font-mono text-2xl font-black text-neutral-950 uppercase">
          Plan de Estudios:{" "}
          <span className="inline-block rounded-lg border-2 border-neutral-950 bg-emerald-300 px-2 py-0.5 shadow-[2px_2px_0_#0a0a0a]">
            {degree.slug || degree.name}
          </span>
        </h2>
        <p className="mt-2 font-sans text-sm text-neutral-700">
          {degree.description}
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-emerald-700">
          <Loader2 className="mb-4 h-8 w-8 animate-spin" />
          <p className="font-mono text-sm font-bold tracking-wider uppercase">
            Cargando asignaturas...
          </p>
        </div>
      ) : degreeSubjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-neutral-500">
          <FolderOpen className="mb-4 h-10 w-10 opacity-50" />
          <p className="font-mono text-sm font-bold uppercase">
            No hay asignaturas registradas
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {degreeSubjects.map((item) => (
            <div
              key={`${item.subject.id}-${item.year}-${item.term}`}
              className="gsap-subject-item flex flex-col justify-between rounded-xl border-2 border-neutral-950 bg-neutral-50 p-4 shadow-[4px_4px_0_#0a0a0a] transition-colors hover:-translate-y-1 hover:bg-white"
            >
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded border border-neutral-950 bg-neutral-200 px-2 py-0.5 font-mono text-[10px] font-bold text-neutral-900">
                    {item.subject.code}
                  </span>
                  {item.type !== "OPTATIVE" && (
                    <span className="rounded border border-emerald-400 bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-900 uppercase">
                      Curso {item.year} - {formatTerm(item.term)}
                    </span>
                  )}
                </div>
                <h4 className="font-mono text-sm leading-snug font-bold text-neutral-950 uppercase">
                  {item.subject.name}
                </h4>
              </div>

              <div className="mt-4 flex items-center justify-between border-t-2 border-neutral-200 pt-3">
                <span
                  className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${getTypeStyles(
                    item.type,
                  )}`}
                >
                  {item.type}
                </span>
                <span className="font-sans text-xs font-bold text-neutral-950">
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
