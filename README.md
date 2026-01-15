# UmanoAI — Sitio web

Este repositorio contiene el sitio web de UmanoAI, con landing pages en español, inglés y portugués, además de páginas de soporte para servicios, políticas y analíticas. El objetivo del sitio es presentar los servicios de bots conversacionales, automatización de procesos, desarrollo web y analítica/BI para pymes y negocios de servicios.

## Contenido principal

- **Landing pages multilenguaje**: `index.html` (ES), `index-en.html` (EN) y `index-pt.html` (PT).
- **Páginas de servicios y contenidos**: `analytics.html`, `desarrollo-web.html`, `newwebsite.html`, `politica.html`, entre otras.
- **Recursos estáticos**: imágenes de clientes, logos, favicons, videos de hero, y assets para PWA.

## Estructura del repositorio

```
.
├── index.html
├── index-en.html
├── index-pt.html
├── analytics.html
├── desarrollo-web.html
├── newwebsite.html
├── politica.html
├── *.png / *.jpg / *.mp4
└── site.webmanifest
```

## Cómo verlo localmente

Al ser un sitio estático, podés abrir `index.html` directamente en tu navegador o levantar un servidor local:

```bash
python -m http.server 8000
```

Luego abrí <http://localhost:8000> en el navegador.

## Deploy

El sitio está pensado para ser servido como estático (por ejemplo, GitHub Pages, Netlify o un hosting propio). Asegurate de mantener la raíz del dominio apuntando a este repositorio y de conservar el archivo `CNAME` si usás un dominio personalizado.
