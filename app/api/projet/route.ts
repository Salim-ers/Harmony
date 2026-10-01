import { NextResponse } from "next/server";

type Payload = Record<string, unknown>;

const str = (v: unknown, max = 4000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/**
 * Réception du questionnaire /projet.
 * - PROJECT_FORM_WEBHOOK_URL : transmet le JSON (Make, Zapier, n8n…)
 * - RESEND_API_KEY : envoie un e-mail via Resend
 * Sans configuration : 503, le client bascule sur un e-mail pré-rempli.
 */
export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Pot de miel : on répond « OK » sans rien transmettre
  if (str(body.website)) return NextResponse.json({ ok: true });

  const data = {
    type: str(body.type, 60),
    activity: str(body.activity, 60),
    features: Array.isArray(body.features) ? body.features.map((f) => str(f, 40)).filter(Boolean).slice(0, 12) : [],
    budget: str(body.budget, 40),
    description: str(body.description),
    name: str(body.name, 120),
    company: str(body.company, 120),
    email: str(body.email, 200),
    phone: str(body.phone, 40),
  };

  if (!data.type || !data.name || !emailOk(data.email)) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const text = [
    `Projet : ${data.type}`,
    `Activité : ${data.activity}`,
    `Fonctionnalités : ${data.features.join(", ") || "Non précisé"}`,
    `Budget : ${data.budget}`,
    "",
    data.description || "(pas de description)",
    "",
    `Nom : ${data.name}`,
    `Entreprise : ${data.company || "-"}`,
    `E-mail : ${data.email}`,
    `Téléphone : ${data.phone || "-"}`,
  ].join("\n");

  const webhook = process.env.PROJECT_FORM_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;

  try {
    if (webhook) {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, text, receivedAt: new Date().toISOString() }),
      });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
      return NextResponse.json({ ok: true });
    }
    if (resendKey) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.PROJECT_FORM_FROM || "Harmony Solutions <onboarding@resend.dev>",
          to: [process.env.PROJECT_FORM_TO || "contact@harmony-solutions.fr"],
          reply_to: data.email,
          subject: `Nouveau projet : ${data.type}, ${data.name}`,
          text,
        }),
      });
      if (!r.ok) throw new Error(`resend ${r.status}`);
      return NextResponse.json({ ok: true });
    }
  } catch (err) {
    console.error("[api/projet]", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ error: "not_configured" }, { status: 503 });
}
