import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EditorialRows from "@/components/EditorialRows";
import { getContentEntries } from "@/lib/content";

export const revalidate = 60;

export default async function MencionesPage() {
  const entries = await getContentEntries("mentions");

  return (
    <>
      <Header />
      <main className="original-editorial-page">
        <EditorialRows entries={entries} section="mentions" />
      </main>
      <Footer />
    </>
  );
}
