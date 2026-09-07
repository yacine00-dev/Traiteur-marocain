import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

function DesktopAnatomy() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start start", "end end"],
  });

  const dishScale = useTransform(scrollYProgress, [0, 0.15], [0.94, 1.05]);
  const dishY = useTransform(scrollYProgress, [0, 1], [0, -10]);

  useEffect(() => {
    const trigger = triggerRef.current;
    const pinContainer = pinContainerRef.current;
    const video = videoRef.current;

    if (!trigger || !pinContainer || !video) return;

    let triggerInstance: ScrollTrigger | null = null;

    const initScrollVideo = () => {
      // Sécurité : on s'assure que la durée est un chiffre valide
      if (Number.isNaN(video.duration) || video.duration === 0) return;

      // --- PARAMÈTRE IMPORTANT ---
      // On coupe la vidéo 1.5 seconde avant la fin pour éviter la transition sombre
      // Si la vidéo coupe trop tôt, passe à 1.0. Si on voit encore le noir, passe à 2.0.
      const SECONDES_A_COUPER_A_LA_FIN = 1.5; 
      const targetTime = Math.max(0, video.duration - SECONDES_A_COUPER_A_LA_FIN);

      triggerInstance = ScrollTrigger.create({
        trigger: trigger,
        pin: pinContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1, // Lissage premium (ni trop lent, ni haché)
        animation: gsap.fromTo(
          video,
          { currentTime: 0 },
          { currentTime: targetTime, ease: "none" }
        ),
      });
    };

    if (video.readyState >= 1) {
      initScrollVideo();
    } else {
      video.addEventListener("loadedmetadata", initScrollVideo);
    }

    return () => {
      video.removeEventListener("loadedmetadata", initScrollVideo);
      if (triggerInstance) triggerInstance.kill();
    };
  }, []);

return (
    <div ref={triggerRef} className="hidden lg:block relative h-[250vh]">
      {/* Hauteur passée à 400vh pour étirer la timeline et adoucir la vitesse d'animation de la vidéo */}
      <div ref={pinContainerRef} className="w-full h-screen flex flex-col justify-center overflow-hidden">
        <div className="flex items-center gap-4 xl:gap-12 max-w-[1440px] mx-auto w-full px-12 xl:px-20">
          
          <div className="flex-1 flex flex-col justify-around h-[500px]">
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
            {/* TAILLE AUGMENTÉE : w-[380px] h-[520px] sur desktop, encore plus grand sur écran XL */}
            <div className="relative w-[500px] xl:w-[720px] aspect-video">
              <video
                ref={videoRef}
                src="/Video cousco5.webm"
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover mix-blend-multiply pointer-events-none"
              />
            </div>
            <div className="mt-8 text-center">
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                Couscous Royal
              </p>
              <p className="font-serif text-[15px] italic text-primary mt-1">Plat Signature</p>
            </div>
          </motion.div>

          <div className="flex-1 flex flex-col justify-around h-[500px]">
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

function MobileAnatomy() {
  return (
    <div className="lg:hidden flex flex-col gap-8 px-4">
      <div className="flex flex-col items-center mb-6 mt-8">
        {/* TAILLE MOBILE AUGMENTÉE : w-[280px] h-[380px] */}
        <div className="w-[380px] h-[380px] bg-[#E8DFD0] overflow-hidden shadow-warm" style={{ clipPath: "url(#moorish-arch)" }}>
          <video
            src="/Video cousco.mp4"
            autoPlay
            loop
            muted
            playsInline
            /* Même système de recadrage sur mobile pour cacher la barre */
            className="w-full h-full object-cover object-[center_20%] scale-[1.12] pointer-events-none"
          />
        </div>
        <p className="font-serif text-[14px] italic text-primary mt-5">Plat Signature</p>
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
    <section className="py-28 px-0 lg:px-0 bg-[#FAF7F2]" id="savoirfaire" aria-labelledby="savoirfaire-heading">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-20">
          <p className="font-sans text-[10px] tracking-[0.38em] uppercase text-primary mb-5">Savoir-Faire</p>
          <h2
            id="savoirfaire-heading"
            className="font-serif text-[42px] md:text-[56px] font-light text-[#3E4B39] italic leading-tight mb-5"
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