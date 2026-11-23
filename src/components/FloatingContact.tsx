"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs/animation";
import { stagger } from "animejs/utils";
import { site } from "@/lib/site";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43zm8.03-17.47A11.3 11.3 0 0 0 12.05.7C5.8.7.7 5.8.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.4l5.82-1.53a11.3 11.3 0 0 0 5.62 1.43h.01c6.25 0 11.34-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02z" />
  </svg>
);

const MessengerIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.35.27.57l.05 1.78a.8.8 0 0 0 1.12.71l1.99-.88c.17-.07.36-.09.53-.04.91.25 1.88.39 2.9.39 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63z" />
  </svg>
);

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    if (list.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animate(list.current.children, {
        opacity: [0, 1],
        translateY: [12, 0],
        scale: [0.9, 1],
        delay: stagger(60, { reversed: true }),
        duration: 350,
        ease: "outBack(1.4)",
      });
    }
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const msg = encodeURIComponent("Hi Salescap Media! I'd like to know more about your services.");

  return (
    <div ref={root} className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div ref={list} className="flex flex-col items-end gap-3">
          <a
            href={`https://wa.me/${site.whatsapp}?text=${msg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-full bg-white py-2 pl-4 pr-2 shadow-lg ring-1 ring-black/5 hover:-translate-y-0.5 transition"
          >
            <span className="text-sm font-semibold">WhatsApp</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366] text-white">
              <WhatsAppIcon />
            </span>
          </a>
          <a
            href={`https://m.me/${site.messenger}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-full bg-white py-2 pl-4 pr-2 shadow-lg ring-1 ring-black/5 hover:-translate-y-0.5 transition"
          >
            <span className="text-sm font-semibold">Messenger</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#00B2FF] to-[#A033FF] text-white">
              <MessengerIcon />
            </span>
          </a>
          <a
            href={site.phoneHref}
            className="flex items-center gap-3 rounded-full bg-white py-2 pl-4 pr-2 shadow-lg ring-1 ring-black/5 hover:-translate-y-0.5 transition"
          >
            <span className="text-sm font-semibold">Call us</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white text-lg">✆</span>
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact options" : "Chat with us"}
        aria-expanded={open}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition hover:scale-105 active:scale-95"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 motion-reduce:hidden" />}
        <span className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`}>
          {open ? <span className="text-xl leading-none">✕</span> : <WhatsAppIcon />}
        </span>
      </button>
    </div>
  );
}
