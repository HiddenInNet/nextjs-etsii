import { Metadata } from "vinext/shims/metadata";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";

export const metadata: Metadata = {
  title: "ETSII APP - Página principal",
  description:
    "Gestiona tus asignaturas, explora asociaciones estudiantiles y conecta con la comunidad de la Escuela Técnica Superior de Ingeniería Informática.",
};

export default async function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-neutral-950 pt-20 font-mono text-white">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
