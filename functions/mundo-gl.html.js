// functions/mundo-gl.html.js
//
// Mismo patrón que noticias.html.js: metemos las tarjetas de Mundo GL
// ya armadas, con texto real, ANTES de mandar la página. Además, acá
// las armamos como <a href="/mundo-gl/slug"> reales (tu JS original usa
// <div onclick> para el modal) para que el rastreador también pueda
// descubrir cada entrada individual como una página propia.
//
// Tu script.js sigue funcionando igual arriba de esto: en cuanto carga,
// vuelve a pintar los divs con el modal, como siempre. Lo único que
// cambia es lo que hay ANTES de que el JS se ejecute.

const PER_PAGE = 6; // misma cantidad que usa hoy mundo-gl.html

export async function onRequestGet(context) {
  const { request, env } = context;

  const [htmlRes, dataRes] = await Promise.all([
    env.ASSETS.fetch(new URL("/mundo-gl.html", request.url)),
    env.ASSETS.fetch(new URL("/data/mundogl.json", request.url)),
  ]);

  let items = [];
  try {
    items = await dataRes.json();
  } catch (e) {
    return htmlRes;
  }

  const primerosItems = items.slice(0, PER_PAGE);

  const tarjetasHTML = primerosItems
    .map((item) => {
      const resumen = item.resumen || item.texto || "";
      return `
        <a class="noticia-card" href="/mundo-gl/${item.slug}">
          <div class="noticia-img">
            <img loading="lazy" src="${item.img}" alt="${item.titulo}">
          </div>
          <div class="noticia-info">
            <p class="noticia-fecha">📅 ${item.fecha}</p>
            <p class="noticia-titulo">${item.titulo}</p>
            <p class="noticia-texto">${resumen}</p>
          </div>
        </a>
      `;
    })
    .join("");

  const totalPaginas = Math.ceil(items.length / PER_PAGE);
  const paginacionHTML = Array.from({ length: totalPaginas }, (_, i) => {
    const numero = i + 1;
    const activo = numero === 1 ? " active" : "";
    return `<button class="${activo.trim()}">${numero}</button>`;
  }).join("");

  class MundoGLContainer {
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
    .on("#mundogl-container", new MundoGLContainer())
    .on("#pagination-mundogl", new PaginacionContainer())
    .transform(htmlRes);
}