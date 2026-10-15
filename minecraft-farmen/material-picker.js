const MATERIAL_CATALOG={
  'Baublöcke':[['Baublöcke',64]],
  'Redstone':[['Redstone-Staub',64],['Redstone-Fackel',64],['Redstone-Block',64],['Verstärker',64],['Komparator',64],['Beobachter',64],['Kolben',64],['Klebriger Kolben',64],['Werfer',64],['Spender',64],['Hebel',64],['Knopf',64],['Druckplatte',64],['Tageslichtsensor',64],['Zielblock',64]],
  'Transport & Lager':[['Trichter',64],['Truhe',64],['Redstone-Truhe',64],['Fass',64],['Schienen',64],['Antriebsschienen',64],['Sensorschienen',64],['Lore',1],['Trichterlore',1]],
  'Farm & Natur':[['Wassereimer',1],['Lavaeimer',1],['Eimer',16],['Erde',64],['Ackerboden',64],['Sand',64],['Seelensand',64],['Weizensamen',64],['Karotte',64],['Kartoffel',64],['Zuckerrohr',64],['Bambus',64],['Kaktus',64],['Knochenmehl',64],['Setzling',64],['Moosblock',64]],
  'Sonstiges':[['Falltür',64],['Tür',64],['Schild',16],['Bett',1],['Leiter',64],['Fackel',64],['Teppich',64],['Schleimblock',64],['Honigblock',64],['Obsidian',64],['Enderperle',16],['Spitzhacke',1],['Namensschild',64]]
};
let selectedGroup='Baublöcke';
function materialIcon(name){
  const red=/Redstone|Verstärker|Komparator|Zielblock/.test(name);
  const wood=/Holz|Truhe|Fass|Tür|Schild|Leiter|Zaun/.test(name);
  const green=/Erde|Farm|Samen|Karotte|Kartoffel|Zuckerrohr|Bambus|Kaktus|Setzling|Moos|Schleim/.test(name);
  let color=red?'#ae2929':wood?'#ac783f':green?'#709c3d':/Glas|Wasser|Eimer/.test(name)?'#78b9d0':/Honig|Sand|Fackel/.test(name)?'#d3b45e':'#93938e';
  let shape='<path d="M4 7h24v22H4z" fill="'+color+'"/><path d="M4 7h24v6H4z" fill="#ffffff35"/><path d="M22 13h6v16h-6z" fill="#0004"/><path d="M6 16h6v4H6zm9 7h5v4h-5zm0-9h4v4h-4z" fill="#0002"/>';
  if(/Trichter/.test(name))shape='<path d="M3 6h26v5l-9 10v7h-7V18L3 11z" fill="#71777b"/><path d="M5 7h22v4H5z" fill="#bdc2c3"/><path d="M14 20h5v8h-5z" fill="#454c50"/>';
  else if(/Truhe|Fass/.test(name))shape+='<path d="M4 14h24v3H4z" fill="#513a22"/><path d="M14 13h5v8h-5z" fill="#e3d799"/>';
  else if(/Staub/.test(name))shape='<path d="M12 4h7v6h7v6h4v7H19v6h-8v-7H3v-7h9z" fill="#b92b27"/><path d="M14 9h5v9h-5z" fill="#f47449"/>';
  else if(/Fackel|Hebel/.test(name))shape='<path d="M11 13h8v17h-8z" fill="#a37944"/><path d="M8 4h14v12H8z" fill="'+(red?'#c92e29':'#ffd95b')+'"/><path d="M11 4h6v7h-6z" fill="#fff4ac"/>';
  else if(/Samen|Knochenmehl/.test(name))shape='<path d="M6 7h7v7H6zm13-3h7v7h-7zM4 21h7v7H4zm12-5h7v7h-7z" fill="'+color+'"/>';
  else if(/Schienen/.test(name))shape='<path d="M5 2h5v28H5zm17 0h5v28h-5z" fill="#bdc1c0"/><path d="M3 5h26v4H3zm0 9h26v4H3zm0 9h26v4H3z" fill="#946438"/>';
  else if(/Eimer/.test(name))shape='<path d="M4 6h24v7l-4 16H8L4 13z" fill="#a5afb2"/><path d="M7 8h18v7H7z" fill="'+(/Wasser/.test(name)?'#3688dc':/Lava/.test(name)?'#ec792b':'#465257')+'"/><path d="M9 17h4v9H9z" fill="#dde5e5"/>';
  else if(/Beobachter|Werfer|Spender/.test(name))shape+='<path d="M8 15h5v5H8zm11 0h5v5h-5zm-6 8h8v3h-8z" fill="#282b29"/>';
  return '<svg viewBox="0 0 32 32" aria-hidden="true" shape-rendering="crispEdges">'+shape+'</svg>';
}
function populateMaterialOptions(){
  $('#material-tabs').innerHTML=Object.keys(MATERIAL_CATALOG).map(name=>'<button type="button" data-group="'+escapeHTML(name)+'" aria-pressed="'+(name===selectedGroup)+'">'+escapeHTML(name)+'</button>').join('');
  $('#material-tiles').innerHTML=MATERIAL_CATALOG[selectedGroup].map(([name,size])=>'<button type="button" class="material-tile" data-material="'+escapeHTML(name)+'">'+materialIcon(name)+'<span>+'+size+' '+escapeHTML(name)+'</span></button>').join('');

}
function addMaterialStack(name){
  const entry=MATERIAL_CATALOG[selectedGroup].find(item=>item[0]===name);
  if(!entry)return;
  const size=entry[1],lines=draftMaterials();
  const index=lines.findIndex(text=>{try{const m=parseMaterial(text);return m.name===name&&m.size===size}catch{return false}});
  const quantity=(index>=0?parseMaterial(lines[index]).quantity:0)+size;
  if(quantity>1000000){toast('Maximal 1.000.000 Stück pro Material.');return}
  if(index<0&&lines.length>=500){toast('Maximal 500 Materialien pro Farm.');return}
  const text=quantity+' × '+name+' | '+size;
  if(index>=0)lines[index]=text;else lines.push(text);
  writeDraft(lines);
  $('#material-feedback').textContent=name+': '+quantity.toLocaleString('de-DE')+' Stück';
}
function draftMaterials(){return $('#form').elements.materials.value.split('\n').map(s=>s.trim()).filter(Boolean)}
function renderMaterialRows(){
  $('#material-rows').innerHTML=draftMaterials().map((text,index)=>{
    let m;try{m=parseMaterial(text)}catch{m={name:text,quantity:1,size:64}}
    return `<div class="material-edit-row" data-row="${index}"><span class="material-edit-name">${materialIcon(m.name)}${escapeHTML(m.name)}</span><label>Menge<input type="number" min="1" max="1000000" step="1" value="${m.quantity}" data-edit="quantity" aria-label="Menge für ${escapeHTML(m.name)}"></label><label>Pro Stack<select data-edit="size" aria-label="Stack-Größe für ${escapeHTML(m.name)}">${[64,16,1].map(size=>`<option ${size===m.size?'selected':''}>${size}</option>`).join('')}</select></label><button type="button" data-remove="${index}" aria-label="${escapeHTML(m.name)} entfernen">✕</button></div>`;
  }).join('')||'<p class="notes">Noch keine Materialien. Wähle oben dein erstes Material aus.</p>';
}
function writeDraft(lines){$('#form').elements.materials.value=lines.join('\n');refreshInventoryPreview()}
function initMaterialPicker(){
  populateMaterialOptions();
  $('#material-tabs').onclick=e=>{const button=e.target.closest('[data-group]');if(!button)return;selectedGroup=button.dataset.group;populateMaterialOptions()};
  $('#material-tiles').onclick=e=>{const button=e.target.closest('[data-material]');if(button)addMaterialStack(button.dataset.material)};
  $('#material-rows').onclick=e=>{const button=e.target.closest('[data-remove]');if(!button)return;writeDraft(draftMaterials().filter((_,index)=>index!==Number(button.dataset.remove)))};
  $('#material-rows').onchange=e=>{
    if(!e.target.matches('[data-edit]'))return;
    const row=e.target.closest('[data-row]'),index=Number(row.dataset.row),lines=draftMaterials();
    let m;try{m=parseMaterial(lines[index])}catch{m={name:lines[index]}}
    const quantity=Number(row.querySelector('[data-edit="quantity"]').value),size=Number(row.querySelector('[data-edit="size"]').value);
    if(!Number.isSafeInteger(quantity)||quantity<1||quantity>1000000){toast('Bitte eine ganze Menge von 1 bis 1.000.000 wählen.');renderMaterialRows();return}
    lines[index]=`${quantity} × ${m.name} | ${size}`;writeDraft(lines);
  };
}