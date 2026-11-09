import { createFileRoute } from "@tanstack/react-router";
import { problemResponse } from "@/lib/agent/problem.server";

// A server route: a raw HTTP endpoint that lives next to the pages. Handlers get
// `context.getBase44()` like server functions do. Never define routes under
// /api/apps or /api/app-logs — those belong to the Base44 platform.
export const Route = createFileRoute("/api/time")({
  server: {
    handlers: {
      GET: async () => Response.json({ now: new Date().toISOString() }, { headers: { "cache-control": "no-store" } }),
      POST: ({ request }) =>
        problemResponse({
          status: 405,
          title: "Method Not Allowed",
          detail: "Use GET /api/time for the current server time.",
          code: "METHOD_NOT_ALLOWED",
          instance: new URL(request.url).pathname,
        }),
    },
  },
});
