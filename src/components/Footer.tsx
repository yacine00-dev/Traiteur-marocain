import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CONTACT, LEGAL_LINKS, NAV_LINKS, SERVICE_ZONES, SITE } from "../config/site";

export function Footer() {
  return (
    <footer className="bg-[#1C1917] text-[#A8A29E]" id="contact">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div>
            <p className="font-serif text-[#FAF7F2] text-[17px] leading-snug mb-1">{SITE.name}</p>
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-primary mb-6">Bordeaux · Traiteur</p>
            <p className="font-sans text-[12px] leading-relaxed text-muted-foreground mb-8">
              Traiteur marocain &amp; méditerranéen à Bordeaux depuis {SITE.foundedYear}. Réceptions, mariages,
              séminaires en Gironde.
            </p>
            <div className="flex flex-col gap-3.5">
              <a href={CONTACT.phoneLink} className="flex items-center gap-3 group">
                <Phone size={13} className="text-primary shrink-0" aria-hidden="true" />
                <span className="font-sans text-[13px] text-[#FAF7F2] group-hover:text-primary transition-colors">
                  {CONTACT.phoneDisplay}
                </span>
              </a>
              <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                <MessageCircle size={13} className="text-primary shrink-0" aria-hidden="true" />
                <span className="font-sans text-[13px] text-[#FAF7F2] group-hover:text-primary transition-colors">
                  WhatsApp direct
                </span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 group">
                <Mail size={13} className="text-primary shrink-0" aria-hidden="true" />
                <span className="font-sans text-[12px] text-[#FAF7F2] group-hover:text-primary transition-colors">
                  {CONTACT.email}
                </span>
              </a>
            </div>
          </div>

          <nav aria-labelledby="footer-nav-heading">
            <p id="footer-nav-heading" className="font-sans text-[9px] tracking-[0.32em] uppercase text-muted-foreground mb-6">
              Navigation
            </p>
            <ul className="space-y-3">
              {[...NAV_LINKS, { label: "Contact", href: "#contact" }].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-sans text-[13px] text-[#A8A29E] hover:text-[#FAF7F2] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-sans text-[9px] tracking-[0.32em] uppercase text-muted-foreground mb-6">
              Horaires &amp; Adresse
            </p>
            <div className="space-y-2 mb-7">
              {CONTACT.openingHours.map((row) => (
                <div key={row.days} className="flex justify-between gap-4">
                  <span className="font-sans text-[12px] text-muted-foreground">{row.days}</span>
                  <span className="font-sans text-[12px] text-[#A8A29E]">{row.hours}</span>
                </div>
              ))}
            </div>
            <address className="flex items-start gap-2 not-italic">
              <MapPin size={13} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
              <p className="font-sans text-[12px] leading-relaxed text-muted-foreground">
                {CONTACT.address.street}
                <br />
                {CONTACT.address.postalCode} {CONTACT.address.city}, France
              </p>
            </address>
          </div>

          <div>
            <p className="font-sans text-[9px] tracking-[0.32em] uppercase text-muted-foreground mb-6">
              Zones d'Intervention
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {SERVICE_ZONES.map((z) => (
                <span
                  key={z}
                  className="font-sans text-[9px] tracking-[0.1em] uppercase border border-[#2D2825] text-muted-foreground px-2 py-1 hover:border-primary/40 hover:text-[#A8A29E] transition-colors cursor-default"
                >
                  {z}
                </span>
              ))}
            </div>
            <p className="font-sans text-[11px] text-muted-foreground leading-relaxed">
              Livraison &amp; service sur l'ensemble de la Gironde et la région Nouvelle-Aquitaine.
            </p>
          </div>
        </div>
      </div>

      <div className="relative h-8 overflow-hidden opacity-60" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
          <rect width="100%" height="100%" fill="url(#zellige)" />
        </svg>
        <div className="absolute inset-x-0 top-0 h-px bg-[#2D2825]" />
      </div>

      <div className="border-t border-[#2D2825]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-5 flex flex-col sm:flex-row justify-between gap-3">
          <p className="font-sans text-[11px] text-[#4A4540]">
            © {new Date().getFullYear()} {SITE.name}. Tous droits réservés.
          </p>
          <div className="flex gap-6 flex-wrap">
            {LEGAL_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="font-sans text-[11px] text-[#4A4540] hover:text-muted-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
