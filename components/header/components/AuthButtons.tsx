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
        <div className="h-9 w-28 animate-pulse rounded-xl border border-neutral-800 bg-neutral-900" />
      ) : user ? (
        <div className="flex items-center gap-2">
          <Link
            href="/profile"
            className="group flex items-center gap-2.5 rounded-xl border border-neutral-800 bg-neutral-900/90 px-3 py-1.5 transition-all hover:border-yellow-400/60 hover:bg-neutral-800/80"
          >
            <div className="relative flex h-7 w-7 items-center justify-center rounded-lg border border-yellow-400/40 bg-yellow-400/10 font-mono text-xs font-bold text-yellow-400 uppercase">
              {user.name.charAt(0)}
              <span className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-neutral-950" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-neutral-200 transition-colors group-hover:text-yellow-400">
                {user.name}
              </span>
              <span className="font-mono text-[10px] text-neutral-400 capitalize">
                {user.role}
              </span>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            title="Cerrar Sesión"
            className="cursor-pointer rounded-xl border border-neutral-800 bg-neutral-900/90 p-2 text-neutral-400 transition-colors hover:border-red-500/40 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 rounded-xl border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 font-mono text-xs font-bold tracking-wider text-yellow-400 uppercase transition-all hover:bg-yellow-400 hover:text-neutral-950"
        >
          <LogIn className="h-4 w-4" />
          <span>Acceso</span>
        </Link>
      )}
    </div>
  );
}
