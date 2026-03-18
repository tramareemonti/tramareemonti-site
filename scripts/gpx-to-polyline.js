// Piccolo script da riga di comando per:
// - leggere un file GPX
// - estrarre tutti i punti <trkpt>
// - semplificarli con un algoritmo tipo Douglas–Peucker
// - stampare un array di [lat, lng] pronto da incollare in routes.json
//
// Uso:
//   node scripts/gpx-to-polyline.js path/al/file.gpx [tolleranza]
//
// Esempi:
//   node scripts/gpx-to-polyline.js "../Downloads/giro_corto_piedi_abbadia.gpx"
//   node scripts/gpx-to-polyline.js "../Downloads/vettore_da_forca_di_presta.gpx" 0.0002

const fs = require('fs');
const path = require('path');

function readGpxPoints(gpxText) {
  const regex = /<trkpt[^>]*lat="([\d.-]+)"[^>]*lon="([\d.-]+)"/g;
  const points = [];
  let match;
  while ((match = regex.exec(gpxText)) !== null) {
    const lat = parseFloat(match[1]);
    const lng = parseFloat(match[2]);
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      points.push([lat, lng]);
    }
  }
  return points;
}

// Algoritmo Douglas–Peucker semplificato per coordinate [lat, lng]
function simplifyPolyline(points, tolerance) {
  if (points.length <= 2) return points;

  const sqTolerance = tolerance * tolerance;

  function sqDist(p1, p2) {
    const dx = p1[0] - p2[0];
    const dy = p1[1] - p2[1];
    return dx * dx + dy * dy;
  }

  function sqSegDist(p, p1, p2) {
    let x = p1[0];
    let y = p1[1];
    let dx = p2[0] - x;
    let dy = p2[1] - y;

    if (dx !== 0 || dy !== 0) {
      const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        x = p2[0];
        y = p2[1];
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }

    dx = p[0] - x;
    dy = p[1] - y;
    return dx * dx + dy * dy;
  }

  function simplifyDP(points, first, last, sqTol, simplified) {
    let maxSqDist = sqTol;
    let index = -1;

    for (let i = first + 1; i < last; i++) {
      const sqDistToSegment = sqSegDist(points[i], points[first], points[last]);
      if (sqDistToSegment > maxSqDist) {
        index = i;
        maxSqDist = sqDistToSegment;
      }
    }

    if (index !== -1) {
      if (index - first > 1) simplifyDP(points, first, index, sqTol, simplified);
      simplified.push(points[index]);
      if (last - index > 1) simplifyDP(points, index, last, sqTol, simplified);
    }
  }

  const simplified = [points[0]];
  simplifyDP(points, 0, points.length - 1, sqTolerance, simplified);
  simplified.push(points[points.length - 1]);

  return simplified;
}

function main() {
  const [, , gpxPathArg, tolArg] = process.argv;
  if (!gpxPathArg) {
    console.error('Uso: node scripts/gpx-to-polyline.js path/al/file.gpx [tolleranza]');
    process.exit(1);
  }

  const gpxPath = path.resolve(process.cwd(), gpxPathArg);
  if (!fs.existsSync(gpxPath)) {
    console.error('File non trovato:', gpxPath);
    process.exit(1);
  }

  const tolerance = tolArg ? parseFloat(tolArg) : 0.0001;
  const gpxText = fs.readFileSync(gpxPath, 'utf8');

  const points = readGpxPoints(gpxText);
  if (!points.length) {
    console.error('Nessun <trkpt> trovato nel GPX.');
    process.exit(1);
  }

  const simplified = simplifyPolyline(points, tolerance);

  console.log('// Punti originali:', points.length);
  console.log('// Punti dopo semplificazione:', simplified.length);
  console.log('// Da incollare in routes.json come polyline:');
  console.log(JSON.stringify(simplified, null, 2));
}

if (require.main === module) {
  main();
}

