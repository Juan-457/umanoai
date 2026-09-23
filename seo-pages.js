(() => {
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

  document.querySelectorAll('a[href*="wa.me"],a[href*="api.whatsapp.com"]').forEach((link) => {
    link.addEventListener('click', () => pushWhatsAppClick(link));
  });
})();
