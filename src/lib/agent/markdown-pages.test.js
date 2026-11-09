import { describe, expect, it } from "vitest";
import { llmsTxtBody } from "@/lib/agent/llms-txt.server.js";
import { markdownForPath, notFoundMarkdown } from "@/lib/agent/markdown-pages.server.js";

describe("llms.txt", () => {
  it("follows llmstxt.org section order", () => {
    const body = llmsTxtBody();
    expect(body.startsWith("# orevrkplus")).toBe(true);
    expect(body).toMatch(/^> /m);
    expect(body).toContain("## When to use");
    expect(body).toContain("## Docs");
  });
});

describe("markdown pages", () => {
  it("serves homepage markdown with enough content", () => {
    const md = markdownForPath("/");
    expect(md).toBeTruthy();
    expect(md.length).toBeGreaterThan(500);
    expect(md).toMatch(/^# /);
  });

  it("serves 404 markdown with docs link", () => {
    const md = notFoundMarkdown("/nope");
    expect(md.length).toBeGreaterThan(20);
    expect(md).toContain("/llms.txt");
    expect(md).toContain("404");
  });
});
