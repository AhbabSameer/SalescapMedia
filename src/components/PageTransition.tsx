"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { animate } from "animejs/animation";

/**
 * Page transition: on an internal link click, two panels (forest, then deep forest)
 * sweep up to cover the screen, the route changes underneath, then they sweep away.
 * Back/forward buttons skip the cover. Skipped entirely for reduced motion.
 */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const wrap = useRef<HTMLDivElement>(null);
  const covered = useRef(false);
  const busy = useRef(false);
  const fallback = useRef<number | undefined>(undefined);

  const uncover = () => {
    const el = wrap.current;
    if (!el || !covered.current) return;
    covered.current = false;
    window.clearTimeout(fallback.current);
    const [a, b, logo] = el.children as unknown as HTMLElement[];
    animate(logo, { opacity: 0, duration: 120, ease: "outQuad" });
    animate(b, { translateY: ["0%", "-100%"], duration: 380, delay: 40, ease: "inOutQuart" });
    animate(a, {
      translateY: ["0%", "-100%"],
      duration: 380,
      delay: 100,
      ease: "inOutQuart",
      onComplete: () => {
        el.style.visibility = "hidden";
        busy.current = false;
      },
    });
  };

  // New route rendered: reveal it.
  useEffect(() => {
    if (!covered.current) return;
    const id = requestAnimationFrame(() => uncover());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // same page or #hash: let it scroll normally
      const el = wrap.current;
      if (!el) return;

      e.preventDefault(); // runs before Next's <Link> handler, which then skips its own navigation
      if (busy.current) return;
      busy.current = true;

      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);
      const [a, b, logo] = el.children as unknown as HTMLElement[];
      el.style.visibility = "visible";
      animate(a, { translateY: ["100%", "0%"], duration: 300, ease: "inOutQuart" });
      animate(logo, { opacity: [0, 1], translateY: [8, 0], duration: 180, delay: 180, ease: "outQuad" });
      animate(b, {
        translateY: ["100%", "0%"],
        duration: 300,
        delay: 50,
        ease: "inOutQuart",
        onComplete: () => {
          covered.current = true;
          router.push(href);
          // If the route doesn't change (e.g. same page with new query), don't stay covered.
          fallback.current = window.setTimeout(uncover, 2500);
        },
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return (
    <div ref={wrap} aria-hidden className="pointer-events-none fixed inset-0 z-[80]" style={{ visibility: "hidden" }}>
      <div className="absolute inset-0 bg-accent" style={{ transform: "translateY(100%)" }} />
      <div className="absolute inset-0 bg-hero" style={{ transform: "translateY(100%)" }} />
      <div className="absolute inset-0 grid place-items-center opacity-0">
        <span className="font-display text-3xl md:text-5xl font-bold text-white">
          Salescap<span className="text-accent-2">.</span>Media
        </span>
      </div>
    </div>
  );
}
