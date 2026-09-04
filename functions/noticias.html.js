// functions/noticias.html.js
//
// Esta función intercepta las visitas a /noticias.html y, ANTES de mandar
// la página, mete adentro del HTML las tarjetas de noticias ya armadas
// (con texto real), en vez de dejar que se llenen recién cuando el
// navegador ejecuta el script.js de abajo.
//
// El script.js que ya tenés sigue funcionando igual arriba de esto:
// paginación, clicks, todo sigue andando como hasta ahora. Lo único que
// cambia es que la PRIMERA tanda de noticias ya viene escrita en el HTML
// que se manda, así que un rastreador que no ejecuta JavaScript (como el
// de AdSense) también la puede leer.

const PER_PAGE = 9; // misma cantidad que usa tu script.js hoy

export async function onRequestGet(context) {
  const { request, env } = context;

  // Traemos el HTML original de noticias.html tal cual está en el sitio,
  // y el JSON con todas las noticias — en paralelo, como ya hacías en
  // tus otras funciones.
  const [htmlRes, dataRes] = await Promise.all([
    env.ASSETS.fetch(new URL("/noticias.html", request.url)),
    env.ASSETS.fetch(new URL("/data/noticias.json", request.url)),
  ]);

  // Si algo falla al traer las noticias, devolvemos la página tal cual
  // estaba (con el JS del cliente como respaldo) en vez de romper todo.
  let noticias = [];
  try {
    noticias = await dataRes.json();
  } catch (e) {
    return htmlRes;
  }

  // Armamos el HTML de las primeras 9 tarjetas — las mismas que hoy arma
  // renderNoticiasListado() en el navegador, pero ahora como texto plano
  // que va directo en la respuesta del servidor.
  const primerasNoticias = noticias.slice(0, PER_PAGE);

  const tarjetasHTML = primerasNoticias
    .map((item) => {
      const resumen = item.resumen || item.texto || "";
      return `
        <a class="noticia-card" href="/noticia/${item.slug}">
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

  // Total de páginas, para armar también los botones de paginación ya
  // visibles desde el arranque (aunque el click lo sigue manejando tu
  // script.js de siempre).
  const totalPaginas = Math.ceil(noticias.length / PER_PAGE);
  const paginacionHTML = Array.from({ length: totalPaginas }, (_, i) => {
    const numero = i + 1;
    const activo = numero === 1 ? " active" : "";
    return `<button class="${activo.trim()}">${numero}</button>`;
  }).join("");

  // Metemos ese HTML dentro de los divs que hoy están vacíos.
  class NoticiasContainer {
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
    .on("#noticias-container", new NoticiasContainer())
    .on("#pagination-noticias", new PaginacionContainer())
    .transform(htmlRes);
}