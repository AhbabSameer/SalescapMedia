"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs/animation";
import { createAnimatable } from "animejs/animatable";

type Step = { title: string; text: string };

/**
 * A line that draws through the steps as you scroll. Horizontal on desktop,
 * vertical on mobile. Each step lights up when the line reaches its dot.
 */
export default function ProcessTimeline({ steps, tone = "dark" }: { steps: Step[]; tone?: "dark" | "light" }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const trk = track.current!;
    const fil = fill.current!;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    const dots = items.map((li) => li.querySelector<HTMLElement>("[data-dot]")!);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let vertical = false;
    let length = 0;
    let offsets: number[] = [];

    // Place the track from the first dot's centre to the last dot's centre.
    const layout = () => {
      const base = el.getBoundingClientRect();
      const centers = dots.map((d) => {
        const r = d.getBoundingClientRect();
        return { x: r.left + r.width / 2 - base.left, y: r.top + r.height / 2 - base.top };
      });
      const first = centers[0];
      const last = centers[centers.length - 1];
      vertical = Math.abs(last.y - first.y) > Math.abs(last.x - first.x);
      length = vertical ? last.y - first.y : last.x - first.x;
      offsets = centers.map((c) => (vertical ? c.y - first.y : c.x - first.x));
      Object.assign(trk.style, vertical
        ? { left: `${first.x - 1}px`, top: `${first.y}px`, width: "2px", height: `${length}px` }
        : { left: `${first.x}px`, top: `${first.y - 1}px`, width: `${length}px`, height: "2px" });
      fil.style.transformOrigin = vertical ? "top" : "left";
    };

    const setActive = (i: number, on: boolean) => {
      const li = items[i];
      if ((li.dataset.active === "true") === on) return;
      li.dataset.active = String(on);
      if (on && !reduce) animate(dots[i], { scale: [1, 1.45, 1], duration: 500, ease: "outBack(2)" });
    };

    layout();

    if (reduce) {
      fil.style.transform = "none";
      items.forEach((_, i) => setActive(i, true));
      window.addEventListener("resize", layout);
      return () => window.removeEventListener("resize", layout);
    }

    const smooth = createAnimatable(fil, {
      scaleX: { duration: 250 },
      scaleY: { duration: 250 },
      ease: "out(3)",
    });

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const base = el.getBoundingClientRect();
      let progress: number;
      if (vertical) {
        // Line tip follows a point 70% down the screen.
        const startY = base.top + parseFloat(trk.style.top);
        progress = (vh * 0.7 - startY) / length;
      } else {
        // Draws while the row travels from 85% to 40% of the screen height.
        progress = (vh * 0.85 - base.top) / (vh * 0.45);
      }
      progress = Math.max(0, Math.min(1, progress));
      if (vertical) {
        smooth.scaleX(1);
        smooth.scaleY(progress);
      } else {
        smooth.scaleY(1);
        smooth.scaleX(progress);
      }
      const tip = progress * length;
      offsets.forEach((o, i) => setActive(i, tip >= o - 1));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      layout();
      onScroll();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const dark = tone === "dark";
  return (
    <div ref={root} className="relative">
      <div ref={track} className={`absolute ${dark ? "bg-white/15" : "bg-line"}`} aria-hidden>
        <div ref={fill} className="h-full w-full bg-accent" style={{ transform: "scale(0)" }} />
      </div>
      <ol className="relative grid gap-10 md:grid-cols-5 md:gap-0">
        {steps.map((s, i) => (
          <li
            key={s.title}
            data-step
            data-active="false"
            className="group relative pl-12 md:pl-0 md:pr-8"
          >
            <span
              data-dot
              className={`absolute left-0 top-0 md:static grid h-6 w-6 place-items-center rounded-full border-2 transition-colors duration-300 ${
                dark ? "border-white/25 bg-ink" : "border-line bg-white"
              } group-data-[active=true]:border-accent group-data-[active=true]:bg-accent`}
            >
              <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${dark ? "bg-white/30" : "bg-line"} group-data-[active=true]:bg-white`} />
            </span>
            <div className="transition-opacity duration-500 opacity-40 group-data-[active=true]:opacity-100 md:mt-6">
              <span className="font-display text-accent text-sm font-bold">0{i + 1}</span>
              <h3 className="font-display text-xl font-bold mt-2">{s.title}</h3>
              <p className={`text-sm mt-2 ${dark ? "text-white/65" : "text-muted"}`}>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
