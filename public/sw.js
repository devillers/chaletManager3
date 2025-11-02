self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const origin = self.location.origin;
  if (request.method !== "GET" || !request.url.startsWith(origin)) return;
  event.respondWith(
    caches.open("chalet-manager-v1").then(async (cache) => {
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
