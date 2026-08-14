// =====================
// 🎬 SERIES Y REPRODUCTOR
// =====================

let playerReady = false;
let player,
  playlist = [],
  current = 0;
let currentSerieId = "gaptheseries";
let playingOst = false;
let ostTimer = null;
let idiomaSubtituloAplicado = false; // evita re-forzar el idioma en cada pausa/play
let playlistLength = 0;
let lastPlaylistIndex = -1;

let progressInterval = null; // guarda el progreso cada X segundos mientras se reproduce
let subsWatchdog = null; // 🔤 vigila que los subtítulos sigan activos mientras se reproduce

// 🔤 Fuerza el subtítulo en español. A veces YouTube todavía no cargó la
// lista de pistas de subtítulos en el instante exacto en que arranca el
// video (o el propio reproductor de YouTube "olvida" la preferencia al
// pasar de un episodio a otro, entrar/salir de pantalla completa, etc.),
// así que reintentamos un par de veces con un pequeño delay en vez de
// llamarlo una sola vez y confiar en que funcionó.
function forzarSubtitulos(reintentos = 4) {
  if (!player || !player.setOption) return;
  const serieActual = [...seriesArray].find((s) => s.id === currentSerieId);
  if (serieActual && serieActual.esShort) return; // los shorts no llevan subtítulos forzados

  player.setOption("captions", "track", { languageCode: "es" });

  if (reintentos > 0) {
    setTimeout(() => forzarSubtitulos(reintentos - 1), 700);
  }
}

// =====================
// 🎬 SERIES
// =====================

let seriesArray = [];

fetch("/data/series.json")
  .then((r) => r.json())
  .then((data) => {
    // Las series con "oculto": true en el JSON no se muestran en la web
    seriesArray = data.filter((s) => !s.oculto);
    renderSection(seriesArray, "series-container", "pagination-series", 20);

    // Si entraron directo a una URL de serie, abrirla
    const path = window.location.pathname;
    if (path.startsWith("/serie/")) {
      const slug = path.split("/serie/")[1];
      const serie = seriesArray.find((s) => s.slug === slug);
      if (serie) {
        const intentarAbrirSerie = () => {
          if (typeof playerReady !== "undefined" && playerReady) {
            verSerie(serie.id);
            document.title = serie.titulo + " - Girls Love Play";
          } else {
            setTimeout(intentarAbrirSerie, 300);
          }
        };
        intentarAbrirSerie();
      }
    }
  })
  .catch((err) => console.error("Error cargando series:", err));

// =====================
// COMUNIDAD
// ✅ Solo necesitás poner videoId y canal — título y miniatura se cargan solos
// =====================

const comunidadArray = [
  { id: "c16", videoId: "Ks-a0A8IeZQ" },
  { id: "c15", videoId: "Q3EdOV87E14" },
  { id: "c14", videoId: "c5Z4TtrIXcI" },
  { id: "c13", videoId: "rmjhUfGblsg" },
  { id: "c12", videoId: "Oys-JKFDi6I" },
  { id: "c11", videoId: "FY_UColcMDc" },
  { id: "c10", videoId: "IOFprq5UfwM" },
  { id: "c9", videoId: "JnyrUiMeHqo" },
  { id: "c8", videoId: "0GALf9zof5E" },
  { id: "c7", videoId: "ZZfk7QDx_kU" },
  { id: "c6", videoId: "NBA7TbOdxR8" },
  { id: "c5", videoId: "nkwwTjPt2Lc" },
  { id: "c4", videoId: "MEu9JBMic3w" },
  { id: "c3", videoId: "_cXUI8Jtjn4" },
  { id: "c2", videoId: "STVqrStyr6I" },
  { id: "c1", videoId: "rqHYlB51-oo" },
];

// =====================
// OSTs GL
// ✅ Solo necesitás pegar el videoId — título y miniatura se cargan solos
// =====================
const ostsArray = [
  { id: "ost111", videoId: "jad-V_nyvaY" },
  { id: "ost110", videoId: "V0b-54I-1-0" },
  { id: "ost109", videoId: "AdqIf57MDv8" },
  { id: "ost108", videoId: "D7O-CA32bzI" },
  { id: "ost107", videoId: "vyZCwAPMSlo" },
  { id: "ost106", videoId: "uYPWFkDaakI" },
  { id: "ost105", videoId: "9dxckG0eJ44" },
  { id: "ost104", videoId: "U2ayv8Kaln0" },
  { id: "ost103", videoId: "i_SF8XZasmU" },
  { id: "ost102", videoId: "SAPDFLMMMfQ" },
  { id: "ost101", videoId: "TTfF-pAf774" },
  { id: "ost100", videoId: "MP4Ciew8Xok" },
  { id: "ost99", videoId: "CUA6nuvO_4Y" },
  { id: "ost98", videoId: "4d8hxSf67rE" },
  { id: "ost97", videoId: "dE4yy4ULCXI" },
  { id: "ost96", videoId: "Sxh28YQGSq0" },
  { id: "ost95", videoId: "354VXHaqaE4" },
  { id: "ost94", videoId: "qWfsiUJtIIw" },
  { id: "ost93", videoId: "Kdyph-0nKwc" },
  { id: "ost92", videoId: "MeEqOOH-2eE" },
  { id: "ost91", videoId: "4hFyFMp9ml4" },
  { id: "ost90", videoId: "27klSLsVCR4" },
  { id: "ost89", videoId: "xWvhq6bsde8" },
  { id: "ost88", videoId: "NTXo8HpAugU" },
  { id: "ost87", videoId: "cOvvSf-XhE4" },
  { id: "ost86", videoId: "qjuXnqA4KRY" },
  { id: "ost85", videoId: "sKg2_PDMUGc" },
  { id: "ost84", videoId: "2Xm56pL34ek" },
  { id: "ost83", videoId: "mzqW0nn06SA" },
  { id: "ost82", videoId: "qrNXPKYGG0s" },
  { id: "ost81", videoId: "CKclkO6HHrY" },
  { id: "ost80", videoId: "BDpn6St06PI" },
  { id: "ost79", videoId: "XMKdChy6zw0" },
  { id: "ost78", videoId: "xZTTYmcFFhA" },
  { id: "ost77", videoId: "0n9zZ1aOWFk" },
  { id: "ost76", videoId: "zqFYE77Atys" },
  { id: "ost75", videoId: "4XccBfDMRY0" },
  { id: "ost74", videoId: "RHnPq3Z0A8c" },
  { id: "ost73", videoId: "t8kp6Cmc5cc" },
  { id: "ost72", videoId: "abBL28Pd8lo" },
  { id: "ost71", videoId: "2jXDADfnHfY" },
  { id: "ost70", videoId: "8SPnMnuqzYE" },
  { id: "ost69", videoId: "nCGvg31zNdk" },
  { id: "ost68", videoId: "xnOOAzX9nK4" },
  { id: "ost67", videoId: "sb9Z79klTv4" },
  { id: "ost66", videoId: "LD_xc6k8-LE" },
  { id: "ost65", videoId: "La9v6B9sO9o" },
  { id: "ost64", videoId: "gdBlUZYXrmQ" },
  { id: "ost63", videoId: "1i-MKyKVA5o" },
  { id: "ost62", videoId: "2T0klTd-Usg" },
  { id: "ost61", videoId: "YU5UQ8n01uI" },
  { id: "ost60", videoId: "rJd6iOk83Qk" },
  { id: "ost59", videoId: "l_BwV0pudj4" },
  { id: "ost58", videoId: "9SSyRcIy588" },
  { id: "ost57", videoId: "zlxDTsddL5E" },
  { id: "ost56", videoId: "pkMJUwNM1HA" },
  { id: "ost55", videoId: "VIe0Mem7OeM" },
  { id: "ost54", videoId: "gMk8FeC5nhE" },
  { id: "ost53", videoId: "JyEQ7ZX9iwk" },
  { id: "ost52", videoId: "YS4fkF86RdI" },
  { id: "ost51", videoId: "Ku1uSXFAQgQ" },
  { id: "ost50", videoId: "8RI11ofpeks" },
  { id: "ost49", videoId: "JAVLBnd4cdg" },
  { id: "ost48", videoId: "6c_5xPYxmy4" },
  { id: "ost47", videoId: "sqc_BI1rbd0" },
  { id: "ost46", videoId: "vNhZ0uFddl4" },
  { id: "ost45", videoId: "Jpih2TjgZGM" },
  { id: "ost44", videoId: "FD-ZpEg0l5I" },
  { id: "ost43", videoId: "fxedUgaP1vQ" },
  { id: "ost42", videoId: "YF30_ksQ8qg" },
  { id: "ost41", videoId: "2BUT8xRvZZQ" },
  { id: "ost40", videoId: "ID_pd9Ni3nk" },
  { id: "ost39", videoId: "kHs3CWRe5PA" },
  { id: "ost38", videoId: "MM7Yad1P_2A" },
  { id: "ost37", videoId: "XVVqVZKVsxw" },
  { id: "ost36", videoId: "BG_yN4HCr44" },
  { id: "ost35", videoId: "_J8SM9jqjow" },
  { id: "ost34", videoId: "saSPFSwHbrk" },
  { id: "ost33", videoId: "XxdiiAnTUxo" },
  { id: "ost32", videoId: "U1piZH2CNXA" },
  { id: "ost31", videoId: "hsvQg5JSDHU" },
  { id: "ost27", videoId: "IsKtf2DoCBU" },
  { id: "ost26", videoId: "6w8X4Tfcgu0" },
  { id: "ost25", videoId: "I_wl4yurk1U" },
  { id: "ost24", videoId: "_b3LpCOe1vs" },
  { id: "ost23", videoId: "5C_vJyhQuQY" },
  { id: "ost22", videoId: "AMzlTbjBLDo" },
  { id: "ost21", videoId: "gzfHZqHFxi0" },
  { id: "ost20", videoId: "HI8z03beTtI" },
  { id: "ost19", videoId: "pgzaWboZUSg" },
  { id: "ost18", videoId: "MNEc23m2ons" },
  { id: "ost17", videoId: "QcsBxsmMrtA" },
  { id: "ost16", videoId: "gdSsAoYOeLw" },
  { id: "ost15", videoId: "9ae1xxRggbs" },
  { id: "ost14", videoId: "Fu7d92Q3o0o" },
  { id: "ost13", videoId: "n1ih3Ptg9Bo" },
  { id: "ost12", videoId: "DoTt57nnMg8" },
  { id: "ost11", videoId: "xmBeo_FRhvg" },
  { id: "ost10", videoId: "8AUbwoXi7RQ" },
  { id: "ost9", videoId: "j2SPeBnDNtE" },
  { id: "ost8", videoId: "NBw1jF342vw" },
  { id: "ost7", videoId: "LAZpP0_w23k" },
  { id: "ost6", videoId: "DznDzQd8C_A" },
  { id: "ost5", videoId: "wzRI0JYUJFM" },
  { id: "ost4", videoId: "U1piZH2CNXA" },
  { id: "ost3", videoId: "fWvIbVEf7Yc" },
  { id: "ost2", videoId: "BKBA4FqZwEg" },
  { id: "ost1", videoId: "lvBRWn8qldg" },
];
// =====================
// 🎬 MICROFICCIÓN GL
// =====================
const microficcionArray = [
  // Microdrama por partes

  {
    id: "micro4",
    slug: "mi-persona-favorita",
    titulo: "Mi Persona Favorita",
    canal: "Girls Love Play",
    videoId: "YFtI5Og8Dp8",
    esShort: true,
    videos: ["YFtI5Og8Dp8", "VS2aRl-TsAI", "q392a7dx8bg"],
  },

  {
    id: "micro3",
    slug: "nos-vemos-el-viernes",
    titulo: "Nos vemos el viernes",
    canal: "Girls Love Play",
    videoId: "xnB-EeT8TtQ",
    esShort: true,
    videos: [
      "xnB-EeT8TtQ",
      "AEvA4W3Heew",
      "kzbfjUFgBAQ",
      "RGaxbYo8dws",
      "A8TqT3e_Sag",
      "IX6o24TIOUY",
      "8-gqyjWqmt8",
      "FEhfS0UXrPU",
      "0VPkMVoWq8o",
      "Vasz1IRo9Xw",
      "TZeEhxUIq0E",
      "ixckUHC5LRI",
      "bqwpE6lqTW4",
      "BNVpqp3sNZU",
      "AOlACaihfjw",
      "49i5GQsxmKY",
      "c1XJJLONQ1M",
    ],
  },

  {
    id: "micro2",
    slug: "lo-que-nunca-nos-dijimos",
    titulo: "Lo que nunca nos dijimos ❤️",
    canal: "Girls Love Play",
    videoId: "ttopwmuZ7QI",
    esShort: true,
    videos: ["ttopwmuZ7QI", "ncsSqJEQOHg"],
  },

  {
    id: "micro1",
    slug: "cinco-minutos-de-mentira",
    titulo: "❤️ Mini Drama GL: 5 Minutos de Mentira",
    canal: "Girls Love Play",
    videoId: "MaCuR49C5Tc",
    esShort: true,
    videos: [
      "MaCuR49C5Tc",
      "cj4hcHsVWgE",
      "74CANIQkBY8",
      "iNaMkX_s8Tg",
      "AkMP_8a9aMU",
      "sdQ21YFgsyQ",
      "kkt4pO6t1LM",
      "xdN-IZD4UH0",
      "LFyuw2VffCw",
      "v9OZc19k4_U",
      "dcyDAdJf9YY",
      "W6dp7IcS5xA",
      "Z4qVZNe2s5A",
      "WKN6ycgFrtY",
      "g6GWBDq7KXY",
      "Oo031FCuld0",
      "ort5NbUM57g",
      "06JRCv74G5M",
      "K4Y1K3LtMw4",
      "D-rZtFKiVJI",
      "m06yUUZ_HhA",
      "tnOb3-EjQKo",
      "TjK9iKzb-7Y",
      "YZlvT5ts3N0",
      "dPZFDJUpwEQ",
      "muEb7NJl-to",
      "0kPg4ZKaeGY",
      "UNrro7PlM-s",
      "g8IYws4kIoY",
      "0I8uNe6gg3A",
      "fkCDF5mlkJ4",
      "fMP7aptesxw",
      "K0CJTZFCcqA",
      "OXVhnvP-Y-Y",
      "szlbEEU_0vg",
    ],
  },

  // Short individual
  {
    id: "micro3b",
    slug: "no-dijo-estoy-celosa-pero-lo-estaba",
    videoId: "kxO8_5xRHn0",
    esShort: true,
    videos: ["kxO8_5xRHn0"],
  },

  // Short individual
  {
    id: "micro2b",
    slug: "no-la-mires-asi",
    videoId: "F-Nbm3qOx8o",
    esShort: true,
    videos: ["F-Nbm3qOx8o"],
  },
];
// =====================
// TIENDA GL
// =====================
const explorarArray = [
  {
    id: "libro1",
    img: "https://m.media-amazon.com/images/I/XXXX.jpg",
    titulo: "Libro GL",
    link: "https://amzn.to/tu-link",
  },
];

// =====================
// 💕 SHIPS GL - DATOS
// =====================
// PEGÁ este bloque ANTES de la línea: renderSection(seriesArray, ...)
// que está al final de tu script.js

const shipsArray = [
  {
    ship: "FreenBecky",
    slug: "freenbecky-gl-ship",
    nombres: "Sarocha Chankimha & Rebecca Patricia Armstrong",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/freenbecky.jpg",
    instagram: [
      { nombre: "Freen", url: "https://www.instagram.com/srchafreen" },
      { nombre: "Becky", url: "https://www.instagram.com/beccca" },
    ],
    series: [
      "GAP: The Series (2022)",
      "The Loyal Pin (2024)",
      "Uranus 2324 (2024)",
      "4 Elements: The Air (2026)",
    ],
    descripcion:
      "Una de las parejas GL más icónicas del mundo. Freen y Becky se conocieron trabajando juntas y su química en pantalla conquistó a millones de fans globales. GAP: The Series acumuló más de 900 millones de vistas en YouTube.",
  },

  {
    ship: "LMSY",
    slug: "lmsy-gl-ship",
    nombres: "Lookmhee Punyapat y Sonya Saranphat",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/LMSY.jpg",
    instagram: [
      { nombre: "Lookmhee", url: "https://www.instagram.com/lmlookmhee" },
      { nombre: "Sonya", url: "https://www.instagram.com/sonyasarann" },
    ],
    series: [
      "Affair (2024)",
      "Harmony Secret (2025)",
      "Hometown Romance (2026)",
    ],
    descripcion:
      "Lookmhee y Sonya debutaron juntas en Affair (2024) y rápidamente se convirtieron en una de las parejas GL más queridas de Tailandia. Su segunda serie Harmony Secret (2025) las catapultó a nivel internacional. En 2026 regresan con Hometown Romance, consolidando su lugar entre las duplas GL más poderosas del momento.",
  },

  {
    ship: "LingOrm",
    slug: "lingorm-gl-ship",
    nombres: "Sirilak 'Lingling' Kwong & Kornnaphat Sethratanapong",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/lingorm1.jpg",
    instagram: [
      { nombre: "ling", url: "https://www.instagram.com/linglingkwong/" },
      { nombre: "Orm", url: "https://www.instagram.com/orm.kornnaphat/" },
    ],
    series: [
      "The Secret of Us (2024)",
      "Only You (2025)",
      "In Love Forever (2026), próximamente",
    ],
    descripcion:
      "LingOrm debutó con The Secret of Us, el primer GL en horario prime de Channel 3. Su química natural y las historias maduras que protagonizan las convirtieron en un fenómeno global, especialmente en Corea del Sur.",
  },

  {
    ship: "Englot",
    slug: "englot-gl-ship",
    nombres: "Engfa Waraha & Charlotte Austin",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/englot.jpg",
    instagram: [
      { nombre: "Engfa", url: "https://www.instagram.com/fa_engfa8" },
      { nombre: "Charlotte", url: "https://www.instagram.com/itscharlotty" },
    ],
    series: [
      "Show Me Love (2023)",
      "Love Bully (2024)",
      "Petrichor (2024)",
      "Unlimited Love (2025)",
      "4 Elements: The Water (2026)",
    ],
    descripcion:
      "Engfa es actriz y exreina de belleza, Charlotte es actriz tailandesa-occidental. Juntas forman una de las parejas GL más estéticas del medio. Son embajadoras de Dior y participan en el mega proyecto 4 Elements.",
  },

  {
    ship: "FayeAtom",
    slug: "fayeatom-gl-ship",
    nombres: "Peraya Malisorn & Pariya Piyapanopas",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/FayeAtom.jpg",
    instagram: [
      { nombre: "Faye", url: "https://www.instagram.com/faye" },
      { nombre: "Atom", url: "https://www.instagram.com/atomprys" },
    ],
    series: ["Broken of Love (2026)"],
    descripcion:
      "Faye es actriz, exreina de belleza Miss Grand Thailand 2016 y fundadora de Fabel Entertainment. Atom es cantante y ex integrante del grupo idol VIIS. Su primera serie juntas es Broken of Love (2026), donde Faye interpreta a una mujer marcada por la venganza que se enamora de la hija de su enemigo, papel de Atom.",
  },

  {
    ship: "MilkLove",
    slug: "milklove-gl-ship",
    nombres: "Pansa Vosbein & Pattranite Limpatiyakorn",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/MilkLove.jpg",
    instagram: [
      { nombre: "Milk", url: "https://www.instagram.com/panly.v" },
      { nombre: "Love", url: "https://www.instagram.com/loverrukk" },
    ],
    series: [
      "23.5 (2024)",
      "Whale Store xoxo (2025)",
      "Girl Rules (2026)",
      "Ditto (2026), próximamente",
    ],
    descripcion:
      "Milk y Love comenzaron como pareja secundaria en un BL y se convirtieron en las primeras GL leads de GMMTV con 23.5, que debutó simultáneamente en Netflix. Son una de las duplas GL más queridas del fandom tailandés.",
  },

  {
    ship: "NamtanFilm",
    slug: "namtanfilm-gl-ship",
    nombres: "Tipnaree Weerawatnodom & Rachanun Mahawan",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/NamtanFilm.jpg",
    instagram: [
      { nombre: "Namtan", url: "https://www.instagram.com/namtan.tipnaree/" },
      { nombre: "Film", url: "https://www.instagram.com/fr.racha/" },
    ],
    series: ["Pluto (2024)", "Girl Rules (2026)", "Her (2026), próximamente"],
    descripcion:
      "Namtan es una de las actrices más reconocidas de GMMTV con una larga trayectoria. Film Rachanun es su contraparte GL. Juntas protagonizan la historia de Prim y Freen en Girl Rules junto a otras parejas GL.",
  },

  {
    ship: "AppleMim",
    slug: "applemim-gl-ship",
    nombres: "Apple Narisa & Mimu Rattanawadee",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/AppleMim.jpg",
    instagram: [
      { nombre: "Apple", url: "https://www.instagram.com/applelapisara" },
      { nombre: "Mim", url: "https://www.instagram.com/mimu.p" },
    ],
    series: ["4 Elements: The Earth (2026)"],
    descripcion:
      "Como protagonistas del arco de Tierra en 4 Elements, Apple y Mimu representan una de las nuevas apuestas GL de GMMTV. Aunque todavía están comenzando su recorrido como pareja en pantalla, ya generan expectativas entre los seguidores del género.",
  },
  {
    ship: "ViewMim",
    slug: "viewmim-gl-ship",
    nombres: "View Benyapa Janpeng & Mim Rattanawadee",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/ViewMim.jpg",
    instagram: [
      { nombre: "View", url: "https://www.instagram.com/view.benyapa/" },
      { nombre: "Mim", url: "https://www.instagram.com/mim.rattanawadee" },
    ],
    series: [
      "Us (2025)",
      "Girl Rules (2026)",
      "Bake Love Feelings (2026), próximamente",
    ],
    descripcion:
      "View y Mim se conocieron trabajando juntas en Us (2025) como reparto secundario, pero fue en Girl Rules (2026) donde debutaron como pareja GL protagonista dentro del universo GMMTV. Su química natural y la historia emotiva de Min y Praew las convirtió rápidamente en una de las parejas más queridas del fandom. Pronto regresan como protagonistas en Bake Love Feelings.",
  },
  {
    ship: "ShellyPundao",
    slug: "shellypundao-gl-ship",
    nombres: "Shelly & Pundao",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/ShellyPundao.jpg",
    instagram: [
      { nombre: "Shelly", url: "https://www.instagram.com/shellybenda" },
      { nombre: "Pundao", url: "https://www.instagram.com/_pundao" },
    ],
    series: ["Rollercoaster (2025)", "By Your Side (2026), próximamente"],
    descripcion:
      "Shelly y Pundao debutaron como pareja GL en Rollercoaster (2025) y rápidamente ganaron fans por su química natural. En 2026 regresan juntas con By Your Side, una nueva historia que tiene al fandom muy emocionado.",
  },
  {
    ship: "OrmFolk",
    slug: "ormfolk-gl-ship",
    nombres: "Ormsin Supitcha Limsommut & Folk Sutima Korkiatvanich",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/OrmFolk.jpg",
    instagram: [
      { nombre: "Ormsin", url: "https://www.instagram.com/omeormorm" },
      { nombre: "Folk", url: "https://www.instagram.com/ffolky" },
    ],
    series: [
      "Apple My Love (2024)",
      "Your Apple (2025)",
      "Love Bound (2026) — próximamente",
      "Crush (2026) — próximamente",
    ],
    descripcion:
      "OrmFolk es la pareja detrás de Apple My Love, un GL donde Kris recupera la visión y reconoce a Karn como la mujer que veía en sus sueños. Su química dulce y emotiva les ganó una base de fans muy fiel. Regresan juntas en Crush, adaptación de la novela de Chao Planoy.",
  },
  {
    ship: "NoonPraewa",
    slug: "noonpraewa-gl-ship",
    nombres: "Nuttawan Teerapratan y Prawrawee Kitiworrakarn",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/NoonPraewa.jpg",
    instagram: [
      { nombre: "Noon", url: "" },
      { nombre: "Praewa", url: "https://www.instagram.com/praewa.era" },
    ],
    series: [
      "Love Senior (2023)",
      "Flirt Milk (2025) — pareja secundaria en un BL",
      "Hidden Heart (2026) — su primera serie GL como protagonistas, próximamente)",
    ],
    descripcion:
      "Noon y Praewa se conocieron como pareja secundaria en Love Senior (2023) y volvieron a compartir pantalla en el BL Flirt Milk (2025). Su popularidad dentro del fandom llevó a que Star Hunter Entertainment les diera su primera oportunidad como pareja GL protagonista en Hidden Heart, uno de los proyectos más esperados del género.",
  },

  {
    ship: "LillyBelle",
    slug: "lillybelle-gl-ship",
    nombres: "Lilly Ladapa Thongkham y Belle Jiratchaya Kittavornsakul",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/LillyBelle.jpg",
    instagram: [
      { nombre: "Belle", url: "https://www.instagram.com/bellejirat" },
      { nombre: "Lilly", url: "https://www.instagram.com/lilly_nicha" },
    ],
    series: [
      "Harmony Secret (2025) — como pareja secundaria",
      "I Wanna Be Sup'tar (2026)",
    ],
    descripcion:
      "Lilly y Belle debutaron juntas como pareja secundaria en Harmony Secret (2025) y conquistaron al fandom con su química natural. En 2026 protagonizan I Wanna Be Sup'tar, remake GL de la comedia romántica tailandesa de 2015, donde interpretan a dos mujeres de lados opuestos de la industria del entretenimiento.",
  },
  {
    ship: "LenaMiu",
    slug: "lenamiu-gl-ship",
    nombres: "Lena Lorena Schuett & Miu Natsha Taechamongkalapiwat",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/LenaMiu.jpg",
    instagram: [
      { nombre: "Lena", url: "https://www.instagram.com/lalinalena" },
      { nombre: "Miu", url: "https://www.instagram.com/mmiunatshaa" },
    ],
    series: ["My Safe Zone (2025)"],
    descripcion:
      "Lena y Miu son la segunda pareja GL de Channel 3 tras LingOrm. En My Safe Zone interpretan a Alin y Jane, dos amigas que llevan 8 años en una zona de amistad que empieza a tambalearse. Su química natural y los temas emotivos de la serie la convirtieron en uno de los GL más destacados de 2025. En 2026 regresan juntas en Pls. Love.",
  },

  {
    ship: "GraceOaey",
    slug: "graceoaey-gl-ship",
    nombres: "Budsarin Wonglelanont y Ponchanok Teerawan",
    pais: "Tailandia 🇹🇭",
    estado: "❌ Ship finalizado",
    img: "/img/ships/Grace Oaey.jpg",
    instagram: [
      { nombre: "Grace", url: "https://www.instagram.com/gracebudsarin" },
      { nombre: "Oaey", url: "https://www.instagram.com/oaey.ponchanok" },
    ],
    series: ["Mate The Series (2024)"],
    descripcion:
      "Grace Budsarin y Oaey Ponchanok se conocieron en Mate The Series (2024), donde interpretaron a Kenlong y Oengoei, una pareja marcada por traumas del pasado y una conexión inevitable. Su química emotiva las convirtió en favoritas del fandom tailandés. En diciembre 2025 confirmaron el fin de sus actividades conjuntas bajo NEZT Media.",
  },
  {
    ship: "FayMay",
    slug: "faymay-gl-ship",
    nombres: "Kunyaphat Na Nakorn & Yada Watcharamusik",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/FayMay.jpg",
    instagram: [
      { nombre: "Fay", url: "https://www.instagram.com/fay_riezz" },
      { nombre: "May", url: "https://www.instagram.com/maywyda" },
    ],
    series: ["My Marvellous Dream Is You (2025)", "Somewhere Somehow (2025)"],
    descripcion:
      "Fay y May debutaron juntas en My Marvellous Dream Is You (2024), donde sus personajes se ven la una en los sueños de la otra. Regresaron en Somewhere Somehow (2025), donde son ex novias del colegio que se reencuentran como jefa y empleada. Tras salir de",
  },

  {
    ship: "EnjoyJune",
    slug: "enjoyjune-gl-ship",
    nombres: "Enjoy Thidarut & June Nannirin",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/EnjoyJune.jpg",
    instagram: [
      { nombre: "Enjoy", url: "https://www.instagram.com/enjoyyotdr" },
      { nombre: "June", url: "https://www.instagram.com/june_nannirin" },
    ],
    series: ["Denied Love (2025)"],
    descripcion:
      "Enjoy Thidarut y June Nannirin debutaron juntas en Denied Love (2025), una historia de trauma emocional, conflictos de poder y amor prohibido que conquistó al fandom GL internacional. Su química natural y emotividad en pantalla las convirtieron rápidamente en una de las parejas GL más queridas",
  },
  {
    ship: "EmiBonnie",
    slug: "emibonnie-gl-ship",
    nombres: "Thasorn Klinnium & Pattraphus Borattasuwan",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/EmiBonnie.jpg",
    instagram: [
      { nombre: "Emi", url: "https://www.instagram.com/emiamily" },
      { nombre: "Bonnie", url: "https://www.instagram.com/beonnnie" },
    ],
    series: ["Us (2025)", "Moonshadow (2026)"],
    descripcion:
      "Emi y Bonnie debutaron en Us (2025), la tercera serie GL de GMMTV, donde interpretan a Dokrak y Pam en una historia de amor llena de obstáculos. En febrero 2026 debutaron como dúo musical EMIBONNIE bajo Riser Music con el single: Fall For You. Regresan a pantalla con Moonshadow, prevista para diciembre 2026.",
  },

  {
    ship: "ChristineMae",
    slug: "christinemae-gl-ship",
    nombres: "Gulasatree Michalsky & Methakarn Anektanasuwan",
    pais: "Tailandia 🇹🇭",
    estado: "❌ Ship finalizado",
    img: "/img/ships/ChristineMae.jpg",
    instagram: [
      { nombre: "Christine", url: "https://www.instagram.com/gulasatree" },
      { nombre: "Mae", url: "https://www.instagram.com/maetk" },
    ],
    series: ["Reverse 4 You (2024)"],
    descripcion:
      "Christine y Mae protagonizaron Reverse 4 You (2024), una GL de amor y destino donde Jattawa puede controlar el tiempo y su hermana predice que su alma gemela es Four, su senior con mala reputación. La serie está disponible en Netflix. Ambas han dejado Kantana Motion Pictures y están trabajando en proyectos separados por el momento.",
  },

  {
    ship: "BleJi",
    slug: "bleji-gl-ship",
    nombres: "Mable Siriwalee Siriwibool & Pangjie Paphavarin Sawasdiwech",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/BleJi.jpg",
    instagram: [
      { nombre: "Mable", url: "https://www.instagram.com/mable_siriwalee" },
      { nombre: "Pangjie", url: "https://www.instagram.com/pangjiewr" },
    ],
    series: ["ClaireBell (2025)"],
    descripcion:
      "Mable y Pangjie protagonizan ClaireBell (2025), un GL de prisión donde Bell es encarcelada injustamente y encuentra protección en Claire, la interna más temida. Su química intensa y la historia oscura las convirtió en una de las parejas GL más comentadas del año, con un 9.2/10 en IMDb.",
  },
  {
    ship: "AtomMer",
    slug: "atomMer-gl-ship",
    nombres: "Aphichaya Kamnoetsirikun & Siripath Sarakune",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/AtomMer.jpg",
    instagram: [
      { nombre: "Atom", url: "https://www.instagram.com/atomapcy_" },
      { nombre: "Mersedes", url: "https://www.instagram.com/mmersedes" },
    ],
    series: ["My Only Sunshine (2026)"],
    descripcion:
      "Atom Aphichaya y Mersedes Siripath protagonizan My Only Sunshine (2026), una de las series GL más esperadas del año bajo Star Hunter Entertainment. El fandom las sigue como AtomMer y su química generó mucha expectativa antes del estreno.",
  },
  {
    ship: "AndaLookkaew",
    slug: "andalookkaew-gl-ship",
    nombres: "Anunta Teaviratt & Kamollak Sangsubsin",
    pais: "Tailandia 🇹🇭",
    estado: "✅ Vigente",
    img: "/img/ships/AndaLookkaew.jpg",
    instagram: [
      { nombre: "Anda", url: "https://www.instagram.com/anda_anunta" },
      { nombre: "Lookkaew", url: "https://www.instagram.com/lookkaeww_k" },
    ],

    series: ["Love Senior (2023) ", "Remain (2026), próximamente"],
    descripcion:
      "Anda y Lookkaew son integrantes del grupo idol COSMOS bajo Star Hunter Entertainment. Debutaron como pareja GL en Love Senior (2023) y se convirtieron en una de las duplas más queridas del fandom. Regresan juntas en Remain (2026), su tercera serie GL.",
  },
];

// =====================
// 💕 RENDER SHIPS GL
// =====================
function renderShips(array, containerId, paginationId, perPage = 6) {
  let page = 1;
  const container = document.getElementById(containerId);
  const pagination = document.getElementById(paginationId);

  function render() {
    container.innerHTML = "";
    const start = (page - 1) * perPage;
    const end = start + perPage;

    array.slice(start, end).forEach((item) => {
      const div = document.createElement("div");
      div.className = "noticia-card";
      div.style.cursor = "pointer";
      div.onclick = () => abrirShip(item);

      const seriesTexto =
        item.series.slice(0, 2).join(", ") +
        (item.series.length > 2 ? "..." : "");
      const estadoColor = item.estado.includes("✅")
        ? "#6eefaa"
        : item.estado.includes("❌")
        ? "#ff6b6b"
        : "#ffd966";

      div.innerHTML = `
        <div class="noticia-img">
          <img loading="lazy" src="${item.img}" alt="Ship ${item.ship} - ${item.nombres}">
        </div>
        <div class="noticia-info">
          <p class="noticia-fecha" style="color:${estadoColor}">${item.estado} · ${item.pais}</p>
          <p class="noticia-titulo">${item.ship}</p>
          <p class="noticia-texto">${item.nombres}</p>
          <p class="noticia-texto" style="color:#9d8fcc;margin-top:4px">🎬 ${seriesTexto}</p>
        </div>
      `;
      container.appendChild(div);
    });

    pagination.innerHTML = "";
    const total = Math.ceil(array.length / perPage);
    for (let i = 1; i <= total; i++) {
      const b = document.createElement("button");
      b.textContent = i;
      if (i === page) b.classList.add("active");
      b.onclick = () => {
        page = i;
        render();
        setTimeout(() => {
          const section = document.getElementById("shipsgl");
          const yOffset = -100;
          const y =
            section.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 150);
      };
      pagination.appendChild(b);
    }
  }

  render();
}

// =====================
// 💕 ABRIR SHIP (SEO)
// =====================
function abrirShip(item) {
  history.pushState({}, "", "/ship/" + item.slug);
  document.title = item.ship + " - Ship GL | Girls Love Play";

  const seriesHTML = item.series
    .map(
      (s) =>
        `<span style="display:inline-block;background:rgba(143,92,255,0.18);border:1px solid rgba(143,92,255,0.3);color:#c4aeff;font-size:11px;padding:3px 10px;border-radius:10px;margin:3px 2px">🎬 ${s}</span>`
    )
    .join("");

  const instaHTML = item.instagram
    ? item.instagram
        .map(
          (i) =>
            `<a href="${i.url}" target="_blank" style="display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045);color:white;font-size:12px;font-weight:700;padding:6px 14px;border-radius:20px;text-decoration:none;margin:3px 2px">📸 ${i.nombre}</a>`
        )
        .join("")
    : "";

  const estadoColor = item.estado.includes("✅")
    ? "#6eefaa"
    : item.estado.includes("❌")
    ? "#ff6b6b"
    : "#ffd966";

  document.getElementById("ship-modal-img").src = item.img;
  document.getElementById("ship-modal-img").alt = "Ship " + item.ship;
  document.getElementById(
    "ship-modal-ship"
  ).innerHTML = `<span style="color:${estadoColor}">${item.estado}</span> &nbsp;·&nbsp; ${item.pais}`;
  document.getElementById("ship-modal-nombres").textContent = item.nombres;
  document.getElementById("ship-modal-body").innerHTML = `
    <p class="modal-texto ship-desc" style="margin-top:12px;line-height:1.8">${
      item.descripcion
    }</p>
    <p style="margin-top:16px;color:#ff4fd8;font-weight:700;font-size:12px;letter-spacing:1px">🎬 SERIES JUNTAS</p>
    <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:4px">${seriesHTML}</div>
    ${
      instaHTML
        ? `<p style="margin-top:16px;color:#ff4fd8;font-weight:700;font-size:12px;letter-spacing:1px">📸 INSTAGRAM</p><div style="margin-top:8px">${instaHTML}</div>`
        : ""
    }
  `;

  document.getElementById("modal-ships").classList.add("active");
  document.body.style.overflow = "hidden";
}

// =====================
// ❌ CERRAR MODAL SHIP
// =====================
function cerrarModalShip(e) {
  if (e && e.target !== document.getElementById("modal-ships")) return;
  document.getElementById("modal-ships").classList.remove("active");
  document.body.style.overflow = "";
  history.pushState({}, "", "/");
  document.title = "Girls Love Play - Series GL Asiáticas en Español";
}

// =====================
// 📰 NOTICIAS GL — cargadas desde JSON
// =====================

let noticiasArray = [];

fetch("/data/noticias.json")
  .then((r) => r.json())
  .then((data) => {
    noticiasArray = data;
    renderNoticias(
      noticiasArray,
      "noticias-container",
      "pagination-noticias",
      6
    );

    // Si entraron directo a una URL de noticia, abrir el modal
    const path = window.location.pathname;
    if (path.startsWith("/noticia/")) {
      const slug = path.split("/noticia/")[1];
      const noticia = noticiasArray.find((n) => n.slug === slug);
      if (noticia) abrirModal(noticia, "noticias");
    }
  })
  .catch((err) => console.error("Error cargando noticias:", err));

// =====================
// 🔎 BUSCADOR GLOBAL
// =====================

const globalData = [...seriesArray, ...comunidadArray, ...explorarArray];

const secciones = [
  {
    array: seriesArray,
    containerId: "series-container",
    paginationId: "pagination-series",
    sectionId: "series",
  },
  {
    array: noticiasArray,
    containerId: "noticias-container",
    paginationId: "pagination-noticias",
    sectionId: "noticias",
  },
];

function buscar() {
  const input = document.getElementById("buscador").value.toLowerCase().trim();
  if (input === "") {
    limpiar();
    return;
  }

  const secciones = [
    {
      array: seriesArray,
      containerId: "series-container",
      paginationId: "pagination-series",
      sectionId: "series",
    },
    {
      array: noticiasArray,
      containerId: "noticias-container",
      paginationId: "pagination-noticias",
      sectionId: "noticias",
    },
  ];

  let primerResultado = null;
  secciones.forEach((s) => {
    const filtrado = s.array.filter((item) =>
      (item.titulo || "").toLowerCase().includes(input)
    );
    const seccionEl = document.getElementById(s.sectionId);
    if (filtrado.length > 0) {
      seccionEl.style.display = "block";
      if (s.sectionId === "noticias") {
        renderNoticias(filtrado, s.containerId, s.paginationId, 6);
      } else {
        renderSection(filtrado, s.containerId, s.paginationId, 20);
      }
      if (!primerResultado) primerResultado = seccionEl;
    } else {
      seccionEl.style.display = "block";
      if (s.sectionId === "noticias") {
        renderNoticias(noticiasArray, s.containerId, s.paginationId, 6);
      } else {
        renderSection(s.array, s.containerId, s.paginationId);
      }
    }
  });
  if (primerResultado) {
    setTimeout(
      () => primerResultado.scrollIntoView({ behavior: "smooth" }),
      100
    );
  }
}

function limpiar() {
  document.getElementById("buscador").value = "";
  const secciones = [
    {
      array: seriesArray,
      containerId: "series-container",
      paginationId: "pagination-series",
      sectionId: "series",
    },
    {
      array: noticiasArray,
      containerId: "noticias-container",
      paginationId: "pagination-noticias",
      sectionId: "noticias",
    },
  ];
  secciones.forEach((s) => {
    document.getElementById(s.sectionId).style.display = "block";
    if (s.sectionId === "noticias") {
      renderNoticias(noticiasArray, s.containerId, s.paginationId, 6);
    } else {
      renderSection(s.array, s.containerId, s.paginationId, 20);
    }
  });
}

// =====================
// 📱 TIKTOK - FUNCIONES
// =====================

function mostrarTikTok(videoId) {
  const ytPlayer = document.getElementById("player");
  if (ytPlayer) ytPlayer.style.display = "none";

  const hero = document.querySelector(".hero");
  hero.style.aspectRatio = "9/17";
  hero.style.maxWidth = "300px";
  hero.style.maxHeight = "";
  hero.style.margin = "15px auto";
  hero.style.overflow = "hidden";

  let tt = document.getElementById("tiktok-container");
  if (!tt) {
    tt = document.createElement("div");
    tt.id = "tiktok-container";
    ytPlayer.parentNode.insertBefore(tt, ytPlayer);
  }
  tt.style.cssText =
    "position:absolute;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#000;overflow:hidden;z-index:10;";
  tt.innerHTML = `<iframe
    src="https://www.tiktok.com/embed/v2/${videoId}"
    style="width:100%;height:100%;border:none;"
    scrolling="no"
    allowfullscreen
    allow="encrypted-media autoplay">
  </iframe>`;
}

function ocultarTikTok() {
  const tt = document.getElementById("tiktok-container");
  if (tt) {
    tt.style.display = "none";
    tt.innerHTML = "";
  }

  const ytPlayer = document.getElementById("player");
  if (ytPlayer) ytPlayer.style.display = "block";

  const hero = document.querySelector(".hero");
  hero.style.aspectRatio = "";
  hero.style.maxWidth = "";
  hero.style.maxHeight = "";
  hero.style.margin = "";
  hero.style.overflow = "";
}

// =====================
// 📱 FACEBOOK REEL
// =====================
function mostrarFBReel(reelId) {
  const ytPlayer = document.getElementById("player");
  if (ytPlayer) ytPlayer.style.display = "none";

  const hero = document.querySelector(".hero");
  const esMobile = window.innerWidth <= 700;

  hero.style.aspectRatio = "9/16";
  hero.style.maxWidth = esMobile ? "100%" : "300px";
  hero.style.maxHeight = esMobile ? "75vh" : "";
  hero.style.margin = esMobile ? "0 auto" : "15px auto";
  hero.style.overflow = "hidden";

  let tt = document.getElementById("tiktok-container");
  if (!tt) {
    tt = document.createElement("div");
    tt.id = "tiktok-container";
    ytPlayer.parentNode.insertBefore(tt, ytPlayer);
  }
  tt.style.cssText =
    "position:absolute;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#000;overflow:hidden;z-index:10;";
  tt.innerHTML = `<iframe
    src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F${reelId}&show_text=false&allowfullscreen=true"
    style="width:100%;height:100%;border:none;"
    scrolling="no"
    allowfullscreen
    allow="encrypted-media autoplay">
  </iframe>`;
}

// =====================
// 💾 CONTINUAR VIENDO (guardar/leer progreso)
// =====================

function claveProgreso(serieId) {
  return "progreso_serie_" + serieId;
}

const CLAVE_ULTIMA_SERIE = "ultima_serie_vista";

// 📺 Guarda cuál fue la última serie que el usuario estaba mirando, para
// poder retomarla sola cuando vuelve a entrar a la página (aunque sea al
// día siguiente), en vez de arrancar siempre con la serie de portada.
function guardarUltimaSerie(serieId) {
  try {
    localStorage.setItem(CLAVE_ULTIMA_SERIE, serieId);
  } catch (e) {}
}

function obtenerUltimaSerie() {
  try {
    return localStorage.getItem(CLAVE_ULTIMA_SERIE);
  } catch (e) {
    return null;
  }
}

function obtenerProgreso(serieId) {
  try {
    const raw = localStorage.getItem(claveProgreso(serieId));
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function guardarProgreso() {
  if (!player || typeof player.getCurrentTime !== "function") return;
  const segundo = player.getCurrentTime();
  if (!segundo || segundo < 1) return;

  guardarUltimaSerie(currentSerieId);

  const serie = [...seriesArray].find((s) => s.id === currentSerieId);
  let indice = current;
  if (serie && serie.playlist && player.getPlaylistIndex) {
    const idx = player.getPlaylistIndex();
    if (idx >= 0) indice = idx;
  }

  localStorage.setItem(
    claveProgreso(currentSerieId),
    JSON.stringify({ indice, segundo })
  );
}

function borrarProgreso(serieId) {
  localStorage.removeItem(claveProgreso(serieId));
}

// =====================
// YOUTUBE API
// =====================

// En Android, al entrar a pantalla completa, intentamos forzar horizontal
// (en iPhone/Safari no tiene efecto, Apple no lo permite desde la web)
document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock("landscape").catch(() => {});
    }
  } else {
    if (screen.orientation && screen.orientation.unlock) {
      screen.orientation.unlock();
    }
  }
});

window.addEventListener("load", () => {
  let tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
});

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 1,
      cc_load_policy: 1,
      cc_lang_pref: "es",
    },
    events: {
      onReady: (e) => {
        playerReady = true;
        // Si entramos directo a un link de /serie/algo, esa ruta se va a
        // encargar de cargar la serie correcta. Cargar GAP acá también
        // generaba una doble orden al reproductor casi simultánea, que a
        // veces hacía que YouTube tire error de reproducción.
        const path = window.location.pathname;
        if (!path.startsWith("/serie/")) {
          // 📺 Si el usuario ya venía mirando una serie (aunque haya sido
          // ayer), retomamos esa en vez de arrancar siempre con la serie
          // de portada.
          const ultimaSerie = obtenerUltimaSerie();
          const existeUltimaSerie =
            ultimaSerie && [...seriesArray].some((s) => s.id === ultimaSerie);
          cargarSerie(existeUltimaSerie ? ultimaSerie : "gaptheseries");
        }
      },
      onError: (e) => {
        // El video/playlist no se puede embeber (bloqueado por el canal, borrado, etc.)
        mostrarFallbackEmbed();
      },
      // 🔤 Se dispara cuando los módulos internos del reproductor (como el
      // de subtítulos) terminan de cargar. Es el momento más confiable para
      // forzar el idioma, más confiable incluso que "PLAYING".
      onApiChange: () => {
        forzarSubtitulos(0);
      },
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.PLAYING) {
          ocultarFallbackEmbed();
          if (ostTimer) {
            clearTimeout(ostTimer);
            ostTimer = null;
          }
          const idx = player.getPlaylistIndex();
          if (idx >= 0) lastPlaylistIndex = idx;
          actualizarEpisodio();
          actualizarTituloYoutube();

          forzarSubtitulos();

          // 💾 arranca a guardar el progreso cada 5s mientras se reproduce
          if (!progressInterval) {
            progressInterval = setInterval(guardarProgreso, 5000);
          }

          // 🔤 vigía: cada 4s, mientras se está reproduciendo, chequea que
          // el subtítulo siga puesto y si YouTube lo apagó solo (pasa en
          // algunos episodios/dispositivos, sobre todo al salir de pantalla
          // completa o girar la pantalla), lo vuelve a prender.
          if (!subsWatchdog) {
            subsWatchdog = setInterval(() => {
              if (!player || !player.getOption || !player.getPlayerState)
                return;
              if (player.getPlayerState() !== YT.PlayerState.PLAYING) return;
              const serieActual = [...seriesArray].find(
                (s) => s.id === currentSerieId
              );
              if (serieActual && serieActual.esShort) return;
              const track = player.getOption("captions", "track");
              if (!track || !track.languageCode) {
                player.setOption("captions", "track", { languageCode: "es" });
              }
            }, 4000);
          }
        }

        if (e.data === YT.PlayerState.PAUSED) {
          guardarProgreso(); // guarda también al pausar
        }

        if (e.data === YT.PlayerState.ENDED) {
          const serie = [...seriesArray].find((s) => s.id === currentSerieId);

          if (serie && serie.playlist && serie.ostVideo && !playingOst) {
            if (
              playlistLength > 0 &&
              lastPlaylistIndex === playlistLength - 1
            ) {
              playingOst = true;
              player.loadVideoById(serie.ostVideo);
            }
            return;
          }

          // 💾 la serie terminó del todo: borramos el progreso guardado
          if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
          }
          if (subsWatchdog) {
            clearInterval(subsWatchdog);
            subsWatchdog = null;
          }
          borrarProgreso(currentSerieId);

          playingOst = false;
          nextVideo();
        }
      },
    },
  });
}

// =====================
// REPRODUCTOR FUNCIONES
// =====================

// Cuando un video/playlist no se puede reproducir embebido (bloqueado por
// el canal), mostramos un botón para verlo directo en YouTube en vez de
// dejar la pantalla trabada sin explicación.
function mostrarFallbackEmbed() {
  const fallback = document.getElementById("embed-fallback");
  const link = document.getElementById("embed-fallback-link");
  if (!fallback || !link) return;

  const serie = [...seriesArray].find((s) => s.id === currentSerieId);
  let url = "";

  if (serie && serie.playlist) {
    url = `https://www.youtube.com/playlist?list=${serie.playlist}`;
  } else if (serie && serie.videos && serie.videos[current]) {
    url = `https://www.youtube.com/watch?v=${serie.videos[current]}`;
  } else if (playlist && playlist[current]) {
    url = `https://www.youtube.com/watch?v=${playlist[current]}`;
  }

  if (!url) return;

  link.href = url;
  fallback.style.display = "flex";
}

function ocultarFallbackEmbed() {
  const fallback = document.getElementById("embed-fallback");
  if (fallback) fallback.style.display = "none";
}

function cargarSerie(id) {
  const serie = [...seriesArray].find((s) => s.id === id);
  if (!serie) return;
  ocultarFallbackEmbed();
  idiomaSubtituloAplicado = false;
  currentSerieId = id;
  guardarUltimaSerie(id);
  current = 0;
  playlist = [];
  playingOst = false;
  playlistLength = 0;
  lastPlaylistIndex = -1;
  if (ostTimer) {
    clearTimeout(ostTimer);
    ostTimer = null;
  }
  ocultarTikTok();

  ocultarTikTok();

  // 🔧 Por si veníamos de un OST o Comunidad (que la esconden), volvemos a mostrar la botonera
  const controlesEpisodio = document.querySelector(".player-controls");
  if (controlesEpisodio) {
    controlesEpisodio.classList.remove("oculto-controles");
  }

  // 🔧 Adaptar el reproductor a vertical si la serie es un short
  const hero = document.querySelector(".hero");
  if (serie.esShort) {
    hero.style.aspectRatio = "9/16";
    hero.style.maxWidth = "340px";
    hero.style.margin = "15px auto";
  } else {
    hero.style.aspectRatio = "";
    hero.style.maxWidth = "";
    hero.style.margin = "";
  }

  if (serie.tiktoks && serie.tiktoks.length) {
    mostrarTikTok(serie.tiktoks[0]);
    actualizarEpisodio();
    const tituloEl = document.getElementById("video-titulo-youtube");
    if (tituloEl) tituloEl.innerText = serie.titulo || "";
    return;
  }

  if (serie.fbreels && serie.fbreels.length) {
    mostrarFBReel(serie.fbreels[0]);
    actualizarEpisodio();
    return;
  }

  // 💾 ¿hay progreso guardado de esta serie? si hay, retomamos ahí
  const progreso = obtenerProgreso(id);

  if (serie.playlist) {
    const indiceInicial = progreso ? progreso.indice : 0;
    player.loadPlaylist({
      listType: "playlist",
      list: serie.playlist,
      index: indiceInicial,
    });
    setTimeout(() => {
      player.setShuffle(false);
      forzarSubtitulos();
      const lista = player.getPlaylist();
      playlistLength = lista && lista.length ? lista.length : 0;
      lastPlaylistIndex = -1;
      // 💾 si veníamos con un segundo guardado, saltamos ahí
      if (progreso && progreso.segundo > 0 && player.seekTo) {
        player.seekTo(progreso.segundo, true);
      }
      actualizarEpisodio();
    }, 1500);
    return;
  }

  playlist = serie.videos || [];
  if (playlist.length) {
    current =
      progreso && progreso.indice < playlist.length ? progreso.indice : 0;
    const segundoInicial = progreso ? progreso.segundo : 0;
    player.loadVideoById({
      videoId: playlist[current],
      startSeconds: segundoInicial,
    });
    forzarSubtitulos();
  }
}

function prevVideo() {
  idiomaSubtituloAplicado = false;
  const serie = [...seriesArray].find((s) => s.id === currentSerieId);

  if (serie && serie.tiktoks) {
    current--;
    if (current < 0) current = 0;
    mostrarTikTok(serie.tiktoks[current]);
    actualizarEpisodio();
    return;
  }

  if (serie && serie.fbreels) {
    current--;
    if (current < 0) current = 0;
    mostrarFBReel(serie.fbreels[current]);
    actualizarEpisodio();
    return;
  }

  if (serie && serie.playlist) {
    player.previousVideo();
    return;
  }
  current--;
  if (current >= 0) {
    player.loadVideoById(playlist[current]);
    forzarSubtitulos();
  } else current = 0;
}

function nextVideo() {
  idiomaSubtituloAplicado = false;
  const serie = [...seriesArray].find((s) => s.id === currentSerieId);

  if (serie && serie.tiktoks) {
    current++;
    if (current < serie.tiktoks.length) {
      mostrarTikTok(serie.tiktoks[current]);
      actualizarEpisodio();
    }
    return;
  }

  if (serie && serie.fbreels) {
    current++;
    if (current < serie.fbreels.length) {
      mostrarFBReel(serie.fbreels[current]);
      actualizarEpisodio();
    }
    return;
  }

  if (serie && serie.playlist) {
    player.nextVideo();
    return;
  }
  current++;
  if (current < playlist.length) {
    player.loadVideoById(playlist[current]);
    forzarSubtitulos();
  }
}

function verSerie(id) {
  if (!playerReady) return;
  currentSerieId = id;
  playlist = [];
  current = 0;
  playingOst = false;
  playlistLength = 0;
  lastPlaylistIndex = -1;
  if (ostTimer) {
    clearTimeout(ostTimer);
    ostTimer = null;
  }
  if (player && player.stopVideo) player.stopVideo();
  setTimeout(() => {
    cargarSerie(id);
  }, 200);
  document.querySelector(".hero").scrollIntoView({ behavior: "smooth" });
}

function scrollArribaSuave() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// =====================
// 🎯 MOSTRAR EPISODIO
// =====================

function actualizarEpisodio() {
  const info = document.getElementById("episodio-info");
  if (!info) return;
  const serie = [...seriesArray].find((s) => s.id === currentSerieId);

  if (serie && serie.tiktoks) {
    info.innerText = "Parte " + (current + 1) + " de " + serie.tiktoks.length;
    return;
  }

  if (serie && serie.fbreels) {
    info.innerText = "Parte " + (current + 1) + " de " + serie.fbreels.length;
    return;
  }

  if (serie && serie.playlist) {
    const index = player.getPlaylistIndex();
    const lista = player.getPlaylist();
    let total = lista && lista.length ? lista.length : 0;
    info.innerText = total
      ? "Episodio " + (index + 1) + " de " + total
      : "Episodio " + (index + 1);
    return;
  }

  if (serie) {
    info.innerText = "Episodio " + (current + 1) + " de " + playlist.length;
    return;
  }

  // Si no es una serie (es un short/historia de microficción u otro contenido)
  info.innerText = "Episodio " + (current + 1) + " de " + playlist.length;
}

// =====================
// 🎬 TÍTULO AUTOMÁTICO DEL VIDEO (YouTube)
// =====================

function actualizarTituloYoutube() {
  const el = document.getElementById("video-titulo-youtube");
  if (!el || !player || typeof player.getVideoData !== "function") return;

  const data = player.getVideoData();

  if (data && data.title) {
    el.innerText = data.title;
  } else {
    // A veces YouTube tarda un instante en entregar el título, reintentamos
    setTimeout(actualizarTituloYoutube, 300);
  }
}

// =====================
// 📝 INFO CONTENIDO (SEO) — DESACTIVADO
// =====================

function mostrarInfoContenido(item) {
  // Desactivado por ahora
  return;
}

function ocultarInfoContenido() {
  const cont = document.getElementById("info-contenido");
  if (!cont) return;
  cont.classList.remove("active");
  cont.innerHTML = "";
}

// =====================
// ▶ REPRODUCTOR UNIVERSAL
// =====================

function reproducirContenido(item, ocultarControles = false) {
  idiomaSubtituloAplicado = false;
  document
    .querySelectorAll(".card")
    .forEach((c) => c.classList.remove("active"));
  if (!playerReady) return;
  currentSerieId = item.id;
  guardarUltimaSerie(item.id);
  current = 0;
  playlist = [];
  playingOst = false;
  playlistLength = 0;
  lastPlaylistIndex = -1;
  if (ostTimer) {
    clearTimeout(ostTimer);
    ostTimer = null;
  }
  if (player && player.stopVideo) player.stopVideo();

  const controlesEpisodio = document.querySelector(".player-controls");
  if (controlesEpisodio) {
    controlesEpisodio.classList.toggle("oculto-controles", ocultarControles);
  }

  ocultarInfoContenido();

  setTimeout(() => {
    if (item.tiktoks && item.tiktoks.length) {
      mostrarTikTok(item.tiktoks[0]);
      actualizarEpisodio();
      const tituloEl = document.getElementById("video-titulo-youtube");
      if (tituloEl) tituloEl.innerText = item.titulo || "";
      return;
    }

    if (item.fbreels && item.fbreels.length) {
      mostrarFBReel(item.fbreels[0]);
      actualizarEpisodio();
      return;
    }

    ocultarTikTok();

    if (item.playlist) {
      player.loadPlaylist({
        listType: "playlist",
        list: item.playlist,
        index: 0,
      });
      setTimeout(() => {
        player.setShuffle(false);
        const lista = player.getPlaylist();
        playlistLength = lista && lista.length ? lista.length : 0;
        lastPlaylistIndex = -1;
        actualizarEpisodio();
      }, 1500);
      return;
    }
    if (item.videos) {
      playlist = item.videos;
      player.loadVideoById(playlist[0]);
      actualizarEpisodio();
      const hero = document.querySelector(".hero");
      if (item.esShort) {
        hero.style.aspectRatio = "9/16";
        hero.style.maxWidth = "340px";
        hero.style.margin = "15px auto";
      } else {
        hero.style.aspectRatio = "";
        hero.style.maxWidth = "";
        hero.style.margin = "";
      }
    }
  }, 200);
  document.querySelector(".hero").scrollIntoView({ behavior: "smooth" });
}
// =====================
// 🎞 RENDER SERIES CARDS + PAGINACIÓN
// =====================

function renderSection(array, containerId, paginationId, perPage = 20) {
  let page = 1;
  const container = document.getElementById(containerId);
  const pagination = document.getElementById(paginationId);

  function render() {
    container.innerHTML = "";
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const isMobile = "ontouchstart" in window;

    array.slice(start, end).forEach((item) => {
      const div = document.createElement("div");
      div.className = "card";
      div.onclick = (e) => {
        if (item.link) {
          window.open(item.link, "_blank");
          return;
        }
        if (isMobile) {
          if (!div.classList.contains("active")) {
            e.preventDefault();
            document
              .querySelectorAll(".card")
              .forEach((c) => c.classList.remove("active"));
            div.classList.add("active");
            return;
          }
          if (item.slug) {
            abrirSerie(item);
          } else {
            reproducirContenido(item);
          }
          return;
        }
        if (item.slug) {
          abrirSerie(item);
        } else {
          reproducirContenido(item);
        }
      };

      div.innerHTML = `
      <div class="card-img">
        <img src="${item.img}" loading="lazy">
        <div class="overlay">
          <p class="genero">${item.genero || ""}</p>
          <p class="sinopsis">${item.sinopsis || ""}</p>
          <button class="btn-ver">▶ VER SERIE</button>
        </div>
      </div>
      <p class="titulo">${item.titulo}</p>
    `;
      container.appendChild(div);
    });

    pagination.innerHTML = "";
    const total = Math.ceil(array.length / perPage);
    for (let i = 1; i <= total; i++) {
      const b = document.createElement("button");
      b.textContent = i;
      if (i === page) b.classList.add("active");
      b.onclick = () => {
        page = i;
        render();
        setTimeout(() => {
          const section = document.getElementById("series");
          const yOffset = -40;
          const y =
            section.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100);
      };
      pagination.appendChild(b);
    }
  }

  render();
}
// =====================
// 📺 RENDER COMUNIDAD
// =====================

const titleCache = {};

function renderComunidad(
  array,
  containerId,
  paginationId,
  perPage = 5,
  sectionId,
  usarUrl = false
) {
  let page = 1;
  const container = document.getElementById(containerId);
  const pagination = document.getElementById(paginationId);

  async function fetchTitle(videoId, div) {
    if (titleCache[videoId]) {
      const tituloEl = div.querySelector(".com-titulo");
      const canalEl = div.querySelector(".com-canal");
      if (tituloEl) tituloEl.textContent = titleCache[videoId].title;
      if (canalEl) canalEl.textContent = titleCache[videoId].author;
      return;
    }

    const urls = [
      `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`,
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    ];

    for (const url of urls) {
      try {
        const r = await fetch(url);
        if (!r.ok) continue;
        const data = await r.json();
        if (!data.title) continue;
        titleCache[videoId] = {
          title: data.title,
          author: data.author_name || "",
        };
        const tituloEl = div.querySelector(".com-titulo");
        const canalEl = div.querySelector(".com-canal");
        if (tituloEl) tituloEl.textContent = data.title;
        if (canalEl) canalEl.textContent = data.author_name || "";
        return;
      } catch (_) {}
    }

    const tituloEl = div.querySelector(".com-titulo");
    if (tituloEl) tituloEl.textContent = "▶ Ver video";
  }

  async function render() {
    container.innerHTML = "";
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const slice = array.slice(start, end);

    for (let i = 0; i < slice.length; i++) {
      const item = slice[i];
      if (!item.videos) item.videos = [item.videoId];

      const div = document.createElement("div");
      div.className = "com-card";

      div.onclick = () => {
        if (usarUrl && item.slug) {
          abrirHistoria(item);
        } else {
          reproducirContenido(
            item,
            sectionId === "ostsgl" || sectionId === "comunidadgl"
          );
        }
      };

      const cached = titleCache[item.videoId];

      const thumbSrc = item.img
        ? item.img
        : `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`;
      const thumbFallback = item.img
        ? item.img
        : `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;

      div.innerHTML = `
        <div class="com-thumb">
          <img src="${thumbSrc}" alt="" loading="lazy" onerror="this.src='${thumbFallback}'">
          <div class="com-play">▶</div>
        </div>
        <div class="com-info">
          <p class="com-titulo">
            ${item.titulo || (cached ? cached.title : "Cargando...")}
          </p>
          <span class="com-canal">
          ${item.canal || (cached ? cached.author : "")}
        </span>
        </div>
      `;

      container.appendChild(div);

      if (!cached && !item.titulo) {
        setTimeout(() => fetchTitle(item.videoId, div), i * 100);
      }
    }

    pagination.innerHTML = "";
    const total = Math.ceil(array.length / perPage);
    for (let i = 1; i <= total; i++) {
      const b = document.createElement("button");
      b.textContent = i;
      if (i === page) b.classList.add("active");
      b.onclick = () => {
        page = i;
        render();
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          const yOffset = -100;
          const y =
            section.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100);
      };
      pagination.appendChild(b);
    }

    if (document.documentElement.scrollTop > 100) {
      setTimeout(() => {
        const activeBtn = pagination.querySelector("button.active");
        if (activeBtn)
          activeBtn.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
      }, 150);
    }
  }

  render();
}
// =====================
// 📰 RENDER NOTICIAS
// =====================

function renderNoticias(
  array,
  containerId,
  paginationId,
  perPage = 5,
  sectionId = "noticias",
  openFn = abrirNoticia
) {
  let page = 1;

  const container = document.getElementById(containerId);

  const pagination = document.getElementById(paginationId);

  function render() {
    container.innerHTML = "";

    const start = (page - 1) * perPage;

    const end = start + perPage;

    array.slice(start, end).forEach((item) => {
      const div = document.createElement("div");

      div.className = "noticia-card";

      div.style.cursor = "pointer";

      div.onclick = () => openFn(item);

      div.innerHTML = `
        <div class="noticia-img">
          <img loading="lazy" src="${item.img}" alt="${item.titulo}">
        </div>

        <div class="noticia-info">
          <p class="noticia-fecha">📅 ${item.fecha}</p>

          <p class="noticia-titulo">
            ${item.titulo}
          </p>

          <p class="noticia-texto">
  ${item.resumen || item.texto}
</p>
        </div>
      `;

      container.appendChild(div);
    });

    pagination.innerHTML = "";

    const total = Math.ceil(array.length / perPage);

    for (let i = 1; i <= total; i++) {
      const b = document.createElement("button");

      b.textContent = i;

      if (i === page) b.classList.add("active");

      b.onclick = () => {
        page = i;
        render();
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          const yOffset = window.innerWidth <= 700 ? -70 : -100;
          const y =
            section.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100);
      };

      pagination.appendChild(b);
    }
  }

  render();
}
// =====================
// 🟣 ABRIR NOTICIA SEO
// =====================

function abrirNoticia(item) {
  history.pushState({}, "", "/noticia/" + item.slug);
  document.title = item.titulo;
  abrirModal(item, "noticias");
}

// =====================
// 🎬 ABRIR HISTORIA (GL PLAY ORIGINALS)
// =====================

function abrirHistoria(item) {
  history.pushState({}, "", "/historia/" + item.slug);
  document.title = (item.titulo || "Historia GL") + " - Girls Love Play";
  reproducirContenido(item);
}

function cerrarHistoria() {
  history.pushState({}, "", "/");
  document.title = "Girls Love Play - Tu espacio GL favorito 💖";
  ocultarInfoContenido();
}

// =====================
// 🎬 ABRIR SERIE (SEO)
// =====================

function abrirSerie(item) {
  history.pushState({}, "", "/serie/" + item.slug);
  document.title = item.titulo + " - Girls Love Play";
  verSerie(item.id);
}

function cerrarSerie() {
  history.pushState({}, "", "/");
  document.title = "Girls Love Play - Tu espacio GL favorito 💖";
  ocultarInfoContenido();
}

// =====================
// 📰 MODAL
// =====================

// Cache en memoria: si ya se pidió un detalle, no se vuelve a fetchear
const detalleCache = {
  noticias: new Map(),
};

async function obtenerDetalleCompleto(tipo, id) {
  const cache = detalleCache[tipo];
  if (cache.has(id)) {
    return cache.get(id);
  }
  const res = await fetch(`/data/${tipo}/${id}.json`);
  if (!res.ok) throw new Error("No se pudo cargar el detalle: " + id);
  const data = await res.json();
  cache.set(id, data);
  return data;
}

async function abrirModal(item, tipo = "noticias") {
  // Datos livianos (ya los tenemos desde el índice) -> se muestran al instante
  document.getElementById("modal-img").src = item.img;
  document.getElementById("modal-fecha").textContent = "📅 " + item.fecha;
  document.getElementById("modal-titulo").textContent = item.titulo;
  document.getElementById("modal-texto").textContent = "Cargando...";

  // El trailer ya viene en el índice -> se muestra de una, sin esperar el fetch
  const videoEl = document.getElementById("modal-video");
  if (item.trailer) {
    videoEl.innerHTML = `
      <div
        style="
          position:relative;
          padding-bottom:58.25%;
          height:0;
          margin-top:10px;
          border-radius:10px;
          overflow:hidden;
        "
      >
        <iframe
          style="
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
            border:none;
            border-radius:10px;
          "
          src="https://www.youtube.com/embed/${item.trailer}"
          allowfullscreen
        ></iframe>
      </div>
    `;
  } else {
    videoEl.innerHTML = "";
  }

  document.getElementById("modal-noticias").classList.add("active");
  document.body.style.overflow = "hidden";

  // Solo el texto se pide bajo demanda
  try {
    const detalle = await obtenerDetalleCompleto(tipo, item.id);
    let textoHtml = detalle.texto.replace(/\n\n/g, "<br><br>");

    // Si el detalle tiene una segunda imagen (imgFinal), se agrega debajo del texto
    if (detalle.imgFinal) {
      textoHtml += `
        <img
          src="${detalle.imgFinal}"
          alt="${item.titulo}"
          style="width:100%;border-radius:10px;margin-top:16px;display:block;"
        />
      `;
    }

    document.getElementById("modal-texto").innerHTML = textoHtml;
  } catch (err) {
    document.getElementById("modal-texto").textContent =
      "No se pudo cargar el contenido. Intentá de nuevo más tarde.";
    console.error("Error cargando detalle:", err);
  }
}

// =====================
// ❌ CERRAR MODAL
// =====================

function cerrarModal(e) {
  if (e && e.target !== document.getElementById("modal-noticias")) return;

  document.getElementById("modal-noticias").classList.remove("active");

  document.body.style.overflow = "";

  history.pushState({}, "", "/");

  document.title = "GL Series";
}

// =====================
// INIT
// =====================

renderNoticias(noticiasArray, "noticias-container", "pagination-noticias", 6);
renderShips(shipsArray, "ships-container", "pagination-ships", 6);
renderComunidad(
  microficcionArray,
  "microficcion-container",
  "pagination-microficcion",
  4,
  "microficcion",
  true
);
renderComunidad(
  comunidadArray,
  "comunidad-container",
  "pagination-comunidad",
  6,
  "comunidadgl"
);
renderComunidad(ostsArray, "osts-container", "pagination-osts", 8, "ostsgl");
// Fix scroll al inicio (SIEMPRE arriba, sin importar el # que tenga la URL)
if (!window.location.hash) {
  window.scrollTo(0, 0);
  setTimeout(() => window.scrollTo(0, 0), 300);
}

// =====================
// MENÚ HAMBURGUESA
// =====================

function toggleMenu() {
  document.querySelector(".nav").classList.toggle("active");
}

document
  .querySelectorAll(".nav a:not(.nav-dropdown-toggle)")
  .forEach((link) =>
    link.addEventListener("click", () =>
      document.querySelector(".nav").classList.remove("active")
    )
  );

// DROPDOWN "NOTICIAS GL"
document.querySelectorAll(".nav-dropdown-toggle").forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    const dropdown = toggle.parentElement;
    document.querySelectorAll(".nav-dropdown.active").forEach((d) => {
      if (d !== dropdown) d.classList.remove("active");
    });
    dropdown.classList.toggle("active");
  });
});

document.addEventListener("click", (e) => {
  document.querySelectorAll(".nav-dropdown.active").forEach((dropdown) => {
    if (!dropdown.contains(e.target)) dropdown.classList.remove("active");
  });
});

document.querySelectorAll('a[href="#inicio"]').forEach((link) =>
  link.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  })
);

// MODAL LEGAL
function cerrarModalLegal(e) {
  if (!e || e.target.classList.contains("modal-overlay")) {
    document.getElementById("modal-legal").classList.remove("active");
  }
}

window.addEventListener("load", () => {
  const path = window.location.pathname;

  if (path.startsWith("/ship/")) {
    const slug = path.split("/ship/")[1];
    const ship = shipsArray.find((s) => s.slug === slug);
    if (ship) {
      document.body.style.background =
        "url('https://i.postimg.cc/Zn5kq1g3/Cielo-nocturno-de-luces-suaves.png') no-repeat center/cover";
      abrirShip(ship);
    }
  }

  if (path.startsWith("/historia/")) {
    const slug = path.split("/historia/")[1];
    const historia = microficcionArray.find((h) => h.slug === slug);
    if (historia) {
      const intentar = () => {
        if (playerReady) {
          reproducirContenido(historia);
          document.title =
            (historia.titulo || "Historia GL") + " - Girls Love Play";
        } else {
          setTimeout(intentar, 300);
        }
      };
      intentar();
    }
  }
});
