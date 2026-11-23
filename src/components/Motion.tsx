"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate } from "animejs/animation";
import { stagger } from "animejs/utils";
import { createDrawable } from "animejs/svg";

/**
 * One observer for the whole site. Any element with:
 *   data-reveal            fades and slides up when it enters the viewport
 *   data-reveal="stagger"  animates its direct children one after another
 *   data-count="123"       counts up from 0 (optional data-suffix)
 *   data-scramble          text cycles through random letters, then settles
 * Elements that arrive later (streamed content, client navigation) are picked up
 * by a MutationObserver, so nothing is left hidden.
 */
const LETTERS = "abcdefghijklmnopqrstuvwxyz";

function scramble(el: HTMLElement) {
  // Write into the existing text node (not textContent) so React keeps its reference.
  const node = el.firstChild;
  if (!node || node.nodeType !== Node.TEXT_NODE || el.childNodes.length !== 1) return;
  const text = el.dataset.text ?? node.nodeValue ?? "";
  el.dataset.text = text;
  el.setAttribute("aria-label", text);
  const obj = { p: 0 };
  animate(obj, {
    p: 1,
    duration: Math.min(700, 250 + text.length * 10),
    ease: "outQuad",
    onUpdate: () => {
      const solved = Math.floor(obj.p * text.length);
      let out = text.slice(0, solved);
      for (let i = solved; i < text.length; i++) {
        const c = text[i];
        if (!/[a-z]/i.test(c)) {
          out += c;
          continue;
        }
        const r = LETTERS[(Math.random() * LETTERS.length) | 0];
        out += c === c.toUpperCase() ? r.toUpperCase() : r;
      }
      node.nodeValue = out;
    },
    onComplete: () => {
      node.nodeValue = text;
    },
  });
}

export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SELECTOR = "[data-reveal], [data-count], [data-scramble]";

    const reveal = (el: HTMLElement) => {
      if (el.dataset.reveal === "stagger") {
        animate(el.children, {
          opacity: [0, 1],
          translateY: [24, 0],
          duration: 700,
          delay: stagger(70),
          ease: "outCubic",
        });
      } else {
        animate(el, {
          opacity: [0, 1],
          translateY: [24, 0],
          duration: 800,
          delay: Number(el.dataset.delay ?? 0),
          ease: "outCubic",
        });
      }
    };

    const count = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? "";
      const decimals = (el.dataset.count?.split(".")[1] ?? "").length;
      const prefix = el.dataset.prefix ?? "";
      const obj = { n: 0 };
      animate(obj, {
        n: target,
        duration: 1600,
        ease: "outExpo",
        onUpdate: () => {
          el.textContent = `${prefix}${obj.n.toFixed(decimals)}${suffix}`;
        },
      });
    };

    const draw = (root: HTMLElement) => {
      root.querySelectorAll("svg[data-draw]").forEach((svg, i) => {
        const shapes = createDrawable(svg.querySelectorAll("path, circle, rect"));
        animate(shapes, { draw: ["0 0", "0 1"], duration: 1100, delay: stagger(120, { start: 250 + i * 70 }), ease: "inOutQuad" });
      });
    };

    const run = (el: HTMLElement) => {
      if (el.dataset.count) count(el);
      if (el.hasAttribute("data-scramble")) scramble(el);
      if (el.hasAttribute("data-reveal")) {
        reveal(el);
        draw(el);
      }
    };

    const seen = new WeakSet<Element>();

    if (reduce) {
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        el.textContent = `${el.dataset.prefix ?? ""}${el.dataset.count}${el.dataset.suffix ?? ""}`;
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          run(entry.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    const scan = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };

    scan(document);
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.matches(SELECTOR) && !seen.has(n)) {
            seen.add(n);
            io.observe(n);
          }
          scan(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
