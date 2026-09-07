import { useEffect, useRef } from "react";
import { ChevronRight, Phone } from "lucide-react";
import { useInView, animate } from "framer-motion";
import { CONTACT } from "../config/site";

// On sépare la valeur numérique du suffixe pour pouvoir animer le chiffre
const STATS = [
  { val: 400, suffix: "+", label: "Réceptions" },
  { val: 8, suffix: "", label: "Années d'expérience" },
  { val: 100, suffix: "%", label: "Fait maison" },
];

// Composant qui gère l'animation du compteur
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // once: false permet de rejouer l'animation à chaque fois que l'élément revient à l'écran
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.2, // Durée de l'animation en secondes
        ease: "easeOut", // Ralentit doucement à la fin
        onUpdate(val) {
          if (ref.current) {
            ref.current.textContent = Math.floor(val) + suffix;
          }
        },
      });
      return () => controls.stop();
    } else {
      // Remet à zéro quand on scrolle ailleurs
      if (ref.current) ref.current.textContent = "0" + suffix;
    }
  }, [isInView, value, suffix]);

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

export function Hero() {
  return (
    <section className="pt-[68px] min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 lg:px-20 py-20 lg:py-0 order-2 lg:order-1">
        <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-[#C25E3E] mb-8 font-medium">
          Traiteur Marocain &amp; Méditerranéen · Bordeaux
        </p>
        <h1 className="font-serif text-[42px] md:text-[54px] lg:text-[60px] xl:text-[68px] leading-[1.05] font-light text-[#1C1917] mb-8">
          Traiteur marocain&nbsp;&amp; méditerranéen pour vos réceptions d'exception à Bordeaux
        </h1>
        
        {/* Tailles de texte augmentées (text-[16px] md:text-[18px]) pour une meilleure lisibilité */}
        <p className="font-sans text-[16px] md:text-[18px] leading-relaxed text-[#1C1917]/70 max-w-[460px] mb-12">
          Depuis 2008, nous élevons l'art du couscous et des saveurs méditerranéennes au rang de
          haute gastronomie — mariages, dîners d'affaires et réceptions privées en Gironde.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#devis"
            className="inline-flex items-center justify-center gap-2 bg-[#C25E3E] text-[#FAF7F2] font-sans text-[12px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-[#a84d30] shadow-warm transition-all duration-300 hover:-translate-y-0.5"
          >
            Demander un Devis
            <ChevronRight size={14} aria-hidden="true" />
          </a>
          <a
            href={CONTACT.phoneLink}
            className="inline-flex items-center justify-center gap-2 border border-[#1C1917] text-[#1C1917] font-sans text-[12px] tracking-[0.16em] uppercase px-8 py-4 hover:bg-[#1C1917] hover:text-[#FAF7F2] transition-colors duration-300"
          >
            <Phone size={14} aria-hidden="true" />
            {CONTACT.phoneDisplay}
          </a>
        </div>

        <div className="mt-16 pt-10 border-t border-[#D4A373]/30 flex flex-wrap gap-12">
          {STATS.map((s) => (
            <div key={s.label}>
              {/* Taille des chiffres augmentée pour bien voir l'animation */}
              <p className="font-serif text-[42px] md:text-[48px] font-light text-[#1C1917] leading-none">
                <AnimatedNumber value={s.val} suffix={s.suffix} />
              </p>
              <p className="font-sans text-[11px] md:text-[12px] tracking-[0.15em] uppercase text-[#1C1917]/60 mt-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative bg-[#F3EDE3] flex items-center justify-center overflow-hidden order-1 lg:order-2 h-[55vw] lg:h-auto">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden="true">
          <rect width="100%" height="100%" fill="url(#zellige)" />
        </svg>

        <div className="relative w-[68%] h-[88%] max-w-[460px] shadow-warm-lg" style={{ clipPath: "url(#moorish-arch-tall)" }}>
          <img
            src="https://images.unsplash.com/photo-1773314863076-835e0bdbe3ea?w=900&h=1200&fit=crop&auto=format"
            alt="Table de réception marocaine richement garnie, mezze et plats d'apparat"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#C25E3E]/5 mix-blend-multiply" />
        </div>

        <div
          className="absolute w-[calc(68%+20px)] h-[calc(88%+20px)] max-w-[480px] border border-[#D4A373]/30 pointer-events-none"
          style={{ clipPath: "url(#moorish-arch-tall)" }}
        />

        <div className="absolute bottom-8 right-8 bg-[#FAF7F2]/95 backdrop-blur-sm border border-[#D4A373]/20 px-6 py-4 shadow-warm">
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C25E3E]">Réception privée</p>
          <p className="font-serif text-[16px] text-[#1C1917] mt-1 italic">Bordeaux, 2026</p>
        </div>
      </div>
    </section>
  );
}