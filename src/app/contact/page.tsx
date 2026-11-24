import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Book a free consultation with Salescap Media." };

const steps = [
  ["We reply by email", "Within one business day, with a few times for a call."],
  ["Free 30-min call", "We learn about your business and look at your current marketing."],
  ["Your proposal", "A clear plan and price, usually within three working days."],
];

export default function ContactPage() {
  return (
    <section className="pt-24 md:pt-40 pb-14 md:pb-24">
      <div className="container-x grid gap-8 md:gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div data-reveal="stagger">
          <p className="eyebrow">Contact</p>
          <h1 className="font-display text-[2rem] sm:text-4xl md:text-6xl font-bold mt-3 md:mt-4 leading-[1.05] tracking-tight">Book your free consultation.</h1>
          <p className="mt-4 md:mt-6 md:text-lg text-muted">Fill in the form, or reach us directly. Most people prefer WhatsApp.</p>

          <div className="mt-6 md:mt-10 grid gap-2.5 md:gap-3">
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="card card-hover p-3.5 md:p-5 flex items-center justify-between gap-2 min-w-0">
              <span className="min-w-0"><span className="block text-xs md:text-sm text-muted">WhatsApp</span><span className="block text-sm md:text-base font-semibold break-words">Chat with us now</span></span>
              <span className="text-[#25D366] text-lg md:text-xl shrink-0">→</span>
            </a>
            <a href={`https://m.me/${site.messenger}`} target="_blank" rel="noopener noreferrer" className="card card-hover p-3.5 md:p-5 flex items-center justify-between gap-2 min-w-0">
              <span className="min-w-0"><span className="block text-xs md:text-sm text-muted">Messenger</span><span className="block text-sm md:text-base font-semibold break-words">Message our Facebook page</span></span>
              <span className="text-[#0084FF] text-lg md:text-xl shrink-0">→</span>
            </a>
            <a href={site.phoneHref} className="card card-hover p-3.5 md:p-5 flex items-center justify-between gap-2 min-w-0">
              <span className="min-w-0"><span className="block text-xs md:text-sm text-muted">Phone</span><span className="block text-sm md:text-base font-semibold break-words">{site.phone}</span></span>
              <span className="text-lg md:text-xl shrink-0">→</span>
            </a>
            <a href={`mailto:${site.email}`} className="card card-hover p-3.5 md:p-5 flex items-center justify-between gap-2 min-w-0">
              <span className="min-w-0"><span className="block text-xs md:text-sm text-muted">Email</span><span className="block text-sm md:text-base font-semibold break-words">{site.email}</span></span>
              <span className="text-lg md:text-xl shrink-0">→</span>
            </a>
          </div>
          <p className="mt-4 md:mt-6 text-sm text-muted">{site.address} · {site.hours}</p>
        </div>

        <div>
          <div className="card p-5 md:p-10" data-reveal>
            <h2 className="font-display text-xl md:text-2xl font-bold mb-4 md:mb-6">Send an enquiry</h2>
            <ContactForm />
          </div>
          <ol className="mt-6 md:mt-8 grid gap-4 sm:grid-cols-3" data-reveal="stagger">
            {steps.map(([t, d], i) => (
              <li key={t}>
                <span className="font-display font-bold text-accent">0{i + 1}</span>
                <h3 className="font-semibold mt-1">{t}</h3>
                <p className="text-sm text-muted mt-1">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
