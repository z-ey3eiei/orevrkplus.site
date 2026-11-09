import brand from "@/lib/brand.config";
import createOvkApp from "@/lib/create-ovk-app.meta";
import { SITE } from "@/lib/agent/markdown-pages.server";

export function llmsTxtBody() {
  return `# orevrkplus

> orevrkplus is a full-stack React framework site (TanStack Start on Cloudflare) and the home for create-ovk-app, a Vite website starter, plus an npm-compatible package registry.

Important notes:

- Marketing pages describe create-ovk-app (Vite, static \`dist/\`); this deployment uses TanStack Start with SSR, server functions, and API routes.
- HTTP APIs return RFC 9457 \`application/problem+json\` errors.
- Send \`Accept: text/markdown\` on page URLs for Markdown representations (\`Vary: Accept\`).

## Docs

- [Documentation](${SITE}/docs): Product and API overview for humans and agents
- [API reference](${SITE}/docs/api): REST endpoints and error format
- [OpenAPI 3.1](${SITE}/openapi.json): Machine-readable API schema

## Tools

- [create-ovk-app](${SITE}${createOvkApp.sitePath}): \`${createOvkApp.scaffoldCommand}\` — official orevrkplus scaffolder ([repo](${createOvkApp.repository}), [org](${createOvkApp.githubOrg}))
- [npm registry](${SITE}/registry): Install packages from \`${SITE}/api/npm\`

## When to use

- **Scaffold a Vite marketing or static site** — \`${createOvkApp.scaffoldCommand}\`, then \`${createOvkApp.afterScaffold.join("`, `")}\`; see ${SITE}${createOvkApp.sitePath}.
- **Install private or scoped packages** — use the registry URL \`${SITE}/api/npm\` and docs at \`/registry\`.
- **Check service health or server time** — \`GET /api/health\` and \`GET /api/time\` (see OpenAPI).
- **Read site content without HTML** — \`GET\` any documented page with \`Accept: text/markdown\`, or fetch paths listed in the Docs section above.

## Optional

- [Showcase](${SITE}/Showcase): Example projects
- [Ask AI](${SITE}/ai): On-site assistant (requires browser session)
- [GitHub — devstacksdk](${createOvkApp.githubOrg})
- [GitHub — create-ovk-app](${createOvkApp.repository})
`;
}
