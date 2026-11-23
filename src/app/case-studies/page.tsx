import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/ui";
import { caseStudies } from "@/lib/data";

export const metadata: Metadata = { title: "Case Studies" };

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero eyebrow="Our work" title="Real numbers from real campaigns." intro="A selection of projects across e-commerce, real estate and healthcare. (Sample content for the prototype.)" />
      <section className="py-20">
        <div className="container-x grid gap-6" data-reveal="stagger">
          {caseStudies.map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} className="card card-hover group grid md:grid-cols-[1fr_1.4fr] overflow-hidden">
              <div className="p-8 md:p-10 text-white flex flex-col justify-end min-h-56" style={{ background: `linear-gradient(135deg, ${c.color}, #0f2a1b)` }}>
                <p className="font-display text-6xl font-bold">{c.metric}</p>
                <p className="text-white/80">{c.metricLabel}</p>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-wider text-muted">{c.industry}</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold mt-2 group-hover:text-accent transition">{c.client}</h2>
                <p className="text-muted mt-3">{c.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
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
