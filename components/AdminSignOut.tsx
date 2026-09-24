"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
export default function AdminSignOut(){
  const router=useRouter();
  return <button className="admin-nav-button" onClick={async()=>{await createClient().auth.signOut(); router.replace("/admin/login"); router.refresh();}}><LogOut size={16}/> Salir</button>;
}
