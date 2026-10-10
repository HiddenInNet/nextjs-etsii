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
    <div className="min-h-screen overflow-hidden bg-neutral-200 pt-20 font-mono text-white">
      <div className="pointer-events-none inset-0 fixed z-0 h-full text-neutral-400/40">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
              />
            </pattern>
            <radialGradient id="fade" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stop-color="white" stop-opacity="1" />
              <stop offset="100%" stop-color="white" stop-opacity="0" />
            </radialGradient>
            <mask id="grid-mask">
              <rect width="100%" height="100%" fill="url(#fade)" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid)"
            mask="url(#grid-mask)"
          />
        </svg>
      </div>
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
