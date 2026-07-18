export async function onRequestGet(context) {
  const { params, request, env } = context;

  const [htmlRes, dataRes] = await Promise.all([
    env.ASSETS.fetch(new URL("/", request.url)),
    env.ASSETS.fetch(new URL("/data/noticias.json", request.url)),
  ]);

  const noticias = await dataRes.json();
  const item = noticias.find((n) => n.slug === params.slug);

  if (!item) return htmlRes;

  const titulo = `${item.titulo} - Girls Love Play`;
  const descripcion =
    item.resumen || item.texto || "Noticias GL en Girls Love Play";
  const imagen = item.img.startsWith("http")
    ? item.img
    : `https://girlsloveplay.com${item.img}`;
  const url = `https://girlsloveplay.com/noticia/${params.slug}`;

  class Meta {
    element(el) {
      const prop = el.getAttribute("property");
      if (prop === "og:title") el.setAttribute("content", titulo);
      if (prop === "og:description") el.setAttribute("content", descripcion);
      if (prop === "og:image") el.setAttribute("content", imagen);
      if (prop === "og:url") el.setAttribute("content", url);
    }
  }

  return new HTMLRewriter()
    .on('meta[property^="og:"]', new Meta())
    .on("title", { element: (el) => el.setInnerContent(titulo) })
    .transform(htmlRes);
}
