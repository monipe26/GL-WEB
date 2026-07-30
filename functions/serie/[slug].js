export async function onRequestGet(context) {
  const { params, request, env } = context;

  const [htmlRes, dataRes] = await Promise.all([
    env.ASSETS.fetch(new URL("/", request.url)),
    env.ASSETS.fetch(new URL("/data/series.json", request.url)),
  ]);

  const series = await dataRes.json();
  const item = series.find((s) => s.slug === params.slug);

  if (!item) return htmlRes;

  const titulo = `${item.titulo} - Girls Love Play`;
  const descripcion = item.sinopsis || "Series GL en Girls Love Play";
  const imagen = item.img.startsWith("http")
    ? item.img
    : `https://girlsloveplay.com${item.img}`;
  const url = `https://girlsloveplay.com/serie/${params.slug}`;

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

  // Mete el texto real, visible, en el HTML (igual que en noticia)
  class InfoContenido {
    element(el) {
      el.setInnerContent(`<h1>${item.titulo}</h1><p>${descripcion}</p>`, {
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
