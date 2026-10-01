/**
 * Liste les captures présentes dans /public/projects et écrit data/captures.json.
 * Lancé automatiquement avant chaque build (npm run build) et après chaque capture.
 * Une image absente n’est jamais référencée : pas d’image cassée possible.
 */
import { readdir, stat, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const dir = join(root, "public", "projects");

async function walk(d: string): Promise<string[]> {
  let entries: string[] = [];
  try {
    entries = await readdir(d);
  } catch {
    return [];
  }
  const out: string[] = [];
  for (const e of entries) {
    const full = join(d, e);
    const s = await stat(full);
    if (s.isDirectory()) out.push(...(await walk(full)));
    else if (/\.(webp|avif|png|jpe?g)$/i.test(e)) out.push("/" + relative(join(root, "public"), full).split(sep).join("/"));
  }
  return out;
}

export async function writeManifest() {
  const files = (await walk(dir)).sort();
  await writeFile(
    join(root, "data", "captures.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), files }, null, 2) + "\n",
  );
  console.log(`[manifest] ${files.length} capture(s) référencée(s).`);
}

if (process.argv[1]?.includes("manifest")) {
  writeManifest();
}
