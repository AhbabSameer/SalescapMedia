"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { animate } from "animejs/animation";
import ContactForm from "./ContactForm";

const Ctx = createContext<() => void>(() => {});
export const useConsultation = () => useContext(Ctx);

/** Auto pop-up: opens the form every 60 seconds (counted from page load or the last close). */
const AUTO_POPUP_MS = 60 * 1000;
export const SENT_KEY = "salescap-consult-sent";

const alreadySent = () => {
  try {
    return sessionStorage.getItem(SENT_KEY) === "1";
  } catch {
    return false;
  }
};

export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const openModal = useCallback(() => setOpen(true), []);
  const pathname = usePathname();
  const pathRef = useRef(pathname);
  useEffect(() => {
    pathRef.current = pathname;
  }, [pathname]);

  // Every 60 seconds while the modal is closed, open it. Skipped once the visitor
  // has submitted the form this session, and on /contact (the form is already there).
  // If the tab is in the background, it waits until the visitor comes back.
  useEffect(() => {
    if (open) return;
    const show = () => {
      if (alreadySent() || pathRef.current === "/contact") return schedule();
      setOpen(true);
    };
    const onVisible = () => {
      if (!document.hidden) {
        document.removeEventListener("visibilitychange", onVisible);
        show();
      }
    };
    let timer: number;
    function schedule() {
      timer = window.setTimeout(() => {
        if (document.hidden) document.addEventListener("visibilitychange", onVisible);
        else show();
      }, AUTO_POPUP_MS);
    }
    schedule();
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [open]);

  const close = useCallback(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !panel.current) return setOpen(false);
    animate(backdrop.current!, { opacity: 0, duration: 200, ease: "outQuad" });
    animate(panel.current, {
      opacity: 0,
      translateY: 16,
      scale: 0.98,
      duration: 200,
      ease: "outQuad",
      onComplete: () => setOpen(false),
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animate(backdrop.current!, { opacity: [0, 1], duration: 250, ease: "outQuad" });
      animate(panel.current!, { opacity: [0, 1], translateY: [24, 0], scale: [0.98, 1], duration: 450, ease: "outExpo" });
    }
    panel.current?.querySelector("input")?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <Ctx.Provider value={openModal}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="consult-title">
          <div ref={backdrop} className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={close} />
          <div ref={panel} className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-paper p-5 sm:p-8 shadow-2xl">
            <button onClick={close} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 transition">
              ✕
            </button>
            <p className="eyebrow">Free · 30 minutes · No obligation</p>
            <h2 id="consult-title" className="font-display text-xl sm:text-2xl font-bold mt-2 mb-4 sm:mb-6 pr-8">
              Book your free consultation
            </h2>
            <ContactForm compact />
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

export function ConsultButton({ className = "btn btn-primary", children = "Free Consultation →" }: { className?: string; children?: React.ReactNode }) {
  const open = useConsultation();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
