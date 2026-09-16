/**
 * generar-sitemap.js
 * ------------------------------------------------------------
 * Genera sitemap.xml automáticamente a partir de:
 *   - noticias.json
 *   - mundogl.json
 *   - ships-gl.html   (los ships están definidos adentro del HTML)
 *   - actrices-data.js
 *
 * CÓMO USARLO:
 *   1. Poné este archivo en la raíz de tu proyecto (misma carpeta
 *      donde tenés los 4 archivos de arriba y sitemap.xml).
 *   2. Si alguno está en otra carpeta, ajustá las rutas en la
 *      sección "CONFIGURÁ ACÁ" de abajo.
 *   3. Corré en la terminal:  node generar-sitemap.js
 *   4. Va a sobreescribir sitemap.xml con la versión actualizada.
 *   5. Hacé el push como siempre.
 * ------------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");

// ============ CONFIGURÁ ACÁ SI HACE FALTA ============
const DOMINIO = "https://girlsloveplay.com";

const RUTA_NOTICIAS = path.join(__dirname, "data", "noticias.json");
const RUTA_MUNDOGL = path.join(__dirname, "data", "mundogl.json");
const RUTA_SHIPS_HTML = path.join(__dirname, "ships-gl.html");
const RUTA_ACTRICES_JS = path.join(__dirname, "actrices-data.js");
const RUTA_SITEMAP = path.join(__dirname, "sitemap.xml");

// Páginas fijas del sitio (agregá o sacá según necesites)
const PAGINAS_FIJAS = [
  { loc: `${DOMINIO}/`, changefreq: "daily", priority: "1.0" },
  { loc: `${DOMINIO}/ships-gl.html`, changefreq: "weekly", priority: "0.8" },
  { loc: `${DOMINIO}/actrices-gl.html`, changefreq: "weekly", priority: "0.8" },
  { loc: `${DOMINIO}/proximamente-gl.html`, changefreq: "weekly", priority: "0.8" },
  { loc: `${DOMINIO}/extras-gl.html`, changefreq: "weekly", priority: "0.7" },
  { loc: `${DOMINIO}/novelas.html`, changefreq: "weekly", priority: "0.7" },
  { loc: `${DOMINIO}/mundo-gl.html`, changefreq: "weekly", priority: "0.7" },
  { loc: `${DOMINIO}/noticias.html`, changefreq: "weekly", priority: "0.7" },
  { loc: `${DOMINIO}/sobre-nosotras.html`, changefreq: "monthly", priority: "0.5" },
  { loc: `${DOMINIO}/avisolegal.html`, changefreq: "yearly", priority: "0.2" },
  { loc: `${DOMINIO}/privacidad.html`, changefreq: "yearly", priority: "0.2" },
  { loc: `${DOMINIO}/cookies.html`, changefreq: "yearly", priority: "0.2" },
];

// Novelas: como cada capítulo es un archivo HTML escrito a mano (no un
// JSON), no se puede "descubrir" solo. Cada vez que subas un capítulo
// nuevo, agregá una línea acá con el nombre del archivo (sin ".html").
// 👉 No se agregan acá las páginas de /serie/ (son solo embeds de
//    YouTube) — esas van con noindex, no al sitemap.
const NOVELAS_SLUGS = [
  "novela-el-amor-que-trasciende",
  "novela-el-amor-que-trasciende-ep1-parte1",
  "novela-el-amor-que-trasciende-ep1-parte2",
  "novela-el-amor-que-trasciende-ep1-parte3",
  "novela-el-amor-que-trasciende-ep2-parte1",
  "novela-el-amor-que-trasciende-ep2-parte2",
  "novela-el-amor-que-trasciende-ep2-parte3",
  "novela-el-amor-que-trasciende-ep3-parte1",
  // 👇 agregá acá los próximos capítulos, así:
  // "novela-el-amor-que-trasciende-ep4-parte1",
];
// =======================================================

function leerArchivo(ruta, nombre) {
  if (!fs.existsSync(ruta)) {
    console.error(`❌ No encontré el archivo ${nombre} en: ${ruta}`);
    console.error(`   Ajustá la ruta en la sección "CONFIGURÁ ACÁ" del script.`);
    process.exit(1);
  }
  return fs.readFileSync(ruta, "utf-8");
}

function leerJSON(ruta, nombre) {
  return JSON.parse(leerArchivo(ruta, nombre));
}

// Para ships-gl.html y actrices-data.js: los datos son un array de JS
// (no JSON puro), así que sacamos los slugs con una expresión regular
// en vez de parsear el archivo entero.
function extraerSlugs(ruta, nombre) {
  const contenido = leerArchivo(ruta, nombre);
  const matches = [...contenido.matchAll(/slug:\s*"([^"]+)"/g)];
  return matches.map((m) => m[1]);
}

function bloqueUrl(loc, changefreq = "monthly", priority = "0.6") {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
    "",
  ].join("\n");
}

function generar() {
  const noticias = leerJSON(RUTA_NOTICIAS, "noticias.json");
  const mundogl = leerJSON(RUTA_MUNDOGL, "mundogl.json");
  const shipSlugs = extraerSlugs(RUTA_SHIPS_HTML, "ships-gl.html");
  const actrizSlugs = extraerSlugs(RUTA_ACTRICES_JS, "actrices-data.js");

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n';

  for (const p of PAGINAS_FIJAS) {
    xml += bloqueUrl(p.loc, p.changefreq, p.priority);
  }

  for (const n of noticias) {
    if (!n.slug) {
      console.warn(`⚠️  Una noticia no tiene "slug", la salteo:`, n.id || n.titulo);
      continue;
    }
    xml += bloqueUrl(`${DOMINIO}/noticia/${n.slug}`);
  }

  for (const m of mundogl) {
    if (!m.slug) {
      console.warn(`⚠️  Un artículo de Mundo GL no tiene "slug", lo salteo:`, m.id || m.titulo);
      continue;
    }
    xml += bloqueUrl(`${DOMINIO}/mundo-gl/${m.slug}`);
  }

  for (const slug of shipSlugs) {
    xml += bloqueUrl(`${DOMINIO}/ship/${slug}`, "monthly", "0.5");
  }

  for (const slug of actrizSlugs) {
    xml += bloqueUrl(`${DOMINIO}/actriz/${slug}`, "monthly", "0.5");
  }

  for (const slug of NOVELAS_SLUGS) {
    xml += bloqueUrl(`${DOMINIO}/${slug}.html`, "monthly", "0.6");
  }

  xml += "</urlset>\n";

  fs.writeFileSync(RUTA_SITEMAP, xml, "utf-8");

  const total =
    PAGINAS_FIJAS.length +
    noticias.length +
    mundogl.length +
    shipSlugs.length +
    actrizSlugs.length +
    NOVELAS_SLUGS.length;

  console.log(`✅ sitemap.xml actualizado con éxito.`);
  console.log(`   - Páginas fijas: ${PAGINAS_FIJAS.length}`);
  console.log(`   - Noticias: ${noticias.length}`);
  console.log(`   - Mundo GL: ${mundogl.length}`);
  console.log(`   - Ships: ${shipSlugs.length}`);
  console.log(`   - Actrices: ${actrizSlugs.length}`);
  console.log(`   - Novelas: ${NOVELAS_SLUGS.length}`);
  console.log(`   - Total de URLs: ${total}`);
}

generar();
