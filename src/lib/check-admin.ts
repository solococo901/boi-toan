import { supabase } from "@/lib/supabase";

export async function checkAdmin() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return false;
  }

  const { data } = await supabase
    .from("admin_users")
    .select("*")
    .eq("email", user.email)
    .maybeSingle();

  return !!data;
}