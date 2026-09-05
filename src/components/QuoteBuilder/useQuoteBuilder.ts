import { useMemo, useState } from "react";
import { computeQuote, type AddonId } from "../../lib/pricing";
import { sendQuoteRequest, QuoteSubmissionError } from "../../lib/email";
import { GUESTS_MAX, GUESTS_MIN, type QuoteState } from "./types";

const INITIAL_STATE: QuoteState = {
  step: 1,
  eventType: "",
  guests: 80,
  location: "bordeaux",
  formula: "",
  addons: [],
  contact: { name: "", email: "", phone: "", message: "" },
};

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export function useQuoteBuilder() {
  const [state, setState] = useState<QuoteState>(INITIAL_STATE);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const quote = useMemo(
    () => computeQuote(state.guests, state.formula, state.addons),
    [state.guests, state.formula, state.addons]
  );

  const canProceedFromStep1 = state.eventType !== "";
  const canProceedFromStep2 = state.formula !== "";

  function setGuests(value: number) {
    const clamped = Math.min(GUESTS_MAX, Math.max(GUESTS_MIN, Math.round(value)));
    setState((s) => ({ ...s, guests: Number.isNaN(clamped) ? GUESTS_MIN : clamped }));
  }

  function goToStep(step: QuoteState["step"]) {
    setState((s) => ({ ...s, step }));
  }

  function toggleAddon(id: AddonId) {
    setState((s) => ({
      ...s,
      addons: s.addons.includes(id) ? s.addons.filter((a) => a !== id) : [...s.addons, id],
    }));
  }

  function updateContact(patch: Partial<QuoteState["contact"]>) {
    setState((s) => ({ ...s, contact: { ...s.contact, ...patch } }));
  }

  async function submit() {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      await sendQuoteRequest({
        eventType: state.eventType,
        guests: state.guests,
        location: state.location,
        formulaName: quote.formulaLine.label,
        addonLabels: quote.addonLines.map((l) => l.label),
        estimateTotal: quote.total,
        contact: state.contact,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof QuoteSubmissionError
          ? err.message
          : "Une erreur inattendue est survenue. Merci de réessayer ou de nous appeler directement."
      );
    }
  }

  return {
    state,
    quote,
    status,
    errorMessage,
    canProceedFromStep1,
    canProceedFromStep2,
    setEventType: (eventType: string) => setState((s) => ({ ...s, eventType })),
    setGuests,
    setLocation: (location: QuoteState["location"]) => setState((s) => ({ ...s, location })),
    setFormula: (formula: string) => setState((s) => ({ ...s, formula })),
    toggleAddon,
    updateContact,
    goToStep,
    submit,
  };
}

export type QuoteBuilderApi = ReturnType<typeof useQuoteBuilder>;
