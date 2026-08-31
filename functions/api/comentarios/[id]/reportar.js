import { hashIp, respuestaJSON } from "../../_utils.js";

// POST /api/comentarios/123/reportar   Body: { motivo }
export async function onRequestPost(context) {
  const { request, env, params } = context;
  const id = Number(params.id);
  if (!id) return respuestaJSON({ error: "Id inválido" }, 400);

  let body;
  try {
    body = await request.json();
  } catch (e) {
    body = {};
  }
  const motivo = (body.motivo || "Otro").slice(0, 60);

  const ip = request.headers.get("CF-Connecting-IP") || "0.0.0.0";
  const ipHash = await hashIp(ip);
  const fecha = new Date().toISOString();

  try {
    await env.DB.prepare(
      "INSERT INTO reportes (comentario_id, motivo, ip_hash, fecha) VALUES (?, ?, ?, ?)"
    )
      .bind(id, motivo, ipHash, fecha)
      .run();
  } catch (e) {
    // El UNIQUE(comentario_id, ip_hash) evita reportes repetidos de la misma persona
    return respuestaJSON({ ok: true, mensaje: "Ya habías reportado este comentario." });
  }

  return respuestaJSON({ ok: true, mensaje: "Gracias, vamos a revisarlo." });
}