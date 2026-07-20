export async function onRequestGet(context) {
  const { params, request, env } = context;

  const [htmlRes, dataRes] = await Promise.all([
    env.ASSETS.fetch(new URL("/", request.url)),
    env.ASSETS.fetch(new URL("/data/noticias.json", request.url)),
  ]);

  const noticias = await dataRes.json();
  const item = noticias.find((n) => n.slug === params.slug);

  if (!item) return htmlRes;

  // Traer el texto completo de la noticia (no solo el resumen)
  let textoCompleto = item.resumen || "";
  try {
    const detalleRes = await env.ASSETS.fetch(
      new URL(`/data/noticias/${item.id}.json`, request.url)
    );
    if (detalleRes.ok) {
      const detalle = await detalleRes.json();
      textoCompleto = detalle.texto || textoCompleto;
    }
  } catch (e) {}

  const titulo = `${item.titulo} - Girls Love Play`;
  const descripcion = item.resumen || "Noticias GL en Girls Love Play";
  const imagen = item.img.startsWith("http")
    ? item.img
    : `https://girlsloveplay.com${item.img}`;
  const url = `https://girlsloveplay.com/noticia/${params.slug}`;

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

  // 👇 esto es lo nuevo: mete el texto real, visible, en el HTML
  class InfoContenido {
    element(el) {
      el.setInnerContent(`<h1>${item.titulo}</h1><p>${textoCompleto}</p>`, {
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
