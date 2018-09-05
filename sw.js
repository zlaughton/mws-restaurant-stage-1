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
      return (response ? response : fetch(event.request));
    })
  )
})
