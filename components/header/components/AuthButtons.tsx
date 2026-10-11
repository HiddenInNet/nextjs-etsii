// components/header/AuthButtons.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthButtons() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="hidden items-center gap-2 sm:flex">
      {isLoading ? (
        <div className="h-9 w-28 animate-pulse rounded-xl border-2 border-neutral-950 bg-neutral-200" />
      ) : user ? (
        <div className="flex items-center gap-2">
          {/* Tarjeta de Perfil del Usuario */}
          <Link
            href="/profile"
            className="group flex items-center gap-2.5 rounded-xl border-2 border-neutral-950 bg-white px-3 py-1.5 shadow-[2px_2px_0_#0a0a0a] transition-all"
          >
            <div className="relative flex h-7 w-7 items-center justify-center rounded-lg border-2 border-neutral-950 bg-yellow-300 font-mono text-xs font-bold text-neutral-950 uppercase">
              {user.name.charAt(0)}
              <span className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold uppercase text-neutral-950 transition-colors group-hover:text-neutral-700">
                {user.name}
              </span>
              <span className="font-mono text-[10px] text-neutral-600 capitalize">
                {user.role}
              </span>
            </div>
          </Link>

          {/* Botón de Cerrar Sesión */}
          <button
            onClick={handleLogout}
            title="Cerrar Sesión"
            className="cursor-pointer rounded-xl border-2 border-neutral-950 bg-red-100 p-2 text-red-700 shadow-[2px_2px_0_#0a0a0a] transition-all hover:bg-red-500 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-neutral-950 bg-yellow-300 px-4 py-2 font-mono text-xs font-bold tracking-wider text-neutral-950 uppercase shadow-[2px_2px_0_#0a0a0a] transition-all hover:bg-yellow-400"
        >
          <LogIn className="h-4 w-4" />
          <span>Acceso</span>
        </Link>
      )}
    </div>
  );
}