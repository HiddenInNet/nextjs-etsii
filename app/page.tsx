import { Metadata } from "vinext/shims/metadata";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BackgroundSVG from "@/components/utils/BackgroundSVG";

export const metadata: Metadata = {
  title: "ETSII APP - Escuela Técnica Superior de Ingeniería Informática",
  description:
    "Gestiona tus asignaturas, explora asociaciones estudiantiles y conecta con la comunidad de la Escuela Técnica Superior de Ingeniería Informática.",
};

export default async function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-neutral-200 pt-20 font-mono text-white">
      <BackgroundSVG />

      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
