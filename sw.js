const CACHE_NAME = 'opensigma-cache-v3'; // Increment cache version to force re-install
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/lessons.js',
  '/dashboard.js',
  '/pythonSandbox.js',
  '/sqlSandbox.js',
  '/dataVisualizer.js',
  '/lessonViewer.js',
  '/resources.js',
  '/landing.js',
  '/404.html',
  '/curriculum_version.json'
];

// Install Service Worker and cache essential local files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate and remove old cache iterations
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network-first fetch strategy: checks network, falls back to cache when offline
self.addEventListener('fetch', (e) => {
  // Only handle GET requests and ignore chrome-extension / external CDN schemas
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // Clone response and update cache with latest files
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Offline fallback
        return caches.match(e.request);
      })
  );
});
