"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, useGSAP);

/**
 * Hero headline: the place name is set in italic as an accent, and the lines rise
 * from behind a mask once on load. Reduced motion: the title simply shows.
 */
export function HeroTitle({ text, accent, className }: { text: string; accent: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const at = accent ? text.indexOf(accent) : -1;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { autoAlpha: 1 });
            return gsap.from(self.lines, { yPercent: 110, duration: 1.15, ease: "expo.out", stagger: 0.09, delay: 0.1 });
          }
        });
        return () => split.revert();
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { autoAlpha: 1 });
      });
    },
    { scope: ref }
  );

  return (
    <h1 ref={ref} className={`hero-split ${className ?? ""}`}>
      {at < 0 ? text : (
        <>
          {text.slice(0, at)}
          <em>{accent}</em>
          {text.slice(at + accent.length)}
        </>
      )}
    </h1>
  );
}
