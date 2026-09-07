import { hashIp, respuestaJSON } from "../_utils.js";

// POST /api/comentarios/123/like
export async function onRequestPost(context) {
  const { request, env, params } = context;
  const id = Number(params.id);
  if (!id) return respuestaJSON({ error: "Id inválido" }, 400);

  const ip = request.headers.get("CF-Connecting-IP") || "0.0.0.0";
  const ipHash = await hashIp(ip);

  const yaDioLike = await env.DB.prepare(
    "SELECT 1 FROM likes_registrados WHERE comentario_id = ? AND ip_hash = ?"
  )
    .bind(id, ipHash)
    .first();

  if (yaDioLike) {
    const actual = await env.DB.prepare(
      "SELECT likes FROM comentarios WHERE id = ?"
    )
      .bind(id)
      .first();
    return respuestaJSON({ ok: true, likes: actual ? actual.likes : 0, yaLike: true });
  }

  await env.DB.batch([
    env.DB.prepare(
      "INSERT INTO likes_registrados (comentario_id, ip_hash) VALUES (?, ?)"
    ).bind(id, ipHash),
    env.DB.prepare(
      "UPDATE comentarios SET likes = likes + 1 WHERE id = ?"
    ).bind(id),
  ]);

  const actualizado = await env.DB.prepare(
    "SELECT likes FROM comentarios WHERE id = ?"
  )
    .bind(id)
    .first();

  return respuestaJSON({ ok: true, likes: actualizado ? actualizado.likes : 0, yaLike: false });
}