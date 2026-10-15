"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/toast/ToastContext";
import { supabase } from "@/utils/supabase/client";
import ProfileHeader from "@/components/profile/ProfileHeader";
import AssociationsSection from "@/components/profile/AssociationsSection";
import SubjectsSection from "@/components/profile/SubjectsSection";

export interface ProfileData {
  full_name: string;
  email: string;
  role: string;
  avatar_url?: string;
  created_at?: string;
}

export interface UserAssociation {
  id: string;
  position: string;
  joined_at: string;
  association: {
    id: string;
    slug: string;
    name: string;
    tag: string;
    description: string;
    website_url: string;
  };
}

export default function ProfileContainer() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [memberships, setMemberships] = useState<UserAssociation[]>([]);
  const [isLoadingAssocs, setIsLoadingAssocs] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/auth/login");
      return;
    }
    if (user) {
      fetchFullProfileAndAssociations();
    }
  }, [user, isAuthLoading, router]);

  const fetchFullProfileAndAssociations = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;

      const userId = session.user.id;

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      setIsLoadingAssocs(true);
      const { data: assocData, error: assocError } = await supabase
        .from("association_memberships")
        .select(
          `
          id, position, joined_at,
          association:associations (id, slug, name, tag, description, website_url)
        `,
        )
        .eq("user_id", userId);

      if (assocError) throw assocError;

      const formattedMemberships =
        (assocData as any[])?.map((item) => ({
          id: item.id,
          position: item.position,
          joined_at: item.joined_at,
          association: Array.isArray(item.association)
            ? item.association[0]
            : item.association,
        })) || [];

      setMemberships(formattedMemberships);
    } catch (err: any) {
      showToast(
        "error",
        "Error al cargar datos",
        err.message || "No se ha podido recuperar la información.",
      );
    } finally {
      setIsLoadingAssocs(false);
    }
  };

  if (isAuthLoading || !profile || !user) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="flex items-center gap-3 rounded-xl border-2 border-neutral-800 bg-white p-6 shadow-lg">
          <Loader2 className="h-6 w-6 animate-spin text-yellow-400" />
          <span className="text-sm">Cargando datos del perfil...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProfileHeader
        profile={profile}
        userId={user.id}
        onProfileUpdate={setProfile}
      />
      <SubjectsSection />
      <AssociationsSection
        memberships={memberships}
        isLoadingAssocs={isLoadingAssocs}
      />
    </>
  );
}
