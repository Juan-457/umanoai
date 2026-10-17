(() => {
  // Atribución Ads: misma lógica y misma clave de sessionStorage que index.html,
  // para que el bot reciba el bloque "Tracking UmanoAI:" con el gclid.
  const ATTRIBUTION_KEYS = ['gclid', 'gbraid', 'wbraid', 'gad_source', 'gad_campaignid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const STORAGE_KEY = 'umanoai_attribution';

  const cleanValue = (value) => String(value || '').trim().slice(0, 500);

  const getAttribution = () => {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  };

  const captureAttribution = () => {
    const params = new URLSearchParams(window.location.search);
    const attribution = getAttribution();
    ATTRIBUTION_KEYS.forEach((key) => {
      const value = cleanValue(params.get(key));
      if (value) attribution[key] = value;
    });
    attribution.landing_page = attribution.landing_page || window.location.href;
    attribution.referrer = attribution.referrer || document.referrer || '';
    attribution.first_seen_at = attribution.first_seen_at || new Date().toISOString();
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    } catch {}
    return attribution;
  };

  const trackingLines = () => {
    const attribution = getAttribution();
    const lines = [];
    ATTRIBUTION_KEYS.forEach((key) => {
      if (attribution[key]) lines.push(key + ': ' + attribution[key]);
    });
    if (attribution.landing_page) lines.push('landing: ' + attribution.landing_page);
    if (attribution.referrer) lines.push('referrer: ' + attribution.referrer);
    return lines;
  };

  const buildWhatsAppHref = (href) => {
    let url;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return href;
    }
    const lines = trackingLines();
    if (!lines.length) return href;
    const base = String(url.searchParams.get('text') || '').split('\n\nTracking UmanoAI:')[0].trim();
    url.searchParams.set('text', (base + '\n\nTracking UmanoAI:\n' + lines.join('\n')).slice(0, 1800));
    return url.toString();
  };

  const pushWhatsAppClick = (link) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'whatsapp_click_contact',
      page_path: window.location.pathname,
      link_text: (link.textContent || '').trim().slice(0, 120),
      link_url: link.href,
      open_in_new_tab: link.target === '_blank'
    });
  };

  captureAttribution();

  document.querySelectorAll('a[href*="wa.me"],a[href*="api.whatsapp.com"]').forEach((link) => {
    const baseHref = link.dataset.baseWaHref || link.href;
    link.dataset.baseWaHref = baseHref;
    link.href = buildWhatsAppHref(baseHref);
    link.addEventListener('click', () => pushWhatsAppClick(link));
  });
})();
