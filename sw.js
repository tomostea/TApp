const CACHE_NAME = "v8";

// キャッシュするファイルをセットする
const urlsToCache = [
  "/TApp/",
  "/TApp/index.html",
  "/TApp/index.js",
  "https://cdn.jsdelivr.net/npm/ocrad.js@latest/ocrad.js",
  "https://cdn.jsdelivr.net/npm/simply-beautiful@latest",
  "https://cdn.jsdelivr.net/npm/exifreader@latest/dist/exif-reader.min.js",
  "https://cdn.jsdelivr.net/npm/@motardo/calc@latest/web/calc-global.js",
  "https://kilobtye.github.io/potrace/potrace.js",
  "https://cdn.jsdelivr.net/npm/three@latest/build/three.min.js",
  "https://cdn.jsdelivr.net/npm/three@latest/examples/js/loaders/GLTFLoader.js",
  "https://cdn.jsdelivr.net/npm/three@latest/examples/js/controls/OrbitControls.js",
  "https://li-na.github.io/mozjpeg.js/js/jpegtran.min.js",
  "https://li-na.github.io/optipng.js/js/optipng.min.js"
];

// インストール
self.addEventListener('install', function (e) {
  console.info('install', e);
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 画像をキャッシュ対象に追加
      cache.addAll(urlsToCache)
    })
  )
});

// フェッチ
self.addEventListener('fetch', function (e) {
  console.info('fetch', e);
  e.respondWith(
    caches.match(e.request)
      .then(function (response) {
        // キャッシュがあったのでそのレスポンスを返す
        if (response) {
          console.info(`Using cache: ${e.request.url}`);
          return response;
        }
        return fetch(e.request);
      }
      )
  );
});