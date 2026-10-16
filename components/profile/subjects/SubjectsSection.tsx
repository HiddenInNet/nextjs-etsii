"use client";

import { useEffect, useState } from "react";
import { Notebook, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Subject } from "@/types/supabase/subjects.interface";
import { getUserSubjects } from "@/services/profile/subjects/getUserSubjects";
import SubjectCard from "./SubjectCard";
import { removeUserSubject } from "@/services/profile/subjects/removeUserSubject";
import { useToast } from "@/components/toast/ToastContext";

export default function SubjectsSection() {
  const { user } = useAuth();
  const { showToast } = useToast();
  //-->

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchSubjects = async () => {
      try {
        const userSubjects: Subject[] = await getUserSubjects(user);

        setSubjects(userSubjects);
        setIsLoading(false);
      } catch (error) {
        console.error("Error obteniendo las asignaturas:", error);
      }
    };

    fetchSubjects();
  }, [user]);

  const handleRemoveSubject = async (subjectId: string) => {
    if (!user) return;

    const success = await removeUserSubject(user, subjectId);

    if (success) {
      setSubjects((prev) => prev.filter((s) => s.id !== subjectId));
      showToast(
        "success",
        "Asignatura eliminada",
        "Se ha quitado de tu perfil correctamente.",
      );
    } else {
      showToast("error", "Error", "No se pudo eliminar la asignatura.");
    }
  };

  return (
    <section className="space-y-6 rounded-2xl border-4 border-neutral-950 bg-white p-6 shadow-[8px_8px_0_#0a0a0a] backdrop-blur-xl sm:p-8">
      <div className="flex flex-col items-start justify-between gap-2 border-b-2 border-neutral-950 pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-neutral-950 bg-yellow-300 px-3 py-0.5 font-mono text-[10px] font-bold text-neutral-950 shadow-[2px_2px_0_#0a0a0a]">
            <span>// ASIGNATURAS</span>
          </div>
          <h2 className="flex items-center gap-2 font-mono text-xl font-black text-neutral-950 uppercase">
            <Notebook className="h-5 w-5 text-neutral-950" />
            Mis Asignaturas
          </h2>
        </div>
        <div id="subjects-action-buttons"></div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="h-30 animate-pulse rounded-xl border-2 border-neutral-700 bg-neutral-200 p-4 shadow-[4px_4px_0_#404040]"
            ></div>
          ))
        ) : subjects.length === 0 ? (
          <div className="col-span-full py-10 text-center font-mono text-sm font-bold tracking-widest text-neutral-600 uppercase">
            No se encontraron asignaturas.
          </div>
        ) : (
          subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} onRemove={handleRemoveSubject} />
          ))
        )}
      </div>
    </section>
  );
}
