"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Phones only: once the hero has scrolled away, a "View collections" bar stays at the
 * bottom of the screen beside the WhatsApp button, so ordering is always one tap away.
 */
export function MobileOrderBar({ href, label }: { href: string; label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 480;
      setVisible(window.scrollY > window.innerHeight * 0.75 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="mobile-order-bar md:hidden" data-visible={visible} aria-hidden={!visible}>
      <Link href={href} className="button-primary w-full" tabIndex={visible ? 0 : -1}>
        {label}
      </Link>
    </div>
  );
}
