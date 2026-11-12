// Astral Insights: a small hash-routed site. All content lives in data.js.
const app = document.getElementById('app');
const N = SIGNS.map(s => s.n);
const slug = n => n.toLowerCase();
const S = n => SIGNS[N.indexOf(n)];
const idx = n => N.indexOf(n);
const gl = (n, c = '') => `<svg class="gl ${c}" viewBox="-12 -12 24 24" aria-hidden="true">${GL[n]}</svg>`;
const ring = (n, c = '') => `<div class="ring ${c}">${gl(n)}</div>`;
const pills = (a, c = '') => a.map(x => `<span class="pill ${c}">${x}</span>`).join('');
const meter = (l, v) => `<div class="meter"><span>${l}</span><i><b style="width:${v}%"></b></i><em>${v}%</em></div>`;
const fact = (a, b) => `<div><span>${a}</span><b>${b}</b></div>`;
const AM = {0:75, 1:50, 2:85, 3:60, 4:90, 5:45, 6:70};
const score = (i, j) => { let d = Math.abs(i - j); d = Math.min(d, 12 - d); return AM[d]; };
const verdict = v => v>=88?'A natural, glowing match':v>=78?'A strong, easy match':v>=68?'A balanced match with spark':v>=58?'A match that grows with effort':'A challenging but rewarding match';
const vlabel = (v, same) => same?'Mirror match':v>=88?'Natural match':v>=78?'Strong match':v>=68?'Balanced':v>=58?'Needs effort':'Challenging';
const pair = (a, b) => { const [x, y] = [idx(a), idx(b)].sort((p, q) => p - q); return `${slug(N[x])}-${slug(N[y])}`; };
const mix = v => { const t = (v - 45) / 45, a = [0x3A,0x32,0x8C], b = [0xE3,0xBE,0x6B]; return `rgb(${a.map((c,i)=>Math.round(c+(b[i]-c)*t)).join(',')})`; };
const current = () => { const d = new Date(), v = (d.getMonth() + 1) * 100 + d.getDate();
  const m = SIGNS.filter(x => x.start <= v).sort((p, q) => q.start - p.start)[0]; return m ? m.n : 'Capricorn'; };
const pager = (n, base) => { const i = idx(n); return `<div class="pager"><a href="${base}${slug(N[(i+11)%12])}">‹ ${N[(i+11)%12]}</a><a href="#/">All signs</a><a href="${base}${slug(N[(i+1)%12])}">${N[(i+1)%12]} ›</a></div>`; };

const pages = {
  home() {
    const cur = current();
    return `<header class="hero"><svg class="sun" viewBox="-32 -32 64 64" aria-hidden="true">${SUN}</svg><h1>Astral Insights</h1><p class="sub">Discover Your Zodiac Personality</p><div class="rule"><i></i>✦<i></i></div></header>
    <div class="wrap"><div class="grid g4">${SIGNS.map(s => `<a class="card ${s.n===cur?'cur':''}" href="#/sign/${slug(s.n)}">${s.n===cur?'<span class="now">Now</span>':''}${ring(s.n)}<h3>${s.n}</h3><p class="d">${s.dates}</p><p class="e">${s.el} sign</p></a>`).join('')}</div></div>`;
  },
  sign(n) {
    const s = S(n);
    return `<div class="wrap"><a class="back" href="#/">‹ All signs</a><div class="two">
    <section class="box">${ring(n, 'big')}<h2 class="name">${n}</h2><p class="born">Born between</p><p class="dates">${s.dates}</p>
    <div class="facts">${fact('Ruling planet', s.ruler)}${fact('Element', s.el)}${fact('Modality', s.mod)}${fact('Symbol', s.sym)}${fact('Lucky day', s.day)}${fact('Lucky color', s.color)}${fact('Birthstone', s.stone)}</div></section>
    <section class="panel"><h2 class="h2">Personality</h2><p>${s.over}</p><h3>Strengths</h3><div class="pills">${pills(s.st)}</div><h3>Challenges</h3><div class="pills">${pills(s.ch, 'alt')}</div>
    <h3>Love and compatibility</h3><p>${s.love}</p><h3>Best matches</h3><div class="pills">${s.mt.map(m => `<a class="pill" href="#/sign/${slug(m)}">${m}</a>`).join('')}</div>
    <p style="margin-top:22px"><a class="gl-link" href="#/matches/${slug(n)}">See all ${n} compatibility ›</a></p></section></div>${pager(n, '#/sign/')}</div>`;
  },
  horoscopes() {
    const cur = current();
    return `<div class="wrap"><h2 class="ti">All Horoscopes</h2><p class="sub2">${new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
    <div class="grid g4">${SIGNS.map(s => `<a class="card mini ${s.n===cur?'cur':''}" href="#/horoscope/${slug(s.n)}"><div class="top">${ring(s.n)}<div><h3>${s.n}</h3><small>${s.hor.mood}, ${s.dates}</small></div></div><p class="t">${s.hor.tip}</p>
    <div class="bars">${['Love','Career','Wellness','Luck'].map((l,i)=>`<div><i><b style="width:${s.hor.vals[i]}%"></b></i><span>${l} ${s.hor.vals[i]}</span></div>`).join('')}</div></a>`).join('')}</div></div>`;
  },
  horoscope(n) {
    const s = S(n), h = s.hor;
    return `<div class="wrap"><a class="back" href="#/horoscopes">‹ All horoscopes</a><h2 class="ti" style="margin-bottom:22px">Daily Horoscope</h2>
    <div class="sel">${SIGNS.map(x => `<a class="${x.n===n?'on':''}" href="#/horoscope/${slug(x.n)}"><div class="c">${gl(x.n)}</div>${x.n.length>8?x.n.slice(0,4)+'.':x.n}</a>`).join('')}</div>
    <div class="two" style="grid-template-columns:400px 1fr"><section class="box">${ring(n,'md')}<h2 class="name" style="font-size:44px">${n}</h2><p class="dates">${s.dates}</p>
    <div class="facts">${fact('Mood', h.mood)}${fact('Lucky number', h.lucky)}${fact('Lucky color', s.color)}${fact('Best time', h.time)}</div></section>
    <section class="panel"><h2 class="h2">Today for ${n}</h2><p style="font-style:italic;color:var(--light);margin-bottom:14px">${new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p><p>${h.over}</p>
    <div style="margin-top:26px">${['Love','Career','Wellness','Luck'].map((l,i)=>meter(l,h.vals[i])).join('')}</div><p class="tip">Cosmic tip: ${h.tip}</p></section></div></div>`;
  },
  compat(key) {
    const [a, b] = (key || 'aries-leo').split('-').map(x => N.find(n => slug(n) === x) || 'Aries');
    const i = idx(a), j = idx(b), sc = score(i, j), els = [S(a).el, S(b).el], c = e => els.filter(x => x === e).length;
    const fx = [S(a).mod, S(b).mod].filter(x => x === 'Fixed').length, cl = v => Math.max(35, Math.min(98, v));
    const ms = [['Love', cl(sc+4*c('Fire')+3*c('Water')-4)], ['Friendship', cl(sc+4*c('Air')+3*c('Fire')-3)], ['Communication', cl(sc+6*c('Air')+2*c('Fire')-5)], ['Trust', cl(sc+4*c('Earth')+3*c('Water')+3*fx-5)]];
    let d = Math.abs(i - j); d = Math.min(d, 12 - d);
    const sum = ET[[...els].sort().join('|')] + ' ' + ASP[d];
    const side = n => `<div class="s">${ring(n,'md')}<a href="#/matches/${slug(n)}"><h3>${n}</h3></a><small>${S(n).el} sign</small></div>`;
    let mx = '<span></span>' + N.map(n => gl(n, n===a||n===b?'hi':'')).join('');
    N.forEach((r, y) => { mx += gl(r, r===a||r===b?'hi':''); N.forEach((cn, x) => { const v = score(y, x); mx += `<a href="#/compat/${pair(r, cn)}" class="${(y===i&&x===j)||(y===j&&x===i)?'sel':''}" style="background:${mix(v)}" aria-label="${r} and ${cn}: ${v}%"></a>`; }); });
    return `<div class="wrap"><h2 class="ti">Compatibility</h2><p class="sub2">See how two signs match</p><div class="pair">
    <section class="panel"><div class="pc">${side(a)}<div class="score" style="--p:${sc}"><b>${sc}%</b></div>${side(b)}</div><p class="pt">${a} and ${b}</p><p class="pv">${verdict(sc)}</p>${ms.map(m => meter(m[0], m[1])).join('')}<p style="font-size:17px;margin-top:18px">${sum}</p></section>
    <section class="panel"><h2 class="h2" style="text-align:center">All pairings</h2><div class="mx">${mx}</div><div class="lg">Lower<i></i>Higher</div><p class="note" style="color:var(--gold)">Select any square to compare that pair</p><p class="note">Simplified chart based on the angle between signs</p></section></div></div>`;
  },
  matches(n) {
    const s = S(n), i = idx(n), order = N.map((_, j) => j).sort((p, q) => score(i, q) - score(i, p) || p - q);
    const low = N.map((_, j) => j).filter(j => j !== i).sort((p, q) => score(i, p) - score(i, q) || p - q).slice(0, 2).map(j => N[j]);
    return `<div class="wrap"><h2 class="ti">${n} Compatibility</h2><p class="sub2">How ${n} matches with every sign</p><div class="two" style="grid-template-columns:340px 1fr">
    <section class="box">${ring(n,'md')}<a href="#/sign/${slug(n)}"><h2 class="name" style="font-size:38px">${n}</h2></a><p class="dates" style="margin-bottom:6px">${s.dates}</p><p class="born">${s.el} sign, ${s.mod}</p>
    <h3 style="color:var(--gold);margin:24px 0 10px">Best matches</h3><div class="pills" style="justify-content:center">${pills(s.mt)}</div><h3 style="color:var(--gold);margin:24px 0 10px">Needs more effort</h3><div class="pills" style="justify-content:center">${pills(low,'alt')}</div></section>
    <section class="panel" style="padding:20px">${order.map((j, r) => { const v = score(i, j), m = N[j]; return `<a class="rw ${r<3?'top':''}" href="#/compat/${pair(n, m)}"><span class="c">${gl(m)}</span><h4>${m}</h4><small>${S(m).el}</small><span class="bar"><b style="width:${v}%"></b></span><b>${v}%</b><em>${vlabel(v, j===i)}</em></a>`; }).join('')}</section></div>${pager(n, '#/matches/')}</div>`;
  }
};
function route() {
  const [, r = '', a = ''] = (location.hash || '#/').split('/');
  const cap = x => N.find(n => slug(n) === x);
  let html, nav = 'home';
  if (r === 'sign' && cap(a)) html = pages.sign(cap(a));
  else if (r === 'horoscopes') { html = pages.horoscopes(); nav = 'horoscopes'; }
  else if (r === 'horoscope' && cap(a)) { html = pages.horoscope(cap(a)); nav = 'horoscopes'; }
  else if (r === 'compat') { html = pages.compat(a); nav = 'compat'; }
  else if (r === 'matches' && cap(a)) { html = pages.matches(cap(a)); nav = 'compat'; }
  else html = pages.home();
  app.innerHTML = html;
  document.querySelectorAll('[data-nav]').forEach(l => l.classList.toggle('on', l.dataset.nav === nav));
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();
