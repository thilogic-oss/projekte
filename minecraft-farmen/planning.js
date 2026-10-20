// Crafting ingredients per recipe batch; items without a recipe remain explicit.
const FARM_RECIPES={
 'Trichter':{out:1,items:{'Eisenbarren':5,'Truhe':1}},
 'Hopper':{out:1,items:{'Eisenbarren':5,'Truhe':1}},
 'Truhe':{out:1,items:{'Holzbretter':8}},
 'Kolben':{out:1,items:{'Eisenbarren':1,'Holzbretter':3,'Bruchstein':4,'Redstone-Staub':1}},
 'Klebriger Kolben':{out:1,items:{'Kolben':1,'Schleimball':1}},
 'Beobachter':{out:1,items:{'Bruchstein':6,'Redstone-Staub':2,'Netherquarz':1}},
 'Verstärker':{out:1,items:{'Stein':3,'Redstone-Fackel':2,'Redstone-Staub':1}},
 'Komparator':{out:1,items:{'Stein':3,'Redstone-Fackel':3,'Netherquarz':1}},
 'Werfer':{out:1,items:{'Bruchstein':7,'Redstone-Staub':1}},
 'Spender':{out:1,items:{'Bruchstein':7,'Redstone-Staub':1,'Bogen':1}},
 'Eimer':{out:1,items:{'Eisenbarren':3}},
 'Lore':{out:1,items:{'Eisenbarren':5}},
 'Trichterlore':{out:1,items:{'Eisenbarren':10,'Truhe':1}},
 'Schienen':{out:16,items:{'Eisenbarren':6,'Stock':1}},
 'Antriebsschienen':{out:6,items:{'Goldbarren':6,'Stock':1,'Redstone-Staub':1}},
 'Redstone-Block':{out:1,items:{'Redstone-Staub':9}}
};
function craftingCosts(materials){
 const totals={},rows=[],unknown=[];
 for(const material of materials){let m;try{m=parseMaterial(material.text)}catch{unknown.push(material.text);continue}
 const recipe=FARM_RECIPES[m.name];if(!recipe){unknown.push(m.name);continue}
 const batches=Math.ceil(m.quantity/recipe.out),ingredients={};
 for(const [name,amount] of Object.entries(recipe.items)){ingredients[name]=amount*batches;totals[name]=(totals[name]||0)+ingredients[name]}
 rows.push({name:m.name,quantity:m.quantity,done:material.done,extra:batches*recipe.out-m.quantity,ingredients});
 }
 return {totals,rows,unknown};
}
function costsHTML(materials){
 const all=craftingCosts(materials),missing=craftingCosts(materials.filter(m=>!m.done));
 return `<details class="craft-costs"><summary>⚒ Herstellungsbedarf anzeigen</summary><p>Direkte Zutaten der erfassten Rezepte. „Noch nötig“ zählt nur nicht abgehakte Materialien.</p><table><thead><tr><th>Zutat</th><th>Gesamt</th><th>Noch nötig</th></tr></thead><tbody>${Object.entries(all.totals).map(([name,count])=>`<tr><td>${escapeHTML(name)}</td><td>${count.toLocaleString('de-DE')}</td><td>${(missing.totals[name]||0).toLocaleString('de-DE')}</td></tr>`).join('')}</tbody></table>${all.rows.map(row=>`<p><strong>${row.quantity} × ${escapeHTML(row.name)}</strong>: ${Object.entries(row.ingredients).map(([name,count])=>count+' × '+escapeHTML(name)).join(', ')}${row.extra?` (${row.extra} Stück Überschuss durch Rezeptgröße)`:''}</p>`).join('')}${all.unknown.length?`<p class="cost-note">Ohne hinterlegtes Rezept: ${all.unknown.map(escapeHTML).join(', ')}. Diese Materialien sind in den Zutatensummen nicht enthalten.</p>`:''}<small>Zwischenprodukte wie Truhen werden separat aufgeführt, nicht nochmals in Rohstoffe zerlegt. <a href="https://www.minecraft.net/en-us/article/hopper" target="_blank" rel="noopener">Trichter-Rezept</a></small></details>`;
}
function overlayURL(farm,clean=false){const url=new URL('overlay.html',location.href);if(clean)url.searchParams.set('clean','1');url.hash=encodeURIComponent(JSON.stringify(farm));return url.href}
function openFarmOverlay(farm){window.open(overlayURL(farm),'_blank','noopener')}
