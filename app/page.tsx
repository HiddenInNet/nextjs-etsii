import { Metadata } from "vinext/shims/metadata";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BackgroundSVG from "@/components/utils/BackgroundSVG";

export const metadata: Metadata = {
  title: "ETSII APP - Escuela Técnica Superior de Ingeniería Informática",
  description:
    "Gestiona tus asignaturas, explora asociaciones estudiantiles y conecta con la comunidad de la Escuela Técnica Superior de Ingeniería Informática.",
  keywords: ["ETSII", "etsii", "universidad", "sevilla", "informática"],
  openGraph: {
    url: "https://etsii.es",
    type: "website",
    title: "ETSII APP - Escuela Técnica Superior de Ingeniería Informática",
    description:
      "Gestiona tus asignaturas, explora asociaciones estudiantiles y conecta con la comunidad de la Escuela Técnica Superior de Ingeniería Informática.",
    images: [
      {
        url: "https://www.informatica.us.es/docs/imagen-etsii/logo-ETSII-Color.png",
        width: 1200,
        height: 630,
        alt: "etsii",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ETSII APP - Escuela Técnica Superior de Ingeniería Informática",
    description:
      "Gestiona tus asignaturas, explora asociaciones estudiantiles y conecta con la comunidad de la Escuela Técnica Superior de Ingeniería Informática.",
    creator: "@etsii",
    site: "@etsii",
    images: [
      {
        url: "https://www.informatica.us.es/docs/imagen-etsii/logo-ETSII-Color.png",
        width: 1200,
        height: 630,
        alt: "etsii",
      },
    ],
  },
  alternates: {
    canonical: "https://etsii.es",
  },
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
