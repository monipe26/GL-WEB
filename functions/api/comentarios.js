import { hashIp, respuestaJSON, verificarTurnstile, contarEnlaces } from "./_utils.js";

// GET /api/comentarios?slug=xxx&tipo=noticias
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  const tipo = url.searchParams.get("tipo") || "noticias";

  if (!slug) return respuestaJSON({ error: "Falta el slug" }, 400);

  try {
    const { results } = await env.DB.prepare(
      "SELECT id, nombre, texto, fecha, likes FROM comentarios WHERE noticia_slug = ? AND tipo = ? ORDER BY fecha DESC"
    )
      .bind(slug, tipo)
      .all();

    return respuestaJSON({ comentarios: results || [] });
  } catch (e) {
    return respuestaJSON({ error: "Error al cargar los comentarios" }, 500);
  }
}

// POST /api/comentarios   Body: { slug, tipo, nombre, texto, turnstileToken }
export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return respuestaJSON({ error: "Datos inválidos" }, 400);
  }

  const { slug, tipo = "noticias", nombre, texto, turnstileToken } = body || {};

  if (!slug || !nombre || !texto) {
    return respuestaJSON({ error: "Faltan datos obligatorios" }, 400);
  }

  const nombreLimpio = String(nombre).trim().slice(0, 40);
  const textoLimpio = String(texto).trim().slice(0, 1000);

  if (!nombreLimpio || !textoLimpio) {
    return respuestaJSON({ error: "Completá tu nombre y el comentario." }, 400);
  }

  const ip = request.headers.get("CF-Connecting-IP") || "0.0.0.0";

  // Verificar el captcha de Turnstile contra Cloudflare
  const turnstileOk = await verificarTurnstile(turnstileToken, ip, env.TURNSTILE_SECRET);
  if (!turnstileOk) {
    return respuestaJSON(
      { error: "No pudimos verificar que sos humana. Volvé a intentar el captcha." },
      403
    );
  }

  // Anti-spam básico: bloqueamos comentarios con demasiados links
  if (contarEnlaces(textoLimpio) > 2) {
    return respuestaJSON({ error: "Tu comentario tiene demasiados enlaces." }, 400);
  }

  const ipHash = await hashIp(ip);
  const fecha = new Date().toISOString();

  try {
    await env.DB.prepare(
      "INSERT INTO comentarios (noticia_slug, tipo, nombre, texto, fecha, likes, ip_hash) VALUES (?, ?, ?, ?, ?, 0, ?)"
    )
      .bind(slug, tipo, nombreLimpio, textoLimpio, fecha, ipHash)
      .run();

    return respuestaJSON({
      ok: true,
      publicado: true,
      mensaje: "¡Gracias por tu comentario! 💕",
    });
  } catch (e) {
    return respuestaJSON({ error: "No se pudo guardar tu comentario. Probá de nuevo." }, 500);
  }
}