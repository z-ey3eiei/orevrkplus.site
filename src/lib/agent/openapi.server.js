import { SITE } from "@/lib/agent/markdown-pages.server";

const errorSchema = {
  type: "object",
  required: ["type", "title", "status", "detail"],
  properties: {
    type: { type: "string", format: "uri" },
    title: { type: "string" },
    status: { type: "integer" },
    detail: { type: "string" },
    code: { type: "string" },
    instance: { type: "string" },
    resolution: { type: "string" },
  },
};

export function openApiDocument() {
  return {
    openapi: "3.1.0",
    info: {
      title: "orevrkplus API",
      version: "1.0.0",
      description:
        "Public HTTP API for orevrkplus.site: health, time, and npm-compatible registry routes. Errors use application/problem+json (RFC 9457).",
    },
    servers: [{ url: SITE }],
    paths: {
      "/api/health": {
        get: {
          operationId: "getHealth",
          summary: "Service health",
          description: "Returns liveness and basic metadata for the orevrkplus worker.",
          responses: {
            "200": {
              description: "Service is healthy",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["status", "service"],
                    properties: {
                      status: { type: "string", enum: ["ok"] },
                      service: { type: "string" },
                      time: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Server error",
              content: { "application/problem+json": { schema: errorSchema } },
            },
          },
        },
      },
      "/api/time": {
        get: {
          operationId: "getTime",
          summary: "Current server time",
          responses: {
            "200": {
              description: "ISO 8601 timestamp",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["now"],
                    properties: { now: { type: "string", format: "date-time" } },
                  },
                },
              },
            },
            "405": {
              description: "Method not allowed",
              content: { "application/problem+json": { schema: errorSchema } },
            },
            "500": {
              description: "Server error",
              content: { "application/problem+json": { schema: errorSchema } },
            },
          },
        },
      },
      "/api/npm/-/{ping}": {
        get: {
          operationId: "npmPing",
          summary: "npm registry ping",
          parameters: [{ name: "ping", in: "path", required: true, schema: { type: "string", enum: ["ping"] } }],
          responses: {
            "200": {
              description: "Empty JSON object",
              content: { "application/json": { schema: { type: "object" } } },
            },
            "404": {
              description: "Not found",
              content: { "application/problem+json": { schema: errorSchema } },
            },
          },
        },
      },
      "/api/npm/{packageName}": {
        get: {
          operationId: "getNpmPackument",
          summary: "npm packument for a package",
          parameters: [{ name: "packageName", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": {
              description: "npm packument JSON",
              content: { "application/json": { schema: { type: "object" } } },
            },
            "400": {
              description: "Bad request",
              content: { "application/problem+json": { schema: errorSchema } },
            },
            "404": {
              description: "Package not found",
              content: { "application/problem+json": { schema: errorSchema } },
            },
          },
        },
        put: {
          operationId: "publishNpmPackage",
          summary: "Publish a package (admin token required)",
          parameters: [{ name: "packageName", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "201": { description: "Published" },
            "400": { description: "Bad request", content: { "application/problem+json": { schema: errorSchema } } },
            "403": { description: "Forbidden", content: { "application/problem+json": { schema: errorSchema } } },
          },
        },
      },
    },
    components: {
      schemas: {
        ProblemDetails: errorSchema,
      },
    },
  };
}
