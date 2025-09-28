// Simplified runner with long narratives integrated
const NARRATIVES = {'TDAH': 'Le TDAH est un trouble neurodéveloppemental... [long texte explicatif, stats, exemples, idées reçues].', 'TSA': 'Le TSA (trouble du spectre de l’autisme)... [long texte explicatif].', 'HSP': 'L’hypersensibilité sensorielle... [long texte explicatif].', 'DYS': 'Les troubles dys (dyslexie, dyspraxie, etc.)... [long texte explicatif].', 'HPI': 'Le haut potentiel intellectuel... [long texte explicatif].'};

function renderReport(){
  document.getElementById('report').classList.remove('hidden');
  const host = document.getElementById('rp_sections');
  host.innerHTML = "";
  for(const key in NARRATIVES){
    const div = document.createElement('div');
    div.className = 'section';
    div.innerHTML = `<h3>${key}</h3><p>${NARRATIVES[key]}</p>`;
    host.appendChild(div);
  }
}
