"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The page's one scroll-linked moment: the photo drifts slowly inside its own band
 * while the band crosses the viewport. Text never moves. Reduced motion: the photo rests.
 */
export function ParallaxPhoto({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.current,
          { yPercent: -7, scale: 1.14 },
          {
            yPercent: 7,
            scale: 1.14,
            ease: "none",
            scrollTrigger: {
              trigger: root.current?.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} aria-hidden="true" className={className}>
      {children}
    </div>
  );
}
