import { chromium } from "playwright";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const urls = [
  { label: "before", url: "https://orevrkplus.site/" },
  { label: "after", url: process.env.AFTER_URL || "http://127.0.0.1:8787/" },
];

async function shot(page, url, path) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path, fullPage: true });
}

function sha(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const out = [];

for (const item of urls) {
  const path = `/opt/cursor/artifacts/homepage-${item.label}.png`;
  try {
    await shot(page, item.url, path);
    out.push({ ...item, path, sha256: sha(path) });
  } catch (error) {
    out.push({ ...item, error: String(error) });
  }
}

await browser.close();
writeFileSync("/opt/cursor/artifacts/screenshot-compare.json", JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
