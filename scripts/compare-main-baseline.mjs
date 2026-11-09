import { chromium } from "playwright";
import fs from "node:fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

async function mainShot(url, out) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(2500);
  await page.locator("main").screenshot({ path: out });
  const h1 = await page.locator("h1").first().innerText();
  await browser.close();
  return h1;
}

const beforeUrl = process.env.BEFORE_URL || "http://127.0.0.1:8788/";
const afterUrl = process.env.AFTER_URL || "http://127.0.0.1:8787/";

const h1Before = await mainShot(beforeUrl, "/opt/cursor/artifacts/main-baseline-main.png");
const h1After = await mainShot(afterUrl, "/opt/cursor/artifacts/main-current-main.png");

const a = PNG.sync.read(fs.readFileSync("/opt/cursor/artifacts/main-baseline-main.png"));
const b = PNG.sync.read(fs.readFileSync("/opt/cursor/artifacts/main-current-main.png"));
const w = Math.min(a.width, b.width);
const h = Math.min(a.height, b.height);
const aCrop = new PNG({ width: w, height: h });
const bCrop = new PNG({ width: w, height: h });
PNG.bitblt(a, aCrop, 0, 0, w, h, 0, 0);
PNG.bitblt(b, bCrop, 0, 0, w, h, 0, 0);
const diff = new PNG({ width: w, height: h });
const mismatched = pixelmatch(aCrop.data, bCrop.data, diff.data, w, h, { threshold: 0.1 });
fs.writeFileSync("/opt/cursor/artifacts/main-baseline-diff.png", PNG.sync.write(diff));

console.log(JSON.stringify({ h1Before, h1After, mismatched, total: w * h, ratio: mismatched / (w * h) }, null, 2));
