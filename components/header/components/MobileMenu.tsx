// components/header/MobileMenu.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { navlinks } from "@/data/navlinks.json";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    router.push("/");
  };

  const isLoggedIn = !!user;

  return (
    <>
      {/* Botón de apertura/cierre del menú móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="relative inline-flex items-center justify-center rounded-xl border-2 border-neutral-950 bg-neutral-100 p-2.5 text-neutral-950 shadow-[2px_2px_0_#0a0a0a] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none md:hidden"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay oscuro de fondo */}
      <div
        id="mobile-overlay"
        onClick={() => setIsOpen(false)}
        className={`fixed top-20 right-0 bottom-0 z-30 h-[calc(100dvh-5rem)] w-[calc(100vw-18rem)] bg-neutral-950/40 backdrop-blur-sm transition-all duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none translate-x-20 opacity-0"
        }`}
      />

      {/* Drawer lateral neobrutalista */}
      <aside
        className={`fixed top-20 left-0 z-40 flex h-[calc(100dvh-5rem)] w-72 flex-col justify-between border-r-4 border-neutral-950 bg-neutral-100 p-6 transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Sección de Usuario */}
          <div className="border-b-2 border-neutral-950 pb-4">
            <span className="mb-3 block font-mono text-[11px] font-bold text-neutral-500 uppercase">
              // Cuenta de Usuario
            </span>
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-xl border-2 border-neutral-950 bg-white p-3 text-neutral-950 shadow-[2px_2px_0_#0a0a0a] transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-neutral-950 bg-yellow-300 font-mono font-bold text-neutral-950 uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="truncate text-sm font-bold uppercase">
                      {user.name}
                    </span>
                    <span className="font-mono text-xs text-neutral-600 capitalize">
                      {user.role}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-neutral-950 bg-red-100 px-4 py-2 font-mono text-xs font-bold text-red-700 uppercase shadow-[2px_2px_0_#0a0a0a] transition-all hover:bg-red-500 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-neutral-950 bg-yellow-300 px-4 py-2.5 font-mono text-xs font-bold text-neutral-950 uppercase shadow-[2px_2px_0_#0a0a0a] transition-all hover:bg-yellow-400"
              >
                <LogIn className="h-4 w-4" />
                <span>Iniciar Sesión</span>
              </Link>
            )}
          </div>

          {/* Sección de Navegación */}
          <div className="space-y-3">
            <span className="block font-mono text-[11px] font-bold text-neutral-500 uppercase">
              // Navegación
            </span>
            <nav className="flex flex-col gap-2">
              {navlinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 font-mono text-xs font-bold uppercase transition-all ${
                      isActive
                        ? "border-neutral-950 bg-yellow-300 text-neutral-950 shadow-[2px_2px_0_#0a0a0a]"
                        : "border-transparent text-neutral-700 hover:border-neutral-950 hover:bg-white"
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
