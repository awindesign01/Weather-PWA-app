const CACHE_NAME = "version-1";
const utlsToCache = ["index.html", "offline.html"];

// install SW
this.addEventListener("install", (e) => {
	e.waitUntil(
		caches.open(CACHE_NAME).then((res) => {
			console.log("opened cache");
			return res.addAll(utlsToCache);
		}),
	);
});

// listen for requests
this.addEventListener("fetch", (e) => {
	e.respondWith(
		caches.match(e.request).then((res) => {
			return fetch(e.request).catch(() => {
				caches.match("offline.html");
			});
		}),
	);
});

// activate the SW
this.addEventListener("activate", (e) => {
	const cacheWhiteList = [];
	cacheWhiteList.push(CACHE_NAME);

	e.waitUntil(caches.keys()).then((res) => {
		Promise.all(
			res.map((cacheName) => {
				if (!cacheWhiteList.includes(cacheName)) {
					return caches.delete(cacheName);
				}
			}),
		);
	});
});
