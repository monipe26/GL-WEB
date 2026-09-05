// functions/actriz/[slug].js
// Misma lógica de lectura que actrices-gl.html.js (sin new Function/eval).

function quitarComentarios(texto) {
  let resultado = "";
  let dentroString = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (dentroString) {
      resultado += c;
      if (c === "\\") {
        resultado += texto[i + 1];
        i++;
        continue;
      }
      if (c === '"') dentroString = false;
      continue;
    }
    if (c === '"') {
      dentroString = true;
      resultado += c;
      continue;
    }
    if (c === "/" && texto[i + 1] === "/") {
      while (i < texto.length && texto[i] !== "\n") i++;
      resultado += "\n";
      continue;
    }
    resultado += c;
  }
  return resultado;
}

function parsearActricesJS(codigo) {
  const inicioArray = codigo.indexOf("[", codigo.indexOf("actricesArray"));
  const finArray = codigo.lastIndexOf("]");
  let texto = codigo.slice(inicioArray, finArray + 1);
  texto = quitarComentarios(texto);
  texto = texto.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
  texto = texto.replace(/,(\s*[}\]])/g, "$1");
  return JSON.parse(texto);
}

async function cargarActrices(env, request) {
  const jsRes = await env.ASSETS.fetch(new URL("/actrices-data.js", request.url));
  const codigo = await jsRes.text();
  return parsearActricesJS(codigo);
}

export async function onRequestGet(context) {
  const { params, request, env } = context;

  const [htmlRes, actrices] = await Promise.all([
    env.ASSETS.fetch(new URL("/", request.url)),
    cargarActrices(env, request).catch(() => null),
  ]);

  if (!actrices) return htmlRes;

  const item = actrices.find((a) => a.slug === params.slug);
  if (!item) return htmlRes;

  const titulo = `${item.nombre} - Actriz GL - Girls Love Play`;

  const partes = [];
  if (item.nombreNativo) partes.push(`Su nombre en tailandés es ${item.nombreNativo}.`);
  if (item.nacionalidad) partes.push(`Es de nacionalidad ${item.nacionalidad}.`);
  if (item.ship) partes.push(`Es conocida por formar parte del ship ${item.ship}.`);
  if (Array.isArray(item.series) && item.series.length) {
    partes.push(`Participó en: ${item.series.join(", ")}.`);
  }
  if (item.bio) partes.push(item.bio);

  const descripcion = partes.join(" ") || `Ficha de ${item.nombre} en Girls Love Play.`;
  const imagen = item.foto.startsWith("http")
    ? item.foto
    : `https://girlsloveplay.com${item.foto}`;
  const url = `https://girlsloveplay.com/actriz/${params.slug}`;

  class MetaProp {
    element(el) {
      const prop = el.getAttribute("property");
      if (prop === "og:title") el.setAttribute("content", titulo);
      if (prop === "og:description") el.setAttribute("content", descripcion);
      if (prop === "og:image") el.setAttribute("content", imagen);
      if (prop === "og:url") el.setAttribute("content", url);
    }
  }

  class MetaDescription {
    element(el) {
      if (el.getAttribute("name") === "description") {
        el.setAttribute("content", descripcion);
      }
    }
  }

  class InfoContenido {
    element(el) {
      el.setInnerContent(`<h1>${item.nombre}</h1><p>${descripcion}</p>`, {
        html: true,
      });
    }
  }

  return new HTMLRewriter()
    .on('meta[property^="og:"]', new MetaProp())
    .on('meta[name="description"]', new MetaDescription())
    .on("title", { element: (el) => el.setInnerContent(titulo) })
    .on("#info-contenido", new InfoContenido())
    .transform(htmlRes);
}