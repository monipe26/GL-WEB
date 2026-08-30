import { hashIp, verificarTurnstile, contarEnlaces, respuestaJSON } from "./_utils.js";

// GET /api/comentarios?slug=xxx&tipo=noticias
// Devuelve los comentarios ya aprobados de esa noticia, los más nuevos primero.
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  const tipo = url.searchParams.get("tipo") || "noticias";

  if (!slug) return respuestaJSON({ error: "Falta el slug" }, 400);

  const { results } = await env.DB.prepare(
    `SELECT id, nombre, texto, fecha, likes
     FROM comentarios
     WHERE noticia_slug = ? AND tipo = ? AND estado = 'aprobado'
     ORDER BY id DESC
     LIMIT 200`
  )
    .bind(slug, tipo)
    .all();

  return respuestaJSON({ comentarios: results });
}

// POST /api/comentarios
// Body: { slug, tipo, nombre, texto, turnstileToken }
export async function onRequestPost(context) {
  const { request, env } = context;
  const ip = request.headers.get("CF-Connecting-IP") || "0.0.0.0";
  const ipHash = await hashIp(ip);

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return respuestaJSON({ error: "Datos inválidos" }, 400);
  }

  const slug = (body.slug || "").trim();
  const tipo = body.tipo === "mundogl" ? "mundogl" : "noticias";
  const nombre = (body.nombre || "").trim().slice(0, 40);
  const texto = (body.texto || "").trim().slice(0, 1000);
  const turnstileToken = body.turnstileToken;

  if (!slug || !nombre || !texto || texto.length < 2) {
    return respuestaJSON({ error: "Completá tu nombre y el comentario." }, 400);
  }

  // 1) Verificar que no sea un bot
  const humano = await verificarTurnstile(turnstileToken, ip, env.TURNSTILE_SECRET);
  if (!humano) {
    return respuestaJSON({ error: "No pudimos verificar que sos una persona. Probá de nuevo." }, 400);
  }

  // 2) ¿Esta IP está bloqueada por la administradora?
  const bloqueada = await env.DB.prepare(
    "SELECT ip_hash FROM ips_bloqueadas WHERE ip_hash = ?"
  )
    .bind(ipHash)
    .first();
  if (bloqueada) {
    return respuestaJSON({ error: "No pudimos publicar tu comentario." }, 403);
  }

  // 3) Límite de frecuencia: no más de 1 comentario cada 20 segundos por IP
  const ultimo = await env.DB.prepare(
    "SELECT fecha FROM comentarios WHERE ip_hash = ? ORDER BY id DESC LIMIT 1"
  )
    .bind(ipHash)
    .first();
  if (ultimo) {
    const segundos = (Date.now() - new Date(ultimo.fecha).getTime()) / 1000;
    if (segundos < 20) {
      return respuestaJSON({ error: "Esperá unos segundos antes de comentar de nuevo." }, 429);
    }
  }

  // 4) Decidir el estado: aprobado / pendiente / bloqueado
  let estado = "aprobado";

  const enlaces = contarEnlaces(texto);
  if (enlaces >= 3) estado = "bloqueado";
  else if (enlaces === 2) estado = "pendiente";

  if (estado === "aprobado") {
    const { results: palabras } = await env.DB.prepare(
      "SELECT palabra FROM palabras_bloqueadas"
    ).all();
    const textoLower = texto.toLowerCase();
    const contieneProhibida = palabras.some((p) =>
      textoLower.includes(String(p.palabra).toLowerCase())
    );
    if (contieneProhibida) estado = "pendiente";
  }

  const fecha = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO comentarios (noticia_slug, tipo, nombre, texto, fecha, estado, ip_hash, likes)
     VALUES (?, ?, ?, ?, ?, ?, ?, 0)`
  )
    .bind(slug, tipo, nombre, texto, fecha, estado, ipHash)
    .run();

  return respuestaJSON({
    ok: true,
    publicado: estado === "aprobado",
    mensaje:
      estado === "aprobado"
        ? "¡Comentario publicado!"
        : "¡Gracias! Tu comentario se va a mostrar luego de una revisión rápida.",
  });
}