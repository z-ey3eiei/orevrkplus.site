import { chromium } from "playwright";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

async function mainShot(url, out) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(2000);
  await page.locator("main").screenshot({ path: out });
  await browser.close();
}

await mainShot("https://orevrkplus.site/", "/opt/cursor/artifacts/main-before.png");
await mainShot(process.env.AFTER_URL || "http://127.0.0.1:8787/", "/opt/cursor/artifacts/main-after.png");

const a = PNG.sync.read(fs.readFileSync("/opt/cursor/artifacts/main-before.png"));
const b = PNG.sync.read(fs.readFileSync("/opt/cursor/artifacts/main-after.png"));
const w = Math.min(a.width, b.width);
const h = Math.min(a.height, b.height);
const aCrop = new PNG({ width: w, height: h });
const bCrop = new PNG({ width: w, height: h });
PNG.bitblt(a, aCrop, 0, 0, w, h, 0, 0);
PNG.bitblt(b, bCrop, 0, 0, w, h, 0, 0);
const diff = new PNG({ width: w, height: h });
const mismatched = pixelmatch(aCrop.data, bCrop.data, diff.data, w, h, { threshold: 0.1 });
fs.writeFileSync("/opt/cursor/artifacts/main-diff.png", PNG.sync.write(diff));

console.log(
  JSON.stringify({
    mismatched,
    total: w * h,
    ratio: mismatched / (w * h),
    shaBefore: createHash("sha256").update(fs.readFileSync("/opt/cursor/artifacts/main-before.png")).digest("hex"),
    shaAfter: createHash("sha256").update(fs.readFileSync("/opt/cursor/artifacts/main-after.png")).digest("hex"),
  }),
);
