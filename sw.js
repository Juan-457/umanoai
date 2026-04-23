const CACHE = 'umanoai-v1'
const STATIC = [
  '/',
  '/umanoai.png',
  '/fondo.png',
  '/favicon.ico',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/logo-cabana-alpina.png',
  '/logo-mauregui.png',
  '/logo-dsacine.jpg',
  '/logo-patricia-sebelli.png',
  '/logo-digiagro.png',
  '/logo-cleanpaz.png',
  '/logo-lodetita.png',
  '/logo-lectura-saludable.jpg',
  '/analytics.png',
]

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)))
  self.skipWaiting()
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', e => {
  const { request } = e
  const url = new URL(request.url)

  // Cache-first: images and fonts
  if (request.destination === 'image' || request.destination === 'font') {
    e.respondWith(
      caches.match(request).then(cached =>
        cached || fetch(request).then(res => {
          caches.open(CACHE).then(c => c.put(request, res.clone()))
          return res
        })
      )
    )
    return
  }

  // Network-first: HTML navigation
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request).catch(() => caches.match('/'))
    )
    return
  }

  // Stale-while-revalidate: same-origin assets
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(request).then(cached => {
        const network = fetch(request).then(res => {
          caches.open(CACHE).then(c => c.put(request, res.clone()))
          return res
        })
        return cached || network
      })
    )
  }
})
