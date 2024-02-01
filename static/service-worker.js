const CACHE_NAME = 'ticket-control-cache-v1';
const urlsToCache = [
    '/ticketcontrol/',
    'https://i.ibb.co/Q8v1SH3/360-F-616177772-b-EXNr996-NEm-Dli-BSma3d-RNlood-TYR3c-N-removebg-preview.png',

    // Add more URLs and resources you want to cache
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Return the cached response if available
                }
                // Try to fetch from the network
                return fetch(event.request).then(networkResponse => {
                    // Cache the response if it's a GET request to your API
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' || event.request.method !== 'GET') {
                        return networkResponse;
                    }
                    // Clone the response so we can cache one copy and return the other
                    var responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    return networkResponse;
                });
            })
    );
});

// Activate event to update the service worker and clean old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); // Delete old caches
                    }
                })
            );
        })
    );
});
