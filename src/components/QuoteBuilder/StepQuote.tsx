import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { LOCATIONS } from "./types";
import type { QuoteBuilderApi } from "./useQuoteBuilder";

const LOCATION_LABELS: Record<string, string> = Object.fromEntries(LOCATIONS.map((l) => [l.id, l.label]));

export function StepQuote({ api }: { api: QuoteBuilderApi }) {
  const { state, quote, status, errorMessage, updateContact, goToStep, submit } = api;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submit();
  };

  if (status === "success") {
    return (
      <div className="text-center py-16" role="status">
        <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mx-auto mb-7">
          <Check className="text-primary" size={26} aria-hidden="true" />
        </div>
        <h3 className="font-serif text-[30px] text-foreground mb-3 italic">Demande envoyée</h3>
        <p className="font-sans text-[13px] text-muted-foreground max-w-[300px] mx-auto leading-relaxed mb-6">
          Nous reviendrons vers vous dans les 24h avec votre devis personnalisé.
        </p>
        <div className="border border-border bg-muted/40 text-left p-5 max-w-[320px] mx-auto space-y-1.5">
          <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-2">Récapitulatif</p>
          <div className="flex justify-between">
            <span className="font-sans text-[12px] text-muted-foreground">{state.eventType}</span>
            <span className="font-sans text-[12px] text-foreground">{state.guests} convives</span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-[12px] text-muted-foreground">{quote.formulaLine.label}</span>
            <span className="font-sans text-[12px] text-foreground">{quote.total.toLocaleString("fr-FR")} €</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7" noValidate>
      <h3 className="font-serif text-[24px] text-foreground">Votre estimation</h3>

      <div className="border border-primary/25 bg-primary/5 p-6">
        <div className="flex justify-between items-start mb-5 gap-4">
          <div>
            <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-1">
              Estimation totale
            </p>
            <p className="font-serif text-[46px] text-primary leading-none">
              {quote.total.toLocaleString("fr-FR")} €
            </p>
            <p className="font-sans text-[11px] text-muted-foreground mt-1">
              pour {state.guests} convives · {LOCATION_LABELS[state.location]}
            </p>
          </div>
          <div className="text-right">
            <p className="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Soit env.</p>
            <p className="font-serif text-[24px] text-foreground">
              {quote.perGuestEquivalent} €<span className="font-sans text-[11px] text-muted-foreground">/pers.</span>
            </p>
          </div>
        </div>
        <div className="border-t border-border/50 pt-4 space-y-1.5">
          <div className="flex justify-between">
            <span className="font-sans text-[11px] text-muted-foreground">
              {quote.formulaLine.label}
              {quote.formulaLine.detail ? ` · ${quote.formulaLine.detail}` : ""}
            </span>
            <span className="font-sans text-[11px] text-foreground">
              {quote.formulaLine.amount.toLocaleString("fr-FR")} €
            </span>
          </div>
          {quote.addonLines.map((line) => (
            <div key={line.label} className="flex justify-between gap-4">
              <span className="font-sans text-[11px] text-muted-foreground">
                {line.label}
                {line.detail ? ` · ${line.detail}` : ""}
              </span>
              <span className="font-sans text-[11px] text-foreground shrink-0">
                +{line.amount.toLocaleString("fr-FR")} €
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="contact-name" className="font-sans text-[9px] tracking-[0.14em] uppercase text-muted-foreground block mb-1.5">
              Prénom &amp; Nom *
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={state.contact.name}
              onChange={(e) => updateContact({ name: e.target.value })}
              className="w-full border border-border bg-background font-sans text-[13px] px-3 py-2.5 focus:outline-none focus:border-primary transition-colors"
              placeholder="Amina Benali"
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className="font-sans text-[9px] tracking-[0.14em] uppercase text-muted-foreground block mb-1.5">
              Téléphone *
            </label>
            <input
              id="contact-phone"
              type="tel"
              required
              value={state.contact.phone}
              onChange={(e) => updateContact({ phone: e.target.value })}
              className="w-full border border-border bg-background font-sans text-[13px] px-3 py-2.5 focus:outline-none focus:border-primary transition-colors"
              placeholder="06 00 00 00 00"
            />
          </div>
        </div>
        <div>
          <label htmlFor="contact-email" className="font-sans text-[9px] tracking-[0.14em] uppercase text-muted-foreground block mb-1.5">
            Adresse e-mail *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={state.contact.email}
            onChange={(e) => updateContact({ email: e.target.value })}
            className="w-full border border-border bg-background font-sans text-[13px] px-3 py-2.5 focus:outline-none focus:border-primary transition-colors"
            placeholder="votre@email.fr"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="font-sans text-[9px] tracking-[0.14em] uppercase text-muted-foreground block mb-1.5">
            Message (date, lieu, précisions)
          </label>
          <textarea
            id="contact-message"
            rows={3}
            value={state.contact.message}
            onChange={(e) => updateContact({ message: e.target.value })}
            className="w-full border border-border bg-background font-sans text-[13px] px-3 py-2.5 focus:outline-none focus:border-primary transition-colors resize-none"
            placeholder="Date souhaitée, lieu précis, restrictions alimentaires…"
          />
        </div>
      </div>

      {status === "error" && errorMessage && (
        <p role="alert" className="font-sans text-[12px] text-destructive border border-destructive/30 bg-destructive/5 px-4 py-3">
          {errorMessage}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => goToStep(3)}
          disabled={status === "submitting"}
          aria-label="Étape précédente"
          className="flex-none border border-border text-foreground font-sans text-[11px] uppercase px-5 py-4 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
        >
          <ChevronLeft size={13} aria-hidden="true" />
        </button>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex-1 bg-primary text-primary-foreground font-sans text-[11px] tracking-[0.22em] uppercase py-4 flex items-center justify-center gap-2 hover:bg-[#A84F33] disabled:opacity-60 transition-colors"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={13} className="animate-spin" aria-hidden="true" />
              Envoi en cours…
            </>
          ) : (
            <>
              Envoyer ma demande
              <ChevronRight size={13} aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <p className="font-sans text-[10px] text-muted-foreground text-center">
        Réponse garantie sous 24h. Devis sans engagement.
      </p>
    </form>
  );
}
