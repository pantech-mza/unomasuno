import { getSiteSettings } from "@/lib/settings";

const CONTACT = {
  instagram_url: "https://www.instagram.com/unomasuno_arquitectos",
  phone: "+54 9 261 5162064 | +54 9 261 5925445",
  email: "arquitectos1mas1@gmail.com",
};

const defaultMessage =
  "Hola! Me contacto desde el sitio web www.unomasunoarquitectos.com.ar. Me gustaría consultar lo siguiente:";

function digits(phone: string) {
  return phone.replace(/\D/g, "");
}

function wa(phone: string, message = defaultMessage) {
  return `https://wa.me/${digits(phone)}?text=${encodeURIComponent(message)}`;
}

export default async function Footer() {
  // El CRM puede sobreescribir estos datos.
  // Si Supabase devuelve vacío/null, conservamos siempre el contacto real.
  let settings: any = {};

  try {
    settings = (await getSiteSettings()) ?? {};
  } catch {
    settings = {};
  }

  const instagramUrl =
    settings.instagram_url?.trim() || CONTACT.instagram_url;

  const email =
    settings.email?.trim() || CONTACT.email;

  const phoneValue =
    settings.phone?.trim() || CONTACT.phone;

  const phones = phoneValue
    .split("|")
    .map((phone: string) => phone.trim())
    .filter(Boolean);

  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-logo-wrap">
          <img
            src="/brand/footer-logo.png"
            alt="UNO MÁS UNO Arquitectos"
            className="footer-logo-img"
          />
        </div>

        <nav className="footer-nav" aria-label="Navegación de pie">
          <a href="/">Proyectos</a>
          <a href="/nosotros">Nosotros</a>
          <a href="/academia">Academia</a>
          <a href="/menciones">Menciones</a>
        </nav>

        <div className="footer-contact">
          <h3>Contacto</h3>

          <div className="footer-socials">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de UNO MÁS UNO Arquitectos"
            >
              Instagram
            </a>
          </div>

          <p>
            Teléfono:{" "}
            {phones.map((phone: string, index: number) => (
              <span key={phone}>
                {index > 0 ? " | " : ""}
                <a
                  href={wa(phone)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {phone}
                </a>
              </span>
            ))}
          </p>

          <p>
            Mail:{" "}
            <a href={`mailto:${email}`}>
              {email}
            </a>
          </p>
        </div>
      </div>

      <div className="site-container footer-bottom">
        <span>
          © {new Date().getFullYear()} UNO MÁS UNO Arquitectos
        </span>

        <span>
          Sitio web desarrollado con &lt;3{" "}
          <a
            href={wa(
              "+54 9 261 2434819",
              "Hola! Me contacto desde el sitio web de UNO MÁS UNO Arquitectos."
            )}
            target="_blank"
            rel="noreferrer"
          >
            Pantech
          </a>
        </span>
      </div>
    </footer>
  );
}
