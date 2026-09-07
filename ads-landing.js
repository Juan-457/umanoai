(() => {
  const params = new URLSearchParams(window.location.search);
  const isPaidVisit = params.get('utm_source') === 'google' ||
    ['gclid', 'gbraid', 'wbraid'].some(key => params.has(key));
  if (!isPaidVisit || window.location.hash !== '#planes') return;

  let interacted = false;
  for (const type of ['wheel', 'touchstart', 'pointerdown', 'keydown']) {
    window.addEventListener(type, () => { interacted = true; }, {once: true, passive: true});
  }

  // Images above the target can move it after the browser's first fragment jump.
  const alignPlans = () => {
    if (interacted || window.location.hash !== '#planes') return;
    document.getElementById('planes')?.scrollIntoView({behavior: 'instant', block: 'start'});
  };
  if (document.readyState === 'complete') alignPlans();
  else window.addEventListener('load', alignPlans, {once: true});
})();
