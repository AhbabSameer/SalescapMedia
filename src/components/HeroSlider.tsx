"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { animate } from "animejs/animation";
import { stagger } from "animejs/utils";
import { ConsultButton } from "./Consultation";

type Slide = {
  tab: string;
  eyebrow: string;
  title: string;
  highlight: string;
  text: string;
  link: { href: string; label: string };
  stats: { value: string; label: string }[];
  trust: string;
};

// Placeholder copy. Structure follows the reference: 4 slides, each with
// eyebrow, headline, text, two buttons, two stats and a trust line.
const slides: Slide[] = [
  {
    tab: "Salescap",
    eyebrow: "Digital marketing agency · Dhaka",
    title: "We turn your marketing into measurable sales.",
    highlight: "sales.",
    text: "Ads, content, SEO and websites from one senior team, reported against the only number that matters: revenue.",
    link: { href: "/case-studies", label: "See our work" },
    stats: [
      { value: "50+", label: "Brands grown" },
      { value: "4x", label: "Average return on ad spend" },
    ],
    trust: "Meta · Google · TikTok · YouTube · Shopify",
  },
  {
    tab: "Paid Ads",
    eyebrow: "Performance marketing",
    title: "Every taka tracked. Every ad accountable.",
    highlight: "accountable.",
    text: "Meta, Google and TikTok campaigns built around cost per sale, with tracking that shows exactly what each ad earns.",
    link: { href: "/services/meta-ads", label: "Explore paid ads" },
    stats: [
      { value: "-35%", label: "Typical drop in cost per lead" },
      { value: "5", label: "Ad platforms managed" },
    ],
    trust: "Meta · Google · TikTok · LinkedIn · YouTube",
  },
  {
    tab: "Social & Content",
    eyebrow: "Social media & content",
    title: "Content that stops the scroll and starts sales.",
    highlight: "sales.",
    text: "Reels, product shoots and page management from an in-house creative team, in Bangla and English.",
    link: { href: "/services/content-video", label: "Explore content" },
    stats: [
      { value: "30", label: "Posts per month" },
      { value: "48h", label: "Video edit turnaround" },
    ],
    trust: "Facebook · Instagram · TikTok · YouTube",
  },
  {
    tab: "Results",
    eyebrow: "Selected work",
    title: "Results, not just reports.",
    highlight: "Results,",
    text: "Real growth for e-commerce, real estate and healthcare brands across Bangladesh.",
    link: { href: "/case-studies", label: "All case studies" },
    stats: [
      { value: "4.1x", label: "ROAS · Fashion brand" },
      { value: "-45%", label: "Cost per lead · Real estate" },
    ],
    trust: "E-commerce · Real estate · Healthcare",
  },
];

const DURATION = 7000; // ms per slide
const pad = (n: number) => String(n).padStart(2, "0");

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false); // pause button
  const [hold, setHold] = useState(false); // hover / keyboard focus
  const reduce = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchX = useRef<number | null>(null);

  const count = slides.length;
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  const running = !paused && !hold && !reduce;

  // Animate the incoming slide's content.
  useEffect(() => {
    const el = slideRefs.current[index];
    if (!el || reduce) return;
    animate(el.querySelectorAll(".w > span"), {
      translateY: ["110%", "0%"],
      duration: 900,
      delay: stagger(45, { start: 120 }),
      ease: "outExpo",
    });
    animate(el.querySelectorAll("[data-in]"), {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 700,
      delay: stagger(70, { start: 300 }),
      ease: "outCubic",
    });
  }, [index, reduce]);

  return (
    <section
      className="relative overflow-hidden bg-hero text-white on-dark grain"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={() => setHold(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <div className="container-x pt-32 md:pt-40 pb-8 min-h-[100svh] flex flex-col">
        {/* All slides share one grid cell so the hero keeps the height of the tallest slide. */}
        <div className="grid flex-1 items-center">
          {slides.map((s, i) => {
            const active = i === index;
            const Heading = i === 0 ? "h1" : "h2";
            return (
              <div
                key={s.tab}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${s.tab}`}
                aria-hidden={!active}
                inert={!active}
                className={`hero-slide [grid-area:1/1] transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-end">
                  <div>
                    <p className="eyebrow" data-in>
                      {s.eyebrow}
                    </p>
                    <Heading className="mt-5 font-display text-[2.5rem] leading-[1.03] sm:text-6xl lg:text-7xl font-bold tracking-tight">
                      {s.title.split(" ").map((word, w) => (
                        <span key={w} className="w inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.25em]">
                          <span className={`word-in inline-block ${word === s.highlight ? "text-accent" : ""}`}>{word}</span>
                        </span>
                      ))}
                    </Heading>
                    <p className="mt-6 max-w-xl text-lg text-white/75" data-in>
                      {s.text}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3" data-in>
                      <ConsultButton />
                      <Link href={s.link.href} className="btn btn-ghost">
                        {s.link.label}
                      </Link>
                    </div>
                    <p className="mt-8 text-sm text-white/50" data-in>
                      {s.trust}
                    </p>
                  </div>
                  <dl className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                    {s.stats.map((st) => (
                      <div key={st.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6" data-in>
                        <dd className="font-display text-4xl md:text-5xl font-bold text-accent">{st.value}</dd>
                        <dt className="mt-1 text-sm text-white/70">{st.label}</dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls: numbered tabs with progress, counter, pause, prev/next */}
        <div className="mt-12 flex items-center gap-6 border-t border-white/10 pt-5">
          <div className="hidden md:grid flex-1 grid-cols-4 gap-6">
            {slides.map((s, i) => (
              <button
                key={s.tab}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}: ${s.tab}`}
                aria-current={i === index}
                className={`group text-left transition-opacity ${i === index ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
              >
                <span className="block h-0.5 w-full overflow-hidden rounded bg-white/15">
                  {i === index && (
                    <span
                      key={index}
                      className={`block h-full bg-accent ${reduce ? "" : "hero-progress"}`}
                      style={{ animationDuration: `${DURATION}ms`, animationPlayState: running ? "running" : "paused" }}
                      onAnimationEnd={next}
                    />
                  )}
                </span>
                <span className="mt-3 block text-sm">
                  <span className="text-white/50 mr-2">{pad(i + 1)}</span>
                  {s.tab}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile progress (tabs hidden on small screens) */}
          <span className="md:hidden flex-1 h-0.5 overflow-hidden rounded bg-white/15">
            <span
              key={index}
              className={`block h-full bg-accent ${reduce ? "" : "hero-progress"}`}
              style={{ animationDuration: `${DURATION}ms`, animationPlayState: running ? "running" : "paused" }}
              onAnimationEnd={next}
            />
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-display text-sm tabular-nums mr-2" aria-live="polite">
              {pad(index + 1)} <span className="text-white/40">/ {pad(count)}</span>
            </span>
            {!reduce && (
              <button onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play slideshow" : "Pause slideshow"} className="hero-ctrl">
                {paused ? "▶" : "❚❚"}
              </button>
            )}
            <button onClick={prev} aria-label="Previous slide" className="hero-ctrl">
              ←
            </button>
            <button onClick={next} aria-label="Next slide" className="hero-ctrl">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
