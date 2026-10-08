import { createClient } from "@/utils/supabase/server";
import { cookies } from "vinext/shims/headers";

export async function GET() {
  const supabase = createClient(cookies());

  const { data, error } = await supabase.from("subjects").select("*");

  if (error) Response.json({ error }, { status: 500 });

  return Response.json(data);
}
