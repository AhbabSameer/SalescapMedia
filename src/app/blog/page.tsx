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

      <section className="py-10 md:py-16">
        <div className="container-x">
          <Link href={`/blog/${featured.slug}`} className="group grid gap-5 md:gap-8 lg:grid-cols-2 items-center" data-reveal>
            <div className="aspect-[16/9] md:aspect-[16/10] rounded-2xl md:rounded-3xl bg-ink grain grid place-items-center overflow-hidden">
              <span className="font-display text-3xl md:text-4xl font-bold text-white/20 transition-transform duration-700 group-hover:scale-110">{featured.category}</span>
            </div>
            <div>
              <p className="text-xs md:text-sm text-muted">
                <span className="text-accent font-semibold">Featured</span> · {featured.category} · {formatDate(featured.date)}
              </p>
              <h2 className="font-display text-2xl md:text-4xl font-bold mt-2 md:mt-3 group-hover:text-accent transition">{featured.title}</h2>
              <p className="text-muted md:text-lg mt-3 md:mt-4">{featured.excerpt}</p>
              <span className="mt-4 md:mt-6 inline-flex items-center gap-2 text-sm md:text-base font-semibold">
                Read article <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="pb-14 md:pb-24">
        <div className="container-x grid gap-x-6 gap-y-6 md:gap-y-12 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group grid grid-cols-[6rem_1fr] gap-x-4 sm:block">
              <div className="row-span-3 aspect-square sm:aspect-[16/10] rounded-xl sm:rounded-2xl bg-white border border-line grid place-items-center overflow-hidden">
                <span className="font-display text-sm sm:text-2xl text-center font-bold text-ink/15 transition-transform duration-500 group-hover:scale-110">{p.category}</span>
              </div>
              <p className="sm:mt-4 text-xs text-muted">
                {p.category} · {formatDate(p.date)} · {p.readTime} min read
              </p>
              <h2 className="font-display text-base sm:text-xl leading-snug font-bold mt-1 sm:mt-2 group-hover:text-accent transition">{p.title}</h2>
              <p className="hidden sm:block text-sm text-muted mt-2">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
