/**
 * Convert GPX files in public/tracce/ into simplified polylines
 * and patch data/routes.json automatically.
 *
 * Usage:
 *   npx tsx scripts/gpx-to-polylines.ts                    # default ~11 m tolerance
 *   npx tsx scripts/gpx-to-polylines.ts --tolerance 0.0002 # coarser ~22 m
 *   npx tsx scripts/gpx-to-polylines.ts --dry-run           # preview only
 *
 * No extra dependencies — uses only Node built-ins + tsx for TS execution.
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(__dirname, "..");
const GPX_DIR = join(ROOT, "public", "tracce");
const ROUTES_JSON = join(ROOT, "data", "routes.json");

type Point = [lat: number, lng: number];

// ── GPX parsing (regex, no XML lib needed — GPX trkpt is very regular) ──

function parseGpx(filePath: string): Point[] {
  const xml = readFileSync(filePath, "utf-8");
  const points: Point[] = [];
  const re = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) {
    points.push([parseFloat(m[1]), parseFloat(m[2])]);
  }
  return points;
}

// ── Ramer-Douglas-Peucker ───────────────────────────────────────────

function perpendicularDist(p: Point, a: Point, b: Point): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  if (dx === 0 && dy === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

function douglasPeucker(pts: Point[], tol: number): Point[] {
  if (pts.length <= 2) return pts;

  let maxDist = 0;
  let maxIdx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = perpendicularDist(pts[i], pts[0], pts[pts.length - 1]);
    if (d > maxDist) {
      maxDist = d;
      maxIdx = i;
    }
  }

  if (maxDist > tol) {
    const left = douglasPeucker(pts.slice(0, maxIdx + 1), tol);
    const right = douglasPeucker(pts.slice(maxIdx), tol);
    return [...left.slice(0, -1), ...right];
  }
  return [pts[0], pts[pts.length - 1]];
}

// ── CLI ─────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  let tolerance = 0.0001; // ~11 m

  const tolIdx = args.indexOf("--tolerance");
  if (tolIdx !== -1 && args[tolIdx + 1]) {
    tolerance = parseFloat(args[tolIdx + 1]);
  }

  const gpxFiles = readdirSync(GPX_DIR)
    .filter((f) => f.endsWith(".gpx"))
    .sort();

  if (gpxFiles.length === 0) {
    console.error(`Nessun file .gpx trovato in ${GPX_DIR}`);
    process.exit(1);
  }

  const routes: Record<string, unknown>[] = JSON.parse(
    readFileSync(ROUTES_JSON, "utf-8")
  );
  const byGpx = new Map(
    routes
      .filter((r) => typeof r.gpxFile === "string")
      .map((r) => [r.gpxFile as string, r])
  );

  console.log(`Tolleranza: ${tolerance}° (~${Math.round(tolerance * 111_000)} m)`);
  console.log(`GPX trovati: ${gpxFiles.length}\n`);

  let updated = 0;

  for (const file of gpxFiles) {
    const raw = parseGpx(join(GPX_DIR, file));
    const simplified = douglasPeucker(raw, tolerance);
    const polyline: Point[] = simplified.map(([lat, lng]) => [
      Math.round(lat * 1e6) / 1e6,
      Math.round(lng * 1e6) / 1e6,
    ]);

    const rel = `/tracce/${file}`;
    console.log(`  ${file}: ${raw.length} pts → ${polyline.length} pts`);

    const route = byGpx.get(rel);
    if (route) {
      route.polyline = polyline;
      route.lat = polyline[0][0];
      route.lng = polyline[0][1];
      updated++;
      console.log(`    → aggiornato route '${route.id}'`);
    } else {
      console.log(`    ⚠ nessun route con gpxFile="${rel}" in routes.json`);
    }
  }

  if (dryRun) {
    console.log(`\n[dry-run] ${updated} route aggiornate (non scritto su disco)`);
  } else {
    writeFileSync(
      ROUTES_JSON,
      JSON.stringify(routes, null, 2) + "\n",
      "utf-8"
    );
    console.log(`\n✓ routes.json aggiornato (${updated} route)`);
  }
}

main();
