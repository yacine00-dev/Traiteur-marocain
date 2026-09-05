# Les Saveurs de la Méditerranée — Refonte

Refonte modulaire du site vitrine (React + TypeScript + Tailwind v4 + Framer Motion).
Le fichier `theme.css` fourni n'a pas été modifié : les classes `font-serif` / `font-sans`
et les variables couleur (`--background`, `--primary`, etc.) sont déjà exposées via le bloc
`@theme inline`, donc tout le code ci-dessous les consomme directement — plus aucun
`style={{ fontFamily: ... }}` inline.

## Installation

```bash
npm install framer-motion lucide-react
```

`react`, `react-dom` et Tailwind sont supposés déjà présents dans votre projet existant.

## Arborescence

```
src/
  config/site.ts          → toutes les coordonnées, textes légaux, zones desservies
  lib/pricing.ts          → moteur de tarification (barème réaliste, voir plus bas)
  lib/email.ts            → envoi async de la demande de devis (EmailJS, easily swappable)
  components/
    GlobalDefs.tsx         → clip-paths d'arches + motif zellige (SVG <defs>)
    ZelligeDivider.tsx
    Header.tsx             → nav + menu mobile accessible (focus trap léger, Échap, scroll lock)
    Hero.tsx
    CouscousAnatomy.tsx    → scrollytelling (voir plus bas)
    Offerings.tsx
    Footer.tsx
    SeoJsonLd.tsx          → JSON-LD Schema.org
    QuoteBuilder/
      index.tsx            → orchestrateur (assemble les 4 étapes)
      useQuoteBuilder.ts    → state + logique métier, séparé de la présentation
      types.ts
      StepIndicator.tsx
      StepEvent.tsx
      StepFormula.tsx
      StepOptions.tsx
      StepQuote.tsx
  App.tsx
```

## Scrollytelling « L'Art du Couscous »

- **Desktop (`lg:` et +)** : la section fait `280vh`, avec un conteneur `sticky top-0 h-screen`
  à l'intérieur. `useScroll({ target, offset: ["start start", "end end"] })` (Framer Motion)
  fournit une progression 0→1 sur toute la hauteur de la section. Chaque ingrédient a sa
  propre fenêtre de révélation (`getRevealWindow`) échelonnée dans cette progression :
  opacité, léger décalage de profondeur (`y`) et écartement horizontal (`x`) par rapport au
  plat central, qui reste ancré et ne fait que respirer légèrement (`scale`, `y` très subtils).
  Les indicateurs de liaison (traits 1px) grandissent avec `scaleX` synchronisé.
- **Mobile** : aucun pin, aucun `useScroll`. Fallback en cartes empilées verticalement,
  révélées une à une via `whileInView` (`once: true`) — léger, sans jank, respecte
  naturellement `prefers-reduced-motion` (Framer Motion désactive les transforms
  correspondants si l'utilisateur l'a demandé au niveau OS).

Pour migrer vers GSAP ScrollTrigger : remplacer `useScroll`/`useTransform` par
`gsap.timeline({ scrollTrigger: { trigger, pin: true, scrub: true } })` en conservant les
mêmes fenêtres de révélation par ingrédient.

## Simulateur de devis — barème réaliste

Le moteur (`lib/pricing.ts`) distingue trois logiques de calcul, documentées dans le fichier :

| Poste | Mode de calcul |
|---|---|
| Formule repas | € / convive (linéaire — c'est la seule chose qui scale vraiment par tête) |
| Vaisselle | € / convive (location, scale réellement) |
| Décoration florale | forfait par **table** dressée (≈10 convives/table), pas par tête |
| Service en salle | **forfait par tranche d'effectif** (2 serveurs jusqu'à 50 pers., 3 jusqu'à 100, etc.) |
| Personnel supplémentaire | forfait par renfort (1 renfort / 40 convives × taux fixe) |

Le champ "nombre de convives" est un slider **et** un champ numérique synchronisés
(`StepEvent.tsx`), tous deux bornés à `[GUESTS_MIN, GUESTS_MAX]`.

## Envoi du formulaire

`lib/email.ts` expose `sendQuoteRequest()`, une fonction asynchrone prête pour EmailJS
(aucun backend requis) :

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

Sans ces variables, la fonction rejette proprement avec un message clair plutôt que de
simuler un succès — `useQuoteBuilder.ts` gère les trois états (`submitting`, `success`,
`error`) et `StepQuote.tsx` les affiche (spinner, récapitulatif de succès, message d'erreur
avec fallback téléphone/WhatsApp).

Pour passer à Resend/Nodemailer : remplacer le corps de `sendQuoteRequest` par un
`fetch("/api/send-quote", { method: "POST", body: JSON.stringify(payload) })` vers votre
route serverless — la signature ne change pas, aucun composant n'a besoin d'être modifié.

## SEO local Bordeaux/Gironde

- `index.html` (non fourni ici — géré par votre projet) doit poser `<html lang="fr">`.
- Hiérarchie de titres stricte : un seul `<h1>` (Hero), `<h2>` par section, `<h3>` pour les
  cartes/formules.
- `SeoJsonLd.tsx` injecte `CateringService` + `LocalBusiness` avec `areaServed` sur les
  communes de Gironde définies dans `config/site.ts` (`SERVICE_ZONES`).
- Tous les textes de contact/adresse/horaires viennent de `config/site.ts` — un seul
  fichier à modifier avant mise en production.

## Accessibilité

- Lien d'évitement "Aller au contenu principal".
- Menu mobile : `role="dialog"`, `aria-modal`, fermeture au clavier (Échap), focus renvoyé
  au bouton déclencheur, scroll de fond verrouillé.
- Champs de formulaire tous associés à un `<label htmlFor>`.
- Groupes de boutons (formule, lieu, options) exposés en `radiogroup` / `aria-pressed`.
- Contraste et focus visibles hérités des styles Tailwind par défaut du thème fourni.
