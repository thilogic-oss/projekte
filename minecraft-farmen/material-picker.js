const MATERIAL_CATALOG={
  'Baublöcke':[['Baublöcke',64]],
  'Redstone':[['Redstone-Staub',64],['Redstone-Fackel',64],['Redstone-Block',64],['Verstärker',64],['Komparator',64],['Beobachter',64],['Kolben',64],['Klebriger Kolben',64],['Werfer',64],['Spender',64],['Hebel',64],['Knopf',64],['Druckplatte',64],['Tageslichtsensor',64],['Zielblock',64]],
  'Transport & Lager':[['Trichter',64],['Truhe',64],['Redstone-Truhe',64],['Fass',64],['Schienen',64],['Antriebsschienen',64],['Sensorschienen',64],['Lore',1],['Trichterlore',1]],
  'Farm & Natur':[['Wassereimer',1],['Lavaeimer',1],['Eimer',16],['Erde',64],['Ackerboden',64],['Sand',64],['Seelensand',64],['Weizensamen',64],['Karotte',64],['Kartoffel',64],['Zuckerrohr',64],['Bambus',64],['Kaktus',64],['Knochenmehl',64],['Setzling',64],['Moosblock',64]],
  'Sonstiges':[['Falltür',64],['Tür',64],['Schild',16],['Bett',1],['Leiter',64],['Fackel',64],['Teppich',64],['Schleimblock',64],['Honigblock',64],['Obsidian',64],['Enderperle',16],['Spitzhacke',1],['Namensschild',64]]
};
let selectedGroup='Baublöcke';
const MATERIAL_ART={
  "Baublöcke": "STONE",
  "Build-Blöcke": "STONE",
  "Redstone-Staub": "REDSTONE",
  "Redstone-Fackel": "REDSTONE_TORCH",
  "Redstone-Block": "REDSTONE_BLOCK",
  "Verstärker": "REPEATER",
  "Komparator": "COMPARATOR",
  "Beobachter": "OBSERVER",
  "Kolben": "PISTON",
  "Klebriger Kolben": "STICKY_PISTON",
  "Werfer": "DROPPER",
  "Spender": "DISPENSER",
  "Hebel": "LEVER",
  "Knopf": "STONE_BUTTON",
  "Druckplatte": "STONE_PRESSURE_PLATE",
  "Tageslichtsensor": "DAYLIGHT_DETECTOR",
  "Zielblock": "TARGET",
  "Trichter": "HOPPER",
  "Truhe": "CHEST",
  "Redstone-Truhe": "TRAPPED_CHEST",
  "Fass": "BARREL",
  "Schienen": "RAIL",
  "Antriebsschienen": "POWERED_RAIL",
  "Sensorschienen": "DETECTOR_RAIL",
  "Lore": "MINECART",
  "Trichterlore": "HOPPER_MINECART",
  "Wassereimer": "WATER_BUCKET",
  "Lavaeimer": "LAVA_BUCKET",
  "Eimer": "BUCKET",
  "Erde": "DIRT",
  "Ackerboden": "FARMLAND",
  "Sand": "SAND",
  "Seelensand": "SOUL_SAND",
  "Weizensamen": "WHEAT_SEEDS",
  "Karotte": "CARROT",
  "Kartoffel": "POTATO",
  "Zuckerrohr": "SUGAR_CANE",
  "Bambus": "BAMBOO",
  "Kaktus": "CACTUS",
  "Knochenmehl": "BONE_MEAL",
  "Setzling": "OAK_SAPLING",
  "Moosblock": "MOSS_BLOCK",
  "Falltür": "OAK_TRAPDOOR",
  "Tür": "OAK_DOOR",
  "Schild": "OAK_SIGN",
  "Bett": "RED_BED",
  "Leiter": "LADDER",
  "Fackel": "TORCH",
  "Teppich": "WHITE_CARPET",
  "Schleimblock": "SLIME_BLOCK",
  "Honigblock": "HONEY_BLOCK",
  "Obsidian": "OBSIDIAN",
  "Enderperle": "ENDER_PEARL",
  "Spitzhacke": "IRON_PICKAXE",
  "Namensschild": "NAME_TAG",
  "Stein": "STONE",
  "Glas": "GLASS",
  "Glasplatten": "GLASS_PANE"
};
function materialIcon(name){
 const id=MATERIAL_ART[name]||'STONE';
 return '<span class="material-art"><img src="https://raw.githubusercontent.com/Owen1212055/mc-assets/bc96011714c0eb3770bd641a3b86459ad5f860c7/item-assets/'+id+'.png" alt="" loading="lazy" width="64" height="64" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span hidden aria-hidden="true">▦</span></span>';
}
const materialAmounts={};
function clickAmount(name,size){return materialAmounts[name]??size}
function adjustMaterialAmount(button,delta){
 const name=button.dataset.material;
 const size=MATERIAL_CATALOG[selectedGroup].find(m=>m[0]===name)[1];
 materialAmounts[name]=Math.max(0,Math.min(64,clickAmount(name,size)+delta));
 button.lastElementChild.textContent='+'+materialAmounts[name]+' '+name;
 button.setAttribute('aria-label','+'+materialAmounts[name]+' '+name);
}
function populateMaterialOptions(){
  $('#material-tabs').innerHTML=Object.keys(MATERIAL_CATALOG).map(name=>'<button type="button" data-group="'+escapeHTML(name)+'" aria-pressed="'+(name===selectedGroup)+'">'+escapeHTML(name)+'</button>').join('');
  $('#material-tiles').innerHTML=MATERIAL_CATALOG[selectedGroup].map(([name,size])=>'<button type="button" class="material-tile" data-material="'+escapeHTML(name)+'">'+materialIcon(name)+'<span>+'+clickAmount(name,size)+' '+escapeHTML(name)+'</span></button>').join('');

}
function addMaterialStack(name){
  const entry=MATERIAL_CATALOG[selectedGroup].find(item=>item[0]===name);
  if(!entry)return;
  const size=entry[1],amount=clickAmount(name,size),lines=draftMaterials();
  if(!amount)return;
  const index=lines.findIndex(text=>{try{const m=parseMaterial(text);return m.name===name&&m.size===size}catch{return false}});
  const quantity=(index>=0?parseMaterial(lines[index]).quantity:0)+amount;
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
  $('#material-tiles').addEventListener('wheel',e=>{const button=e.target.closest('[data-material]');if(!button||!e.deltaY)return;e.preventDefault();adjustMaterialAmount(button,e.deltaY<0?1:-1)},{passive:false});
  $('#material-tiles').addEventListener('keydown',e=>{const button=e.target.closest('[data-material]');if(button&&['ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();adjustMaterialAmount(button,e.key==='ArrowUp'?1:-1)}});
  $('#inventory-preview').addEventListener('click',removeInventoryStack);
  $('#cards').addEventListener('click',removeInventoryStack);
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

function removeInventoryStack(e){
 const button=e.target.closest('[data-remove-stack]');if(!button)return;
 const index=Number(button.dataset.removeStack),amount=Number(button.dataset.amount);
 const preview=button.closest('#inventory-preview');
 const card=button.closest('.card');
 const lines=preview?draftMaterials():farms.find(f=>f.id===card?.dataset.id)?.materials.map(m=>m.text);
 if(!lines||!lines[index])return;
 const m=parseMaterial(lines[index]),remaining=m.quantity-amount;
 if(preview){if(remaining>0)lines[index]=remaining+' × '+m.name+' | '+m.size;else lines.splice(index,1);writeDraft(lines)}
 else{const next=farms.map(f=>f.id!==card.dataset.id?f:{...f,materials:f.materials.flatMap((material,i)=>i!==index?[material]:remaining>0?[{...material,text:remaining+' × '+m.name+' | '+m.size}]:[])});if(!save(next))return}
 toast(amount+' × '+m.name+' entfernt.');
}
