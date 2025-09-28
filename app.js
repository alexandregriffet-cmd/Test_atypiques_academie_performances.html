// v4 – One-question-at-a-time runner with unified 1–5 scale.

const DOMAINS = [
  { key:"ASRS", label:"A) TDAH – items inspirés ASRS v1.1 (Partie A)", items:[
    "J’ai du mal à terminer des tâches qui demandent de l’organisation.",
    "Je commence plusieurs choses à la fois sans les terminer.",
    "Je peine à me concentrer sur les tâches répétitives ou exigeantes.",
    "J’oublie souvent des rendez‑vous, obligations ou affaires.",
    "Je ressens une agitation intérieure ou un besoin de bouger.",
    "Je réponds trop vite / j’interromps / j’agis impulsivement."
  ]},
  { key:"AQ10", label:"B) TSA léger / Asperger – items inspirés AQ‑10", items:[
    "Je préfère des routines identiques et je suis mal à l’aise quand elles changent.",
    "J’ai du mal à comprendre ce que les autres pensent ou ressentent sans l’explicite.",
    "Je me concentre intensément sur des centres d’intérêt spécifiques.",
    "Je préfère faire les choses seul plutôt qu’en groupe.",
    "Je remarque de très petits détails que d’autres ne voient pas.",
    "J’ai du mal avec l’implicite social et les sous‑entendus.",
    "Je prends souvent les choses au pied de la lettre.",
    "Les changements de dernière minute me perturbent fortement.",
    "Je préfère des activités répétitives et prévisibles.",
    "On dit que ma communication peut sembler très directe."
  ]},
  { key:"HSP", label:"C) Hypersensibilité sensorielle/émotionnelle – HSP/SPS", items:[
    "Les bruits forts, lumières vives ou foules me fatiguent vite.",
    "Je remarque des subtilités sensorielles (odeurs, textures, détails).",
    "Je suis très touché·e par l’humeur des autres.",
    "J’ai besoin de temps au calme pour récupérer.",
    "Je vis les émotions intensément (positives comme négatives).",
    "Les surprises ou changements soudains me perturbent.",
    "Je réfléchis longuement avant d’agir.",
    "Je tolère mal la faim, la fatigue ou l’inconfort sensoriel.",
    "L’art, la musique, les paysages me bouleversent.",
    "Je sursaute facilement ou je suis vite submergé·e par la stimulation.",
    "Je recherche des environnements apaisants et prévisibles.",
    "Je me sens vidé·e après des interactions sociales prolongées."
  ]},
  { key:"DYS", label:"D) Troubles « Dys » – signaux d’alerte (échelle 1–5)", items:[
    "Je lis lentement / je saute des lignes / je confonds certaines lettres.",
    "Écrire me coûte beaucoup (douleur, lenteur) ou mon écriture est difficilement lisible.",
    "Mon orthographe reste instable malgré l’entraînement.",
    "J’ai des difficultés persistantes en calculs de base.",
    "J’ai une gêne dans l’organisation motrice (lacet, découpes, gestes fins).",
    "Je me fatigue anormalement sur les tâches scolaires écrites.",
    "Il existe des antécédents familiaux de troubles d’apprentissage."
  ]},
  { key:"HPI", label:"E) Indices de Haut Potentiel Intellectuel (échelle 1–5)", items:[
    "Je comprends très vite et j’ai besoin de complexité pour rester motivé·e.",
    "Je m’ennuie si le rythme est lent ; j’ai besoin de défis.",
    "Ma pensée est en arborescence (les idées s’enchaînent très vite).",
    "J’ai un fort sens du juste/injuste et un esprit critique développé.",
    "J’ai une mémoire riche (faits, détails) et souvent un humour décalé.",
    "Je ressens un décalage avec mes pairs et une tendance au perfectionnisme."
  ]}
];

const SEQ = [];
DOMAINS.forEach((d, di)=>d.items.forEach((_, qi)=>SEQ.push({di, qi})));

let cursor = 0;
const answers = {}; // "d{di}_q{qi}" -> 1..5

function el(id){ return document.getElementById(id); }

function start(){
  document.querySelector('.intro').classList.add('hidden');
  el('runner').classList.remove('hidden');
  render();
}
function render(){
  const total = SEQ.length;
  const {di, qi} = SEQ[cursor];
  const d = DOMAINS[di];
  el('progress_bar').style.width = Math.round(cursor/total*100)+'%';
  el('step_label').textContent = `Question ${cursor+1} / ${total}`;
  el('domain_label').textContent = d.label;
  el('question_text').textContent = d.items[qi];
  document.querySelectorAll('input[name="answer"]').forEach(r=>r.checked=false);
  const key = `d${di}_q${qi}`;
  if(answers[key]){
    const sel = document.querySelector(`input[name="answer"][value="${answers[key]}"]`);
    if(sel) sel.checked = true;
  }
  el('prev_btn').disabled = (cursor===0);
  el('next_btn').textContent = (cursor===total-1? 'Voir le rapport':'Suivant');
}
function record(){
  const sel = document.querySelector('input[name="answer"]:checked');
  if(!sel){ alert("Choisis une réponse (1 → 5) avant de continuer."); return false; }
  const {di, qi} = SEQ[cursor];
  answers[`d${di}_q${qi}`] = Number(sel.value);
  return true;
}
function prev(){ if(cursor>0){ cursor--; render(); } }
function next(){
  if(!record()) return;
  if(cursor < SEQ.length-1){ cursor++; render(); }
  else { finish(); }
}

function finish(){
  el('progress_bar').style.width = '100%';
  el('runner').classList.add('hidden');

  const scores = {};
  DOMAINS.forEach((d, di)=>{
    const vals = d.items.map((_, qi)=>answers[`d${di}_q${qi}`]||0);
    scores[d.key] = {vals};
  });

  // Interpret thresholds
  const asrsPos = scores.ASRS.vals.filter(v=>v>=4).length;
  scores.ASRS.meta = {positives: asrsPos, positive: asrsPos>=4};

  const aqYes = scores.AQ10.vals.filter(v=>v>=4).length;
  scores.AQ10.meta = {yes: aqYes, positive: aqYes>=6};

  const hspSum = scores.HSP.vals.reduce((a,b)=>a+b,0);
  scores.HSP.meta = {sum: hspSum, positive: hspSum>=40};

  const dysFlags = scores.DYS.vals.filter(v=>v>=4).length;
  scores.DYS.meta = {flags: dysFlags, positive: dysFlags>=3};

  const hpiFlags = scores.HPI.vals.filter(v=>v>=4).length;
  scores.HPI.meta = {flags: hpiFlags, positive: hpiFlags>=4};

  renderReport(scores);
}

function nowStr(){ const d=new Date(); return d.toLocaleString('fr-FR',{dateStyle:'long',timeStyle:'short'}); }

function renderReport(scores){
  el('report').classList.remove('hidden');
  el('rp_identity').textContent = `${(el('inp_name').value||'Participant')}${el('inp_age').value? ' — '+el('inp_age').value+' ans':''}`;
  el('rp_time').textContent = nowStr();

  const flags = [];
  if(scores.ASRS.meta.positive) flags.push('TDAH');
  if(scores.AQ10.meta.positive) flags.push('TSA');
  if(scores.HSP.meta.positive)  flags.push('HSP');
  if(scores.DYS.meta.positive)  flags.push('Dys');
  if(scores.HPI.meta.positive)  flags.push('HPI');

  const sumHost = el('rp_summary');
  sumHost.innerHTML = "";
  const p = document.createElement('p');
  if(flags.length===0){
    p.textContent = "Aucun profil atypique ne ressort nettement. Si des difficultés persistent, parlez‑en à un professionnel.";
  }else{
    p.innerHTML = "Profils à explorer : " + flags.map(f=>`<span class="badge">${f}</span>`).join(" ");
  }
  sumHost.appendChild(p);

  const secHost = el('rp_sections');
  secHost.innerHTML = "";
  const blocks = [
    ["🧩 TDAH (ASRS)","Items 4–5 : "+scores.ASRS.meta.positives+"/6 — "+(scores.ASRS.meta.positive? "seuil atteint (≥4)":"sous le seuil")],
    ["🧩 TSA (AQ‑10)","Réponses 4–5 : "+scores.AQ10.meta.yes+"/10 — "+(scores.AQ10.meta.positive? "seuil atteint (≥6)":"sous le seuil")],
    ["🌈 Hypersensibilité (HSP)","Score total : "+scores.HSP.meta.sum+"/60 — "+(scores.HSP.meta.positive? "élevé (≥40)":"modéré")],
    ["🔠 Dys","Items 4–5 : "+scores.DYS.meta.flags+"/"+scores.DYS.vals.length+" — "+(scores.DYS.meta.positive? "plusieurs drapeaux (≥3)":"peu de drapeaux")],
    ["🧠 HPI","Items 4–5 : "+scores.HPI.meta.flags+"/"+scores.HPI.vals.length+" — "+(scores.HPI.meta.positive? "indices multiples (≥4)":"indices limités")]
  ];
  blocks.forEach(([title, line])=>{
    const div = document.createElement('div');
    div.className = "section";
    div.innerHTML = `<h3>${title}</h3><p>${line}</p>`;
    secHost.appendChild(div);
  });
}

// Wire
document.addEventListener('DOMContentLoaded', ()=>{
  el('start_btn').addEventListener('click', start);
  el('prev_btn').addEventListener('click', prev);
  el('next_btn').addEventListener('click', next);
});
