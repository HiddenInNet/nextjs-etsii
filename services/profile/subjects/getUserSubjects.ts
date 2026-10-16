import { UserProfile } from "@/context/AuthContext";
import { Subject } from "@/types/supabase/subjects.interface";
import { TABLE } from "@/types/supabase/tables/tables";
import { supabase } from "@/utils/supabase/client";

export async function getUserSubjects(user: UserProfile): Promise<Subject[]> {
  try {
    const { data, error } = await supabase
      .from(TABLE.USER_SUBJECTS)
      .select(
        `
        subject_id,
        subjects (
          id,
          name,
          code,
          credits
        )
      `,
      )
      .eq("user_id", user.id)
      .order("name", { referencedTable: "subjects", ascending: true })
      .limit(10);

    if (error) throw error;

    const subjects: Subject[] =
      data?.map((item: any) => item.subjects).filter(Boolean) ?? [];

    return subjects;
  } catch (error) {
    console.error("Error al cargar las asignaturas:", error);
    return [] as Subject[];
  }
}
