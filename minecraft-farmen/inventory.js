function parseMaterial(text){
  const parts=text.split('|');
  const match=parts[0].trim().match(/^(\d+)\s*(?:[x×*]\s*|\s+)(.+)$/i);
  const quantity=match?Number(match[1]):1;
  const name=match?match[2].trim():parts[0].trim();
  const size=parts[1]===undefined?64:Number(parts[1].trim());
  if(!name||!Number.isSafeInteger(quantity)||quantity<1||quantity>1000000||![1,16,64].includes(size))throw Error('Material: „Anzahl × Name | Stackgröße“ verwenden. Menge: 1–1.000.000; Stackgröße: 1, 16 oder 64.');
  return {name,quantity,size,stacks:Math.floor(quantity/size),rest:quantity%size,slots:Math.ceil(quantity/size)};
}
function inventoryHTML(materials){
  if(!materials.length)return '<p class="notes">Noch keine Materialien eingetragen.</p>';
  let parsed;
  try{parsed=materials.map(m=>({...parseMaterial(m.text),done:m.done}))}catch{return '<p class="notes">Für die Inventaransicht bitte die Mengen im Materialfeld prüfen.</p>'}
  const total=parsed.reduce((sum,m)=>sum+m.slots,0);
  const slots=[];
  parsed.forEach(m=>{for(let i=0;i<m.slots&&slots.length<54;i++){
    const amount=Math.min(m.size,m.quantity-i*m.size);
    slots.push(`<div class="inventory-slot ${m.done?'collected':''}" title="${escapeHTML(m.name)}: ${amount} / ${m.size}" aria-label="${escapeHTML(m.name)}, ${amount} Stück"><span class="item-block" aria-hidden="true">▦</span><span class="slot-name">${escapeHTML(m.name)}</span><b>${amount}</b></div>`);
  }});
  while(slots.length%9)slots.push('<div class="inventory-slot blank" aria-hidden="true"></div>');
  return `<div class="inventory"><p class="inventory-title">▦ Material-Inventar <span>${total} Slots</span></p><div class="inventory-grid">${slots.join('')}</div>${total>54?`<p class="inventory-overflow">Vorschau: 54 von ${total} Slots. Alle Mengen stehen unten.</p>`:''}<ul class="stack-summary">${parsed.map(m=>`<li><strong>${escapeHTML(m.name)}</strong><span>${m.quantity.toLocaleString('de-DE')} Stück · ${m.stacks} ${m.size===1?'Slots':'Stacks'}${m.rest?' + '+m.rest+' Rest':''} <small>(${m.size} pro Slot)</small></span></li>`).join('')}</ul></div>`;
}
function refreshInventoryPreview(){
  renderMaterialRows();
  const field=$('#form').elements.materials;
  const active=$('#form').elements.materialView.value==='inventory';
  $('#inventory-preview').hidden=!active;
  field.setCustomValidity('');
  if(!active)return;
  const materials=field.value.split('\n').map(s=>s.trim()).filter(Boolean).map(text=>({text,done:false}));
  try{materials.forEach(m=>parseMaterial(m.text));$('#inventory-preview').innerHTML=inventoryHTML(materials)}catch(err){field.setCustomValidity(err.message);$('#inventory-preview').innerHTML=`<p class="inventory-error">${escapeHTML(err.message)}</p>`}
}
