"use client";

import { useEffect } from "react";
import { createAnimatable } from "animejs/animatable";
import type { AnimatableObject } from "animejs";
import { set, stagger } from "animejs/utils";
import { animate } from "animejs/animation";
import { createDrawable } from "animejs/svg";

type Kind = "btn" | "card";

/**
 * Hover effects for the whole site, from one pointer listener:
 *  - .btn         "magnetic": the button drifts toward the cursor and springs back
 *  - .card-hover  3D tilt toward the cursor, with a soft spotlight (CSS, via --mx/--my)
 * Only for mouse/trackpad users who haven't asked for reduced motion.
 */
export default function Interactions() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const root = document.documentElement;
    root.classList.add("fx"); // lets CSS drop its own transform transitions

    const cache = new WeakMap<HTMLElement, AnimatableObject>();
    const animatable = (el: HTMLElement, kind: Kind) => {
      let a = cache.get(el);
      if (!a) {
        if (kind === "card") {
          set(el, { perspective: "900px" });
          a = createAnimatable(el, {
            rotateX: { unit: "deg", duration: 600 },
            rotateY: { unit: "deg", duration: 600 },
            translateY: { unit: "px", duration: 500 },
            ease: "out(4)",
          });
        } else {
          a = createAnimatable(el, {
            x: { unit: "px", duration: 500 },
            y: { unit: "px", duration: 500 },
            ease: "out(4)",
          });
        }
        cache.set(el, a);
      }
      return a;
    };

    let active: { el: HTMLElement; kind: Kind } | null = null;

    const release = () => {
      if (!active) return;
      const a = animatable(active.el, active.kind);
      if (active.kind === "btn") {
        a.x(0, 900, "outElastic(1, .5)");
        a.y(0, 900, "outElastic(1, .5)");
      } else {
        a.rotateX(0);
        a.rotateY(0);
        a.translateY(0);
      }
      active = null;
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const btn = target?.closest<HTMLElement>(".btn") ?? null;
      const card = btn ? null : (target?.closest<HTMLElement>(".card-hover") ?? null);
      const el = btn ?? card;
      if (active && active.el !== el) release();
      if (!el) return;

      const kind: Kind = btn ? "btn" : "card";
      if (kind === "card" && active?.el !== el) {
        const svg = el.querySelector("svg[data-draw]");
        if (svg) {
          const shapes = createDrawable(svg.querySelectorAll("path, circle, rect"));
          animate(shapes, { draw: ["0 0", "0 1"], duration: 800, delay: stagger(90), ease: "inOutQuad" });
        }
      }
      active = { el, kind };
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width; // 0..1
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);

      const a = animatable(el, kind);
      if (kind === "btn") {
        a.x((px - 0.5) * Math.min(r.width * 0.3, 24));
        a.y((py - 0.5) * Math.min(r.height * 0.5, 14) - 2);
      } else {
        a.rotateY((px - 0.5) * 8);
        a.rotateX((0.5 - py) * 8);
        a.translateY(-6);
      }
    };

    const onLeaveWindow = (e: PointerEvent) => {
      if (!e.relatedTarget) release();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeaveWindow);
    window.addEventListener("scroll", release, { passive: true });
    return () => {
      root.classList.remove("fx");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeaveWindow);
      window.removeEventListener("scroll", release);
    };
  }, []);

  return null;
}
