import { UserProfile } from "@/context/AuthContext";
import { SUBJECT } from "@/error/subject/subject";
import { supabase } from "@/utils/supabase/client";

export async function removeUserSubject(
  user: UserProfile,
  subjectId: string,
): Promise<Boolean> {
  try {
    const { error } = await supabase
      .from("user_subjects")
      .delete()
      .eq("user_id", user.id)
      .eq("subject_id", subjectId);

    if (error) {
      console.error(SUBJECT.REMOVE, error);
      return false;
    }

    return true;
  } catch (error: any) {
    return false;
  }
}
