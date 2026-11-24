import Link from "next/link";
import { ConsultButton } from "./Consultation";
import FaqAccordion from "./FaqAccordion";

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="pt-24 md:pt-40 pb-10 md:pb-20 border-b border-line">
      <div className="container-x" data-reveal="stagger">
        <p className="eyebrow">{eyebrow}</p>
        <h1 data-scramble className="font-display text-[2rem] sm:text-4xl md:text-6xl font-bold mt-3 md:mt-4 max-w-4xl leading-[1.08] tracking-tight">{title}</h1>
        {intro && <p className="mt-4 md:mt-6 text-base md:text-lg text-muted max-w-2xl">{intro}</p>}
        {children && <div className="mt-6 md:mt-8 flex flex-wrap gap-2.5 md:gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, intro, link }: { eyebrow: string; title: string; intro?: string; link?: { href: string; label: string } }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 md:gap-6 mb-7 md:mb-12" data-reveal>
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 data-scramble className="font-display text-[1.7rem] sm:text-3xl md:text-5xl font-bold mt-2 md:mt-3 leading-tight tracking-tight">{title}</h2>
        {intro && <p className="mt-3 md:mt-4 text-muted md:text-lg">{intro}</p>}
      </div>
      {link && (
        <Link href={link.href} className="group text-sm font-semibold inline-flex items-center gap-2">
          {link.label}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      )}
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return <FaqAccordion items={items} />;
}

export function CtaBand({ title = "Not sure where to start?", text = "Book a free 30-minute consultation and we'll show you the quickest wins for your business." }) {
  return (
    <section className="py-12 md:py-20">
      <div className="container-x">
        <div className="rounded-3xl border border-line bg-white p-6 md:p-12 flex flex-wrap items-center justify-between gap-5 md:gap-6" data-reveal>
          <div className="max-w-xl">
            <h2 className="font-display text-xl md:text-3xl font-bold">{title}</h2>
            <p className="mt-2 text-sm md:text-base text-muted">{text}</p>
          </div>
          <ConsultButton />
        </div>
      </div>
    </section>
  );
}

export function Breadcrumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs md:text-sm text-muted mb-5 md:mb-6 flex flex-wrap gap-x-2 gap-y-1">
      {items.map((it, i) => (
        <span key={i} className="flex gap-2">
          {it.href ? <Link href={it.href} className="hover:text-ink transition">{it.label}</Link> : <span className="text-ink">{it.label}</span>}
          {i < items.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  );
}

export function DetailSkeleton() {
  return (
    <section className="pt-24 md:pt-40 pb-16" aria-busy="true">
      <div className="container-x animate-pulse">
        <div className="h-4 w-48 rounded bg-line" />
        <div className="mt-8 h-14 w-14 rounded-2xl bg-line" />
        <div className="mt-6 h-14 w-full max-w-3xl rounded-lg bg-line" />
        <div className="mt-3 h-14 w-2/3 max-w-2xl rounded-lg bg-line" />
        <div className="mt-6 h-5 w-full max-w-xl rounded bg-line" />
        <div className="mt-10 h-56 w-full rounded-3xl bg-line/60" />
      </div>
    </section>
  );
}
