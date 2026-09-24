import Link from "next/link";
import AdminSignOut from "@/components/AdminSignOut";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell">
    <header className="admin-top"><strong>UNO MÁS UNO · Admin</strong><span>Panel de gestión</span></header>
    <div className="admin-layout">
      <aside className="admin-side">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/proyectos">Proyectos</Link>
        <Link href="/admin/menciones">Menciones</Link>
        <Link href="/admin/academia">Academia</Link>
        <Link href="/admin/nosotros">Nosotros</Link>
        <Link href="/admin/noticias">Noticias</Link>
        <Link href="/admin/configuracion">Configuración</Link>
        <Link href="/">Ver sitio</Link>
        <AdminSignOut />
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  </div>;
}
