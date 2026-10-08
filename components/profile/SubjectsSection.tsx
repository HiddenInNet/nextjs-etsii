"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { Notebook, Loader2 } from "lucide-react";

interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
}

export default function SubjectsSection() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const { data, error } = await supabase
          .from("subjects")
          .select("*")
          .order("name", { ascending: true })
          .limit(10);

        if (error) throw error;
        setSubjects(data || []);
      } catch (error) {
        console.error("Error al cargar las asignaturas:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubjects();
  }, []);

  return (
    <section className="space-y-6 rounded-2xl border-4 border-neutral-900 bg-neutral-900/90 p-6 shadow-[6px_6px_0_#202020] backdrop-blur-xl sm:p-8">
      <div className="flex flex-col items-start justify-between gap-2 border-b-2 border-neutral-800 pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-neutral-950 px-3 py-0.5 font-mono text-[10px] text-yellow-400">
            <span>// ASIGNATURAS</span>
          </div>
          <h2 className="flex items-center gap-2 font-mono text-xl font-black text-white uppercase">
            <Notebook className="h-5 w-5 text-yellow-400" />
            Mis Asignaturas
          </h2>
        </div>
      </div>

      {/* Grid de las asignaturas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-10 text-yellow-400">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2 font-mono text-xs font-bold tracking-wider uppercase">
              Cargando...
            </span>
          </div>
        ) : subjects.length === 0 ? (
          <div className="col-span-full py-10 text-center font-mono text-sm tracking-widest text-neutral-500 uppercase">
            No se encontraron asignaturas.
          </div>
        ) : (
          subjects.map((subject) => (
            <div
              key={subject.id}
              className="group flex cursor-pointer flex-col justify-between rounded-xl border-2 border-neutral-800 bg-neutral-950 p-4 transition-all hover:-translate-y-1 hover:border-yellow-400 hover:shadow-[4px_4px_0_#facc15]"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded bg-neutral-800 px-2 py-0.5 font-mono text-[10px] font-bold text-neutral-300">
                    {subject.code}
                  </span>
                </div>
                <h4 className="font-mono text-sm leading-snug font-bold text-white uppercase transition-colors group-hover:text-yellow-400">
                  {subject.name}
                </h4>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-3">
                <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase">
                  Créditos
                </span>
                <span className="font-sans text-xs font-bold text-white">
                  {subject.credits} ECTS
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
