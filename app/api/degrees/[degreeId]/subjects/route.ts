import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "vinext/shims/headers";

export async function GET(
  request: Request,
  context: { params: Promise<{ degreeId: string }> | { degreeId: string } },
) {
  try {
    // Resolvemos params en caso de que sea una Promesa (Next.js 15+)
    const resolvedParams = await context?.params;
    const degreeId = resolvedParams?.degreeId;

    if (!degreeId) {
      return NextResponse.json(
        { error: "El ID del grado es requerido" },
        { status: 400 },
      );
    }

    const supabase = createClient(cookies());
    const { data, error } = await supabase
      .from("degree_subjects")
      .select(
        `
        id,
        year,
        term,
        subject:subjects (*)
      `,
      )
      .eq("degree_id", degreeId);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
