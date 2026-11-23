import Link from "next/link";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/data";
import { ConsultButton } from "./Consultation";

export default function Footer() {
  return (
    <footer className="bg-ink text-white on-dark">
      <div className="container-x py-20">
        <div className="grid gap-10 rounded-3xl bg-ink-2 p-8 md:p-12 md:grid-cols-[1.4fr_1fr] items-center grain" data-reveal>
          <div>
            <p className="eyebrow">Free 30-minute consultation</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 leading-tight">Let&apos;s grow your sales.</h2>
            <p className="mt-4 text-white/70 max-w-md">Tell us about your business. We&apos;ll reply by email within one business day with times for a call.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <ConsultButton />
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              WhatsApp us
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl font-bold">
              Salescap<span className="text-accent">.</span>Media
            </p>
            <p className="mt-3 text-sm text-white/60 max-w-xs">{site.tagline}</p>
            <div className="mt-5 grid gap-1 text-sm text-white/80">
              <a href={site.phoneHref} className="hover:text-accent transition">{site.phone}</a>
              <a href={`mailto:${site.email}`} className="hover:text-accent transition">{site.email}</a>
              <span className="text-white/60">{site.address}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/50 mb-4">Company</p>
            <ul className="grid gap-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-white/80 hover:text-accent transition">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/50 mb-4">Services</p>
            <ul className="grid gap-2 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-white/80 hover:text-accent transition">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/50 mb-4">Follow</p>
            <ul className="grid gap-2 text-sm">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent transition">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <a href="#top" className="hover:text-white transition">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
