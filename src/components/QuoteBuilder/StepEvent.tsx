import { ChevronRight } from "lucide-react";
import { EVENT_TYPES, GUESTS_MAX, GUESTS_MIN, LOCATIONS } from "./types";
import type { QuoteBuilderApi } from "./useQuoteBuilder";

export function StepEvent({ api }: { api: QuoteBuilderApi }) {
  const { state, setEventType, setGuests, setLocation, canProceedFromStep1, goToStep } = api;

  return (
    <div className="space-y-7">
      <h3 className="font-serif text-[24px] text-foreground">Votre événement</h3>

      <div>
        <label htmlFor="event-type" className="font-sans text-[10px] tracking-[0.14em] uppercase text-muted-foreground block mb-2">
          Type d'événement
        </label>
        <select
          id="event-type"
          value={state.eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="w-full border border-border bg-background font-sans text-[13px] px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
        >
          <option value="">Sélectionner…</option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3 gap-4">
          <label htmlFor="guests-slider" className="font-sans text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
            Nombre de convives
          </label>
          {/* Saisie manuelle synchronisée avec le slider, pour un nombre exact. */}
          <div className="flex items-center gap-1.5">
            <input
              id="guests-input"
              type="number"
              min={GUESTS_MIN}
              max={GUESTS_MAX}
              value={state.guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              aria-label="Nombre exact de convives"
              className="w-20 border border-border bg-background font-serif text-[20px] text-foreground text-right px-2 py-1 focus:outline-none focus:border-primary transition-colors"
            />
            <span className="font-sans text-[11px] text-muted-foreground">pers.</span>
          </div>
        </div>
        <input
          id="guests-slider"
          type="range"
          min={GUESTS_MIN}
          max={GUESTS_MAX}
          step={5}
          value={state.guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full accent-primary h-px"
          aria-describedby="guests-range-labels"
        />
        <div id="guests-range-labels" className="flex justify-between mt-1.5">
          <span className="font-sans text-[10px] text-muted-foreground">{GUESTS_MIN}</span>
          <span className="font-sans text-[10px] text-muted-foreground">{GUESTS_MAX}</span>
        </div>
      </div>

      <fieldset>
        <legend className="font-sans text-[10px] tracking-[0.14em] uppercase text-muted-foreground block mb-2">
          Lieu de l'événement
        </legend>
        <div className="flex">
          {LOCATIONS.map((loc, i) => (
            <button
              key={loc.id}
              type="button"
              aria-pressed={state.location === loc.id}
              onClick={() => setLocation(loc.id)}
              className={`flex-1 py-3 font-sans text-[10px] tracking-[0.12em] uppercase border border-border transition-colors ${
                i > 0 ? "-ml-px" : ""
              } ${
                state.location === loc.id
                  ? "bg-primary text-primary-foreground border-primary z-10 relative"
                  : "bg-background text-foreground hover:bg-muted"
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={() => canProceedFromStep1 && goToStep(2)}
        disabled={!canProceedFromStep1}
        className="w-full bg-primary text-primary-foreground font-sans text-[11px] tracking-[0.22em] uppercase py-4 flex items-center justify-center gap-2 hover:bg-[#A84F33] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Suivant
        <ChevronRight size={13} aria-hidden="true" />
      </button>
    </div>
  );
}
