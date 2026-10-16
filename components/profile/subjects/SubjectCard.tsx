// components/profile/SubjectCard.tsx
"use client";

import { useState } from "react";
import { Subject } from "@/types/supabase/subjects.interface";
import { Trash2, Loader2 } from "lucide-react";

interface SubjectCardProps {
  subject: Subject;
  onRemove?: (subjectId: string) => Promise<void> | void;
}

export default function SubjectCard({ subject, onRemove }: SubjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onRemove) return;
    try {
      setIsDeleting(true);
      await onRemove(subject.id);
    } catch (error) {
      console.error("Error al eliminar la asignatura:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group flex flex-col justify-between rounded-xl border-2 border-neutral-950 bg-neutral-50 p-4 shadow-[4px_4px_0_#0a0a0a] transition-all hover:-translate-y-1 hover:bg-white">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded border border-neutral-950 bg-neutral-200 px-2 py-0.5 font-mono text-[10px] font-bold text-neutral-900">
              {subject.code}
            </span>
          </div>
          <h4 className="font-mono text-sm leading-snug font-bold text-neutral-950 uppercase">
            {subject.name}
          </h4>
        </div>

        <div id={`remove-${subject.code}`}>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Eliminar de mis asignaturas"
            className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-neutral-950 bg-red-100 p-2 text-red-700 shadow-[2px_2px_0_#0a0a0a] transition-all hover:bg-red-500 hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t-2 border-neutral-200 pt-3">
        <span className="font-mono text-[10px] font-bold text-neutral-600 uppercase">
          Créditos
        </span>
        <span className="font-sans text-xs font-bold text-neutral-950">
          {subject.credits} ECTS
        </span>
      </div>
    </div>
  );
}
