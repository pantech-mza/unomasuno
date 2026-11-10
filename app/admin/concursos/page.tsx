import AdminShell from "@/components/AdminShell";
import AdminCompetitionManager from "@/components/AdminCompetitionManager";
import { requireAdminUser } from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase-server";

export default async function AdminConcursos() {
  await requireAdminUser();
  const supabase = await createClient();

  const [{ data: competitions, error }, { data: images }] = await Promise.all([
    supabase.from("competitions").select("*").order("position").order("created_at"),
    supabase.from("competition_images").select("*").order("position"),
  ]);

  if (error) {
    return (
      <AdminShell>
        <div className="admin-card">
          <h1>Concursos</h1>
          <p className="admin-error">
            No se pudo leer la tabla de concursos. Revisá que se haya ejecutado
            <code> supabase/20261110_concursos.sql</code> en Supabase.
          </p>
          <p className="admin-status">{error.message}</p>
        </div>
      </AdminShell>
    );
  }

  const rows = (competitions ?? []).map((c: any) => ({
    ...c,
    images: (images ?? []).filter((img: any) => img.competition_id === c.id),
  }));

  return (
    <AdminShell>
      <AdminCompetitionManager initial={rows} />
    </AdminShell>
  );
}
