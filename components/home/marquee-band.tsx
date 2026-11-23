"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Pause, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * A slow line of the studio's services drifting across the page. It speeds up with scroll
 * velocity, then eases back. Has a pause button (moving content over 5 s, WCAG 2.2.2).
 * Reduced motion: the words simply sit still.
 */
export function MarqueeBand({ words, pauseLabel, playLabel }: { words: string[]; pauseLabel: string; playLabel: string }) {
  const root = useRef<HTMLDivElement>(null);
  const loop = useRef<gsap.core.Tween | null>(null);
  const [paused, setPaused] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = root.current?.querySelector(".marquee-track");
        if (!track) return;
        loop.current = gsap.to(track, { xPercent: -50, duration: 48, ease: "none", repeat: -1 });
        const boost = { speed: 1 };
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            if (!loop.current || loop.current.paused()) return;
            const target = 1 + Math.min(Math.abs(self.getVelocity()) / 450, 5);
            gsap.to(boost, {
              speed: target,
              duration: 0.2,
              overwrite: true,
              onUpdate: () => {
                loop.current?.timeScale(boost.speed);
              },
              onComplete: () => {
                gsap.to(boost, {
                  speed: 1,
                  duration: 1.2,
                  ease: "power2.out",
                  onUpdate: () => {
                    loop.current?.timeScale(boost.speed);
                  }
                });
              }
            });
          }
        });
      });
    },
    { scope: root }
  );

  const toggle = () => {
    if (!loop.current) return;
    if (paused) loop.current.play();
    else loop.current.pause();
    setPaused(!paused);
  };

  const line = (hidden: boolean) => (
    <span className="marquee-line" aria-hidden={hidden || undefined}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="marquee-word">
          {word}
          <span aria-hidden="true" className="marquee-dot" />
        </span>
      ))}
    </span>
  );

  return (
    <div ref={root} className="marquee-band">
      <div className="marquee-track">
        {line(false)}
        {line(true)}
      </div>
      <button type="button" className="marquee-toggle" onClick={toggle} aria-label={paused ? playLabel : pauseLabel}>
        {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
      </button>
    </div>
  );
}
