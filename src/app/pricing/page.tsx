import type { Metadata } from "next";
import { ConsultButton } from "@/components/Consultation";
import { CtaBand, Faq, PageHero } from "@/components/ui";
import { tiers } from "@/lib/data";

export const metadata: Metadata = { title: "Pricing", description: "Simple monthly retainers in BDT. Ad spend billed separately." };

const pricingFaq = [
  { q: "Is ad spend included?", a: "No. Ad spend is paid directly to Meta, Google or TikTok from your own account, so you keep full ownership." },
  { q: "Minimum contract?", a: "Three months, then month-to-month with 30 days' notice." },
  { q: "Can I start small and upgrade?", a: "Yes. Most clients start on Starter and move up once results come in." },
  { q: "Do you offer one-off projects?", a: "Yes: websites, branding and account audits are quoted per project." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Simple retainers. No surprises." intro="Flat monthly fees in BDT. Ad spend is billed separately by the platforms. (Placeholder prices for the prototype.)" />

      <section className="py-20">
        <div className="container-x grid gap-5 lg:grid-cols-3 items-stretch" data-reveal="stagger">
          {tiers.map((t) => (
            <div key={t.name} className={`relative rounded-3xl p-8 flex flex-col ${t.popular ? "bg-ink text-white on-dark shadow-2xl lg:-my-4" : "card"}`}>
              {t.popular && <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">Most popular</span>}
              <h2 className="font-display text-2xl font-bold">{t.name}</h2>
              <p className={`text-sm mt-1 ${t.popular ? "text-white/60" : "text-muted"}`}>{t.blurb}</p>
              <p className="mt-6">
                <span className="font-display text-5xl font-bold">{t.price}</span>
                <span className={t.popular ? "text-white/60" : "text-muted"}>{t.period}</span>
              </p>
              <ul className="mt-8 grid gap-3 text-sm flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="text-accent">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <ConsultButton className={`btn mt-8 justify-center ${t.popular ? "btn-primary" : "btn-ghost"}`}>
                {t.price === "Custom" ? "Talk to us" : "Get started"}
              </ConsultButton>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-white border-y border-line">
        <div className="container-x">
          <h2 className="font-display text-3xl font-bold mb-8" data-reveal>Add-ons</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
            {[
              ["Landing page", "from ৳25,000"],
              ["Product shoot", "from ৳15,000"],
              ["Brand identity", "from ৳40,000"],
              ["Influencer campaign", "from ৳30,000"],
            ].map(([n, p]) => (
              <div key={n} className="rounded-2xl bg-paper p-6">
                <h3 className="font-semibold">{n}</h3>
                <p className="text-muted text-sm mt-1">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="font-display text-3xl md:text-4xl font-bold" data-reveal>Pricing questions</h2>
          <Faq items={pricingFaq} />
        </div>
      </section>
      <CtaBand title="Get a tailored quote" text="Tell us your goals and we'll recommend the right package within one business day." />
    </>
  );
}
