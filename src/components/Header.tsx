import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT, NAV_LINKS, SITE } from "../config/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Verrouille le scroll du fond + rend le focus au bouton déclencheur à la fermeture.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fermeture au clavier (Échap) — essentiel pour l'accessibilité d'un menu plein écran.
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] bg-primary text-primary-foreground font-sans text-xs uppercase tracking-[0.14em] px-4 py-2"
      >
        Aller au contenu principal
      </a>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 h-[68px] flex items-center justify-between gap-8">
        <a href="/" className="flex flex-col leading-none shrink-0">
          <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-foreground">
            {SITE.name}
          </span>
          <span className="font-sans text-[9px] tracking-[0.32em] uppercase text-muted-foreground mt-0.5">
            Bordeaux · Traiteur depuis {SITE.foundedYear}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-sans text-[11px] tracking-[0.14em] uppercase text-foreground hover:text-primary transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          <a
            href="#devis"
            className="hidden lg:inline-flex items-center gap-2 bg-primary text-primary-foreground font-sans text-[10px] tracking-[0.22em] uppercase px-6 py-3 hover:bg-[#A84F33] transition-colors duration-200"
          >
            Demander un Devis
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="lg:hidden text-foreground p-1"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            /* Fond crème 100% opaque, z-index au sommet absolu */
            className="fixed inset-0 w-screen h-screen bg-[#FAF7F2] z-[9999] flex flex-col justify-between"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Barre supérieure avec bouton fermeture */}
            <div className="h-[68px] flex items-center justify-between px-6 border-b border-[#D4A373]/20 bg-[#FAF7F2] shrink-0">
              <div className="flex flex-col leading-none">
                <span className="font-sans text-[11px] tracking-[0.28em] uppercase text-[#1C1917] font-medium">
                  {SITE.name}
                </span>
                <span className="font-sans text-[9px] tracking-[0.32em] uppercase text-[#C25E3E] mt-0.5">
                  Bordeaux
                </span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                className="text-[#1C1917] p-2 hover:text-[#C25E3E] transition-colors rounded-full"
                aria-label="Fermer le menu"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            {/* Liens de navigation avec typographie élégante */}
            <motion.nav
              className="flex flex-col px-8 py-6 overflow-y-auto"
              aria-label="Navigation mobile"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
            >
              {NAV_LINKS.map((l, index) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline justify-between font-serif text-[30px] italic text-[#1C1917] border-b border-[#D4A373]/15 py-4 hover:text-[#C25E3E] transition-colors"
                  variants={{
                    hidden: { opacity: 0, x: -15 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <span>{l.label}</span>
                  <span className="font-sans text-[10px] tracking-widest text-[#D4A373] not-italic">
                    0{index + 1}
                  </span>
                </motion.a>
              ))}
            </motion.nav>

            {/* Pied de menu avec les boutons d'action */}
            <div className="p-6 border-t border-[#D4A373]/20 bg-[#F3EDE3]/60 shrink-0 flex flex-col gap-3">
              <a
                href="#devis"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#C25E3E] hover:bg-[#a84d30] text-[#FAF7F2] font-sans text-[11px] tracking-[0.22em] uppercase py-4 shadow-sm transition-all"
              >
                Demander un Devis
                <ChevronRight size={14} aria-hidden="true" />
              </a>
              <a
                href={CONTACT.phoneLink}
                className="w-full text-center font-sans text-[11px] tracking-[0.16em] uppercase text-[#1C1917] py-2 hover:text-[#C25E3E] transition-colors"
              >
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
