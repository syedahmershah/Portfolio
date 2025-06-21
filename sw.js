const CACHE_NAME = 'portfolio-v2';
// Detect if we're in development or production
const isDev = self.location.hostname === '127.0.0.1' || self.location.hostname === 'localhost';
const BASE_PATH = isDev ? '' : '/Portfolio';

const STATIC_ASSETS = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/styles.css`,
  `${BASE_PATH}/custom-styles.css`,
  `${BASE_PATH}/script.js`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/Images/Logo/Character.webp`,
  `${BASE_PATH}/Images/Logo/Character 2.webp`,
  `${BASE_PATH}/Images/Logo/About me.webp`,
  `${BASE_PATH}/Images/Favicon/Favicon.png`,
  `${BASE_PATH}/Images/Favicon/Favicon.webp`,
  `${BASE_PATH}/Images/Favicon/Favicon-192.png`,
  `${BASE_PATH}/Images/Favicon/Favicon-512.png`,
  `${BASE_PATH}/Images/Favicon/Favicon-maskable-192.png`,
  `${BASE_PATH}/Images/Favicon/Favicon-maskable-512.png`,
  `${BASE_PATH}/Images/Screenshots/desktop.png`,
  `${BASE_PATH}/Images/Screenshots/mobile.png`,
  `${BASE_PATH}/Images/Projects/1.gif`
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(STATIC_ASSETS);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Event Strategy (Cache First, then Network)
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Handle the request
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                // Don't cache if it's an API request
                if (!event.request.url.includes('/api/')) {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          })
          .catch(() => {
            // Return a custom offline page or asset if fetch fails
            if (event.request.mode === 'navigate') {
              return caches.match(`${BASE_PATH}/index.html`);
            }
          });
      })
  );
}); 