self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('OpenPassMes-V0.1').then((cache) => {
        return cache.addAll([
          '/', // Cache homepage
          '/static/css/base.css', // Cache CSS
          '/static/css/root.css'  // Cache JavaScript
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  