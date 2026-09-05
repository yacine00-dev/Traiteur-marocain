import { ChevronRight, Phone } from "lucide-react";
import { CONTACT } from "../config/site";

const STATS = [
  { val: "800+", label: "Réceptions" },
  { val: "18", label: "Années d'expérience" },
  { val: "100%", label: "Fait maison" },
];

export function Hero() {
  return (
    <section className="pt-[68px] min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 lg:px-20 py-20 lg:py-0 order-2 lg:order-1">
        <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-primary mb-8">
          Traiteur Marocain &amp; Méditerranéen · Bordeaux
        </p>
        <h1 className="font-serif text-[42px] md:text-[54px] lg:text-[60px] xl:text-[68px] leading-[1.05] font-light text-foreground mb-8">
          Traiteur marocain&nbsp;&amp; méditerranéen pour vos réceptions d'exception à Bordeaux
        </h1>
        <p className="font-sans text-[14px] leading-relaxed text-muted-foreground max-w-[420px] mb-12">
          Depuis 2008, nous élevons l'art du couscous et des saveurs méditerranéennes au rang de
          haute gastronomie — mariages, dîners d'affaires et réceptions privées en Gironde.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#devis"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-sans text-[11px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-[#A84F33] transition-colors duration-200"
          >
            Demander un Devis
            <ChevronRight size={13} aria-hidden="true" />
          </a>
          <a
            href={CONTACT.phoneLink}
            className="inline-flex items-center justify-center gap-2 border border-foreground text-foreground font-sans text-[11px] tracking-[0.16em] uppercase px-8 py-4 hover:bg-foreground hover:text-background transition-colors duration-200"
          >
            <Phone size={13} aria-hidden="true" />
            {CONTACT.phoneDisplay}
          </a>
        </div>

        <div className="mt-16 pt-10 border-t border-border flex flex-wrap gap-10">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-[36px] font-light text-foreground leading-none">{s.val}</p>
              <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative bg-[#E8DFD0] flex items-center justify-center overflow-hidden order-1 lg:order-2 h-[55vw] lg:h-auto">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden="true">
          <rect width="100%" height="100%" fill="url(#zellige)" />
        </svg>

        <div className="relative w-[68%] h-[88%] max-w-[460px]" style={{ clipPath: "url(#moorish-arch-tall)" }}>
          <img
            src="https://images.unsplash.com/photo-1773314863076-835e0bdbe3ea?w=900&h=1200&fit=crop&auto=format"
            alt="Table de réception marocaine richement garnie, mezze et plats d'apparat"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#C25E3E]/8 mix-blend-multiply" />
        </div>

        <div
          className="absolute w-[calc(68%+20px)] h-[calc(88%+20px)] max-w-[480px] border border-[#1C1917]/12 pointer-events-none"
          style={{ clipPath: "url(#moorish-arch-tall)" }}
        />

        <div className="absolute bottom-8 right-8 bg-background/90 border border-border px-5 py-3">
          <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-primary">Réception privée</p>
          <p className="font-serif text-[15px] text-foreground mt-0.5 italic">Bordeaux, 2025</p>
        </div>
      </div>
    </section>
  );
}
