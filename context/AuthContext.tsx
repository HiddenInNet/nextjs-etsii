"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener los datos de public.profiles
  const fetchUserProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", userId)
        .single();

      if (error) throw error;

      setUser({
        id: userId,
        name: data?.full_name || email.split("@")[0],
        email,
        role: data?.role || "Estudiante",
      });
    } catch {
      setUser({
        id: userId,
        name: email.split("@")[0],
        email,
        role: "Estudiante",
      });
    }
  };

  useEffect(() => {
    // 1. Carga la sesión inicial UNA SOLA VEZ al montar la aplicación
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        await fetchUserProfile(session.user.id, session.user.email || "");
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    initAuth();

    // 2. Escucha únicamente eventos de inicio o cierre de sesión explícitos
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user.id, session.user.email || "");
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar la sesión en cualquier componente
export const useAuth = () => useContext(AuthContext);
