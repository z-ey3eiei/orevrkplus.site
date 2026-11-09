import { describe, expect, it } from "vitest";
import createOvkApp from "@/lib/create-ovk-app.meta.js";

describe("create-ovk-app.meta", () => {
  it("uses the official npm package name", () => {
    expect(createOvkApp.packageName).toBe("create-ovk-app");
    expect(createOvkApp.scaffoldCommand).toBe("npx create-ovk-app@latest my-app");
  });

  it("documents only help flags present in bin/index.mjs", () => {
    expect(createOvkApp.helpFlags).toEqual(["-h", "--help"]);
  });
});
