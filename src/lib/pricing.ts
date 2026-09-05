/**
 * Moteur de tarification du simulateur de devis.
 *
 * Principe métier : un traiteur ne facture pas le personnel au prorata strict
 * du nombre de convives (un serveur ne "coûte" pas linéairement par tête).
 * On distingue donc :
 *  - les postes qui scalent réellement par convive (formule repas, vaisselle) ;
 *  - les postes qui scalent par table (décoration florale, mise en scène) ;
 *  - les postes de personnel, qui suivent un barème par tranches d'effectif
 *    (un forfait couvre un nombre de serveurs suffisant pour X convives).
 */

export interface Formula {
  id: string;
  name: string;
  desc: string;
  pricePerGuest: number;
}

export const FORMULAS: Formula[] = [
  {
    id: "couscous-royal",
    name: "Couscous Royal",
    desc: "Semoule, agneau, merguez, légumes, bouillon safran",
    pricePerGuest: 35,
  },
  {
    id: "buffet-med",
    name: "Buffet Méditerranéen",
    desc: "Mezze variés, salades orientales, plats chauds, pâtisseries",
    pricePerGuest: 42,
  },
  {
    id: "menu-signature",
    name: "Menu Signature",
    desc: "Service à l'assiette — 4 plats, accord de thés d'exception",
    pricePerGuest: 65,
  },
  {
    id: "sur-mesure",
    name: "Menu Sur-Mesure",
    desc: "Consultation personnalisée, carte blanche créative",
    pricePerGuest: 85,
  },
];

/** Convives par table, utilisé pour les postes qui scalent par table plutôt que par tête. */
const GUESTS_PER_TABLE = 10;

/** Barème forfaitaire "service en salle" — tranches d'effectif, pas de linéarité brute. */
const SERVICE_STAFF_TIERS = [
  { maxGuests: 50, staff: 2, price: 180 },
  { maxGuests: 100, staff: 3, price: 280 },
  { maxGuests: 150, staff: 4, price: 380 },
  { maxGuests: 250, staff: 6, price: 560 },
  { maxGuests: 500, staff: 8, price: 780 },
];

/** Forfait par membre de personnel supplémentaire (renfort logistique, vestiaire, voiturier…). */
const EXTRA_STAFF_RATE = 130;
const GUESTS_PER_EXTRA_STAFF = 40;

/** Forfait décoration florale & lanternes, facturé par table dressée. */
const DECOR_PRICE_PER_TABLE = 25;

/** Vaisselle orientale & cuivrée : location, scale réellement par convive. */
const TABLEWARE_PRICE_PER_GUEST = 5;

function getServiceStaffTier(guests: number) {
  return (
    SERVICE_STAFF_TIERS.find((tier) => guests <= tier.maxGuests) ??
    SERVICE_STAFF_TIERS[SERVICE_STAFF_TIERS.length - 1]
  );
}

function getExtraStaffCount(guests: number) {
  return Math.max(1, Math.ceil(guests / GUESTS_PER_EXTRA_STAFF));
}

function getTableCount(guests: number) {
  return Math.max(1, Math.ceil(guests / GUESTS_PER_TABLE));
}

export type AddonId = "service" | "vaisselle" | "decoration" | "personnel";

export interface AddonDefinition {
  id: AddonId;
  label: string;
  /** Description courte affichée sous le libellé, explique le mode de calcul réel. */
  pricingNote: (guests: number) => string;
  computeCost: (guests: number) => number;
}

export const ADDONS: AddonDefinition[] = [
  {
    id: "service",
    label: "Service en salle",
    pricingNote: (guests) => {
      const tier = getServiceStaffTier(guests);
      return `Forfait ${tier.staff} serveurs · ${tier.price} €`;
    },
    computeCost: (guests) => getServiceStaffTier(guests).price,
  },
  {
    id: "vaisselle",
    label: "Vaisselle orientale & cuivrée",
    pricingNote: () => `${TABLEWARE_PRICE_PER_GUEST} €/pers.`,
    computeCost: (guests) => guests * TABLEWARE_PRICE_PER_GUEST,
  },
  {
    id: "decoration",
    label: "Décoration florale & lanternes",
    pricingNote: (guests) =>
      `${DECOR_PRICE_PER_TABLE} €/table · ${getTableCount(guests)} table${getTableCount(guests) > 1 ? "s" : ""}`,
    computeCost: (guests) => getTableCount(guests) * DECOR_PRICE_PER_TABLE,
  },
  {
    id: "personnel",
    label: "Personnel de service supplémentaire",
    pricingNote: (guests) => {
      const count = getExtraStaffCount(guests);
      return `Forfait ${count} renfort${count > 1 ? "s" : ""} · ${EXTRA_STAFF_RATE} €/pers. de staff`;
    },
    computeCost: (guests) => getExtraStaffCount(guests) * EXTRA_STAFF_RATE,
  },
];

export interface QuoteLineItem {
  label: string;
  amount: number;
  detail?: string;
}

export interface QuoteBreakdown {
  formulaTotal: number;
  formulaLine: QuoteLineItem;
  addonLines: QuoteLineItem[];
  addonsTotal: number;
  total: number;
  perGuestEquivalent: number;
}

export function computeQuote(
  guests: number,
  formulaId: string,
  selectedAddons: AddonId[]
): QuoteBreakdown {
  const formula = FORMULAS.find((f) => f.id === formulaId);
  const formulaTotal = formula ? formula.pricePerGuest * guests : 0;

  const addonLines: QuoteLineItem[] = selectedAddons
    .map((id) => ADDONS.find((a) => a.id === id))
    .filter((a): a is AddonDefinition => Boolean(a))
    .map((addon) => ({
      label: addon.label,
      amount: addon.computeCost(guests),
      detail: addon.pricingNote(guests),
    }));

  const addonsTotal = addonLines.reduce((sum, line) => sum + line.amount, 0);
  const total = formulaTotal + addonsTotal;

  return {
    formulaTotal,
    formulaLine: {
      label: formula?.name ?? "",
      amount: formulaTotal,
      detail: formula ? `${formula.pricePerGuest} €/pers.` : undefined,
    },
    addonLines,
    addonsTotal,
    total,
    perGuestEquivalent: guests > 0 ? Math.round(total / guests) : 0,
  };
}
