import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { preferredType } from "@/lib/agent/accept.server.js";
import { markdownForPath, notFoundMarkdown } from "@/lib/agent/markdown-pages.server.js";
import { openApiDocument } from "@/lib/agent/openapi.server.js";

describe("agent HTTP contracts", () => {
  it("openapi document has unique operationIds", () => {
    const doc = openApiDocument();
    const ids = Object.values(doc.paths).flatMap((path) =>
      Object.values(path).map((op) => op.operationId),
    );
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("simulates homepage markdown negotiation headers", () => {
    const chosen = preferredType("text/markdown", ["text/html", "text/markdown"]);
    expect(chosen).toBe("text/markdown");
    const body = markdownForPath("/");
    expect(body.length).toBeGreaterThan(500);
  });

  it("simulates 404 markdown body", () => {
    const body = notFoundMarkdown("/missing");
    expect(body).toContain("llms.txt");
    expect(body.length).toBeGreaterThan(20);
  });

  it("build output includes the worker entry", () => {
    const workerPath = fileURLToPath(new URL("../../../dist/server/index.js", import.meta.url));
    expect(existsSync(workerPath)).toBe(true);
  });
});
