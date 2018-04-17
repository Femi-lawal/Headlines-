var staticCacheName = 'headcache-1'

self.addEventListener('install', function(event) {
  event.waitUntil(
	caches.open(staticCacheName).then(function(cache) {
		return cache.addAll([
			'/',
			'/views/news.ejs',
			'https://newsapi.org/v2/top-headlines?country=br&apiKey=70ad537a29864684ac59fe0222ee629c',
			'https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=70ad537a29864684ac59fe0222ee629c'
			]);

		})
  	);
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
  	caches.match(event.request).then(function(response) {
  		if(response) return response;
  		return fetch(event.request);
  	})
  	);
}); 

// versions
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) { 
		  return Promise.all(
			cacheNames.filter(function(cacheName) {
				return cacheName.startsWith('headcache-') &&
					cacheName != staticCacheName;
			}).map(function(cacheName) {
				return cache.delete(cacheName);
			})
		);
	})
);
});

//skeleton
self.addEventListener('fetch', function(event) {
	var requestUrl = new URL(event.request.url);

	if (requestUrl.origin === location.origin) {
		if (requestUrl.pathname === '/') {
			event.respondWith(caches.match('/skeleton'));
			retrun;
		}

	}
})







self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});