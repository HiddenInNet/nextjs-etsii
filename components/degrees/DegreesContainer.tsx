// components/degrees/DegreesContainer.tsx
"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { supabase } from "@/utils/supabase/client";
import DegreeCard from "./DegreeCard";
import SubjectsList from "./SubjectsList";

export interface Degree {
  id: string;
  name: string;
  slug: string;
  description: string;
  total_credits?: number;
}

export interface DegreeSubject {
  year: number;
  term: number;
  type: string;
  subject: {
    id: string;
    code: string;
    name: string;
    credits: number;
  };
}

interface DegreesContainerProps {
  initialDegrees: Degree[];
}

export default function DegreesContainer({
  initialDegrees,
}: DegreesContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const subjectsSectionRef = useRef<HTMLDivElement>(null);

  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);
  const [degreeSubjects, setDegreeSubjects] = useState<DegreeSubject[]>([]);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);

  useGSAP(
    () => {
      if (initialDegrees.length > 0) {
        gsap.from(".gsap-degree-card", {
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
        });
      }
    },
    { scope: containerRef },
  );

  const handleSelectDegree = async (degree: Degree) => {
    if (selectedDegree?.id === degree.id) {
      setSelectedDegree(null);
      setDegreeSubjects([]);
      return;
    }

    setSelectedDegree(degree);
    setIsLoadingSubjects(true);

    try {
      const { data, error } = await supabase
        .from("degree_subjects")
        .select(
          `
          year,
          term,
          type,
          subject:subjects (
            id,
            code,
            name,
            credits
          )
        `,
        )
        .eq("degree_id", degree.id)
        .order("year", { ascending: true })
        .order("term", { ascending: true });

      if (error) throw error;

      setDegreeSubjects((data as any) || []);

      setTimeout(() => {
        subjectsSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      console.error("Error al cargar asignaturas:", error);
    } finally {
      setIsLoadingSubjects(false);
    }
  };

  if (initialDegrees.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-neutral-950 bg-white p-12 text-center shadow-[4px_4px_0_#0a0a0a]">
        <p className="font-mono text-sm font-bold text-neutral-700 uppercase">
          No hay titulaciones registradas actualmente en el sistema.
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-12">
      {/* Grid de Grados */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {initialDegrees.map((degree) => (
          <div key={degree.id} className="gsap-degree-card">
            <DegreeCard
              degree={degree}
              isSelected={selectedDegree?.id === degree.id}
              onClick={() => handleSelectDegree(degree)}
            />
          </div>
        ))}
      </div>

      {/* Sección dinámica de Asignaturas de la titulación seleccionada */}
      <div ref={subjectsSectionRef}>
        {selectedDegree && (
          <SubjectsList
            degree={selectedDegree}
            degreeSubjects={degreeSubjects}
            isLoading={isLoadingSubjects}
          />
        )}
      </div>
    </div>
  );
}
