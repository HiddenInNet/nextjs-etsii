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
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="relative inline-flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/80 p-2.5 text-yellow-400 md:hidden"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div
        id="mobile-overlay"
        onClick={() => setIsOpen(false)}
        className={`fixed top-20 right-0 bottom-0 z-30 h-[calc(100dvh-5rem)] w-[calc(100vw-18rem)] bg-black/70 backdrop-blur-sm transition-all duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0 translate-x-20"
        }`}
      />

      <aside
        className={`fixed top-20 left-0 z-40 flex h-[calc(100dvh-5rem)] w-72 flex-col justify-between border-r border-neutral-800 bg-neutral-950 p-6 transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="border-b border-neutral-800 pb-4">
            <span className="mb-3 block font-mono text-[11px] text-neutral-500 uppercase">
              // Cuenta de Usuario
            </span>
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-xl border border-yellow-400/40 bg-neutral-900 p-3 text-white"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-yellow-400/30 bg-yellow-400/10 font-mono font-bold text-yellow-400 uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{user.name}</span>
                    <span className="font-mono text-xs text-neutral-400 capitalize">
                      {user.role}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 font-mono text-xs font-bold text-red-400 uppercase transition-all hover:bg-red-500 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-yellow-400/40 bg-yellow-400/10 px-4 py-2.5 font-mono text-xs font-bold text-yellow-400 uppercase transition-all hover:bg-yellow-400 hover:text-neutral-950"
              >
                <LogIn className="h-4 w-4" />
                <span>Iniciar Sesión</span>
              </Link>
            )}
          </div>

          <div className="space-y-3">
            <span className="block font-mono text-[11px] text-neutral-500 uppercase">
              // Navegación
            </span>
            <nav className="flex flex-col gap-2">
              {navlinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold uppercase transition-all ${
                      isActive
                        ? "border-yellow-400/50 bg-yellow-400/10 text-yellow-400"
                        : "border-transparent text-neutral-300 hover:border-neutral-800 hover:bg-neutral-900"
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
