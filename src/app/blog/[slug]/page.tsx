import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/ui";
import { ConsultButton } from "@/components/Consultation";
import { formatDate, posts } from "@/lib/data";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = posts.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function PostPage(props: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<PostSkeleton />}>
      <Post params={props.params} />
    </Suspense>
  );
}

function PostSkeleton() {
  return (
    <article className="pt-32 md:pt-40 pb-16" aria-busy="true">
      <div className="container-x max-w-3xl animate-pulse">
        <div className="h-4 w-40 rounded bg-line" />
        <div className="mt-8 h-3 w-24 rounded bg-line" />
        <div className="mt-5 h-12 w-full rounded-lg bg-line" />
        <div className="mt-3 h-12 w-2/3 rounded-lg bg-line" />
        <div className="mt-6 h-5 w-5/6 rounded bg-line" />
        <div className="mt-8 h-16 w-full rounded-xl bg-line/60" />
        <div className="mt-10 h-40 w-full rounded-2xl bg-line/60" />
      </div>
    </article>
  );
}

async function Post({ params }: { params: PageProps<"/blog/[slug]">["params"] }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  const related = posts.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <article className="pt-32 md:pt-40 pb-16">
        <header className="container-x max-w-3xl" data-reveal="stagger">
          <Breadcrumb items={[{ href: "/", label: "Home" }, { href: "/blog", label: "Blog" }, { label: p.category }]} />
          <p className="eyebrow">{p.category}</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 leading-[1.1] tracking-tight">{p.title}</h1>
          <p className="mt-5 text-lg text-muted">{p.excerpt}</p>
          <div className="mt-8 flex items-center gap-3 text-sm border-y border-line py-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-white font-bold">S</span>
            <div>
              <p className="font-semibold">{p.author}</p>
              <p className="text-muted">{formatDate(p.date)} · {p.readTime} min read</p>
            </div>
          </div>
        </header>

        <div className="container-x max-w-3xl mt-10">
          <nav className="rounded-2xl bg-white border border-line p-6 mb-8" aria-label="Table of contents" data-reveal>
            <p className="font-semibold mb-3">In this article</p>
            <ol className="grid gap-2 text-sm list-decimal list-inside text-muted">
              {p.body.map((b) => (
                <li key={b.heading}>
                  <a href={`#${anchor(b.heading)}`} className="hover:text-accent transition">{b.heading}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="prose-lite" data-reveal>
            {p.body.map((b) => (
              <section key={b.heading}>
                <h2 id={anchor(b.heading)}>{b.heading}</h2>
                <p>{b.text}</p>
              </section>
            ))}
          </div>

          <aside className="mt-12 rounded-3xl bg-ink text-white on-dark p-8 grain" data-reveal>
            <h2 className="font-display text-2xl font-bold">Want this done for your business?</h2>
            <p className="text-white/70 mt-2">Book a free 30-minute consultation with our team.</p>
            <div className="mt-6"><ConsultButton /></div>
          </aside>
        </div>
      </article>

      <section className="pb-24">
        <div className="container-x">
          <h2 className="font-display text-2xl font-bold mb-6">Keep reading</h2>
          <div className="grid gap-6 md:grid-cols-3" data-reveal="stagger">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="card card-hover p-6">
                <p className="text-xs text-muted">{r.category} · {r.readTime} min</p>
                <h3 className="font-display text-lg font-bold mt-2">{r.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
