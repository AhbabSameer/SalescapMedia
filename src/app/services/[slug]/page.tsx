import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumb, CtaBand, DetailSkeleton, Faq } from "@/components/ui";
import { ConsultButton } from "@/components/Consultation";
import { caseStudies, process, services } from "@/lib/data";
import ProcessTimeline from "@/components/ProcessTimeline";
import ServiceIcon from "@/components/ServiceIcon";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.title, description: s.short } : {};
}

export default function ServicePage(props: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <Service params={props.params} />
    </Suspense>
  );
}

async function Service({ params }: { params: PageProps<"/services/[slug]">["params"] }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const related = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 border-b border-line">
        <div className="container-x">
          <Breadcrumb items={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { label: s.title }]} />
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-end" data-reveal="stagger">
            <div>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/10 text-accent text-2xl"><ServiceIcon slug={s.slug} className="h-7 w-7" /></span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mt-6 leading-[1.05] tracking-tight">{s.title}</h1>
              <p className="mt-6 text-lg text-muted max-w-2xl">{s.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ConsultButton />
                <Link href="/case-studies" className="btn btn-ghost">See results</Link>
              </div>
            </div>
            <dl className="grid grid-cols-3 lg:grid-cols-1 gap-4">
              {s.outcomes.map((o) => (
                <div key={o.label} className="card p-5">
                  <dd className="font-display text-3xl font-bold">{o.value}</dd>
                  <dt className="text-sm text-muted mt-1">{o.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div data-reveal>
            <p className="eyebrow">What&apos;s included</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">Everything handled, end to end.</h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2" data-reveal="stagger">
            {s.included.map((item) => (
              <li key={item} className="card p-5 flex gap-3 items-start">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-white text-xs">✓</span>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 bg-ink text-white">
        <div className="container-x">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10" data-reveal>Our process</h2>
          <ProcessTimeline steps={process} tone="dark" />
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10" data-reveal>Related results</h2>
          <div className="grid gap-5 md:grid-cols-3" data-reveal="stagger">
            {caseStudies.map((c) => (
              <Link key={c.slug} href={`/case-studies/${c.slug}`} className="card card-hover p-6">
                <p className="font-display text-4xl font-bold" style={{ color: c.color }}>{c.metric}</p>
                <p className="text-sm text-muted">{c.metricLabel}</p>
                <h3 className="font-semibold mt-4">{c.client}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-line">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="font-display text-3xl md:text-4xl font-bold" data-reveal>{s.title} FAQ</h2>
          <Faq items={s.faqs} />
        </div>
      </section>

      <section className="pt-20">
        <div className="container-x">
          <h2 className="font-display text-2xl font-bold mb-6" data-reveal>Pairs well with</h2>
          <div className="grid gap-4 md:grid-cols-3" data-reveal="stagger">
            {related.map((r) => (
              <Link key={r.slug} href={`/services/${r.slug}`} className="card card-hover p-6">
                <h3 className="font-display text-lg font-bold">{r.title}</h3>
                <p className="text-sm text-muted mt-1">{r.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={`Ready to start with ${s.title.toLowerCase()}?`} />
    </>
  );
}
