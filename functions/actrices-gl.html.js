// functions/actrices-gl.html.js
//
// Mismo patrón que noticias.html.js y mundo-gl.html.js: metemos las
// tarjetas de actrices ya armadas, con texto real, ANTES de mandar la
// página. Como enlace usamos /actriz/{slug} (la página individual que
// crea functions/actriz/[slug].js).
//
// OJO: tus datos de actrices no vienen en un .json, vienen en
// actrices-data.js como código ("const actricesArray = [...]"). Por eso
// acá lo traemos como texto y lo "ejecutamos" con new Function() para
// sacar el array de adentro — es la forma de leer ese archivo desde el
// servidor sin tener que duplicar todos los datos en otro lado.

const PER_PAGE = 12; // misma cantidad que usa hoy actrices-gl.html

async function cargarActrices(env, request) {
  const jsRes = await env.ASSETS.fetch(new URL("/actrices-data.js", request.url));
  const codigo = await jsRes.text();
  // El archivo declara "const actricesArray = [...]" — lo ejecutamos en un
  // sandbox chiquito y devolvemos esa variable.
  const obtenerArray = new Function(`${codigo}\nreturn actricesArray;`);
  return obtenerArray();
}

export async function onRequestGet(context) {
  const { request, env } = context;

  const [htmlRes, actrices] = await Promise.all([
    env.ASSETS.fetch(new URL("/actrices-gl.html", request.url)),
    cargarActrices(env, request).catch(() => null),
  ]);

  if (!actrices) return htmlRes;

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