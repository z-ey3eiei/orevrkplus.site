import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/cli")({
  head: () => ({ meta: [{ title: "orevrkplus create-ovk-app CLI" }, { name: "description", content: "The create-ovk-app command displayed on the orevrkplus homepage." }], links: [{ rel: "canonical", href: "https://orevrkplus.site/cli" }] }),
  component: ToolDocs,
});
function ToolDocs() {
  return <article className="mx-auto max-w-4xl px-6 py-16 text-foreground">
    <a href="/Docs" className="text-foreground/70 underline">orevrkplus API Documentation</a>
    <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">orevrkplus create-ovk-app CLI</h1>
    <p className="mt-4 text-foreground/70">The create-ovk-app command displayed on the orevrkplus homepage.</p>
    <pre className="mt-6 overflow-x-auto rounded-lg border border-border bg-card p-4"><code>npx create-ovk-app@latest my-app</code></pre><p className="mt-6">create-ovk-app scaffolds an OREVRK PLUS starter. Version 1.0.1 requires Node.js 20 or newer.</p>
    <h2 className="mt-8 text-2xl font-semibold">Quick start</h2>
    <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card p-4"><code>{`npx create-ovk-app@latest my-app
cd my-app
npm install
npm run dev`}</code></pre>
    <p className="mt-4">Open http://localhost:3000 and edit src/main.js and src/style.css.</p>
    <h2 className="mt-8 text-2xl font-semibold">Build and export</h2>
    <p className="mt-4">Run npm run build to create dist/. Run npm run preview to inspect the build at http://localhost:4173. Run npm run export to build and package a project-name-dist.zip archive.</p>
    <p className="mt-4">The generated starter uses Vite. These commands describe the generated app, not the TanStack Start website hosting this documentation.</p>
    <p className="mt-4">Release reference: <a className="underline" href="https://www.npmjs.com/package/create-ovk-app">create-ovk-app on npm</a>. Source: <a className="underline" href="https://github.com/devstacksdk/create-ovk-app">devstacksdk/create-ovk-app</a>.</p>
    <nav aria-label="Developer documentation" className="mt-10 flex flex-wrap gap-6 underline"><a href="/Docs">API</a><a href="/cli">CLI</a><a href="/sdk">SDK</a><a href="/mcp">MCP</a><a href="https://github.com/z-ey3eiei/orevrkplus.site">Website source</a></nav>
  </article>;
}
