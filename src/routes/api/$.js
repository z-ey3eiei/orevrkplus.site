import { createFileRoute } from "@tanstack/react-router";
import { problemResponse } from "@/lib/agent/problem.server";

export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      GET: ({ request }) =>
        problemResponse({
          status: 404,
          title: "Not Found",
          detail: `Unknown API path. See https://orevrkplus.site/openapi.json and /docs/api.`,
          code: "NOT_FOUND",
          instance: new URL(request.url).pathname,
        }),
      POST: ({ request }) =>
        problemResponse({
          status: 404,
          title: "Not Found",
          detail: `Unknown API path. See https://orevrkplus.site/openapi.json and /docs/api.`,
          code: "NOT_FOUND",
          instance: new URL(request.url).pathname,
        }),
      PUT: ({ request }) =>
        problemResponse({
          status: 404,
          title: "Not Found",
          detail: `Unknown API path. See https://orevrkplus.site/openapi.json and /docs/api.`,
          code: "NOT_FOUND",
          instance: new URL(request.url).pathname,
        }),
      DELETE: ({ request }) =>
        problemResponse({
          status: 404,
          title: "Not Found",
          detail: `Unknown API path. See https://orevrkplus.site/openapi.json and /docs/api.`,
          code: "NOT_FOUND",
          instance: new URL(request.url).pathname,
        }),
    },
  },
});
