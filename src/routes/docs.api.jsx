import { createFileRoute } from "@tanstack/react-router";

function ApiDocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-tight">orevrkplus API reference</h1>
      <p className="mt-4 leading-7 text-muted-foreground">
        Machine-readable schema:{" "}
        <a href="/openapi.json" className="underline underline-offset-4">
          openapi.json
        </a>
        . Errors are <code className="text-sm">application/problem+json</code>.
      </p>

      <section className="mt-12 space-y-10">
        <div>
          <h2 className="text-xl font-semibold">GET /api/health</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Returns service liveness and an ISO timestamp.</p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card p-4 text-xs">
            <code>{`{ "status": "ok", "service": "orevrkplus", "time": "..." }`}</code>
          </pre>
        </div>
        <div>
          <h2 className="text-xl font-semibold">GET /api/time</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Current server time.</p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card p-4 text-xs">
            <code>{`{ "now": "2026-11-09T12:00:00.000Z" }`}</code>
          </pre>
        </div>
        <div>
          <h2 className="text-xl font-semibold">GET /api/npm/{`{name}`}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">npm packument JSON. Use GET /api/npm/-/ping for registry ping.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Error format</h2>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card p-4 text-xs leading-6">
            <code>{`{
  "type": "https://orevrkplus.site/problems/NOT_FOUND",
  "title": "Not Found",
  "status": 404,
  "detail": "...",
  "code": "NOT_FOUND",
  "resolution": "..."
}`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/docs/api")({
  component: ApiDocsPage,
  head: () => ({
    meta: [
      { title: "orevrkplus API reference" },
      { name: "description", content: "REST reference for orevrkplus health, time, and npm registry APIs." },
    ],
    links: [
      { rel: "alternate", type: "text/markdown", href: "/docs/api.md" },
      { rel: "describedby", href: "/llms.txt" },
    ],
  }),
});
