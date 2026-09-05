import { ChevronRight } from "lucide-react";

interface Offering {
  title: string;
  sub: string;
  desc: string;
  img: string;
  tag: string;
}

const OFFERINGS: Offering[] = [
  {
    title: "Mariages",
    sub: "Cérémonie & Réception",
    desc: "Du vin d'honneur au couscous royal de minuit — mariage total aux deux cultures, servi avec soin par notre brigade.",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&h=820&fit=crop&auto=format",
    tag: "Dès 45 €/pers.",
  },
  {
    title: "Buffets Entreprise",
    sub: "Séminaires & Événements",
    desc: "Mezze méditerranéens, plats chauds raffinés, service discret — pour séduire vos clients et fédérer vos équipes.",
    img: "https://images.unsplash.com/photo-1616668856493-9df876327739?w=700&h=820&fit=crop&auto=format",
    tag: "Dès 28 €/pers.",
  },
  {
    title: "Dîners & Plats Signatures",
    sub: "Soirées Privées & Galas",
    desc: "Menu dégustation en service à l'assiette, tajines grand format ou table d'hôtes orientale — selon votre vision.",
    img: "https://images.unsplash.com/photo-1663530761401-15eefb544889?w=700&h=820&fit=crop&auto=format",
    tag: "Dès 55 €/pers.",
  },
  {
    title: "Pâtisseries & Thé",
    sub: "Cornes de gazelle · Msemen · Baklava",
    desc: "Plateau artisanal servi avec un thé à la menthe préparé en salle — cérémonie orientale complète.",
    img: "https://images.unsplash.com/photo-1778448806194-8dc4f71f5a4c?w=700&h=820&fit=crop&auto=format",
    tag: "Dès 12 €/pers.",
  },
];

export function Offerings() {
  return (
    <section className="bg-[#1C1917] py-24 px-6 lg:px-20" id="menus" aria-labelledby="menus-heading">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <p className="font-sans text-[10px] tracking-[0.38em] uppercase text-primary mb-5">Nos Prestations</p>
            <h2 id="menus-heading" className="font-serif text-[42px] md:text-[56px] font-light text-[#FAF7F2] italic leading-tight">
              Pour chaque
              <br />
              réception
            </h2>
          </div>
          <p className="font-sans text-[13px] text-[#A8A29E] max-w-[340px] leading-relaxed">
            Chaque prestation est conçue sur-mesure, livrée et servie par notre brigade. Devis gratuit sous 48h,
            sans engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#2D2825]">
          {OFFERINGS.map((item) => (
            <a key={item.title} href="#devis" className="group relative bg-[#1C1917] overflow-hidden block">
              <div className="relative h-[300px] md:h-[360px] overflow-hidden bg-[#2D2825]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/20 to-transparent" />
                <span className="absolute top-5 right-5 font-sans text-[9px] tracking-[0.22em] uppercase bg-primary text-[#FAF7F2] px-3 py-1.5">
                  {item.tag}
                </span>
              </div>

              <div className="p-8 border-t border-[#2D2825] group-hover:border-primary/40 transition-colors duration-300">
                <p className="font-sans text-[9px] tracking-[0.28em] uppercase text-primary mb-2">{item.sub}</p>
                <h3 className="font-serif text-[26px] text-[#FAF7F2] mb-3">{item.title}</h3>
                <p className="font-sans text-[13px] leading-relaxed text-[#A8A29E]">{item.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-[#FAF7F2]/60 group-hover:text-primary transition-colors duration-300">
                  <span className="font-sans text-[10px] tracking-[0.18em] uppercase">Demander un devis</span>
                  <ChevronRight size={12} aria-hidden="true" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
