// Receives consultation requests and emails them via Resend (https://resend.com).
// Set RESEND_API_KEY and CONTACT_TO_EMAIL in .env.local. Without a key the
// request is only logged to the server console, which is fine for the prototype.

const clean = (v: unknown, max = 2000) => String(v ?? "").trim().slice(0, max);
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (clean(body.company_site)) return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const service = clean(body.service, 80);
  const message = clean(body.message);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please fill in your name, a valid email and your goal." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!key || !to) {
    console.log("[contact] New consultation request (email not configured):", { name, email, phone, service, message });
    return Response.json({ ok: true });
  }

  const html = `
    <h2>New free consultation request</h2>
    <p><b>Name:</b> ${esc(name)}</p>
    <p><b>Email:</b> ${esc(email)}</p>
    <p><b>Phone/WhatsApp:</b> ${esc(phone || "-")}</p>
    <p><b>Service:</b> ${esc(service || "-")}</p>
    <p><b>Goal:</b><br>${esc(message).replace(/\n/g, "<br>")}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Salescap Website <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Free consultation request: ${name}${service ? ` (${service})` : ""}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return Response.json({ error: "Couldn't send right now. Please try WhatsApp instead." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
