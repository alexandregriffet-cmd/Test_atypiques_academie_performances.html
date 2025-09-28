// v5 – Questionnaire 1×1 + rapport narratif complet (tous profils).

// ---------------- Items & domains (identiques v4) ----------------
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

// Séquence à plat (pour défilement 1×1)
const SEQ = [];
DOMAINS.forEach((d, di)=>d.items.forEach((_, qi)=>SEQ.push({di, qi})));

// ---------------- Narratifs longs & plans M1→M7 ----------------
const NARRATIVES = {
  TDAH: [
    "Le TDAH est un trouble neurodéveloppemental reconnu : il concerne environ 5 % des enfants et 2 à 3 % des adultes. Il se manifeste par des difficultés d’attention, une impulsivité et parfois une hyperactivité. Ces manifestations ne relèvent pas d’un manque de volonté mais d’une régulation particulière des circuits dopaminergiques et d’une maturation spécifique du cortex préfrontal.",
    "Au quotidien, cela peut donner : oublis fréquents, difficulté à rester concentré sur une tâche longue, tendance à s’éparpiller ou à remettre au lendemain. Pourtant, on observe souvent une créativité élevée, une grande réactivité et une capacité d’hyperfocalisation lorsque l’intérêt est fort.",
    "Idées reçues : « le TDAH, c’est un manque d’éducation » — faux. Il s’agit d’un trouble documenté et variable selon les contextes (scolaire, familial, sportif). Un accompagnement ciblé améliore sensiblement la qualité de vie et les résultats scolaires.",
    "Lecture des résultats : si votre score atteint le seuil, cela ne pose pas un diagnostic mais indique qu’un avis professionnel est pertinent pour explorer des aménagements et des stratégies efficaces."
  ],
  TSA: [
    "Les troubles du spectre de l’autisme (TSA) concernent environ 1 % de la population. Ils se caractérisent par une manière particulière de traiter l’information sociale et sensorielle : difficulté avec l’implicite, besoin de routines, centres d’intérêt spécifiques.",
    "On retrouve fréquemment une forte attention aux détails, une préférence pour la prévisibilité et des difficultés face aux changements de dernière minute. De nombreuses forces sont associées : mémoire exceptionnelle, logique, persévérance, expertise pointue sur des sujets d’intérêt.",
    "Idées reçues : « les personnes autistes n’éprouvent pas d’émotions » — faux. Elles ressentent souvent intensément et peuvent exprimer différemment leurs émotions.",
    "Lecture des résultats : un score au‑dessus du seuil invite à discuter d’une évaluation spécialisée. Quoi qu’il en soit, des ajustements simples (clarté, routines, repères visuels) sont souvent très bénéfiques."
  ],
  HSP: [
    "L’hypersensibilité (HSP/SPS) n’est pas un trouble mais un trait de tempérament présent chez 15 à 20 % des personnes. Elle se caractérise par une réactivité sensorielle et émotionnelle élevée : le système nerveux traite finement les stimuli, ce qui peut être une force comme un défi.",
    "Au quotidien : les bruits, lumières, odeurs et humeurs d’autrui sont perçus intensément ; la surcharge peut survenir rapidement. En contrepartie, l’empathie, l’intuition, la créativité et le sens esthétique sont souvent remarquables.",
    "Idées reçues : « hypersensible = fragile » — faux. Ce profil devient une force lorsqu’on apprend à réguler son énergie, protéger ses limites et choisir un environnement adapté.",
    "Lecture des résultats : un score élevé suggère de structurer des routines d’apaisement et de clarifier vos besoins sensoriels (ex. espace calme, pauses régulières)."
  ],
  DYS: [
    "Les troubles « Dys » (dyslexie, dyspraxie, dyscalculie, dysorthographie, etc.) touchent 6 à 8 % des enfants. Ils correspondent à des particularités de circuits neuronaux impliqués dans le langage, la motricité ou le calcul, indépendamment de l’intelligence globale.",
    "Au quotidien : lecture lente et fatigante, écriture coûteuse, orthographe instable, difficultés en calculs, gestes fins compliqués. Beaucoup développent des stratégies de compensation créatives (mémoire visuelle, pensée originale, sens artistique).",
    "Idées reçues : « paresse » — faux. La charge cognitive est simplement plus forte pour certaines tâches. Les aides techniques et les aménagements sont des leviers puissants.",
    "Lecture des résultats : la présence de plusieurs signaux d’alerte justifie de discuter d’un bilan ciblé pour identifier précisément les besoins et obtenir des aménagements adaptés."
  ],
  HPI: [
    "Le haut potentiel intellectuel (HPI) renvoie à un fonctionnement cognitif supérieur à la moyenne, généralement objectivé par un QI ≥ 130 (≥ 2 écarts‑types). Cela représente environ 2,5 % de la population. Au‑delà du chiffre, on observe souvent une pensée en arborescence, une curiosité forte et un sens aigu du sens.",
    "Au quotidien : compréhension rapide, besoin de complexité, ennui si le rythme est lent, sens du juste/injuste, parfois perfectionnisme et anxiété. Ce profil est une ressource majeure lorsqu’il est nourri et canalisé.",
    "Idées reçues : « HPI = réussite garantie » — faux. Sans stimulation adaptée, certains jeunes HPI décrochent ou s’isolent.",
    "Lecture des résultats : des indices élevés invitent à envisager un test normé (WISC/WAIS) et surtout à ajuster l’environnement d’apprentissage (défis, autonomie, créativité)."
  ]
};

const PLANS = {
  TDAH: [
    ["M1 – Connaissance de soi","Cartographier forces/obstacles en 15′ : situations où l’attention tient, situations qui lâchent. Objectif : repérer les déclencheurs (intérêt, durée, contexte)."],
    ["M2 – Stress & émotions","Respiration 5‑5 (cohérence cardiaque) 3×/jour ; mouvement bref avant d’étudier ; ritualiser le retour au calme pour limiter l’impulsivité."],
    ["M3 – Motivation & confiance","Micro‑objectifs ≤30′ + récompense immédiate ; journal de micro‑victoires ; s’appuyer sur les centres d’intérêt comme moteur."],
    ["M4 – Concentration","Pomodoro 20–25′/5′ ; minuteur visible ; couper notifications ; alternance tâches ‘énergie haute’ / ‘énergie basse’."],
    ["M5 – Méthodes de travail","Check‑lists par étapes, post‑it colorés ; mind mapping pour clarifier la tâche ; consignes rédigées ‘1‑2‑3’. "],
    ["M6 – Examens/compétitions","Simulations chronométrées ; routine d’activation (respiration, étirements) ; stratégie de priorisation (facile→difficile)."],
    ["M7 – Temps & équilibre","Heure fixe d’endormissement ; activité physique courte quotidienne ; écrans coupés 60′ avant le sommeil."]
  ],
  TSA: [
    ["M1 – Connaissance de soi","Clarifier les règles implicites en explicites ; fiche ‘mes intérêts spécifiques’ pour choisir des projets motivants."],
    ["M2 – Stress & émotions","Scénarios ‘si… alors…’ ; cartes visuelles d’apaisement ; préparer à l’avance tout changement notable."],
    ["M3 – Motivation & confiance","Structurer les tâches autour des centres d’intérêt ; définir un objectif mesurable par semaine avec preuve concrète."],
    ["M4 – Concentration","Même lieu, même heure ; casque anti‑bruit si besoin ; transitions annoncées (minuteur)."],
    ["M5 – Méthodes de travail","Procédures séquentielles pas à pas ; pictogrammes ; scripts pour tâches récurrentes."],
    ["M6 – Examens/compétitions","‘Mode d’emploi du jour J’ : trajet, salle, matériel, ordre des étapes, temps par question, plan B."],
    ["M7 – Temps & équilibre","Agenda prévisible ; ne changer qu’un paramètre à la fois ; préparation du lendemain la veille."]
  ],
  HSP: [
    ["M1 – Connaissance de soi","Identifier déclencheurs sensoriels/émotionnels ; lister les environnements protecteurs (calme, lumière douce)."],
    ["M2 – Stress & émotions","Cohérence cardiaque 5‑5 ; ancrage corporel (marche consciente) ; after‑care après surcharge (10′ de calme)."],
    ["M3 – Motivation & confiance","Formuler le droit à l’erreur ; auto‑bienveillance guidée ; s’appuyer sur les valeurs personnelles."],
    ["M4 – Concentration","Espace de travail apaisé ; sessions ≤30′ ; pauses planifiées ; prévenir le multitâche."],
    ["M5 – Méthodes de travail","Supports allégés, police lisible ; to‑do de 3 priorités ; planifier la journée autour des pics d’énergie."],
    ["M6 – Examens/compétitions","Repérage des lieux en amont ; routine apaisante pré‑épreuve ; plan anti‑surcharge pendant l’épreuve."],
    ["M7 – Temps & équilibre","Moments nature/musique ; limites claires ; rituels de début/fin de journée pour protéger l’énergie."]
  ],
  DYS: [
    ["M1 – Connaissance de soi","Lister ce qui aide / fatigue ; accepter le profil ; impliquer la famille pour repérer les réussites concrètes."],
    ["M2 – Stress & émotions","Dédramatiser l’erreur ; pauses actives ; techniques d’auto‑renforcement (‘je progresse parce que…’)."],
    ["M3 – Motivation & confiance","Objectifs réalistes ; valoriser la créativité et les solutions alternatives ; célébrer l’effort visible."],
    ["M4 – Concentration","Supports audio/visuels ; police adaptée ; temps étendu ; alternance tâches écrites/orales."],
    ["M5 – Méthodes de travail","Dictée vocale, lecture audio, schémas ; étapes très courtes ; consignes reformulées en langage simple."],
    ["M6 – Examens/compétitions","Temps supplémentaire ; dispenses ciblées si nécessaire ; plan de relecture guidée."],
    ["M7 – Temps & équilibre","Check‑lists par pictos ; organisation du cartable/la veille ; limiter la surcharge écrite à la maison."]
  ],
  HPI: [
    ["M1 – Connaissance de soi","Journal d’idées/projets ; cartographier les domaines de curiosité ; identifier les conditions d’engagement."],
    ["M2 – Stress & émotions","Cohérence cardiaque pour ralentir le flux mental ; écrire pour ‘vider le cache’ avant d’étudier."],
    ["M3 – Motivation & confiance","Défis exigeants mais courts ; contrats d’objectifs chiffrés ; feedback rapide."],
    ["M4 – Concentration","Mind mapping systématique ; blocage des distractions ; intervalle ‘profond 30–45′’."],
    ["M5 – Méthodes de travail","Stratégie macro→micro ; reformulation active ; expliquer à autrui pour vérifier la maîtrise."],
    ["M6 – Examens/compétitions","Simulations chronométrées ; tri des questions ; gestion du temps par quotas."],
    ["M7 – Temps & équilibre","Plages de créativité libre ; règle 2/1 (2 unités d’effort / 1 de jeu) ; hygiène de sommeil."]
  ]
};

// ---------------- State & runner ----------------
const SEQ_ORDER = SEQ;
let cursor = 0;
const answers = {}; // "d{di}_q{qi}" -> 1..5

function el(id){ return document.getElementById(id); }
function start(){
  document.querySelector('.intro').classList.add('hidden');
  el('runner').classList.remove('hidden');
  render();
}
function render(){
  const total = SEQ_ORDER.length;
  const {di, qi} = SEQ_ORDER[cursor];
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
  const {di, qi} = SEQ_ORDER[cursor];
  answers[`d${di}_q${qi}`] = Number(sel.value);
  return true;
}
function prev(){ if(cursor>0){ cursor--; render(); } }
function next(){
  if(!record()) return;
  if(cursor < SEQ_ORDER.length-1){ cursor++; render(); }
  else { finish(); }
}

// ---------------- Scoring ----------------
function finish(){
  el('progress_bar').style.width = '100%';
  el('runner').classList.add('hidden');

  const scores = {};
  DOMAINS.forEach((d, di)=>{
    const vals = d.items.map((_, qi)=>answers[`d${di}_q${qi}`]||0);
    scores[d.key] = {vals};
  });

  // Interprétation harmonisée
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

// ---------------- Report ----------------
function nowStr(){ const d=new Date(); return d.toLocaleString('fr-FR',{dateStyle:'long',timeStyle:'short'}); }

function renderReport(scores){
  el('report').classList.remove('hidden');
  el('rp_identity').textContent = `${(el('inp_name').value||'Participant')}${el('inp_age').value? ' — '+el('inp_age').value+' ans':''}`;
  el('rp_time').textContent = nowStr();

  // Synthèse
  const flags = [];
  if(scores.ASRS.meta.positive) flags.push('TDAH');
  if(scores.AQ10.meta.positive) flags.push('TSA');
  if(scores.HSP.meta.positive)  flags.push('HSP');
  if(scores.DYS.meta.positive)  flags.push('Dys');
  if(scores.HPI.meta.positive)  flags.push('HPI');

  const sumHost = el('rp_summary'); sumHost.innerHTML = "";
  const p = document.createElement('p');
  if(flags.length===0){
    p.textContent = "Aucun profil atypique ne ressort nettement. Si des difficultés persistent, parlez‑en à un professionnel.";
  }else{
    p.innerHTML = "Profils ressortis : " + flags.map(f=>`<span class="badge">${f}</span>`).join(" ");
  }
  sumHost.appendChild(p);

  // Sections narratives – TOUS les profils, avec mention ‘non ressorti’ si besoin
  const secHost = el('rp_sections'); secHost.innerHTML = "";
  const blocks = [
    {
      key:"TDAH",
      title:"🧩 TDAH – Définition, explications & plan d’action",
      result:`Items 4–5 (ASRS‑like) : ${scores.ASRS.meta.positives}/6 – ${scores.ASRS.meta.positive? "Seuil atteint (≥4)":"Non ressorti dans vos réponses"}`,
      narrative:NARRATIVES.TDAH, plan:PLANS.TDAH
    },
    {
      key:"TSA",
      title:"🧩 TSA / Asperger – Définition, explications & plan d’action",
      result:`Items 4–5 (AQ‑10‑like) : ${scores.AQ10.meta.yes}/10 – ${scores.AQ10.meta.positive? "Seuil atteint (≥6)":"Non ressorti dans vos réponses"}`,
      narrative:NARRATIVES.TSA, plan:PLANS.TSA
    },
    {
      key:"HSP",
      title:"🌈 Hypersensibilité – Définition, explications & plan d’action",
      result:`Score HSP : ${scores.HSP.meta.sum}/60 – ${scores.HSP.meta.positive? "Sensibilité élevée (≥40)":"Non ressorti dans vos réponses"}`,
      narrative:NARRATIVES.HSP, plan:PLANS.HSP
    },
    {
      key:"DYS",
      title:"🔠 Troubles « Dys » – Définition, explications & plan d’action",
      result:`Items 4–5 : ${scores.DYS.meta.flags}/${scores.DYS.vals.length} – ${scores.DYS.meta.positive? "Plusieurs drapeaux (≥3)":"Non ressorti dans vos réponses"}`,
      narrative:NARRATIVES.DYS, plan:PLANS.DYS
    },
    {
      key:"HPI",
      title:"🧠 HPI – Définition, explications & plan d’action",
      result:`Items 4–5 : ${scores.HPI.meta.flags}/${scores.HPI.vals.length} – ${scores.HPI.meta.positive? "Indices multiples (≥4)":"Non ressorti dans vos réponses"}`,
      narrative:NARRATIVES.HPI, plan:PLANS.HPI
    }
  ];

  blocks.forEach(b=>{
    const div = document.createElement('div'); div.className="section";
    const h = document.createElement('h3'); h.textContent = b.title; div.appendChild(h);
    const res = document.createElement('p'); res.innerHTML = `<strong>Résultat :</strong> ${b.result}`; div.appendChild(res);

    b.narrative.forEach(par=>{
      const box = document.createElement('div'); box.className="box"; box.innerHTML = `<p>${par}</p>`; div.appendChild(box);
    });

    const planWrap = document.createElement('div'); planWrap.className="plan";
    const ph = document.createElement('h4'); ph.textContent = "Plan d’accompagnement par module (M1 → M7)"; planWrap.appendChild(ph);
    const ul = document.createElement('ul');
    b.plan.forEach(([mod,txt])=>{
      const li = document.createElement('li'); li.innerHTML = `<strong>${mod} :</strong> ${txt}`; ul.appendChild(li);
    });
    planWrap.appendChild(ul);
    div.appendChild(planWrap);

    const note = document.createElement('p'); note.className="note";
    note.textContent = "Ce rapport est informatif. Pour un diagnostic ou des aménagements officiels, rapprochez‑vous d’un professionnel de santé.";
    div.appendChild(note);

    secHost.appendChild(div);
  });
}

// ---------------- Wire ----------------
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('start_btn').addEventListener('click', start);
  document.getElementById('prev_btn').addEventListener('click', ()=>{ if(cursor>0){ cursor--; render(); } });
  document.getElementById('next_btn').addEventListener('click', ()=>{
    const sel = document.querySelector('input[name="answer"]:checked');
    if(!sel){ alert("Choisis une réponse (1 → 5) avant de continuer."); return; }
    const {di, qi} = SEQ_ORDER[cursor];
    answers[`d${di}_q${qi}`] = Number(sel.value);
    if(cursor < SEQ_ORDER.length-1){ cursor++; render(); }
    else { finish(); }
  });
});
