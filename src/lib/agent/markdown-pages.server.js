import brand from "@/lib/brand.config";
import createOvkApp from "@/lib/create-ovk-app.meta";

const SITE = "https://orevrkplus.site";

/** @type {Record<string, { title: string; body: string }>} */
const PAGES = {
  "/": {
    title: "orevrkplus — full-stack React framework",
    body: `# orevrkplus — full-stack React framework

> ${brand.tagline}. Create sites with create-ovk-app (Vite), or ship full-stack apps on TanStack Start with file-based routing, server functions, and server-side rendering.

orevrkplus is the home for the **create-ovk-app** CLI, an npm-compatible registry, and documentation for building modern web apps. Node.js 20+, Vite, and MIT-licensed starters get you from zero to \`dist/\` fast.

## Get started

Run:

\`\`\`bash
${brand.command}
\`\`\`

Then \`npm install\` and \`npm run dev\`. Edit \`src/\`, build with \`npm run build\`, and publish \`dist/\` to any static host or use Cloudflare deployment helpers from the starter.

## Features

- **One command to begin** — scaffold with create-ovk-app.
- **Vite-powered dev** — hot reload at localhost:3000.
- **Clear structure** — source in \`src/\`, assets in \`public/\`, output in \`dist/\`.
- **Registry** — install packages from ${SITE}/registry via \`/api/npm\`.
- **API** — health, time, and registry endpoints (see [API docs](${SITE}/docs/api)).

## Links

- [Documentation](${SITE}/Docs)
- [create-ovk-app](${SITE}${createOvkApp.sitePath})
- [npm registry](${SITE}/registry)
- [Showcase](${SITE}/Showcase)
- [GitHub — devstacksdk](${createOvkApp.githubOrg})
- [GitHub — create-ovk-app](${createOvkApp.repository})
- [llms.txt](${SITE}/llms.txt)
- [OpenAPI](${SITE}/openapi.json)
`,
  },
  "/Docs": {
    title: "orevrkplus API — documentation",
    body: `# orevrkplus API — documentation

> Developer docs for orevrkplus: HTTP APIs, the create-ovk-app CLI, registry, and how agents should call them.

## HTTP API

Base URL: \`${SITE}\`

| Method | Path | Description |
| --- | --- | --- |
| GET | /api/health | Liveness and service metadata |
| GET | /api/time | Current server time (ISO 8601) |
| GET | /api/npm/* | npm-compatible registry (packuments, tarballs) |

Errors use \`application/problem+json\` (RFC 9457) with \`type\`, \`title\`, \`status\`, \`detail\`, and a stable \`code\`.

Full schema: [openapi.json](${SITE}/openapi.json)

## CLI

- [create-ovk-app](${SITE}${createOvkApp.sitePath}) — \`${createOvkApp.scaffoldCommand}\`
- Source: [${createOvkApp.repository}](${createOvkApp.repository})

## When things go wrong

- Unknown API paths return problem+json 404.
- Unsupported methods return 405 with \`Allow\` and problem+json.
- For HTML, use normal pages; for agents, send \`Accept: text/markdown\` or read [llms.txt](${SITE}/llms.txt).
`,
  },
  "/docs/api": {
    title: "orevrkplus API reference",
    body: `# orevrkplus API reference

Machine-readable spec: [openapi.json](${SITE}/openapi.json)

## GET /api/health

Returns \`{ "status": "ok", "service": "orevrkplus", ... }\`.

## GET /api/time

Returns \`{ "now": "<ISO-8601>" }\`.

## GET /api/npm/{name}

npm packument JSON. Use \`/-/ping\` for registry ping.

Errors: \`application/problem+json\` with \`code\` such as \`NOT_FOUND\`, \`METHOD_NOT_ALLOWED\`, \`BAD_REQUEST\`.
`,
  },
  "/registry": {
    title: "npm registry — orevrkplus",
    body: `# npm registry — orevrkplus

> An npm-compatible registry hosted at \`${SITE}/api/npm\`.

Configure npm:

\`\`\`bash
npm config set @onenex:registry ${SITE}/api/npm
\`\`\`

Browse packages at [${SITE}/registry](${SITE}/registry).
`,
  },
  "/Showcase": {
    title: "Showcase — orevrkplus",
    body: `# Showcase — orevrkplus

> Example sites and templates built with orevrkplus and create-ovk-app.

Visit [${SITE}/Showcase](${SITE}/Showcase) for the gallery. Starters live on [GitHub templates](${brand.links.templates}).
`,
  },
  "/create-ovk-app": {
    title: "create-ovk-app — orevrkplus",
    body: `# create-ovk-app

> ${createOvkApp.description}

Official npm package \`${createOvkApp.packageName}\` (${createOvkApp.license}). Node ${createOvkApp.nodeEngine}.

## Scaffold

\`\`\`bash
${createOvkApp.scaffoldCommand}
${createOvkApp.afterScaffold.join("\n")}
\`\`\`

Help: \`${createOvkApp.npmInvoke} --help\` (flags: ${createOvkApp.helpFlags.map((f) => `\`${f}\``).join(", ")}). Default directory if omitted: \`${createOvkApp.defaultProjectName}\`.

## Project scripts (generated app)

${createOvkApp.projectScripts.map((row) => `- \`${row.command}\` — ${row.result}`).join("\n")}

## Links

- [Repository](${createOvkApp.repository})
- [GitHub org](${createOvkApp.githubOrg})
`,
  },
  "/cli": {
    title: "create-ovk-app — orevrkplus",
    body: `# create-ovk-app

Permanent URL: [${SITE}${createOvkApp.sitePath}](${SITE}${createOvkApp.sitePath})
`,
  },
};

/**
 * @param {string} pathname
 * @returns {string | null}
 */
const MARKDOWN_ALIASES = {
  "/docs": "/Docs",
};

export function markdownForPath(pathname) {
  const normalized = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const key = MARKDOWN_ALIASES[normalized] || normalized;
  const page = PAGES[key] || PAGES[normalized] || PAGES[pathname];
  return page ? page.body : null;
}

/**
 * @param {string} pathname
 * @returns {string | null}
 */
export function markdownAlternatePath(pathname) {
  const md = markdownForPath(pathname);
  if (!md) return null;
  const normalized = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return normalized === "/" ? "/index.md" : `${normalized}.md`;
}

export function notFoundMarkdown(pathname) {
  return `# Not found

The path \`${pathname}\` does not exist on orevrkplus.

## What to try

- [Home](${SITE}/)
- [Documentation](${SITE}/Docs)
- [llms.txt](${SITE}/llms.txt) — agent overview and links
- [Sitemap](${SITE}/sitemap.xml)
- [OpenAPI](${SITE}/openapi.json)

HTTP status: **404**
`;
}

export { SITE, PAGES };
