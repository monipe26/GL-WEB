// =====================
// EDAD Y AVISO DE CUMPLEAÑOS (según horario real de Tailandia)
// Compartido entre actrices-gl.html (fichas) e index.html (aviso emergente)
// =====================
function getFechaHoyAR() {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const obj = {};
  partes.forEach((p) => {
    if (p.type !== "literal") obj[p.type] = Number(p.value);
  });
  return obj; // { year, month, day }
}

function getFechaHoyThailand() {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const obj = {};
  partes.forEach((p) => {
    if (p.type !== "literal") obj[p.type] = Number(p.value);
  });
  return obj; // { year, month, day }
}

function calcularEdad(fechaISO) {
  if (!fechaISO) return null;
  const [anioNac, mesNac, diaNac] = fechaISO.split("-").map(Number);
  // Usamos la fecha de Tailandia (no la de Argentina) para que la edad
  // se actualice en el mismo instante en que arranca el aviso de
  // cumpleaños (estadoCumple usa ese mismo reloj).
  const hoy = getFechaHoyThailand();
  let edad = hoy.year - anioNac;
  const noLlegoCumpleEsteAnio =
    hoy.month < mesNac || (hoy.month === mesNac && hoy.day < diaNac);
  if (noLlegoCumpleEsteAnio) edad--;
  return edad;
}

// Devuelve "hoy" (en Argentina también es la fecha del cumpleaños),
// "antes" (en Argentina todavía es el día anterior, pero en Tailandia
// ya arrancó su cumpleaños) o null si en Tailandia ya no es su día.
// La clave es comparar contra la fecha ACTUAL de Tailandia, no contra
// una resta fija de días: así el aviso se apaga solo apenas en
// Tailandia cruza la medianoche hacia el día siguiente.
function estadoCumple(fechaISO) {
  if (!fechaISO) return null;
  const [, mesNac, diaNac] = fechaISO.split("-").map(Number);
  const hoyTH = getFechaHoyThailand();

  const esCumpleEnTailandiaAhora =
    hoyTH.month === mesNac && hoyTH.day === diaNac;
  if (!esCumpleEnTailandiaAhora) return null;

  const hoyAR = getFechaHoyAR();
  const mismaFechaEnAR = hoyAR.month === mesNac && hoyAR.day === diaNac;
  return mismaFechaEnAR ? "hoy" : "antes";
}

// Devuelve el array de actrices (de actricesArray) que están de cumpleaños ahora mismo.
function obtenerActricesDeCumple() {
  if (typeof actricesArray === "undefined") return [];
  return actricesArray.filter((a) => estadoCumple(a.nacimiento) !== null);
}