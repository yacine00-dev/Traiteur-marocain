import { ChevronLeft, ChevronRight } from "lucide-react";
import { FORMULAS } from "../../lib/pricing";
import type { QuoteBuilderApi } from "./useQuoteBuilder";

export function StepFormula({ api }: { api: QuoteBuilderApi }) {
  const { state, setFormula, canProceedFromStep2, goToStep } = api;

  return (
    <div className="space-y-7">
      <h3 className="font-serif text-[24px] text-foreground">Choisissez votre formule</h3>

      <div className="space-y-3" role="radiogroup" aria-label="Formule de repas">
        {FORMULAS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="radio"
            aria-checked={state.formula === f.id}
            onClick={() => setFormula(f.id)}
            className={`w-full text-left border p-5 flex items-start justify-between gap-4 transition-colors ${
              state.formula === f.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
            }`}
          >
            <div className="flex-1">
              <p className="font-serif text-[18px] text-foreground mb-1">{f.name}</p>
              <p className="font-sans text-[11px] text-muted-foreground">{f.desc}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-serif text-[20px] text-primary">{f.pricePerGuest} €</p>
              <p className="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground">par pers.</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => goToStep(1)}
          aria-label="Étape précédente"
          className="flex-none border border-border text-foreground font-sans text-[11px] tracking-[0.16em] uppercase px-5 py-4 flex items-center justify-center gap-2 hover:bg-muted transition-colors"
        >
          <ChevronLeft size={13} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => canProceedFromStep2 && goToStep(3)}
          disabled={!canProceedFromStep2}
          className="flex-1 bg-primary text-primary-foreground font-sans text-[11px] tracking-[0.22em] uppercase py-4 flex items-center justify-center gap-2 hover:bg-[#A84F33] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Suivant
          <ChevronRight size={13} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
