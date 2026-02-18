# UmanoAI — Sitio web

Este repositorio contiene el sitio web de UmanoAI, con landing pages en español, inglés y portugués, además de páginas de soporte para servicios, políticas y analíticas. El objetivo del sitio es presentar los servicios de bots conversacionales, automatización de procesos, desarrollo web y analítica/BI para pymes y negocios de servicios.

## Contenido principal

- **Landing pages multilenguaje**: `index.html` (ES), `index-en.html` (EN) y `index-pt.html` (PT).
- **Páginas de servicios y contenidos**: `analytics.html`, `desarrollo-web.html`, `newwebsite.html`, `politica.html`, entre otras.
- **Recursos estáticos**: imágenes de clientes, logos, favicons, videos de hero, y assets para PWA.
- **Metadatos para IA/LLMs**: las landings incluyen meta tags orientadas a descubrimiento por agentes y el archivo `llms.txt` en la raíz para contexto estructurado.

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
├── llms.txt
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

## Automatización de analíticas con GitHub Actions (reemplazo de n8n)

Se reemplazó el flujo de n8n por un workflow de GitHub Actions que:

1. Consulta GA4 para generar `eventosclaves.json`.
2. Espera 60 segundos (configurable).
3. Consulta GA4 para generar `analytics.json`.
4. Hace commit/push automático solo si hubo cambios.

### Archivos involucrados

- Workflow: `.github/workflows/ga4-sync.yml`
- Script: `scripts/update_analytics.py`

### Configuración requerida en GitHub

- **Secret**: `GA_SERVICE_ACCOUNT_JSON`
  - Debe contener el JSON completo de la Service Account con acceso de lectura a GA4.
- **Variable opcional**: `GA4_PROPERTY_ID`
  - Valor por defecto: `514206699`
- **Variable opcional**: `GA4_WAIT_SECONDS`
  - Valor por defecto: `60`

Podés ejecutar el flujo manualmente desde **Actions → Sync GA4 analytics → Run workflow**, o dejarlo correr cada hora por cron.


#### Qué poner exactamente en `GA_SERVICE_ACCOUNT_JSON`

Este secret debe ser **el JSON completo** de tu Service Account (en una sola línea o multilínea). Las claves habituales son:

- `type`
- `project_id`
- `private_key_id`
- `private_key`
- `client_email`
- `client_id`
- `auth_uri`
- `token_uri`
- `auth_provider_x509_cert_url`
- `client_x509_cert_url`
- `universe_domain`

Ejemplo (con valores ficticios):

```json
{
  "type": "service_account",
  "project_id": "mi-proyecto",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n",
  "client_email": "ga-reader@mi-proyecto.iam.gserviceaccount.com",
  "client_id": "12345678901234567890",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/...",
  "universe_domain": "googleapis.com"
}
```

> Importante: si lo pegás en una sola línea en GitHub Secret, respetá los `\n` dentro de `private_key`.

#### Resumen de Secrets y Variables en GitHub

- **Secret obligatorio**
  - `GA_SERVICE_ACCOUNT_JSON`: JSON completo de la Service Account.
- **Variables opcionales**
  - `GA4_PROPERTY_ID`: ID numérico de la propiedad GA4 (default `514206699`).
  - `GA4_WAIT_SECONDS`: espera entre consultas (default `60`).
