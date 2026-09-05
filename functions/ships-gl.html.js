// functions/ships-gl.html.js
//
// A diferencia de noticias/mundo-gl, acá los datos NO están en un
// archivo aparte: están escritos directo adentro de ships-gl.html, en
// "const shipsArray = [...]". Por eso esta función lee el propio HTML,
// encuentra ese array (contando corchetes para no cortarlo mal, porque
// tiene arrays adentro de arrays: instagram y series) y lo convierte a
// datos usables sin new Function/eval.
//
// Las tarjetas quedan como <a href="/ship/slug"> reales (tu JS de
// siempre usa <div onclick> para el modal) para que el rastreador
// también pueda encontrar cada ship como página propia.

const PER_PAGE = 12;

function extraerArrayBalanceado(codigo, marcador) {
  const inicioDecl = codigo.indexOf(marcador);
  const inicioCorchete = codigo.indexOf("[", inicioDecl);
  let profundidad = 0;
  let i = inicioCorchete;
  for (; i < codigo.length; i++) {
    const c = codigo[i];
    if (c === "[" || c === "{") profundidad++;
    else if (c === "]" || c === "}") {
      profundidad--;
      if (profundidad === 0) break;
    }
  }
  return codigo.slice(inicioCorchete, i + 1);
}

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

function parsearShips(htmlTexto) {
  let texto = extraerArrayBalanceado(htmlTexto, "const shipsArray = [");
  texto = quitarComentarios(texto);
  texto = texto.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
  texto = texto.replace(/,(\s*[}\]])/g, "$1");
  return JSON.parse(texto);
}

export async function onRequestGet(context) {
  const { request, env } = context;

  const htmlRes = await env.ASSETS.fetch(new URL("/ships-gl.html", request.url));
  const htmlTexto = await htmlRes.clone().text();

  let ships;
  let errorMensaje = null;
  try {
    ships = parsearShips(htmlTexto);
    if (!Array.isArray(ships)) {
      errorMensaje = "DEBUG: no es un array. Es: " + typeof ships;
    }
  } catch (e) {
    errorMensaje = "DEBUG ERROR: " + e.message;
  }

  if (errorMensaje) {
    class DebugContainer {
      element(el) {
        el.setInnerContent(`<p style="color:red">${errorMensaje}</p>`, { html: true });
      }
    }
    return new HTMLRewriter()
      .on("#ships-container", new DebugContainer())
      .transform(htmlRes);
  }

  const primerosShips = ships.slice(0, PER_PAGE);

  const tarjetasHTML = primerosShips
    .map((item) => {
      const seriesTexto = Array.isArray(item.series)
        ? item.series.slice(0, 2).join(", ") + (item.series.length > 2 ? "..." : "")
        : "";
      return `
        <a class="noticia-card" href="/ship/${item.slug}">
          <div class="noticia-img">
            <img loading="lazy" src="${item.img}" alt="Ship ${item.ship}">
          </div>
          <div class="noticia-info">
            <p class="noticia-fecha">${item.estado || ""} · ${item.pais || ""}</p>
            <p class="noticia-titulo">${item.ship}</p>
            <p class="noticia-texto">${item.nombres || ""}</p>
            <p class="noticia-texto">🎬 ${seriesTexto}</p>
          </div>
        </a>
      `;
    })
    .join("");

  const totalPaginas = Math.ceil(ships.length / PER_PAGE);
  const paginacionHTML = Array.from({ length: totalPaginas }, (_, i) => {
    const numero = i + 1;
    const activo = numero === 1 ? " active" : "";
    return `<button class="${activo.trim()}">${numero}</button>`;
  }).join("");

  class ShipsContainer {
    element(el) {
      el.setInnerContent(tarjetasHTML, { html: true });
    }
  }
  class PaginacionContainer {
    element(el) {
      el.setInnerContent(paginacionHTML, { html: true });
    }
  }

  return new HTMLRewriter()
    .on("#ships-container", new ShipsContainer())
    .on("#pagination-ships", new PaginacionContainer())
    .transform(htmlRes);
}