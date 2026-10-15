import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import AssociationHero from "@/components/associations/AssociationHero";
import AssociationsGrid from "@/components/associations/AssociationsGrid";
import { cookies } from "vinext/shims/headers";

export const metadata: Metadata = {
  title: "Asociaciones - ETSII APP",
  description:
    "Explora e inscríbete en las asociaciones estudiantiles de la ETSII Universidad de Sevilla.",
};

export default async function AssociationsPage() {
  const supabase = createClient(cookies());

  const { data: associations, error } = await supabase
    .from("associations")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error al obtener asociaciones:", error.message);
  }

  return (
    <main className="min-h-screen bg-neutral-200 px-4 pt-28 pb-16 font-mono text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <AssociationHero />
        <AssociationsGrid initialAssociations={associations || []} />
      </div>
    </main>
  );
}
