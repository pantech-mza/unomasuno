"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function Login(){
  const router=useRouter(); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
  async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault(); setBusy(true); setError(""); const f=new FormData(e.currentTarget); const {error}=await createClient().auth.signInWithPassword({email:String(f.get("email")||""),password:String(f.get("password")||"")}); if(error){setError("Email o contraseña incorrectos.");setBusy(false);return;} router.replace("/admin");router.refresh();}
  return <main className="admin-login"><form className="admin-card admin-login-card" onSubmit={submit}><img src="/brand/header-logo.png" alt="UNO MÁS UNO" className="admin-login-logo"/><h1>Ingreso al panel</h1><label className="admin-field">Email<input name="email" type="email" required autoComplete="email"/></label><label className="admin-field">Contraseña<input name="password" type="password" required autoComplete="current-password"/></label>{error&&<p className="admin-error">{error}</p>}<button className="primary" disabled={busy}>{busy?"Ingresando...":"Ingresar"}</button></form></main>;
}
