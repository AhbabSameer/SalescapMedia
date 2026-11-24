import Link from "next/link";
import type { Metadata } from "next";
import { PageHero, CtaBand } from "@/components/ui";
import { ConsultButton } from "@/components/Consultation";
import { services, process } from "@/lib/data";
import ProcessTimeline from "@/components/ProcessTimeline";
import ServiceIcon from "@/components/ServiceIcon";

export const metadata: Metadata = { title: "Services", description: "Digital marketing services: ads, social, SEO, content, design and web." };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="A full growth team, on one retainer." intro="Pick one channel or combine several. Every engagement is led by a senior strategist and reported against revenue.">
        <ConsultButton />
        <Link href="/pricing" className="btn btn-ghost">See pricing</Link>
      </PageHero>

      <section className="py-12 md:py-20">
        <div className="container-x grid gap-3 md:gap-4 md:grid-cols-2" data-reveal="stagger">
          {services.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card card-hover group p-5 md:p-9 grid grid-cols-[auto_1fr] gap-4 md:gap-6">
              <span className="grid h-11 w-11 md:h-14 md:w-14 place-items-center rounded-xl md:rounded-2xl bg-accent/10 text-accent text-2xl"><ServiceIcon slug={s.slug} className="h-6 w-6 md:h-7 md:w-7" /></span>
              <div className="min-w-0">
                <span className="text-xs text-muted">0{i + 1} · {s.included.length} deliverables</span>
                <h2 className="font-display text-xl md:text-2xl font-bold mt-1 group-hover:text-accent transition">{s.title}</h2>
                <p className="text-sm md:text-base text-muted mt-1.5 md:mt-2">{s.short}</p>
                <span className="mt-3 md:mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Explore <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white border-y border-line">
        <div className="container-x">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-6 md:mb-10" data-reveal>How every engagement runs</h2>
          <ProcessTimeline steps={process} tone="light" />
        </div>
      </section>

      <CtaBand title="Which service fits you?" />
    </>
  );
}
