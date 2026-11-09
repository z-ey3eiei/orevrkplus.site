import { createFileRoute } from "@tanstack/react-router";
import { problemResponse } from "@/lib/agent/problem.server";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () =>
        Response.json(
          {
            status: "ok",
            service: "orevrkplus",
            time: new Date().toISOString(),
          },
          { headers: { "cache-control": "no-store" } },
        ),
      POST: async ({ request }) =>
        problemResponse({
          status: 405,
          title: "Method Not Allowed",
          detail: "Use GET /api/health to check service health.",
          code: "METHOD_NOT_ALLOWED",
          instance: new URL(request.url).pathname,
        }),
    },
  },
});
