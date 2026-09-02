// =====================================================
// 💬 SISTEMA DE COMENTARIOS - Girls Love Play
// Este archivo se carga UNA vez en cada página que tenga
// modales con comentarios (index.html y mundo-gl.html).
// No toca nada del resto del sitio.
// =====================================================

const TURNSTILE_SITE_KEY = "0x4AAAAAAEiI227QkehQP1WC"; // tu Site key pública de Turnstile

function escaparHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function formatearFecha(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });
}

async function renderComentarios(containerId, slug, tipo = "noticias", meta = {}) {
  const cont = document.getElementById(containerId);
  if (!cont) return;

  const titulo = meta.titulo || document.title;

  cont.innerHTML = `
    <div class="comentarios-caja">
      <h3 class="comentarios-titulo">💬 Comentarios</h3>
      <div class="comentarios-lista" id="${containerId}-lista">Cargando comentarios...</div>

      <div class="compartir-caja">
        <p class="compartir-titulo">Compartir esta noticia</p>
        <div class="compartir-grid">
          <button class="btn-compartir btn-facebook" id="${containerId}-fb">📘 Facebook</button>
          <button class="btn-compartir btn-whatsapp" id="${containerId}-wa">💬 WhatsApp</button>
          <button class="btn-compartir btn-x" id="${containerId}-x">𝕏</button>
        </div>
        <div class="compartir-grid compartir-grid-2">
          <button class="btn-compartir btn-copiar" id="${containerId}-copiar">📋 Copiar link</button>
          <button class="btn-compartir btn-nativo" id="${containerId}-nativo" style="display:none;">↗ Compartir</button>
        </div>
        <p class="compartir-msg" id="${containerId}-compartir-msg"></p>
      </div>

      <div class="comentarios-form">
        <input type="text" id="${containerId}-nombre" maxlength="40" placeholder="Tu nombre" />
        <textarea id="${containerId}-texto" maxlength="1000" placeholder="Escribí tu comentario..."></textarea>
        <div class="cf-turnstile" id="${containerId}-turnstile"></div>
        <button id="${containerId}-publicar" disabled>Publicar comentario</button>
        <p class="comentarios-msg" id="${containerId}-msg"></p>
      </div>
    </div>
  `;

  let token = null;

  // El widget se crea de forma dinámica (recién ahora existe en el DOM),
  // así que hay que renderizarlo a mano con turnstile.render() en vez de
  // confiar en el auto-render de data-sitekey (ese solo detecta widgets
  // que ya estaban en el HTML cuando el script de Turnstile cargó).
  function montarTurnstile() {
    if (!window.turnstile) {
      // El script de challenges.cloudflare.com todavía no cargó, reintentamos
      setTimeout(montarTurnstile, 200);
      return;
    }
    window.turnstile.render(`#${containerId}-turnstile`, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (t) => {
        token = t;
        document.getElementById(containerId + "-publicar").disabled = false;
      },
      "expired-callback": () => {
        token = null;
        document.getElementById(containerId + "-publicar").disabled = true;
      },
    });
  }
  montarTurnstile();
  configurarCompartir(containerId, titulo);

  await cargarLista(containerId, slug, tipo);

  document.getElementById(containerId + "-publicar").addEventListener("click", async () => {
    const nombre = document.getElementById(containerId + "-nombre").value.trim();
    const texto = document.getElementById(containerId + "-texto").value.trim();
    const msg = document.getElementById(containerId + "-msg");

    if (!nombre || !texto) {
      msg.textContent = "Completá tu nombre y el comentario.";
      return;
    }

    document.getElementById(containerId + "-publicar").disabled = true;
    msg.textContent = "Publicando...";

    try {
      const res = await fetch("/api/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, tipo, nombre, texto, turnstileToken: token }),
      });
      const data = await res.json();

      if (!res.ok) {
        msg.textContent = data.error || "No se pudo publicar tu comentario.";
        document.getElementById(containerId + "-publicar").disabled = false;
        return;
      }

      msg.textContent = data.mensaje;
      document.getElementById(containerId + "-texto").value = "";
      if (data.publicado) await cargarLista(containerId, slug, tipo);

      if (window.turnstile) window.turnstile.reset(`#${containerId}-turnstile`);
      token = null;
      document.getElementById(containerId + "-publicar").disabled = true;
    } catch (e) {
      msg.textContent = "Error de conexión. Probá de nuevo.";
      document.getElementById(containerId + "-publicar").disabled = false;
    }
  });
}

function configurarCompartir(containerId, titulo) {
  const url = location.href;
  const msg = document.getElementById(containerId + "-compartir-msg");

  document.getElementById(containerId + "-fb").addEventListener("click", () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,width=600,height=500"
    );
  });

  document.getElementById(containerId + "-wa").addEventListener("click", () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(titulo + " " + url)}`,
      "_blank",
      "noopener"
    );
  });

  document.getElementById(containerId + "-x").addEventListener("click", () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(titulo)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,width=600,height=500"
    );
  });

  document.getElementById(containerId + "-copiar").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(url);
      msg.textContent = "¡Link copiado! 💕";
      setTimeout(() => (msg.textContent = ""), 2500);
    } catch (e) {
      msg.textContent = "No se pudo copiar. Copiá el link desde la barra de direcciones.";
    }
  });

  const btnNativo = document.getElementById(containerId + "-nativo");
  if (navigator.share) {
    btnNativo.style.display = "block";
    btnNativo.addEventListener("click", async () => {
      try {
        await navigator.share({ title: titulo, url });
      } catch (e) {}
    });
  }
}

async function cargarLista(containerId, slug, tipo) {
  const lista = document.getElementById(containerId + "-lista");
  try {
    const res = await fetch(`/api/comentarios?slug=${encodeURIComponent(slug)}&tipo=${tipo}`);
    const data = await res.json();
    const comentarios = data.comentarios || [];

    if (!comentarios.length) {
      lista.innerHTML = `<p class="comentarios-vacio">Todavía no hay comentarios. ¡Sé la primera en comentar! 💕</p>`;
      return;
    }

    lista.innerHTML = comentarios
      .map(
        (c) => `
      <div class="comentario-item" data-id="${c.id}">
        <div class="comentario-avatar">👤</div>
        <div class="comentario-cuerpo">
          <p class="comentario-nombre">${escaparHTML(c.nombre)}</p>
          <p class="comentario-texto">${escaparHTML(c.texto)}</p>
          <div class="comentario-acciones">
            <span class="comentario-fecha">${formatearFecha(c.fecha)}</span>
            <button class="btn-like" onclick="darLike(${c.id}, this)">❤️ <span>${c.likes}</span></button>
            <button class="btn-reportar" onclick="reportarComentario(${c.id})">🚩 Reportar</button>
          </div>
        </div>
      </div>`
      )
      .join("");
  } catch (e) {
    lista.innerHTML = `<p class="comentarios-vacio">No se pudieron cargar los comentarios.</p>`;
  }
}

async function darLike(id, btn) {
  btn.disabled = true;
  try {
    const res = await fetch(`/api/comentarios/${id}/like`, { method: "POST" });
    const data = await res.json();
    if (data.likes !== undefined) btn.querySelector("span").textContent = data.likes;
  } catch (e) {}
}

async function reportarComentario(id) {
  const motivo = prompt(
    "Motivo del reporte:\n1) Spam\n2) Acoso\n3) Insultos\n4) Contenido inapropiado\n5) Información falsa\n6) Otro\n\nEscribí el número:"
  );
  const motivos = {
    1: "Spam",
    2: "Acoso",
    3: "Insultos",
    4: "Contenido inapropiado",
    5: "Información falsa",
    6: "Otro",
  };
  if (!motivo || !motivos[motivo]) return;

  try {
    const res = await fetch(`/api/comentarios/${id}/reportar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ motivo: motivos[motivo] }),
    });
    const data = await res.json();
    alert(data.mensaje || "Gracias por avisarnos.");
  } catch (e) {}
}

window.renderComentarios = renderComentarios;