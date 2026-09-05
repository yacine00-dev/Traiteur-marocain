import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface Ingredient {
  name: string;
  desc: string;
}

const LEFT_INGREDIENTS: Ingredient[] = [
  {
    name: "Fine semoule",
    desc: "Roulée à la main, cuite trois fois à la vapeur d'un bouillon de coriandre fraîche",
  },
  {
    name: "Bouillon au safran",
    desc: "Mijoté 6 heures avec gingembre, curcuma et ras el hanout — infusé à chaud",
  },
  {
    name: "Merguez artisanale",
    desc: "Agneau et bœuf épicés selon la recette familiale, grillées à l'instant du service",
  },
];

const RIGHT_INGREDIENTS: Ingredient[] = [
  {
    name: "Agneau confit",
    desc: "Épaule de 12h, fondante à cœur, glacée au miel d'acacia et ras el hanout de Marrakech",
  },
  {
    name: "Légumes fondants",
    desc: "Courgettes, carottes, navets, pois chiches de saison — mijotés avec les viandes",
  },
  {
    name: "Ras el hanout maison",
    desc: "27 épices sélectionnées, moulues chaque matin — notre assemblage exclusif depuis 2008",
  },
];

const ALL_INGREDIENTS = [
  ...LEFT_INGREDIENTS.map((i) => ({ ...i, side: "left" as const })),
  ...RIGHT_INGREDIENTS.map((i) => ({ ...i, side: "right" as const })),
];

/** Fenêtre de révélation propre à un ingrédient, répartie sur la durée du pin. */
function getRevealWindow(index: number, total: number) {
  const start = (index / total) * 0.62;
  const end = start + 0.34;
  return { start, end };
}

interface AnatomyNodeProps {
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
  ingredient: Ingredient;
  side: "left" | "right";
}

/**
 * Un ingrédient + son indicateur de liaison filaire.
 * Chaque nœud possède sa propre fenêtre de progression pour créer un
 * étagement (les six éléments ne se révèlent pas tous en même temps).
 */
function AnatomyNode({ scrollYProgress, index, total, ingredient, side }: AnatomyNodeProps) {
  const { start, end } = getRevealWindow(index, total);
  const opacity = useTransform(scrollYProgress, [start, start + 0.08, end], [0, 1, 1]);
  const travel = useTransform(scrollYProgress, [start, end], [0, 1]);
  const x = useTransform(travel, (t) => (side === "left" ? -18 + -t * 24 : 18 + t * 24));
  const lineScale = useTransform(scrollYProgress, [start, start + 0.16], [0, 1]);
  const depthY = useTransform(travel, [0, 1], [6, 0]);

  return (
    <motion.div
      style={{ opacity, x, y: depthY }}
      className={`flex items-center gap-4 ${side === "left" ? "lg:justify-end" : ""}`}
    >
      {side === "left" && (
        <div className="flex-1 lg:text-right">
          <p className="font-serif text-[18px] text-foreground mb-1">{ingredient.name}</p>
          <p className="font-sans text-[12px] leading-relaxed text-muted-foreground lg:max-w-[240px] lg:ml-auto">
            {ingredient.desc}
          </p>
        </div>
      )}
      <div className="hidden lg:flex items-center shrink-0" style={{ transformOrigin: side === "left" ? "right" : "left" }}>
        {side === "left" && (
          <motion.div style={{ scaleX: lineScale }} className="w-10 h-px bg-foreground/15 origin-right" />
        )}
        <div className="w-2 h-2 rounded-full border border-primary bg-primary/20 shrink-0" />
        {side === "right" && (
          <motion.div style={{ scaleX: lineScale }} className="w-10 h-px bg-foreground/15 origin-left" />
        )}
      </div>
      {side === "right" && (
        <div className="flex-1">
          <p className="font-serif text-[18px] text-foreground mb-1">{ingredient.name}</p>
          <p className="font-sans text-[12px] leading-relaxed text-muted-foreground max-w-[240px]">
            {ingredient.desc}
          </p>
        </div>
      )}
    </motion.div>
  );
}

/** Version desktop : section épinglée, plat central ancré, ingrédients qui s'écartent au scroll. */
function DesktopAnatomy() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const dishScale = useTransform(scrollYProgress, [0, 0.15], [0.94, 1]);
  const dishY = useTransform(scrollYProgress, [0, 1], [0, -14]);

  return (
    <div ref={wrapperRef} className="hidden lg:block relative h-[280vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="flex items-center gap-0 max-w-[1440px] mx-auto w-full px-20">
          <div className="flex-1 flex flex-col justify-around h-[420px]">
            {LEFT_INGREDIENTS.map((ing, i) => (
              <AnatomyNode
                key={ing.name}
                scrollYProgress={scrollYProgress}
                index={i}
                total={ALL_INGREDIENTS.length}
                ingredient={ing}
                side="left"
              />
            ))}
          </div>

          <motion.div style={{ scale: dishScale, y: dishY }} className="flex-none flex flex-col items-center">
            <div className="w-[280px] h-[380px] bg-[#E8DFD0]" style={{ clipPath: "url(#moorish-arch)" }}>
              <img
                src="https://images.unsplash.com/photo-1661083098412-054431ab7112?w=560&h=760&fit=crop&auto=format"
                alt="Couscous royal servi dans un plat en terre cuite, vapeur montante"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-sans text-[9px] tracking-[0.28em] uppercase text-muted-foreground">
                Couscous Royal
              </p>
              <p className="font-serif text-[13px] italic text-primary mt-0.5">Plat Signature</p>
            </div>
          </motion.div>

          <div className="flex-1 flex flex-col justify-around h-[420px]">
            {RIGHT_INGREDIENTS.map((ing, i) => (
              <AnatomyNode
                key={ing.name}
                scrollYProgress={scrollYProgress}
                index={LEFT_INGREDIENTS.length + i}
                total={ALL_INGREDIENTS.length}
                ingredient={ing}
                side="right"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Fallback mobile : cartes verticales légères, révélées au passage dans le viewport. */
function MobileAnatomy() {
  return (
    <div className="lg:hidden flex flex-col gap-6">
      <div className="flex flex-col items-center mb-4">
        <div className="w-[220px] h-[280px] bg-[#E8DFD0]" style={{ clipPath: "url(#moorish-arch)" }}>
          <img
            src="https://images.unsplash.com/photo-1661083098412-054431ab7112?w=560&h=760&fit=crop&auto=format"
            alt="Couscous royal servi dans un plat en terre cuite, vapeur montante"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="font-serif text-[13px] italic text-primary mt-4">Plat Signature</p>
      </div>

      {ALL_INGREDIENTS.map((ing, i) => (
        <motion.div
          key={ing.name}
          className="flex items-start gap-4 border-t border-border pt-6"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: "easeOut" }}
        >
          <span className="font-serif text-[13px] text-primary mt-1 shrink-0">0{i + 1}</span>
          <div>
            <p className="font-serif text-[18px] text-foreground mb-1">{ing.name}</p>
            <p className="font-sans text-[12px] leading-relaxed text-muted-foreground">{ing.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function CouscousAnatomy() {
  return (
    <section className="py-28 px-6 lg:px-0" id="savoirfaire" aria-labelledby="savoirfaire-heading">
      <div className="max-w-[1440px] mx-auto lg:px-20">
        <div className="text-center mb-20">
          <p className="font-sans text-[10px] tracking-[0.38em] uppercase text-primary mb-5">Savoir-Faire</p>
          <h2
            id="savoirfaire-heading"
            className="font-serif text-[42px] md:text-[56px] font-light text-foreground italic leading-tight mb-5"
          >
            L'Art du Couscous
          </h2>
          <p className="font-sans text-[14px] text-muted-foreground max-w-[360px] mx-auto leading-relaxed">
            Un plat de six heures. Six composants. Une seule ambition — l'excellence de la tradition.
          </p>
        </div>
      </div>

      <DesktopAnatomy />
      <div className="max-w-[1440px] mx-auto">
        <MobileAnatomy />
      </div>

      <div className="max-w-[1440px] mx-auto mt-20 text-center px-6 lg:px-20">
        <blockquote className="font-serif text-[22px] md:text-[28px] italic font-light text-foreground max-w-2xl mx-auto leading-relaxed">
          « Le couscous n'est pas un plat. C'est une cérémonie. »
        </blockquote>
        <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-muted-foreground mt-4">
          Fatima Benali · Fondatrice
        </p>
      </div>
    </section>
  );
}
