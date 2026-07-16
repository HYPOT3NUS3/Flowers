import Link from "next/link";
import { ReactNode } from "react";

export function LinkButton({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link href={href} className={variant === "primary" ? "button-primary" : "button-secondary"}>
      {children}
    </Link>
  );
}
