import AdminShell from "@/components/AdminShell";
import AdminContentManager from "@/components/AdminContentManager";
import { requireAdminUser } from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase-server";
export default async function Page(){await requireAdminUser();const supabase=await createClient();const {data}=await supabase.from("content_entries").select("*").eq("section","news").order("position");return <AdminShell><AdminContentManager section="news" label="Noticias" initialEntries={(data??[]) as any}/></AdminShell>;}
