"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/utils/supabase/client";
import AssociationCard from "./AssociationCard";

export interface Association {
  id: string;
  slug: string;
  name: string;
  tag: string;
  description: string;
  website_url: string;
  logo_url?: string;
}

interface AssociationsGridProps {
  initialAssociations: Association[];
}

export default function AssociationsGrid({
  initialAssociations,
}: AssociationsGridProps) {
  const { user } = useAuth();
  const [joinedIds, setJoinedIds] = useState<Set<string>>(new Set());
  const [isLoadingMemberships, setIsLoadingMemberships] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchUserMemberships() {
      if (!user) {
        setJoinedIds(new Set());
        setIsLoadingMemberships(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("association_memberships")
          .select("association_id")
          .eq("user_id", user.id);

        if (!error && data) {
          const ids = new Set(data.map((m) => m.association_id));
          setJoinedIds(ids);
        }
      } catch (err) {
        console.error("Error al cargar inscripciones:", err);
      } finally {
        setIsLoadingMemberships(false);
      }
    }

    fetchUserMemberships();
  }, [user]);

  // Animación de entrada para el conjunto de tarjetas
  useGSAP(
    () => {
      if (initialAssociations.length > 0) {
        gsap.from(".gsap-assoc-card", {
          y: 40,
          opacity: 0,
          scale: 0.96,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
        });
      }
    },
    { scope: gridRef, dependencies: [initialAssociations] },
  );

  const handleMembershipChange = (associationId: string, isJoined: boolean) => {
    setJoinedIds((prev) => {
      const updated = new Set(prev);
      if (isJoined) {
        updated.add(associationId);
      } else {
        updated.delete(associationId);
      }
      return updated;
    });
  };

  if (initialAssociations.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-neutral-800 p-12 text-center">
        <p className="font-mono text-sm text-neutral-400">
          No hay asociaciones registradas actualmente en el sistema.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {initialAssociations.map((assoc) => (
        <div key={assoc.id} className="gsap-assoc-card">
          <AssociationCard
            association={assoc}
            isJoined={joinedIds.has(assoc.id)}
            isLoadingMembership={isLoadingMemberships}
            onMembershipChange={handleMembershipChange}
          />
        </div>
      ))}
    </div>
  );
}
