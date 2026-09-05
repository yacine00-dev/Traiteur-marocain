import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { ADDONS } from "../../lib/pricing";
import type { QuoteBuilderApi } from "./useQuoteBuilder";

export function StepOptions({ api }: { api: QuoteBuilderApi }) {
  const { state, toggleAddon, goToStep } = api;

  return (
    <div className="space-y-7">
      <h3 className="font-serif text-[24px] text-foreground">Services &amp; options</h3>
      <p className="font-sans text-[11px] text-muted-foreground -mt-4">
        Le personnel et le service sont facturés au forfait par tranche d'effectif — pas au prorata linéaire du
        nombre de convives.
      </p>

      <div className="space-y-3" role="group" aria-label="Options additionnelles">
        {ADDONS.map((a) => {
          const selected = state.addons.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              aria-pressed={selected}
              onClick={() => toggleAddon(a.id)}
              className={`w-full text-left border p-4 flex items-center justify-between gap-4 transition-colors ${
                selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
                    selected ? "border-primary bg-primary" : "border-border"
                  }`}
                >
                  {selected && <Check size={9} className="text-white" aria-hidden="true" />}
                </div>
                <span className="font-sans text-[13px] text-foreground">{a.label}</span>
              </div>
              <span className="font-sans text-[11px] text-muted-foreground shrink-0 text-right">
                {a.pricingNote(state.guests)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => goToStep(2)}
          aria-label="Étape précédente"
          className="flex-none border border-border text-foreground font-sans text-[11px] tracking-[0.16em] uppercase px-5 py-4 flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ChevronLeft size={13} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goToStep(4)}
          className="flex-1 bg-primary text-primary-foreground font-sans text-[11px] tracking-[0.22em] uppercase py-4 flex items-center justify-center gap-2 hover:bg-[#A84F33] transition-colors"
        >
          Voir mon devis
          <ChevronRight size={13} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
