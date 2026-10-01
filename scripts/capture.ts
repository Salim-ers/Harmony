/**
 * Captures des réalisations (à lancer sur votre machine) :
 *
 *   npx playwright install chromium     # une seule fois
 *   npm run capture                     # tous les projets
 *   npm run capture -- --only=art-du-pain,noa-cafe
 *   npm run capture -- --skip-gallery   # uniquement desktop / tablette / mobile
 *   CHROMIUM_PATH=/chemin/vers/chrome npm run capture   # navigateur déjà installé
 *
 * Pour chaque projet : desktop (1440×900), tablette (834×1112), mobile (390×844)
 * et les pages de galerie déclarées dans data/projects.ts.
 * Fichiers WebP dans /public/projects/<slug>/, puis mise à jour du manifest.
 *
 * Les projets avec `mockup` (carte digitale) ne sont jamais capturés :
 * leur visuel est une maquette anonymisée codée dans le site.
 */
import { chromium, type Browser, type Page } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { projects, type Device, type Project } from "../data/projects";
import { writeManifest } from "./manifest";

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--only="))?.split("=")[1]?.split(",").filter(Boolean);
const skipGallery = args.includes("--skip-gallery");
// Option de test : remplace l’origine des sites (ex. --origin=http://localhost:3000)
const origin = args.find((a) => a.startsWith("--origin="))?.split("=")[1];

const devices: Record<Device, { width: number; height: number; scale: number; mobile: boolean; outWidth: number }> = {
  desktop: { width: 1440, height: 900, scale: 2, mobile: false, outWidth: 2400 },
  tablet: { width: 834, height: 1112, scale: 2, mobile: true, outWidth: 1300 },
  mobile: { width: 390, height: 844, scale: 3, mobile: true, outWidth: 900 },
};

const DISMISS = [
  /^passer$/i,
  /tout accepter/i,
  /^accepter/i,
  /j.accepte/i,
  /accept all/i,
  /^ok$/i,
  /^continuer sans accepter$/i,
];

async function dismissOverlays(page: Page) {
  for (const re of DISMISS) {
    const btn = page.getByRole("button", { name: re }).first();
    try {
      if (await btn.isVisible({ timeout: 300 })) {
        await btn.click({ timeout: 1000 });
        await page.waitForTimeout(500);
      }
    } catch {
      /* rien à fermer */
    }
  }
}

async function settle(page: Page) {
  // Déclenche lazy-loading et animations d’apparition, puis remonte.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    const max = Math.min(document.body.scrollHeight, window.innerHeight * 12);
    for (let y = 0; y < max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 140));
    }
    window.scrollTo(0, 0);
  });
  await page.addStyleTag({
    content: `*{caret-color:transparent!important} html{scrollbar-width:none!important} ::-webkit-scrollbar{display:none!important}`,
  });
}

async function shoot(browser: Browser, project: Project, path: string, device: Device, out: string, scroll = 0) {
  const d = devices[device];
  const context = await browser.newContext({
    viewport: { width: d.width, height: d.height },
    deviceScaleFactor: d.scale,
    isMobile: d.mobile,
    hasTouch: d.mobile,
    locale: "fr-FR",
    reducedMotion: "reduce",
    userAgent: d.mobile
      ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
      : undefined,
  });
  const page = await context.newPage();
  const url = new URL(path, origin ?? project.url).toString();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 }).catch(() => page.goto(url, { waitUntil: "load", timeout: 45_000 }));
    await page.waitForTimeout(1500);
    await dismissOverlays(page);
    await settle(page);
    if (scroll > 0) {
      await page.evaluate((s) => window.scrollTo(0, window.innerHeight * s), scroll);
    }
    await page.waitForTimeout(1600);
    const buf = await page.screenshot({ type: "png" });
    await sharp(buf).resize({ width: d.outWidth, withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toFile(out);
    console.log(`  ✓ ${device.padEnd(7)} ${path}${scroll ? ` (+${scroll} écran)` : ""}`);
  } catch (err) {
    console.warn(`  ✗ ${device} ${path} : ${(err as Error).message}`);
  } finally {
    await context.close();
  }
}

async function main() {
  const list = projects.filter((p) => !p.mockup && (!only || only.includes(p.slug)));
  if (!list.length) {
    console.log("Aucun projet à capturer.");
    return;
  }
  // CHROMIUM_PATH permet d’utiliser un Chrome déjà installé
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const p of list) {
    console.log(`\n${p.title} (${p.url})`);
    const dir = join(process.cwd(), "public", "projects", p.slug);
    await mkdir(dir, { recursive: true });
    await shoot(browser, p, "/", "desktop", join(dir, "desktop.webp"));
    await shoot(browser, p, "/", "tablet", join(dir, "tablet.webp"));
    await shoot(browser, p, "/", "mobile", join(dir, "mobile.webp"));
    if (!skipGallery) {
      for (const g of p.gallery) {
        const file = join(process.cwd(), "public", g.src);
        await shoot(browser, p, g.path ?? "/", g.device, file, g.scroll ?? 0);
      }
    }
  }
  await browser.close();
  await writeManifest();
  console.log("\nTerminé. Relancez `npm run dev` pour voir les captures.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
