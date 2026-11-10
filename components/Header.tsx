import HeaderClient from "@/components/HeaderClient";
import { getSiteLogos } from "@/lib/settings";

// Envoltorio de servidor: lee el logo configurado en el panel y se lo pasa al header.
export default async function Header() {
  const { header } = await getSiteLogos();
  return <HeaderClient logoUrl={header} />;
}
