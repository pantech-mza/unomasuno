"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const items = [
  { href: "/", label: "Proyectos" },
  { href: "/menciones", label: "Menciones" },
  { href: "/academia", label: "Academia" },
  { href: "/nosotros", label: "Nosotros" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
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

        <nav className="desktop-nav" aria-label="Navegación principal">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/admin/login"
            style={{
              alignSelf: "center",
              height: "42px",
              padding: "0 22px",
              marginLeft: "10px",
              background: "#000",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "nowrap",
            }}
          >
            Ingreso
          </Link>
        </nav>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X size={27} strokeWidth={1.7} />
          ) : (
            <Menu size={27} strokeWidth={1.7} />
          )}
        </button>
      </div>

      <div
        className={`mobile-nav-backdrop ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
      />

      <nav
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Navegación móvil"
      >
        <div className="mobile-nav-logo">
          <img
            src="/brand/header-logo.png"
            alt="UNO MÁS UNO Arquitectos"
          />
        </div>

        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? "active" : ""}
          >
            {item.label}
          </Link>
        ))}

        <Link
          href="/admin/login"
          style={{
            marginTop: "22px",
            background: "#000",
            color: "#fff",
            borderBottom: "0",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Ingreso
        </Link>
      </nav>
    </header>
  );
}
