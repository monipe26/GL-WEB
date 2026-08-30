// Funciones compartidas por todos los endpoints de comentarios.
// No se accede directamente por URL: solo la usan los otros archivos de /api.

// Texto fijo que se mezcla con la IP antes de "hashearla".
// No es información secreta crítica, solo evita que un hash se pueda
// buscar en listas ya armadas de internet. Podés cambiarlo si querés.
const SAL_IP = "glplay-2026-sal-fija";

export async function hashIp(ip) {
  const datos = new TextEncoder().encode(SAL_IP + "-" + ip);
  const buffer = await crypto.subtle.digest("SHA-256", datos);
  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verificarTurnstile(token, ip, secretKey) {
  if (!token) return false;
  try {
    const body = new URLSearchParams();
    body.append("secret", secretKey);
    body.append("response", token);
    body.append("remoteip", ip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body }
    );
    const data = await res.json();
    return data.success === true;
  } catch (e) {
    return false;
  }
}

export function contarEnlaces(texto) {
  const matches = texto.match(/https?:\/\/|www\./gi);
  return matches ? matches.length : 0;
}

export function respuestaJSON(objeto, status = 200) {
  return new Response(JSON.stringify(objeto), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}