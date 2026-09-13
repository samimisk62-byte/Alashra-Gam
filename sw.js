
const CACHE_NAME = "alashra-game-v1";

const FILES = [
  "./",
  "./index.html"
];

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME).then(cache => {

      return cache.addAll(FILES);

    })

  );

  self.skipWaiting();

});


self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys =>

      Promise.all(

        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))

      )

    )

  );

  self.clients.claim();

});


self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request).then(cached => {

      return cached || fetch(event.request);

    })

  );

});
