'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "2f5d573e18dd42013f5e38fd764256d9",
"assets/assets/audio/notif.mp3": "f7b7ad3c161d37d25ebcef935dec9136",
"assets/assets/fonts/helvetica-bold.ttf": "d13db1fed3945c3b8c3293bfcfadb32f",
"assets/assets/fonts/helvetica.ttf": "1b580d980532792578c54897ca387e2c",
"assets/assets/fonts/poppins-bold.ttf": "08c20a487911694291bd8c5de41315ad",
"assets/assets/fonts/poppins-regular.ttf": "093ee89be9ede30383f39a899c485a82",
"assets/assets/fonts/poppins-semi_bold.ttf": "6f1520d107205975713ba09df778f93f",
"assets/assets/icons/Aa.png": "7584aa84b42e6fad81473ef609aca9af",
"assets/assets/icons/add_person.png": "23f073e7286b72ab414687fe06345321",
"assets/assets/icons/add_person.svg": "7872c58d1b60632b686267b9ac526960",
"assets/assets/icons/dash.svg": "604bdfd881838ffc50d21d392e11457f",
"assets/assets/icons/first_drawer_item.svg": "65fe7c17229948484e4d942bd41271a9",
"assets/assets/icons/glass.png": "b74cf5965241b85768ff0114d69eba91",
"assets/assets/icons/hello.png": "e8b4479dccf9761b223e0b20b7bc5240",
"assets/assets/icons/help.svg": "aa39468bdfaf822375a8753f22d680bd",
"assets/assets/icons/hero.png": "9c0552b3a9733aa8b96da5111deae6e3",
"assets/assets/icons/home_image.png": "00e35dffc059c18982985b02d61b20ab",
"assets/assets/icons/logo.svg": "e1103a4792600764a1ac4418262ba707",
"assets/assets/icons/logo_login.svg": "abe88530cebf1434d146209eaef62361",
"assets/assets/icons/material.png": "492ac26ad6ef731eacb342477c87266c",
"assets/assets/icons/mini_logo.svg": "2a8f48273874b8a88074c15f9988ba3f",
"assets/assets/icons/neumo.png": "23b50f380b56ef4f24535058e5957c38",
"assets/assets/icons/second_drawer_item.svg": "10c8dfd1e0ac2c0ad5f61bb5d4bdd057",
"assets/assets/icons/switcher_checked.svg": "8c28f3cb71bfaa98ae42d6ff441ee97f",
"assets/assets/icons/switcher_locked.svg": "5cd98f575df4948b87a32d25ccb9ecef",
"assets/assets/icons/switcher_unchecked.svg": "cfbf1b352a1a67a04dbcbe3f01e89a40",
"assets/assets/icons/third_drawer_item.svg": "66b5183a424d84e8044dc774ffcf44d9",
"assets/FontManifest.json": "aff4955867b0174ddd395fa5261a7b41",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "eb73b8d0a581c5df4b1126ab3b90f818",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/flex_color_picker/assets/opacity.png": "49c4f3bcb1b25364bb4c255edcaaf5b2",
"assets/packages/flutter_dropzone_web/assets/flutter_dropzone.js": "0266ef445553f45f6e45344556cfd6fd",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "c15fb245e23c06c9579d855057c01635",
"/": "c15fb245e23c06c9579d855057c01635",
"main.dart.js": "ef6d110b957a18044ab0431e8ea80564",
"manifest.json": "7e2bf83d0867c1f2d278e4b76fabea01",
"version.json": "a7af282ac6c695b4f1efa7f4a871545f"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
