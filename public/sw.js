const CACHE_VERSION = "v2";
const CACHE_NAME = `chalet-manager-${CACHE_VERSION}`;
const CACHE_PREFIX = "chalet-manager-";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const origin = self.location.origin;
  if (request.method !== "GET" || !request.url.startsWith(origin)) return;

  const url = new URL(request.url);
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;

      const response = await fetch(request.clone());
      if (response.status === 200 && response.type === "basic") {
        cache.put(request, response.clone());
      }
      return response;
    }),
  );
});
