// components/associations/AssociationCard.tsx
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ExternalLink, UserPlus, CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/toast/ToastContext";
import { supabase } from "@/utils/supabase/client";
import { Association } from "./AssociationsGrid";

interface AssociationCardProps {
  association: Association;
  isJoined: boolean;
  isLoadingMembership: boolean;
  onMembershipChange: (associationId: string, isJoined: boolean) => void;
}

export default function AssociationCard({
  association,
  isJoined,
  isLoadingMembership,
  onMembershipChange,
}: AssociationCardProps) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animaciones de hover en la tarjeta ajustadas al tema claro
  const handleMouseEnter = () => {
    if (cardRef.current) {
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
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: "6px 6px 0 #0a0a0a",
        borderColor: "#0a0a0a",
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  // Animación de pulso al hacer clic en el botón de inscripción
  const handleButtonClick = async () => {
    if (buttonRef.current) {
      gsap
        .timeline()
        .to(buttonRef.current, { scale: 0.95, duration: 0.08 })
        .to(buttonRef.current, {
          scale: 1,
          duration: 0.12,
          ease: "back.out(2)",
        });
    }

    if (!user) {
      showToast(
        "error",
        "Acceso Requerido",
        "Debes iniciar sesión para inscribirte.",
      );
      router.push("/auth/login");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isJoined) {
        const { error } = await supabase
          .from("association_memberships")
          .delete()
          .eq("user_id", user.id)
          .eq("association_id", association.id);

        if (error) throw error;

        onMembershipChange(association.id, false);
        showToast(
          "success",
          "Inscripción cancelada",
          `Has salido de ${association.name}`,
        );
      } else {
        const { error } = await supabase
          .from("association_memberships")
          .insert({
            user_id: user.id,
            association_id: association.id,
            position: "member",
            joined_at: new Date().toISOString(),
          });

        if (error) throw error;

        onMembershipChange(association.id, true);
        showToast(
          "success",
          "¡Inscripción Exitosa!",
          `Te has unido a ${association.name}`,
        );
      }
    } catch (err: any) {
      showToast(
        "error",
        "Error de Operación",
        err.message || "No se pudo procesar la solicitud de inscripción.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex h-full flex-col justify-between rounded-2xl border-4 border-neutral-950 bg-white p-6 shadow-[6px_6px_0_#0a0a0a] transition-colors"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-block rounded-md border-2 border-neutral-950 bg-yellow-300 px-2.5 py-0.5 font-mono text-[10px] font-bold text-neutral-950 uppercase shadow-[2px_2px_0_#0a0a0a]">
              #{association.slug}
            </span>
            <h3 className="font-mono text-xl font-black tracking-wide text-neutral-950 uppercase">
              {association.name}
            </h3>
          </div>

          {association.website_url && (
            <a
              href={association.website_url}
              target="_blank"
              rel="noopener noreferrer"
              title="Visitar sitio web"
              className="rounded-lg border-2 border-neutral-950 bg-neutral-100 p-2 text-neutral-950 shadow-[2px_2px_0_#0a0a0a] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-yellow-300 hover:shadow-none"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <p className="line-clamp-3 font-sans text-xs leading-relaxed text-neutral-700">
          {association.description ||
            "Sin descripción disponible por el momento."}
        </p>
      </div>

      <div className="mt-6 border-t-2 border-neutral-950 pt-4">
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          disabled={isLoadingMembership || isSubmitting}
          className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-neutral-950 px-4 py-2.5 font-mono text-xs font-bold tracking-wider uppercase shadow-[3px_3px_0_#0a0a0a] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:opacity-50 ${
            isJoined
              ? "bg-emerald-100 text-emerald-900 hover:bg-red-100 hover:text-red-900"
              : "bg-yellow-300 text-neutral-950 hover:bg-yellow-400"
          }`}
        >
          {isSubmitting || isLoadingMembership ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Procesando...</span>
            </>
          ) : isJoined ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              <span>Miembro (Cancelar)</span>
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              <span>Inscribirme</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
