import { GlobalDefs } from "./components/GlobalDefs";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ZelligeDivider } from "./components/ZelligeDivider";
import { CouscousAnatomy } from "./components/CouscousAnatomy";
import { Offerings } from "./components/Offerings";
import { QuoteBuilder } from "./components/QuoteBuilder";
import { Footer } from "./components/Footer";
import { SeoJsonLd } from "./components/SeoJsonLd";

/**
 * `lang="fr"` doit être posé sur la balise <html> racine du document
 * (index.html en Vite, ou le composant <Html> de votre framework SSR) —
 * il ne peut pas être injecté depuis ce composant.
 */
export default function App() {
  return (
    <div className="bg-background text-foreground font-sans overflow-x-hidden">
      <SeoJsonLd />
      <GlobalDefs />
      <Header />
      <main id="main-content">
        <Hero />
        <ZelligeDivider />
        <CouscousAnatomy />
        <ZelligeDivider />
        <Offerings />
        <ZelligeDivider dark />
        <QuoteBuilder />
      </main>
      <Footer />
    </div>
  );
}
