import captures from "@/data/captures.json";

const available = new Set<string>((captures as { files: string[] }).files);

/** true si la capture existe dans /public (manifest généré au build) */
export function hasImage(src?: string | null): src is string {
  return !!src && available.has(src);
}
