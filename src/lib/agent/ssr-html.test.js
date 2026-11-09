import { describe, expect, it } from "vitest";
import { documentTextLength, firstHeadingText } from "@/lib/agent/ssr-html.js";

const PAGES = ["/", "/Docs", "/Showcase", "/registry", "/ai"];

const base = process.env.SSR_BASE_URL ?? "http://127.0.0.1:8787";

async function fetchHtml(path) {
  const res = await fetch(`${base}${path}`, {
    headers: { Accept: "text/html" },
    signal: AbortSignal.timeout(8000),
  });
  const html = await res.text();
  return { status: res.status, html };
}

describe("SSR HTML (no JavaScript)", () => {
  it("serves >=500 chars of document text and a non-empty H1 on marketing pages", async () => {
    let reachable = true;
    try {
      await fetch(`${base}/`, { signal: AbortSignal.timeout(3000) });
    } catch {
      reachable = false;
    }
    if (!reachable) {
      return;
    }

    for (const path of PAGES) {
      const { status, html } = await fetchHtml(path);
      expect(status).toBe(200);
      expect(documentTextLength(html)).toBeGreaterThanOrEqual(500);
      expect(firstHeadingText(html).length).toBeGreaterThan(8);
    }
  });
});

describe("SSR HTML helpers", () => {
  it("extracts nested h1 text and body length", () => {
    const sample = `<html><body><main><h1>Design, meet <span>Engineering.</span></h1><p>${"content ".repeat(80)}</p></main></body></html>`;
    expect(firstHeadingText(sample)).toBe("Design, meet Engineering.");
    expect(documentTextLength(sample)).toBeGreaterThanOrEqual(500);
  });
});
