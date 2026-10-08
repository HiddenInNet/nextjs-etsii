"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/components/toast/ToastContext";
import { supabase } from "@/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Validación básica de campos vacíos
    if (!email.trim() || !password.trim()) {
      showToast(
        "error",
        "Error de Validación",
        "Por favor completa todos los campos requeridos.",
      );
      setIsLoading(false);
      return;
    }

    if (!email.toLowerCase().endsWith("@gmail.com")) {
      showToast(
        "error",
        "Formato Inválido",
        "Introduce una dirección de correo electrónico válida. (@alum.us.es)",
      );
      setIsLoading(false);
      return;
    }

    try {
      // 2. Iniciar sesión en Supabase con correo y contraseña
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Manejo de errores comunes de Supabase
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("El correo o la contraseña son incorrectos.");
        }
        if (error.message.includes("Email not confirmed")) {
          throw new Error(
            "Por favor, confirma tu correo electrónico antes de iniciar sesión.",
          );
        }
        throw error;
      }

      if (data.session) {
        showToast(
          "success",
          "Acceso Concedido",
          "Sesión iniciada correctamente.",
        );
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      showToast(
        "error",
        "Error de Autenticación",
        err.message || "Ha ocurrido un error al conectar con el servidor.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-neutral-950 font-mono text-white">
      <div className="w-full max-w-md rounded-2xl border-4 border-neutral-900 bg-neutral-900/90 p-6 sm:p-8 shadow-[6px_6px_0_#202020] backdrop-blur-xl">
        {/* Encabezado del Formulario */}
        <div className="flex flex-col gap-2 border-b-2 border-neutral-800 pb-6 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-neutral-950 px-3 py-1 text-xs text-yellow-400 w-fit">
            <span>// ACCESO_SISTEMA</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white uppercase">
            Iniciar Sesión
          </h1>
          <p className="text-xs text-neutral-400 font-sans">
            Introduce tus credenciales universitarias de la ETSII para
            continuar.
          </p>
        </div>

        {/* Formulario de Login */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans">
          <div className="space-y-1">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
              Correo Electrónico
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 h-4 w-4 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@alum.us.es"
                className="w-full rounded-xl border-2 border-neutral-800 bg-neutral-950 py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder-neutral-500 focus:border-yellow-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                Contraseña
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-[11px] font-mono text-yellow-400 hover:underline"
              >
                ¿Olvidaste la clave?
              </Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4 w-4 text-neutral-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border-2 border-neutral-800 bg-neutral-950 py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder-neutral-500 focus:border-yellow-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-neutral-900 bg-yellow-400 px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-neutral-950 shadow-[3px_3px_0_#202020] transition-all hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Autenticando...</span>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                <span>Entrar al Sistema</span>
              </>
            )}
          </button>
        </form>

        {/* Footer / Link a Registro */}
        <div className="mt-6 border-t-2 border-neutral-800 pt-4 text-center font-mono text-xs text-neutral-400">
          <span>¿No tienes una cuenta? </span>
          <Link
            href="/auth/register"
            className="font-bold text-yellow-400 hover:underline inline-flex items-center gap-1"
          >
            Regístrate <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
