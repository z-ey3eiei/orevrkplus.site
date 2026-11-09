import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const BASELINE_DIR = process.env.LIVE_BASELINE_DIR || "/opt/cursor/artifacts/live-baseline";
const LOCAL_URL = process.env.LOCAL_URL || "http://127.0.0.1:8787";
const OUT_DIR = process.env.DIFF_OUT_DIR || "/opt/cursor/artifacts/branch-vs-live";

const manifest = JSON.parse(fs.readFileSync(path.join(BASELINE_DIR, "manifest.json"), "utf8"));
const paths = manifest.paths;

const viewports = {
  desktop: { width: 1440, height: 900, suffix: "desktop" },
  mobile: { width: 390, height: 844, suffix: "mobile" },
};

function routeFile(pathname) {
  if (pathname === "/") return "home";
  return pathname.replace(/^\//, "");
}

function baselineMain(pathname, vp) {
  return path.join(BASELINE_DIR, `${routeFile(pathname)}-${vp}-main.png`);
}

async function capture(page, url, outMain, outFull) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(2500);
  const hydrationWarnings = [];
  page.on("console", (msg) => {
    if (msg.type() === "warning" && /hydrat/i.test(msg.text())) hydrationWarnings.push(msg.text());
  });
  await page.screenshot({ path: outFull, fullPage: true });
  await page.locator("main").screenshot({ path: outMain });
  const h1 = (await page.locator("h1").first().innerText().catch(() => "")) || "";
  return { h1, hydrationWarnings };
}

function comparePng(aPath, bPath, diffPath) {
  const a = PNG.sync.read(fs.readFileSync(aPath));
  const b = PNG.sync.read(fs.readFileSync(bPath));
  const w = Math.min(a.width, b.width);
  const h = Math.min(a.height, b.height);
  const aCrop = new PNG({ width: w, height: h });
  const bCrop = new PNG({ width: w, height: h });
  PNG.bitblt(a, aCrop, 0, 0, w, h, 0, 0);
  PNG.bitblt(b, bCrop, 0, 0, w, h, 0, 0);
  const diff = new PNG({ width: w, height: h });
  const mismatched = pixelmatch(aCrop.data, bCrop.data, diff.data, w, h, { threshold: 0.1 });
  fs.mkdirSync(path.dirname(diffPath), { recursive: true });
  fs.writeFileSync(diffPath, PNG.sync.write(diff));
  return { mismatched, total: w * h, ratio: mismatched / (w * h) };
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const browser = await chromium.launch();
const results = [];

for (const pathname of paths) {
  for (const [vpName, vp] of Object.entries(viewports)) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    const url = `${LOCAL_URL}${pathname === "/" ? "/" : pathname}`;
    const branchMain = path.join(OUT_DIR, `${routeFile(pathname)}-${vp.suffix}-branch-main.png`);
    const branchFull = path.join(OUT_DIR, `${routeFile(pathname)}-${vp.suffix}-branch-full.png`);
    const { h1, hydrationWarnings } = await capture(page, url, branchMain, branchFull);
    await page.close();

    const liveMain = baselineMain(pathname, vp.suffix);
  let compare = { mismatched: null, total: null, ratio: null, skipped: true };
  if (fs.existsSync(liveMain)) {
    const diffPath = path.join(OUT_DIR, `${routeFile(pathname)}-${vp.suffix}-diff.png`);
    compare = comparePng(liveMain, branchMain, diffPath);
    compare.skipped = false;
  }

    results.push({
      pathname,
      viewport: vpName,
      localUrl: url,
      h1,
      hydrationWarnings,
      ...compare,
    });
  }
}

await browser.close();
const reportPath = path.join(OUT_DIR, "report.json");
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
