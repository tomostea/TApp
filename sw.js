const CACHE_NAME = "v2";

// キャッシュするファイルをセットする
const urlsToCache = [
  "/tapp/",
  "/tapp/index.html",
  "/tapp/index.js",
  "https://cdn.jsdelivr.net/npm/rxjs@latest/bundles/rxjs.umd.min.js",
  "https://cdn.jsdelivr.net/npm/ocrad.js@latest/ocrad.js",
  "https://cdn.jsdelivr.net/npm/simply-beautiful@latest",
  "https://cdn.jsdelivr.net/npm/exifreader@latest/dist/exif-reader.min.js",
  "https://cdn.jsdelivr.net/npm/@motardo/calc@latest/web/calc-global.js",
  "https://kilobtye.github.io/potrace/potrace.js",
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