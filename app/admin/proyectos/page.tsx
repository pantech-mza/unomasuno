import AdminShell from "@/components/AdminShell";
import AdminProjectManager from "@/components/AdminProjectManager";
import { requireAdminUser } from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase-server";

export default async function AdminProjects(){
  await requireAdminUser(); const supabase=await createClient();
  const {data:projects}=await supabase.from("projects").select("*").order("position");
  const rows=[] as any[]; for(const project of projects??[]){const {data:images}=await supabase.from("project_images").select("*").eq("project_id",project.id).order("position");rows.push({...project,images:images??[]});}
  return <AdminShell><AdminProjectManager initialProjects={rows}/></AdminShell>;
}
