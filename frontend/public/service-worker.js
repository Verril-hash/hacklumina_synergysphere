import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';

precacheAndRoute(self.__WB_MANIFEST);

// Cache API responses for offline
registerRoute(
  ({ url }) => url.origin === 'http://localhost:5000',
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
  })
);

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html') || fetch(event.request)
    );
  }
});