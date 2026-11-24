import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/ui";
import { stats } from "@/lib/data";
import MobileCarousel from "@/components/MobileCarousel";

export const metadata: Metadata = { title: "About" };

const values = [
  ["Honest numbers", "We report what happened, good or bad, and what we'll change."],
  ["Sales over likes", "Every campaign is tied to a business result."],
  ["Speed", "Quick replies, quick launches, quick iterations."],
  ["Craft", "Creative that looks good and performs."],
];

const team = [
  { name: "Founder Name", role: "Founder & Strategy" },
  { name: "Team Member", role: "Head of Paid Media" },
  { name: "Team Member", role: "Creative Lead" },
  { name: "Team Member", role: "SEO & Web" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="We started Salescap to make marketing accountable." intro="Too many businesses pay for marketing without knowing what it returns. We built a team that measures everything against sales." />

      <section className="py-12 md:py-20">
        <div className="container-x grid gap-5 md:gap-12 lg:grid-cols-2">
          <div data-reveal>
            <p className="eyebrow">Our story</p>
            <p className="font-display text-xl md:text-3xl font-bold mt-3 md:mt-4 leading-snug">
              Salescap Media is a Dhaka-based digital marketing studio combining strategy, creative and media buying under one roof.
            </p>
          </div>
          <div className="md:text-lg text-muted grid gap-3 md:gap-5" data-reveal>
            <p>Placeholder story: how the agency started, who founded it, and the problem it set out to solve for Bangladeshi businesses.</p>
            <p>Our mission is to give growing brands the kind of marketing team that used to be available only to large companies, with clear pricing and honest reporting.</p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-ink text-white">
        <dl className="container-x grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-4xl md:text-5xl font-bold" data-count={s.value} data-suffix={s.suffix}>{s.value}{s.suffix}</dd>
              <dt className="text-sm md:text-base text-white/60 mt-1">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-x">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-6 md:mb-10" data-reveal>What we believe</h2>
          <MobileCarousel label="Our values" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
            {values.map(([t, d], i) => (
              <div key={t} className="card p-5 md:p-6">
                <span className="font-display text-accent font-bold">0{i + 1}</span>
                <h3 className="font-semibold text-lg mt-3">{t}</h3>
                <p className="text-sm text-muted mt-2">{d}</p>
              </div>
            ))}
          </MobileCarousel>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white border-y border-line">
        <div className="container-x">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-6 md:mb-10" data-reveal>The team</h2>
          <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
            {team.map((m, i) => (
              <div key={i}>
                <div className="aspect-square md:aspect-[4/5] rounded-2xl bg-paper border border-line grid place-items-center text-3xl md:text-4xl text-ink/15 font-display font-bold">
                  {m.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <h3 className="font-semibold text-sm md:text-base mt-2.5 md:mt-4">{m.name}</h3>
                <p className="text-xs md:text-sm text-muted">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Work with us" />
    </>
  );
}
