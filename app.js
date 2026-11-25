'use strict';
/* ================================================================
   MUSEUM DEX — APP.JS v2
   Single-scroll detail | Real photos | SVG World Map | 34 specimens
   ================================================================ */

if (typeof window !== 'undefined' && !window.MAP_DATA) {
  window.MAP_DATA = null;
}

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
        <button class="btn btn-danger btn-sm" id="modal-confirm">Yes, Reset</button>
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
// SVG WORLD MAP — Natural Earth Miller Projection (960×500)
// Complete Real Continents: North America, South America, Europe,
// Africa, Asia, Australia, Antarctica.
// Highlights ONLY the continent(s) where the animal/plant is found.
// ================================================================
function getWorldMapSVG(continents, color = '#4ADE80', locationText = '') {
  const highlighted = Array.isArray(continents) ? continents : [continents];
  const isGlobal    = highlighted.includes('global');

  // Continental keys recognized in map dataset
  const ALL_CONTINENTS = [
    'north-america',
    'south-america',
    'europe',
    'africa',
    'asia',
    'australia',
    'antarctica'
  ];

  const CONTINENT_NAMES = {
    'north-america': 'North America',
    'south-america': 'South America',
    'europe':        'Europe',
    'africa':        'Africa',
    'asia':          'Asia',
    'australia':     'Australia & Oceania',
    'antarctica':    'Antarctica'
  };

  const toHighlight = new Set();
  if (isGlobal) {
    ALL_CONTINENTS.forEach(k => toHighlight.add(k));
  } else {
    for (const c of highlighted) {
      if (ALL_CONTINENTS.includes(c)) toHighlight.add(c);
    }
  }

  // Pre-calculated representative centroid coords for location pins
  const PIN_CENTROIDS = {
    'north-america': { x: 235, y: 150, name: 'North America' },
    'south-america': { x: 330, y: 300, name: 'South America' },
    'europe':        { x: 505, y: 130, name: 'Europe' },
    'africa':        { x: 515, y: 250, name: 'Africa' },
    'asia':          { x: 695, y: 165, name: 'Asia' },
    'australia':     { x: 815, y: 330, name: 'Australia' },
    'antarctica':    { x: 500, y: 435, name: 'Antarctica' }
  };

  // Safe data lookup: prefer synchronously loaded window.MAP_DATA
  const pathsData = (typeof MAP_DATA !== 'undefined' && MAP_DATA) ? MAP_DATA :
                    (typeof window !== 'undefined' && window.MAP_DATA) ? window.MAP_DATA : {};

  // Render continent paths with high contrast for inactive and vivid glow for active
  const paths = ALL_CONTINENTS.map(id => {
    const d = pathsData[id];
    if (!d) return '';
    const lit = toHighlight.has(id);
    return `<path id="continent-${id}" d="${d}"
      fill="${lit ? color : '#233A56'}"
      fill-opacity="${lit ? '0.96' : '0.88'}"
      stroke="${lit ? '#FFFFFF' : 'rgba(255,255,255,0.22)'}"
      stroke-width="${lit ? '2.0' : '0.85'}"
      stroke-linejoin="round"
      ${lit ? 'filter="url(#world-glow)" style="transition:fill 0.4s ease, filter 0.4s ease;"' : ''}
    />`;
  }).join('\n');

  // Pulsing location beacons on lit continents
  const beaconPins = Array.from(toHighlight).map(id => {
    const pt = PIN_CENTROIDS[id];
    if (!pt) return '';
    return `
      <g class="map-pin-pulse" transform="translate(${pt.x}, ${pt.y})">
        <circle r="7" fill="none" stroke="${color}" stroke-width="2.2" opacity="0.9">
          <animate attributeName="r" values="5;26" dur="2.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.95;0" dur="2.2s" repeatCount="indefinite"/>
        </circle>
        <circle r="4.5" fill="#FFFFFF" stroke="${color}" stroke-width="2.5" filter="url(#pin-glow)"/>
        <circle r="1.8" fill="${color}"/>
      </g>
    `;
  }).join('\n');

  // Summary badge text
  let badgeLabel = 'Global Discovery';
  if (isGlobal) {
    badgeLabel = 'Found Worldwide';
  } else {
    const names = Array.from(toHighlight).map(k => CONTINENT_NAMES[k] || k);
    if (names.length === 1) badgeLabel = names[0];
    else if (names.length > 1) badgeLabel = names.slice(0, 2).join(', ') + (names.length > 2 ? ` +${names.length - 2}` : '');
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 500" preserveAspectRatio="xMidYMid meet" style="display:block;width:100%;height:auto;">
    <defs>
      <!-- Intense glowing filter for the highlighted continent -->
      <filter id="world-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1"/>
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur2"/>
        <feMerge>
          <feMergeNode in="blur2"/>
          <feMergeNode in="blur1"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="pin-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="pblur"/>
        <feMerge>
          <feMergeNode in="pblur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <!-- High-tech natural ocean gradient -->
      <radialGradient id="oceanGrad" cx="50%" cy="45%" r="70%">
        <stop offset="0%"   stop-color="#142842"/>
        <stop offset="60%"  stop-color="#0D1D33"/>
        <stop offset="100%" stop-color="#071224"/>
      </radialGradient>
      <!-- Linear wave shimmer pattern -->
      <pattern id="oceanGrid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- Deep Ocean Base -->
    <rect width="960" height="500" fill="url(#oceanGrad)"/>
    <rect width="960" height="500" fill="url(#oceanGrid)"/>

    <!-- Graticules (Latitude & Longitude Atlas Lines) -->
    <g stroke="rgba(255,255,255,0.06)" stroke-width="1" stroke-dasharray="4,4">
      <line x1="0" y1="80" x2="960" y2="80"/>
      <line x1="0" y1="420" x2="960" y2="420"/>
      <line x1="0" y1="185" x2="960" y2="185"/>
      <line x1="0" y1="315" x2="960" y2="315"/>
      <line x1="240" y1="0" x2="240" y2="500"/>
      <line x1="720" y1="0" x2="720" y2="500"/>
    </g>
    <!-- Equator and Prime Meridian -->
    <line x1="0" y1="250" x2="960" y2="250" stroke="rgba(255,255,255,0.12)" stroke-width="1.2" stroke-dasharray="6,4"/>
    <line x1="480" y1="0" x2="480" y2="500" stroke="rgba(255,255,255,0.12)" stroke-width="1.2" stroke-dasharray="6,4"/>

    <!-- Continents -->
    <g id="world-continents">
      ${paths}
    </g>

    <!-- Animated Location Beacons -->
    <g id="world-beacons">
      ${beaconPins}
    </g>

    <!-- Top Floating Location Pill -->
    <g transform="translate(18, 16)">
      <rect width="210" height="32" rx="16" fill="rgba(8,18,34,0.85)" stroke="rgba(255,255,255,0.22)" stroke-width="1.2"/>
      <circle cx="16" cy="16" r="4.5" fill="${color}" filter="url(#pin-glow)"/>
      <text x="28" y="20.5" font-family="'Nunito', sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" letter-spacing="0.3">${badgeLabel}</text>
    </g>

    <!-- Bottom Legend -->
    <g transform="translate(18, 474)">
      <rect width="245" height="22" rx="11" fill="rgba(6,14,28,0.75)" stroke="rgba(255,255,255,0.12)" stroke-width="0.8"/>
      <circle cx="14" cy="11" r="4" fill="${color}"/>
      <text x="24" y="14.5" font-family="'Nunito', sans-serif" font-size="9.5" font-weight="800" fill="#E2E8F0">Specimen Habitat</text>
      <circle cx="132" cy="11" r="4" fill="#233A56" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
      <text x="142" y="14.5" font-family="'Nunito', sans-serif" font-size="9.5" font-weight="700" fill="rgba(255,255,255,0.6)">Other Continents</text>
    </g>

    <!-- Outer Map Border Frame -->
    <rect width="960" height="500" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
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
    const cols=['#D4A017','#E06A3B','#7FA76C','#C678DD'];
    const sz=3+Math.random()*5;
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
        <div class="splash-badge">NATURAL HISTORY MUSEUM</div>
        <div class="splash-title">Museum Dex</div>
        <div class="splash-subtitle">Prehistoric Hunter</div>
      </div>
      <div class="splash-cta">
        <button class="btn btn-primary btn-lg" data-action="go-entry">🔍 Start Your Hunt!</button>
        <div class="splash-tap-hint">Tap anywhere to begin expedition</div>
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
        <div class="entry-badge">EXHIBITION ADMISSION</div>
        <div class="entry-title">Museum Check-In</div>
        <div class="entry-subtitle">Scan the exhibit portal QR or enter with your explorer pass to begin!</div>
      </div>
      <div class="qr-frame">
        <div class="qr-inner">
          <div class="qr-scan-line"></div>
          <span class="qr-center-icon">🏛️</span>
        </div>
        <div class="qr-corner qr-tl"></div>
        <div class="qr-corner qr-tr"></div>
        <div class="qr-corner qr-bl"></div>
        <div class="qr-corner qr-br"></div>
        <div class="qr-pulse"></div><div class="qr-pulse"></div><div class="qr-pulse"></div>
      </div>
      <div class="entry-actions">
        <button class="btn btn-primary btn-full btn-lg" data-action="go-profile">🎫 Enter Exhibition</button>
        <div class="entry-demo-hint">Demo Mode · Tap to enter without physical QR</div>
      </div>
    </div>`;
}

/* ---- PROFILE SETUP ---- */
function renderProfile() {
  const avatarBtns = AVATARS.map((av,i)=>`
    <button class="avatar-btn ${i===state.avatar?'active':''}"
            data-action="pick-avatar" data-i="${i}" id="av-${i}">
      <span class="avatar-emoji">${av}</span>
    </button>`).join('');
  return `
    <div class="profile-screen anim-fade">
      <div class="profile-header">
        <div class="profile-badge">HUNTER PASSPORT</div>
        <div class="profile-title">Explorer Profile</div>
        <div class="profile-subtitle">Personalize your museum dex and expedition badge</div>
      </div>
      <div class="profile-card-group">
        <div class="profile-section-card">
          <span class="section-label">Choose Avatar</span>
          <div class="avatar-grid" id="avatar-grid">${avatarBtns}</div>
        </div>
        <div class="profile-section-card">
          <span class="section-label">Explorer Name</span>
          <div class="name-input-wrap">
            <span class="name-input-icon">👤</span>
            <input class="name-input" id="name-input" type="text" maxlength="20"
                   placeholder="Enter your hunter name…" value="${state.name}"
                   autocomplete="off" autocorrect="off" spellcheck="false"/>
          </div>
        </div>
      </div>
      <div class="profile-action-group">
        <button class="btn btn-primary btn-full btn-lg" data-action="start-adventure">Start Adventure →</button>
        ${state.catches.length>0?`<p class="profile-resume-note">Welcome back! You have <strong>${state.catches.length}</strong> specimens discovered.</p>`:''}
      </div>
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
        <div class="home-top-bar">
          <div class="museum-brand-pill">
            <span class="museum-brand-icon">🏛️</span>
            <span class="museum-brand-text">MUSEUM DEX</span>
          </div>
          <button class="reset-btn" data-action="reset">↺ Reset</button>
        </div>

        <div class="home-museum-arch">
          <div class="home-arch-inner">
            <div class="home-greeting">PREHISTORIC EXPEDITION</div>
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
      </div>

      <!-- XP Bar Card -->
      <div class="home-xp-card">
        <div class="xp-row">
          <div class="xp-title-group">
            <span class="xp-icon">⚡</span>
            <span class="xp-label">Expedition XP</span>
          </div>
          <span class="xp-val">${xp} XP</span>
        </div>
        <div class="xp-track"><div class="xp-fill" style="width:${xpPct}%"></div></div>
        <div class="xp-sub-row">
          <span>${nextRank ? `Next: ${nextRank.emoji} ${nextRank.name}` : 'Max Rank Reached!'}</span>
          <span>${nextRank ? `${nextRank.minXP - xp} XP to level up` : 'Master Hunter'}</span>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="stats-row">
        <div class="stat-chip">
          <div class="stat-icon-wrap"><span class="stat-icon">🏹</span></div>
          <div class="stat-num">${state.catches.length}</div>
          <div class="stat-lbl">Discovered</div>
        </div>
        <div class="stat-chip">
          <div class="stat-icon-wrap"><span class="stat-icon">❓</span></div>
          <div class="stat-num">${TOTAL-state.catches.length}</div>
          <div class="stat-lbl">Remaining</div>
        </div>
        <div class="stat-chip">
          <div class="stat-icon-wrap"><span class="stat-icon">📜</span></div>
          <div class="stat-num">${Math.round(state.catches.length/TOTAL*100)}%</div>
          <div class="stat-lbl">Explored</div>
        </div>
      </div>

      <!-- Gallery Banners -->
      <div class="home-gallery-label">
        <span>🏛️ Museum Galleries</span>
        <span class="gallery-count-badge">3 Halls</span>
      </div>
      <div class="cat-cards">

        <div class="cat-card cat-fossil anim-right s1" data-action="go-hunt" data-cat="fossil">
          <div class="cat-card-header">
            <div class="cat-tag">🦴 Fossils</div>
            <div class="cat-museum-label">Hall I</div>
          </div>
          <div class="cat-name">Fossil Hall</div>
          <div class="cat-prog-text">${fc} of ${FOSSIL_IDS.length} unearthed · ${Math.round(fc/FOSSIL_IDS.length*100)}%</div>
          <div class="cat-prog-bar"><div class="cat-prog-fill fill-fossil" style="width:${fc/FOSSIL_IDS.length*100}%"></div></div>
          <div class="cat-card-art">🦴</div>
          <div class="cat-explore-hint">Explore Hall <span>→</span></div>
        </div>

        <div class="cat-card cat-dino anim-right s2" data-action="go-hunt" data-cat="dinosaur">
          <div class="cat-card-header">
            <div class="cat-tag">🦖 Dinosaurs</div>
            <div class="cat-museum-label">Hall II</div>
          </div>
          <div class="cat-name">Dino Safari</div>
          <div class="cat-prog-text">${dc} of ${DINO_IDS.length} discovered · ${Math.round(dc/DINO_IDS.length*100)}%</div>
          <div class="cat-prog-bar"><div class="cat-prog-fill fill-dino" style="width:${dc/DINO_IDS.length*100}%"></div></div>
          <div class="cat-card-art">🦖</div>
          <div class="cat-explore-hint">Explore Hall <span>→</span></div>
        </div>

        <div class="cat-card cat-plant anim-right s3" data-action="go-hunt" data-cat="plant">
          <div class="cat-card-header">
            <div class="cat-tag">🌿 Ancient Flora</div>
            <div class="cat-museum-label">Hall III</div>
          </div>
          <div class="cat-name">Ancient Gardens</div>
          <div class="cat-prog-text">${pc} of ${PLANT_IDS.length} gathered · ${Math.round(pc/PLANT_IDS.length*100)}%</div>
          <div class="cat-prog-bar"><div class="cat-prog-fill fill-plant" style="width:${pc/PLANT_IDS.length*100}%"></div></div>
          <div class="cat-card-art">🌿</div>
          <div class="cat-explore-hint">Explore Hall <span>→</span></div>
        </div>

      </div>

      <div class="hunt-cta-card anim-up s4" data-action="go-hunt" data-cat="all">
        <div class="hunt-cta-icon-box">🔍</div>
        <div class="hunt-cta-info">
          <div class="hunt-cta-title">Hunt All Specimens</div>
          <div class="hunt-cta-sub">Find all ${TOTAL} prehistoric wonders in the museum!</div>
        </div>
        <div class="hunt-cta-arrow">→</div>
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
        ${caught?'<div class="caught-tick">✓</div>':''}
        <div class="sp-card-body">
          <div class="sp-emoji-wrap">
            <div class="sp-emoji">${s.emoji}</div>
          </div>
          <div class="sp-info">
            <div class="sp-name">${s.name}</div>
            <div class="sp-category">${s.category}</div>
          </div>
          <div class="rarity-badge ${rarityClass(s.rarity)}">${rarityIcon(s.rarity)} ${rarityLabel(s.rarity)}</div>
        </div>
        <div class="sp-action-wrap">
          ${caught
            ? `<div class="caught-chip">✨ Caught!</div>`
            : `<button class="scan-btn-mini" data-action="open-scanner" data-id="${s.id}">📷 Scan</button>`}
        </div>
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
  const pct=Math.round(state.catches.length/TOTAL*100);
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
        <div class="coll-emoji-wrap">
          <div class="coll-emoji">${s.emoji}</div>
        </div>
        <div class="coll-name">${caught?s.name:'Unknown'}</div>
        ${caught
          ? `<div class="rarity-badge ${rarityClass(s.rarity)} coll-rarity">${rarityLabel(s.rarity)}</div>`
          : `<div class="lock-overlay"><span class="lock-icon">🔒</span></div>`}
      </div>`;
  }).join('');
  return `
    <div class="index-screen anim-fade">
      <div class="index-header">
        <div class="index-title-row">
          <div class="index-title">📖 Prehistoric Index</div>
          <div class="index-count-pill">${state.catches.length}/${TOTAL}</div>
        </div>
        <div class="index-subtitle">${state.catches.length} of ${TOTAL} specimens discovered (${pct}%)</div>
        <div class="index-progress-track">
          <div class="index-progress-fill" style="width:${pct}%"></div>
        </div>
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
  const mapSVG = getWorldMapSVG(s.continents, hiColor, s.location);

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
  const pct=Math.round(unlockCount/ACHIEVEMENTS.length*100);
  const achHtml=ACHIEVEMENTS.map(ach=>{
    const unlocked=state.achievements.includes(ach.id);
    return `
      <div class="achiev-card ${unlocked?'unlocked':'locked'}">
        <div class="ach-icon-wrap">${ach.emoji}</div>
        <div class="ach-info">
          <div class="ach-name-row">
            <div class="ach-name">${ach.name}</div>
            ${unlocked?'<span class="ach-badge-tag">Earned</span>':''}
          </div>
          <div class="ach-desc">${ach.description}</div>
          ${unlocked?'<div class="ach-unlocked-lbl">✅ Unlocked!</div>':''}
        </div>
        ${!unlocked?'<div class="ach-lock">🔒</div>':''}
      </div>`;
  }).join('');
  return `
    <div class="achiev-screen anim-fade">
      <div class="achiev-header">
        <div class="achiev-title-row">
          <div class="achiev-title">🏆 Hunter Medals</div>
          <div class="achiev-count-pill">${unlockCount}/${ACHIEVEMENTS.length}</div>
        </div>
        <div class="achiev-subtitle">${unlockCount} of ${ACHIEVEMENTS.length} badges earned (${pct}%)</div>
        <div class="achiev-progress-track">
          <div class="achiev-progress-fill" style="width:${pct}%"></div>
        </div>
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

  // Support direct preview URLs via query params (e.g. ?specimen=glossopteris or ?screen=index)
  const urlParams = new URLSearchParams(window.location.search);
  const directSpecimen = urlParams.get('specimen') || urlParams.get('id');
  const directScreen   = urlParams.get('screen');

  if (directSpecimen) {
    if (!state.name) state.name = 'Explorer';
    showScreen('detail', { specimenId: directSpecimen, from: 'index' });
  } else if (directScreen) {
    if (!state.name) state.name = 'Explorer';
    showScreen(directScreen);
  } else {
    showScreen(state.name ? 'home' : 'splash');
  }

  // Ensure high-resolution map data is available (prefer preloaded window.MAP_DATA)
  if (typeof window.MAP_DATA !== 'undefined' && window.MAP_DATA) {
    MAP_DATA = window.MAP_DATA;
  } else {
    fetch('world.json')
      .then(res => res.json())
      .then(data => { MAP_DATA = data; })
      .catch(err => console.error("Failed to load map data:", err));
  }

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
