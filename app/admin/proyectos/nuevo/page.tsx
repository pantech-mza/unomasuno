import AdminShell from "@/components/AdminShell";

export default function NewProject(){
  return <AdminShell>
    <h1>Nuevo proyecto</h1>
    <div className="admin-card">
      <div className="field"><label>Nombre</label><input placeholder="CASA PI"/></div>
      <div className="admin-grid">
        <div className="field"><label>Ubicación</label><input placeholder="Tunuyán, Mendoza"/></div>
        <div className="field"><label>Superficie</label><input placeholder="250 m2"/></div>
        <div className="field"><label>Año</label><input placeholder="2018"/></div>
      </div>
      <div className="field"><label>Descripción</label><textarea/></div>
      <div className="field"><label>Imagen principal</label><input type="file" accept="image/*"/></div>
      <div className="field"><label>Galería</label><input type="file" accept="image/*" multiple/></div>
      <button className="primary">Guardar proyecto</button>
    </div>
  </AdminShell>
}
