// UBAH ANGKA INI SETIAP KALI UPDATE asatidzah.html (Misal: v2, v3, v4)
const CACHE_NAME = 'erapot-guru-v1.1'; 

const urlsToCache = [
  './',
  './asatidzah.html',
  './manifest_guru.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install Service Worker & Paksa Langsung Aktif
self.addEventListener('install', event => {
  self.skipWaiting(); // <--- Trik Rahasia 1: Paksa satpam ganti shift!
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aplikasi Asatidzah versi baru siap!');
        return cache.addAll(urlsToCache);
      })
  );
});

// Strategi: Ambil dari Internet dulu (Network First)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// Bersihkan Cache versi lama saat update
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Menghapus cache Guru jadul:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // <--- Trik Rahasia 2: Ambil alih layar HP user!
    })
  );
});
