// --------- Liens CTA (à adapter) ---------
const LINKS = {
  PMP: "https://alexandregriffet-cmd.github.io/pmp_quiz_academie_performances.html",
  RDV: "https://cal.com/", // Remplacer par ton lien de prise de RDV
  TDAH: "https://www.has-sante.fr/jcms/c_468291/fr/trouble-deficit-de-lattention-avec-ou-sans-hyperactivite-tdah",
  TSA: "https://www.has-sante.fr/jcms/c_468172/fr/troubles-du-spectre-de-l-autisme-chez-l-enfant-et-l-adolescent",
  DYS: "https://www.has-sante.fr/jcms/c_2850017/fr/troubles-specifiques-du-langage-et-des-apprentissages-chez-l-enfant-dys-",
  HPI: "https://www.inserm.fr/dossier/intelligence-haut-potentiel/"
};

// --------- Questions ---------
const ASRS_ITEMS = [
  "Difficulté à terminer des tâches qui demandent de l’organisation",
  "Commencer plusieurs choses à la fois sans les terminer",
  "Difficulté à se concentrer quand la tâche est répétitive ou exige un effort",
  "Oublis fréquents (rendez‑vous, obligations, affaires)",
  "Agitation intérieure / besoin de bouger",
  "Répondre trop vite / interrompre / agir impulsivement"
];
const AQ10_ITEMS = [
  "Je préfère des routines identiques et suis mal à l’aise si elles changent",
  "Je peine à comprendre ce que les autres pensent/ressentent sans l’explicite",
  "Je me concentre intensément sur des centres d’intérêt spécifiques",
  "Je préfère faire les choses seul plutôt qu’en groupe",
  "Je remarque de très petits détails que d’autres manquent",
  "Je peine à suivre l’implicite social",
  "Je prends souvent les choses au pied de la lettre",
  "Les changements de dernière minute me perturbent",
  "Je préfère des activités répétitives et prévisibles",
  "On dit que ma communication peut sembler très directe"
];
const HSP_ITEMS = [
  "Bruits forts / lumières vives / foules me fatiguent vite",
  "Je remarque des subtilités (odeurs, textures, détails)",
  "Je suis très touché·e par l’humeur des autres",
  "J’ai besoin de temps au calme pour récupérer",
  "Je vis les émotions intensément",
  "Surprises / changements soudains me perturbent",
  "Je réfléchis longuement avant d’agir",
  "Je tolère mal faim, fatigue ou inconfort sensoriel",
  "Art, musique, paysages me bouleversent",
  "Je sursaute facilement / je suis vite submergé·e",
  "Je recherche des environnements apaisants et prévisibles",
  "Je me sens vidé·e après des interactions sociales prolongées"
];
const DYS_ITEMS = [
  "Lecture lente, sauts de lignes, confusion de lettres (b/d, p/q)",
  "Écriture coûteuse/illisible ; lenteur graphique",
  "Orthographe instable malgré l’entraînement",
  "Difficultés persistantes en calculs de base",
  "Gêne dans l’organisation motrice (lacet, découpes, gestes fins)",
  "Fatigue anormale pour les tâches scolaires écrites",
  "Antécédents familiaux de troubles d’apprentissage"
];
const HPI_ITEMS = [
  "Compréhension très rapide, besoin de complexité",
  "Ennui si le rythme est lent ; besoin de défis",
  "Pensée en arborescence (idées qui s’enchaînent vite)",
  "Hyper‑sens du juste/injuste ; esprit critique",
  "Mémoire riche et humour décalé",
  "Décalage ressenti avec les pairs ; perfectionnisme"
];

// --------- Render helpers ---------
function renderASRS(){
  const host = document.getElementById('asrs_list');
  ASRS_ITEMS.forEach((q, i)=>{
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="q">
        <div class="q-text">${q}</div>
        <div class="q-opts">
          ${["Jamais","Rarement","Parfois","Souvent","Très souvent"].map((lab,idx)=>`
            <label style="margin-right:8px;">
              <input type="radio" name="asrs_${i}" value="${idx}" /> ${lab}
            </label>
          `).join('')}
        </div>
      </div>`;
    host.appendChild(li);
  });
}
function renderAQ10(){
  const host = document.getElementById('aq10_list');
  AQ10_ITEMS.forEach((q, i)=>{
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="q">
        <div class="q-text">${q}</div>
        <div class="q-opts">
          <label><input type="radio" name="aq_${i}" value="1" /> Oui</label>
          <label style="margin-left:12px;"><input type="radio" name="aq_${i}" value="0" /> Non</label>
        </div>
      </div>`;
    host.appendChild(li);
  });
}
function renderHSP(){
  const host = document.getElementById('hsp_list');
  HSP_ITEMS.forEach((q, i)=>{
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="q">
        <div class="q-text">${q}</div>
        <div class="q-opts">
          ${[1,2,3,4,5].map(v=>`
            <label style="margin-right:8px;">
              <input type="radio" name="hsp_${i}" value="${v}" /> ${v}
            </label>
          `).join('')}
        </div>
      </div>`;
    host.appendChild(li);
  });
}
function renderCheckList(items, idPrefix, hostId){
  const host = document.getElementById(hostId);
  items.forEach((q, i)=>{
    const li = document.createElement('li');
    li.innerHTML = `<label><input type="checkbox" name="${idPrefix}_${i}" /> ${q}</label>`;
    host.appendChild(li);
  });
}

function getRadioValue(name){
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? Number(el.value) : null;
}

// --------- Scoring ---------
function scoreASRS(){
  let positives = 0;
  for(let i=0;i<ASRS_ITEMS.length;i++){
    const v = getRadioValue(`asrs_${i}`);
    if(v !== null && v >= 3) positives++; // Souvent(3) ou Très souvent(4)
  }
  const positive = positives >= 4;
  return {positives, positive};
}
function scoreAQ10(){
  let yes = 0;
  for(let i=0;i<AQ10_ITEMS.length;i++){
    const v = getRadioValue(`aq_${i}`);
    if(v === 1) yes++;
  }
  const positive = yes >= 6;
  return {yes, positive};
}
function scoreHSP(){
  let sum = 0, answered = 0;
  for(let i=0;i<HSP_ITEMS.length;i++){
    const v = getRadioValue(`hsp_${i}`);
    if(v !== null){ sum += v; answered++; }
  }
  const positive = sum >= 40 && answered === HSP_ITEMS.length;
  return {sum, positive, answered};
}
function countChecked(prefix, n){
  let c=0;
  for(let i=0;i<n;i++){
    const el = document.querySelector(`input[name="${prefix}_${i}"]`);
    if(el && el.checked) c++;
  }
  return c;
}
function scoreDYS(){ const c = countChecked('dys', DYS_ITEMS.length); return {checked:c, positive:c>=3}; }
function scoreHPI(){ const c = countChecked('hpi', HPI_ITEMS.length); return {checked:c, positive:c>=4}; }

function nowStr(){
  const d = new Date();
  return d.toLocaleString('fr-FR', {dateStyle:'long', timeStyle:'short'});
}

// --------- Advice (résumés narratifs) ---------
const NARRATIVE = {
  intro: (name)=> `Bonjour ${name}, voici une lecture <strong>pédagogique et narrative</strong> de tes résultats. 
  Elle sert à orienter vers des <em>bonnes pratiques</em> et, si besoin, vers un <strong>avis professionnel</strong> (elle ne pose pas de diagnostic).`,
  TDAH: `Ton profil montre des signes d’inattention et/ou d’impulsivité qui peuvent impacter l’organisation et la régularité.
  La bonne nouvelle : le TDAH répond bien à des aménagements très concrets (fractionnement, feedback rapide, routines courtes).`,
  TSA: `Des préférences fortes pour la prévisibilité, la logique et des centres d’intérêt spécialisés peuvent indiquer un fonctionnement autistique léger.
  L’objectif est d’outiller la compréhension sociale et d’organiser des routines rassurantes.`,
  HSP: `Une sensibilité sensorielle et émotionnelle élevée peut être une <strong>force</strong> (intuition, finesse), à condition de protéger son énergie (pauses, environnement apaisant).`,
  DYS: `Des difficultés spécifiques et durables en lecture/écriture/calcul ou motricité fine méritent des aménagements et un bilan pour identifier les aides les plus efficaces.`,
  HPI: `Des indices d’aisance cognitive et de pensée en arborescence peuvent évoquer un haut potentiel.
  Seul un test normé (WISC/WAIS) permet de conclure. En attendant, mise sur des défis stimulants et un mind mapping régulier.`
};

const ADVICE = {
  TDAH: [
    "Fractionne les tâches (Pomodoro 20–25′ + 5′ pause) et utilise un minuteur visible.",
    "Alterne efforts courts et mouvements (respiration active, marche rapide).",
    "Répète en conditions réelles avant les examens ; récompense chaque micro‑victoire."
  ],
  TSA: [
    "Crée des routines claires et des repères visuels (agenda, pictos, check‑lists).",
    "Prépare un « mode d’emploi » du jour J (trajet, salle, ordre des étapes).",
    "Appuie‑toi sur tes intérêts spécifiques pour motiver l’apprentissage."
  ],
  HSP: [
    "Installe un sas de décompression (calme, casque, lumière douce) et planifie des pauses.",
    "Pratique l’ancrage (respiration 5‑5, marche consciente) après chaque surcharge.",
    "Communique tes besoins sensoriels (ex. place au calme, pauses planifiées)."
  ],
  DYS: [
    "Utilise lecture audio, dictée vocale, schémas ; dédramatise l’erreur.",
    "Découpe chaque tâche en étapes courtes et visuelles ; pense aux temps supplémentaires.",
    "Demande un bilan (orthophonie / neuropsych) pour des aménagements précis."
  ],
  HPI: [
    "Canalise l’arborescence avec du mind mapping sur chaque chapitre ou projet.",
    "Fixe des objectifs stimulants et concrets avec échéances courtes.",
    "Garde du temps de créativité libre pour l’équilibre et la motivation."
  ]
};

// --------- CTA builders ---------
function buildCTAs(flags){
  const box = document.getElementById('rp_cta');
  box.innerHTML = "";
  // Bouton RDV général
  const rdv = document.createElement('a');
  rdv.href = LINKS.RDV;
  rdv.target = "_blank";
  rdv.className = "btn btn-primary";
  rdv.textContent = "Prendre un RDV découverte (15 min)";
  box.appendChild(rdv);

  // Bouton PMP (test complémentaire)
  const pmp = document.createElement('a');
  pmp.href = LINKS.PMP;
  pmp.target = "_blank";
  pmp.className = "btn btn-outline";
  pmp.textContent = "Passer le test PMP complémentaire";
  box.appendChild(pmp);

  // Boutons info selon flags
  flags.forEach(f=>{
    const a = document.createElement('a');
    a.target = "_blank";
    a.className = "btn btn-outline";
    if(f==="TDAH"){ a.href = LINKS.TDAH; a.textContent = "Infos officielles TDAH (HAS)"; }
    if(f==="TSA"){ a.href = LINKS.TSA; a.textContent = "Infos officielles TSA (HAS)"; }
    if(f==="Dys"){ a.href = LINKS.DYS; a.textContent = "Parcours Dys (HAS)"; }
    if(f==="HPI"){ a.href = LINKS.HPI; a.textContent = "Comprendre le HPI (Inserm)"; }
    if(f!=="HSP") box.appendChild(a);
  });
}

// --------- Report rendering ---------
function renderReport(scores){
  const rep = document.getElementById('report');
  const id = document.getElementById('rp_identity');
  const name = (document.getElementById('inp_name').value.trim() || "Participant");
  const age = document.getElementById('inp_age').value.trim();
  id.textContent = `${name}${age? " — " + age + " ans":""}`;
  document.getElementById('rp_time').textContent = nowStr();
  document.getElementById('rp_intro').innerHTML = NARRATIVE.intro(name);

  const summary = document.getElementById('rp_summary');
  summary.innerHTML = "";
  const badges = document.createElement('div');
  badges.className = "badges";

  const flags = [];
  if(scores.asrs.positive) { flags.push("TDAH"); }
  if(scores.aq10.positive){ flags.push("TSA"); }
  if(scores.hsp.positive){ flags.push("HSP"); }
  if(scores.dys.positive){ flags.push("Dys"); }
  if(scores.hpi.positive){ flags.push("HPI"); }

  if(flags.length===0){
    const p = document.createElement('p');
    p.innerHTML = "Aucun profil atypique ne ressort nettement. Si certaines difficultés persistent, consulte un professionnel pour un avis personnalisé.";
    summary.appendChild(p);
  } else {
    const p = document.createElement('p');
    p.innerHTML = "Profils à explorer en priorité :";
    summary.appendChild(p);
    flags.forEach(f=>{
      const b = document.createElement('span');
      b.className = "badge dark";
      b.textContent = f;
      badges.appendChild(b);
    });
    summary.appendChild(badges);
  }

  const sections = document.getElementById('rp_sections');
  sections.innerHTML = "";

  function addSection(title, scoreLine, narrativeKey, tips){
    const s = document.createElement('div'); s.className = "section";
    s.innerHTML = `<h3>${title}</h3>
      <p>${scoreLine}</p>
      <div class="tip">${NARRATIVE[narrativeKey]}</div>
      <div class="advice"><strong>Conseils clés :</strong><ul>${tips.map(t=>`<li>${t}</li>`).join("")}</ul></div>`;
    sections.appendChild(s);
  }

  // Sections détaillées
  addSection("🧩 A) TDAH – Résultat",
    `<strong>Items « souvent / très souvent » :</strong> ${scores.asrs.positives} / 6. 
    ${scores.asrs.positive ? "<span class='badge orange'>Seuil atteint (≥4)</span>" : "<span class='badge blue'>Seuil non atteint</span>"}`,
    "TDAH", ADVICE.TDAH);

  addSection("🧩 B) TSA / Asperger – Résultat",
    `<strong>Oui :</strong> ${scores.aq10.yes} / 10. 
    ${scores.aq10.positive ? "<span class='badge orange'>Seuil atteint (≥6)</span>" : "<span class='badge blue'>Seuil non atteint</span>"}`,
    "TSA", ADVICE.TSA);

  addSection("🌈 C) Hypersensibilité – Résultat",
    `<strong>Score total :</strong> ${scores.hsp.sum} / 60. 
    ${scores.hsp.positive ? "<span class='badge orange'>Sensibilité élevée (≥40)</span>" : "<span class='badge blue'>Sous le seuil</span>"}`,
    "HSP", ADVICE.HSP);

  addSection("🔠 D) Troubles « Dys » – Résultat",
    `<strong>Signaux d’alerte :</strong> ${scores.dys.checked} / ${DYS_ITEMS.length}. 
    ${scores.dys.positive ? "<span class='badge orange'>Plusieurs drapeaux (≥3)</span>" : "<span class='badge blue'>Peu de drapeaux</span>"}`,
    "DYS", ADVICE.DYS);

  addSection("🧠 E) HPI – Résultat",
    `<strong>Indices cochés :</strong> ${scores.hpi.checked} / ${HPI_ITEMS.length}. 
    ${scores.hpi.positive ? "<span class='badge orange'>Indices multiples</span>" : "<span class='badge blue'>Indices limités</span>"}`,
    "HPI", ADVICE.HPI);

  // CTA buttons
  buildCTAs(flags);

  rep.classList.remove('hidden');
  rep.scrollIntoView({behavior:'smooth'});
}

// --------- Init ---------
function gatherScores(){
  return {
    asrs: scoreASRS(),
    aq10: scoreAQ10(),
    hsp: scoreHSP(),
    dys: scoreDYS(),
    hpi: scoreHPI()
  };
}
function resetAll(){
  document.querySelectorAll('input[type="radio"],input[type="checkbox"]').forEach(el=>el.checked=false);
  document.getElementById('report').classList.add('hidden');
  document.getElementById('rp_summary').innerHTML = "";
  document.getElementById('rp_sections').innerHTML = "";
  document.getElementById('rp_cta').innerHTML = "";
}
function init(){
  renderASRS();
  renderAQ10();
  renderHSP();
  renderCheckList(DYS_ITEMS, 'dys', 'dys_list');
  renderCheckList(HPI_ITEMS, 'hpi', 'hpi_list');
  document.getElementById('btn_score').addEventListener('click', ()=>{
    renderReport(gatherScores());
  });
  document.getElementById('btn_reset').addEventListener('click', resetAll);
}
document.addEventListener('DOMContentLoaded', init);
