# UmanoAI

Sitio web estatico de UmanoAI con landing principal, variantes por idioma, paginas de servicios y contenidos de soporte orientados a automatizacion, desarrollo web y analitica.

## Contenido

- `index.html`, `index-en.html`, `index-pt.html`: landing principal en ES, EN y PT.
- `analytics.html`, `desarrollo-web.html`, `soluciones.html`, `recursos.html`, `politica.html`: paginas de contenido y conversion.
- `barberia.html`, `bots-whatsapp-empresas-argentina.html`, `voicebot-atencion-telefonica-ia.html`: landings verticales.
- `llms.txt`, `llms-full.txt`, `ai-index.md`: contexto orientado a LLMs y agentes.
- `analytics.json`, `eventosclaves.json`, `historico_eventos.json`: salidas sincronizadas de analitica.
- `scripts/update_analytics.py`: script para actualizar datos de GA4.
- `CNAME`, `site.webmanifest`, `sitemap.xml`: configuracion de dominio y SEO/PWA.

## Stack

- HTML estatico
- CSS y JS embebidos o simples
- Assets locales (`.png`, `.jpg`, `.mp4`)
- Python para sincronizacion automatica de analitica

No hay paso de build para el sitio principal.

## Verlo localmente

```bash
cd umanoai
python3 -m http.server 8000
```

Abrir `http://localhost:8000`.

## Deploy

El sitio esta pensado para hosting estatico. Mantener:

- `CNAME` si se usa dominio personalizado
- `site.webmanifest` y favicons
- rutas relativas a videos, logos y paginas secundarias

## Automatizacion de analitica

El repositorio incluye automatizacion en GitHub Actions para sincronizar archivos de GA4.

Archivos principales:

- `.github/workflows/ga4-sync.yml`
- `scripts/update_analytics.py`

Variables y secrets esperados en GitHub:

- `GA_SERVICE_ACCOUNT_JSON` como secret obligatorio
- `GA4_PROPERTY_ID` como variable opcional
- `GA4_WAIT_SECONDS` como variable opcional

La automatizacion actualiza JSONs y hace commit solo cuando detecta cambios.
