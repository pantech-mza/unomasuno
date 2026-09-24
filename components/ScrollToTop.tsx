"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Next normally restores scroll, but in this portfolio we always want
    // every project detail to start at the top/title.
    window.scrollTo(0, 0);

    // Extra frame protects against layout/hero hydration restoring an old position.
    const frame = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
