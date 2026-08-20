const CACHE_NAME = 'gl-play-cache-v1';
const OFFLINE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/ships-gl.css',
  '/script.js',
  '/manifest.json',
  '/img/logo.png'
];

// Instalación: precachea lo básico para que la PWA arranque offline
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(OFFLINE_URLS).catch(() => {
        // si algún recurso falla (ej. no existe todavía), no rompe la instalación
      })
    )
  );
  self.skipWaiting();
});

// Activación: limpia caches viejos de versiones anteriores
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: red primero, y si falla (sin conexión) responde desde cache
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
