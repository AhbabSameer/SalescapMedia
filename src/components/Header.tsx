"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs/animation";
import { stagger } from "animejs/utils";
import { nav, site } from "@/lib/site";
import { ConsultButton } from "./Consultation";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const dark = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigation (state adjusted during render, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open || !menu.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animate(menu.current.querySelectorAll("a"), {
      opacity: [0, 1],
      translateX: [-16, 0],
      delay: stagger(45),
      duration: 450,
      ease: "outCubic",
    });
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
        dark ? "text-white on-dark" : "bg-paper/85 backdrop-blur-md text-ink shadow-[0_1px_0_var(--color-line)]"
      }`}
    >
      <div className="container-x flex h-16 md:h-18 items-center justify-between gap-4">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          Salescap<span className="text-accent">.</span>Media
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? "text-accent" : "opacity-80 hover:opacity-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ConsultButton className="btn btn-primary !py-2.5 !px-4 text-sm hidden sm:inline-flex">Free Consultation</ConsultButton>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-current/20"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div ref={menu} className="lg:hidden border-t border-line bg-paper h-[calc(100dvh-4rem)] overflow-y-auto">
          <nav className="container-x flex flex-col py-6">
            {nav.map((item, i) => (
              <Link key={item.href} href={item.href} className="flex items-baseline gap-4 border-b border-line py-4 font-display text-2xl font-bold">
                <span className="text-xs text-muted font-sans">0{i + 1}</span>
                {item.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="mt-6 text-muted">
              {site.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
