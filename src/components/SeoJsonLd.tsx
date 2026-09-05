import { CONTACT, SERVICE_ZONES, SITE } from "../config/site";

/**
 * Données structurées Schema.org. Rendu côté serveur ou dans le <head> selon
 * votre framework (Next/Remix : dans le head via generateMetadata / meta();
 * Vite SPA classique : injecter via un composant monté dans <App /> comme ici,
 * ou pré-rendu côté build pour un bénéfice SEO optimal).
 */
export function SeoJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CateringService",
        "@id": `${SITE.url}/#catering`,
        name: SITE.name,
        description: SITE.description,
        image: "https://images.unsplash.com/photo-1773314863076-835e0bdbe3ea?w=1200&h=1200&fit=crop&auto=format",
        url: SITE.url,
        telephone: CONTACT.phoneLink.replace("tel:", ""),
        email: CONTACT.email,
        priceRange: "€€–€€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.address.street,
          postalCode: CONTACT.address.postalCode,
          addressLocality: CONTACT.address.city,
          addressCountry: CONTACT.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: CONTACT.geo.latitude,
          longitude: CONTACT.geo.longitude,
        },
        areaServed: SERVICE_ZONES.map((zone) => ({
          "@type": "City",
          name: zone,
        })),
        servesCuisine: ["Marocaine", "Méditerranéenne"],
        openingHoursSpecification: CONTACT.openingHoursSpecification.map((spec) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: spec.dayOfWeek,
          opens: spec.opens,
          closes: spec.closes,
        })),
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE.url}/#business`,
        name: SITE.legalName,
        foundingDate: `${SITE.foundedYear}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.address.street,
          postalCode: CONTACT.address.postalCode,
          addressLocality: CONTACT.address.city,
          addressCountry: CONTACT.address.country,
        },
        telephone: CONTACT.phoneLink.replace("tel:", ""),
        priceRange: "€€–€€€",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
