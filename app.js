'use strict';
/* ================================================================
   MUSEUM DEX — APP.JS v2
   Single-scroll detail | Real photos | SVG World Map | 34 specimens
   ================================================================ */

let MAP_DATA = null;

// ================================================================
// STATE
// ================================================================
const state = {
  name:          '',
  avatar:        0,
  catches:       [],
  achievements:  [],
  huntCategory:  'all',
  indexTab:      'all',
  prevScreen:    'home',
  scanningId:    null,
  currentScreen: 'splash'
};

// ================================================================
// PERSISTENCE
// ================================================================
function saveState() {
  try {
    localStorage.setItem('mq_v2', JSON.stringify({
      name:         state.name,
      avatar:       state.avatar,
      catches:      state.catches,
      achievements: state.achievements
    }));
  } catch(e) {}
}
function loadState() {
  try {
    const raw = localStorage.getItem('mq_v2') || localStorage.getItem('mq_v1');
    if (!raw) return;
    const s = JSON.parse(raw);
    if (s.name)              state.name         = s.name;
    if (s.avatar != null)    state.avatar       = s.avatar;
    if (Array.isArray(s.catches))      state.catches      = s.catches;
    if (Array.isArray(s.achievements)) state.achievements = s.achievements;
  } catch(e) {}
}
function showConfirmModal(message, onConfirm) {
  const modal = document.createElement('div');
  modal.className = 'custom-modal-overlay anim-fade';
  modal.innerHTML = `
    <div class="custom-modal-card">
      <div class="custom-modal-emoji">⚠️</div>
      <div class="custom-modal-message">${message}</div>
      <div class="custom-modal-actions">
        <button class="btn btn-secondary btn-sm" id="modal-cancel">Keep playing</button>
        <button class="btn btn-primary btn-sm" id="modal-confirm" style="background:linear-gradient(135deg, var(--red), #8A1A1A);box-shadow:0 8px 24px rgba(255,107,107,0.3);color:white;">Yes, Reset</button>
      </div>
    </div>
  `;
  document.getElementById('app').appendChild(modal);

  modal.querySelector('#modal-cancel').onclick = () => modal.remove();
  modal.querySelector('#modal-confirm').onclick = () => {
    modal.remove();
    onConfirm();
  };
}

function resetState() {
  showConfirmModal('Do you want to reset all your progress? This cannot be undone!', () => {
    ['mq_v1','mq_v2'].forEach(k => localStorage.removeItem(k));
    state.name = ''; state.avatar = 0; state.catches = []; state.achievements = [];
    showScreen('splash');
  });
}

// ================================================================
// HELPERS
// ================================================================
function isCaught(id)  { return state.catches.includes(id); }
function getXP()       { return state.catches.reduce((s,id)=>s+(SPECIMENS.find(sp=>sp.id===id)?.xp||0),0); }
function getRank(xp)   { return [...RANKS].reverse().find(r=>xp>=r.minXP)||RANKS[0]; }

function rarityLabel(r) { return r==='ultra-rare'?'Ultra Rare':r==='rare'?'Rare':'Common'; }
function rarityClass(r) { return r==='ultra-rare'?'rarity-ultra-rare':r==='rare'?'rarity-rare':'rarity-common'; }
function rarityIcon(r)  { return r==='ultra-rare'?'⭐':r==='rare'?'💎':'●'; }

function getCleanImageUrl(url) {
  if (!url) return '';
  if (url.includes('upload.wikimedia.org')) {
    let decoded = decodeURIComponent(url);
    if (decoded.includes('/thumb/')) {
      const parts = decoded.split('/');
      const filename = parts[parts.length - 2];
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=500`;
    } else {
      const parts = decoded.split('/');
      const filename = parts[parts.length - 1];
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=500`;
    }
  }
  return url;
}

// ================================================================
// GAME LOGIC
// ================================================================
function catchSpecimen(id) {
  if (isCaught(id)) return false;
  state.catches.push(id);
  saveState();
  const newAchs = checkAchievements();
  if (newAchs.length) setTimeout(()=>showAchievementToast(newAchs[0]), 1800);
  return true;
}
function checkAchievements() {
  const unlocked = [];
  for (const ach of ACHIEVEMENTS) {
    if (!state.achievements.includes(ach.id) && ach.condition(state.catches)) {
      state.achievements.push(ach.id);
      unlocked.push(ach);
    }
  }
  if (unlocked.length) saveState();
  return unlocked;
}
function showAchievementToast(ach) {
  document.getElementById('ach-toast')?.remove();
  const t = document.createElement('div');
  t.id = 'ach-toast';
  t.innerHTML = `<div class="toast-inner">
    <span class="toast-emoji">${ach.emoji}</span>
    <div>
      <div class="toast-label">Achievement Unlocked!</div>
      <div class="toast-name">${ach.name}</div>
    </div>
  </div>`;
  document.getElementById('app').appendChild(t);
  setTimeout(()=>{ t.classList.add('hiding'); setTimeout(()=>t.remove(),500); }, 3200);
}

// ================================================================
// SVG WORLD MAP — Natural Earth simplified continent outlines
// Viewbox 1009×665, matching Natural Earth projection used on Wikipedia
// ================================================================
function getWorldMapSVG(continents, color) {
  const highlighted = Array.isArray(continents) ? continents : [continents];
  const isGlobal    = highlighted.includes('global');

  // Map specimen continent tags to SVG path keys
  const CONTINENT_MAP = {
    'north-america':   ['north-america', 'greenland'],
    'south-america':   ['south-america'],
    'europe':          ['europe'],
    'africa':          ['africa'],
    'asia':            ['asia', 'south-east-asia'],
    'australia':       ['australia'],
    'antarctica':      ['antarctica'],
    'global':          ['north-america', 'greenland', 'south-america', 'europe', 'africa', 'asia', 'south-east-asia', 'australia', 'antarctica']
  };

  const toHighlight = new Set();
  for (const c of highlighted) {
    (CONTINENT_MAP[c] || []).forEach(k => toHighlight.add(k));
  }
  if (isGlobal) {
    Object.keys(CONTINENT_MAP).forEach(k => {
      if (k !== 'global') CONTINENT_MAP[k].forEach(p => toHighlight.add(p));
    });
  }

  // Use the loaded high-resolution map data if available, otherwise fall back to simple mockup coordinates
  const pathsData = MAP_DATA || {
    'north-america': 'M 100,50 L 250,50 L 250,200 L 190,250 Z',
    'greenland': 'M 260,20 L 300,20 L 300,50 Z',
    'south-america': 'M 220,260 L 280,260 L 250,420 Z',
    'europe': 'M 350,40 L 450,40 L 450,90 Z',
    'africa': 'M 350,110 L 480,110 L 480,320 L 380,320 Z',
    'asia': 'M 460,30 L 790,30 L 740,180 L 540,180 Z',
    'south-east-asia': 'M 720,180 L 760,210 Z',
    'australia': 'M 630,250 L 780,250 L 760,360 L 670,340 Z',
    'antarctica': 'M 80,600 Q 505,585 930,600 L 930,625 Q 505,610 80,625 Z'
  };

  const paths = Object.entries(pathsData).map(([id, d]) => {
    const lit = toHighlight.has(id);
    return `<path id="continent-${id}" d="${d}"
      fill="${lit ? color : '#243447'}"
      fill-opacity="${lit ? '1.0' : '0.85'}"
      stroke="${lit ? color : 'rgba(255,255,255,0.18)'}"
      stroke-width="${lit ? '2.0' : '0.8'}"
      ${lit ? `filter="url(#glow)" style="transition:all 0.3s ease"` : ''}
    />`;
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1010 666" preserveAspectRatio="xMidYMid meet" style="display:block">
    <defs>
      <filter id="glow" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <radialGradient id="oceanGrad" cx="50%" cy="50%" r="70%">
        <stop offset="0%"   stop-color="#0E1E38"/>
        <stop offset="100%" stop-color="#060F22"/>
      </radialGradient>
    </defs>
    <rect width="1010" height="666" fill="url(#oceanGrad)"/>
    <!-- Grid lines for premium atlas feel -->
    <line x1="0" y1="333" x2="1010" y2="333" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    <line x1="505" y1="0" x2="505" y2="666" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    ${paths}
    <rect width="1010" height="666" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="2"/>
  </svg>`;
}

// ================================================================
// ROUTING
// ================================================================



const NAV_SCREENS = new Set(['home','hunt','index','achievements']);

function showScreen(name, params={}) {
  state.currentScreen = name;
  const $screen = document.getElementById('screen');
  const $nav    = document.getElementById('bottom-nav');

  if (NAV_SCREENS.has(name)) {
    $nav.classList.remove('hidden');
    document.querySelectorAll('.nav-item').forEach(btn=>
      btn.classList.toggle('active', btn.dataset.target===name)
    );
  } else {
    $nav.classList.add('hidden');
  }

  let html = '';
  switch (name) {
    case 'splash':       html = renderSplash();                    break;
    case 'entry':        html = renderEntry();                     break;
    case 'profile':      html = renderProfile();                   break;
    case 'home':         html = renderHome();                      break;
    case 'hunt':
      if (params.category) state.huntCategory = params.category;
      html = renderHunt();
      break;
    case 'scanner':
      state.scanningId = params.specimenId;
      state.prevScreen = 'hunt';
      html = renderScanner(params.specimenId);
      break;
    case 'capture':
      state.prevScreen = 'hunt';
      html = renderCapture(params.specimenId);
      catchSpecimen(params.specimenId);
      break;
    case 'index':
      if (params.tab) state.indexTab = params.tab;
      html = renderIndex();
      break;
    case 'detail':
      if (params.from) state.prevScreen = params.from;
      html = renderDetail(params.specimenId);
      break;
    case 'achievements': html = renderAchievements();              break;
    default:             html = renderSplash();
  }

  $screen.innerHTML = html;
  $screen.scrollTop = 0;

  if (name === 'capture')  initParticles(params.specimenId);
  if (name === 'profile')  initProfileHandlers();
  if (name === 'home' && state.catches.length >= TOTAL) spawnConfetti();
}

// ================================================================
// RENDERERS
// ================================================================

/* ---- SPLASH ---- */
function renderSplash() {
  const particles = Array.from({length:22},(_,i)=>{
    const cols=['#F5A623','#4ECDC4','#A8E063','#C678DD'];
    const sz=3+Math.random()*6;
    return `<div class="splash-particle" style="left:${Math.random()*100}%;width:${sz}px;height:${sz}px;background:${cols[i%cols.length]};--dur:${3+Math.random()*5}s;--del:${Math.random()*4}s"></div>`;
  }).join('');
  return `
    <div class="splash-screen" data-action="go-entry">
      <div style="position:absolute;inset:0;pointer-events:none">${particles}</div>
      <div class="splash-logo-wrap">
        <div class="splash-ring-wrap">
          <div class="splash-ring"></div>
          <div class="splash-ring"></div>
          <div class="splash-ring"></div>
          <span class="splash-main-emoji">🦕</span>
        </div>
        <div class="splash-title">Museum dex</div>
        <div class="splash-subtitle">Prehistoric Hunter</div>
      </div>
      <div class="splash-cta">
        <button class="btn btn-primary btn-lg" data-action="go-entry">🔍 Start Your Hunt!</button>
        <div class="splash-tap-hint">Tap anywhere to begin</div>
      </div>
      <div class="splash-dinos" style="pointer-events:none">
        <span class="splash-dino" style="--dur:7s;--del:0s">🦖</span>
        <span class="splash-dino" style="--dur:9s;--del:1s">🦕</span>
        <span class="splash-dino" style="--dur:6s;--del:2s">🦴</span>
        <span class="splash-dino" style="--dur:8s;--del:0.5s">🌿</span>
      </div>
    </div>`;
}

/* ---- ENTRY ---- */
function renderEntry() {
  return `
    <div class="entry-screen anim-fade">
      <div class="entry-header">
        <div class="entry-title">Welcome, Hunter!</div>
        <div class="entry-subtitle">Scan the museum entry QR code<br>to begin your prehistoric adventure!</div>
      </div>
      <div class="qr-frame">
        <div class="qr-inner">
          <div class="qr-scan-line"></div>
          <span style="font-size:52px;position:relative;z-index:1">📱</span>
        </div>
        <div class="qr-corner qr-tl"></div>
        <div class="qr-corner qr-tr"></div>
        <div class="qr-corner qr-bl"></div>
        <div class="qr-corner qr-br"></div>
        <div class="qr-pulse"></div><div class="qr-pulse"></div><div class="qr-pulse"></div>
      </div>
      <div class="entry-actions">
        <button class="btn btn-teal btn-full" data-action="go-profile">✅ Enter Museum</button>
        <div class="entry-demo-hint">Demo mode — tap to enter without scanning</div>
      </div>
    </div>`;
}

/* ---- PROFILE SETUP ---- */
function renderProfile() {
  const avatarBtns = AVATARS.map((av,i)=>`
    <button class="avatar-btn ${i===state.avatar?'active':''}"
            data-action="pick-avatar" data-i="${i}" id="av-${i}">${av}</button>`).join('');
  return `
    <div class="profile-screen anim-fade">
      <div class="profile-header">
        <div class="profile-title">Create Your Hunter 🦕</div>
        <div class="profile-subtitle">Who's on this prehistoric adventure?</div>
      </div>
      <div>
        <span class="section-label">Pick Your Explorer</span>
        <div class="avatar-grid" id="avatar-grid">${avatarBtns}</div>
      </div>
      <div>
        <span class="section-label">Hunter Name</span>
        <input class="name-input" id="name-input" type="text" maxlength="20"
               placeholder="Enter your name…" value="${state.name}"
               autocomplete="off" autocorrect="off" spellcheck="false"/>
      </div>
      <button class="btn btn-primary btn-full" data-action="start-adventure">🦕 Start Adventure!</button>
      ${state.catches.length>0?`<p style="text-align:center;font-size:12px;color:var(--text-muted)">You already have ${state.catches.length} specimens! Continuing your adventure…</p>`:''}
    </div>`;
}
function initProfileHandlers() {
  document.getElementById('avatar-grid')?.addEventListener('click',e=>{
    const btn=e.target.closest('[data-action="pick-avatar"]'); if (!btn) return;
    state.avatar=+btn.dataset.i;
    document.querySelectorAll('.avatar-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
}

/* ---- HOME ---- */
function renderHome() {
  const xp       = getXP();
  const rank     = getRank(xp);
  const nextRank = RANKS.find(r=>r.minXP>xp);
  const xpPct    = nextRank ? Math.min(100,(xp-rank.minXP)/(nextRank.minXP-rank.minXP)*100) : 100;

  const fossils  = SPECIMENS.filter(s=>s.category==='fossil');
  const dinos    = SPECIMENS.filter(s=>s.category==='dinosaur');
  const plants   = SPECIMENS.filter(s=>s.category==='plant');
  const fc=fossils.filter(s=>isCaught(s.id)).length;
  const dc=dinos.filter(s=>isCaught(s.id)).length;
  const pc=plants.filter(s=>isCaught(s.id)).length;

  return `
    <div class="home-screen anim-fade">

      <!-- Museum Hero Header -->
      <div class="home-museum-header">
        <div class="home-torches">
          <span class="home-torch left-torch">&#x1F525;</span>
          <span class="home-torch right-torch">&#x1F525;</span>
        </div>
        <div class="home-museum-arch">
          <div class="home-arch-inner">
            <div class="home-greeting">Welcome back, Explorer!</div>
            <div class="home-hunter-name">
              <span class="home-avatar">${AVATARS[state.avatar]}</span>
              <span>${state.name||'Hunter'}!</span>
            </div>
            <div class="rank-pill">
              <span class="rank-dot" style="background:${rank.color}"></span>
              <span class="rank-text" style="color:${rank.color}">${rank.emoji} ${rank.name}</span>
            </div>
          </div>
        </div>
        <button class="reset-btn" data-action="reset">&#x21BA; Reset</button>
      </div>

      <!-- XP Bar -->
      <div class="home-xp-section">
        <div class="xp-row">
          <span class="xp-label">&#x1F3C6; Hunt XP</span>
          <span class="xp-val">${xp} XP</span>
        </div>
        <div class="xp-track"><div class="xp-fill" style="width:${xpPct}%"></div></div>
      </div>

      <!-- Stats Row -->
      <div class="stats-row">
        <div class="stat-chip">
          <div class="stat-icon">&#x1F3F9;</div>
          <div class="stat-num">${state.catches.length}</div>
          <div class="stat-lbl">Caught</div>
        </div>
        <div class="stat-chip">
          <div class="stat-icon">&#x2753;</div>
          <div class="stat-num">${TOTAL-state.catches.length}</div>
          <div class="stat-lbl">Left</div>
        </div>
        <div class="stat-chip">
          <div class="stat-icon">&#x1F4DC;</div>
          <div class="stat-num">${Math.round(state.catches.length/TOTAL*100)}%</div>
          <div class="stat-lbl">Done</div>
        </div>
      </div>

      <!-- Gallery Banners -->
      <div class="home-gallery-label">&#x1F3DB;&#xFE0F; Museum Galleries</div>
      <div class="cat-cards">

        <div class="cat-card cat-fossil anim-right s1" data-action="go-hunt" data-cat="fossil">
          <div class="cat-museum-label">Gallery I</div>
          <div class="cat-tag">&#x1F9B4; Fossils</div>
          <div class="cat-name">Fossil Finds</div>
          <div class="cat-prog-text">${fc} of ${FOSSIL_IDS.length} unearthed</div>
          <div class="cat-prog-bar"><div class="cat-prog-fill fill-fossil" style="width:${fc/FOSSIL_IDS.length*100}%"></div></div>
          <div class="cat-card-art">&#x1F9B4;&#x1F9B4;</div>
        </div>

        <div class="cat-card cat-dino anim-right s2" data-action="go-hunt" data-cat="dinosaur">
          <div class="cat-museum-label">Gallery II</div>
          <div class="cat-tag">&#x1F996; Dinosaurs</div>
          <div class="cat-name">Dino Hunt</div>
          <div class="cat-prog-text">${dc} of ${DINO_IDS.length} discovered</div>
          <div class="cat-prog-bar"><div class="cat-prog-fill fill-dino" style="width:${dc/DINO_IDS.length*100}%"></div></div>
          <div class="cat-card-art">&#x1F996;&#x1F995;</div>
        </div>

        <div class="cat-card cat-plant anim-right s3" data-action="go-hunt" data-cat="plant">
          <div class="cat-museum-label">Gallery III</div>
          <div class="cat-tag">&#x1F33F; Ancient Gardens</div>
          <div class="cat-name">Ancient Gardens</div>
          <div class="cat-prog-text">${pc} of ${PLANT_IDS.length} gathered</div>
          <div class="cat-prog-bar"><div class="cat-prog-fill fill-plant" style="width:${pc/PLANT_IDS.length*100}%"></div></div>
          <div class="cat-card-art">&#x1F333;&#x1F340;</div>
        </div>

      </div>

      <div class="hunt-cta-card anim-up s4" data-action="go-hunt" data-cat="all">
        <div>
          <div class="hunt-cta-title">&#x1F50D; Hunt All Specimens</div>
          <div class="hunt-cta-sub">Find all ${TOTAL} prehistoric wonders!</div>
        </div>
        <div class="hunt-cta-arrow">&#x2192;</div>
      </div>
    </div>`;
}

/* ---- HUNT ZONE ---- */
function renderHunt() {
  const cat  = state.huntCategory;
  const tabs = [
    {id:'all',      label:`🌟 All (${TOTAL})`},
    {id:'fossil',   label:`🦴 Fossils (${FOSSIL_IDS.length})`},
    {id:'dinosaur', label:`🦖 Dinos (${DINO_IDS.length})`},
    {id:'plant',    label:`🌿 Gardens (${PLANT_IDS.length})`}
  ];
  const tabsHtml = tabs.map(t=>`
    <button class="filter-tab ${cat===t.id?'active':''}" data-action="hunt-tab" data-cat="${t.id}">${t.label}</button>`).join('');
  const filtered = cat==='all' ? SPECIMENS : SPECIMENS.filter(s=>s.category===cat);
  const cardsHtml = filtered.map((s,i)=>{
    const caught=isCaught(s.id);
    return `
      <div class="specimen-card ${caught?'caught':''} anim-up"
           style="--cf:${s.gradientFrom};--ct:${s.gradientTo};animation-delay:${i*0.03}s"
           data-action="${caught?'view-detail':'open-scanner'}" data-id="${s.id}">
        ${caught?'<div class="caught-tick">✅</div>':''}
        <div class="sp-emoji">${s.emoji}</div>
        <div class="sp-name">${s.name}</div>
        <div class="sp-category">${s.category}</div>
        <div class="rarity-badge ${rarityClass(s.rarity)}" style="position:relative">${rarityIcon(s.rarity)} ${rarityLabel(s.rarity)}</div>
        ${caught
          ? `<div class="caught-chip">✨ Caught!</div>`
          : `<button class="scan-btn-mini" data-action="open-scanner" data-id="${s.id}">📷 Scan to Catch</button>`}
      </div>`;
  }).join('');
  return `
    <div class="hunt-screen anim-fade">
      <div class="hunt-header">
        <div class="hunt-title">🔍 Hunt Zone</div>
        <div class="hunt-subtitle">Approach an exhibit and scan to catch!</div>
      </div>
      <div class="filter-tabs">${tabsHtml}</div>
      <div class="specimen-grid">${cardsHtml}</div>
    </div>`;
}

/* ---- SCANNER ---- */
function renderScanner(id) {
  const s=SPECIMENS.find(sp=>sp.id===id); if(!s) return '';
  return `
    <div class="scanner-screen">
      <button class="scanner-back" data-action="go-back">← Back</button>
      <div class="scanner-cam">
        <div class="radar-wrap">
          <div class="radar-sweep"></div>
          <div class="radar-ring"></div><div class="radar-ring"></div><div class="radar-ring"></div>
          <div class="radar-dot"></div>
        </div>
        <div class="scanner-preview">
          <span class="scanner-sp-emoji">${s.emoji}</span>
          <div>
            <div class="scanner-sp-name">${s.name}</div>
            <div class="scanner-sp-hint">⚡ Specimen detected!</div>
            <div class="rarity-badge ${rarityClass(s.rarity)}" style="margin-top:6px;display:inline-flex">${rarityIcon(s.rarity)} ${rarityLabel(s.rarity)}</div>
          </div>
        </div>
      </div>
      <div class="scanner-action-area">
        <button class="scan-now-btn" id="scan-now-btn" data-action="do-scan" data-id="${s.id}">⚡ SCAN NOW!</button>
        <div id="count-display" style="display:none"></div>
        <div style="font-size:12px;color:var(--text-muted);text-align:center;font-weight:700">Stand near the exhibit and tap to scan</div>
      </div>
    </div>`;
}

/* ---- CAPTURE ---- */
function renderCapture(id) {
  const s=SPECIMENS.find(sp=>sp.id===id); if(!s) return '';
  const colMap={'common':'#A8E063','rare':'#4ECDC4','ultra-rare':'#C678DD'};
  const col=colMap[s.rarity]||'#F5A623';
  return `
    <div class="capture-screen" style="--cap-col:${col}">
      <div class="capture-bg"></div>
      <canvas id="cap-canvas"></canvas>
      <div class="capture-body">
        <div class="cap-label">You discovered a…</div>
        <div class="cap-got-it">GOT IT! 🎉</div>
        <div class="cap-emoji">${s.emoji}</div>
        <div class="cap-name">${s.name}</div>
        <div class="cap-latin">${s.latinName}</div>
        <div class="cap-rarity"><span class="rarity-badge ${rarityClass(s.rarity)}" style="font-size:12px;padding:6px 14px">${rarityIcon(s.rarity)} ${rarityLabel(s.rarity)}</span></div>
        <div class="cap-xp">+${s.xp} XP Earned!</div>
        <div class="cap-actions">
          <button class="btn btn-primary" data-action="see-detail" data-id="${s.id}">📖 See Details</button>
          <button class="btn btn-secondary" data-action="go-index">🗂️ My Collection</button>
        </div>
      </div>
    </div>`;
}
function initParticles(id) {
  const canvas=document.getElementById('cap-canvas'); if(!canvas) return;
  const s=SPECIMENS.find(sp=>sp.id===id);
  const colMap={'common':'#A8E063','rare':'#4ECDC4','ultra-rare':'#C678DD'};
  setTimeout(()=>runParticles(canvas, colMap[s?.rarity]||'#F5A623'), 200);
}

/* ---- INDEX ---- */
function renderIndex() {
  const tab=state.indexTab;
  const tabs=[
    {id:'all',label:'🌟 All'},
    {id:'fossil',label:'🦴 Fossils'},
    {id:'dinosaur',label:'🦖 Dinos'},
    {id:'plant',label:'🌿 Gardens'}
  ];
  const tabsHtml=tabs.map(t=>`
    <button class="index-tab ${tab===t.id?'active':''}" data-action="index-tab" data-tab="${t.id}">${t.label}</button>`).join('');
  const list=tab==='all'?SPECIMENS:SPECIMENS.filter(s=>s.category===tab);
  const cardsHtml=list.map((s,i)=>{
    const caught=isCaught(s.id);
    return `
      <div class="coll-card ${caught?'caught':'locked'} anim-up"
           style="${caught?`--cf:${s.gradientFrom};--ct:${s.gradientTo};`:''}animation-delay:${i*0.02}s"
           data-action="${caught?'view-detail':'locked-tap'}" data-id="${s.id}">
        <div class="coll-emoji">${s.emoji}</div>
        <div class="coll-name">${caught?s.name:'???'}</div>
        ${caught
          ? `<div class="rarity-badge ${rarityClass(s.rarity)}" style="font-size:8px;padding:2px 7px">${rarityLabel(s.rarity)}</div>`
          : `<div class="lock-overlay">🔒</div>`}
      </div>`;
  }).join('');
  return `
    <div class="index-screen anim-fade">
      <div class="index-header">
        <div class="index-title">📖 Prehistoric Index</div>
        <div class="index-subtitle">${state.catches.length} of ${TOTAL} specimens discovered</div>
      </div>
      <div class="index-tabs">${tabsHtml}</div>
      <div class="collection-grid">${cardsHtml}</div>
    </div>`;
}

/* ---- DETAIL — Single Scrollable Page ---- */
function renderDetail(id) {
  const s=SPECIMENS.find(sp=>sp.id===id); if(!s) return '';

  // Pick a highlight color based on rarity
  const hiColor = s.rarity==='ultra-rare' ? '#C678DD' : s.rarity==='rare' ? '#4ECDC4' : '#A8E063';

  // Features in 2-col grid
  const featuresHtml = s.features.map(f=>`
    <div class="feat-item">
      <div class="feat-icon">${f.icon}</div>
      <div class="feat-label">${f.label}</div>
      <div class="feat-val">${f.value}</div>
    </div>`).join('');

  // World map
  const mapSVG = getWorldMapSVG(s.continents, hiColor);

  return `
    <div class="detail-screen anim-up">

      <!-- ── Hero Photo ── -->
      <div class="detail-photo-wrap" id="photo-wrap"
           style="--cf:${s.gradientFrom};--ct:${s.gradientTo};--glow:${s.glowColor}">
        <div class="detail-photo-bg"></div>
        <div class="detail-photo-glow"></div>
        <img class="detail-photo"
             src="${getCleanImageUrl(s.imageUrl)}"
             referrerpolicy="no-referrer"
             alt="${s.name} — ${s.latinName}"
             onerror="document.getElementById('photo-wrap').classList.add('photo-failed')" />
        <div class="detail-photo-overlay"></div>
        <!-- Emoji shown ONLY when photo fails to load -->
        <div class="detail-hero-emoji">${s.emoji}</div>
        <button class="detail-back" data-action="detail-back">← Back</button>
        <div class="detail-rarity-badge">
          <span class="rarity-badge ${rarityClass(s.rarity)} rarity-hero">${rarityIcon(s.rarity)} ${rarityLabel(s.rarity)}</span>
        </div>
      </div>

      <!-- ── Content ── -->
      <div class="detail-content">

        <!-- Name -->
        <div class="detail-name">${s.name}</div>
        <div class="detail-latin">${s.latinName}</div>

        <!-- Description -->
        <p class="detail-desc">${s.description}</p>

        <!-- Fun Fact -->
        <div class="fun-fact-box">
          <div class="ff-icon">💡</div>
          <div>
            <div class="ff-label">Fun Fact!</div>
            <div class="ff-text">${s.funFact}</div>
          </div>
        </div>

        <div class="detail-divider"></div>

        <!-- Features -->
        <div class="detail-section-title">📊 Cool Features</div>
        <div class="features-grid">${featuresHtml}</div>

        <div class="detail-divider"></div>

        <!-- World Map -->
        <div class="detail-section-title">🌍 Where in the World?</div>
        <div class="map-wrap">${mapSVG}</div>

        <!-- Origin info -->
        <div class="origin-chips">
          <div class="origin-chip">
            <div class="ori-icon">📍</div>
            <div>
              <div class="ori-label">Found In</div>
              <div class="ori-val">${s.location}</div>
            </div>
          </div>
          <div class="origin-chip">
            <div class="ori-icon">⏳</div>
            <div>
              <div class="ori-label">Time Period</div>
              <div class="ori-val">${s.era}</div>
            </div>
          </div>
          <div class="origin-chip">
            <div class="ori-icon">💫</div>
            <div>
              <div class="ori-label">XP Reward</div>
              <div class="ori-val">${s.xp} Experience Points</div>
            </div>
          </div>
        </div>

      </div>
    </div>`;
}


/* ---- ACHIEVEMENTS ---- */
function renderAchievements() {
  const unlockCount=state.achievements.length;
  const achHtml=ACHIEVEMENTS.map(ach=>{
    const unlocked=state.achievements.includes(ach.id);
    return `
      <div class="achiev-card ${unlocked?'unlocked':'locked'}">
        <div class="ach-icon-wrap">${ach.emoji}</div>
        <div class="ach-info">
          <div class="ach-name">${ach.name}</div>
          <div class="ach-desc">${ach.description}</div>
          ${unlocked?'<div class="ach-unlocked-lbl">✅ Unlocked!</div>':''}
        </div>
        ${!unlocked?'<div class="ach-lock">🔒</div>':''}
      </div>`;
  }).join('');
  return `
    <div class="achiev-screen anim-fade">
      <div class="achiev-header">
        <div class="achiev-title">🏆 Achievements</div>
        <div class="achiev-subtitle">${unlockCount} of ${ACHIEVEMENTS.length} badges earned</div>
      </div>
      <div class="achiev-list">${achHtml}</div>
    </div>`;
}

// ================================================================
// PARTICLES
// ================================================================
function runParticles(canvas, baseColor) {
  const ctx=canvas.getContext('2d');
  const W=canvas.width=canvas.offsetWidth, H=canvas.height=canvas.offsetHeight;
  const cx=W/2, cy=H*0.42;
  const palette=[baseColor,'#F5A623','#FFD166','#4ECDC4','#A8E063','#ffffff'];
  const particles=[];
  for(let i=0;i<160;i++){
    const angle=Math.random()*Math.PI*2, speed=2+Math.random()*14;
    particles.push({x:cx,y:cy,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed-(2+Math.random()*5),g:0.10+Math.random()*0.12,size:2+Math.random()*9,col:palette[Math.floor(Math.random()*palette.length)],alpha:1,decay:0.006+Math.random()*0.012,rect:Math.random()>0.45,rot:Math.random()*Math.PI*2,rspd:(Math.random()-0.5)*0.18});
  }
  let raf;
  function draw() {
    ctx.clearRect(0,0,W,H);
    let alive=false;
    for(const p of particles){
      p.x+=p.vx; p.y+=p.vy; p.vy+=p.g; p.vx*=0.992; p.alpha-=p.decay; p.rot+=p.rspd;
      if(p.alpha<=0) continue; alive=true;
      ctx.save(); ctx.globalAlpha=Math.max(0,p.alpha); ctx.fillStyle=p.col;
      ctx.translate(p.x,p.y); ctx.rotate(p.rot);
      if(p.rect){const sz=p.size*p.alpha;ctx.fillRect(-sz/2,-sz/2,sz,sz*1.6);}
      else{ctx.beginPath();ctx.arc(0,0,p.size*p.alpha*0.7,0,Math.PI*2);ctx.fill();}
      ctx.restore();
    }
    if(alive) raf=requestAnimationFrame(draw);
  }
  draw();
  return ()=>cancelAnimationFrame(raf);
}

// ================================================================
// SCANNER COUNTDOWN
// ================================================================
function startCountdown(specimenId) {
  const btn=document.getElementById('scan-now-btn');
  const disp=document.getElementById('count-display');
  if(!btn||!disp) return;
  btn.style.display='none'; disp.style.display='block';
  let n=3;
  function tick(){
    disp.textContent=n;
    disp.style.animation='none'; void disp.offsetWidth;
    disp.style.animation='countIn 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    if(n===0){ showScreen('capture',{specimenId}); return; }
    n--; setTimeout(tick,800);
  }
  tick();
}

// ================================================================
// CONFETTI
// ================================================================
function spawnConfetti() {
  const cols=['#F5A623','#4ECDC4','#A8E063','#C678DD','#FF6B6B','#FFD166'];
  for(let i=0;i<60;i++){
    const el=document.createElement('div');
    el.className='confetti-bit';
    el.style.cssText=`left:${Math.random()*100}%;background:${cols[i%cols.length]};--dur:${1.5+Math.random()*2}s;--del:${Math.random()*1.5}s;border-radius:${Math.random()>0.5?'50%':'2px'};`;
    document.getElementById('app').appendChild(el);
    setTimeout(()=>el.remove(),4000);
  }
}

// ================================================================
// MASTER EVENT HANDLER
// ================================================================
document.addEventListener('DOMContentLoaded',()=>{
  loadState();
  showScreen(state.name ? 'home' : 'splash');

  // Load high-resolution map data asynchronously on startup
  fetch('world.json')
    .then(res => res.json())
    .then(data => { MAP_DATA = data; })
    .catch(err => console.error("Failed to load map data:", err));

  // Bottom nav
  document.getElementById('bottom-nav').addEventListener('click',e=>{
    const btn=e.target.closest('.nav-item');
    if(btn?.dataset.target) showScreen(btn.dataset.target);
  });

  // All delegated clicks
  document.getElementById('app').addEventListener('click',e=>{
    if(e.target.closest('#bottom-nav')) return;
    const el=e.target.closest('[data-action]'); if(!el) return;
    const {action,id,cat,tab,i} = {...el.dataset, action:el.dataset.action, i:el.dataset.i};

    switch(action){
      case 'go-entry':     showScreen('entry');                         break;
      case 'go-profile':   showScreen('profile');                       break;
      case 'go-back':      showScreen('hunt');                          break;
      case 'go-hunt':      showScreen('hunt',{category:cat||'all'});    break;
      case 'go-index':     showScreen('index');                         break;

      case 'pick-avatar':
        state.avatar=+i;
        document.querySelectorAll('.avatar-btn').forEach(b=>b.classList.remove('active'));
        el.classList.add('active');
        break;

      case 'start-adventure': {
        const inp=document.getElementById('name-input');
        const name=inp?inp.value.trim():'';
        if(!name){ inp?.classList.add('shake'); setTimeout(()=>inp?.classList.remove('shake'),500); inp?.focus(); return; }
        state.name=name; saveState(); showScreen('home');
        break;
      }

      case 'hunt-tab':  state.huntCategory=cat; showScreen('hunt');   break;
      case 'index-tab': state.indexTab=tab;     showScreen('index');  break;

      case 'open-scanner':
        if(!isCaught(id)) showScreen('scanner',{specimenId:id});
        break;
      case 'do-scan':      startCountdown(id);                         break;
      case 'see-detail':   state.prevScreen='index'; showScreen('detail',{specimenId:id,from:'index'}); break;

      case 'view-detail':
        state.prevScreen=state.currentScreen;
        showScreen('detail',{specimenId:id,from:state.currentScreen});
        break;
      case 'detail-back':  showScreen(state.prevScreen||'index');      break;

      case 'locked-tap': {
        const card=e.target.closest('.coll-card');
        if(card){ card.style.animation='none'; void card.offsetWidth; card.style.animation='shake 0.35s ease-out'; }
        break;
      }

      case 'reset': resetState(); break;
    }
  });
});
