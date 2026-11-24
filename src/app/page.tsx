import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import { Faq, SectionHead } from "@/components/ui";
import { caseStudies, faqs, posts, process, services, testimonials, formatDate } from "@/lib/data";
import ProcessTimeline from "@/components/ProcessTimeline";
import ServiceIcon from "@/components/ServiceIcon";
import MobileCarousel from "@/components/MobileCarousel";

const platforms = ["Meta", "Google", "TikTok", "YouTube", "LinkedIn", "Shopify", "WhatsApp Business", "HubSpot"];

export default function Home() {
  return (
    <>
      <HeroSlider />

      {/* platform marquee */}
      <div className="bg-hero border-t border-white/10 py-4 md:py-6 overflow-hidden" aria-label="Platforms we work with">
        <div className="marquee-track flex w-max gap-8 md:gap-14 text-white/40 font-display text-base md:text-xl font-semibold whitespace-nowrap">
          {[...platforms, ...platforms].map((p, i) => (
            <span key={i} aria-hidden={i >= platforms.length}>
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="py-14 md:py-32">
        <div className="container-x">
          <SectionHead eyebrow="What we do" title="Everything you need to grow, under one roof." link={{ href: "/services", label: "All services" }} />
          <MobileCarousel label="Services" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
            {services.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card card-hover group p-5 md:p-6 flex flex-col md:min-h-60">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent text-lg"><ServiceIcon slug={s.slug} className="h-6 w-6" /></span>
                  <span className="text-xs text-muted">0{i + 1}</span>
                </div>
                <h3 className="font-display text-lg md:text-xl font-bold mt-4 md:mt-6">{s.title}</h3>
                <p className="text-sm text-muted mt-2 flex-1">{s.short}</p>
                <span className="mt-4 md:mt-5 text-sm font-semibold inline-flex items-center gap-1.5">
                  Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </MobileCarousel>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-14 md:py-32 bg-white border-y border-line">
        <div className="container-x grid gap-8 md:gap-14 lg:grid-cols-2 items-start">
          <div data-reveal>
            <p className="eyebrow">Why Salescap</p>
            <h2 className="font-display text-[1.7rem] sm:text-3xl md:text-5xl font-bold mt-2 md:mt-3 leading-tight tracking-tight">A small senior team that answers on WhatsApp.</h2>
            <p className="mt-4 md:mt-6 md:text-lg text-muted">
              No account handoffs to juniors, no confusing reports. You talk directly to the people running your campaigns.
            </p>
            <Link href="/about" className="btn btn-ghost mt-5 md:mt-8">
              About us
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4" data-reveal="stagger">
            {[
              ["Revenue-first reporting", "Monthly reports tied to leads and sales, not likes."],
              ["Creative in-house", "Designers, editors and copywriters on one team."],
              ["Fast response", "Same-day replies on WhatsApp during business hours."],
              ["No lock-in", "Month-to-month after the first three months."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl bg-paper p-4 md:p-6">
                <span className="block h-1.5 w-8 rounded-full bg-accent" />
                <h3 className="font-semibold text-[0.95rem] leading-snug md:text-lg mt-3 md:mt-5">{t}</h3>
                <p className="text-xs md:text-sm text-muted mt-1.5 md:mt-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-14 md:py-32">
        <div className="container-x">
          <SectionHead eyebrow="Selected work" title="Results our clients can take to the bank." link={{ href: "/case-studies", label: "All case studies" }} />
          <MobileCarousel label="Case studies" className="grid gap-5 md:grid-cols-3" data-reveal="stagger">
            {caseStudies.map((c) => (
              <Link key={c.slug} href={`/case-studies/${c.slug}`} className="card card-hover group overflow-hidden flex flex-col">
                <div className="aspect-[16/9] md:aspect-[4/3] p-5 md:p-6 flex flex-col justify-end text-white" style={{ background: `linear-gradient(135deg, ${c.color}, #0f2a1b)` }}>
                  <p className="font-display text-4xl md:text-5xl font-bold">{c.metric}</p>
                  <p className="text-white/80 text-sm">{c.metricLabel}</p>
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-xs text-muted uppercase tracking-wider">{c.industry}</p>
                  <h3 className="font-display text-lg font-bold mt-2 group-hover:text-accent transition">{c.client}</h3>
                  <p className="text-sm text-muted mt-2">{c.summary}</p>
                </div>
              </Link>
            ))}
          </MobileCarousel>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-14 md:py-32 bg-ink text-white">
        <div className="container-x">
          <div className="mb-8 md:mb-14 max-w-2xl" data-reveal>
            <p className="eyebrow">How we work</p>
            <h2 className="font-display text-[1.7rem] sm:text-3xl md:text-5xl font-bold mt-2 md:mt-3 leading-tight tracking-tight">From first call to compounding growth.</h2>
          </div>
          <ProcessTimeline steps={process} tone="dark" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-14 md:py-32">
        <div className="container-x">
          <SectionHead eyebrow="Client words" title="What it's like to work with us." />
          <MobileCarousel label="Testimonials" className="grid gap-5 md:grid-cols-3" data-reveal="stagger">
            {testimonials.map((t, i) => (
              <figure key={i} className="card p-5 md:p-7 flex flex-col">
                <span className="font-display text-4xl md:text-5xl text-accent leading-none">“</span>
                <blockquote className="mt-1 md:mt-2 md:text-lg flex-1">{t.quote}</blockquote>
                <figcaption className="mt-4 md:mt-6 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="block text-muted">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </MobileCarousel>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-14 md:py-32 bg-white border-y border-line">
        <div className="container-x">
          <SectionHead eyebrow="Insights" title="Practical marketing advice, written for Bangladesh." link={{ href: "/blog", label: "All articles" }} />
          <MobileCarousel label="Articles" className="grid gap-5 md:grid-cols-3" data-reveal="stagger">
            {posts.slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <div className="aspect-[16/10] rounded-2xl bg-paper border border-line grid place-items-center overflow-hidden">
                  <span className="font-display text-2xl font-bold text-ink/15 transition-transform duration-500 group-hover:scale-110">{p.category}</span>
                </div>
                <p className="mt-3 md:mt-4 text-xs text-muted">
                  {p.category} · {formatDate(p.date)} · {p.readTime} min
                </p>
                <h3 className="font-display text-lg font-bold mt-2 group-hover:text-accent transition">{p.title}</h3>
              </Link>
            ))}
          </MobileCarousel>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-32">
        <div className="container-x grid gap-6 md:gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div data-reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="font-display text-[1.7rem] sm:text-3xl md:text-5xl font-bold mt-2 md:mt-3 leading-tight tracking-tight">Questions, answered.</h2>
            <p className="mt-3 md:mt-4 text-muted">Can&apos;t find yours? Message us on WhatsApp.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>
    </>
  );
}
