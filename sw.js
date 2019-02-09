---
---

const version = '{{ site.time | date: '%Y%m%d%H%M%S' }}';
const staticCacheName = `brightpixels-${version}`;

console.log("installing service worker");

const filesToCache = [
  '404.html',
  '/about/',
  '/archive/',
  '/reviews/',
  '/subscribe/',
  '/offline/',
  '/',

  {% for post in site.posts limit: 3 %}
  '{{ post.url }}',
  {% endfor %}

  // can be automated rather than manual entries
  "https://gravatar.com/avatar/febbffcb54abe1be1435720fc2268237?s=100",
  "/assets/stylesheets/global.css",
  "/assets/app.js"
];


self.addEventListener("install", function (e) {
  self.skipWaiting();

  e.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  )
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith("brightpixels-")
            && cacheName != staticCacheName;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      )
    })
  )
});

self.addEventListener("fetch", function (e) {
  let request = e.request;


  if (request.method !== 'GET') {
    e.respondWith(fetch(request));
    return;
  }

  if (request.headers.get('Accept').indexOf('text/html') !== -1) {
    e.respondWith(
      fetch(request).catch(function(error) {
        return caches.match(request);
      })
    );
    return;
  }

  e.respondWith(
    caches.match(request).then(function (response) {
      return response || fetch(request);
    })
  )
});
