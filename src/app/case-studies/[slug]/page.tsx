import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumb, CtaBand, DetailSkeleton } from "@/components/ui";
import { caseStudies } from "@/lib/data";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const c = caseStudies.find((x) => x.slug === slug);
  return c ? { title: `${c.client} case study`, description: c.summary } : {};
}

export default function CaseStudyPage(props: PageProps<"/case-studies/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <CaseStudy params={props.params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: { params: PageProps<"/case-studies/[slug]">["params"] }) {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) notFound();
  const more = caseStudies.filter((x) => x.slug !== c.slug);

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16">
        <div className="container-x">
          <Breadcrumb items={[{ href: "/", label: "Home" }, { href: "/case-studies", label: "Work" }, { label: c.client }]} />
          <div data-reveal="stagger">
            <p className="eyebrow">Case study · {c.industry}</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 max-w-4xl leading-[1.05] tracking-tight">{c.summary}</h1>
            <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-line py-6 text-sm">
              <div><dt className="text-muted">Client</dt><dd className="font-semibold mt-1">{c.client}</dd></div>
              <div><dt className="text-muted">Industry</dt><dd className="font-semibold mt-1">{c.industry}</dd></div>
              <div><dt className="text-muted">Services</dt><dd className="font-semibold mt-1">{c.services.join(", ")}</dd></div>
              <div><dt className="text-muted">Market</dt><dd className="font-semibold mt-1">Bangladesh</dd></div>
            </dl>
          </div>
          <div className="mt-10 aspect-[21/9] rounded-3xl" style={{ background: `linear-gradient(135deg, ${c.color}, #0f2a1b)` }} data-reveal />
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div data-reveal>
            <p className="eyebrow">The challenge</p>
            <p className="font-display text-2xl md:text-3xl font-bold mt-4 leading-snug">{c.challenge}</p>
          </div>
          <div data-reveal>
            <p className="eyebrow">Our approach</p>
            <ol className="mt-4 grid gap-4">
              {c.approach.map((a, i) => (
                <li key={a} className="flex gap-4 border-b border-line pb-4">
                  <span className="font-display font-bold text-accent">0{i + 1}</span>
                  <span className="text-lg">{a}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ink text-white">
        <div className="container-x">
          <p className="eyebrow mb-8" data-reveal>Results</p>
          <div className="grid gap-6 md:grid-cols-3" data-reveal="stagger">
            {c.results.map((r) => (
              <div key={r.label} className="rounded-3xl bg-ink-2 p-8">
                <p className="font-display text-5xl md:text-6xl font-bold">{r.value}</p>
                <p className="text-white/60 mt-2">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-20">
        <div className="container-x">
          <h2 className="font-display text-2xl font-bold mb-6">More work</h2>
          <div className="grid gap-5 md:grid-cols-2" data-reveal="stagger">
            {more.map((m) => (
              <Link key={m.slug} href={`/case-studies/${m.slug}`} className="card card-hover p-6 flex items-center justify-between gap-6">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider">{m.industry}</p>
                  <h3 className="font-display text-lg font-bold mt-1">{m.client}</h3>
                </div>
                <p className="font-display text-3xl font-bold" style={{ color: m.color }}>{m.metric}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Let's write your success story." />
    </>
  );
}
