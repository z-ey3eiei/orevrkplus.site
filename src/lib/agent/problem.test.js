import { describe, expect, it } from "vitest";
import { problemResponse } from "@/lib/agent/problem.server.js";

describe("problemResponse", () => {
  it("returns RFC 9457 problem+json", async () => {
    const res = problemResponse({
      status: 404,
      title: "Not Found",
      detail: "Missing",
      code: "NOT_FOUND",
    });
    expect(res.status).toBe(404);
    expect(res.headers.get("Content-Type")).toContain("application/problem+json");
    const body = await res.json();
    expect(body.status).toBe(404);
    expect(body.code).toBe("NOT_FOUND");
    expect(body.type).toContain("NOT_FOUND");
  });
});
