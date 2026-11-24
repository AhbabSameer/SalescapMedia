"use client";

import { Children, useEffect, useRef, useState } from "react";

const MOBILE = "(max-width: 767px)";

/**
 * Renders its children in `className` (normally a grid) on tablet and desktop.
 * On phones (< 768px) the same element becomes a swipeable, auto-advancing
 * carousel with dots, so long lists don't stretch the page.
 *
 * Auto-advance only runs while the carousel is on screen, pauses for a while
 * after the visitor touches it, and is off for reduced-motion users.
 */
export default function MobileCarousel({
  children,
  className = "",
  interval = 4500,
  label = "Carousel",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  interval?: number;
  label?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className">) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  // Keep the dots in sync with the scroll position.
  useEffect(() => {
    const el = track.current!;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!el.children.length) return;
        // At the end of the track the last card can't reach the left edge.
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
        setActive(atEnd ? el.children.length - 1 : activeIndex(el));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Auto-advance on phones only.
  useEffect(() => {
    const el = track.current!;
    const mq = window.matchMedia(MOBILE);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || count < 2) return;

    let visible = false;
    let holdUntil = 0;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.5 });
    io.observe(el);

    const hold = () => (holdUntil = Date.now() + interval * 2);
    el.addEventListener("pointerdown", hold, { passive: true });
    el.addEventListener("touchstart", hold, { passive: true });
    el.addEventListener("focusin", hold);

    const timer = window.setInterval(() => {
      if (!mq.matches || !visible || document.hidden || Date.now() < holdUntil) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      const next = atEnd ? 0 : Math.min(activeIndex(el) + 1, el.children.length - 1);
      scrollToItem(el, next);
    }, interval);

    return () => {
      window.clearInterval(timer);
      io.disconnect();
      el.removeEventListener("pointerdown", hold);
      el.removeEventListener("touchstart", hold);
      el.removeEventListener("focusin", hold);
    };
  }, [count, interval]);

  return (
    <div>
      <div ref={track} className={`m-carousel ${className}`} aria-roledescription="carousel" aria-label={label} {...rest}>
        {children}
      </div>
      {count > 1 && (
        <div className="m-carousel-dots md:hidden" aria-hidden>
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={() => scrollToItem(track.current!, i)}
              className={i === active ? "is-active" : ""}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function activeIndex(el: HTMLElement) {
  const items = el.children;
  const start = (items[0] as HTMLElement).offsetLeft;
  let best = 0;
  let dist = Infinity;
  for (let i = 0; i < items.length; i++) {
    const d = Math.abs((items[i] as HTMLElement).offsetLeft - start - el.scrollLeft);
    if (d < dist) {
      dist = d;
      best = i;
    }
  }
  return best;
}

function scrollToItem(el: HTMLElement, i: number) {
  const items = el.children;
  const target = items[i] as HTMLElement | undefined;
  if (!target) return;
  const start = (items[0] as HTMLElement).offsetLeft;
  el.scrollTo({ left: target.offsetLeft - start, behavior: "smooth" });
}
