import type { AddonId } from "../../lib/pricing";

export type EventLocation = "bordeaux" | "gironde" | "autre";

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface QuoteState {
  step: 1 | 2 | 3 | 4;
  eventType: string;
  guests: number;
  location: EventLocation;
  formula: string;
  addons: AddonId[];
  contact: ContactInfo;
}

export const EVENT_TYPES = [
  "Mariage",
  "Soirée privée",
  "Séminaire d'entreprise",
  "Buffet de gala",
  "Baptême & Communion",
  "Anniversaire",
  "Cocktail dînatoire",
];

export const LOCATIONS: { id: EventLocation; label: string }[] = [
  { id: "bordeaux", label: "Bordeaux" },
  { id: "gironde", label: "Gironde" },
  { id: "autre", label: "Hors Gironde" },
];

export const STEP_LABELS = ["Événement", "Formule", "Options", "Devis"];

export const GUESTS_MIN = 20;
export const GUESTS_MAX = 500;
