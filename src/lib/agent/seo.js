import brand from "@/lib/brand.config";
import createOvkApp from "@/lib/create-ovk-app.meta";

const SITE = "https://orevrkplus.site";

/** Head-only SEO; not used by existing page components. */
export const agentMetaKeywords = [
  "orevrkplus",
  "create-ovk-app",
  "TanStack Start",
  "React framework",
  "Vite",
  "npm registry",
];

export const agentJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: brand.name,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      description: brand.description,
      url: `${SITE}/`,
      keywords: agentMetaKeywords.join(", "),
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "SoftwareApplication",
      name: createOvkApp.packageName,
      description: createOvkApp.description,
      url: `${SITE}${createOvkApp.sitePath}`,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      isRelatedTo: { "@type": "SoftwareApplication", name: brand.name, url: `${SITE}/` },
      sameAs: [createOvkApp.repository],
    },
    {
      "@type": "Organization",
      name: brand.name,
      url: `${SITE}/`,
      description: brand.description,
      knowsAbout: agentMetaKeywords,
      sameAs: [createOvkApp.githubOrg, createOvkApp.repository],
    },
  ],
};
