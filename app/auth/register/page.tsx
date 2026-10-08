"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useToast } from "@/components/toast/ToastContext";
import { supabase } from "@/utils/supabase/client";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Validaciones previas
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      showToast(
        "error",
        "Campos Incompletos",
        "Por favor completa todos los campos.",
      );
      setIsLoading(false);
      return;
    }

    if (!email.toLowerCase().endsWith("@gmail.com")) {
      showToast(
        "error",
        "Dominio No Permitido",
        "Debes usar tu correo institucional (@alum.us.es).",
      );
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      showToast(
        "error",
        "Contraseña Débil",
        "La contraseña debe tener al menos 6 caracteres.",
      );
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      showToast(
        "error",
        "Error de Coincidencia",
        "Las contraseñas no coinciden.",
      );
      setIsLoading(false);
      return;
    }

    try {
      // 2. Registro con Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName, // Leído por el trigger SQL para rellenar public.profiles
          },
        },
      });

      if (error) {
        throw error;
      }

      // 3. Confirmación según configuración del proyecto
      if (data?.user && data.session === null) {
        showToast(
          "success",
          "Registro Casi Completo",
          "Te hemos enviado un correo de confirmación. Revisa tu bandeja de entrada.",
        );
      } else {
        showToast(
          "success",
          "Cuenta Creada",
          "Tu cuenta ha sido creada exitosamente.",
        );
      }

      router.push("/auth/login");
    } catch (err: any) {
      showToast(
        "error",
        "Error en el Registro",
        err.message || "No se ha podido procesar el registro.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-950 p-4 pt-20 font-mono text-white md:pt-0">
      <div className="w-full max-w-md rounded-2xl border-4 border-neutral-900 bg-neutral-900/90 p-6 shadow-[6px_6px_0_#202020] backdrop-blur-xl sm:p-8">
        {/* Encabezado del Formulario */}
        <div className="mb-6 flex flex-col gap-2 border-b-2 border-neutral-800 pb-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-yellow-400/30 bg-neutral-950 px-3 py-1 text-xs text-yellow-400">
            <span>// NUEVO_USUARIO</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white uppercase">
            Crear Cuenta
          </h1>
          <p className="font-sans text-xs text-neutral-400">
            Regístrate con tu correo institucional de la ETSII.
          </p>
        </div>

        {/* Formulario de Registro */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans">
          {/* Nombre Completo */}
          <div className="space-y-1">
            <label className="font-mono text-xs font-bold tracking-wider text-neutral-300 uppercase">
              Nombre Completo
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nombre y Apellidos"
                className="w-full rounded-xl border-2 border-neutral-800 bg-neutral-950 py-2.5 pr-4 pl-10 font-mono text-xs text-white placeholder-neutral-500 transition-colors focus:border-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Correo Electrónico */}
          <div className="space-y-1">
            <label className="font-mono text-xs font-bold tracking-wider text-neutral-300 uppercase">
              Correo Institucional
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 h-4 w-4 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@alum.us.es"
                className="w-full rounded-xl border-2 border-neutral-800 bg-neutral-950 py-2.5 pr-4 pl-10 font-mono text-xs text-white placeholder-neutral-500 transition-colors focus:border-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="space-y-1">
            <label className="font-mono text-xs font-bold tracking-wider text-neutral-300 uppercase">
              Contraseña
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4 w-4 text-neutral-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border-2 border-neutral-800 bg-neutral-950 py-2.5 pr-4 pl-10 font-mono text-xs text-white placeholder-neutral-500 transition-colors focus:border-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div className="space-y-1">
            <label className="font-mono text-xs font-bold tracking-wider text-neutral-300 uppercase">
              Confirmar Contraseña
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4 w-4 text-neutral-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border-2 border-neutral-800 bg-neutral-950 py-2.5 pr-4 pl-10 font-mono text-xs text-white placeholder-neutral-500 transition-colors focus:border-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-neutral-900 bg-yellow-400 px-4 py-3 font-mono text-xs font-bold tracking-wider text-neutral-950 uppercase shadow-[3px_3px_0_#202020] transition-all hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Procesando...</span>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>Registrar Cuenta</span>
              </>
            )}
          </button>
        </form>

        {/* Link a Login */}
        <div className="mt-6 border-t-2 border-neutral-800 pt-4 text-center font-mono text-xs text-neutral-400">
          <span>¿Ya tienes una cuenta? </span>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1 font-bold text-yellow-400 hover:underline"
          >
            Inicia Sesión <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
