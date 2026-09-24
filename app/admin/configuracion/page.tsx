import AdminShell from "@/components/AdminShell";
import AdminSettingsForm from "@/components/AdminSettingsForm";
import { requireAdminUser } from "@/lib/admin-auth";
import { getSiteSettings } from "@/lib/settings";
export default async function Settings(){await requireAdminUser();const settings=await getSiteSettings();return <AdminShell><AdminSettingsForm initial={settings}/></AdminShell>}
