import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/sdk")({
  head: () => ({ meta: [{ title: "orevrkplus SDK \u2014 @onenex/sdk" }, { name: "description", content: "Documentation status for the @onenex/sdk integration shown on orevrkplus." }], links: [{ rel: "canonical", href: "https://orevrkplus.site/sdk" }] }),
  component: ToolDocs,
});
function ToolDocs() {
  return <article className="mx-auto max-w-4xl px-6 py-16 text-foreground">
    <a href="/Docs" className="text-foreground/70 underline">orevrkplus API Documentation</a>
    <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">orevrkplus SDK — @onenex/sdk</h1>
    <p className="mt-4 text-foreground/70">Documentation status for the @onenex/sdk integration shown on orevrkplus.</p>
    <p className="mt-6">The website contains an @onenex/sdk example. This repository does not include that SDK implementation or a verified public release reference. Installation instructions, authentication contracts and method signatures are not yet available here.</p><p className="mt-4">The website itself uses the third-party @base44/sdk dependency. That dependency is not an orevrkplus SDK release.</p>
    <nav aria-label="Developer documentation" className="mt-10 flex flex-wrap gap-6 underline"><a href="/Docs">API</a><a href="/cli">CLI</a><a href="/sdk">SDK</a><a href="/mcp">MCP</a><a href="https://github.com/z-ey3eiei/orevrkplus.site">Website source</a></nav>
  </article>;
}
