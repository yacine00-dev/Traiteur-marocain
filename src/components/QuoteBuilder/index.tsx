import { Check, MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "../../config/site";
import { StepIndicator } from "./StepIndicator";
import { StepEvent } from "./StepEvent";
import { StepFormula } from "./StepFormula";
import { StepOptions } from "./StepOptions";
import { StepQuote } from "./StepQuote";
import { useQuoteBuilder } from "./useQuoteBuilder";

const GUARANTEES = [
  "Réponse garantie sous 24h ouvrées",
  "Dégustation offerte sur rendez-vous",
  "Livraison & service partout en Gironde",
  "Devis sans engagement",
];

export function QuoteBuilder() {
  const api = useQuoteBuilder();
  const { state } = api;

  return (
    <section className="py-28 px-6 lg:px-20" id="devis" aria-labelledby="devis-heading">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_560px] gap-16 xl:gap-24 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="font-sans text-[10px] tracking-[0.38em] uppercase text-primary mb-5">Devis Gratuit</p>
            <h2 id="devis-heading" className="font-serif text-[42px] md:text-[54px] font-light text-foreground italic leading-tight mb-6">
              Construisez votre réception idéale
            </h2>
            <p className="font-sans text-[14px] leading-relaxed text-muted-foreground mb-10 max-w-[380px]">
              Notre simulateur vous donne une estimation instantanée. Nous vous recontactons sous 24h avec un devis
              détaillé et personnalisé.
            </p>
            <div className="space-y-4 mb-12">
              {GUARANTEES.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check size={13} className="text-primary shrink-0" aria-hidden="true" />
                  <span className="font-sans text-[13px] text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-8 border-t border-border">
              <a href={CONTACT.phoneLink} className="flex items-center gap-3 group">
                <Phone size={13} className="text-primary" aria-hidden="true" />
                <span className="font-sans text-[13px] text-foreground group-hover:text-primary transition-colors">
                  {CONTACT.phoneDisplay}
                </span>
              </a>
              <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                <MessageCircle size={13} className="text-primary" aria-hidden="true" />
                <span className="font-sans text-[13px] text-foreground group-hover:text-primary transition-colors">
                  WhatsApp direct
                </span>
              </a>
            </div>
          </div>

          <div className="bg-card border border-border">
            <StepIndicator currentStep={state.step} />
            <div className="p-8">
              {state.step === 1 && <StepEvent api={api} />}
              {state.step === 2 && <StepFormula api={api} />}
              {state.step === 3 && <StepOptions api={api} />}
              {state.step === 4 && <StepQuote api={api} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
