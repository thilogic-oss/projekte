const MATERIAL_CATALOG={
  'Baublöcke':[['Build-Blöcke',64],['Stein',64],['Bruchstein',64],['Tiefenschiefer',64],['Erde',64],['Glas',64],['Glasplatten',64],['Holzbretter',64],['Holzstämme',64],['Steinziegel',64],['Halbstufen',64],['Treppen',64],['Zäune',64],['Mauern',64]],
  'Redstone':[['Redstone-Staub',64],['Redstone-Fackel',64],['Redstone-Block',64],['Verstärker',64],['Komparator',64],['Beobachter',64],['Kolben',64],['Klebriger Kolben',64],['Werfer',64],['Spender',64],['Hebel',64],['Knopf',64],['Druckplatte',64],['Tageslichtsensor',64],['Zielblock',64]],
  'Transport & Lager':[['Trichter',64],['Truhe',64],['Redstone-Truhe',64],['Fass',64],['Schienen',64],['Antriebsschienen',64],['Sensorschienen',64],['Lore',1],['Trichterlore',1]],
  'Farm & Natur':[['Wassereimer',1],['Lavaeimer',1],['Eimer',16],['Erde',64],['Ackerboden',64],['Sand',64],['Seelensand',64],['Weizensamen',64],['Karotte',64],['Kartoffel',64],['Zuckerrohr',64],['Bambus',64],['Kaktus',64],['Knochenmehl',64],['Setzling',64],['Moosblock',64]],
  'Sonstiges':[['Falltür',64],['Tür',64],['Schild',16],['Bett',1],['Leiter',64],['Fackel',64],['Teppich',64],['Schleimblock',64],['Honigblock',64],['Obsidian',64],['Enderperle',16],['Spitzhacke',1],['Namensschild',64]]
};
function populateMaterialOptions(){
  const entries=MATERIAL_CATALOG[$('#material-group').value];
  $('#material-item').innerHTML=entries.map(([name,size])=>`<option value="${escapeHTML(name)}" data-stack="${size}">${escapeHTML(name)}</option>`).join('')+'<option value="__custom">Eigenes Material …</option>';
  updateMaterialChoice();
}
function updateMaterialChoice(){
  const own=$('#material-item').value==='__custom';
  $('#custom-material-label').hidden=!own;
  const option=$('#material-item').selectedOptions[0];
  $('#material-stack').value=own?'64':option.dataset.stack;
}
function draftMaterials(){return $('#form').elements.materials.value.split('\n').map(s=>s.trim()).filter(Boolean)}
function renderMaterialRows(){
  $('#material-rows').innerHTML=draftMaterials().map((text,index)=>{
    let m;try{m=parseMaterial(text)}catch{m={name:text,quantity:1,size:64}}
    return `<div class="material-edit-row" data-row="${index}"><span class="material-edit-name">${escapeHTML(m.name)}</span><label>Menge<input type="number" min="1" max="1000000" step="1" value="${m.quantity}" data-edit="quantity" aria-label="Menge für ${escapeHTML(m.name)}"></label><label>Pro Stack<select data-edit="size" aria-label="Stack-Größe für ${escapeHTML(m.name)}">${[64,16,1].map(size=>`<option ${size===m.size?'selected':''}>${size}</option>`).join('')}</select></label><button type="button" data-remove="${index}" aria-label="${escapeHTML(m.name)} entfernen">✕</button></div>`;
  }).join('')||'<p class="notes">Noch keine Materialien. Wähle oben dein erstes Material aus.</p>';
}
function writeDraft(lines){$('#form').elements.materials.value=lines.join('\n');refreshInventoryPreview()}
function initMaterialPicker(){
  $('#material-group').innerHTML=Object.keys(MATERIAL_CATALOG).map(name=>`<option>${escapeHTML(name)}</option>`).join('');
  populateMaterialOptions();
  $('#material-group').onchange=populateMaterialOptions;
  $('#material-item').onchange=updateMaterialChoice;
  $('#material-add').onclick=()=>{
    const name=$('#material-item').value==='__custom'?$('#material-custom').value.trim():$('#material-item').value;
    const quantity=Number($('#material-quantity').value),size=Number($('#material-stack').value);
    if(!name||name.length>100||/[\n\r|]/.test(name)){toast('Bitte einen Materialnamen mit maximal 100 Zeichen eingeben.');return}
    if(!Number.isSafeInteger(quantity)||quantity<1||quantity>1000000){toast('Bitte eine ganze Menge von 1 bis 1.000.000 wählen.');return}
    const lines=draftMaterials();if(lines.length>=500){toast('Maximal 500 Materialien pro Farm.');return}
    lines.push(`${quantity} × ${name} | ${size}`);writeDraft(lines);
  };
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
