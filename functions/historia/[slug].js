const historias = [
  {
    slug: "mi-persona-favorita",
    titulo: "Mi Persona Favorita",
    videoId: "YFtI5Og8Dp8",
  },
  {
    slug: "nos-vemos-el-viernes",
    titulo: "Nos vemos el viernes",
    videoId: "xnB-EeT8TtQ",
  },
  {
    slug: "lo-que-nunca-nos-dijimos",
    titulo: "Lo que nunca nos dijimos ❤️",
    videoId: "ttopwmuZ7QI",
  },
  {
    slug: "cinco-minutos-de-mentira",
    titulo: "❤️ Mini Drama GL: 5 Minutos de Mentira",
    videoId: "MaCuR49C5Tc",
  },
  {
    slug: "no-dijo-estoy-celosa-pero-lo-estaba",
    titulo: "No dijo estoy celosa, pero lo estaba",
    videoId: "kxO8_5xRHn0",
  },
  {
    slug: "no-la-mires-asi",
    titulo: "No la mires así",
    videoId: "F-Nbm3qOx8o",
  },
];

export async function onRequestGet(context) {
  const { params, request, env } = context;
  const htmlRes = await env.ASSETS.fetch(new URL("/", request.url));
  const item = historias.find((h) => h.slug === params.slug);
  if (!item) return htmlRes;

  const titulo = `${item.titulo} - Girls Love Play`;
  const descripcion = `${item.titulo} - Micro historia GL en español 💕, disponible en Girls Love Play.`;
  const imagen = `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`;
  const url = `https://girlsloveplay.com/historia/${params.slug}`;

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
