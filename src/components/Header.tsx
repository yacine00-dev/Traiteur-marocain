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
            className="fixed inset-0 bg-background z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="h-[68px] flex items-center justify-between px-6 border-b border-border shrink-0">
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-foreground">
                {SITE.name}
              </span>
              <button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} aria-label="Fermer le menu">
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <motion.nav
              className="flex flex-col px-6 pt-10 overflow-y-auto"
              aria-label="Navigation mobile"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
              }}
            >
              {NAV_LINKS.map((l) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-serif text-[32px] italic text-foreground border-b border-border py-6 hover:text-primary transition-colors"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.nav>

            <div className="mt-auto p-6 border-t border-border">
              <a
                href="#devis"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-sans text-[11px] tracking-[0.22em] uppercase py-4 hover:bg-[#A84F33] transition-colors"
              >
                Demander un Devis
                <ChevronRight size={13} aria-hidden="true" />
              </a>
              <a
                href={CONTACT.phoneLink}
                className="w-full flex items-center justify-center gap-2 mt-3 font-sans text-[11px] tracking-[0.16em] uppercase text-foreground py-3"
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
