"use client";

import { useState } from "react";
import { services } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong");
      try {
        sessionStorage.setItem("salescap-consult-sent", "1"); // stops the auto pop-up
      } catch {}
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-emerald-900">
        <p className="font-display text-xl font-bold">Thanks, we got it!</p>
        <p className="mt-2 text-sm">We&apos;ll email you within one business day to book your free consultation.</p>
      </div>
    );
  }

  const input =
    "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 md:px-4 md:py-3 text-base md:text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15";

  return (
    <form onSubmit={onSubmit} className="grid gap-3 md:gap-4">
      <div className={`grid gap-3 md:gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <label className="grid gap-1.5 text-sm font-medium">
          Full name *
          <input name="name" required autoComplete="name" className={input} placeholder="Your name" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Email *
          <input name="email" type="email" required autoComplete="email" className={input} placeholder="you@company.com" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Phone / WhatsApp
          <input name="phone" type="tel" autoComplete="tel" className={input} placeholder="+880" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Service
          <select name="service" className={input} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
            <option>Not sure yet</option>
          </select>
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium">
        What do you want to achieve? *
        <textarea name="message" required rows={compact ? 3 : 4} className={input} placeholder="e.g. More online orders, lower cost per lead..." />
      </label>
      {/* Honeypot field for bots */}
      <input type="text" name="company_site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {status === "error" && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={status === "sending"} className="btn btn-primary justify-center disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Request free consultation →"}
      </button>
      <p className="text-xs text-muted">We reply by email within one business day. No spam.</p>
    </form>
  );
}
