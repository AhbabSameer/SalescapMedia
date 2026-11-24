import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/ui";
import { caseStudies } from "@/lib/data";

export const metadata: Metadata = { title: "Case Studies" };

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero eyebrow="Our work" title="Real numbers from real campaigns." intro="A selection of projects across e-commerce, real estate and healthcare. (Sample content for the prototype.)" />
      <section className="py-12 md:py-20">
        <div className="container-x grid gap-4 md:gap-6" data-reveal="stagger">
          {caseStudies.map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} className="card card-hover group grid md:grid-cols-[1fr_1.4fr] overflow-hidden">
              <div className="p-5 md:p-10 text-white flex flex-col justify-end min-h-32 md:min-h-56" style={{ background: `linear-gradient(135deg, ${c.color}, #0f2a1b)` }}>
                <p className="font-display text-4xl md:text-6xl font-bold">{c.metric}</p>
                <p className="text-sm md:text-base text-white/80">{c.metricLabel}</p>
              </div>
              <div className="p-5 md:p-10 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-wider text-muted">{c.industry}</p>
                <h2 className="font-display text-xl md:text-3xl font-bold mt-1.5 md:mt-2 group-hover:text-accent transition">{c.client}</h2>
                <p className="text-sm md:text-base text-muted mt-2 md:mt-3">{c.summary}</p>
                <div className="mt-4 md:mt-5 flex flex-wrap gap-1.5 md:gap-2">
                  {c.services.map((s) => (
                    <span key={s} className="rounded-full bg-paper border border-line px-3 py-1 text-xs font-medium">{s}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand title="Want results like these?" />
    </>
  );
}
