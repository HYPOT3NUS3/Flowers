"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Site-wide scroll motion, driven by data attributes so server components stay server components:
 *   data-reveal="lines"   headings: lines rise from a mask, once
 *   data-reveal="image"   large photos: unveil from the bottom while settling from a slight zoom, once
 *   data-reveal="stagger" grids: children rise into place together, once
 *   .home-hero            the hero photo drifts and the copy lifts away as you scroll past (scrubbed)
 * Anything already on screen when the page loads is left alone, so nothing flashes.
 * Reduced motion: none of this runs and everything simply shows.
 */
export function ScrollReveals() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const fold = window.innerHeight * 0.88;
      const below = (el: Element) => el.getBoundingClientRect().top > fold;
      const splits: SplitText[] = [];

      document.querySelectorAll<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
        if (!below(el)) return;
        const split = SplitText.create(el, { type: "lines", mask: "lines", autoSplit: true });
        splits.push(split);
        gsap.from(split.lines, {
          yPercent: 105,
          duration: 1.05,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", once: true }
        });
      });

      document.querySelectorAll<HTMLElement>('[data-reveal="image"]').forEach((el) => {
        if (!below(el)) return;
        const img = el.querySelector("img");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        tl.from(el, { clipPath: "inset(18% 0% 0% 0%)", duration: 1.3, ease: "expo.out" });
        if (img) tl.from(img, { scale: 1.12, duration: 1.6, ease: "expo.out" }, 0);
      });

      document.querySelectorAll<HTMLElement>('[data-reveal="stagger"]').forEach((group) => {
        const items = Array.from(group.children).filter(below);
        if (!items.length) return;
        gsap.set(items, { y: 28, autoAlpha: 0 });
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out", stagger: 0.07, overwrite: true })
        });
      });

      const hero = document.querySelector<HTMLElement>(".home-hero");
      if (hero) {
        const photo = hero.querySelector(".hero-photo img");
        const copy = hero.querySelector(".hero-copy");
        const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
        if (photo) tl.to(photo, { yPercent: 8, scale: 1.06, ease: "none" }, 0);
        if (copy) tl.to(copy, { yPercent: -10, autoAlpha: 0.2, ease: "none" }, 0);
      }

      // Photos and fonts change layout after load; recompute trigger positions once they settle.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);

      return () => {
        window.removeEventListener("load", refresh);
        splits.forEach((split) => split.revert());
      };
    });

    return () => mm.revert();
  }, [pathname]);

  return null;
}
