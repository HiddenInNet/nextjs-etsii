"use client";

import React, { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import { useToast } from "@/components/toast/ToastContext";

interface AvatarUploadProps {
  userId: string;
  avatarUrl?: string;
  fullName: string;
  isEditing: boolean;
  onUploadComplete: (url: string) => void;
}

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
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      // 1. Subir la nueva imagen al Bucket
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      // 2. Extraer la URL pública
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // 3. Actualizar la tabla de perfiles con la nueva URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);

      if (updateError) throw updateError;

      // 4. LIMPIEZA: Buscar y eliminar avatares antiguos en la carpeta del usuario
      const { data: filesList, error: listError } = await supabase.storage
        .from("avatars")
        .list(userId);

      if (!listError && filesList) {
        // Filtramos para obtener solo los archivos viejos (ignoramos el recién subido)
        const filesToRemove = filesList
          .filter((f) => f.name !== fileName)
          .map((f) => `${userId}/${f.name}`);

        // Si hay archivos antiguos, los eliminamos del bucket
        if (filesToRemove.length > 0) {
          await supabase.storage.from("avatars").remove(filesToRemove);
        }
      }

      onUploadComplete(publicUrl);
      showToast(
        "success",
        "Avatar actualizado",
        "Tu foto de perfil se ha guardado correctamente.",
      );
    } catch (error: any) {
      showToast(
        "error",
        "Error al subir",
        error.message || "No se pudo actualizar la imagen.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-yellow-400 bg-neutral-950 font-mono text-2xl font-black text-yellow-400 shadow-[3px_3px_0_#202020]">
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
          className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          ) : (
            <Camera className="h-5 w-5 text-white" />
          )}
        </div>
      )}

      {/* Input de archivo invisible */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
        disabled={isUploading || !isEditing}
      />
    </div>
  );
}
