const ships = [
  {
    slug: "freenbecky-gl-ship",
    ship: "FreenBecky",
    img: "/img/ships/freenbecky.jpg",
    descripcion:
      "Una de las parejas GL más icónicas del mundo. Freen y Becky se conocieron trabajando juntas y su química en pantalla conquistó a millones de fans globales.",
  },
  {
    slug: "lmsy-gl-ship",
    ship: "LMSY",
    img: "/img/ships/LMSY.jpg",
    descripcion:
      "Lookmhee y Sonya debutaron juntas en Affair (2024) y rápidamente se convirtieron en una de las parejas GL más queridas de Tailandia.",
  },
  {
    slug: "lingorm-gl-ship",
    ship: "LingOrm",
    img: "/img/ships/lingorm1.jpg",
    descripcion:
      "LingOrm debutó con The Secret of Us, el primer GL en horario prime de Channel 3. Su química natural las convirtió en un fenómeno global.",
  },
  {
    slug: "englot-gl-ship",
    ship: "Englot",
    img: "/img/ships/englot.jpg",
    descripcion:
      "Engfa y Charlotte forman una de las parejas GL más estéticas del medio. Son embajadoras de Dior y participan en el mega proyecto 4 Elements.",
  },
  {
    slug: "fayeatom-gl-ship",
    ship: "FayeAtom",
    img: "/img/ships/FayeAtom.jpg",
    descripcion:
      "Faye y Atom protagonizan Broken of Love (2026), donde Faye interpreta a una mujer marcada por la venganza que se enamora de la hija de su enemigo.",
  },
  {
    slug: "milklove-gl-ship",
    ship: "MilkLove",
    img: "/img/ships/MilkLove.jpg",
    descripcion:
      "Milk y Love comenzaron como pareja secundaria en un BL y se convirtieron en las primeras GL leads de GMMTV con 23.5, en Netflix.",
  },
  {
    slug: "namtanfilm-gl-ship",
    ship: "NamtanFilm",
    img: "/img/ships/NamtanFilm.jpg",
    descripcion:
      "Namtan es una de las actrices más reconocidas de GMMTV. Junto a Film Rachanun protagonizan la historia de Prim y Freen en Girl Rules.",
  },
  {
    slug: "applemim-gl-ship",
    ship: "AppleMim",
    img: "/img/ships/AppleMim.jpg",
    descripcion:
      "Apple y Mimu representan una de las nuevas apuestas GL de GMMTV como protagonistas del arco de Tierra en 4 Elements.",
  },
  {
    slug: "viewmim-gl-ship",
    ship: "ViewMim",
    img: "/img/ships/ViewMim.jpg",
    descripcion:
      "View y Mim debutaron como pareja GL protagonista en Girl Rules (2026) dentro del universo GMMTV, y pronto regresan en Bake Love Feelings.",
  },
  {
    slug: "shellypundao-gl-ship",
    ship: "ShellyPundao",
    img: "/img/ships/ShellyPundao.jpg",
    descripcion:
      "Shelly y Pundao debutaron como pareja GL en Rollercoaster (2025) y en 2026 regresan juntas con By Your Side.",
  },
  {
    slug: "ormfolk-gl-ship",
    ship: "OrmFolk",
    img: "/img/ships/OrmFolk.jpg",
    descripcion:
      "OrmFolk es la pareja detrás de Apple My Love, un GL con química dulce y emotiva que les ganó una base de fans muy fiel.",
  },
  {
    slug: "noonpraewa-gl-ship",
    ship: "NoonPraewa",
    img: "/img/ships/NoonPraewa.jpg",
    descripcion:
      "Noon y Praewa tendrán su primera serie GL como protagonistas en Hidden Heart, uno de los proyectos más esperados del género.",
  },
  {
    slug: "lillybelle-gl-ship",
    ship: "LillyBelle",
    img: "/img/ships/LillyBelle.jpg",
    descripcion:
      "Lilly y Belle protagonizan I Wanna Be Sup'tar, remake GL de la comedia romántica tailandesa de 2015.",
  },
  {
    slug: "lenamiu-gl-ship",
    ship: "LenaMiu",
    img: "/img/ships/LenaMiu.jpg",
    descripcion:
      "Lena y Miu son la segunda pareja GL de Channel 3 tras LingOrm, protagonistas de My Safe Zone, uno de los GL más destacados de 2025.",
  },
  {
    slug: "graceoaey-gl-ship",
    ship: "GraceOaey",
    img: "/img/ships/Grace Oaey.jpg",
    descripcion:
      "Grace y Oaey se conocieron en Mate The Series (2024), una pareja marcada por traumas del pasado y una conexión inevitable.",
  },
  {
    slug: "faymay-gl-ship",
    ship: "FayMay",
    img: "/img/ships/FayMay.jpg",
    descripcion:
      "Fay y May debutaron juntas en My Marvellous Dream Is You y regresaron en Somewhere Somehow (2025).",
  },
  {
    slug: "enjoyjune-gl-ship",
    ship: "EnjoyJune",
    img: "/img/ships/EnjoyJune.jpg",
    descripcion:
      "Enjoy y June debutaron en Denied Love (2025), una historia de amor prohibido que conquistó al fandom GL internacional.",
  },
  {
    slug: "emibonnie-gl-ship",
    ship: "EmiBonnie",
    img: "/img/ships/EmiBonnie.jpg",
    descripcion:
      "Emi y Bonnie debutaron en Us (2025) y luego formaron el dúo musical EMIBONNIE. Regresan a pantalla con Moonshadow.",
  },
  {
    slug: "christinemae-gl-ship",
    ship: "ChristineMae",
    img: "/img/ships/ChristineMae.jpg",
    descripcion:
      "Christine y Mae protagonizaron Reverse 4 You (2024), disponible en Netflix, una historia de amor y destino.",
  },
  {
    slug: "bleji-gl-ship",
    ship: "BleJi",
    img: "/img/ships/BleJi.jpg",
    descripcion:
      "Mable y Pangjie protagonizan ClaireBell (2025), un GL de prisión con 9.2/10 en IMDb.",
  },
  {
    slug: "atomMer-gl-ship",
    ship: "AtomMer",
    img: "/img/ships/AtomMer.jpg",
    descripcion:
      "Atom y Mersedes protagonizan My Only Sunshine (2026), una de las series GL más esperadas del año.",
  },
  {
    slug: "andalookkaew-gl-ship",
    ship: "AndaLookkaew",
    img: "/img/ships/AndaLookkaew.jpg",
    descripcion:
      "Anda y Lookkaew, integrantes del grupo idol COSMOS, debutaron como pareja GL en Love Senior y regresan juntas en Remain (2026).",
  },

  {
    slug: "tk-nur-gl-ship",
    ship: "TKNur",
    img: "/img/ships/dangerous-queen-special-2.jpg",
    descripcion:
      "Tangkwa Phinyanech Aungsuwan (TK) y Nur Desoraya Techapaibul alcanzaron gran reconocimiento tras protagonizar la serie tailandesa Dangerous Queen. Su química en pantalla conquistó al público y las convirtió en una de las parejas GL revelación, ganando una sólida base de seguidores tanto en Tailandia como a nivel internacional.",
  },
];

export async function onRequestGet(context) {
  const { params, request, env } = context;
  const htmlRes = await env.ASSETS.fetch(new URL("/", request.url));
  const item = ships.find((s) => s.slug === params.slug);
  if (!item) return htmlRes;

  const titulo = `${item.ship} - Ship GL - Girls Love Play`;
  const descripcion = item.descripcion;
  const imagen = `https://girlsloveplay.com${item.img}`;
  const url = `https://girlsloveplay.com/ship/${params.slug}`;

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
      el.setInnerContent(
        `<h1>${item.ship}</h1><p>${descripcion}</p>`,
        { html: true }
      );
    }
  }

  return new HTMLRewriter()
    .on('meta[property^="og:"]', new MetaProp())
    .on('meta[name="description"]', new MetaDescription())
    .on("title", { element: (el) => el.setInnerContent(titulo) })
    .on("#info-contenido", new InfoContenido())
    .transform(htmlRes);
}
