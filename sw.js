self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('restaurant-reviews').then(cache => {
      cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js'
      ])
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return (response ? response : fetch(event.request))
    })
      // Cache any new requests. Used from https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker
    .then(response => {
      return caches.open('restaurant-reviews').then(cache => {
        cache.put(event.request.url, response.clone());
        return response;
      })
    })
  )
})
