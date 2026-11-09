import { describe, expect, it } from "vitest";
import { parseAccept, preferredType } from "@/lib/agent/accept.server.js";

describe("parseAccept", () => {
  it("parses q-values and order", () => {
    const entries = parseAccept("text/markdown;q=0.9, text/html;q=1");
    expect(entries[0].type).toBe("text/markdown");
    expect(entries[0].q).toBe(0.9);
    expect(entries[1].q).toBe(1);
  });
});

describe("preferredType", () => {
  it("prefers text/markdown when listed first", () => {
    expect(preferredType("text/markdown, text/html", ["text/html", "text/markdown"])).toBe("text/markdown");
  });

  it("defaults to html without Accept", () => {
    expect(preferredType(null, ["text/html", "text/markdown"])).toBe("text/html");
  });

  it("returns null when client rejects all produced types", () => {
    expect(preferredType("text/html;q=0, text/markdown;q=0", ["text/html", "text/markdown"])).toBe(null);
  });
});
