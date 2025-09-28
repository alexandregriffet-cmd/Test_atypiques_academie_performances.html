
// === Visuals: Radar Star, Compass, Pyramid ===
function polarToXY(cx, cy, r, angleRad){ return [cx + r*Math.cos(angleRad), cy + r*Math.sin(angleRad)]; }

function drawRadarStar(ctx, labels, values){
  const W = ctx.canvas.width = ctx.canvas.clientWidth || 560;
  const H = ctx.canvas.height = ctx.canvas.clientHeight || 420;
  ctx.clearRect(0,0,W,H);
  const cx=W/2, cy=H/2, R=Math.min(W,H)*0.38;
  const n=labels.length;
  ctx.font="12px sans-serif";
  ctx.strokeStyle="#e2e8f0"; ctx.lineWidth=1;

  // grid rings
  for(let g=1; g<=4; g++){ ctx.beginPath(); ctx.arc(cx,cy,R*g/4,0,Math.PI*2); ctx.stroke(); }

  // axes + labels
  for(let i=0;i<n;i++){
    const a=-Math.PI/2 + i*2*Math.PI/n;
    const [x,y]=polarToXY(cx,cy,R,a);
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(x,y); ctx.strokeStyle="#cbd5e1"; ctx.stroke();
    const [lx,ly]=polarToXY(cx,cy,R+16,a);
    ctx.fillStyle="#334155"; ctx.textAlign="center"; ctx.fillText(labels[i], lx, ly);
  }

  // data polygon
  ctx.beginPath();
  for(let i=0;i<n;i++){
    const a=-Math.PI/2 + i*2*Math.PI/n;
    const r = R*(Math.max(0, Math.min(100, values[i]))/100);
    const [x,y]=polarToXY(cx,cy,r,a);
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.closePath();
  ctx.fillStyle="rgba(37,99,235,0.12)"; ctx.strokeStyle="#2563eb"; ctx.lineWidth=2; ctx.fill(); ctx.stroke();

  // points + %
  for(let i=0;i<n;i++){
    const a=-Math.PI/2 + i*2*Math.PI/n;
    const r = R*(Math.max(0, Math.min(100, values[i]))/100);
    const [x,y]=polarToXY(cx,cy,r,a);
    ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.fillStyle="#2563eb"; ctx.fill();
    ctx.fillStyle="#0f172a"; ctx.textAlign="center"; ctx.fillText(values[i]+"%", x, y-8);
  }
}

function drawCompass(ctx, perc){
  const W=ctx.canvas.width = ctx.canvas.clientWidth || 560;
  const H=ctx.canvas.height = ctx.canvas.clientHeight || 420;
  ctx.clearRect(0,0,W,H);
  const cx=W/2, cy=H/2; const R=Math.min(W,H)*0.42;
  ctx.strokeStyle="#e2e8f0"; ctx.lineWidth=1;
  ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx-R,cy); ctx.lineTo(cx+R,cy); ctx.moveTo(cx,cy-R); ctx.lineTo(cx,cy+R); ctx.stroke();
  ctx.fillStyle="#334155"; ctx.textAlign="center";
  ctx.fillText("Seul", cx, cy-R-10); ctx.fillText("Groupe", cx, cy+R+14);
  ctx.fillText("Interne", cx-R-28, cy+4); ctx.fillText("Externe", cx+R+28, cy+4);

  // simple projection: Interne/Seul <- Garant, Visionnaire ; Externe/Groupe <- Conquérant, Spontané ; Centre proche <- Bienveillant, Fiable
  const x = ((perc["Conquérant"]+perc["Spontané"]) - (perc["Garant"]+perc["Visionnaire"])) * 0.005;
  const y = ((perc["Groupe"]||0) - (perc["Seul"]||0)); // placeholder not used; compute with other mix:
  const up = (perc["Visionnaire"]+perc["Garant"])/2 - (perc["Spontané"]+perc["Conquérant"])/2;
  const right = (perc["Conquérant"]+perc["Spontané"])/2 - (perc["Garant"]+perc["Visionnaire"])/2;
  const px = cx + Math.max(-1,Math.min(1,right))*R*0.65;
  const py = cy - Math.max(-1,Math.min(1,up))*R*0.65;

  ctx.fillStyle="#ef4444"; ctx.beginPath(); ctx.arc(px,py,6,0,Math.PI*2); ctx.fill();
}

function drawPyramid(ctx){
  const W=ctx.canvas.width = ctx.canvas.clientWidth || 560;
  const H=ctx.canvas.height = ctx.canvas.clientHeight || 420;
  ctx.clearRect(0,0,W,H);
  const levels = [
    {name:"Confort", color:"#d1fae5"},
    {name:"Défi", color:"#bfdbfe"},
    {name:"Tension", color:"#fee2e2"}
  ];
  const baseW = Math.min(W*0.8, 520);
  const stepH = H*0.22;
  const cx = W/2, top = 20;

  for(let i=0;i<levels.length;i++){
    const t = i/levels.length;
    const w = baseW*(1 - i*0.22);
    const x1=cx-w/2, x2=cx+w/2;
    const y1=top+i*stepH, y2=y1+stepH-6;
    ctx.fillStyle=levels[i].color; ctx.strokeStyle="#e5e7eb";
    ctx.beginPath();
    ctx.moveTo(x1,y1); ctx.lineTo(x2,y1); ctx.lineTo(x2,y2); ctx.lineTo(x1,y2); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.fillStyle="#334155"; ctx.textAlign="center"; ctx.fillText(levels[i].name, cx, y1+stepH/2);
  }
}
