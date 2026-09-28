(() => {
  'use strict';
  const root = document.getElementById('recursos-ampliados');
  root.innerHTML = `
    <span class="eyebrow">De la clase a tu trabajo</span>
    <h2 id="recursos-clase">Recursos para aplicar mañana</h2>
    <p>Elegí un problema concreto, diseñá una prueba pequeña y medí qué cambió.</p>
    <nav aria-label="Bloques de recursos"><a href="#automatizacion">Automatización</a><a href="#bi">BI</a><a href="#integracion">Integración</a></nav>
    <section id="automatizacion"><h2>Automatización</h2>
      <p>Evento → acción → registro → aviso. Empezá por una tarea repetitiva, con reglas claras, suficiente volumen y un proceso estable.</p>
      <details><summary>Checklist: antes de automatizar</summary><ul>
        <li>¿Qué acción inicia el proceso y qué resultado esperamos?</li><li>¿Qué datos entran, de dónde salen y cuáles son obligatorios?</li><li>¿Qué regla decide el siguiente paso?</li><li>¿Qué excepción debe resolver una persona y quién es responsable?</li><li>¿Dónde se registra el resultado y cómo evitamos duplicados?</li>
      </ul><p>Primero observá cinco casos reales. Si cada uno requiere una decisión distinta, aclarar el proceso es el siguiente paso.</p><button type="button" data-download="checklist">Descargar checklist</button></details>
      <h3>¿RPA, automatización cloud o agente?</h3><ul>
        <li><strong>RPA:</strong> repetir pasos sobre una pantalla. Ejemplo: cargar un pedido en un sistema sin integración disponible. Prever mantenimiento si cambia la interfaz.</li>
        <li><strong>Cloud:</strong> conectar eventos y datos entre sistemas. Ejemplo: formulario → registro → asignación → aviso.</li>
        <li><strong>Agente:</strong> interpretar una consulta y utilizar herramientas dentro de límites. Ejemplo: pedir los datos faltantes y derivar una oportunidad con contexto.</li>
      </ul>
      <details><summary>Plantilla: diseñá tu primer agente</summary><ul><li><strong>Objetivo:</strong> ¿qué tarea debe hacer avanzar?</li><li><strong>Instrucciones:</strong> ¿qué pasos sigue y cuándo pregunta?</li><li><strong>Información:</strong> ¿qué fuentes puede consultar?</li><li><strong>Herramientas:</strong> ¿qué puede leer o registrar?</li><li><strong>Límites:</strong> ¿qué debe derivar a una persona?</li></ul><p><strong>Ejemplo:</strong> recibe una consulta por semillas, pide zona, cantidad y fecha, consulta información autorizada, registra la necesidad y avisa al vendedor. No confirma precios, stock ni descuentos sin validación.</p><button type="button" data-download="agente">Descargar plantilla de agente</button></details>
    </section>
    <section id="bi"><h2>Business Intelligence</h2><p>Pregunta → dato → decisión → acción. Antes de elegir un gráfico, definí qué decisión querés tomar.</p>
      <h3>Ocho preguntas para tu tablero</h3><ol>
        <li>¿Qué zonas concentran la venta neta?</li><li>¿En qué meses se concentra la facturación?</li><li>¿Qué clientes explican el 80% de las ventas?</li><li>¿Qué productos y presentaciones sostienen el negocio?</li><li>¿Cómo varía el precio del mismo producto, presentación y mes entre zonas?</li><li>¿Cómo se distribuyen las ventas por plazo y las notas de crédito?</li><li>¿Qué productos no compra un cliente pero sí otros de su zona?</li><li>¿Qué clientes llevan 90 días sin comprar al cierre del período?</li>
      </ol><p><a href="/datos-tablero-comercial.xlsx" download>Descargar Excel de práctica</a> · <a href="#prompt-10">Ir al prompt del tablero</a></p>
      <details><summary>Leé los datos antes de sacar conclusiones</summary><ul><li>Inspeccioná las hojas, las notas, el período y las columnas del archivo cargado; no supongas que coincide con el Excel de práctica.</li><li>Mostrá los nombres y valores exactamente como están en el archivo. No los anonimices ni reemplaces; si el archivo ya los trae anonimizados, dejalos así.</li><li>Conservá los signos y unidades que indiquen los datos; no sumes litros y kilos como si fueran una única unidad.</li><li>Excluí valores faltantes solo cuando la métrica lo requiera e informá el criterio.</li><li>Un cliente sin compra reciente es una señal para investigar; no demuestra por qué dejó de comprar.</li><li>No publiques datos comerciales en una página abierta sin autorización explícita.</li></ul></details>
      <h3>Del dato a la llamada</h3><p>Si un cliente lleva 90 días sin comprar, revisá su historial y la estacionalidad, prepará preguntas y llamalo. Registrá lo que confirmó: la hipótesis se convierte en información comercial.</p>
    </section>
    <section id="integracion"><h2>Integración</h2><p>Consulta → agente recopila contexto → IA prepara la visita → vendedor negocia → automatización registra → BI ayuda a elegir la próxima acción.</p>
      <h3>Mini desafío · 15 minutos</h3><p>En parejas o grupos de tres: elegí un problema en 3 minutos, diseñá la mejora en 8 y prepará una explicación en 4. Después compartí tu propuesta en 45 segundos.</p>
      <p class="muted">Tus respuestas quedan solo en esta pestaña hasta que descargues la ficha. No se envían al sitio. Usá ejemplos sin datos personales.</p>
      <form id="desafio-austral"></form>
      <div class="actions"><button type="button" data-download="desafio">Descargar mi propuesta</button><button type="button" id="print-resources">Imprimir / guardar PDF</button><button type="button" data-download="resumen">Descargar ficha de la clase</button></div>
      <p id="download-status" role="status"></p>
      <details><summary>Ver ejemplo resuelto: cotizaciones sin seguimiento</summary><p><strong>Problema:</strong> quedan cotizaciones sin retomar. <strong>Datos:</strong> fecha, cliente, estado, condiciones vigentes y vendedor responsable.</p><ol><li>Registrar la cotización enviada.</li><li>Detectar pendientes después del plazo que defina el equipo.</li><li>Verificar si hubo respuesta o cambió el estado.</li><li>Preparar un borrador con IA usando condiciones confirmadas.</li><li>El vendedor revisa, contacta y registra el resultado.</li></ol><p><strong>Intervención humana:</strong> descuentos, cambios de cantidad o condiciones. <strong>Medición:</strong> porcentaje con seguimiento y minutos de preparación, antes y después de probar con cinco casos.</p></details>
      <h3>Probá tu criterio · cinco situaciones</h3><p>Elegí una opción y mirá el razonamiento. Una solución real puede combinar herramientas.</p><div id="resource-quiz"></div>
      <h3>Tu primera semana</h3><ol><li><strong>Día 1:</strong> elegí una tarea y un responsable.</li><li><strong>Día 2:</strong> observá cinco casos y medí tiempo y errores actuales.</li><li><strong>Día 3:</strong> definí datos, reglas, herramienta y excepciones.</li><li><strong>Día 4:</strong> probá con cinco casos revisados por una persona.</li><li><strong>Día 5:</strong> compará resultados y decidí si ajustar, ampliar o detener la prueba.</li></ol>
      <p><strong>Para compartir:</strong> nuestro problema es… Usaríamos… porque… Una persona interviene cuando… Mediríamos…</p>
    </section>`;
  // Keep long material closed until the reader chooses a topic.
  document.querySelectorAll('.prompt-card').forEach(card => {
    const heading = card.querySelector(':scope > h2');
    if (!heading) return;
    const disclosure = document.createElement('details');
    disclosure.className = 'prompt-disclosure';
    const summary = document.createElement('summary');
    summary.innerHTML = heading.innerHTML;
    const badge = card.querySelector(':scope > .badge');
    const body = document.createElement('div');
    body.className = 'prompt-disclosure-body';
    Array.from(card.children).forEach(child => {
      if (child !== heading && child !== badge) body.append(child);
    });
    if (badge) body.prepend(badge);
    disclosure.append(summary, body);
    heading.replaceWith(disclosure);
  });
  root.querySelectorAll(':scope > section[id]').forEach(panel => {
    const heading = panel.querySelector(':scope > h2');
    if (!heading) return;
    const disclosure = document.createElement('details');
    disclosure.className = 'resource-panel';
    disclosure.id = panel.id;
    const summary = document.createElement('summary');
    summary.textContent = heading.textContent;
    const body = document.createElement('div');
    body.className = 'resource-panel-body';
    Array.from(panel.children).forEach(child => { if (child !== heading) body.append(child); });
    disclosure.append(summary, body);
    panel.replaceWith(disclosure);
  });
  // Direct links from the hero should reveal the requested material.
  function openHashTarget() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const disclosure = target.matches('details') ? target : target.closest('details');
    if (disclosure) disclosure.open = true;
  }
  window.addEventListener('hashchange', openHashTarget);
  openHashTarget();
  const fields = ['¿Qué problema queremos resolver?', '¿Qué información tenemos y qué falta?', '¿Qué herramienta elegiríamos y por qué?', '¿Cómo funcionaría? Escribí cinco pasos.', '¿Cuándo interviene una persona y quién?', '¿Cómo mediremos la mejora?', '¿Cuál es la primera prueba y cuándo la haríamos?'];
  const form = document.getElementById('desafio-austral');
  fields.forEach((label, i) => {const l = document.createElement('label'); l.htmlFor = 'desafio-'+i; l.textContent = label; const t = document.createElement('textarea'); t.id = l.htmlFor; t.maxLength = 4000; form.append(l,t);});
  form.addEventListener('submit', e => e.preventDefault());
  const cases = [
    ['Preparar preguntas antes de una visita.', 'IA', 'La IA organiza contexto y preguntas; el vendedor verifica y conduce la visita.'],
    ['Copiar un pedido a un sistema que solo se usa por pantalla.', 'Automatización / RPA', 'RPA puede repetir pasos estables; hay que controlar cambios de interfaz y duplicados.'],
    ['Entender consultas variadas y derivarlas con los datos necesarios.', 'Agente', 'Un agente puede preguntar, consultar y registrar dentro de límites; las excepciones se derivan.'],
    ['Detectar zonas con menor precio para el mismo producto y mes.', 'BI', 'BI permite comparar datos equivalentes y orientar una investigación comercial.'],
    ['Retomar cotizaciones: detectar pendientes y preparar un mensaje.', 'Combinación', 'Automatización detecta el pendiente, IA prepara un borrador y el vendedor valida el contacto.']
  ];
  cases.forEach(([question, correct, explanation], i) => {const box = document.createElement('div'); const heading = document.createElement('h3'); heading.textContent = (i+1)+'. '+question; const buttons = document.createElement('div'); buttons.className='actions'; const answer=document.createElement('p');answer.setAttribute('role','status'); ['IA','Automatización / RPA','Agente','BI','Combinación'].forEach(option => {const b=document.createElement('button');b.type='button';b.textContent=option;b.addEventListener('click',()=>{answer.className='answer';answer.textContent=(option===correct?'Bien elegido. ':'La opción principal que proponemos es '+correct+'. ')+explanation;});buttons.append(b);});box.append(heading,buttons,answer);document.getElementById('resource-quiz').append(box);});
  const sheets = {
    checklist: 'ANTES DE AUTOMATIZAR\n1. Evento y resultado esperado:\n2. Datos y fuente:\n3. Regla:\n4. Excepción y responsable humano:\n5. Registro y prevención de duplicados:\nPrueba: cinco casos. Medida inicial y posterior:',
    agente: 'MI PRIMER AGENTE\nObjetivo:\nInstrucciones:\nInformación autorizada:\nHerramientas permitidas:\nLímites y derivación humana:\nEjemplo: recopilar zona, cantidad y fecha; registrar y avisar al vendedor sin inventar condiciones.',
    resumen: 'FICHA PRÁCTICA · HERRAMIENTAS PARA LA GESTIÓN COMERCIAL\nIA: pensar y preparar.\nPrompt: rol + contexto + objetivo + respuesta + límites.\nAutomatización: evento → acción → registro → aviso.\nRPA: pasos en pantalla; cloud: conectar sistemas.\nAgente: objetivo + instrucciones + información + herramientas + límites.\nBI: pregunta → dato → decisión → acción.\nIntegración: consulta → contexto → venta → registro → aprendizaje.\nAntes de automatizar: acción, datos, regla, excepción humana y registro.\nPrimera semana: elegir, medir, diseñar, probar cinco casos, comparar.'
  };
  root.querySelectorAll('[data-download]').forEach(button => button.addEventListener('click', () => {const kind=button.dataset.download; const content=kind==='desafio' ? 'MI MEJORA COMERCIAL\n\n'+fields.map((f,i)=>f+'\n'+document.getElementById('desafio-'+i).value).join('\n\n') : sheets[kind];const url=URL.createObjectURL(new Blob(['\ufeff'+content],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='gestion-comercial-'+kind+'.txt';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);document.getElementById('download-status').textContent='Ficha preparada para descargar.';}));
  document.getElementById('print-resources').addEventListener('click',()=>window.print());
})();
