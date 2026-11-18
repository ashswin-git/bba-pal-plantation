import { supabase } from "@/integrations/supabase/client";

// Works with only the public keys (Vercel-friendly). Password is checked inside the database.
export async function getSiteData(): Promise<{ json: string }> {
  const { data } = await supabase.from("site_content").select("data").eq("id", "main").maybeSingle();
  return { json: data?.data ? JSON.stringify(data.data) : "" };
}

export async function saveSiteData({ data }: { data: { password: string; json: string } }) {
  const { error } = await supabase.rpc("save_site_content", { pw: data.password, payload: JSON.parse(data.json) });
  if (error) throw new Error(error.message);
  return { ok: true };
}
