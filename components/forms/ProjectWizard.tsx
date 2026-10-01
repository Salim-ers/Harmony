"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Data = {
  type: string;
  activity: string;
  features: string[];
  budget: string;
  description: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string; // pot de miel anti-spam, doit rester vide
};

const initial: Data = {
  type: "",
  activity: "",
  features: [],
  budget: "",
  description: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  website: "",
};

const steps = [
  { key: "type", title: "Que souhaitez-vous créer ?", options: ["Site vitrine", "E-commerce", "Application", "SaaS", "CRM", "Autre"] },
  { key: "activity", title: "Votre activité", options: ["Artisan", "Commerce", "Restaurant", "Entreprise", "Indépendant", "Association", "Autre"] },
  {
    key: "features",
    title: "Fonctionnalités",
    hint: "Plusieurs choix possibles. Vous pouvez aussi passer cette étape.",
    options: ["Commande", "Paiement", "Réservation", "Compte client", "Dashboard", "Formulaire", "SEO", "Autre"],
  },
  { key: "budget", title: "Budget", options: ["< 1 000 €", "1 000 – 2 000 €", "2 000 – 5 000 €", "5 000 € +", "À définir"] },
  { key: "description", title: "Votre projet" },
  { key: "contact", title: "Coordonnées" },
] as const;

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const ease = [0.22, 1, 0.36, 1] as const;

export function ProjectWizard({ contactEmail }: { contactEmail: string }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  const [touched, setTouched] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const current = steps[step];
  const last = step === steps.length - 1;

  const valid = (() => {
    switch (current.key) {
      case "type":
        return !!data.type;
      case "activity":
        return !!data.activity;
      case "budget":
        return !!data.budget;
      case "contact":
        return data.name.trim().length > 1 && emailOk(data.email);
      default:
        return true;
    }
  })();

  const go = (to: number) => {
    setTouched(false);
    setStep(to);
    requestAnimationFrame(() => titleRef.current?.focus());
  };

  const summary = () =>
    [
      `Projet : ${data.type}`,
      `Activité : ${data.activity}`,
      `Fonctionnalités : ${data.features.join(", ") || "Non précisé"}`,
      `Budget : ${data.budget}`,
      "",
      data.description || "(pas de description)",
      "",
      `${data.name}${data.company ? `, ${data.company}` : ""}`,
      data.email,
      data.phone,
    ].join("\n");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!last) {
      if (!valid) return setTouched(true);
      return go(step + 1);
    }
    if (!valid) return setTouched(true);
    setStatus("sending");
    try {
      const res = await fetch("/api/projet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) return setStatus("sent");
      if (res.status === 503) {
        // Envoi serveur non configuré : on ouvre la messagerie, pré-remplie.
        const href = `mailto:${contactEmail}?subject=${encodeURIComponent(`Nouveau projet : ${data.type}`)}&body=${encodeURIComponent(summary())}`;
        window.location.href = href;
        return setStatus("mailto");
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent" || status === "mailto") {
    return (
      <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} role="status">
        <p className="num text-[1.25rem]">Merci</p>
        <h2 className="display-l mt-4 max-w-[16ch] text-paper">
          {status === "sent" ? "Votre projet est bien arrivé." : "Votre messagerie s’est ouverte."}
        </h2>
        <p className="lede mt-6 max-w-[44ch] text-paper/70">
          {status === "sent"
            ? "Nous lisons chaque demande avec attention et revenons vers vous par e-mail."
            : `Le message est pré-rempli : il ne reste qu’à l’envoyer. Si rien ne s’est ouvert, écrivez-nous à ${contactEmail}.`}
        </p>
        <Link href="/realisations" className={buttonClass("outline", "mt-10")}>
          Revoir les réalisations
        </Link>
      </m.div>
    );
  }

  const choice = (key: "type" | "activity" | "budget", value: string) => setData((d) => ({ ...d, [key]: value }));
  const toggle = (value: string) =>
    setData((d) => ({
      ...d,
      features: d.features.includes(value) ? d.features.filter((f) => f !== value) : [...d.features, value],
    }));

  return (
    <form onSubmit={submit} noValidate>
      {/* Progression */}
      <div className="flex items-center gap-5">
        <p className="meta shrink-0 text-mist" aria-live="polite">
          Étape {step + 1} sur {steps.length}
        </p>
        <div aria-hidden className="flex flex-1 flex-col gap-[3px]">
          <span className="block h-px w-full bg-paper/10">
            <span
              className="block h-px bg-gold transition-[width] duration-700 ease-out-soft"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </span>
          <span className="block h-px w-full bg-paper/5">
            <span
              className="block h-px bg-gold/50 transition-[width] delay-100 duration-700 ease-out-soft"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.fieldset
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.4, ease }}
          className="mt-12 min-w-0"
        >
          <legend className="contents">
            <h2 ref={titleRef} tabIndex={-1} className="display-l text-paper outline-none">
              {current.title}
            </h2>
          </legend>
          {"hint" in current && current.hint && <p className="mt-4 text-paper/55">{current.hint}</p>}

          {(current.key === "type" || current.key === "activity" || current.key === "budget") && (
            <div className="mt-10 grid border-t border-paper/10 sm:grid-cols-2 sm:gap-x-10">
              {current.options.map((opt) => {
                const on = data[current.key] === opt;
                return (
                  <label
                    key={opt}
                    className={cn(
                      "group flex cursor-pointer items-center justify-between gap-4 border-b border-paper/10 py-5 text-[1.125rem] transition-colors",
                      on ? "text-paper" : "text-paper/70 hover:text-paper",
                    )}
                  >
                    <input
                      type="radio"
                      name={current.key}
                      value={opt}
                      checked={on}
                      onChange={() => choice(current.key, opt)}
                      className="peer sr-only"
                    />
                    <span>{opt}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-5 place-items-center rounded-full border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold",
                        on ? "border-gold" : "border-paper/30 group-hover:border-paper/60",
                      )}
                    >
                      <span className={cn("size-2.5 rounded-full bg-gold transition-transform", on ? "scale-100" : "scale-0")} />
                    </span>
                  </label>
                );
              })}
            </div>
          )}

          {current.key === "features" && (
            <div className="mt-10 grid border-t border-paper/10 sm:grid-cols-2 sm:gap-x-10">
              {current.options.map((opt) => {
                const on = data.features.includes(opt);
                return (
                  <label
                    key={opt}
                    className={cn(
                      "group flex cursor-pointer items-center justify-between gap-4 border-b border-paper/10 py-5 text-[1.125rem] transition-colors",
                      on ? "text-paper" : "text-paper/70 hover:text-paper",
                    )}
                  >
                    <input type="checkbox" checked={on} onChange={() => toggle(opt)} className="peer sr-only" />
                    <span>{opt}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-5 place-items-center rounded-[4px] border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold",
                        on ? "border-gold bg-gold" : "border-paper/30 group-hover:border-paper/60",
                      )}
                    >
                      <svg viewBox="0 0 12 12" className={cn("size-3 text-night", on ? "opacity-100" : "opacity-0")} fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M2.5 6.2l2.3 2.3 4.7-5" />
                      </svg>
                    </span>
                  </label>
                );
              })}
            </div>
          )}

          {current.key === "description" && (
            <div className="mt-10">
              <label htmlFor="description" className="meta text-mist">
                Décrivez votre projet, vos objectifs, vos délais. Quelques lignes suffisent.
              </label>
              <textarea
                id="description"
                rows={7}
                value={data.description}
                onChange={(e) => setData((d) => ({ ...d, description: e.target.value }))}
                className="mt-4 w-full resize-y rounded-md border border-paper/15 bg-night-2/60 p-5 text-[1.0625rem] leading-relaxed text-paper placeholder:text-paper/30 focus:border-gold focus:outline-none"
                placeholder="Exemple : un site pour présenter ma boulangerie et prendre les commandes de gâteaux en ligne."
              />
            </div>
          )}

          {current.key === "contact" && (
            <div className="mt-10 grid gap-x-10 gap-y-2 sm:grid-cols-2">
              {(
                [
                  { k: "name", label: "Nom", type: "text", auto: "name", required: true },
                  { k: "company", label: "Entreprise", type: "text", auto: "organization", required: false },
                  { k: "email", label: "E-mail", type: "email", auto: "email", required: true },
                  { k: "phone", label: "Téléphone", type: "tel", auto: "tel", required: false },
                ] as const
              ).map((f) => {
                const error =
                  touched &&
                  ((f.k === "name" && data.name.trim().length < 2) || (f.k === "email" && !emailOk(data.email)));
                return (
                  <div key={f.k} className="py-3">
                    <label htmlFor={f.k} className="meta text-mist">
                      {f.label}
                      {f.required ? <span className="text-gold"> *</span> : <span className="text-paper/35"> (facultatif)</span>}
                    </label>
                    <input
                      id={f.k}
                      type={f.type}
                      autoComplete={f.auto}
                      required={f.required}
                      aria-invalid={error || undefined}
                      aria-describedby={error ? `${f.k}-error` : undefined}
                      value={data[f.k]}
                      onChange={(e) => setData((d) => ({ ...d, [f.k]: e.target.value }))}
                      className={cn(
                        "mt-2 w-full border-b bg-transparent py-3 text-[1.125rem] text-paper focus:outline-none",
                        error ? "border-red-300" : "border-paper/20 focus:border-gold",
                      )}
                    />
                    {error && (
                      <p id={`${f.k}-error`} className="mt-2 text-[0.8125rem] text-red-200">
                        {f.k === "name" ? "Indiquez votre nom." : "Indiquez une adresse e-mail valide, par exemple nom@domaine.fr."}
                      </p>
                    )}
                  </div>
                );
              })}
              <div aria-hidden className="absolute -left-[9999px]">
                <label htmlFor="website">Ne pas remplir</label>
                <input
                  id="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={data.website}
                  onChange={(e) => setData((d) => ({ ...d, website: e.target.value }))}
                />
              </div>
              <p className="pt-4 text-[0.8125rem] leading-relaxed text-paper/45 sm:col-span-2">
                Vos informations servent uniquement à répondre à votre demande.{" "}
                <Link href="/confidentialite" className="underline underline-offset-2 hover:text-paper">
                  Politique de confidentialité
                </Link>
              </p>
            </div>
          )}

          {touched && !valid && current.key !== "contact" && (
            <p className="mt-5 text-[0.875rem] text-red-200" role="alert">
              Choisissez une réponse pour continuer.
            </p>
          )}
        </m.fieldset>
      </AnimatePresence>

      <div className="mt-12 flex items-center justify-between gap-4 border-t border-paper/10 pt-8">
        <button
          type="button"
          onClick={() => go(step - 1)}
          disabled={step === 0}
          className="py-2 text-[0.9375rem] text-paper/65 transition-colors hover:text-paper disabled:invisible"
        >
          Retour
        </button>
        <div className="flex items-center gap-4">
          {status === "error" && (
            <p className="text-[0.875rem] text-red-200" role="alert">
              L’envoi a échoué. Réessayez, ou écrivez-nous à {contactEmail}.
            </p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className={buttonClass("gold", "min-w-[11rem]")}
          >
            {last ? (status === "sending" ? "Envoi en cours…" : "Envoyer mon projet") : "Continuer"}
          </button>
        </div>
      </div>
    </form>
  );
}
