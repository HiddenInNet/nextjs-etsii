import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import DegreesHero from "@/components/degrees/DegreesHero";
import DegreesContainer from "@/components/degrees/DegreesContainer";
import { cookies } from "vinext/shims/headers";

export const metadata: Metadata = {
  title: "Titulaciones - ETSII APP",
  description: "Explora los grados y asignaturas impartidas en la ETSII.",
};

export default async function DegreesPage() {
  const supabase = createClient(cookies());

  const { data: degrees, error } = await supabase
    .from("degrees")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error al obtener titulaciones:", error.message);
  }

  return (
    <main className="min-h-screen bg-neutral-200 px-4 pt-28 pb-16 font-mono text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <DegreesHero />
        <DegreesContainer initialDegrees={degrees || []} />
      </div>
    </main>
  );
}
