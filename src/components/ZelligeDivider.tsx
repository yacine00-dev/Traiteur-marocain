interface ZelligeDividerProps {
  dark?: boolean;
}

/** Séparateur discret entre sections : filigrane zellige à 5% + losange central. */
export function ZelligeDivider({ dark = false }: ZelligeDividerProps) {
  return (
    <div
      className={`relative h-14 flex items-center overflow-hidden ${dark ? "bg-[#1C1917]" : "bg-background"}`}
      role="separator"
      aria-hidden="true"
    >
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
        <rect width="100%" height="100%" fill="url(#zellige)" />
      </svg>
      <div className={`absolute inset-x-10 h-px ${dark ? "bg-[#2A2522]" : "bg-border"}`} />
      <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center">
        <svg viewBox="0 0 20 20" width="14" height="14">
          <path d="M10,1 L19,10 L10,19 L1,10 Z" fill="none" stroke="#C25E3E" strokeWidth="1" />
          <path d="M10,5 L15,10 L10,15 L5,10 Z" fill="#C25E3E" />
        </svg>
      </div>
    </div>
  );
}
