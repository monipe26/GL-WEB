// functions/actrices-gl.html.js
//
// Lee actrices-data.js como texto y lo convierte a JSON válido:
// - borra los comentarios // (los usás para marcar datos "no confirmado"),
//   sin tocar las // que forman parte de URLs como instagram.com/...
// - le agrega comillas a las claves sin comillas
// - saca las comas de más antes de cerrar ] o }
// No usa new Function ni eval (Cloudflare no lo permite).

const PER_PAGE = 12;

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
  const { request, env } = context;

  const htmlRes = await env.ASSETS.fetch(new URL("/actrices-gl.html", request.url));

  let actrices;
  let errorMensaje = null;
  try {
    actrices = await cargarActrices(env, request);
    if (!Array.isArray(actrices)) {
      errorMensaje = "DEBUG: no es un array. Es: " + typeof actrices;
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
      .on("#actrices-container", new DebugContainer())
      .transform(htmlRes);
  }

  const primerasActrices = actrices.slice(0, PER_PAGE);

  const tarjetasHTML = primerasActrices
    .map((item) => {
      const shipTexto = item.ship ? `<p class="actriz-ship">💕 ${item.ship}</p>` : "";
      const nacionalidadTexto = item.nacionalidad
        ? `<p class="actriz-nacionalidad">${item.nacionalidad}</p>`
        : "";
      return `
        <a class="actriz-card" href="/actriz/${item.slug}">
          <div class="actriz-foto">
            <img loading="lazy" src="${item.foto}" alt="${item.nombre}">
            <p class="actriz-nombre">${item.nombre}</p>
          </div>
          <div class="actriz-info">
            ${shipTexto}
            ${nacionalidadTexto}
          </div>
        </a>
      `;
    })
    .join("");

  const totalPaginas = Math.ceil(actrices.length / PER_PAGE);
  const paginacionHTML = Array.from({ length: totalPaginas }, (_, i) => {
    const numero = i + 1;
    const activo = numero === 1 ? " active" : "";
    return `<button class="${activo.trim()}">${numero}</button>`;
  }).join("");

  class ActricesContainer {
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
    .on("#actrices-container", new ActricesContainer())
    .on("#pagination-actrices", new PaginacionContainer())
    .transform(htmlRes);
}