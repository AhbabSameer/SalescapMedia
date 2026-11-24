"use client";

import { useRef } from "react";
import { animate } from "animejs/animation";

type Item = { q: string; a: string };

/**
 * Accordion built on <details> (works without JS), with the panel height
 * animated so content below slides instead of jumping.
 */
export default function FaqAccordion({ items }: { items: Item[] }) {
  return (
    <div className="divide-y divide-line border-y border-line" data-reveal>
      {items.map((f) => (
        <FaqRow key={f.q} item={f} />
      ))}
    </div>
  );
}

function FaqRow({ item }: { item: Item }) {
  const details = useRef<HTMLDetailsElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const toggle = (e: React.MouseEvent) => {
    const d = details.current;
    const p = panel.current;
    if (!d || !p) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Native toggle; just keep the icon state in sync.
      d.dataset.open = String(!d.open);
      return;
    }
    e.preventDefault();
    if (busy.current) return;
    busy.current = true;

    if (!d.open) {
      d.open = true;
      d.dataset.open = "true";
      const h = p.scrollHeight;
      animate(p, {
        height: [0, h],
        opacity: [0, 1],
        duration: 450,
        ease: "outCubic",
        onComplete: () => {
          p.style.height = "";
          busy.current = false;
        },
      });
    } else {
      d.dataset.open = "false";
      animate(p, {
        height: [p.offsetHeight, 0],
        opacity: [1, 0],
        duration: 350,
        ease: "inOutCubic",
        onComplete: () => {
          d.open = false;
          p.style.height = "";
          p.style.opacity = "";
          busy.current = false;
        },
      });
    }
  };

  return (
    <details ref={details} data-open="false" className="group">
      <summary
        onClick={toggle}
        className="flex cursor-pointer list-none items-center justify-between gap-4 md:gap-6 py-4 md:py-5 font-semibold md:text-lg transition-colors hover:text-accent"
      >
        {item.q}
        <span className="grid h-7 w-7 md:h-8 md:w-8 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color,color,border-color] duration-400 ease-out group-data-[open=true]:rotate-45 group-data-[open=true]:bg-accent group-data-[open=true]:border-accent group-data-[open=true]:text-white">
          +
        </span>
      </summary>
      <div ref={panel} className="overflow-hidden">
        <p className="pb-4 md:pb-5 text-sm md:text-base text-muted leading-relaxed max-w-3xl">{item.a}</p>
      </div>
    </details>
  );
}
