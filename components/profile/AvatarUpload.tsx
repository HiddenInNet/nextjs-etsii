// components/profile/AvatarUpload.tsx
"use client";

import React, { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import { useToast } from "@/components/toast/ToastContext";
import { convertImageToWebP } from "@/utils/images/convertImageToWebP";

interface AvatarUploadProps {
  userId: string;
  avatarUrl?: string;
  fullName: string;
  isEditing: boolean;
  onUploadComplete: (url: string) => void;
}

// Función auxiliar para convertir la imagen a WebP en el cliente

export default function AvatarUpload({
  userId,
  avatarUrl,
  fullName,
  isEditing,
  onUploadComplete,
}: AvatarUploadProps) {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // 1. Convertir la imagen a WebP antes de subirla
      const processedFile = await convertImageToWebP(file, 0.82);

      const fileName = `${userId}-${Date.now()}.webp`;
      const filePath = `${userId}/${fileName}`;

      // 2. Subir la nueva imagen convertida al Bucket de Supabase
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, processedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);

      if (updateError) throw updateError;

      const { data: filesList, error: listError } = await supabase.storage
        .from("avatars")
        .list(userId);

      if (!listError && filesList) {
        const filesToRemove = filesList
          .filter((f) => f.name !== fileName)
          .map((f) => `${userId}/${f.name}`);

        if (filesToRemove.length > 0) {
          await supabase.storage.from("avatars").remove(filesToRemove);
        }
      }

      onUploadComplete(publicUrl);
      showToast(
        "success",
        "Avatar actualizado",
        "Tu foto de perfil se ha convertido a WebP y guardado correctamente.",
      );
    } catch (error: any) {
      showToast(
        "error",
        "Error al subir",
        error.message || "No se pudo procesar o actualizar la imagen.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="group relative flex size-20 min-w-20 items-center justify-center overflow-hidden rounded-2xl border-2 border-neutral-950 bg-white font-mono text-2xl font-black text-neutral-950 shadow-[3px_3px_0_#0a0a0a]">
      {/* Vista principal (Imagen o inicial) */}
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={fullName}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{fullName.charAt(0).toUpperCase()}</span>
      )}

      {/* Capa de Hover (Sólo si isEditing está activado) */}
      {isEditing && (
        <div
          className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-xl bg-neutral-600/55 opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100"
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-yellow-300" />
          ) : (
            <Camera className="h-5 w-5 text-yellow-300" />
          )}
        </div>
      )}

      {/* Input de archivo invisible */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleImageChange}
        disabled={isUploading || !isEditing}
      />
    </div>
  );
}
