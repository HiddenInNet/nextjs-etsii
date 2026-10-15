// components/auth/LoginForm.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/components/toast/ToastContext";
import { supabase } from "@/utils/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
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
    <div className="w-full max-w-md rounded-2xl border-4 border-neutral-950 bg-white p-6 shadow-[8px_8px_0_#0a0a0a] sm:p-8">
      {/* Encabezado del Formulario */}
      <div className="mb-6 flex flex-col gap-2 border-b-2 border-neutral-950 pb-6">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-neutral-950 bg-yellow-300 px-3 py-1 text-xs font-bold text-neutral-950 shadow-[2px_2px_0_#0a0a0a]">
          <span>// ACCESO_SISTEMA</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-neutral-950 uppercase">
          Iniciar Sesión
        </h1>
        <p className="font-sans text-xs text-neutral-700">
          Introduce tus credenciales universitarias de la ETSII para continuar.
        </p>
      </div>

      {/* Formulario de Login */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans">
        <div className="space-y-1">
          <label className="font-mono text-xs font-bold tracking-wider text-neutral-950 uppercase">
            Correo Electrónico
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 h-4 w-4 text-neutral-600" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@alum.us.es"
              className="w-full rounded-xl border-2 border-neutral-950 bg-white py-2.5 pr-4 pl-10 font-mono text-xs text-neutral-950 placeholder-neutral-400 transition-colors focus:border-neutral-950 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="font-mono text-xs font-bold tracking-wider text-neutral-950 uppercase">
              Contraseña
            </label>
            <Link
              href="/auth/forgot-password"
              className="font-mono text-[11px] font-bold text-neutral-800 hover:underline"
            >
              ¿Olvidaste la clave?
            </Link>
          </div>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 h-4 w-4 text-neutral-600" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border-2 border-neutral-950 bg-white py-2.5 pr-4 pl-10 font-mono text-xs text-neutral-950 placeholder-neutral-400 transition-colors focus:border-neutral-950 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-neutral-950 bg-yellow-300 px-4 py-3 font-mono text-xs font-bold tracking-wider text-neutral-950 uppercase shadow-[3px_3px_0_#0a0a0a] transition-all hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-50"
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
      <div className="mt-6 border-t-2 border-neutral-950 pt-4 text-center font-mono text-xs text-neutral-700">
        <span>¿No tienes una cuenta? </span>
        <Link
          href="/auth/register"
          className="inline-flex items-center gap-1 font-bold text-neutral-950 hover:underline"
        >
          Regístrate <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
