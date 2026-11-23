import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { formatDate, posts } from "@/lib/data";

export const metadata: Metadata = { title: "Blog", description: "Practical digital marketing advice for Bangladeshi businesses." };

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHero eyebrow="Blog" title="Practical marketing advice, written for Bangladesh." intro="Guides on ads, social media, SEO and websites. New articles every week." />

      <section className="py-16">
        <div className="container-x">
          <Link href={`/blog/${featured.slug}`} className="group grid gap-8 lg:grid-cols-2 items-center" data-reveal>
            <div className="aspect-[16/10] rounded-3xl bg-ink grain grid place-items-center overflow-hidden">
              <span className="font-display text-4xl font-bold text-white/20 transition-transform duration-700 group-hover:scale-110">{featured.category}</span>
            </div>
            <div>
              <p className="text-sm text-muted">
                <span className="text-accent font-semibold">Featured</span> · {featured.category} · {formatDate(featured.date)}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 group-hover:text-accent transition">{featured.title}</h2>
              <p className="text-muted text-lg mt-4">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold">
                Read article <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
              <div className="aspect-[16/10] rounded-2xl bg-white border border-line grid place-items-center overflow-hidden">
                <span className="font-display text-2xl font-bold text-ink/15 transition-transform duration-500 group-hover:scale-110">{p.category}</span>
              </div>
              <p className="mt-4 text-xs text-muted">
                {p.category} · {formatDate(p.date)} · {p.readTime} min read
              </p>
              <h2 className="font-display text-xl font-bold mt-2 group-hover:text-accent transition">{p.title}</h2>
              <p className="text-sm text-muted mt-2">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
