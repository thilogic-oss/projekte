const $=s=>document.querySelector(s);
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let overlayFarm,overlayStorage;
function cleanFarm(f){if(!f||typeof f.id!=='string'||typeof f.name!=='string'||!Array.isArray(f.materials)||f.materials.length>500)throw Error('Ungültige Farm');return {id:f.id.slice(0,100),name:f.name.slice(0,100),materials:f.materials.map(m=>{if(typeof m.text!=='string'||m.text.length>1000)throw Error('Ungültiges Material');parseMaterial(m.text);return {text:m.text,done:m.done===true}})}}
function drawOverlay(){const f=overlayFarm;$('#overlay-root').innerHTML=`<section class="stream-panel"><h2>${escapeHTML(f.name)}</h2><p class="stream-progress">${f.materials.filter(m=>m.done).length} / ${f.materials.length} Materialien bereit</p>${f.materials.map((m,i)=>{const p=parseMaterial(m.text);return `<label class="stream-item ${m.done?'done':''}"><input type="checkbox" data-index="${i}" ${m.done?'checked':''}>${materialIcon(p.name)}<span><strong>${escapeHTML(p.name)}</strong><small>${p.quantity.toLocaleString('de-DE')} Stück · ${p.stacks} Stacks${p.rest?' + '+p.rest+' Rest':''} (${p.size} pro Stack)</small></span></label>`}).join('')||'<p>Keine Materialien vorhanden.</p>'}${costsHTML(f.materials)}</section>`}
try{
 overlayFarm=cleanFarm(JSON.parse(decodeURIComponent(location.hash.slice(1))));
 // Keep independent snapshot links independent, while remembering checkmarks on reload.
 let hash=0;for(const char of location.hash)hash=(Math.imul(hash,31)+char.charCodeAt(0))|0;
 overlayStorage='farmbuch-overlay-'+overlayFarm.id+'-'+hash;
 try{const saved=localStorage.getItem(overlayStorage);if(saved)overlayFarm=cleanFarm(JSON.parse(saved))}catch{}
 if(new URLSearchParams(location.search).get('clean')==='1')$('#overlay-controls').hidden=true;
 drawOverlay();
 $('#overlay-root').onchange=e=>{if(!e.target.matches('input[data-index]'))return;const index=Number(e.target.dataset.index),before=overlayFarm.materials[index].done;overlayFarm.materials[index].done=e.target.checked;try{localStorage.setItem(overlayStorage,JSON.stringify(overlayFarm));const stored=JSON.parse(localStorage.getItem('farmbuch-v1')||'[]');const current=stored.find(f=>f.id===overlayFarm.id);if(current&&current.materials.map(m=>m.text).join('\n')===overlayFarm.materials.map(m=>m.text).join('\n')){current.materials[index].done=e.target.checked;localStorage.setItem('farmbuch-v1',JSON.stringify(stored))}drawOverlay()}catch{overlayFarm.materials[index].done=before;e.target.checked=before;$('#message').textContent='Speichern fehlgeschlagen.'}};
 window.addEventListener('storage',e=>{try{if(e.key===overlayStorage&&e.newValue){overlayFarm=cleanFarm(JSON.parse(e.newValue));drawOverlay()}if(e.key==='farmbuch-v1'&&e.newValue){const f=JSON.parse(e.newValue).find(f=>f.id===overlayFarm.id);if(f){overlayFarm=cleanFarm(f);drawOverlay()}}}catch{}});
 $('#copy').onclick=async()=>{const url=overlayURL(overlayFarm,true);try{await navigator.clipboard.writeText(url);$('#message').textContent='OBS-Link kopiert.'}catch{prompt('Diesen Link als OBS-Browserquelle verwenden:',url)}};
}catch{$('#overlay-root').innerHTML='<p class="stream-error">Kein gültiger Farm-Link. Öffne in deinem Farmbuch bei einer Farm „Stream-Overlay“.</p>'}
