// components/header/Header.tsx
import Link from "next/link";
import LogoImage from "@/assets/images/logo-image.avif";
import Navigation from "@/components/header/components/Navigation";
import AuthButtons from "@/components/header/components/AuthButtons";
import MobileMenu from "@/components/header/components/MobileMenu";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-neutral-800 bg-neutral-100/70 font-sans text-black backdrop-blur-sm transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all hover:opacity-95"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border-4 border-neutral-800 shadow-inner group-hover:border-pantone-542">
            <Image
              src={LogoImage}
              alt="Logo de la ETSII"
              placeholder="blur"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col border-l border-neutral-800 pl-3">
            <span className="text-pantone-553 font-mono text-base font-extrabold tracking-wider">
              ETSII APP
            </span>
            <span className="hidden text-[11px] font-medium tracking-tight text-neutral-700 sm:inline">
              Universidad de Sevilla
            </span>
          </div>
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
        <Navigation />

        {/* ACCIONES Y MENÚ MÓVIL */}
        <div className="flex items-center gap-3">
          <AuthButtons />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
