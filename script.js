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
let playlistLength = 0;
let lastPlaylistIndex = -1;

// =====================
// 🎬 SERIES
// =====================

const seriesArray = [
  {
    id: "aigirl",
    slug: "ai-girl",
    img: "/img/series/AI-Girl-(2026).jpg",
    titulo: "AI Girl (2026)",
    genero: "Romance/Ciencia ficción",
    sinopsis:
      "Una diseñadora de rostros con IA crea a la chica de sus sueños, pero todo cambia cuando esa cara cobra vida como un androide.",
    videos: ["3CC58stapKQ", "1HDj3Hlumv4", "DqifdSf7vVQ", "wrcBP3zbTNY"],
  },

  {
    id: "myladysbodyguard",
    slug: "my-ladys-bodyguard",
    img: "/img/series/My-Lady's-Bodyguard.jpg",
    titulo: "My Lady's Bodyguard (2026)",
    genero: "Romance",
    sinopsis:
      "Una guardaespaldas protege a una joven rebelde mientras enfrentan peligros. Entre secretos y desafíos, el amor florece entre ambas.",
    videos: ["3QCTtz_y4JU", "wNVt7i8P_Ns"],
  },

  {
    id: "offtherecord",
    slug: "off-the-record",
    img: "/img/series/Off-the-Record-(2026).jpg",
    titulo: "Off the Record (2026)",
    genero: "Romance",
    sinopsis:
      "Una pasante sin hogar vive en secreto con su estricta líder de equipo. La convivencia rompe los límites profesionales y cambia su relación.",
    videos: ["88KSedd9OpY"],
  },

  {
    id: "myroommatecrush",
    slug: "my-roommate-crush",
    img: "/img/series/My-Roommate-Crush.jpg",
    titulo: "My Roommate Crush (2026)",
    genero: "Romance",
    sinopsis: "",
    videos: [
      "Gdddq6GCcvY",
      "sf53bmhxTxQ",
      "8jbSgzV77ls",
      "J0_913xTy4c",
      "AGM-uPnzltc",
      "7_w2zxEJN4s",
      "-p63sLOaVco",
      "OV3C3Pmp9D8",
      "IHerJiaS-YM",
      "0POR1eVOeto",
      "xdQEIXGddsY",
    ],
  },

  {
    id: "cincominutosdementira",
    slug: "cinco-minutos-de-mentira",
    titulo: "Cinco minutos de mentira (2026)",
    genero: "Romance/Drama",
    videoId: "MaCuR49C5Tc",
    img: "/img/series/Cinco-minutos-de-mentira.jpg",
    sinopsis:
      "Cinco minutos de mentira cambiaron todo. Ahora Nari y Valentina deberán enfrentar un pasado lleno de secretos y una verdad imposible de ocultar.",
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
    ],
  },
  {
    id: "thepartners",
    slug: "the-partners",

    img: "/img/series/The-Partners-(2026).jpg",
    titulo: "The Partners (2026)",
    genero: "Romance",
    sinopsis: "",
    videos: ["klULFypTofQ", "CDPsz8-PGUU"],
  },

  {
    id: "midnightmart",
    slug: "midnight-mart",
    img: "/img/series/midnight-mart-2026).jpg",
    titulo: "Midnight Mart (2026)",
    genero: "Romance",
    sinopsis:
      "Una trabajadora de TI se enamora de la cajera de la tienda de conveniencia a la que suele ir.",
    videos: ["ytPdTSUX4UQ", "aNr00I3Ow8A", "7g6FjMbRF_g"],
  },

  {
    id: "neverfade",
    slug: "never-fade",
    img: "/img/series/never fade.jpg",
    titulo: "Never Fade (2026)",
    genero: "Romance/Drama",
    sinopsis:
      "Never Fade es un corto GL de Yoko Apasra, su proyecto de graduación, sobre tatuajes, miedo, dolor y un amor entre mujeres que perdura.",
    videos: ["cxhBYv0On58"],
  },

  {
    id: "shades",
    slug: "shades",
    img: "/img/series/shades-2026.jpg",
    titulo: "Shades(2026)",
    genero: "Romance/Drama",
    sinopsis:
      "Shades sigue a seis estudiantes y dos profesoras de una escuela solo para mujeres, donde secretos e identidades ocultas cambian todo.",
    videos: [
      "I57LYooYcJs",
      "OQt-bR7YUHA",
      "16mRTBTi2T8",
      "Fab2WHEke4A",
      "S2ot2Nj_s5k",
      "nIBwomtJbwI",
      "ve3JSpyxzz4",
      "D7clbK2iV38",
      "tmOVIZnJvZM",
      "SSI5RgXbDjs",
      "zBTxXz5mPXY",
      "xQULsHLpxGk",
      "LOovJzIk8mo",
      "DWcNK8pF_Fc",
      "Ua2-JKbsQGU",
      "iRHf1KlrT7s",
    ],
  },

  {
    id: "bemyangel",
    slug: "be-my-angel",
    img: "/img/series/Be_My_Angel_(2026).jpg",
    titulo: "Be My Angel (2026)",
    genero: "Romance/Comedia",
    sinopsis:
      "Jane cambia todos sus méritos por tres deseos, pero recibe a Z, un ángel torpe e inexperto que le complica la vida.",
    videos: [
      "fGoXO9OHCaU",
      "PHA0fnTj4e0",
      "fwKtuqckiWs",
      "B3OassE1LGk",
      "zZV4hPBzbK0",
      "56XS_thZOrM",
      "zR_LS73IVwQ",
      "y30_bX7gxPg",
      "QNlFqoRzHLo",
      "a8zLIyfTzas",
      "iEk6SoTkvbU",
      "xanFPolaIOo",
      "vUwPRYBRBTg",
      "2hsQvn57L8M",
      "EJFGDfSPw0M",
      "EWxEwDlEOew",
      "rNmrigjSFFc",
      "XhraM6X-Us0",
      "7sn0RgmEEH4",
      "eLEOndVOQf8",
      "Ml6KZxDIM4A",
      "UmNtjXBnNYM",
      "MQxgHn9bD64",
      "24RoW8qmkxI",
      "JeLmxaL7Xpg",
      "hkylKDEnRb0",
      "6PGWoFwunnU",
      "L42aSu-eV2Q",
    ],
  },

  {
    id: "rentallovelab",
    slug: "rental-love-lab",
    img: "/img/series/Rental-Love-Lab.jpg",
    titulo: "Rental Love Lab (2026)",
    genero: "Romance",
    sinopsis:
      "Claire debe fingir escenas románticas con la escritora Eris. Lo que empieza como investigación podría convertirse en amor real",
    videos: ["DH6b3St6DVU", "7HbO2qF4B_8", "XYssHJKsh34", "8h1WitA0swU"],
  },

  {
    id: "10rulesbeforeifellforyou",
    slug: "10-rules-before-i-fell-for-you",
    img: "/img/series/10-Rules-before-I-Fell-for-You.jpg",
    titulo: "10 Rules before I Fell for You (2026)",
    genero: "Romance",
    sinopsis:
      "Time, autora bestseller de “10 reglas antes de enamorarme”, cree que el amor es lógica. En una estancia rural conoce a Lean, su crítico. Choque entre razón y sentimientos.",
    videos: [
      "oFLZi9WDWWk",
      "HpRFBUDjuf0",
      "SidizzkfnAg",
      "XvafSa0b3xA",
      "0i-zd5fo-4g",
      "1yz7IpZTxDI",
    ],
  },

  {
    id: "enemieswithbenefits",
    slug: "enemies-with-benefits",
    img: "/img/series/Enemies-with-Benefits.jpg",
    titulo: "Enemies With Benefits (2026)",
    genero: "Comedia/Romance",
    sinopsis:
      "Lan y Wine, dos jefas que se odian, inician una relación secreta tras una noche de copas, pero el deseo se vuelve amor.",
    videos: [
      "0EPN_IlU2gU",
      "s8JHogHchZU",
      "0sx2_SvRHRM",
      "_iLooWOfDA8",
      "n2YrTsKYsMM",
      "RfA67TyAjS4",
      "cbu-QYg50-I",
      "IYABof5lJXI",
      "ejFW1_12Exk",
      "uHtcgRA8wdg",
      "b2RXlkJYkf4",
      "_0taVuq_eTw",
      "KkKsNU21U3w",
      "H50jdxOZ_dY",
      "2mphTdMxFI0",
      "mvNAthnaI5o",
      "rxEnWtunbUY",
      "tP2TZqtIems",
      "Y-mhXV1deeU",
      "5mH9ZWhjUEk",
      "m7N0L1C0nig",
      "ATRCtanIhHA",
      "iFxDKFwY7VA",
      "3ZHajg945oQ",
      "tqmuq_UmRb4",
      "WJxy0WIaNW8",
      "I00-xKlFuCE",
      "1pG0SB2i0mA",
      "DhnFa-c5I3o",
      "zA8gsdqj5GQ",
      "DiVA8byF60E",
      "-IeQBx8qYho",
      "7Am1PNq6fzo",
      "uLz7qZQ4K5k",
      "ApmsEB9cWl4",
      "x-2Inmye-Bs",
    ],
  },

  {
    id: "fulfill",
    slug: "fulfill",
    img: "/img/series/Fulfill.jpg",
    titulo: "Fulfill (2026)",
    genero: "Comedia/Romance",
    sinopsis:
      "Aioon y Paifun ven tambalear su matrimonio cuando el deseo de ser madres y la llegada de Nubnueng cambian sus vidas para siempre.",
    playlist: "PLDIqVRSvaz9K1QU_-MbiWVgtSqMZmmh7e",
  },

  {
    id: "lovebeyonddreams",
    slug: "love-beyond-dreams",
    img: "/img/series/Love-beyond-Dreams-2026.jpg",
    titulo: "Love beyond Dreams (2026)",
    genero: "Romance/Fantasy",
    sinopsis:
      "Aran vuelve a Tailandia y descubre que Lene murió. Tras despertar cinco años en el pasado, intentará cambiar su destino y salvarla.",
    playlist: "PLFnFjT24wVPX7gxcGvZV89N6h7PASbnPc",
  },

  {
    id: "thewaybacktoyou",
    slug: "the-way-back-to-you",
    img: "/img/series/The-Way-Back-to-You-(2026).jpg",
    titulo: "The Way Back to You (2026)",
    genero: "Romance/Drama",
    sinopsis:
      "Shen Fang, una joven apasionada, reencuentra a Ku Ching Shui y juntas enfrentan conflictos, amor y presión social para sanar su pasado.",
    videos: [
      "Q2NlhgGtx9Q",
      "yUp9pg6QcnA",
      "UXVmiQfDj88",
      "oZW9P1ajX1M",
      "PqMUqrofZqc",
      "giGoHCVXxrk",
    ],
  },

  {
    id: "twintangle",
    slug: "twin-tangle",
    img: "/img/series/Twin-Tangle.jpg",
    titulo: "Twin Tangle (2026)",
    genero: "Drama",
    sinopsis: "",
    videos: ["3VY8S_XDchw"],
  },

  {
    id: "vampireunnie ",
    slug: "vampir-unnie",
    img: "/img/series/vampire-unnie-2026.jpg",
    titulo: "Vampire Unnie (2026)",
    genero: "Fantasia/Sobrenatural",
    sinopsis:
      "Una mujer encuentra en la calle a una vampira herida y decide cuidarla.",
    videos: [
      "MA_xJNMeZ7Y",
      "bgmEtxikOJU",
      "-dbLy_Z_lcU",
      "hu68Ju9Y26g",
      "cpbsL0oxA0g",
      "-AebPBc6QLw",
      "JkI3GGSLnNs",
      "E5HsIoInpFo",
    ],
  },

  {
    id: "brokenoflove",
    slug: "broken-of-love",
    img: "/img/series/Broken-of-Love-(2026).jpg",
    titulo: "Broken of Love (2026)",
    genero: "Drama/Psicologico",
    sinopsis:
      "Alisa busca vengar el asesinato de sus padres, pero termina enamorándose de la hija de su enemigo.",
    videos: [
      "T6h6tDomGQM",
      "d4Icfxk9Ps8",
      "I1s5XY2uimY",
      "oOlPjYAqKzE",
      "aaP24mFkM2A",
      "MFszhmtQhPA",
      "6R26njCbeDk",
      "RMFTqR27_I4",
      "Qe5Sv5zVXzc",
      "dKDwB-LaV98",
      "_G31TfvGM0Q",
      "rewRw_6Y6qQ",
      "tFR1iOK3hCI",
      "4Kb6eJzfNnU",
      "3oOCY5KnbOI",
      "zUej8YwWINE",
      "yoPL2bEjevo",
      "R7wWq7Dxdvc",
      "kfhK9Ve4uNg",
      "zMshWvqIBOE",
      "xDiz5CrABog",
      "BNSyJGk3Xro",
      "hun2SfgWMac",
      "ZJNqyZYrWBQ",
      "vjabHdPBrw0",
      "fqnE58ele6w",
      "yb7g8SVcNfg",
      "ekvGL-q_7yU",
      "A6Nu9g4abqM",
      "FpSzPt1e4Tk",
      "8SXP_tJ7cio",
      "DCcFAnwCYv4",
      "EECHvMaDigQ",
    ],
  },

  {
    id: "myonlysunshine",
    slug: "my-only-sunshine",
    img: "/img/series/My-Only-Sunshine-2026-1.jpg",
    titulo: "My Only Sunshine (2026)",
    genero: "Drama/Romance",
    sinopsis:
      "Una actriz persigue a la hermana mayor de su mejor amiga, una poderosa ejecutiva. Rumores falsos, celos y una gemela perdida complican el camino al amor.",
    videos: [
      "ux1BNnro_to",
      "g-sMS2vcxcI",
      "JWD7zSGJnu0",
      "j4oAssekcFo",
      "gzvvYywn2Ko",
      "NaJCrCAlE-U",
      "1-T7BxXe1bE",
      "89cZCAZ33Jg",
      "E8q4klApbZM",
      "1sW2f-EoaPU",
      "_tMwcyWavKY",
      "iIlIgii1_ls",
      "sviflQL715Y",
      "SkY3A3YqIQo",
      "97qmIIrBtmQ",
      "YiWu0ZjtpCY",
      "l8cxOx8ojkY",
      "9DXbeascqxs",
      "NYQ85o6CVes",
      "IIYUONt_zzk",
      "kLXKYZm_vhA",
      "Frr91SY4F_A",
      "LaMTnqlD3qQ",
      "GmP2tbbii7k",
      "zl__qBRxx-g",
      "2gV0NIyWGo8",
      "A_oys84oirg",
      "DI5XdgNsy4U",
      "avW9JJoYVy4",
      "ygFJ-cOP4SY",
      "6K-cE5b2Gh0",
      "cQQ3dA9XDJI",
      "Ptlf4ElFTrk",
    ],
  },

  {
    id: "shadowoflove",
    slug: "shadow-of-love",
    img: "/img/series/Shadow-of-Love-(2026).jpg",
    titulo: "Shadow of Love (2026)",
    genero: "Romance",
    sinopsis:
      "Dos jóvenes criadas como hermanas descubren, entre conflictos y cercanía, un amor prohibido que cambiará sus vidas para siempre.",
    playlist: "PLI1xfwk6UKPm_8_O79pRsdO5r2aF-pYUd",
  },

  {
    id: "aghostsfirstlove",
    slug: "a-ghosts-first-love",
    img: "/img/series/A-Ghost-s-First-Love-(2026).jpg",
    titulo: "A Ghost’s First Love (2026)",
    genero: "Romance",
    sinopsis:
      "Jeong A vive en soledad y agotamiento hasta que un “fantasma” aparece en su cuarto. Unidas por el vacío, descubre por primera vez lo que es ser amada.",
    videos: ["h4fZl8EGGCg", "uyubmnEOJ7s", "g735aONHXoQ"],
  },

  {
    id: "7destinies",
    slug: "7-destinies",
    img: "/img/series/Destinos-entrelazados-en-el-bosque.jpg",
    titulo: "7 Destinies (2026)",
    genero: "Drama/Romance",
    sinopsis:
      "Ice y Nita viajan por 7 deseos en busca de amor; entre cambios y riesgos, sus corazones decidirán su destino final.",
    videos: [
      "5emKVn0EOS0",
      "54DSf0sao1E",
      "AzgVyf936bA",
      "fLUsCFxzU3Y",
      "cPMBdj0ZhU4",
    ],
  },

  {
    id: "ghostfriendforeverseason2",
    slug: "ghostfriend-forever-season-2",
    img: "/img/series/Ghostfriend-Forever-Season-2-(2026).jpg",
    titulo: "Ghostfriend Forever Season 2 (2026)",
    genero: "Romance",
    sinopsis:
      "Tras regresar sin recuerdos, Love y Day vuelven a enamorarse. Pero cuanto más cerca están, más comienza Day a olvidarla.",
    videos: [
      "A8cLcUUW90I",
      "_D8s-cOeCnY",
      "htO3G0aouc0",
      "s4NRYGpc0cE",
      "HuGvDLS9CFY",
      "WDeQpq7ZqKo",
      "4oycf0sqtNc",
      "3fA30vCz_u8",
    ],
  },

  {
    id: "iwannabesuptar",
    slug: "i-wanna-be-suptar",
    img: "/img/series/i-wanna-be-sup-tar.jpg",
    titulo: "I Wanna Be Sup'tar (2026)",
    genero: "Comedia/Romance",
    sinopsis:
      "Una chica que sueña con ser superestrella desafía a sus padres y convive con una exfamosa que huye del espectáculo.",
    playlist: "PLpRvR46QQnisTu0dNhVThDTQE1fAeZ5Kf",
  },

  {
    id: "heartssecretcode",
    slug: "hearts-secret-code",
    img: "/img/series/Heart-s-Secret-Code-(2026).jpg",
    titulo: "Heart's Secret Code (2026)",
    genero: "Romance",
    sinopsis: "",
    videos: ["v7WqC4g_-7I"],
  },

  {
    id: "rawlove",
    slug: "raw-love",
    img: "/img/series/Raw-Love-(2026).jpg",
    titulo: "Raw Love (2026)",
    genero: "Romance",
    sinopsis:
      "Dos mujeres enfrentan amor, sacrificios y distancia mientras luchan por proteger el futuro de su relación.",
    videos: ["TaqnZUJzL-s"],
  },

  {
    id: "LeLaLesfluidlove",
    slug: "LeLaLes-fluid-love",
    img: "/img/series/LeLaLes-Fluid-Love-(2026).jpg",
    titulo: "LeLaLes: Fluid Love (2026)",
    genero: "Romance",
    sinopsis:
      "Un innovador reality de citas para mujeres queer chinas. Ocho mujeres, una villa en Chiang Mai y emociones auténticas sin guion.",
    videos: [
      "5g8uyCTGb0U",
      "1Mhkel-dHuM",
      "IBBu9kphVJ0",
      "33IwA7qUOa0",
      "OJjxWrIL_os",
      "isILyf2ovQA",
    ],
  },

  {
    id: "Fruit",
    slug: "fruit",
    img: "/img/series/Fruit-(2026).jpg",
    titulo: "Fruit (2026)",
    genero: "Romance",
    sinopsis:
      "Una historia de contención y deseo, donde dos corazones respetan el límite pero no pueden ignorar lo que sienten.",
    videos: [
      "wsniCMrPaHw",
      "aKD8GMJRxjE",
      "Dxx68V3ToIc",
      "786cClM7NEI",
      "H-fKAKs36dM",
      "Qq0s-LRQbbw",
      "_OXzPFPevrk",
      "4-x5Orkb84U",
      "ch73ig7SyjY",
      "JBYcqTtqVCw",
      "LToyXdKRNR0",
    ],
  },

  {
    id: "belovedfrangipani",
    slug: "beloved-frangipani",
    img: "/img/series/Beloved-Frangipani-(2026).jpg",
    titulo: "Beloved Frangipani (2026)",
    genero: "Romance",
    sinopsis:
      "Tras una infidelidad, Tharn pierde la fe en el amor. En un viaje conoce a Anna y vuelve a enamorarse, recuperando su sonrisa.",
    videos: ["sJO2g0jZW88"],
  },

  {
    id: "sweetpunishment",
    slug: "sweet-punishment",
    img: "/img/series/Sweet Punishment.jpg",
    titulo: "Sweet Punishment (2026)",
    genero: "Romance",
    sinopsis: "",
    videos: ["OIJLv4bvrJ4"],
  },

  {
    id: "On&OffSeason3",
    slug: "On-&-Off-Season-3",
    img: "/img/series/On-&-Off-Season-3(2027).jpg",
    titulo: "On & Off Season 3 (2026)",
    genero: "Romance/Drama",
    sinopsis:
      "Una CEO exitosa enfrenta romances, desafíos empresariales y complejas relaciones personales junto a las mujeres que forman parte de su círculo más cercano.",
    videos: ["hCIZIANZCsY"],
  },

  {
    id: "whyeventry",
    slug: "why-even-try",
    img: "/img/series/Why-t-xng-phyayam-(Why-Even-Try) (1).jpg",
    titulo: "Why Even Try (2026)",
    genero: "Romance",
    sinopsis:
      "La historia sigue a Sol y Wine, pareja desde hace dos años. Con el tiempo, el amor se enfría y Wine enfrenta el desgaste de amar sola.",
    videos: ["a54mqYRquiI"],
  },

  {
    id: "shockmegirls",
    slug: "shock-me-girls",
    titulo: "Shock Me Girls (2026)",
    img: "/img/series/Shock-Me-Girls-(2026).jpg",
    genero: "Romance/comedia",
    tiktoks: [
      "7611863842435468561",
      "7611920930880720145",
      "7614422254922829063",
      "7614522043094256917",
      "7617082284331617556",
      "7617436912004893960",
      "7619688849639263508",
      "7619985526858337552",
      "7624799542168308993",
      "7624984138382167297",
    ],
  },

  {
    id: "clairebell",
    slug: "clairebell",
    img: "/img/series/clairebell.jpg",
    titulo: "Clairebell (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "Bell, encarcelada injustamente, busca protección de Claire, la reclusa más temida. Una alianza de supervivencia se transforma en un intenso amor secreto.",
    playlist: "PLHC1cSXiDxwB2ZhuIaA3Rz8hsdSV5A_2N",
    ostVideo: "qjuXnqA4KRY",
  },

  {
    id: "runaway",
    slug: "runaway",
    img: "/img/series/runaway-series.jpg",
    titulo: "Runaway (2025)",
    genero: "Drama/Terror",
    sinopsis:
      "Winrawee enfrenta una muerte inminente al ser marcada por un espíritu maligno. Desesperada, recurre a Boon, su única esperanza, en 168 horas para vivir.",
    videos: [
      "Nb0BVxyQaN0",
      "eDMKiiFRWo8",
      "Z0xsEf8hRIM",
      "ikuYqX64YaU",
      "PjMEHj18j-E",
      "J-STQkInBtw",
      "Lt2qKUUT11M",
      "V4fdrj5lwyY",
      "JbKyXct7XUo",
      "FtCGcTWiDAc",
      "ZIn8LM3hslI",
      "1x_OF41WWBQ",
      "-Tf29VkpuKg",
      "SyCkohn-pTw",
      "g8XGUHzDplg",
      "6jY5b7jzypE",
      "FksMld5M-Y0",
      "NvF_yioi1yc",
      "VUtz7RxMfng",
      "49YzXJaSl68",
      "yobgQrdclvo",
      "8IPq3hUK0I8",
      "W3dN7LgnRMY",
      "MSAWEBl-A6A",
      "5dfuz_dW7zA",
      "BXnpcMDJ2DE",
      "Nhe6cfS9FVQ",
      "7ihe5BBeYzo",
      "zFRG7lfTNdI",
      "GGSGsmZ4gFo",
      "bRzd08DgFwo",
      "eK25VXTTBrQ",
      "J8I6yfpfGPY",
    ],
  },

  {
    id: "player",
    slug: "player",
    img: "/img/series/player.jpg",
    titulo: "Player (2025)",
    genero: "Comedia/Romance",
    sinopsis:
      "Pun, diseñadora estafada por Phetai, se acerca a su hermana Ploy para recuperar su dinero. En este juego de seducción, ¿quién es presa y quién tigre?",
    playlist: "PLV0UxBZPooaqXplt6aQvidPABZb5FP-dd",
  },

  {
    id: "kissofyesterday",
    slug: "kiss-of-yesterday",
    img: "/img/series/kiss-of-yesterday-the-series.jpg",
    titulo: "Kiss of Yesterday (2025)",
    genero: "Romance",
    sinopsis:
      "Miniserie web tailandesa GL sobre romances, reencuentros, decisiones del destino y segundas oportunidades en el amor.",
    videos: ["UpPiWO1GZUI"],
  },

  {
    id: "dearyou",
    slug: "dear-you",
    img: "/img/series/Dear-You-(2025).jpg",
    titulo: "Dear You (2025)",
    genero: "Romance",
    sinopsis: "",
    videos: ["h5BNEgM3ucE"],
  },

  {
    id: "whalestorexoxo",
    slug: "whale-store-xoxo",
    img: "/img/series/whale-store-xoxo.jpg",
    titulo: "Whale Store xoxo (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "Tras perder a su padre y su empleo, Wan dirige la tienda familiar. Maewnam la ayuda y surge amor, pero su familia planea un centro comercial que amenaza.",
    playlist: "PLszepnkojZI4qpSumzOHRdNa79JRiC-cE",
  },

  {
    id: "yourapple",
    slug: "your-apple",
    img: "/img/series/(Your)-Apple-(2025).jpg",
    titulo: "(Your) Apple (2025)",
    genero: "Romance",
    sinopsis:
      "Un año después, con Karn cada vez más famosa, Kris y Karn deberán enfrentar los desafíos que amenazan su amor.",
    playlist: "PL-3lmw1GIQMlo0R7hc1_KaF2fzpOLyLeH",
  },

  {
    id: "reversewithme",
    slug: "reverse-with-me",
    img: "/img/series/Reverse-with-Me-1.jpg",
    titulo: "Reverse with Me (2025)",
    genero: "Romance/Fantasia",
    sinopsis:
      "Kliaokhluen busca a quien la salvó de morir siete años atrás con poderes del tiempo. Es Karan, cirujana distante, y su destino desata un amor desafiante.",
    playlist: "PLnN7O-RXuCgq6DEZyJK2JZcqyU8l5n-UQ",
  },

  {
    id: "adrenaline",
    slug: "adrenaline",
    img: "/img/series/Adrenaline-The-Rhythm-of-Love-(2025).jpg",
    titulo: "Adrenaline (2025)",
    genero: "Romance",
    sinopsis:
      "Cuando «Pim» tiene que demostrar su valía En medio de la presión de «May», que es a la vez talentosa y feroz… ¿A dónde te llevarán el amor y los desafíos?",
    videos: ["BELKthPt9Lw", "Hh62UYr8MnA", "M4bNzUDqV4g", "oYwbHQj7OcA"],
  },

  {
    id: "mystarmysky",
    slug: "my-star-my-sky",
    img: "/img/series/My-Star-My-Sky-(2025).jpg",
    titulo: "My Star, My Sky (2025)",
    genero: "Romance",
    sinopsis:
      "Un romance dulce y desgarrador entre Byul, una estrella top, y Haneul, quien por accidente termina siendo su manager.",
    videos: ["PVvg7w9MxCY"],
  },

  {
    id: "musicstorylosingcontrol",
    slug: "music-story-losing-control",
    img: "/img/series/Music-Story-Losing-Control.jpg",
    titulo: "Music Story: Losing Control (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "La relación de tres mujeres, Queen, Sea y Bam explora emociones muy intensas tras un vínculo nacido del engaño, dependencia y consecuencias inesperadas.",
    playlist: "PLZqIjfvyGXxZGx16rrQepH12AUCsVajKr",
  },

  {
    id: "LLLproject",
    slug: "lll-project",
    img: "/img/series/L-L-L-Project.jpg",
    titulo: "L.L.L. Project (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "Tres amigas abren un bar y enfrentan amores complejos: amor a primera vista, distancia y segundas oportunidades tras una ruptura.",
    videos: ["T5wR1FPpF9U"],
  },

  {
    id: "mylittlemiss",
    slug: "my-little-miss",
    img: "/img/series/My Little Miss (2025).jpg",
    titulo: "My Little Miss (2025)",
    genero: "Romance",
    sinopsis: "",
    videos: ["p2DwTvGnrX4"],
  },

  {
    id: "asyouwishlovelovereset",
    slug: "as-you-wish-love-love-reset",
    img: "/img/series/As-You-Wish-Love-Love-Reset.jpg",
    titulo: "As You Wish Love: Love Reset (2025)",
    genero: "Comedia/Romance",
    sinopsis:
      "Yah filma contenido en el restaurante de su novia Noey, pero mezclar amor y trabajo podría poner su relación al límite.",
    videos: ["-eS5sv47758", "qmGdvGqFfj4", "wU_Zm3LWfZo", "LlzOCzTN_-Q"],
  },

  {
    id: "poisonouslove",
    slug: "poisonous-love",
    img: "/img/series/Poisonous-Love.jpg",
    titulo: "Poisonous Love (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "La cardióloga Prem ve su boda arruinada por Pat, quien se enamora al instante al descubrir que la besó en su despedida de soltera y decide conquistarla.",
    videos: [
      "6CO8mBhPrv8",
      "KnMe5r5r1DM",
      "CmRm5das-do",
      "HlyNmQU8L9w",
      "xvPWUXs-eWA",
      "oD_sCPIoP1E",
      "zU6qQDnqpjw",
      "FslFhlODvNU",
      "VXGCQOBXreg",
      "lU2Ayva-ioo",
      "tFLaCFsPysQ",
      "or1NcEY6Kl8",
      "J0OmObcPNNU",
      "Gggo_q3HevI",
      "w6ABSXVZGYk",
      "Kyk0mX-QsfE",
      "f-uNmFT4KLE",
      "Q_Dg-JOKrsg",
      "6OZjEXdNGqs",
      "a0Ehztjw36c",
      "o5boBHiHyq8",
      "i69SK_gia5o",
      "M5_GKd2crPM",
      "tFLvYGpmXvY",
      "mXMW0n2b6u4",
      "BsJNl_fVrK0",
      "Hbi2DhaxEX8",
      "rV4rSKK-tgk",
      "Ec8UqcTVF2g",
      "3DNFKYC2Fqo",
      "T-aBT0EpKNs",
      "nJppHp3A-AI",
      "w5e4bINecEQ",
      "_O9yKZVjG_I",
      "ARGCVqqvDLU",
      "OSqu8u3IpPE",
      "NEKiob8N2js",
      "deS90rKDeec",
      "mEcyM9ylo68",
      "nmeP3QY3aBg",
      "pDZuBYVOoPk",
      "-ZHQMKFuTxA",
      "i4pLk0jE3D0",
      "ma9kLHAOGlY",
      "gMk8FeC5nhE",
    ],
  },

  {
    id: "nowitsmyturn",
    slug: "now-its-my-turn",
    img: "/img/series/Now-Its-My-Turn-(2025).jpg",
    titulo: "Now It’s My Turn (2025)",
    genero: "Romance",
    sinopsis:
      "Tras años persiguiendo a Napdao, Fight se aleja. Ahora Napdao deberá luchar por el amor que dejó escapar.",
    videos: [
      "pWwxYRwbam4",
      "roRLUrIQg-M",
      "vca8bsRAP5U",
      "viOHG1A9YQ4",
      "kKHmnOZ0PSU",
      "1d9vbVTYyy0",
      "T_HtS6Pzao4",
      "lFN46JsAy_4",
      "7guLR-_MG1w",
      "7IR05IPNF2s",
    ],
  },

  {
    id: "somewheresomehow",
    slug: "somewhere-somehow",
    img: "/img/series/Somewhere-Somehow.jpg",
    titulo: "Somewhere Somehow (2025)",
    genero: "Comedia/Romance",
    sinopsis:
      "Kee, ingeniera reservada, y Peem, rica y traviesa, se enamoran en secreto en la preparatoria. Siete años después, se reencuentran como jefa y empleada.",
    playlist: "PL4D0KlUVq4Ix1AF1_vliipbSFOvvGUNWO",
  },

  {
    id: "catchcatcrush",
    slug: "catch-cat-crush",
    img: "/img/series/Catch-Cat-Crush.jpg",
    titulo: "Catch Cat Crush (2025)",
    genero: "Comedia/Romance",
    sinopsis:
      "Smay vuelve a su antigua casa y se reencuentra con Thian, su vecina distante; entre secretos y amor, deberán enfrentar su pasado y sus sentimientos.",
    playlist: "PLhsCXKbbbsR2TwTdHRsoliZmpV_eRiFS_",
  },

  {
    id: "harmonysecret",
    slug: "harmony-secret",
    img: "/img/series/harmony-secret.jpg",
    titulo: "Harmony Secret (2025)",
    genero: "Comedia/Romance",
    sinopsis:
      "Dos herederas, una hotelera y otra comercial, compiten por una licitación Duty-Free… pero entre ellas nace una atracción inesperada.",
    playlist: "PLpRvR46QQniulz-JYJziV6GsmAE0TryaC",
  },

  {
    id: "missionloveorlies",
    slug: "mission-love-or-lies",
    img: "/img/series/Mission-Love-or-Lies (1).jpg",
    titulo: "Mission: Love or Lies (2025)",
    genero: "Acción/Comedia",
    sinopsis:
      "Una capitana debe proteger a la hija de un poderoso político tras un atentado, pero la misión destapa mentiras, secretos… y un amor inesperado.",
    playlist: "PLoNn-GA9nEjblnH30YZDRuEfBAXgCyS5g",
  },

  {
    id: "hateyouloveyou",
    slug: "hate-you-love-you",
    img: "/img/series/hate-you-love-you-gl.jpg",
    titulo: "Hate You Love You (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "Dos mujeres viven una relación compleja donde el amor se entrelaza con el odio y la rivalidad, en un drama de emociones intensas.",
    videos: ["j7-niX50iSE"],
  },

  {
    id: "firstlove",
    slug: "first-love",
    img: "/img/series/First-Love-(2025).jpg",
    titulo: "First Love (2025)",
    genero: "Romance",
    sinopsis:
      "Un romance universitario entre un introvertido y un extrovertido que, al ser emparejados en clase para un proyecto, descubren algo más.",
    videos: ["TqbDzaW-JLU"],
  },

  {
    id: "on&off",
    slug: "on-&-off",
    img: "/img/series/ON-OFF.jpg",
    titulo: "On & Off (2025)",
    genero: "Drama/Romance ",
    sinopsis:
      "Dos amantes ocultan su relación en la oficina; entre presiones sociales y jerarquías, su amor lucha por sobrevivir.",
    videos: ["h9u5l8ZtHgg"],
  },

  {
    id: "unlimitedlove",
    slug: "un-limited-love",
    img: "/img/series/Unlimited-Love-The-Series.jpg",
    titulo: "Unlimited Love (2025)",
    genero: "Comedia/Romance",
    sinopsis:
      "Plu es despedida tras enfrentar a un jefe acosador. Con Ray funda una empresa de trabajos varios, donde el caos se vuelve hogar y nace el amor.",
    playlist: "PLpRvR46QQnisdrPR51W51EBmMzkIxK0ZS",
  },

  {
    id: "lovehouse",
    slug: "love-house",
    img: "/img/series/Love-House-(2025).jpg",
    titulo: "Love House (2025)",
    genero: "Romance",
    sinopsis:
      "Yuna se muda con tres mujeres; entre vínculos y deseo, su historia de amor comienza… ¿con quién terminará?",
    videos: ["sbhXozoCQA4"],
  },

  {
    id: "heartrule",
    slug: "heart-rule",
    img: "/img/series/Heart-Rule-(2025).jpg",
    titulo: "Heart Rule (2025)",
    genero: "Romance",
    sinopsis:
      "Napdao, hija de Khun Phop, es protegida por la guardaespaldas Chris; juntas surgen sentimientos, pero la llegada de Nicha complica todo.",
    videos: ["DjVH0w_CtzA"],
  },

  {
    id: "timelesslove",
    slug: "timeless-love",
    img: "/img/series/Timeless-love.jpg",
    titulo: "Timeless Love (2025)",
    genero: "Romance",
    sinopsis:
      "Silvia, una modelo distante, se reencuentra con Chanya, fotógrafa de su pasado. Una sesión revive la cercanía y despierta sentimientos inevitables.",
    videos: [
      "os5QYYtJ0z0",
      "1DQLhVlUlRw",
      "6GTuvTsJ9F0",
      "pWGf2dE_SdU",
      "6Mvvz_Irol0",
      "nFTlDsnjeuA",
    ],
  },

  {
    id: "sassyseason",
    slug: "sassy-season",
    img: "/img/series/Sassy-Season-(2025).jpg",
    titulo: "Sassy Season (2025)",
    genero: "Romance",
    sinopsis:
      "Cin vuelve al resort familiar y choca con Green, el gerente. Entre roces y trabajo, empiezan a entenderse y acercarse.",
    playlist: "PLhsCXKbbbsR2Y6WIwnERaKB3EK6ghpGtX",
  },

  {
    id: "kissthehater",
    slug: "kiss-the-hater",
    img: "/img/series/kiss-the-hater.jpg",
    titulo: "Kiss the Hater (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "Dos universitarias con personalidades y límites diferentes intentan arreglárselas viviendo juntas.",
    videos: ["a7l1aY1jldQ"],
  },

  {
    id: "tasteofher",
    slug: "taste-of-her",
    img: "/img/series/Taste-of-Her-(2025).jpg",
    titulo: "Taste of Her (2025)",
    genero: "Romance/Thriller",
    sinopsis:
      "Una antigua profecía une a un humano recién llegado a los veinte años y a un vampiro. ¿Podrá el amor desafiar su destino?",
    videos: ["BPRDPOeUU48"],
  },

  {
    id: "isthislove?",
    slug: "is-this-love?",
    img: "/img/series/is-this-love.jpg",
    titulo: "Is This Love? (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "Mint y Sian descubren que el amor no tiene barreras: cuando dos corazones se aman, siempre encuentran su camino juntas.",
    playlist: "PLY1myBF61GHJUwkNFfzvcxGb9er7XkTpP",
  },

  {
    id: "dangerousqueen",
    slug: "dangerous-queen",
    img: "/img/series/Dangerous-Queen.jpg",
    titulo: "Dangerous Queen (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "Bonita trabaja para saldar las deudas de su madre y termina con Queen, quien la marcó desde niña. Lo profesional se vuelve personal entre mundos opuestos.",
    playlist: "PL7f8J6cuHYT7fa0sR-tV588KY7MoVzUqs",
  },

  {
    id: "icebreakheartmelt",
    slug: "icebreak-heartmelt",
    img: "/img/series/Ice-Break-Heart-Melt.jpg",
    titulo: "Ice Break, Heart Melt (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "Neve, patinadora fría, y Ivy, heredera astuta, fingen un romance; lo que empieza como negocio se convierte en risas, sinceridad y amor real.",
    playlist: "PLhsCXKbbbsR20QAUI45hxtWnA4z1fDR4H",
  },

  {
    id: "theend",
    slug: "the-end",
    img: "/img/series/The-End.jpg",
    titulo: "The End (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "Sherene, una florista enamorada de su novia Sol, sueña con casarse, pero su comportamiento sospechoso amenaza con destruir su relación.",
    videos: ["zfENHOROMQM"],
  },

  {
    id: "ustheseries",
    slug: "us-the-series",
    img: "/img/series/us.jpg",
    titulo: "Us: The Series (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "Dokrak se enamora de Pam en una cafetería, pero su hermano también la ama y le pide ayuda para conquistarla, obligándola a ocultar su dolor.",
    playlist: "PLszepnkojZI7mOWtISfvxWVPikIM6yiXE",
  },

  {
    id: "teachmesoftly",
    slug: "teach-me-softly",
    img: "/img/series/Teach-Me-Softly-(2025).jpg",
    titulo: "Teach Me Softly (2025)",
    genero: "Romance",
    sinopsis:
      "Ida, una chica traviesa con dificultades en tailandés, toma clases con Taam, una misteriosa tutora. Entre secretos y choques, nace algo inesperado.",
    playlist: "PLhsCXKbbbsR2UrfvoYFNofUFensowIhs1",
  },

  {
    id: "untilonceagain",
    slug: "until-once-again",
    img: "/img/series/Until-Once-Again.jpg",
    titulo: "Until Once Again (2025)",
    genero: "Drama",
    sinopsis:
      "Tras discutir, Peach y Miuu quedan atrapadas en un día que se repite en un resort. Para escapar, deberán enfrentar sentimientos que nunca se atrevieron a decir.",
    playlist: "PLhsCXKbbbsR3sbTyqkRB_OUWXC0mH8KDU",
  },

  {
    id: "hiddenhalf",
    slug: "hidden-half",
    img: "/img/series/Hidden-Half-(2025).jpg",
    titulo: "Hidden Half (2025)",
    genero: "Romance",
    sinopsis:
      "La historia sigue la relación entre Frame y Prim, un amor del pasado marcado por secretos que podrían cambiarlo todo.",
    videos: ["NaMx2n30Ncs"],
  },

  {
    id: "thegirlwhomeow",
    slug: "the-girl-who-meow",
    img: "/img/series/The-Girl-Who-Meow.jpg",
    titulo: "The Girl Who Meow (2025)",
    genero: "Romance",
    sinopsis:
      "Rain, dueña de un café, conoce a Punpang, una joven alegre que despierta su corazón. Pero el regreso de un amor del pasado pone a prueba sus sentimientos.",
    videos: [
      "qzUCdF4HW4I",
      "uFT4bmRhdew",
      "OvCiGF_m4Hs",
      "510sAMFXVyc",
      "ON7YjSs1Kpk",
      "3OytYyXfG2M",
    ],
  },

  {
    id: "lovereturns",
    img: "/img/series/Love-Returns-(2025).jpg",
    titulo: "Love Returns (2025)",
    genero: "Romance/Drama",
    sinopsis:
      "La Dra. Por ama sinceramente a Fong y la ayuda a sanar tras una dolorosa ruptura. Pero cuando la ex de Fong reaparece, sus sentimientos vuelven a confundirse.",
    videos: ["iuCCF1Wd4XY"],
  },

  {
    id: "theotherme2025",
    img: "/img/series/The-Other-Me-(2025).jpg",
    titulo: "The Other Me (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "En un café, dos mujeres ocultan secretos. Entre miradas y charlas nace una conexión peligrosa que podría cambiarlo todo para siempre.",
    videos: ["_QN1qiUYvXY"],
  },

  {
    id: "trunkgirl",
    img: "/img/series/trunk girl.jpg",
    titulo: "Trunk Girl (2025)",
    genero: "Drama/Romance",
    sinopsis: "Una joven huye de casa y se va a quedar a casa de su amiga.",
    videos: ["fDGThnho-Bk"],
  },

  {
    id: "thiWaRaTri",
    img: "/img/series/Thi-Wa-Ra-Tri.jpg",
    titulo: "ThiWaRaTri (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "Una joven cae en magia negra cuando su novio la usa para dañarla. Su vida se desmorona y busca ayuda en una curandera.",
    videos: ["hJG8y12Q70A"],
  },

  {
    id: "hiddenheat",
    img: "/img/series/Hidden-Heat-(2025).jpg",
    titulo: "Hidden Heat (2025)",
    genero: "Romance",
    sinopsis:
      "Frame, gerente estricta, y Gale, nueva asistente, reencuentran su pasado tras un malentendido. Entre trabajo y tensión, surge un amor inesperado.",
    videos: ["ErY515fLGh8"],
  },

  {
    id: "absolutelove",
    img: "/img/series/Absolute-Love-(2025).jpg",
    titulo: "Absolute Love (2025)",
    genero: "Drama/Romance",
    sinopsis: "",
    videos: ["NrZVtsIQnIU"],
  },

  {
    id: "deardiary",
    img: "/img/series/Dear-Diary(2025).jpg",
    titulo: "Dear Diary (2025)",
    genero: "Romance",
    sinopsis:
      "Mai se enamora de su compañera de universidad, Mean. Tras graduarse, deberán superar obstáculos familiares, laborales y la distancia.",
    videos: ["BE7TQGpQMCE"],
  },

  {
    id: "killerheart",
    img: "/img/series/Killer-Heart-(2025).jpg",
    titulo: "Killer Heart (2025)",
    genero: "Romance",
    sinopsis:
      "Tras el asesinato de sus padres, Surprise es secuestrada por un hombre que recibe la orden de matarla, desencadenando un peligroso vínculo.",
    videos: ["qLojsGI26CQ"],
  },

  {
    id: "closeup",
    img: "/img/series/Close Up (2025).jpg",
    titulo: "Close Up (2025)",
    genero: "Romance/Drama",
    sinopsis:
      "Una fotógrafa y una modelo inician una relación sin compromisos, pero los sentimientos y un misterioso tercero complican el acuerdo.",
    videos: ["R7WwZc7nNWk"],
  },

  {
    id: "howtohatemyex",
    img: "/img/series/How-to-Hate-My-Ex-(2025).jpg",
    titulo: "How to Hate My Ex (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "Key y Namkhing, antiguos amantes, se reencuentran en un viaje. Entre recuerdos y sentimientos intactos, deberán decir lo que nunca pudieron.",
    videos: [
      "vLcTMrKyO9c",
      "xS4n0gAzCp4",
      "IDE5S3lXBms",
      "fOWLR-typkA",
      "G9jWg8r5EjQ",
      "vb7ZrHkQ_oQ",
      "kChRAexDHPw",
    ],
  },

  {
    id: "resettoremember",
    img: "/img/series/Reset-To-Remember.jpg",
    titulo: "Reset To Remember (2025)",
    genero: "Romance",
    sinopsis:
      "Pure encuentra a una joven sin recuerdos y la llama MaMa. Mientras crece el amor entre ellas, el regreso de la memoria lo cambia todo.",
    videos: [
      "r0pfpkO7gCc",
      "4cCsOLCMUsQ",
      "m132oT1cu5s",
      "NwQC7crweIc",
      "XoJWn9oImLc",
      "5zCqeDINHFg",
      "5ayBjKlo9d0",
    ],
  },

  {
    id: "lovemoment",
    img: "/img/series/Love-Moment-(2025).jpg",
    titulo: "Love Moment (2025)",
    genero: "Life",
    sinopsis:
      "Love Moment: reality tailandés donde 8 mujeres conviven, crean lazos y buscan juntas el verdadero significado del amor.",
    videos: [
      "EtHsnisWnDo",
      "4B-wAVjarmQ",
      "QOxCU_AR-uA",
      "1dYfLnRwMbM",
      "-0lsT0HNwi0",
      "3pGQt9JLaGE",
      "rS8xFTLJ2-w",
      "S954ACHHSTA",
    ],
  },

  {
    id: "rollercoaster",
    img: "/img/series/Roller-Coaster-(2025).jpg",
    titulo: "Roller Coaster (2025)",
    genero: "Drama/Romance",
    sinopsis:
      "Pure queda destrozada cuando Air se casa por presión familiar, hasta que Loft despierta nuevas emociones y un triángulo amoroso.",
    videos: [
      "aw6l3ABHWyk",
      "kEcYfyLpumU",
      "MdlGlXHhLoM",
      "jn1SLRZU_90",
      "o5tOTgOeTFQ",
      "TAuqJ81Uwyc",
      "ql3OxyvrawI",
      "mVdfk3a5J4A",
      "TebOqmajJw4",
      "e4kL_DQWvJA",
      "f9zpz89nJYY",
      "P9p4YEOWLYw",
      "CbqtSWH3ck8",
      "l8YjcZyjZyk",
      "Md9CNgpFC0A",
      "l6ctRPszeBY",
      "cn3J82CP_VU",
      "pxBD_85rYDg",
      "BsJeTf9FCBE",
      "_jUGdjn_lFo",
      "t9Pa0CEOK3g",
      "-i1jjEfQIIs",
      "KIkZUznrAOc",
      "6XX2xqCo4Ps",
      "y1xQKS3_WOw",
      "oemc-nh6RWg",
      "OydiDn9zzBw",
      "nelUpeQ1Rr4",
      "F9olJqbjbnQ",
      "9ljh96Jfw-8",
      "fkgUkYvPnfU",
      "LHQB3x37MKs",
    ],
  },

  {
    id: "bunnybunny",
    img: "/img/series/Bunny-Bunny.jpg",
    titulo: "Bunny Bunny (2025)",
    genero: "Drama/Romance",
    sinopsis: "",
    videos: ["VnnRSP4RsiI"],
  },

  {
    id: "On&offseason2",
    img: "/img/series/on-n-off-2.jpg",
    titulo: "On & Off Season 2 (2025)",
    genero: "Romance",
    sinopsis:
      "Dos amantes ocultan su relación en la oficina. Entre jerarquías y normas conservadoras, deberán elegir entre el amor y las apariencias.",
    videos: ["EKgy5EM-Vhw"],
  },

  {
    id: "firstoffice",
    img: "/img/series/first-office.jpg",
    titulo: "First Office (2025)",
    genero: "Romance",
    sinopsis: "",
    videos: ["xqmPqqIOLNY"],
  },

  {
    id: "mydearghost",
    img: "/img/series/My-Dear-Ghost.jpg",
    titulo: "My Dear Ghost (2025)",
    genero: "Romance",
    sinopsis:
      "Sky, una escritora, consigue una casa barata cerca del trabajo, sin saber que oculta un secreto oscuro guardado durante 20 años.",
    videos: ["bq97pXTH7qo"],
  },

  {
    id: "fromliarintolover",
    img: "/img/series/From-Liar-into-Lover-(2025).jpg",
    titulo: "From Liar into Lover (2025)",
    genero: "Romance",
    sinopsis:
      "Nuevo, gerente seria, debe trabajar con BB, creativa rebelde y hija del dueño en secreto. Entre choques y secretos, nacen sentimientos.",
    playlist: "PLhsCXKbbbsR3EbFTQl9zefYZXpeyLXf9X",
  },

  {
    id: "whoknowsgirlsl",
    img: "/img/series/Who-Knows-Girls-L-(2025).jpg",
    titulo: "Who Knows Girls' L (2025)",
    genero: "Romance",
    sinopsis:
      "Dos mujeres se conocen en un evento y surge la chispa, pero todo cambia al descubrir que trabajan juntas. Entre deseo y límites, el amor se complica.",
    playlist: "PL1TNeoXRrjlnh0N_Q-8b9bI2wHqjHw5Ek",
  },

  {
    id: "youremygift (2025)",
    img: "/img/series/You-re-My-Gift-(2025).jpg",
    titulo: "You're My Gift (2025)",
    genero: "Romance",
    sinopsis: "",
    videos: ["ctx5JOLe7Bc"],
  },

  {
    id: "blank",
    img: "/img/series/blank.jpg",
    titulo: "Blank (2024)",
    genero: "Drama/Romance",
    sinopsis:
      "Khun Nueng, una mujer estricta, y Anueng, una joven vivaz, viven un romance intenso pese a su diferencia de edad y las presiones sociales.",
    videos: [
      "iZ0uHlR7muw",
      "aChzAFvB1Gs",
      "uU6gcRP1dFc",
      "ZZo66pQGiQI",
      "J7I8ZQXAYOY",
      "41b0bMIFLIA",
      "qfLW3tdJgRY",
      "12x5n3BfdSo",
      "7wnBk5-GZS0",
      "HEjlcS3HFV0",
      "FIIRXFruDos",
      "hSakLlUHGbA",
      "Kze2yt46bQA",
      "TlEjxi0WgkM",
      "p3bew2RcGRU",
      "QOCDz8SFrcY",
      "cCQO_BDfYnc",
      "HGhTploF2Fc",
      "juVPVILjYrM",
      "J0MVNB9Q8Mc",
      "LuAXjW7e4WY",
      "SkuUy4zuvuU",
      "Ab02RSLvlvY",
      "j28QK9riSNc",
      "I1YwnCtCp3Q",
    ],
  },

  {
    id: "affair",
    img: "/img/series/affair.jpg",
    titulo: "Affair (2024)",
    genero: "Drama/Romance",
    sinopsis:
      "Phleng y Wan crecen como amigas, pero al buscarle pareja, Phleng descubre que la ama. Años después, el destino las reúne tras una separación.",
    videos: [
      "EMxZVIaYktU",
      "wXgvQXQFrzU",
      "ipHEO5NMfnQ",
      "uiZLo9H2LRQ",
      "jdR8A-nT8p0",
      "_pF0Yq3JqE0",
      "ah76xoFyKCk",
      "gycUFA8T9KI",
      "TrmSJpwKMjw",
      "qwILqOqWqWM",
      "36YD0ty6EQs",
      "AnE4Aep0sxs",
      "8zwfqnlOiIY",
      "DfcEpOPdQ0w",
      "SpM0cQ-Ppb0",
      "xAbTpBNgMqo",
      "Qm6A9LW1Skw",
      "dgh_ZkPQJ-I",
      "cJjWKDtbnA4",
      "zeJkTY_RLe4",
      "Et8sCxklFOU",
      "NbLXLgvx_CU",
      "0UW9FXs4m0w",
      "XoqlkYfGsF0",
      "aa8R60Jq1VY",
      "cm4ax9KgxD4",
      "ooP_wTBsV4o",
      "7VQUluMqNNs",
      "l58s8n_I9V4",
      "wlaIC0lY2sw",
      "zibXxnD4HhU",
      "szlL9N4UpCU",
    ],
  },

  {
    id: "pluto",
    img: "/img/series/pluto-the-series.jpg",
    titulo: "Pluto (2024)",
    genero: "Drama/Romance",
    sinopsis:
      "Ai-oon suplanta a su gemela en coma para romper con May, pero al conocerla y descubrir que es ciega, termina enamorándose.",
    playlist: "PL_TZVYzKgZYQ-w9LCwO1F0P4dy8NyCPPh",
  },

  {
    id: "findloveinhermind",
    img: "/img/series/Find-love-in-her-mind.jpg",
    titulo: "Find Love In Her Mind (2024)",
    genero: "Romance/Sobrenatural",
    sinopsis:
      "Jane, escritora que tras comer una galleta misteriosa puede leer la mente de su vecina Kate, creando una conexión profunda.",
    playlist: "PLhsCXKbbbsR0gu-_8MKwwvlaH-Iaitiu5",
  },

  {
    id: "heartbreaktohappiness",
    img: "/img/series/Heartbreak-to-Happiness-(2024).jpg",
    titulo: "Heartbreak to Happiness (2024)",
    genero: "Drama/Romance",
    sinopsis:
      "Para seguir adelante, Haru crea una lista de diez metas. Junto a Hom, su casero, redescubre sueños y quizás también el amor.",
    playlist: "PLhsCXKbbbsR0TWMJ2yS5pUETzkap7EzhE",
  },

  {
    id: "1440minutes",
    img: "/img/series/1440-Minutes.jpg",
    titulo: "1440 Minutes (2024)",
    genero: "Drama/Romance",
    sinopsis: "",
    videos: ["UHfgmfD64Zg", "THNlUQ4NIPU", "0fDLWSvnY1g", "91BCOXKz4W8"],
  },

  {
    id: "thesevenwishes",
    img: "/img/series/The-Seven-Wishes (2024).jpg",
    titulo: "The Seven Wishes (2024)",
    genero: "Romance",
    sinopsis:
      "Tras perder a su madre, Rada encuentra consuelo en la doctora Ice. Entre siete deseos y el duelo, nace un inesperado amor.",
    videos: ["7wzmfMxTwBU"],
  },

  {
    id: "sameplace,newpace",
    img: "/img/series/same-place-new-pace.jpg",
    titulo: "Same Place, New Pace (2024)",
    genero: "Romance",
    sinopsis:
      "Amy vuelve a su casa de infancia en busca de objetos de su madre y cruza caminos con Pugan, una artista reservada, en su búsqueda de felicidad.",
    playlist: "PLhsCXKbbbsR1CkiBe2rwilMZubMc8i6Bk",
  },

  {
    id: "staywithme",
    img: "/img/series/Stay-with-Me.jpg",
    titulo: "Stay with Me (2024)",
    genero: "Romance",
    sinopsis: "",
    videos: [
      "Tz033pXIo0o",
      "8aF3UtjKerY",
      "m3oFZxtseg8",
      "D6GRFX-33yY",
      "8OMNrPy2Z10",
      "BN4FokL_SSA",
      "W6_FiLiX1S8",
      "XOKDUBnJa9E",
      "jB2cjwBX_3Y",
      "zBjrqdnCDSM",
      "kF9qE1cTdQA",
      "eKvGWO2bQQI",
      "q7HnEtHkK0o",
      "mdPNNbfWgc0",
      "c2VCk66_e8Q",
      "5AsqguZXcBo",
    ],
  },

  {
    id: "feartofreedom",
    img: "/img/series/Fear_to_Freedom (2024).jpg",
    titulo: "Fear to Freedom (2024)",
    genero: "Romance",
    sinopsis:
      "Feem y Fangkao compiten por un proyecto rural. Entre conflictos, miedos ocultos y apoyo mutuo, descubren el amor y la libertad.",
    videos: [
      "pNEGgvXohiY",
      "F5XKA6eY80w",
      "idIXgXgXrgE",
      "U3U6R7hH4Hs",
      "fbSfE4tWnMI",
      "D-dqtAd7Ubc",
      "V3Yppvwi8U8",
      "AqVJL1OSUfo",
    ],
  },

  {
    id: "thesecretofus",
    img: "/img/series/The_Secret_of_Us_(2024).jpg",
    titulo: "The Secret of Us (2024)",
    genero: "Drama/Romance",
    sinopsis:
      "La doctora Lada, marcada por un viejo amor, deberá reencontrarse con su ex Earn cuando ella se convierta en portavoz del hospital.",
    videos: [
      "bgLSvDzl0HA",
      "4fhWN0lO0_Y",
      "q1-bagGmHsQ",
      "h28JZXFklVE",
      "o_dcLc0ITnA",
      "VbmStSZ25dI",
      "2JeOu2F_gXw",
      "JxA19ZJ5FUA",
      "s4nxa9V-xf4",
      "rlF3DYAph2E",
      "iG789WimfAY",
      "naCbpeK1DsQ",
      "lZaRR1LWNz0",
      "bHXN3b7C8lc",
      "hU7BKJBdGuQ",
      "uphgbtnRxaI",
      "MKbpVQ4kN7o",
      "7FVuDuM66iU",
    ],
  },

  {
    id: "friendwithbenefits",
    img: "/img/series/Friend-with-Benefits-(2024).jpg",
    titulo: "Friend with Benefits (2024)",
    genero: "Romance",
    sinopsis:
      "Vicky, tras una ruptura, conoce a la cantante Nune en una noche de fiesta. Entre dudas y sentimientos del pasado, surge una conexión inesperada.",
    videos: ["pTacCic-1qQ"],
  },

  {
    id: "lovefromanotherstar",
    img: "/img/series/Love-from-Another-Star-(2025).jpg",
    titulo: "Love from Another Star (2025)",
    genero: "Romance",
    sinopsis:
      "Una alienígena de Venus llega a la Tierra y conoce a Rada. Para volver, debe llenar su tubo de felicidad. ¿Podrán enamorarse?",
    videos: ["7m8Ynov6Ewk", "KHr7eDjzeJE", "3UH1yOVwX18", "kusucblEaAs"],
  },

  {
    id: "unlockyourlove",
    img: "/img/series/Unlock-Your-Love-02.jpg",
    titulo: "Unlock your love (2024)",
    genero: "Comedia/Romance",
    sinopsis:
      "Rain, marcada por decepciones amorosas, cierra su corazón hasta que Love llega y derriba sus muros, iniciando un romance de sanación emocional.",
    playlist: "PLZqIjfvyGXxYUrbgnQcaOK2TVEKSGgOGI",
  },

  {
    id: "sharehouse",
    img: "/img/series/Share-House.jpg",
    titulo: "Share House (2024)",
    genero: "Romance",
    sinopsis:
      "Vicky y Nune se mudan juntas, pero los problemas pondrán a prueba su relación y su capacidad de seguir adelante.",
    videos: ["39GwEgVGHEo", "GFSoD0wcqeQ", "ifrPVoiYXL4", "g1RE-Saz8y4"],
  },

  {
    id: "loyalpin",
    img: "/img/series/loyal-pin.jpg",
    titulo: "Loyal Pin (2024)",
    genero: "Romance/Historico",
    sinopsis:
      "Lady Pin, recatada y correcta, y la traviesa princesa Anilaphat crecen unidas por el destino, mientras sus sentimientos comienzan a cambiar.",
    playlist: "PL4D0KlUVq4IyqMr7kszWIINegVFFrztUD",
  },

  {
    id: "amongthecloud",
    img: "/img/series/Among-the-cloud.jpg",
    titulo: "Among the cloud (2024)",
    genero: "Drama/Romance",
    sinopsis:
      "Irene hereda tierras de su abuelo y debe vivir en el campo dos meses. Allí conoce a una mujer que cambiará su vida y despertará el amor.",
    playlist: "PLhsCXKbbbsR0XAsVbXiRA9rTmiyi5ealN",
  },

  {
    id: "deepnightsidestorythetwoofus",
    img: "/img/series/Deep-Night-Side-Story-The-Two-of-Us.jpg",
    titulo: "The Two of Us Season 1 (2024)",
    genero: "Drama/Romance",
    sinopsis:
      "Dos mujeres se encuentran de noche y, entre silencios y confesiones, el amor y el deseo florecen en una historia íntima dentro de cuatro paredes.",
    playlist: "PLIh-ltO6DKlUqDdUYdL0EipyhvTThS_AH",
  },

  {
    id: "deepnightsidestorythetwoofus2",
    img: "/img/series/Deep-Night-Side-Story-The-Two-of-Us-Season-2.jpg",
    titulo: "The Two of Us Season 2 (2024)",
    genero: "Drama/Romance",
    sinopsis: "",
    playlist: "PLIh-ltO6DKlXTSdCCoT8t0YFpZqc31VBL",
  },

  {
    id: "mate",
    img: "/img/series/Mate-(2024).jpg",
    titulo: "Mate (2024)",
    genero: "Drama/Romance",
    sinopsis:
      "Kenlong, perfecta y exitosa, ve su mundo tambalear cuando su inocente amiga de infancia Oengoei despierta sentimientos inesperados.",
    videos: [
      "nF7Tqhe6y2Y",
      "bvt2ryIeM_U",
      "s-zbeDyWRvA",
      "pDja4tswuUo",
      "Fnz3OQMiX78",
      "60oM0Ip9xYY",
      "mIF6RtBUHyE",
      "b4k2zFTKs3Q",
      "eJfgHgLC8tc",
      "nbDY8eLuavk",
      "LG9xFATRx50",
      "QtMPvVA5YSQ",
    ],
  },

  {
    id: "apple",
    img: "/img/series/Apple-My-Love.jpg",
    titulo: "Apple (2024)",
    genero: "Romance",
    sinopsis:
      "Después de recuperar la vista, Kris encuentra a Karn, la mujer de sus sueños. Un amor que parecía escrito por el destino.",
    videos: [
      "26CSt6-Rs9I",
      "QqijaGQlxFE",
      "2Hl1v5aacKw",
      "mYRYd50ZMZQ",
      "_cE4Pj42HAY",
      "Ccx4wNfSJ6I",
      "1Whn352J5nM",
      "5I8c-bmgw1Q",
      "bSexhnV9XAE",
      "nB_-IohgVbk",
      "M2WtlyQIaGA",
      "2BMuwEQ7mxs",
      "XuxT0a3abMQ",
      "gIR-wEwAB40",
      "dy8QKK9ShBo",
      "DYRQDlEil1o",
      "EUR5cYRSs6o",
      "gWdmFlMQo7c",
      "alyRVHfjEgc",
      "y9I0v7GUquM",
      "ByigJDW_PPA",
      "UtlTYl2E1GU",
      "7ir9qsoaXcE",
      "s95IZyWinIs",
      "33gHPNTpVlc",
      "VhZhWDsIAqc",
      "sAH7eQcQD4c",
      "4uhgWPcbLpE",
      "TtMolYAgtu4",
    ],
  },

  {
    id: "fateswhispers",
    img: "/img/series/Fate-s-Whispers.jpg",
    titulo: "Fate's Whispers (2024)",
    genero: "Romance",
    sinopsis:
      "Ice, con mala suerte, debe pasar 7 días con su alma gemela Rada, vidente con poderes, para cambiar su destino.",
    videos: ["1JlW5yyUIDA"],
  },

  {
    id: "designyoubesideme",
    img: "/img/series/Design-You-Beside-Me.jpg",
    titulo: "Design You Beside Me (2024)",
    genero: "Romance",
    sinopsis:
      "Prae ayuda a Cher a escapar de un contrato abusivo, y entre apoyo, confianza y amor nace una historia que cambiará sus vida",
    videos: ["701d1TTwuLc"],
  },

  {
    id: "midsummerlove",
    img: "/img/series/Midsummer-Love-(2024).jpg",
    titulo: "Midsummer Love (2024)",
    genero: "Romance",
    sinopsis:
      "Entre oficinas y secretos, Ice, Rada, Nuney y Vicky descubren que el amor en el trabajo puede cambiarlo todo.",
    videos: ["o9qvCcZMZ1A"],
  },

  {
    id: "seayousoon",
    img: "/img/series/Sea-You-Soon.jpg",
    titulo: "Sea You Soon (2024)",
    genero: "Romance",
    sinopsis:
      "Tras una ruptura, Ice viaja sola a Ko Sichang y conoce a Ferin, una joven que despierta sentimientos que creía imposibles.",
    videos: ["Ca4pWQH-EhE"],
  },

  {
    id: "ghostfriendforever",
    img: "/img/series/Ghostfriend-forever.jpg",
    titulo: "GhostFriend Forever (2024)",
    genero: "Romance",
    sinopsis:
      "Day se muda y conoce a Luv, un hermoso fantasma que no sabe que murió. Surge el amor, pero deberán enfrentar lo imposible: ¿pueden amar humano y fantasma?",
    playlist: "PLhsCXKbbbsR2JAnJLlxyRVQYh4WZIit4T",
  },

  {
    id: "deleteyourpast",
    img: "/img/series/Delete-Your-Past.jpg",
    titulo: "Delete Your Past (2024)",
    genero: "Drama/Romance",
    sinopsis:
      "Im, una joven que trabaja desde casa, vive tres romances y acude a una misteriosa clínica. ¿Sanará su dolor o complicará aún más su búsqueda del amor?",
    videos: ["FEDYja9QznM"],
  },

  {
    id: "littlecupid",
    img: "/img/series/Little-Cupid.jpg",
    titulo: "Little Cupid (2024)",
    genero: "Romance/Familia",
    sinopsis:
      "Prem debe cuidar a su traviesa sobrina Proud, y con la ayuda de Rada, enfrenta desafíos diarios mientras forman un vínculo lleno de ternura.",
    playlist: "PLSEF-5TOVlugr4NrM_aw1q_Gqy4vvp11O",
  },

  {
    id: "mywednesday",
    img: "/img/series/My-Wednesday.jpg",
    titulo: "My Wednesday (2024)",
    genero: "Drama/Romance",
    sinopsis:
      "Historias de amor entre mujeres en distintos momentos de sus vidas, explorando emociones, vínculos y conexiones profundas.",
    videos: ["scW8diYeaQ8"],
  },

  {
    id: "melodyofadream",
    img: "/img/series/Melody-of-a-Dream-(2024).jpg",
    titulo: "Melody of a Dream (2024)",
    genero: "Drama/Romance",
    sinopsis:
      "Este drama explora relaciones de pareja, poder, trabajo y secretos que pondrán a prueba a sus protagonistas.",
    videos: ["huduKpVGEhM"],
  },

  {
    id: "redwhisper",
    img: "/img/series/Red-Whisper.jpg",
    titulo: "Red Whisper (2024)",
    genero: "Romance",
    sinopsis:
      "Este drama explora relaciones de pareja, poder, trabajo y secretos que pondrán a prueba a sus protagonistas.",
    videos: ["huduKpVGEhM"],
  },

  {
    id: "myghostlove",
    img: "/img/series/Amor_(fantasmal)_en_la_oficina.jpg",
    titulo: "My (Ghost) Love (2024)",
    genero: "Romance/Sobrenatural",
    sinopsis:
      "Una chica muere y regresa como fantasma; su amor crece con la única que puede verla, entre romance y secretos sobrenaturales.",
    videos: ["JVekL5u78l4"],
  },

  {
    id: "INTPflirting",
    img: "/img/series/INTP-Flirting-(2024).jpg",
    titulo: "INTP Flirting (2024))",
    genero: "Romance",
    sinopsis:
      "La historia de amor entre So Min Jae y Chae Su In, dos universitarias que terminan unidas por un mismo proyecto grupal.",
    videos: ["I2fLHLRAxGI"],
  },

  {
    id: "clubfridayseason16lovebully",
    img: "/img/series/Club-Friday-Season-16-Love-Bully.jpg",
    titulo: "Club Friday Season 16: Love Bully (2024)",
    genero: "Drama/Romance",
    sinopsis:
      "Dos amantes ven su relación expuesta. Una teme el qué dirán; la otra ignora críticas. Su amor se pone a prueba ante toda la nación.",
    videos: [
      "tcgogZ9ilQw",
      "fJRRIzTxl1o",
      "eVSsD3msb2Y",
      "UmvM2TcO_0I",
      "QohXWJziNkg",
      "8UkA_BAYmkQ",
      "3dpecsLWawU",
      "bedCcC0f8-w",
      "z7aNDDnXdOo",
      "UpnXJAiffm0",
      "WMPkvaIM2DE",
      "exhiv378XHk",
      "nXMbjPjerxM",
      "Z6iWsRRAmiU",
      "D-d5kHASRps",
      "RJQtGJEdL98",
    ],
  },

  {
    id: "lonelygirls",
    img: "/img/series/Lonely-Girls-(2024).jpg",
    titulo: "Lonely Girls (2024)",
    genero: "Drama/Romance",
    sinopsis:
      "Nos conocimos en Tinder, pero Ji Eun llenó un vacío en mí. Lo que siento es tan intenso que ya no sé si es solo amistad o algo más.",
    videos: ["86X7eb-P1yM"],
  },

  {
    id: "24hourlove",
    img: "/img/series/24-Hour-Love-(2024).jpg",
    titulo: "24 Hour Love (2024)",
    genero: "Romance",
    sinopsis:
      "Ice, tras una ruptura, contrata a una chica con vibra de novia para viajar 24 horas. Lo que empieza como acuerdo se convierte en un amor inesperado.",
    videos: ["6TUxFLEIrIk"],
  },

  {
    id: "apieceofmemory",
    img: "/img/series/a-piece-of-memory.jpg",
    titulo: "A Piece of Memory (2024)",
    genero: "Romance",
    sinopsis:
      "Un romance que comienza con las consecuencias de un accidente automovilístico protagonizado por Nune,Vicky y Kitty.",
    videos: ["Z5jvMj3-qFU"],
  },

  {
    id: "xiaoxiangyijiu",
    img: "/img/series/Xiao-Xiang-Yi-Jiu-(2024).jpg",
    titulo: "Xiao Xiang Yi Jiu (2024)",
    genero: "Romance/Drama",
    sinopsis:
      "La serie sigue un apasionado romance entre una empleada y su jefa, quienes se reencuentran tras años separadas.",
    videos: ["Hj0lnl73GYU"],
  },

  {
    id: "21dayscloserstep",
    img: "/img/series/21-days-Closer-Step.jpg",
    titulo: "21 days Closer Step (2024)",
    genero: "Romance",
    sinopsis:
      "Un reto de 21 días lo cambia todo: Nune busca enamorar, pero Pie deberá enfrentar a su ex cuando menos lo espera.",
    videos: [
      "z4639RUx0RI",
      "I2i9vkw9lso",
      "3iRzbBYZvsA",
      "QE3Le51nK84",
      "VXP-imBjzMM",
      "hQJ-JmUgFX8",
      "HYE6edBkn0c",
      "dbMVZ36UtaU",
    ],
  },

  {
    id: "mymarvellousdreamisyou (2024)",
    img: "/img/series/My-Marvellous-Dream-Is-You-(2024).jpg",
    titulo: "My Marvellous Dream Is You (2024)",
    genero: "Romance/Fantasy",
    sinopsis:
      "Dawan sueña con Khimhan desde niña. Cuando sus familias se destruyen, ambas descubren un vínculo más profundo que la amistad.",
    videos: [
      "g7F6i0ganRU",
      "703xtr3Qdcs",
      "QbWOQHgfReQ",
      "wQuHlXjggIc",
      "ewKIe3lvr3M",
      "dZ6d141wDSo",
      "JTP5A2h-a_k",
      "KLDzFfH1S40",
      "zVXAFD1OLZg",
      "jtNpZMMrVsw",
      "90RzbAM52Qo",
      "cRzT4Hn2Yz8",
      "8WO8KUKtbTE",
      "yuMafcXL9BE",
      "aDeA2lTul48",
      "Yw2u7zQL6Lc",
      "jkaOEFsUvSo",
      "0MbvMy5TZlg",
      "V9aG1ZG2yKs",
      "0ctp2jRzdWE",
      "Rjt-4cgSNTM",
      "1dxytvxosCc",
      "bT4ZqFY7EU4",
      "UafcTATjwpw",
      "n2V8lDHoUuo",
      "K9NMUVqDD6U",
      "DshGC2CMTSY",
      "AE94mVlorCE",
      "iXrmPAOrKDU",
      "aDf4qdbnyck",
      "JlWXdVWfCJw",
      "RDYJYiDwsj0",
      "Giayhk440Tg",
      "cmrQg0EO1Ds",
      "ikd1tEhXbp8",
      "Mq1KPQKY8SE",
      "fs8eJWwgZZ8",
      "DB_hiWLBKnI",
      "MOfa55NQvvE",
      "Rl2QzSDz2XA",
      "TtuwRn88PkE",
      "d9KcyLT4SAQ",
      "4oyX6CnuonM",
      "o-mtf9HJqFo",
      "DhBQiYUjDDk",
      "d0B5-3_x9DA",
      "Q_sKOKnUBWs",
      "4mI1zWAmlZw",
    ],
  },

  {
    id: "blankseason2",
    img: "/img/series/Blank-Season-2-(2024).jpg",
    titulo: "Blank Season 2 (2024)",
    genero: "Romance/Drama",
    sinopsis:
      "Khun Nueng y Anueng luchan por su amor, enfrentando prejuicios, diferencias de edad y las expectativas de la sociedad.",
    videos: [
      "alzXHDXrjxM",
      "ZoljuE8ikUI",
      "Ci24xxCczJ4",
      "_pgvYXZT5z4",
      "tgaVq4IVDZw",
      "ZUUTKevqgfQ",
      "2GNej3KUtB4",
      "K2iENF3dAlg",
      "2JrAPIZh9Bc",
      "Y98lf5oqdLY",
      "wFxNPPylaS8",
      "YOuHYWcMupA",
      "-qgp-5u6wWw",
      "OPKUuc1pqqE",
      "GimSL7LcQRg",
      "-ZQP_PApo6E",
      "XT1OWwhLsTQ",
      "05fQCnD4dtY",
      "R0mEaTBymmQ",
      "1w-Uhk5Eb7A",
      "VcMB7Uj5uhc",
      "CsCXQo7CEcM",
      "QahwkAYfIpQ",
      "yP1PXZqq-0g",
    ],
  },

  {
    id: "iamdevil",
    img: "/img/series/I-Am-Devil-(2024).jpg",
    titulo: "I Am Devil (2024)",
    genero: "Romance/Drama",
    sinopsis:
      "Moomkanee, una actriz famosa, enfrenta un compromiso sin amor mientras un espía enviado por su madre complica todo..",
    videos: [
      "-dMEdB_9c8g",
      "TVvQTw22_sA",
      "MphZE5dQa0Q",
      "uGSgE_bhKro",
      "4mo7rq28H5Q",
      "OvX15kdDnI4",
      "gcTOoqqP6iY",
      "zZ3k2yKzno4",
      "Hl1VivYj27k",
      "T2PKwEPK-lQ",
      "6hMhXL-h_3Y",
      "GMxEAdrZ5eY",
      "bG0ZHGbN5yc",
      "edlDusH059Q",
      "cqOr71mVTOc",
      "EJFfpsfttp0",
      "1A2I6jt0POw",
      "TO_-lzxBP6w",
      "pYaRmodXtQs",
      "FBz5oGqQiy0",
      "GgBIfVAniRI",
      "_vIYuBXlclA",
      "UUEakJdTq8I",
      "M4KCAcALnFQ",
    ],
  },

  {
    id: "borderlessline",
    img: "/img/series/Borderless-Line.jpg",
    titulo: "Borderless Line (2024)",
    genero: "Comedia/Romance",
    sinopsis:
      "La vida de Gorya cambia cuando Ingdao, hermana de su compañera de piso, se muda con ella. Ingdao está enamorada desde niña, pero teme confesarlo.",
    videos: [
      "zFjNoLBc1Kg",
      "LPt9vE7vMws",
      "053JkhcJYms",
      "FJfjAJFFLbc",
      "ZBf2oUe96sg",
      "EXxYPkfXrOc",
    ],
  },

  {
    id: "mysecrettutor",
    img: "/img/series/My-Secret-Tutor-(2024).jpg",
    titulo: "My Secret Tutor (2024)",
    genero: "Romance",
    sinopsis:
      "Dos jóvenes viven una relación secreta, enfrentando emociones, desafíos y crecimiento personal mientras descubren sus verdaderos sentimientos.",
    videos: ["w1970zkdih0"],
  },

  {
    id: "accidentallyyours",
    img: "/img/series/Accidentally-Yours-(2024).jpg",
    titulo: "Accidentally Yours (2024)",
    genero: "Romance",
    sinopsis:
      "Rada se enamora a primera vista de Ice y hará todo lo posible por conquistar a la enigmática chica de élite.",
    videos: [
      "dW8of8dfT2I",
      "1ajW__x69PM",
      "iAhq1iwrUyo",
      "7kGU0eyr95o",
      "cn2teSvjE20",
      "cYlfuL3nRtI",
    ],
  },

  {
    id: "youarevitaminsinnyroutine",
    img: "/img/series/You-are-vitamins-in-my-routine.jpg",
    titulo: "You Are Vitamins in My Routine (2023)",
    genero: "Drama/Romance",
    sinopsis:
      "P'Pun y N'Ava se reencuentran junto al mar. Entre la calma, su amor renace, fortaleciendo su vínculo en una historia dulce y llena de emociones.",
    playlist: "PLhsCXKbbbsR36jek_rA_ng0zq6pNmT9wE",
  },

  {
    id: "I Still Remember the Feeling",
    img: "/img/series/I-Still-Remember-the-Feeling-(2023).jpg",
    titulo: "I Still Remember the Feeling (2023)",
    genero: "Romance",
    sinopsis:
      "Pleng contrata a Grace, su antigua amiga, para decorar su hogar. El reencuentro revive sentimientos, pero su futuro es incierto.",
    videos: ["nCyv7p2rlc0"],
  },

  {
    id: "antichristmasclub",
    img: "/img/series/Anti-Christmas-Club-(2023).jpg",
    titulo: "Anti Christmas Club (2023)",
    genero: "Romance",
    sinopsis: "",
    videos: ["rF5rZ9-PPfI"],
  },

  {
    id: "rulerbreaker",
    img: "/img/series/Rule-Breaker.jpg",
    titulo: "Rule Breaker (2025)",
    genero: "Romance",
    sinopsis: "",
    videos: ["D2PqEjN_I-w"],
  },

  {
    id: "luckymylove",
    img: "/img/series/Lucky-My-Love.jpg",
    titulo: "Lucky My Love (2023)",
    genero: "Comedia/Romance",
    sinopsis:
      "Napdao busca desesperadamente el amor a través de citas y fortuna. Cuando empieza a fijarse en su jefe, Pheem, aparece Wela, cambiando su perspectiva amorosa.",
    videos: [
      "cJWbJYmKUqY",
      "E51Vlf7J504",
      "peoylPsaokE",
      "WDMVA-r7JLE",
      "UAmxRU7KKdI",
    ],
  },

  {
    id: "lovesenior",
    img: "/img/series/Love-Senior-(2023).jpg",
    titulo: "Love Senior (2023)",
    genero: "Romance/Drama",
    sinopsis:
      "Manaow acepta competir en Freshy tras pedir la firma de Gyoza, una estricta estudiante de ingeniería que cambia por completo sus expectativas.",
    videos: [
      "RDfytqUYp_M",
      "U2H4kq_fwww",
      "ASiKfLdfaVM",
      "2o7Qb3EvP0E",
      "k3uNRUuNrF8",
      "_yJ9EI8DCWI",
      "mWL9bAUTLQ0",
      "vuMnBDcEHHM",
      "VdmwNvHBb78",
      "4h2C_hrCJFM",
      "JaO-T5uYg6o",
      "4UN0EgFGZs0",
      "j94pzng51t8",
      "PiR3o94P2Gg",
      "x8W6jno7DmU",
      "sZMp48vUTaQ",
      "eAR-CSfUkmQ",
      "gdVIsNij52U",
      "nrkF4q4Htg8",
      "E3CeYc6ymOM",
      "P101gKafE8c",
      "QuNKLkoVv7w",
      "uarsGWNkGhA",
      "8WTYhAmTrHo",
      "gJfd2_7EXFc",
      "k2IaWkgsslE",
      "AbcmMfN_4ss",
      "WrTiD461m5E",
      "cuN3ZJ4UuDc",
      "oGgMomhv_0g",
      "udOjbqfCeuI",
      "kTyByW2-2-8",
      "eJemJsQCD2s",
      "2daFQhw2VRI",
      "RuZEy9yYVec",
      "Qw_dLNFtrd8",
      "Cr9GqmTeGsY",
      "9Bn09MOv8Z8",
      "sZxDjyP6_nA",
      "XQNMsgCoccU",
    ],
  },

  {
    id: "welcometothelesbianbar",
    img: "/img/series/Welcome-to-the-Lesbian-Bar-(2023).jpg",
    titulo: "Welcome to the Lesbian Bar (2023)",
    genero: "Romance",
    sinopsis:
      "Siete mujeres queer cruzan sus vidas en un bar lésbico, donde entre encuentros y despedidas comparten historias tan intensas como sus tragos.",
    videos: [
      "OAoYzGjBxuo",
      "W1fIgnkYPqA",
      "15LxHpxE_WI",
      "qit3mA-524M",
      "MDHAwYY-Szg",
    ],
  },

  {
    id: "dontbreakmymission",
    img: "/img/series/Don-t-Break-My-Mission-(2023).jpg",
    titulo: "Dont Break My Mission (2023)",
    genero: "Romance",
    sinopsis: "",
    videos: ["mUk1kSJZmU0", "BBAfysT8vhI", "uI7kyUwN7ig", "2zsiVh52VUA"],
  },

  {
    id: "every86400seconds",
    img: "/img/series/Every-86400-Seconds (2023).jpg",
    titulo: "Every 86400 Seconds (2023)",
    genero: "Romance/Drama",
    sinopsis:
      "Temporada 2 de Claire y Praew: tras su día en el mar y volverse amantes, casi cumplen seis meses. ¿Cómo seguirá su relación?",
    videos: ["RVR9vpBGHy8", "aJMujCZbn0k", "NL6CoEJtSDo"],
  },

  {
    id: "putourheartonthepaper",
    img: "/img/series/Put-Our-Heart-on-the-Paper-(2023).jpg",
    titulo: "Put Our Heart on the Paper (2023)",
    genero: "Romance",
    sinopsis:
      "Por un bloqueo creativo, la autora Mind busca una roommate. Cake, fan de sus libros, se muda con ella. ¿Podrá mantener su secreto?",
    videos: ["p0WxssffJaU", "5Qe5c3p61dI", "YmgSIBIx6oA", "E9be40G4HOg"],
  },

  {
    id: "lemonvsmelon",
    img: "/img/series/Lemon-VS-Melon.jpg",
    titulo: "Lemon vs Melon (2023)",
    genero: "Romance",
    sinopsis:
      "Fai, tranquilo y amable, choca con la traviesa Punch, pero ese conflicto los acerca y los obliga a enfrentar lo que realmente sienten.",
    playlist: "PLhsCXKbbbsR05fomBiv8HbsfpG7L6NYMN",
  },

  {
    id: "cozyfirstlove",
    img: "/img/series/Cozy-First-Love.jpg",
    titulo: "Cozy First Love (2023)",
    genero: "Drama/Romance",
    sinopsis:
      "Dos chicas comparten la vida escolar y, entre momentos cotidianos, su amistad evoluciona en un romance íntimo, suave y acogedor.",
    playlist: "PLhsCXKbbbsR3-NF5CzmGJz9CZPswBzyKQ",
  },

  {
    id: "youarethecreaminmycoffee",
    img: "/img/series/You-Are-the-Cream-in-My-Coffee-(2023).jpg",
    titulo: "You Are the Cream in My Coffee (2023)",
    genero: "Romance",
    sinopsis:
      "Una chica se acerca a la barista que le gusta fingiendo aprender café, dando inicio a una historia romántica, dulce y sin complicaciones.",
    playlist: "PLhsCXKbbbsR1OS6dnWMzilUeA1IzYsQuf",
  },

  {
    id: "showmelove",
    img: "/img/series/show-me-love.jpg",
    titulo: "Show me love (2023)",
    genero: "Drama/Romance",
    sinopsis:
      "Meena acepta competir en Miss Grand por una gran oferta económica tras la insistencia de Cherine. Mientras luchan por la corona, surge un romance inesperado.",
    videos: [
      "jVAEF51dosk",
      "rhj1fehFI8Q",
      "dt4P0uTua3U",
      "DNKogMzdHHE",
      "RlQP6bUSr-8",
      "cpv6AkVBP0s",
      "xd0_L3t7EII",
      "dgYQn9MU7y4",
      "qCC34nrtazg",
      "H2HhqyWxdg8",
      "WFtwt1v0k-M",
      "YRruYc9ESS0",
      "TQXa-1n454I",
      "yFi11weW1PM",
      "CQth63ZoGMs",
      "Tc2q2_hnj5U",
      "MC9Hkvyh7BA",
      "JM1KvwQ9TxE",
      "TvnFhNKumoE",
      "JuumHCpQz-g",
      "F6_EewNHF_U",
      "n4pgSlPDJoE",
      "bSgKvwSA7cw",
      "Ktq7cs6Q8x4",
      "lrxRO1AHgeo",
      "kfmRsYClOpM",
      "fL8VTKMAHLk",
      "Yn1mcjABD4I",
      "70rgYkFluIc",
      "1PcG6pYu7ws",
      "MCnZ-4sfNlQ",
      "OYm2_-UItCA",
      "fRAMMGEThhg",
    ],
  },

  {
    id: "gaptheseries",
    img: "/img/series/GAP-8.jpg",
    titulo: "GAP The Series (2022)",
    genero: "Comedia/Romance",
    sinopsis:
      "Mon entra a trabajar cerca de Sam, su ídolo y CEO real, pero descubre que no es como la imaginaba; sus diferencias y edad complican el vínculo",
    playlist: "PL4D0KlUVq4IzJslrn8ilKnXV7B3U6DBqO",
  },

  {
    id: "2PMcampus",
    img: "/img/series/2PM-Campus-(2022).jpg",
    titulo: "2PM Campus (2022)",
    genero: "Drama/Romance",
    sinopsis:
      "En el momento más intenso del día, seguimos a mujeres de 20 enfrentando dudas, deseos y realidades de su generación.",
    videos: ["BDAimbbgBdQ"],
  },

  {
    id: "from1metreto1centimetre",
    img: "/img/series/From-1-Metre-to-1-Centimetre.jpg",
    titulo: "From 1 Metre to 1 Centimetre (2022)",
    genero: "Drama/Romance",
    sinopsis: "",
    playlist: "PLhsCXKbbbsR1cNxxuo8vEzM6ohTvO88ak",
  },

  {
    id: "alwaysbeyou",
    img: "/img/series/Always-Be-You-(2022).jpg",
    titulo: "Always Be You (2022)",
    genero: "Romance",
    sinopsis:
      "Minnie y Ai, exnovias del colegio, se reencuentran años después. Los recuerdos resurgen. ¿Podrán revivir su amor o ya siguieron adelante?",
    videos: ["xlTC4Y_OMBk", "5PEHsbQSzyM"],
  },

  {
    id: "girlfriendprojectday1",
    img: "/img/series/girlfriend.jpg",
    titulo: "Girlfriend Project Day 1 (2022)",
    genero: "Romance",
    sinopsis:
      "Hee Ram y Ga In deben fingir ser pareja en una clase universitaria; aunque no se llevan bien, la misión comienza a cambiar sus sentimientos.",
    playlist: "PLvaDF5IH_PZvVQqlb9Y9pFsWLAkXj8m4D",
  },

  {
    id: "myfairyghost",
    img: "/img/series/My-Fairy-Ghost-(2022).jpg",
    titulo: "My Fairy Ghost (2022)",
    genero: "Romance/Drama",
    sinopsis:
      "Riko, una novelista bloqueada, se enamora de Kei, el fantasma de una pintora atrapada entre el amor y la despedida.",
    playlist: "PLyqngFOTdamAXFE9oFKVflhYaYCM75hRU",
  },

  {
    id: "sorrymyfriend",
    img: "/img/series/Sorry-My-friend.jpg",
    titulo: "Sorry My Friend (2020)",
    genero: "Romance",
    sinopsis:
      "Dos mejores amigas ven cambiar su relación cuando surgen sentimientos románticos, enfrentando una dolorosa separación.",
    videos: ["1C_q9XV5GUU", "e4Sreb8Cpw8"],
  },

  {
    id: "outofbreath",
    img: "/img/series/Out-of-Breath.jpg",
    titulo: "Out of Breath (2019)",
    genero: "Romance/Drama",
    sinopsis:
      "Tras una ruptura, Ha Eun conoce a Min Seo en una app de citas. Juntas cumplen sueños pendientes, pero ¿logrará olvidar a su ex?",
    videos: ["DUGblEoORXI"],
  },
];

// =====================
// COMUNIDAD
// ✅ Solo necesitás poner videoId y canal — título y miniatura se cargan solos
// =====================

const comunidadArray = [
  { id: "c1", videoId: "IOFprq5UfwM" },
  { id: "c1", videoId: "0GALf9zof5E" },

  { id: "c1", videoId: "ZZfk7QDx_kU" },
  { id: "c1", videoId: "NBA7TbOdxR8" },
  { id: "c1", videoId: "nkwwTjPt2Lc" },
  { id: "c1", videoId: "MEu9JBMic3w" },

  { id: "c1", videoId: "_cXUI8Jtjn4" },
  { id: "c1", videoId: "STVqrStyr6I" },
  { id: "c1", videoId: "rqHYlB51-oo" },
];

// =====================
// OSTs GL
// ✅ Solo necesitás pegar el videoId — título y miniatura se cargan solos
// =====================
const ostsArray = [
  { id: "ost1", videoId: "SAPDFLMMMfQ" },
  { id: "ost1", videoId: "TTfF-pAf774" },
  { id: "ost1", videoId: "MP4Ciew8Xok" },
  { id: "ost1", videoId: "dE4yy4ULCXI" },
  { id: "ost1", videoId: "Sxh28YQGSq0" },
  { id: "ost1", videoId: "354VXHaqaE4" },

  { id: "ost1", videoId: "qWfsiUJtIIw" },

  { id: "ost1", videoId: "Kdyph-0nKwc" },
  { id: "ost1", videoId: "MeEqOOH-2eE" },
  { id: "ost1", videoId: "4hFyFMp9ml4" },
  { id: "ost1", videoId: "27klSLsVCR4" },
  { id: "ost1", videoId: "xWvhq6bsde8" },
  { id: "ost1", videoId: "NTXo8HpAugU" },
  { id: "ost1", videoId: "cOvvSf-XhE4" },
  { id: "ost2", videoId: "qjuXnqA4KRY" },
  { id: "ost3", videoId: "sKg2_PDMUGc" },
  { id: "ost4", videoId: "2Xm56pL34ek" },
  { id: "ost5", videoId: "mzqW0nn06SA" },
  { id: "ost6", videoId: "qrNXPKYGG0s" },
  { id: "ost7", videoId: "CKclkO6HHrY" },
  { id: "ost8", videoId: "BDpn6St06PI" },
  { id: "ost9", videoId: "XMKdChy6zw0" },
  { id: "ost10", videoId: "xZTTYmcFFhA" },
  { id: "ost11", videoId: "0n9zZ1aOWFk" },
  { id: "ost12", videoId: "zqFYE77Atys" },
  { id: "ost13", videoId: "4XccBfDMRY0" },
  { id: "ost14", videoId: "RHnPq3Z0A8c" },
  { id: "ost15", videoId: "t8kp6Cmc5cc" },
  { id: "ost16", videoId: "abBL28Pd8lo" },
  { id: "ost17", videoId: "2jXDADfnHfY" },
  { id: "ost18", videoId: "8SPnMnuqzYE" },
  { id: "ost19", videoId: "nCGvg31zNdk" },
  { id: "ost20", videoId: "xnOOAzX9nK4" },
  { id: "ost21", videoId: "sb9Z79klTv4" },
  { id: "ost22", videoId: "LD_xc6k8-LE" },
  { id: "ost1", videoId: "La9v6B9sO9o" },
  { id: "ost1", videoId: "gdBlUZYXrmQ" },
  { id: "ost1", videoId: "1i-MKyKVA5o" },
  { id: "ost1", videoId: "2T0klTd-Usg" },
  { id: "ost1", videoId: "YU5UQ8n01uI" },
  { id: "ost1", videoId: "rJd6iOk83Qk" },
  { id: "ost1", videoId: "l_BwV0pudj4" },
  { id: "ost1", videoId: "9SSyRcIy588" },
  { id: "ost1", videoId: "zlxDTsddL5E" },
  { id: "ost1", videoId: "pkMJUwNM1HA" },
  { id: "ost1", videoId: "VIe0Mem7OeM" },
  { id: "ost1", videoId: "gMk8FeC5nhE" },
  { id: "ost1", videoId: "JyEQ7ZX9iwk" },
  { id: "ost1", videoId: "YS4fkF86RdI" },
  { id: "ost1", videoId: "Ku1uSXFAQgQ" },
  { id: "ost1", videoId: "8RI11ofpeks" },
  { id: "ost1", videoId: "JAVLBnd4cdg" },
  { id: "ost1", videoId: "6c_5xPYxmy4" },
  { id: "ost1", videoId: "sqc_BI1rbd0" },
  { id: "ost1", videoId: "vNhZ0uFddl4" },
  { id: "ost1", videoId: "Jpih2TjgZGM" },
  { id: "ost1", videoId: "FD-ZpEg0l5I" },
  { id: "ost1", videoId: "fxedUgaP1vQ" },
  { id: "ost1", videoId: "YF30_ksQ8qg" },
  { id: "ost1", videoId: "2BUT8xRvZZQ" },
  { id: "ost1", videoId: "ID_pd9Ni3nk" },
  { id: "ost1", videoId: "kHs3CWRe5PA" },
  { id: "ost1", videoId: "MM7Yad1P_2A" },
  { id: "ost1", videoId: "XVVqVZKVsxw" },
  { id: "ost1", videoId: "BG_yN4HCr44" },
  { id: "ost1", videoId: "_J8SM9jqjow" },
  { id: "ost1", videoId: "saSPFSwHbrk" },
  { id: "ost1", videoId: "XxdiiAnTUxo" },
  { id: "ost1", videoId: "U1piZH2CNXA" },
  { id: "ost1", videoId: "hsvQg5JSDHU" },
  { id: "ost1", videoId: "IsKtf2DoCBU" },
  { id: "ost1", videoId: "6w8X4Tfcgu0" },
  { id: "ost1", videoId: "I_wl4yurk1U" },
  { id: "ost1", videoId: "_b3LpCOe1vs" },
  { id: "ost1", videoId: "5C_vJyhQuQY" },
  { id: "ost1", videoId: "AMzlTbjBLDo" },
  { id: "ost1", videoId: "gzfHZqHFxi0" },

  { id: "ost1", videoId: "HI8z03beTtI" },
  { id: "ost1", videoId: "pgzaWboZUSg" },
  { id: "ost1", videoId: "MNEc23m2ons" },
  { id: "ost1", videoId: "QcsBxsmMrtA" },
  { id: "ost1", videoId: "gdSsAoYOeLw" },
  { id: "ost1", videoId: "9ae1xxRggbs" },
  { id: "ost1", videoId: "Fu7d92Q3o0o" },
  { id: "ost1", videoId: "n1ih3Ptg9Bo" },
  { id: "ost1", videoId: "DoTt57nnMg8" },
  { id: "ost1", videoId: "xmBeo_FRhvg" },
  { id: "ost1", videoId: "8AUbwoXi7RQ" },
  { id: "ost1", videoId: "j2SPeBnDNtE" },
  { id: "ost1", videoId: "NBw1jF342vw" },
  { id: "ost1", videoId: "LAZpP0_w23k" },
  { id: "ost1", videoId: "DznDzQd8C_A" },
  { id: "ost1", videoId: "wzRI0JYUJFM" },
  { id: "ost1", videoId: "U1piZH2CNXA" },
  { id: "ost1", videoId: "fWvIbVEf7Yc" },
  { id: "ost1", videoId: "BKBA4FqZwEg" },
  { id: "ost1", videoId: "lvBRWn8qldg" },
];
// =====================
// 🎬 MICROFICCIÓN GL
// =====================
const microficcionArray = [
  // Short individual
  {
    id: "micro3",
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

  // Microdrama por partes
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
    ],
  },

  // Microdrama por partes 2
  {
    id: "micro2",
    slug: "las-cartas-que-nunca-debieron-llegar",
    titulo: "📩 Las Cartas que Nunca Debieron Llegar",
    canal: "Girls Love Play",
    videoId: "hZJzgu4LyiA",
    esShort: true,
    videos: ["hZJzgu4LyiA", "u6HzX5tmlU8"],
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
    <p class="modal-texto" style="margin-top:12px;line-height:1.8">${
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
      if (noticia) abrirModal(noticia);
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
// YOUTUBE API
// =====================

let tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

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
        cargarSerie("gaptheseries");
      },
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.PLAYING) {
          if (ostTimer) {
            clearTimeout(ostTimer);
            ostTimer = null;
          }
          const idx = player.getPlaylistIndex();
          if (idx >= 0) lastPlaylistIndex = idx;
          actualizarEpisodio();
          if (player.setOption)
            player.setOption("captions", "track", { languageCode: "es" });
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

function cargarSerie(id) {
  const serie = [...seriesArray].find((s) => s.id === id);
  if (!serie) return;
  currentSerieId = id;
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
    return;
  }

  if (serie.fbreels && serie.fbreels.length) {
    mostrarFBReel(serie.fbreels[0]);
    actualizarEpisodio();
    return;
  }

  if (serie.playlist) {
    player.loadPlaylist({
      listType: "playlist",
      list: serie.playlist,
      index: 0,
    });
    setTimeout(() => {
      player.setShuffle(false);
      if (player.setOption)
        player.setOption("captions", "track", { languageCode: "es" });
      const lista = player.getPlaylist();
      playlistLength = lista && lista.length ? lista.length : 0;
      lastPlaylistIndex = -1;
      actualizarEpisodio();
    }, 1500);
    return;
  }

  playlist = serie.videos || [];
  if (playlist.length) {
    player.loadVideoById(playlist[0]);
    if (player.setOption)
      player.setOption("captions", "track", { languageCode: "es" });
  }
}

function prevVideo() {
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
    if (player.setOption)
      player.setOption("captions", "track", { languageCode: "es" });
  } else current = 0;
}

function nextVideo() {
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
    if (player.setOption)
      player.setOption("captions", "track", { languageCode: "es" });
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

function reproducirContenido(item) {
  document
    .querySelectorAll(".card")
    .forEach((c) => c.classList.remove("active"));
  if (!playerReady) return;
  currentSerieId = item.id;
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

  ocultarInfoContenido();

  setTimeout(() => {
    if (item.tiktoks && item.tiktoks.length) {
      mostrarTikTok(item.tiktoks[0]);
      actualizarEpisodio();
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
          const yOffset = -100;
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
          reproducirContenido(item);
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

function renderNoticias(array, containerId, paginationId, perPage = 5) {
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

      div.onclick = () => abrirNoticia(item);

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
          const section = document.getElementById("noticias");
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
  abrirModal(item);
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

// Cache en memoria: si ya se pidió una noticia completa, no se vuelve a fetchear
const noticiasCompletasCache = new Map();

async function obtenerNoticiaCompleta(id) {
  if (noticiasCompletasCache.has(id)) {
    return noticiasCompletasCache.get(id);
  }
  const res = await fetch(`/data/noticias/${id}.json`);
  if (!res.ok) throw new Error("No se pudo cargar la noticia: " + id);
  const data = await res.json();
  noticiasCompletasCache.set(id, data);
  return data;
}

async function abrirModal(item) {
  // Datos livianos (ya los tenemos desde el índice) -> se muestran al instante
  document.getElementById("modal-img").src = item.img;
  document.getElementById("modal-fecha").textContent = "📅 " + item.fecha;
  document.getElementById("modal-titulo").textContent = item.titulo;
  document.getElementById("modal-texto").textContent = "Cargando...";
  document.getElementById("modal-video").innerHTML = "";

  document.getElementById("modal-noticias").classList.add("active");
  document.body.style.overflow = "hidden";

  // Contenido pesado -> se pide bajo demanda
  try {
    const detalle = await obtenerNoticiaCompleta(item.id);

    document.getElementById("modal-texto").textContent = detalle.texto;

    const videoEl = document.getElementById("modal-video");

    if (detalle.trailer) {
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
            src="https://www.youtube.com/embed/${detalle.trailer}"
            allowfullscreen
          ></iframe>
        </div>
      `;
    } else {
      videoEl.innerHTML = "";
    }
  } catch (err) {
    document.getElementById("modal-texto").textContent =
      "No se pudo cargar la noticia. Intentá de nuevo más tarde.";
    console.error("Error cargando detalle de noticia:", err);
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

renderSection(seriesArray, "series-container", "pagination-series", 20);
renderNoticias(noticiasArray, "noticias-container", "pagination-noticias", 6);
renderShips(shipsArray, "ships-container", "pagination-ships", 6);
renderComunidad(
  microficcionArray,
  "microficcion-container",
  "pagination-microficcion",
  8,
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
// Fix scroll al inicio en móvil
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
  .querySelectorAll(".nav a")
  .forEach((link) =>
    link.addEventListener("click", () =>
      document.querySelector(".nav").classList.remove("active")
    )
  );

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

  if (path.startsWith("/serie/")) {
    const slug = path.split("/serie/")[1];
    const serie = seriesArray.find((s) => s.slug === slug);
    if (serie) {
      const intentar = () => {
        if (playerReady) {
          verSerie(serie.id);
          document.title = serie.titulo + " - Girls Love Play";
        } else {
          setTimeout(intentar, 300);
        }
      };
      intentar();
    }
  }
});
