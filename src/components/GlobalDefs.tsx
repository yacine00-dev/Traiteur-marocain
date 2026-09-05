/**
 * Définitions SVG partagées (clip-paths d'arches mauresques + motif zellige).
 * Rendu une seule fois en tête d'arbre ; référencé ailleurs via url(#id).
 */
export function GlobalDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute", overflow: "hidden", pointerEvents: "none" }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Arche mauresque en fer à cheval */}
        <clipPath id="moorish-arch" clipPathUnits="objectBoundingBox">
          <path d="M0,1 L0,0.40 C0,0.12 0.18,0 0.50,0 C0.82,0 1,0.12 1,0.40 L1,1 Z" />
        </clipPath>
        {/* Arche haute pour le hero */}
        <clipPath id="moorish-arch-tall" clipPathUnits="objectBoundingBox">
          <path d="M0,1 L0,0.32 C0,0.10 0.18,0 0.50,0 C0.82,0 1,0.10 1,0.32 L1,1 Z" />
        </clipPath>
        {/* Carreau zellige géométrique */}
        <pattern id="zellige" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M14,1 L27,14 L14,27 L1,14 Z" fill="none" stroke="#1C1917" strokeWidth="0.6" />
          <path d="M14,7 L21,14 L14,21 L7,14 Z" fill="none" stroke="#1C1917" strokeWidth="0.4" />
          <circle cx="14" cy="14" r="1.2" fill="#1C1917" />
          <circle cx="0" cy="0" r="0.6" fill="#1C1917" />
          <circle cx="28" cy="0" r="0.6" fill="#1C1917" />
          <circle cx="0" cy="28" r="0.6" fill="#1C1917" />
          <circle cx="28" cy="28" r="0.6" fill="#1C1917" />
        </pattern>
      </defs>
    </svg>
  );
}
