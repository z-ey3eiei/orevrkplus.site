/**
 * orevrkplus brand configuration.
 * Single source of truth for the brand name, wordmark mark, palette and links.
 * Components read their brand strings from here instead of hard-coded text.
 * `accent` mirrors the colour tokens in src/styles/tokens.css.
 */
export const brand = {
  name: "orevrkplus",
  tagline: "The starter for your next website",
  description:
    "Create an OREVRK PLUS website with Vite, edit your source, and build static files ready for your choice of host.",
  command: "npx create-ovk-app@latest my-app",
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
    learn: "/#get-started",
    blog: "#",
    templates: "https://github.com/devstacksdk/create-ovk-app/tree/main/templates/app",
    deploy: "/#deploy",
    guides: "https://github.com/devstacksdk/create-ovk-app#readme",
    cli: "https://github.com/devstacksdk/create-ovk-app#คำสั่ง",
    releases: "https://github.com/devstacksdk/create-ovk-app/releases",
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
    github: "https://github.com/devstacksdk/create-ovk-app",
    bluesky: "#",
    x: "https://x.com",
  },
};

export default brand;