"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const items = [
  { href: "/", label: "Proyectos" },
  { href: "/menciones", label: "Menciones" },
  { href: "/academia", label: "Academia" },
  { href: "/nosotros", label: "Nosotros" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`site-header ${styles.header}`}>
      <div className={`container header-inner ${styles.headerInner}`}>
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

        {/* Desktop */}
        <nav className={`nav ${styles.desktopNav}`} aria-label="Navegación principal">
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
            className={styles.loginButton}
          >
            Ingreso
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`mobile-menu ${styles.menuButton}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span className={menuOpen ? styles.barTopOpen : styles.bar} />
          <span className={menuOpen ? styles.barMiddleOpen : styles.bar} />
          <span className={menuOpen ? styles.barBottomOpen : styles.bar} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className={`${styles.mobilePanel} ${menuOpen ? styles.mobilePanelOpen : ""}`}
      >
        <nav className={styles.mobileNav} aria-label="Navegación móvil">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? styles.mobileActive : ""}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/admin/login"
            className={styles.mobileLoginButton}
            onClick={() => setMenuOpen(false)}
          >
            Ingreso
          </Link>
        </nav>
      </div>
    </header>
  );
}
