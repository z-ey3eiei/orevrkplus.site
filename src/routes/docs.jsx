import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import brand from "@/lib/brand.config";

const endpoints = [
  { method: "GET", path: "/api/health", summary: "Liveness and service metadata" },
  { method: "GET", path: "/api/time", summary: "Current server time (ISO 8601)" },
  { method: "GET", path: "/api/npm/{name}", summary: "npm packument for a package" },
  { method: "GET", path: "/api/npm/-/ping", summary: "npm registry ping" },
];

function DocsPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Documentation</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">orevrkplus API</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            HTTP APIs, registry endpoints, and developer resources for orevrkplus and create-ovk-app. Agents can read this
            page with <code className="text-sm">Accept: text/markdown</code> or start from{" "}
            <a href="/llms.txt" className="underline underline-offset-4">
              llms.txt
            </a>
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/docs/api">
                API reference <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href="/openapi.json">OpenAPI JSON</a>
            </Button>
            <Button asChild variant="outline">
              <a href={brand.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Tools</h2>
        <ul className="mt-6 space-y-4 text-sm leading-6 text-muted-foreground">
          <li>
            <Link to="/create-ovk-app" className="font-medium text-foreground underline-offset-4 hover:underline">
              create-ovk-app
            </Link>
            — scaffold a Vite site with <code className="text-xs">{brand.command}</code>
          </li>
          <li>
            <Link to="/registry" className="font-medium text-foreground underline-offset-4 hover:underline">
              npm registry
            </Link>
            — install packages from <code className="text-xs">/api/npm</code>
          </li>
        </ul>

        <h2 className="mt-14 text-2xl font-semibold tracking-tight">HTTP API overview</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Errors use <code className="text-xs">application/problem+json</code> (RFC 9457) with stable <code className="text-xs">code</code>{" "}
          values. Base URL: <code className="text-xs">https://orevrkplus.site</code>
        </p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-semibold">Method</th>
                <th className="px-4 py-3 font-semibold">Path</th>
                <th className="px-4 py-3 font-semibold">Summary</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((row) => (
                <tr key={row.path} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs">{row.method}</td>
                  <td className="px-4 py-3 font-mono text-xs">{row.path}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/docs")({
  component: DocsPage,
  head: () => ({
    meta: [
      { title: "orevrkplus API — documentation" },
      {
        name: "description",
        content: "orevrkplus API and developer docs: health, time, npm registry, create-ovk-app CLI, and OpenAPI.",
      },
      {
        name: "keywords",
        content:
          "orevrkplus, create-ovk-app, API, TanStack Start, React framework, npm registry, OpenAPI, server functions",
      },
    ],
    links: [
      { rel: "alternate", type: "text/markdown", href: "/docs.md" },
      { rel: "describedby", href: "/llms.txt" },
    ],
  }),
});
