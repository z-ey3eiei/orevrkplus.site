/**
 * ONENEXT brand configuration.
 * Single source of truth for the brand name, wordmark mark, palette and links.
 * Components read their brand strings from here instead of hard-coded text.
 * `accent` mirrors the colour tokens in src/styles/tokens.css.
 */
export const brand = {
  name: "ONENEXT",
  wordmark: { open: "<", close: ">" },
  tagline: "The React framework for teams that ship",
  description:
    "ONENEXT is a full-stack React framework with routing, data loading and rendering built in, so teams can focus on the product instead of the plumbing.",
  command: "npx create-onenext-app@latest",
  accent: {
    base: "#FF0000", // hsl(0 100% 50%) — --primary
    hover: "#E60000", // hsl(0 100% 45%) — --accent
    token: "0 100% 50%",
  },
  links: {
    home: "/",
    docs: "/Docs",
    showcase: "/Showcase",
    registry: "/registry",
    learn: "#",
    blog: "#",
    templates: "#",
    deploy: "#",
    guides: "#",
    cli: "#",
    releases: "#",
    changelog: "#",
    community: "#",
    support: "#",
    routing: "#",
    dataFetching: "#",
    rendering: "#",
    styling: "#",
    serverFunctions: "#",
    apiRoutes: "#",
    caching: "#",
    middleware: "#",
    about: "#",
    why: "#",
    openSource: "#",
    privacy: "#",
    terms: "#",
    cookies: "#",
    github: "https://github.com",
    bluesky: "#",
    x: "https://x.com",
  },
};

export default brand;