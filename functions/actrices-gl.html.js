// functions/actrices-gl.html.js
// VERSIÓN DE DIAGNÓSTICO — si algo falla, lo escribe en la página en vez
// de esconderlo, para poder ver el motivo con "ver código fuente".
// Una vez que confirmemos que anda, la cambiamos por la versión final.

const PER_PAGE = 12;

async function cargarActrices(env, request) {
  const jsRes = await env.ASSETS.fetch(new URL("/actrices-data.js", request.url));
  const codigo = await jsRes.text();
  const obtenerArray = new Function(`${codigo}\nreturn actricesArray;`);
  return obtenerArray();
}

export async function onRequestGet(context) {
  const { request, env } = context;

  const htmlRes = await env.ASSETS.fetch(new URL("/actrices-gl.html", request.url));

  let actrices;
  let errorMensaje = null;
  try {
    actrices = await cargarActrices(env, request);
    if (!Array.isArray(actrices)) {
      errorMensaje = "DEBUG: actricesArray no es un array. Es: " + typeof actrices;
    }
  } catch (e) {
    errorMensaje = "DEBUG ERROR: " + e.message;
  }

  // Si algo falló, escribimos el motivo adentro del contenedor para
  // poder verlo con "ver código fuente" — esto es temporal, solo para
  // diagnosticar.
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