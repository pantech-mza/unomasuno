"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Proyectos" },
  { href: "/menciones", label: "Menciones" },
  { href: "/academia", label: "Academia" },
  { href: "/nosotros", label: "Nosotros" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand-logo-link"
          aria-label="UNO MÁS UNO Arquitectos"
        >
          <img
            src="/brand/header-logo.png"
            alt="UNO MÁS UNO Arquitectos"
            className="brand-logo-img"
          />
        </Link>

        <nav className="nav" aria-label="Navegación principal">
          {items.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "active" : ""}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/admin/login"
            aria-label="Ingreso al panel de administración"
            style={{
              background: "#000",
              color: "#fff",
              height: "44px",
              padding: "0 22px",
              marginLeft: "12px",
              alignSelf: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "2px",
              fontWeight: 500,
            }}
          >
            Ingreso
          </Link>
        </nav>
      </div>
    </header>
  );
}
