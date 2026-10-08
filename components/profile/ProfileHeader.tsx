"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Shield,
  Save,
  Loader2,
  Calendar,
  Edit3,
} from "lucide-react";
import { useToast } from "@/components/toast/ToastContext";
import { supabase } from "@/utils/supabase/client";
import { ProfileData } from "@/components/profile/ProfileContainer";
import AvatarUpload from "@/components/profile/AvatarUpload";

interface ProfileHeaderProps {
  profile: ProfileData;
  userId: string;
  onProfileUpdate: (updatedData: ProfileData) => void;
}

export default function ProfileHeader({
  profile,
  userId,
  onProfileUpdate,
}: ProfileHeaderProps) {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fullName, setFullName] = useState(profile.full_name || "");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      showToast(
        "error",
        "Campo Requerido",
        "El nombre completo no puede estar vacío.",
      );
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName, updated_at: new Date().toISOString() })
        .eq("id", userId);

      if (error) throw error;

      showToast(
        "success",
        "Perfil Actualizado",
        "Tus datos se han actualizado correctamente.",
      );
      onProfileUpdate({ ...profile, full_name: fullName });
      setIsEditing(false);
    } catch (err: any) {
      showToast(
        "error",
        "Error",
        err.message || "No se pudo actualizar el perfil.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border-4 border-neutral-900 bg-neutral-900/90 p-6 shadow-[6px_6px_0_#202020] backdrop-blur-xl sm:p-8">
      <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-yellow-400/10 blur-2xl" />

      <div className="flex flex-col items-start justify-between gap-6 border-b-2 border-neutral-800 pb-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          {/* Subida de Imagen Independiente */}
          <AvatarUpload
            userId={userId}
            avatarUrl={profile.avatar_url}
            fullName={profile.full_name}
            isEditing={isEditing}
            onUploadComplete={(url) =>
              onProfileUpdate({ ...profile, avatar_url: url })
            }
          />

          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-neutral-950 px-3 py-0.5 text-[10px] text-yellow-400">
              <span>// REGISTRO_USUARIO</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white uppercase">
              {profile.full_name}
            </h1>
            <p className="flex items-center gap-1.5 font-sans text-xs text-neutral-400">
              <Mail className="h-3.5 w-3.5 text-neutral-500" />
              {profile.email}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs font-bold tracking-wider text-yellow-400 uppercase transition-all hover:border-yellow-400 active:translate-x-0.5 active:translate-y-0.5"
        >
          <Edit3 className="h-4 w-4" />
          <span>{isEditing ? "Cancelar Edición" : "Editar Datos"}</span>
        </button>
      </div>

      <div className="mt-6">
        {isEditing ? (
          <form
            onSubmit={handleUpdateProfile}
            className="max-w-lg space-y-4 font-sans"
          >
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
                  className="w-full rounded-xl border-2 border-neutral-800 bg-neutral-950 py-2.5 pr-4 pl-10 font-mono text-xs text-white transition-colors focus:border-yellow-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1 opacity-60">
              <label className="font-mono text-xs font-bold tracking-wider text-neutral-400 uppercase">
                Correo Institucional (No modificable)
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 h-4 w-4 text-neutral-500" />
                <input
                  type="email"
                  disabled
                  value={profile.email}
                  className="w-full cursor-not-allowed rounded-xl border-2 border-neutral-800 bg-neutral-950 py-2.5 pr-4 pl-10 font-mono text-xs text-neutral-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-neutral-900 bg-yellow-400 px-5 py-2.5 font-mono text-xs font-bold tracking-wider text-neutral-950 uppercase shadow-[3px_3px_0_#202020] transition-all hover:bg-yellow-300 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Guardar Cambios</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-4 font-mono sm:grid-cols-3">
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
              <span className="mb-1 block text-[10px] text-neutral-500 uppercase">
                // Rol de Sistema
              </span>
              <div className="flex items-center gap-2 text-sm font-bold text-yellow-400 capitalize">
                <Shield className="h-4 w-4" />
                <span>{profile.role}</span>
              </div>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
              <span className="mb-1 block text-[10px] text-neutral-500 uppercase">
                // Estado de Cuenta
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Activa
                / Verificada
              </span>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
              <span className="mb-1 block text-[10px] text-neutral-500 uppercase">
                // Registro
              </span>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <Calendar className="h-4 w-4 text-neutral-400" />
                <span>
                  {profile.created_at
                    ? new Date(profile.created_at).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                      })
                    : "Reciente"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
