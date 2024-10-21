const CACHE_NAME = 'static-cache-v1';
const STATIC_FILES = [
    '/static/css/root.css',
    '/static/css/index.css',
    '/static/js/service-worker.js',
    '/static/manifest.json',
    '/static/APP_Logo_Dark_Transparent.png',
    '/static/SliderImages/Image1.jpg',
    '/static/SliderImages/Image2.jpg',
    '/static/SliderImages/Image3.jpg',
    '/static/SliderImages/Image4.jpg',
    '/static/SliderImages/Image5.jpg',

    // Add any other static files you want to cache
];

// Install event: Cache all static files
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(STATIC_FILES);
        })
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event: Serve cached files if available, fall back to network
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Return the cached file if found
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
