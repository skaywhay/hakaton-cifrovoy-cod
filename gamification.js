/**
 * ЦИФРОВОЙ КОД 2.0 — ИГРОВОЙ ДВИЖОК ГЕЙМИФИКАЦИИ
 * Non-destructive enhancement: XP Engine, Gentle Web Audio, 8 Interactive Simulators,
 * Cyber-ID Canvas Generator with zero overlap, Daily Activities & Easter Eggs.
 */

(function () {
  'use strict';

  /* ==========================================================================
     КОНСТАНТЫ И ХРАНИЛИЩЕ LOCALSTORAGE
     ========================================================================== */
  const STORAGE_KEYS = {
    XP: 'digital_code_xp',
    ACHIEVEMENTS: 'digital_code_achievements',
    MUTED: 'digital_code_sound_muted',
    SIM_COMPLETED: 'digital_code_sim_completed',
    USER_NAME: 'digital_code_player_name',
    DAILY_CLAIMED: 'digital_code_daily_claimed',
    BLITZ_ANSWERED: 'digital_code_blitz_answered',
    CLAIMED_ACTIONS: 'digital_code_claimed_actions'
  };

  function getTodayKey() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /* ==========================================================================
     БИБЛИОТЕКА ВЕКТОРНОЙ ГРАФИКИ (PURE SVG ICONS — NO EMOJIS)
     ========================================================================== */
  const SVG_ICONS = {
    star: (s = 16, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="#EAB308"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    trophy: (s = 20, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34"/><path d="M6 4h12v7a6 6 0 0 1-12 0V4z"/></svg>`,
    academic_cap: (s = 20, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    scales: (s = 20, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="3" x2="12" y2="21"/><path d="M16 16l4-8H4l4 8"/><path d="M4 16h16"/><path d="M10 21h4"/></svg>`,
    palette: (s = 20, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
    database: (s = 20, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
    smartphone: (s = 20, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    gamepad: (s = 20, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>`,
    sparkles: (s = 20, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.885L20 10.8l-4.756 4.636 1.122 6.544L12 18.885l-4.366 3.095 1.122-6.544L4 10.8l6.088-1.915L12 3z"/></svg>`,
    bug: (s = 20, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="14" x="8" y="6" rx="4"/><path d="m19 7-3 2"/><path d="m5 7 3 2"/><path d="m19 19-3-2"/><path d="m5 19 3-2"/><path d="M20 13h-4"/><path d="M4 13h4"/><path d="m10 4 1 2"/><path d="m14 4-1 2"/></svg>`,
    rocket: (s = 20, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
    shield: (s = 20, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    coffee: (s = 18, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
    terminal: (s = 20, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    id_card: (s = 20, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 8h2"/><path d="M7 12h5"/><circle cx="16" cy="10" r="2"/></svg>`,
    gift: (s = 18, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,
    lightning: (s = 16, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    close: (s = 14, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    check: (s = 14, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    check_circle: (s = 18, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    cross_circle: (s = 18, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    sound_on: (s = 18, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
    sound_off: (s = 18, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
    lock: (s = 16, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    download: (s = 16, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    rotate: (s = 16, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
    eye: (s = 16, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    search: (s = 16, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    target: (s = 18, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    timer: (s = 16, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    warning: (s = 16, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    hammer: (s = 18, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 12-8.5 8.5a2.12 2.12 0 0 1-3-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 3.26-6.36 6.36a2 2 0 0 1-2.83 0l-1.41-1.41a2 2 0 0 1 0-2.83l6.36-6.36a2 2 0 0 1 2.83 0l1.41 1.41a2 2 0 0 1 0 2.83z"/></svg>`,
    flask: (s = 18, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31L4.69 17.65A2 2 0 0 0 6.4 21h11.2a2 2 0 0 0 1.71-3.35L14 9.31V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/><line x1="6" y1="14" x2="18" y2="14"/></svg>`,
    package: (s = 18, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    arrow_right: (s = 14, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    settings: (s = 16, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    rewind: (s = 16, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/></svg>`,
    dot_green: (s = 10, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="#22C55E"><circle cx="12" cy="12" r="10"/></svg>`,
    cpu: (s = 20, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></svg>`,
    chart: (s = 20, cls = '') => `<svg class="game-svg-icon ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`
  };

  function getIconSvg(name, size = 18, cls = '') {
    if (SVG_ICONS[name]) return SVG_ICONS[name](size, cls);
    return SVG_ICONS.star(size, cls);
  }


  const ACHIEVEMENTS_DATA = {
    quiz_completed: { title: 'IT-Навигатор', xp: 200, icon: 'academic_cap', desc: 'Пройден профориентационный тест' },
    bookmark_added: { title: 'Коллекционер', xp: 25, icon: 'star', desc: 'Профессия добавлена в избранное' },
    compare_used: { title: 'Аналитик', xp: 50, icon: 'scales', desc: 'Сравнение направлений бок о бок' },
    sim_frontend: { title: 'CSS Спасатель', xp: 150, icon: 'palette', desc: 'Пройден тест-драйв Frontend (CSS Rescue)' },
    sim_backend: { title: 'Мастер SQL', xp: 150, icon: 'database', desc: 'Пройден тест-драйв Backend (SQL Architect)' },
    sim_mobile: { title: 'Мобильный инженер', xp: 150, icon: 'smartphone', desc: 'Пройден тест-драйв Mobile (FPS Lab)' },
    sim_gamedev: { title: 'Физика GameDev', xp: 150, icon: 'gamepad', desc: 'Пройден тест-драйв GameDev (Physics Jump)' },
    sim_uiux: { title: 'Мастер доступности', xp: 150, icon: 'sparkles', desc: 'Пройден тест-драйв UI/UX (WCAG Contrast)' },
    sim_qa: { title: 'Охотник на баги', xp: 150, icon: 'bug', desc: 'Пройден тест-драйв QA (Bug Hunter)' },
    sim_devops: { title: 'Инженер CI/CD', xp: 150, icon: 'rocket', desc: 'Пройден тест-драйв DevOps (Pipeline Rescue)' },
    sim_security: { title: 'Киберщит', xp: 150, icon: 'shield', desc: 'Пройден тест-драйв ИБ (Firewall Patrol)' },
    sim_ai_ml: { title: 'Архитектор AI', xp: 150, icon: 'cpu', desc: 'Пройден тест-драйв AI/ML (Hyperparam Tuning)' },
    sim_data: { title: 'Дата-детектив', xp: 150, icon: 'chart', desc: 'Пройден тест-драйв Аналитики (Funnel Discovery)' },
    easter_coffee: { title: 'Кофейный допинг', xp: 100, icon: 'coffee', desc: 'Активирован турбо-режим интерфейса' },
    easter_konami: { title: 'Хакер матрицы', xp: 100, icon: 'terminal', desc: 'Введён легендарный Konami-код' },
    cyber_id_created: { title: 'Цифровой паспорт', xp: 50, icon: 'id_card', desc: 'Сгенерирован персональный Cyber-ID' },
    daily_streak: { title: 'Ежедневный буст', xp: 50, icon: 'gift', desc: 'Получен ежедневный бонус разработчика' }
  };

  const LEVELS = [
    { lvl: 1, title: 'Junior', minXp: 0, maxXp: 500 },
    { lvl: 2, title: 'Middle', minXp: 500, maxXp: 1200 },
    { lvl: 3, title: 'Senior', minXp: 1200, maxXp: 2200 },
    { lvl: 4, title: 'Team Lead', minXp: 2200, maxXp: 3500 },
    { lvl: 5, title: 'Architect', minXp: 3500, maxXp: 999999 }
  ];

  /* ==========================================================================
     МЯГКИЙ, ПРИЯТНЫЙ WEB AUDIO СИНТЕЗАТОР (GENTLE ACOUSTIC / CHIME DESIGN)
     ========================================================================== */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = localStorage.getItem(STORAGE_KEYS.MUTED) === 'true';
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    setMuted(muted) {
      this.isMuted = muted;
      try {
        localStorage.setItem(STORAGE_KEYS.MUTED, String(muted));
      } catch (e) {}
    }

    toggleMute() {
      this.setMuted(!this.isMuted);
      if (!this.isMuted) {
        this.playClick();
      }
      return this.isMuted;
    }

    // Вспомогательный метод для мягких тонов с фильтром
    playSoftTone(freq, duration, gainLevel = 0.05, type = 'sine', decayTime = 0.15) {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      filter.Q.setValueAtTime(1, this.ctx.currentTime);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(gainLevel, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decayTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + decayTime + 0.05);
    }

    // Мягкий щелчок клика (древесный пузырёк / капля воды)
    playClick() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';

      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.035);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    }

    // Нежный перезвон колокольчиков при начислении опыта
    playXP() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      // Приятный аккорд: F5 (698.46) и A5 (880.00)
      const now = this.ctx.currentTime;
      [698.46, 880.00].forEach((freq, idx) => {
        setTimeout(() => {
          this.playSoftTone(freq, 0.22, 0.05, 'sine', 0.24);
        }, idx * 60);
      });
    }

    // Праздничный, но деликатный перезвон (музыкальная шкатулка): C5 -> E5 -> G5 -> C6
    playSuccess() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playSoftTone(freq, 0.35, 0.06, 'sine', 0.38);
        }, idx * 80);
      });
    }

    // Мягкий низкий стук ошибки (без пищащего зуммера)
    playError() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';

      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.14);
    }

    // Мягкий космический свип турбо-режима
    playTurbo() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';

      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(960, now + 0.3);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.38);
    }
  }

  const audioFX = new SoundEngine();

  window.addEventListener('click', () => audioFX.init(), { once: true });
  window.addEventListener('keydown', () => audioFX.init(), { once: true });

  /* ==========================================================================
     СИСТЕМА УРОВНЕЙ И ОПЫТА (XP ENGINE)
     ========================================================================== */
  class XPEngine {
    constructor() {
      this.xp = parseInt(localStorage.getItem(STORAGE_KEYS.XP) || '0', 10);
      if (isNaN(this.xp) || this.xp < 0) this.xp = 0;
      this.achievements = this.loadAchievements();
      this.simCompleted = this.loadSimCompleted();
      this.claimedActions = this.loadClaimedActions();
      this.lastAwardTime = 0;
    }

    loadAchievements() {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }

    saveAchievements() {
      try {
        localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(this.achievements));
      } catch (e) {}
    }

    loadSimCompleted() {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.SIM_COMPLETED);
        return raw ? JSON.parse(raw) : {};
      } catch (e) {
        return {};
      }
    }

    saveSimCompleted() {
      try {
        localStorage.setItem(STORAGE_KEYS.SIM_COMPLETED, JSON.stringify(this.simCompleted));
      } catch (e) {}
    }

    loadClaimedActions() {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.CLAIMED_ACTIONS);
        let list = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(list)) list = [];

        // Миграция из уже полученных ачивок и завершённых симуляторов
        let changed = false;
        if (Array.isArray(this.achievements)) {
          for (const ach of this.achievements) {
            if (!list.includes(ach)) {
              list.push(ach);
              changed = true;
            }
          }
        }
        if (this.simCompleted && typeof this.simCompleted === 'object') {
          for (const k of Object.keys(this.simCompleted)) {
            const key = 'sim_' + k;
            if (this.simCompleted[k] && !list.includes(key)) {
              list.push(key);
              changed = true;
            }
          }
        }
        if (changed) {
          localStorage.setItem(STORAGE_KEYS.CLAIMED_ACTIONS, JSON.stringify(list));
        }
        return list;
      } catch (e) {
        return [];
      }
    }

    saveClaimedActions() {
      try {
        localStorage.setItem(STORAGE_KEYS.CLAIMED_ACTIONS, JSON.stringify(this.claimedActions));
      } catch (e) {}
    }

    isActionClaimed(actionKey) {
      if (!actionKey) return false;
      return this.claimedActions.includes(actionKey);
    }

    markActionClaimed(actionKey) {
      if (!actionKey) return;
      if (!this.claimedActions.includes(actionKey)) {
        this.claimedActions.push(actionKey);
        this.saveClaimedActions();
      }
    }

    saveXP() {
      try {
        localStorage.setItem(STORAGE_KEYS.XP, String(this.xp));
      } catch (e) {}
    }

    getCurrentLevelInfo() {
      let current = LEVELS[0];
      for (const lvl of LEVELS) {
        if (this.xp >= lvl.minXp) {
          current = lvl;
        }
      }
      const tierRange = current.maxXp - current.minXp;
      const currentInTier = Math.min(this.xp - current.minXp, tierRange);
      const percent = Math.min(Math.round((currentInTier / tierRange) * 100), 100);

      return {
        level: current.lvl,
        title: current.title,
        totalXp: this.xp,
        currentInTier,
        tierMax: tierRange,
        percent
      };
    }

    addXP(amount, reason, actionKey = null) {
      // 1. Защита от безымянных накруток: actionKey строго обязателен
      if (!actionKey || typeof actionKey !== 'string') {
        console.warn('[XP Engine] Отклонено: требуется уникальный actionKey для начисления опыта.');
        return false;
      }

      // 2. Идемпотентность: защита от повторного начисления
      if (this.isActionClaimed(actionKey)) {
        console.warn(`[XP Engine] Награда за действие "${actionKey}" уже получена ранее.`);
        return false;
      }

      // 3. Защита от скрипт-флуда и автоматических кликеров (cooldown 250 мс)
      const now = Date.now();
      if (now - this.lastAwardTime < 250) {
        console.warn('[XP Engine] Превышена частота начисления опыта (rate-limit).');
        return false;
      }

      // 4. Санитизация и ограничение суммы опыта (макс 250 XP за действие)
      const safeAmount = Math.min(Math.max(1, parseInt(amount, 10) || 0), 250);
      if (safeAmount <= 0) return false;

      // 5. Фиксация транзакции
      this.lastAwardTime = now;
      this.markActionClaimed(actionKey);

      // Синхронизация с ачивками, если ключ соответствует ACHIEVEMENTS_DATA
      if (ACHIEVEMENTS_DATA[actionKey] && !this.achievements.includes(actionKey)) {
        this.achievements.push(actionKey);
        this.saveAchievements();
      }

      const prevLevel = this.getCurrentLevelInfo().level;
      this.xp += safeAmount;
      this.saveXP();

      audioFX.playXP();
      showToast({
        icon: ACHIEVEMENTS_DATA[actionKey]?.icon || 'star',
        xp: `+${safeAmount} XP`,
        reason: reason || 'Достижение получено!'
      });

      this.updateHUD();

      const newLevel = this.getCurrentLevelInfo().level;
      if (newLevel > prevLevel) {
        setTimeout(() => {
          audioFX.playSuccess();
          const info = this.getCurrentLevelInfo();
          showToast({
            icon: 'trophy',
            xp: `УРОВЕНЬ ${info.level}!`,
            reason: `Поздравляем! Новый ранг: ${info.title}`
          });
        }, 500);
      }

      return true;
    }

    updateHUD() {
      const info = this.getCurrentLevelInfo();
      const badgeEl = document.getElementById('hudLevelBadge');
      const xpTextEl = document.getElementById('hudXpText');
      const barEl = document.getElementById('hudXpBar');
      const rankTitleEl = document.getElementById('hudRankTitle');
      const pillEl = document.getElementById('hudProfilePill');

      if (badgeEl) badgeEl.textContent = `Lvl ${info.level}`;
      if (rankTitleEl) rankTitleEl.textContent = info.title;
      if (xpTextEl) xpTextEl.textContent = `${info.currentInTier} / ${info.tierMax} XP`;
      if (barEl) barEl.style.width = `${info.percent}%`;

      if (pillEl) {
        pillEl.classList.remove('hud-pulse');
        void pillEl.offsetWidth;
        pillEl.classList.add('hud-pulse');
      }
    }
  }

  const xpEngine = new XPEngine();

  /* ==========================================================================
     СИСТЕМА ТОСТОВ (TOASTS)
     ========================================================================== */
  let toastContainer = null;

  function ensureToastContainer() {
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'game-toast-container';
      document.body.appendChild(toastContainer);
    }
    return toastContainer;
  }

  function showToast({ icon = 'star', xp = '+100 XP', reason = '' }) {
    const container = ensureToastContainer();
    const toast = document.createElement('div');
    toast.className = 'game-toast';
    toast.innerHTML = `
      <div class="game-toast-icon">${getIconSvg(icon, 22)}</div>
      <div class="game-toast-body">
        <div class="game-toast-xp">${xp}</div>
        <div class="game-toast-reason">${reason}</div>
      </div>
    `;

    toast.addEventListener('click', () => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    });

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
      }
    }, 3800);
  }

  /* ==========================================================================
     МОНТИРОВАНИЕ HUD И ПЕРЕКЛЮЧАТЕЛЯ ЗВУКА
     ========================================================================== */
  function injectHUD() {
    const topBarRight = document.querySelector('.top-bar-right-group');
    if (!topBarRight) return;

    if (document.getElementById('hudProfilePill')) return;

    const wrap = document.createElement('div');
    wrap.className = 'gamification-hud-wrap';

    const info = xpEngine.getCurrentLevelInfo();

    wrap.innerHTML = `
      <div class="hud-profile-pill" id="hudProfilePill" title="Ваш игровой профиль, активности и награды">
        <span class="hud-level-badge" id="hudLevelBadge">Lvl ${info.level}</span>
        <div class="hud-xp-info">
          <div class="hud-xp-label">
            <span class="hud-rank-title" id="hudRankTitle">${info.title}</span>
            <span id="hudXpText">${info.currentInTier} / ${info.tierMax} XP</span>
          </div>
          <div class="hud-xp-track">
            <div class="hud-xp-bar" id="hudXpBar" style="width: ${info.percent}%;"></div>
          </div>
        </div>
      </div>

      <button class="sound-toggle-btn ${audioFX.isMuted ? 'muted' : ''}" id="soundToggleBtn" title="${audioFX.isMuted ? 'Включить звук' : 'Выключить звук'}" aria-label="Переключатель звука">
        <span id="soundToggleIcon">${audioFX.isMuted ? getIconSvg('sound_off', 18) : getIconSvg('sound_on', 18)}</span>
      </button>
    `;

    topBarRight.prepend(wrap);

    const soundBtn = document.getElementById('soundToggleBtn');
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isMuted = audioFX.toggleMute();
      soundBtn.classList.toggle('muted', isMuted);
      soundBtn.title = isMuted ? 'Включить звук' : 'Выключить звук';
      document.getElementById('soundToggleIcon').innerHTML = isMuted ? getIconSvg('sound_off', 18) : getIconSvg('sound_on', 18);
    });

    const pill = document.getElementById('hudProfilePill');
    pill.addEventListener('click', () => openAchievementsModal());
  }

  /* ==========================================================================
     МОДАЛЬНОЕ ОКНО ПРОФИЛЯ, БОНУСОВ И ДОСТИЖЕНИЙ
     ========================================================================== */
  function openAchievementsModal() {
    audioFX.playClick();
    let modal = document.getElementById('achievementsModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'achievementsModal';
      modal.className = 'game-modal-overlay';
      document.body.appendChild(modal);
    }

    const info = xpEngine.getCurrentLevelInfo();
    const todayKey = getTodayKey();
    const isDailyClaimed = xpEngine.isActionClaimed('daily_boost_' + todayKey) || 
                           localStorage.getItem(STORAGE_KEYS.DAILY_CLAIMED) === todayKey;
    const isBlitzAnswered = xpEngine.isActionClaimed('blitz_' + todayKey) || 
                            localStorage.getItem(STORAGE_KEYS.BLITZ_ANSWERED) === todayKey;

    const achievementsHtml = Object.entries(ACHIEVEMENTS_DATA).map(([key, item]) => {
      const isUnlocked = xpEngine.achievements.includes(key);
      return `
        <div style="display:flex; align-items:center; gap:12px; padding:12px 16px; border-radius:var(--radius-m); background:${isUnlocked ? 'var(--color-surface-container)' : 'var(--color-surface-container-low)'}; opacity:${isUnlocked ? '1' : '0.6'}; border:1px solid ${isUnlocked ? 'var(--color-primary-container)' : 'var(--color-outline-variant)'};">
          <div style="font-size:1.4rem; flex-shrink:0; display:flex; align-items:center;">${getIconSvg(item.icon, 24)}</div>
          <div style="flex-grow:1;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:0.875rem; color:${isUnlocked ? 'var(--color-primary)' : 'var(--color-on-surface)'};">${item.title}</span>
              <span style="font-size:0.75rem; font-weight:800; color:#1D4ED8; font-family:var(--font-family-mono);">+${item.xp} XP</span>
            </div>
            <div style="font-size:0.75rem; color:var(--color-on-surface-variant); margin-top:2px;">${item.desc}</div>
          </div>
          <div style="font-size:0.875rem; display:flex; align-items:center;">${isUnlocked ? getIconSvg('check_circle', 20) : getIconSvg('lock', 18)}</div>
        </div>
      `;
    }).join('');

    modal.innerHTML = `
      <div class="game-modal-card" style="max-width:580px;">
        <div class="game-modal-header">
          <div class="game-modal-title">
            <span>${getIconSvg('trophy', 22)} Профиль IT-специалиста</span>
          </div>
          <button class="game-modal-close-btn" id="closeAchModalBtn" aria-label="Закрыть">${getIconSvg('close', 14)}</button>
        </div>
        <div class="game-modal-content">
          <div style="text-align:center; padding:20px; background:linear-gradient(135deg, rgba(118,51,111,0.08), rgba(255,215,243,0.35)); border-radius:var(--radius-l); margin-bottom:20px; border:1px solid var(--color-primary-container);">
            <div style="font-size:2rem; font-weight:800; color:var(--color-primary);">${info.title} (Ранг ${info.level})</div>
            <div style="font-size:0.875rem; color:var(--color-on-surface-variant); margin-top:4px;">Суммарный опыт: <strong>${info.totalXp} XP</strong></div>
            <div style="margin-top:12px; display:inline-block; width:85%;">
              <div class="hud-xp-track" style="width:100%; height:8px;">
                <div class="hud-xp-bar" style="width:${info.percent}%;"></div>
              </div>
              <div style="font-size:0.75rem; color:var(--color-on-surface-variant); margin-top:6px; display:flex; justify-content:space-between;">
                <span>Текущий прогресс: ${info.percent}%</span>
                <span>До следующего ранга: ${info.tierMax - info.currentInTier} XP</span>
              </div>
            </div>
          </div>

          <!-- АКТИВНОСТЬ 1: ЕЖЕДНЕВНЫЙ БОНУС -->
          <div style="background:var(--color-surface-container); border-radius:var(--radius-l); padding:16px 20px; margin-bottom:20px; display:flex; align-items:center; justify-content:space-between; gap:14px; border:1px solid var(--color-outline-variant);">
            <div>
              <div style="font-weight:700; font-size:0.9375rem; color:var(--color-on-surface); display:flex; align-items:center; gap:6px;">
                <span>${getIconSvg('gift', 18)} Ежедневный буст разработчика</span>
                <span style="font-size:0.75rem; color:#2B6940; background:#E6F6ED; padding:2px 8px; border-radius:99px; font-weight:800;">+50 XP</span>
              </div>
              <div style="font-size:0.8125rem; color:var(--color-on-surface-variant); margin-top:3px;">
                Заходи каждый день для ускорения прокачки ранга!
              </div>
            </div>
            <button class="btn ${isDailyClaimed ? 'btn-tonal' : 'btn-primary'} btn-small" id="claimDailyBtn" ${isDailyClaimed ? 'disabled' : ''}>
              ${isDailyClaimed ? `Забрано ${getIconSvg('check', 14)}` : 'Забрать +50 XP'}
            </button>
          </div>

          <!-- АКТИВНОСТЬ 2: БЛИЦ-ВОПРОС ДНЯ -->
          <div style="background:var(--color-surface-container); border-radius:var(--radius-l); padding:16px 20px; margin-bottom:22px; border:1px solid var(--color-outline-variant);" id="blitzQuestionBox">
            <div style="font-weight:700; font-size:0.9375rem; margin-bottom:6px; display:flex; justify-content:space-between; align-items:center;">
              <span>${getIconSvg('lightning', 18)} Блиц-вопрос дня:</span>
              <span style="font-size:0.75rem; color:#1D4ED8; font-family:var(--font-family-mono); font-weight:800;">${isBlitzAnswered ? `Пройдено ${getIconSvg('check', 14)}` : '+50 XP'}</span>
            </div>
            <p style="font-size:0.875rem; color:var(--color-on-surface); margin-bottom:12px;" id="blitzQuestionText">
              Какой HTTP-статус означает успешный ответ веб-сервера?
            </p>
            <div style="display:flex; flex-wrap:wrap; gap:8px;" id="blitzOptionsList">
              <button class="btn ${isBlitzAnswered ? 'btn-tonal' : 'btn-outlined'} btn-small blitz-opt-btn" data-correct="true" ${isBlitzAnswered ? 'disabled style="background:#E6F6ED; color:#2B6940; border-color:#2B6940;"' : ''}>200 OK</button>
              <button class="btn btn-outlined btn-small blitz-opt-btn" data-correct="false" ${isBlitzAnswered ? 'disabled style="opacity:0.5;"' : ''}>404 Not Found</button>
              <button class="btn btn-outlined btn-small blitz-opt-btn" data-correct="false" ${isBlitzAnswered ? 'disabled style="opacity:0.5;"' : ''}>500 Server Error</button>
            </div>
            <div id="blitzFeedback" style="font-size:0.8125rem; font-weight:700; margin-top:8px; display:${isBlitzAnswered ? 'block' : 'none'}; color:#2B6940;">
              ${isBlitzAnswered ? `${getIconSvg('check_circle', 16)} Блиц-вопрос дня уже пройден! Возвращайся завтра за новым вопросом.` : ''}
            </div>
          </div>

          <h4 style="font-size:0.9375rem; font-weight:700; margin-bottom:12px; color:var(--color-on-surface);">Все достижения (${xpEngine.achievements.length} / ${Object.keys(ACHIEVEMENTS_DATA).length}):</h4>
          <div style="display:flex; flex-direction:column; gap:10px; max-height:240px; overflow-y:auto; padding-right:4px;">
            ${achievementsHtml}
          </div>
        </div>
        <div class="game-modal-footer" style="justify-content:flex-end;">
          <button class="btn btn-primary btn-small" id="achCloseFooterBtn">Закрыть</button>
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Обработчик ежедневного буста
    const claimDailyBtn = document.getElementById('claimDailyBtn');
    if (claimDailyBtn && !isDailyClaimed) {
      claimDailyBtn.addEventListener('click', () => {
        try {
          localStorage.setItem(STORAGE_KEYS.DAILY_CLAIMED, todayKey);
        } catch (e) {}
        claimDailyBtn.innerHTML = `Забрано ${getIconSvg('check', 14)}`;
        claimDailyBtn.disabled = true;
        claimDailyBtn.className = 'btn btn-tonal btn-small';
        xpEngine.addXP(50, 'Ежедневный бонус разработчика получен (+50 XP)!', 'daily_boost_' + todayKey);
        if (!xpEngine.achievements.includes('daily_streak')) {
          xpEngine.achievements.push('daily_streak');
          xpEngine.saveAchievements();
        }
      });
    }

    // Обработчик блиц-вопроса
    const blitzFeedback = document.getElementById('blitzFeedback');
    if (!isBlitzAnswered) {
      modal.querySelectorAll('.blitz-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (xpEngine.isActionClaimed('blitz_' + todayKey)) return;

          const isCorrect = btn.getAttribute('data-correct') === 'true';
          modal.querySelectorAll('.blitz-opt-btn').forEach(b => b.disabled = true);
          blitzFeedback.style.display = 'block';

          try {
            localStorage.setItem(STORAGE_KEYS.BLITZ_ANSWERED, todayKey);
          } catch (e) {}

          if (isCorrect) {
            btn.style.backgroundColor = '#E6F6ED';
            btn.style.color = '#2B6940';
            btn.style.borderColor = '#2B6940';
            blitzFeedback.style.color = '#2B6940';
            blitzFeedback.textContent = 'Правильно! Код 200 OK возвращается при успешной обработке запроса.';
            xpEngine.addXP(50, 'Верный ответ на блиц-вопрос дня (+50 XP)!', 'blitz_' + todayKey);
          } else {
            btn.style.backgroundColor = '#FFEBEE';
            btn.style.color = '#C62828';
            blitzFeedback.style.color = '#C62828';
            blitzFeedback.textContent = 'Не совсем так. 200 OK — это стандартный успешный HTTP-ответ.';
            audioFX.playError();
            xpEngine.markActionClaimed('blitz_' + todayKey);
          }
        });
      });
    }

    const close = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      audioFX.playClick();
    };

    document.getElementById('closeAchModalBtn').addEventListener('click', close);
    document.getElementById('achCloseFooterBtn').addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
  }

  /* ==========================================================================
     БЛОК Б: ИНТЕРАКТИВНЫЕ МИКРО-СИМУЛЯТОРЫ (8 ПРОФЕССИЙ)
     ========================================================================== */
  function openSimulator(profId) {
    audioFX.playClick();
    let modal = document.getElementById('gameSimModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'gameSimModal';
      modal.className = 'game-modal-overlay';
      document.body.appendChild(modal);
    }

    switch (profId) {
      case 'frontend':
        renderFrontendSimulator(modal);
        break;
      case 'backend':
        renderBackendSimulator(modal);
        break;
      case 'mobile':
        renderMobileSimulator(modal);
        break;
      case 'gamedev':
        renderGameDevSimulator(modal);
        break;
      case 'uiux':
        renderUIUXSimulator(modal);
        break;
      case 'qa':
        renderQASimulator(modal);
        break;
      case 'devops':
        renderDevOpsSimulator(modal);
        break;
      case 'security':
        renderSecuritySimulator(modal);
        break;
      case 'ai_ml':
        renderAiMlSimulator(modal);
        break;
      case 'data':
        renderDataSimulator(modal);
        break;
      default:
        renderFrontendSimulator(modal);
        break;
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* 1. FRONTEND: CSS RESCUE */
  function renderFrontendSimulator(modal) {
    let currentJustify = 'flex-start';
    let currentAlign = 'flex-start';
    let isSolved = !!xpEngine.simCompleted['frontend'];

    modal.innerHTML = `
      <div class="game-modal-card">
        <div class="game-modal-header">
          <div class="game-modal-title">
            <span>${getIconSvg('palette', 20)} Frontend: CSS Rescue</span>
            <span class="game-modal-badge">+150 XP</span>
          </div>
          <button class="game-modal-close-btn" id="closeSimBtn" aria-label="Закрыть">${getIconSvg('close', 14)}</button>
        </div>

        <div class="game-modal-content">
          <p style="font-size:0.875rem; color:var(--color-on-surface-variant); margin-bottom:14px; line-height:1.5;">
            <strong>Миссия Frontend-разработчика:</strong> Вёрстка сломалась в релизе! Кнопка «Запустить проект» улетела в угол.
            Используй свойства <code>justify-content</code> и <code>align-items</code>, чтобы выровнять её ровно по центру.
          </p>

          <div class="sim-explainer-card" style="margin-bottom:14px;">
            <div class="sim-explainer-title">
              ${getIconSvg('sparkles', 16)} <span>Разжевываем на пальцах: как работает Flexbox</span>
            </div>
            <p>
              В CSS свойство <code>justify-content: center</code> центрирует элемент по горизонтали (по главной оси), а <code>align-items: center</code> — по вертикали (по поперечной оси). Чтобы кнопка встала строго по центру экрана, нужны оба параметра!
            </p>
          </div>

          <div class="sim-frontend-box">
            <div class="sim-browser-topbar">
              <span class="sim-browser-dot"></span>
              <span class="sim-browser-dot"></span>
              <span class="sim-browser-dot"></span>
              <span style="font-size:0.6875rem; opacity:0.6; margin-left:8px;">preview: layout-bug.css</span>
            </div>

            <div class="sim-css-viewport" id="cssRescueViewport" style="justify-content:${currentJustify}; align-items:${currentAlign};">
              <button class="sim-target-btn ${isSolved ? 'centered' : ''}" id="cssRescueBtn">
                ${getIconSvg('rocket', 16)} Запустить проект
              </button>
            </div>
          </div>

          <div class="sim-controls-group">
            <div class="sim-controls-label">
              <span>Свойство <code>justify-content</code> (по горизонтали):</span>
            </div>
            <div class="sim-chip-grid" id="justifyChips">
              <button class="sim-prop-chip ${currentJustify === 'flex-start' ? 'active' : ''}" data-val="flex-start">flex-start</button>
              <button class="sim-prop-chip ${currentJustify === 'center' ? 'active' : ''}" data-val="center">center</button>
              <button class="sim-prop-chip ${currentJustify === 'flex-end' ? 'active' : ''}" data-val="flex-end">flex-end</button>
              <button class="sim-prop-chip ${currentJustify === 'space-between' ? 'active' : ''}" data-val="space-between">space-between</button>
            </div>
          </div>

          <div class="sim-controls-group">
            <div class="sim-controls-label">
              <span>Свойство <code>align-items</code> (по вертикали):</span>
            </div>
            <div class="sim-chip-grid" id="alignChips">
              <button class="sim-prop-chip ${currentAlign === 'flex-start' ? 'active' : ''}" data-val="flex-start">flex-start</button>
              <button class="sim-prop-chip ${currentAlign === 'center' ? 'active' : ''}" data-val="center">center</button>
              <button class="sim-prop-chip ${currentAlign === 'flex-end' ? 'active' : ''}" data-val="flex-end">flex-end</button>
            </div>
          </div>

          <div id="cssRescueStatus" style="margin-top:14px; text-align:center; font-weight:700; font-size:0.9375rem; min-height:24px; color:${isSolved ? '#2B6940' : 'var(--color-primary)'};">
            ${isSolved ? `${getIconSvg('check_circle', 16)} Решено! Кнопка центрирована с помощью Flexbox.` : 'Выбери правильные значения свойств...'}
          </div>
        </div>

        <div class="game-modal-footer">
          <span style="font-size:0.8125rem; color:var(--color-on-surface-variant);">
            Статус: <strong id="simStatusTag">${isSolved ? `Выполнено ${getIconSvg('star', 14)}` : 'В процессе'}</strong>
          </span>
          <button class="btn btn-primary btn-small" id="simDoneBtn">
            ${isSolved ? 'Отлично' : 'Завершить'}
          </button>
        </div>
      </div>
    `;

    const viewport = modal.querySelector('#cssRescueViewport');
    const targetBtn = modal.querySelector('#cssRescueBtn');
    const statusText = modal.querySelector('#cssRescueStatus');
    const statusTag = modal.querySelector('#simStatusTag');

    function checkWin() {
      if (currentJustify === 'center' && currentAlign === 'center') {
        targetBtn.classList.add('centered');
        statusText.innerHTML = `${getIconSvg('check_circle', 18)} Идеально по центру! Flexbox покорён.`;
        statusText.style.color = '#2B6940';
        statusTag.innerHTML = `Решено ${getIconSvg('star', 14)} (+150 XP)`;

        if (!xpEngine.simCompleted['frontend']) {
          xpEngine.simCompleted['frontend'] = true;
          xpEngine.saveSimCompleted();
          audioFX.playSuccess();
          xpEngine.addXP(150, 'Мини-симулятор Frontend пройден!', 'sim_frontend');
          updateSimBadgesInUI();
        }
      } else {
        targetBtn.classList.remove('centered');
        statusText.textContent = 'Кнопка ещё не в центре. Попробуй center + center!';
        statusText.style.color = 'var(--color-primary)';
      }
    }

    modal.querySelectorAll('#justifyChips .sim-prop-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        audioFX.playClick();
        modal.querySelectorAll('#justifyChips .sim-prop-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentJustify = chip.getAttribute('data-val');
        viewport.style.justifyContent = currentJustify;
        checkWin();
      });
    });

    modal.querySelectorAll('#alignChips .sim-prop-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        audioFX.playClick();
        modal.querySelectorAll('#alignChips .sim-prop-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentAlign = chip.getAttribute('data-val');
        viewport.style.alignItems = currentAlign;
        checkWin();
      });
    });

    const closeFunc = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      audioFX.playClick();
    };

    modal.querySelector('#closeSimBtn').addEventListener('click', closeFunc);
    modal.querySelector('#simDoneBtn').addEventListener('click', closeFunc);
  }

  /* 2. BACKEND: SQL QUERY BUILDER */
  function renderBackendSimulator(modal) {
    let isSolved = !!xpEngine.simCompleted['backend'];
    const requiredOrder = ['SELECT', 'title, salary', 'FROM', 'vacancies', 'ORDER BY', 'salary DESC'];
    let selectedTokens = isSolved ? [...requiredOrder] : [];

    modal.innerHTML = `
      <div class="game-modal-card">
        <div class="game-modal-header">
          <div class="game-modal-title">
            <span>${getIconSvg('database', 20)} Backend: SQL Architect</span>
            <span class="game-modal-badge">+150 XP</span>
          </div>
          <button class="game-modal-close-btn" id="closeSimBtn" aria-label="Закрыть">${getIconSvg('close', 14)}</button>
        </div>

        <div class="game-modal-content">
          <p style="font-size:0.875rem; color:var(--color-on-surface-variant); margin-bottom:14px; line-height:1.5;">
            <strong>Миссия Backend-разработчика:</strong> API возвращает ошибку 500! База данных ждёт SQL-запрос для выборки вакансий с сортировкой по зарплате. Собери блоки запроса в правильном порядке:
          </p>

          <div class="sim-explainer-card" style="margin-bottom:14px;">
            <div class="sim-explainer-title">
              ${getIconSvg('sparkles', 16)} <span>Разжевываем на пальцах: анатомия SQL-запроса</span>
            </div>
            <p>
              Базы данных требуют чёткого порядка команд: <code>SELECT</code> (какие колонки взять), <code>FROM</code> (из какой таблицы), <code>ORDER BY</code> (как отсортировать). Чтобы показать вакансии с самой высокой зарплатой первыми, сортируем по убыванию (<code>DESC</code>).
            </p>
          </div>

          <div class="sim-sql-editor" id="sqlEditor">
            ${selectedTokens.length === 0 ? '<span style="color:#6B7280;">Кликай по блокам снизу, чтобы построить SQL-запрос...</span>' : ''}
            ${selectedTokens.map(tok => `<span class="sim-sql-slot">${tok}</span>`).join('')}
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-size:0.8125rem; font-weight:700; color:var(--color-on-surface);">Доступные блоки:</span>
            <button class="btn btn-text btn-small" id="sqlResetBtn" style="font-size:0.75rem;">Сбросить конструктор</button>
          </div>

          <div class="sim-chip-grid" id="sqlTokensGrid">
            <button class="sim-sql-token-btn" data-tok="SELECT">SELECT</button>
            <button class="sim-sql-token-btn" data-tok="vacancies">vacancies</button>
            <button class="sim-sql-token-btn" data-tok="ORDER BY">ORDER BY</button>
            <button class="sim-sql-token-btn" data-tok="title, salary">title, salary</button>
            <button class="sim-sql-token-btn" data-tok="FROM">FROM</button>
            <button class="sim-sql-token-btn" data-tok="salary DESC">salary DESC</button>
          </div>

          <div id="sqlResultBox" style="margin-top:16px; padding:12px 16px; border-radius:var(--radius-m); background:var(--color-surface-container); font-size:0.8125rem; min-height:48px;">
            ${isSolved ? `${getIconSvg('dot_green', 12)} <strong>API 200 OK:</strong> Найдено 10 вакансий. Сортировка по зарплате выполнена корректно.` : 'Собери корректный запрос: <code>SELECT ... FROM ... ORDER BY ...</code>'}
          </div>
        </div>

        <div class="game-modal-footer">
          <span style="font-size:0.8125rem; color:var(--color-on-surface-variant);">
            Статус API: <strong id="sqlStatusTag">${isSolved ? `Работает штатно ${getIconSvg('star', 14)}` : 'Ошибка 500'}</strong>
          </span>
          <button class="btn btn-primary btn-small" id="simDoneBtn">
            ${isSolved ? 'Отлично' : 'Завершить'}
          </button>
        </div>
      </div>
    `;

    const editor = modal.querySelector('#sqlEditor');
    const resultBox = modal.querySelector('#sqlResultBox');
    const statusTag = modal.querySelector('#sqlStatusTag');

    function updateTokens() {
      if (selectedTokens.length === 0) {
        editor.innerHTML = '<span style="color:#6B7280;">Кликай по блокам снизу, чтобы построить SQL-запрос...</span>';
      } else {
        editor.innerHTML = selectedTokens.map(tok => `<span class="sim-sql-slot">${tok}</span>`).join(' ');
      }

      modal.querySelectorAll('.sim-sql-token-btn').forEach(btn => {
        const tok = btn.getAttribute('data-tok');
        btn.classList.toggle('used', selectedTokens.includes(tok));
      });

      if (selectedTokens.length === requiredOrder.length) {
        const isMatch = selectedTokens.every((t, i) => t === requiredOrder[i]);
        if (isMatch) {
          resultBox.innerHTML = `${getIconSvg('dot_green', 12)} <strong>API 200 OK:</strong> Запрос успешен! [Frontend Dev: 180k, Backend Dev: 190k, DevOps: 210k]`;
          resultBox.style.color = '#2B6940';
          resultBox.style.background = '#E6F6ED';
          statusTag.innerHTML = `Работает штатно ${getIconSvg('star', 14)} (+150 XP)`;

          if (!xpEngine.simCompleted['backend']) {
            xpEngine.simCompleted['backend'] = true;
            xpEngine.saveSimCompleted();
            audioFX.playSuccess();
            xpEngine.addXP(150, 'SQL-запрос составлен! Тест-драйв Backend пройден.', 'sim_backend');
            updateSimBadgesInUI();
          }
        } else {
          resultBox.innerHTML = `${getIconSvg('cross_circle', 16)} Синтаксическая ошибка SQL! Порядок должен быть: SELECT ... FROM ... ORDER BY ...`;
          resultBox.style.color = '#C62828';
          resultBox.style.background = '#FFEBEE';
          audioFX.playError();
        }
      }
    }

    modal.querySelectorAll('.sim-sql-token-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        audioFX.playClick();
        const tok = btn.getAttribute('data-tok');
        if (!selectedTokens.includes(tok)) {
          selectedTokens.push(tok);
          updateTokens();
        }
      });
    });

    modal.querySelector('#sqlResetBtn').addEventListener('click', () => {
      audioFX.playClick();
      selectedTokens = [];
      updateTokens();
      resultBox.textContent = 'Собери корректный запрос: SELECT ... FROM ... ORDER BY ...';
      resultBox.style.color = 'inherit';
      resultBox.style.background = 'var(--color-surface-container)';
    });

    const closeFunc = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      audioFX.playClick();
    };

    modal.querySelector('#closeSimBtn').addEventListener('click', closeFunc);
    modal.querySelector('#simDoneBtn').addEventListener('click', closeFunc);
  }

  /* 3. MOBILE: FPS & ORIENTATION LAB */
  function renderMobileSimulator(modal) {
    let isSolved = !!xpEngine.simCompleted['mobile'];
    let currentFps = isSolved ? 60 : 30;
    let isLandscape = isSolved;

    modal.innerHTML = `
      <div class="game-modal-card">
        <div class="game-modal-header">
          <div class="game-modal-title">
            <span>${getIconSvg('smartphone', 20)} Mobile: FPS & Screen Sensor</span>
            <span class="game-modal-badge">+150 XP</span>
          </div>
          <button class="game-modal-close-btn" id="closeSimBtn" aria-label="Закрыть">${getIconSvg('close', 14)}</button>
        </div>

        <div class="game-modal-content">
          <p style="font-size:0.875rem; color:var(--color-on-surface-variant); margin-bottom:14px; line-height:1.5;">
            <strong>Миссия Мобильного разработчика:</strong> Пользователи жалуются на подтормаживание приложения в ландшафтном режиме.
            Оптимизируй частоту кадров (не менее 60 FPS) и переключи ориентацию экрана:
          </p>

          <div class="sim-explainer-card" style="margin-bottom:14px;">
            <div class="sim-explainer-title">
              ${getIconSvg('sparkles', 16)} <span>Разжевываем на пальцах: почему важны 60 FPS</span>
            </div>
            <p>
              Человеческий глаз воспринимает рывки при частоте ниже 60 кадров/сек (30 FPS ощущаются как «дёрганый» скролл). Мобильный разработчик оптимизирует отрисовку списков и следит, чтобы при повороте смартфона интерфейс перестраивался мгновенно без потери данных.
            </p>
          </div>

          <div style="background:#1E1A22; border-radius:var(--radius-l); padding:20px; text-align:center; margin-bottom:16px;">
            <div id="phoneMockup" style="display:inline-block; width:${isLandscape ? '240px' : '150px'}; height:${isLandscape ? '150px' : '240px'}; background:#0F172A; border:2px solid #334155; border-radius:16px; transition:all 0.3s ease; position:relative; overflow:hidden;">
              <div style="position:absolute; top:8px; left:50%; transform:translateX(-50%); width:40px; height:4px; background:#4F434C; border-radius:99px;"></div>
              <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100%; color:#FFFFFF;">
                <span style="display:inline-flex; align-items:center; justify-content:center;">${getIconSvg('rocket', 36)}</span>
                <span style="font-weight:700; font-size:0.875rem; margin-top:4px;" id="phoneFpsDisplay">${currentFps} FPS</span>
                <span style="font-size:0.6875rem; color:#1D4ED8; font-family:var(--font-family-mono);" id="phoneStatusDisplay">${isLandscape ? 'Альбомный' : 'Портретный'}</span>
              </div>
            </div>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:12px; justify-content:center; margin-bottom:14px;">
            <button class="btn btn-outlined btn-small" id="toggleOrientationBtn">
              ${getIconSvg('rotate', 16)} Сменить ориентацию (${isLandscape ? 'Альбомная' : 'Портретная'})
            </button>
            <button class="btn btn-tonal btn-small" id="boostFpsBtn">
              ${getIconSvg('lightning', 16)} Включить 60 FPS Оптимизацию
            </button>
          </div>

          <div id="mobileResultBox" style="text-align:center; font-weight:700; font-size:0.9375rem; min-height:24px; color:${isSolved ? '#2B6940' : 'var(--color-primary)'};">
            ${isSolved ? `${getIconSvg('check_circle', 16)} Отличная оптимизация! Мобильное приложение работает плавно на 60 FPS.` : 'Требуется: Альбомная ориентация + 60 FPS.'}
          </div>
        </div>

        <div class="game-modal-footer">
          <span style="font-size:0.8125rem; color:var(--color-on-surface-variant);">
            Статус: <strong id="mobileStatusTag">${isSolved ? `Оптимизировано ${getIconSvg('star', 14)}` : '30 FPS (Лаги)'}</strong>
          </span>
          <button class="btn btn-primary btn-small" id="simDoneBtn">
            ${isSolved ? 'Отлично' : 'Завершить'}
          </button>
        </div>
      </div>
    `;

    const phone = modal.querySelector('#phoneMockup');
    const fpsDisp = modal.querySelector('#phoneFpsDisplay');
    const statusDisp = modal.querySelector('#phoneStatusDisplay');
    const resultBox = modal.querySelector('#mobileResultBox');
    const statusTag = modal.querySelector('#mobileStatusTag');

    function checkWin() {
      if (isLandscape && currentFps >= 60) {
        resultBox.innerHTML = `${getIconSvg('check_circle', 18)} Успех! Приложение адаптировано под поворот и выдаёт стабильные 60 FPS.`;
        resultBox.style.color = '#2B6940';
        statusTag.innerHTML = `Оптимизировано ${getIconSvg('star', 14)} (+150 XP)`;

        if (!xpEngine.simCompleted['mobile']) {
          xpEngine.simCompleted['mobile'] = true;
          xpEngine.saveSimCompleted();
          audioFX.playSuccess();
          xpEngine.addXP(150, 'Мобильное приложение оптимизировано! (+150 XP)', 'sim_mobile');
          updateSimBadgesInUI();
        }
      }
    }

    modal.querySelector('#toggleOrientationBtn').addEventListener('click', () => {
      audioFX.playClick();
      isLandscape = !isLandscape;
      phone.style.width = isLandscape ? '240px' : '150px';
      phone.style.height = isLandscape ? '150px' : '240px';
      statusDisp.textContent = isLandscape ? 'Альбомный' : 'Портретный';
      modal.querySelector('#toggleOrientationBtn').textContent = `${getIconSvg('rotate', 16)} Сменить ориентацию (${isLandscape ? 'Альбомная' : 'Портретная'})`;
      checkWin();
    });

    modal.querySelector('#boostFpsBtn').addEventListener('click', () => {
      audioFX.playClick();
      currentFps = 60;
      fpsDisp.textContent = '60 FPS';
      fpsDisp.style.color = '#4ADE80';
      checkWin();
    });

    const closeFunc = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      audioFX.playClick();
    };

    modal.querySelector('#closeSimBtn').addEventListener('click', closeFunc);
    modal.querySelector('#simDoneBtn').addEventListener('click', closeFunc);
  }

  /* 4. GAMEDEV: PHYSICS JUMP */
  function renderGameDevSimulator(modal) {
    let isSolved = !!xpEngine.simCompleted['gamedev'];
    let gravity = 0.5;
    let jumpForce = 12;

    modal.innerHTML = `
      <div class="game-modal-card">
        <div class="game-modal-header">
          <div class="game-modal-title">
            <span>${getIconSvg('gamepad', 20)} GameDev: Physics Engine Jump</span>
            <span class="game-modal-badge">+150 XP</span>
          </div>
          <button class="game-modal-close-btn" id="closeSimBtn" aria-label="Закрыть">${getIconSvg('close', 14)}</button>
        </div>

        <div class="game-modal-content">
          <p style="font-size:0.875rem; color:var(--color-on-surface-variant); margin-bottom:12px; line-height:1.5;">
            <strong>Миссия GameDev-разработчика:</strong> Персонаж игры не может перепрыгнуть пропасть и собрать монету хакатона. Настрой физику прыжка и запусти игровой цикл:
          </p>

          <div class="sim-explainer-card" style="margin-bottom:14px;">
            <div class="sim-explainer-title">
              ${getIconSvg('sparkles', 16)} <span>Разжевываем на пальцах: физика прыжка в играх</span>
            </div>
            <p>
              В играх физический движок рассчитывает движение персонажа каждый кадр: сила прыжка (импульс вверх) преодолевает силу тяжести (гравитацию). При слабой гравитации персонаж улетает в космос, при слишком сильной — падает как кирпич. Точный баланс дарит чувство контроля!
            </p>
          </div>

          <canvas class="sim-gamedev-canvas" id="gameDevCanvas" width="560" height="200"></canvas>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; gap:8px; align-items:center;">
              <button class="btn btn-outlined btn-small" id="gdGravityBtn">Гравитация: <span id="gdGravVal">${gravity}</span></button>
              <button class="btn btn-outlined btn-small" id="gdJumpBtn">Сила прыжка: <span id="gdJumpVal">${jumpForce}</span></button>
            </div>
            <button class="btn btn-primary btn-small" id="gdLaunchJumpBtn">${getIconSvg('gamepad', 16)} Прыжок!</button>
          </div>

          <div id="gdStatusBox" style="text-align:center; font-weight:700; font-size:0.9375rem; min-height:24px; color:${isSolved ? '#2B6940' : 'var(--color-primary)'};">
            ${isSolved ? `${getIconSvg('check_circle', 16)} Монета собрана! Физический движок настроен.` : 'Нажми «Прыжок!» или настрой параметры...'}
          </div>
        </div>

        <div class="game-modal-footer">
          <span style="font-size:0.8125rem; color:var(--color-on-surface-variant);">
            Статус Game Loop: <strong id="gdStatusTag">${isSolved ? `Победа ${getIconSvg('star', 14)}` : 'Ожидание'}</strong>
          </span>
          <button class="btn btn-primary btn-small" id="simDoneBtn">
            ${isSolved ? 'Отлично' : 'Завершить'}
          </button>
        </div>
      </div>
    `;

    const canvas = modal.querySelector('#gameDevCanvas');
    const ctx = canvas.getContext('2d');
    const statusBox = modal.querySelector('#gdStatusBox');
    const statusTag = modal.querySelector('#gdStatusTag');

    let playerX = 40;
    let playerY = 150;
    let velY = 0;
    let isJumping = false;
    let animId = null;

    function drawScene() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Земля слева и справа
      ctx.fillStyle = '#4A3B52';
      ctx.fillRect(0, 160, 160, 40);
      ctx.fillRect(400, 160, 160, 40);

      // Пропасть по центру
      ctx.fillStyle = '#0D0B14';
      ctx.fillRect(160, 175, 240, 25);

      // Золотая монета
      // Векторная монета (Pure Canvas Vector)
      ctx.save();
      ctx.beginPath();
      ctx.arc(460, 130, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#EAB308';
      ctx.fill();
      ctx.strokeStyle = '#CA8A04';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const sx = 460 + Math.cos(a) * 6;
        const sy = 130 + Math.sin(a) * 6;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      ctx.fillStyle = '#FEF08A';
      ctx.fill();
      ctx.restore();

      // Персонаж (робот-кубик)
      ctx.fillStyle = '#38BDF8';
      ctx.fillRect(playerX, playerY, 24, 24);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(playerX + 14, playerY + 5, 5, 5); // Глаз
    }

    drawScene();

    function jumpCycle() {
      if (!isJumping) return;
      velY += gravity;
      playerY += velY;
      playerX += 4.5;

      drawScene();

      // Достиг правой платформы и монеты
      if (playerX >= 440 && playerY <= 160) {
        isJumping = false;
        cancelAnimationFrame(animId);
        statusBox.innerHTML = `${getIconSvg('check_circle', 18)} Монета собрана! Прыжок выполнен безупречно.`;
        statusBox.style.color = '#2B6940';
        statusTag.innerHTML = `Победа ${getIconSvg('star', 14)} (+150 XP)`;

        if (!xpEngine.simCompleted['gamedev']) {
          xpEngine.simCompleted['gamedev'] = true;
          xpEngine.saveSimCompleted();
          audioFX.playSuccess();
          xpEngine.addXP(150, 'Физика прыжка настроена! Тест-драйв GameDev пройден.', 'sim_gamedev');
          updateSimBadgesInUI();
        }
        return;
      }

      // Упал в пропасть
      if (playerY > 180) {
        isJumping = false;
        cancelAnimationFrame(animId);
        audioFX.playError();
        statusBox.innerHTML = `${getIconSvg('cross_circle', 16)} Недолёт! Увеличь силу прыжка или уменьши гравитацию.`;
        statusBox.style.color = '#C62828';
        return;
      }

      animId = requestAnimationFrame(jumpCycle);
    }

    modal.querySelector('#gdLaunchJumpBtn').addEventListener('click', () => {
      audioFX.playClick();
      playerX = 40;
      playerY = 136;
      velY = -jumpForce;
      isJumping = true;
      cancelAnimationFrame(animId);
      jumpCycle();
    });

    modal.querySelector('#gdGravityBtn').addEventListener('click', () => {
      audioFX.playClick();
      gravity = gravity === 0.5 ? 0.35 : 0.5;
      modal.querySelector('#gdGravVal').textContent = String(gravity);
    });

    modal.querySelector('#gdJumpBtn').addEventListener('click', () => {
      audioFX.playClick();
      jumpForce = jumpForce === 12 ? 14 : 12;
      modal.querySelector('#gdJumpVal').textContent = String(jumpForce);
    });

    const closeFunc = () => {
      cancelAnimationFrame(animId);
      modal.classList.remove('open');
      document.body.style.overflow = '';
      audioFX.playClick();
    };

    modal.querySelector('#closeSimBtn').addEventListener('click', closeFunc);
    modal.querySelector('#simDoneBtn').addEventListener('click', closeFunc);
  }

  /* 5. UI/UX: WCAG CONTRAST MASTER */
  function renderUIUXSimulator(modal) {
    let isSolved = !!xpEngine.simCompleted['uiux'];
    let contrastRatio = isSolved ? 7.2 : 1.8;

    modal.innerHTML = `
      <div class="game-modal-card">
        <div class="game-modal-header">
          <div class="game-modal-title">
            <span>${getIconSvg('sparkles', 20)} UI/UX: WCAG Contrast Master</span>
            <span class="game-modal-badge">+150 XP</span>
          </div>
          <button class="game-modal-close-btn" id="closeSimBtn" aria-label="Закрыть">${getIconSvg('close', 14)}</button>
        </div>

        <div class="game-modal-content">
          <p style="font-size:0.875rem; color:var(--color-on-surface-variant); margin-bottom:14px; line-height:1.5;">
            <strong>Миссия UI/UX-дизайнера:</strong> Кнопка на сайте не проходит аудит доступности (WCAG 2.1). Бледно-серый текст на светлом фоне не читается людьми с ослабленным зрением.
            Настрой контрастность до стандарта <strong>AAA (коэффициент > 4.5:1)</strong>:
          </p>

          <div class="sim-explainer-card" style="margin-bottom:14px;">
            <div class="sim-explainer-title">
              ${getIconSvg('sparkles', 16)} <span>Разжевываем на пальцах: стандарт доступности WCAG</span>
            </div>
            <p>
              Светло-серый текст на белом фоне трудно прочитать на солнце или людям с ослабленным зрением. Международный стандарт доступности WCAG требует контраст не менее 4.5:1. Грамотный дизайнер делает продукт комфортным для всех пользователей без исключения!
            </p>
          </div>

          <div class="sim-contrast-sample-box" id="contrastSampleBox" style="background:${isSolved ? '#1D4ED8' : '#F1F5F9'}; color:${isSolved ? '#FFFFFF' : '#64748B'}; border:1px solid ${isSolved ? '#1E40AF' : '#E2E8F0'};">
            <h3 style="font-size:1.25rem; font-weight:800; margin-bottom:6px;">Оформить подписку</h3>
            <p style="font-size:0.875rem;">Текст должен легко читаться на любом дисплее</p>
            <div class="sim-contrast-badge" id="contrastBadge" style="background:${isSolved ? '#E6F6ED' : '#FFEBEE'}; color:${isSolved ? '#2B6940' : '#C62828'};">
              Контрастность: <span id="ratioDisplay">${contrastRatio}:1</span> (${isSolved ? `WCAG AAA PASSED ${getIconSvg('check', 14)}` : `WCAG FAIL ${getIconSvg('close', 14)}`})
            </div>
          </div>

          <div style="margin-bottom:16px;">
            <label style="font-size:0.8125rem; font-weight:700; display:block; margin-bottom:6px;">Слайдер глубины цвета:</label>
            <input type="range" min="1" max="10" value="${isSolved ? 9 : 2}" style="width:100%;" id="contrastSlider">
          </div>

          <div id="uiuxResultBox" style="text-align:center; font-weight:700; font-size:0.9375rem; min-height:24px; color:${isSolved ? '#2B6940' : 'var(--color-primary)'};">
            ${isSolved ? `${getIconSvg('check_circle', 16)} Великолепно! Коэффициент контрастности соответствует высшему стандарту доступности AAA.` : 'Передвинь слайдер вправо для достижения достаточного контраста...'}
          </div>
        </div>

        <div class="game-modal-footer">
          <span style="font-size:0.8125rem; color:var(--color-on-surface-variant);">
            Стандарт доступности: <strong id="uiuxStatusTag">${isSolved ? `WCAG AAA ${getIconSvg('star', 14)}` : 'Недоступно'}</strong>
          </span>
          <button class="btn btn-primary btn-small" id="simDoneBtn">
            ${isSolved ? 'Отлично' : 'Завершить'}
          </button>
        </div>
      </div>
    `;

    const box = modal.querySelector('#contrastSampleBox');
    const badge = modal.querySelector('#contrastBadge');
    const ratioDisp = modal.querySelector('#ratioDisplay');
    const slider = modal.querySelector('#contrastSlider');
    const resultBox = modal.querySelector('#uiuxResultBox');
    const statusTag = modal.querySelector('#uiuxStatusTag');

    slider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      const ratio = (1.5 + val * 0.7).toFixed(1);
      ratioDisp.textContent = `${ratio}:1`;

      if (val >= 6) {
        box.style.backgroundColor = '#1D4ED8'; box.style.borderColor = '#1E40AF';
        box.style.color = '#FFFFFF';
        badge.style.backgroundColor = '#E6F6ED';
        badge.style.color = '#2B6940';
        badge.innerHTML = `Контрастность: ${ratio}:1 (WCAG AAA PASSED ${getIconSvg('check', 14)})`;
        resultBox.innerHTML = `${getIconSvg('check_circle', 18)} Идеальный контраст! Текст полностью читаем и доступен.`;
        resultBox.style.color = '#2B6940';
        statusTag.innerHTML = `WCAG AAA ${getIconSvg('star', 14)} (+150 XP)`;

        if (!xpEngine.simCompleted['uiux']) {
          xpEngine.simCompleted['uiux'] = true;
          xpEngine.saveSimCompleted();
          audioFX.playSuccess();
          xpEngine.addXP(150, 'Стандарт доступности соблюдён! Тест-драйв UI/UX пройден.', 'sim_uiux');
          updateSimBadgesInUI();
        }
      } else {
        box.style.backgroundColor = '#EFE8EE';
        box.style.color = '#B8A8B5';
        badge.style.backgroundColor = '#FFEBEE';
        badge.style.color = '#C62828';
        badge.innerHTML = `Контрастность: ${ratio}:1 (WCAG FAIL ${getIconSvg('close', 14)})`;
        resultBox.textContent = 'Недостаточный контраст. Двигай слайдер правее!';
        resultBox.style.color = 'var(--color-primary)';
      }
    });

    const closeFunc = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      audioFX.playClick();
    };

    modal.querySelector('#closeSimBtn').addEventListener('click', closeFunc);
    modal.querySelector('#simDoneBtn').addEventListener('click', closeFunc);
  }

  /* 6. QA: BUG HUNTER */
  function renderQASimulator(modal) {
    let bugsFound = {
      negativeAge: false,
      upsideDownPw: false,
      runawayBtn: false
    };

    let isSolved = !!xpEngine.simCompleted['qa'];
    if (isSolved) {
      bugsFound = { negativeAge: true, upsideDownPw: true, runawayBtn: true };
    }

    modal.innerHTML = `
      <div class="game-modal-card">
        <div class="game-modal-header">
          <div class="game-modal-title">
            <span>${getIconSvg('bug', 20)} QA: Bug Hunter</span>
            <span class="game-modal-badge">+150 XP</span>
          </div>
          <button class="game-modal-close-btn" id="closeSimBtn" aria-label="Закрыть">${getIconSvg('close', 14)}</button>
        </div>

        <div class="game-modal-content">
          <p style="font-size:0.875rem; color:var(--color-on-surface-variant); margin-bottom:12px; line-height:1.5;">
            <strong>Миссия Тестировщика (QA):</strong> Разработчик сдал форму авторизации. Найди <strong>3 скрытых дефекта</strong>, кликая по подозрительным элементам и проверяя их реакцию:
          </p>

          <div class="sim-qa-counter-badge ${isSolved ? 'all-found' : ''}" id="qaBugCounter">
            ${getIconSvg('search', 16)} Найдено багов: <span id="qaBugsCount">${isSolved ? '3' : '0'}</span> / 3
          </div>

          <div class="sim-explainer-card">
            <div class="sim-explainer-title">
              ${getIconSvg('sparkles', 16)} <span>Разжевываем на пальцах: почему баги случаются</span>
            </div>
            <p>
              Программисты пишут код под идеальный сценарий, а тестировщик проверяет неожиданные действия пользователей: ввод отрицательного возраста, нажатие нестандартных кнопок или проверку поведения верстки. Без QA сырые приложения ломались бы в первый же день!
            </p>
          </div>

          <div class="sim-qa-form">
            <div class="sim-qa-field">
              <label>Логин / E-mail</label>
              <input type="text" class="sim-qa-input" value="junior_dev@code.ru" readonly style="background:#F6EFF4;">
            </div>

            <!-- БАГ 1: Отрицательный возраст -->
            <div class="sim-qa-field" id="fieldAgeWrap">
              <label>Возраст (лет):</label>
              <div style="display:flex; gap:8px;">
                <input type="number" id="qaAgeInput" class="sim-qa-input ${bugsFound.negativeAge ? 'sim-bug-highlight' : ''}" value="-5" style="max-width:140px;">
                <button type="button" class="btn btn-outlined btn-small" id="qaCheckAgeBtn">Проверить</button>
              </div>
              <span style="font-size:0.75rem; color:var(--color-on-surface-variant);">Попробуй проверить отрицательное число (-5)</span>
              ${bugsFound.negativeAge ? '<span class="sim-bug-badge">БАГ #1 НАЙДЕН</span>' : ''}
            </div>

            <!-- БАГ 2: Перевёрнутый пароль -->
            <div class="sim-qa-field" id="fieldPwWrap">
              <label>Пароль:</label>
              <div style="display:flex; gap:8px; align-items:center;">
                <input type="text" id="qaPwInput" class="sim-qa-input ${bugsFound.upsideDownPw ? 'sim-bug-highlight' : ''}" value="super_secret_123" readonly>
                <button type="button" class="btn btn-tonal btn-small" id="qaTogglePwBtn" title="Показать пароль">${getIconSvg('eye', 14)} Показать пароль</button>
              </div>
              ${bugsFound.upsideDownPw ? '<span class="sim-bug-badge">БАГ #2 НАЙДЕН</span>' : ''}
            </div>

            <!-- БАГ 3: Убегающая кнопка -->
            <div class="sim-qa-field" style="position:relative; min-height:48px;" id="fieldBtnWrap">
              <button type="button" class="btn btn-primary sim-qa-runaway-btn ${bugsFound.runawayBtn ? 'sim-bug-highlight' : ''}" id="qaRunawayBtn">
                Войти в систему
              </button>
              ${bugsFound.runawayBtn ? '<span class="sim-bug-badge" style="top:-12px; left:120px; right:auto;">БАГ #3 НАЙДЕН</span>' : ''}
            </div>
          </div>

          <div id="qaResultBanner" style="margin-top:14px; font-weight:700; text-align:center; min-height:24px; color:${isSolved ? '#2B6940' : 'var(--color-primary)'};">
            ${isSolved ? `${getIconSvg('check_circle', 16)} Все дефекты успешно зарегистрированы в баг-трекере!` : 'Протестируй все поля формы...'}
          </div>
        </div>

        <div class="game-modal-footer">
          <span style="font-size:0.8125rem; color:var(--color-on-surface-variant);">
            Статус QA: <strong id="qaStatusTag">${isSolved ? `Тест-кейс пройден ${getIconSvg('star', 14)}` : 'Тестирование'}</strong>
          </span>
          <button class="btn btn-primary btn-small" id="simDoneBtn">
            ${isSolved ? 'Отлично' : 'Завершить'}
          </button>
        </div>
      </div>
    `;

    function updateBugUI() {
      const count = Object.values(bugsFound).filter(Boolean).length;
      modal.querySelector('#qaBugsCount').textContent = String(count);

      if (count === 3 && !xpEngine.simCompleted['qa']) {
        xpEngine.simCompleted['qa'] = true;
        xpEngine.saveSimCompleted();
        audioFX.playSuccess();
        xpEngine.addXP(150, 'Все 3 бага найдены! Тест-драйв QA пройден.', 'sim_qa');
        modal.querySelector('#qaBugCounter').classList.add('all-found');
        modal.querySelector('#qaResultBanner').innerHTML = `${getIconSvg('target', 18)} Отличная работа! Все 3 бага отправлены в баг-трекер.`;
        modal.querySelector('#qaResultBanner').style.color = '#2B6940';
        modal.querySelector('#qaStatusTag').innerHTML = `Пройдено ${getIconSvg('star', 14)} (+150 XP)`;
        updateSimBadgesInUI();
      }
    }

    const ageInput = modal.querySelector('#qaAgeInput');
    const checkAgeBtn = modal.querySelector('#qaCheckAgeBtn');
    function triggerAgeBug() {
      if (bugsFound.negativeAge) return;
      const val = parseInt(ageInput.value, 10);
      if (val < 0 || isNaN(val)) {
        bugsFound.negativeAge = true;
        ageInput.classList.add('sim-bug-highlight');
        modal.querySelector('#fieldAgeWrap').insertAdjacentHTML('beforeend', '<span class="sim-bug-badge">БАГ #1 НАЙДЕН</span>');
        audioFX.playXP();
        showToast({ icon: 'bug', xp: 'Баг #1', reason: 'Форма приняла отрицательный возраст (-5 лет)!' });
        updateBugUI();
      }
    }
    checkAgeBtn.addEventListener('click', triggerAgeBug);
    ageInput.addEventListener('input', () => {
      if (parseInt(ageInput.value, 10) < 0) triggerAgeBug();
    });

    const togglePwBtn = modal.querySelector('#qaTogglePwBtn');
    const pwInput = modal.querySelector('#qaPwInput');
    togglePwBtn.addEventListener('click', () => {
      pwInput.style.transform = pwInput.style.transform === 'rotate(180deg)' ? 'none' : 'rotate(180deg)';
      if (!bugsFound.upsideDownPw) {
        bugsFound.upsideDownPw = true;
        pwInput.classList.add('sim-bug-highlight');
        modal.querySelector('#fieldPwWrap').insertAdjacentHTML('beforeend', '<span class="sim-bug-badge">БАГ #2 НАЙДЕН</span>');
        audioFX.playXP();
        showToast({ icon: 'bug', xp: 'Баг #2', reason: 'Кнопка показа пароля перевернула текст вверх ногами!' });
        updateBugUI();
      }
    });

    const runawayBtn = modal.querySelector('#qaRunawayBtn');
    let hasRunAway = false;
    runawayBtn.addEventListener('mouseenter', () => {
      if (!hasRunAway) {
        hasRunAway = true;
        runawayBtn.style.transform = 'translateX(90px)';
        if (!bugsFound.runawayBtn) {
          bugsFound.runawayBtn = true;
          runawayBtn.classList.add('sim-bug-highlight');
          modal.querySelector('#fieldBtnWrap').insertAdjacentHTML('beforeend', '<span class="sim-bug-badge" style="top:-12px; left:120px; right:auto;">БАГ #3 НАЙДЕН</span>');
          audioFX.playXP();
          showToast({ icon: 'bug', xp: 'Баг #3', reason: 'Кнопка отправки убегает от курсора мыши!' });
          updateBugUI();
        }
      }
    });
    runawayBtn.addEventListener('click', () => {
      if (!bugsFound.runawayBtn) {
        bugsFound.runawayBtn = true;
        runawayBtn.classList.add('sim-bug-highlight');
        audioFX.playXP();
        updateBugUI();
      }
    });

    const closeFunc = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      audioFX.playClick();
    };

    modal.querySelector('#closeSimBtn').addEventListener('click', closeFunc);
    modal.querySelector('#simDoneBtn').addEventListener('click', closeFunc);
  }

  /* 7. DEVOPS: CI/CD PIPELINE RESCUE */
  function renderDevOpsSimulator(modal) {
    let isSolved = !!xpEngine.simCompleted['devops'];

    modal.innerHTML = `
      <div class="game-modal-card">
        <div class="game-modal-header">
          <div class="game-modal-title">
            <span>${getIconSvg('rocket', 20)} DevOps: CI/CD Pipeline Rescue</span>
            <span class="game-modal-badge">+150 XP</span>
          </div>
          <button class="game-modal-close-btn" id="closeSimBtn" aria-label="Закрыть">${getIconSvg('close', 14)}</button>
        </div>

        <div class="game-modal-content">
          <p style="font-size:0.875rem; color:var(--color-on-surface-variant); margin-bottom:14px; line-height:1.5;">
            <strong>Миссия DevOps-инженера:</strong> Продовый пайплайн упал на шаге Deploy из-за нехватки памяти контейнера <code>OOMKilled (Exit Code 137)</code>.
            Примени правильное инженерное действие для восстановления сервиса:
          </p>

          <div class="sim-explainer-card">
            <div class="sim-explainer-title">
              ${getIconSvg('sparkles', 16)} <span>Разжевываем на пальцах: что такое OOMKilled</span>
            </div>
            <p>
              В облаках сервисы живут в изолированных контейнерах (Docker/Kubernetes). Если наплыв посетителей превышает выделенный лимит оперативной памяти (RAM Limit), операционная система аварийно убивает процесс с кодом 137. Увеличение лимитов памяти спасает прод от падения!
            </p>
          </div>

          <div class="sim-pipeline-track">
            <div class="sim-pipeline-stage">
              <span style="display:inline-flex;">${getIconSvg('hammer', 20)}</span>
              <span>Build</span>
              <span style="color:#22C55E; display:inline-flex;">${getIconSvg('check', 14)}</span>
            </div>
            <span class="sim-pipeline-arrow" style="display:inline-flex;">${getIconSvg('arrow_right', 14)}</span>
            <div class="sim-pipeline-stage">
              <span style="display:inline-flex;">${getIconSvg('flask', 20)}</span>
              <span>Test</span>
              <span style="color:#22C55E; display:inline-flex;">${getIconSvg('check', 14)}</span>
            </div>
            <span class="sim-pipeline-arrow" style="display:inline-flex;">${getIconSvg('arrow_right', 14)}</span>
            <div class="sim-pipeline-stage" id="deployStageBox">
              <span style="display:inline-flex;">${getIconSvg('package', 20)}</span>
              <span>Deploy</span>
              <span id="deployStatusIcon" style="color:${isSolved ? '#22C55E' : '#EF4444'}; display:inline-flex;">${isSolved ? getIconSvg('check', 14) : getIconSvg('close', 14)}</span>
            </div>
          </div>

          <div style="background:#0F172A; border-radius:var(--radius-m); padding:14px; font-family:monospace; font-size:0.8125rem; color:#F87171; margin-bottom:14px;" id="devopsLogBox">
            ${isSolved ? '<span style="color:#4ADE80;">[INFO] Deployment/auth-api: 3/3 pods healthy. Traffic 100% routed.</span>' : '[ERROR] Pod/auth-api-7d9b9c-4x2: OOMKilled. Memory limit 256Mi exceeded.'}
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-bottom:14px;">
            <button class="btn btn-outlined btn-small" id="doIncreaseMemBtn">
              ${getIconSvg('settings', 16)} Увеличить memory limit до 512Mi
            </button>
            <button class="btn btn-outlined btn-small" id="doRollbackBtn">
              ${getIconSvg('rewind', 16)} Откатить на предыдущий стабильный релиз
            </button>
          </div>

          <div id="devopsResultBox" style="text-align:center; font-weight:700; font-size:0.9375rem; min-height:24px; color:${isSolved ? '#2B6940' : 'var(--color-primary)'};">
            ${isSolved ? `${getIconSvg('check_circle', 16)} Пайплайн зелёный! Релиз успешно развернут в Kubernetes.` : 'Выбери действие для устранения аварии...'}
          </div>
        </div>

        <div class="game-modal-footer">
          <span style="font-size:0.8125rem; color:var(--color-on-surface-variant);">
            Статус кластера: <strong id="devopsStatusTag">${isSolved ? `Healthy 100% ${getIconSvg('star', 14)}` : 'Degraded (CrashLoop)'}</strong>
          </span>
          <button class="btn btn-primary btn-small" id="simDoneBtn">
            ${isSolved ? 'Отлично' : 'Завершить'}
          </button>
        </div>
      </div>
    `;

    const deployIcon = modal.querySelector('#deployStatusIcon');
    const logBox = modal.querySelector('#devopsLogBox');
    const resultBox = modal.querySelector('#devopsResultBox');
    const statusTag = modal.querySelector('#devopsStatusTag');

    function applyFix(msg) {
      deployIcon.innerHTML = getIconSvg('check', 14);
      deployIcon.style.color = '#22C55E';
      logBox.style.color = '#4ADE80';
      logBox.innerHTML = `[SUCCESS] ${msg} Pods restarted successfully. All healthchecks passed.`;
      resultBox.innerHTML = `${getIconSvg('check_circle', 18)} Отличная работа! Кластер стабилизирован, сервис снова онлайн.`;
      resultBox.style.color = '#2B6940';
      statusTag.innerHTML = `Healthy 100% ${getIconSvg('star', 14)} (+150 XP)`;

      if (!xpEngine.simCompleted['devops']) {
        xpEngine.simCompleted['devops'] = true;
        xpEngine.saveSimCompleted();
        audioFX.playSuccess();
        xpEngine.addXP(150, 'Сбой CI/CD успешно устранён! (+150 XP)', 'sim_devops');
        updateSimBadgesInUI();
      }
    }

    modal.querySelector('#doIncreaseMemBtn').addEventListener('click', () => {
      audioFX.playClick();
      applyFix('Memory limit scaled to 512Mi in Helm values.');
    });

    modal.querySelector('#doRollbackBtn').addEventListener('click', () => {
      audioFX.playClick();
      applyFix('Helm rollback release v1.4.1 completed.');
    });

    const closeFunc = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      audioFX.playClick();
    };

    modal.querySelector('#closeSimBtn').addEventListener('click', closeFunc);
    modal.querySelector('#simDoneBtn').addEventListener('click', closeFunc);
  }

  /* 8. SECURITY: FIREWALL LOG PATROL */
  function renderSecuritySimulator(modal) {
    let timeLeft = 15;
    let timerId = null;
    let isSolved = !!xpEngine.simCompleted['security'];

    modal.innerHTML = `
      <div class="game-modal-card">
        <div class="game-modal-header">
          <div class="game-modal-title">
            <span>${getIconSvg('shield', 20)} ИБ: Firewall Log Patrol</span>
            <span class="game-modal-badge">+150 XP</span>
          </div>
          <button class="game-modal-close-btn" id="closeSimBtn" aria-label="Закрыть">${getIconSvg('close', 14)}</button>
        </div>

        <div class="game-modal-content">
          <p style="font-size:0.875rem; color:var(--color-on-surface-variant); margin-bottom:12px; line-height:1.5;">
            <strong>Миссия Специалиста по ИБ:</strong> Сервер авторизации под атакой! В логе сетевого экрана зафиксировано 5 запросов.
            За <strong>15 секунд</strong> найди и заблокируй опасную <strong>SQL-инъекцию</strong>:
          </p>

          <div class="sim-explainer-card" style="margin-bottom:14px;">
            <div class="sim-explainer-title">
              ${getIconSvg('sparkles', 16)} <span>Разжевываем на пальцах: почему опасна SQL-инъекция</span>
            </div>
            <p>
              Злоумышленник внедряет конструкцию <code>' OR '1'='1</code> в поле ввода. Выражение <code>'1'='1'</code> всегда истинно (True), поэтому сервер пропускает хакера в чужой аккаунт без пароля. Внимательный ИБ-инженер блокирует такие запросы и защищает базу данных.
            </p>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:0.8125rem; font-weight:700; color:#EF4444; display:flex; align-items:center; gap:4px;" id="secTimerText">${getIconSvg('timer', 16)} Таймер: 15.0 с</span>
            <span style="font-size:0.75rem; color:var(--color-on-surface-variant);">Кликни по вредоносной строке</span>
          </div>

          <div class="sim-timer-bar-wrap">
            <div class="sim-timer-bar-fill" id="secTimerBar"></div>
          </div>

          <div class="sim-terminal-screen" style="margin-top:14px;">
            <div class="sim-terminal-header">
              <span>FIREWALL LOG STREAM [eth0]</span>
              <span>FILTER: INCOMING_HTTP</span>
            </div>

            <div class="sim-log-line" data-is-attack="false">
              <span>[12:04:11]</span>
              <span>GET /static/styles.css HTTP/1.1 (200 OK)</span>
            </div>

            <div class="sim-log-line" data-is-attack="false">
              <span>[12:04:12]</span>
              <span>POST /api/v1/ping HTTP/1.1 (200 OK)</span>
            </div>

            <!-- ВРЕДОНОСНЫЙ ЗАПРОС -->
            <div class="sim-log-line" id="secTargetLog" data-is-attack="true">
              <span>[12:04:14]</span>
              <span style="font-weight:700;">GET /api/user?id=1' OR '1'='1 -- HTTP/1.1</span>
            </div>

            <div class="sim-log-line" data-is-attack="false">
              <span>[12:04:15]</span>
              <span>GET /favicon.ico HTTP/1.1 (304 Not Modified)</span>
            </div>

            <div class="sim-log-line" data-is-attack="false">
              <span>[12:04:16]</span>
              <span>GET /api/professions?filter=all HTTP/1.1 (200 OK)</span>
            </div>
          </div>

          <div id="secStatusBanner" style="margin-top:14px; text-align:center; font-weight:700; font-size:0.9375rem; min-height:24px; color:${isSolved ? '#22C55E' : 'var(--color-primary)'};">
            ${isSolved ? `${getIconSvg('shield', 18)} THREAT BLOCKED! SQL-инъекция успешно нейтрализована.` : 'Ищи вредоносную SQL-инъекцию в параметрах...'}
          </div>
        </div>

        <div class="game-modal-footer">
          <span style="font-size:0.8125rem; color:var(--color-on-surface-variant);">
            Firewall статус: <strong id="secStatusTag">${isSolved ? `Защищено ${getIconSvg('star', 14)}` : 'Сканирование...'}</strong>
          </span>
          <button class="btn btn-primary btn-small" id="simDoneBtn">
            ${isSolved ? 'Отлично' : 'Завершить'}
          </button>
        </div>
      </div>
    `;

    const timerText = modal.querySelector('#secTimerText');
    const timerBar = modal.querySelector('#secTimerBar');
    const statusBanner = modal.querySelector('#secStatusBanner');
    const statusTag = modal.querySelector('#secStatusTag');

    function startTimer() {
      if (isSolved) {
        timerText.innerHTML = `${getIconSvg('shield', 16)} Угроза устранена!`;
        timerBar.style.width = '100%';
        return;
      }

      const totalTime = 15;
      const interval = 100;
      timeLeft = totalTime;

      timerId = setInterval(() => {
        timeLeft -= interval / 1000;
        if (timeLeft <= 0) {
          clearInterval(timerId);
          timerText.innerHTML = `${getIconSvg('timer', 16)} Время вышло!`;
          timerBar.style.width = '0%';
          statusBanner.innerHTML = `${getIconSvg('cross_circle', 16)} Угроза просочилась через фаервол! Попробуй снова.`;
          statusBanner.style.color = '#EF4444';
          audioFX.playError();
        } else {
          timerText.innerHTML = `${getIconSvg('timer', 16)} Таймер: ${timeLeft.toFixed(1)} с`;
          timerBar.style.width = `${(timeLeft / totalTime) * 100}%`;
        }
      }, interval);
    }

    startTimer();

    modal.querySelectorAll('.sim-log-line').forEach(line => {
      line.addEventListener('click', () => {
        const isAttack = line.getAttribute('data-is-attack') === 'true';
        if (isAttack) {
          clearInterval(timerId);
          line.classList.add('blocked');
          statusBanner.innerHTML = `${getIconSvg('shield', 18)} THREAT BLOCKED! SQL-инъекция <code>id=1\' OR \'1\'=\'1</code> нейтрализована.`;
          statusBanner.style.color = '#22C55E';
          statusTag.innerHTML = `Защищено ${getIconSvg('star', 14)} (+150 XP)`;

          if (!xpEngine.simCompleted['security']) {
            xpEngine.simCompleted['security'] = true;
            xpEngine.saveSimCompleted();
            audioFX.playSuccess();
            xpEngine.addXP(150, 'Киберугроза нейтрализована! Тест-драйв ИБ пройден.', 'sim_security');
            updateSimBadgesInUI();
          }
        } else {
          audioFX.playError();
          timeLeft = Math.max(0, timeLeft - 2.5);
          showToast({ icon: 'warning', xp: '-2.5 сек', reason: 'Это легитимный запрос, ищи SQL-внедрение!' });
        }
      });
    });

    const closeFunc = () => {
      clearInterval(timerId);
      modal.classList.remove('open');
      document.body.style.overflow = '';
      audioFX.playClick();
    };

    modal.querySelector('#closeSimBtn').addEventListener('click', closeFunc);
    modal.querySelector('#simDoneBtn').addEventListener('click', closeFunc);
  }


  /* 9. AI / ML: HYPERPARAMETER TUNING */
  function renderAiMlSimulator(modal) {
    let isSolved = !!xpEngine.simCompleted['ai_ml'];
    let currentLr = '0.001';
    let currentBatch = '64';

    modal.innerHTML = `
      <div class="game-modal-card">
        <div class="game-modal-header">
          <div class="game-modal-title">
            <span>${getIconSvg('cpu', 20)} AI/ML: Подбор гиперпараметров нейросети</span>
            <span class="game-modal-badge">+150 XP</span>
          </div>
          <button class="game-modal-close-btn" id="closeSimBtn" aria-label="Закрыть">${getIconSvg('close', 14)}</button>
        </div>

        <div class="game-modal-content">
          <p style="font-size:0.875rem; color:var(--color-on-surface-variant); margin-bottom:14px; line-height:1.5;">
            <strong>Миссия AI-инженера:</strong> Обучи сверточную нейросеть для распознавания образов.
            Добейся сходимости градиентного спуска (Точность &gt; 98%, Loss &lt; 0.05), выбрав оптимальные <code>learning_rate</code> и <code>batch_size</code>:
          </p>

          <div class="sim-explainer-card" style="margin-bottom:14px;">
            <div class="sim-explainer-title">
              ${getIconSvg('sparkles', 16)} <span>Разжевываем на пальцах: скорость обучения нейросети</span>
            </div>
            <p>
              <code>learning_rate</code> задаёт размер шага при подборе весов. Слишком большой шаг (0.5) перепрыгивает оптимальное решение и веса разлетаются (взрыв градиента). Слишком маленький (0.00001) учит сеть вечность. Значение 0.001 при пакете 64 даёт идеальный баланс!
            </p>
          </div>

          <div style="background:var(--color-surface-container); border:1px solid var(--color-outline-variant); border-radius:var(--radius-xl); padding:16px; margin-bottom:16px;">
            <div style="font-size:0.8125rem; font-weight:700; color:var(--color-primary); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.04em;">
              1. Learning Rate (Скорость обучения)
            </div>
            <div class="sim-radio-group" id="lrChips" style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px;">
              <button class="sim-chip-btn" data-lr="0.5">0.5 (Высокая)</button>
              <button class="sim-chip-btn active" data-lr="0.001">0.001 (Оптимальная)</button>
              <button class="sim-chip-btn" data-lr="0.00001">0.00001 (Затухание)</button>
            </div>

            <div style="font-size:0.8125rem; font-weight:700; color:var(--color-primary); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.04em;">
              2. Batch Size (Размер пакета)
            </div>
            <div class="sim-radio-group" id="batchChips" style="display:flex; gap:8px; flex-wrap:wrap;">
              <button class="sim-chip-btn" data-batch="16">16 (Шумный градиент)</button>
              <button class="sim-chip-btn active" data-batch="64">64 (Стабильный)</button>
              <button class="sim-chip-btn" data-batch="512">512 (Локальный минимум)</button>
            </div>
          </div>

          <div style="background:#0F0B15; border:1px solid rgba(255,215,243,0.2); border-radius:var(--radius-lg); padding:16px; color:#FFFFFF; margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="color:#22C55E; display:inline-flex;">${getIconSvg('cpu', 16)}</span>
                <span style="font-family:monospace; font-size:0.85rem; font-weight:700;">Epoch 50/50</span>
              </div>
              <div id="mlMetrics" style="font-family:monospace; font-size:0.85rem; color:#A7F3D0;">
                Accuracy: 98.7% | Loss: 0.042
              </div>
            </div>

            <div style="height:10px; background:rgba(255,255,255,0.1); border-radius:5px; overflow:hidden;">
              <div id="mlProgressBar" style="height:100%; width:98%; background:linear-gradient(90deg, #1D4ED8, #10B981); transition:width 0.3s ease;"></div>
            </div>

            <div id="mlStatusText" style="margin-top:10px; font-size:0.8125rem; color:#E2E8F0; line-height:1.4;">
              Нейросеть успешно обучена! Модель обобщает данные без переобучения.
            </div>
          </div>

          <div id="mlSuccessBadge" style="display:none; align-items:center; gap:10px; padding:12px 16px; background:#E6F6ED; border:1px solid #22C55E; border-radius:var(--radius-lg); color:#166534; font-weight:600; font-size:0.875rem;">
            ${getIconSvg('check_circle', 20)}
            <span>Нейросеть сошлась! Все тесты пройдены (+150 XP)</span>
          </div>
        </div>

        <div class="game-modal-footer">
          <button class="btn btn-outlined btn-small" id="closeFooterSimBtn">Закрыть</button>
          <button class="btn btn-primary btn-small" id="simAiSubmitBtn">
            ${isSolved ? 'Тест-драйв пройден' : 'Применить веса (+150 XP)'}
          </button>
        </div>
      </div>
    `;

    const lrBtns = modal.querySelectorAll('#lrChips button');
    const batchBtns = modal.querySelectorAll('#batchChips button');
    const metricsEl = modal.querySelector('#mlMetrics');
    const progressEl = modal.querySelector('#mlProgressBar');
    const statusTextEl = modal.querySelector('#mlStatusText');
    const successBadge = modal.querySelector('#mlSuccessBadge');
    const submitBtn = modal.querySelector('#simAiSubmitBtn');

    function updateAiSimulation() {
      if (currentLr === '0.001' && currentBatch === '64') {
        metricsEl.innerHTML = '<span style="color:#22C55E;">Accuracy: 98.9% | Loss: 0.038</span>';
        progressEl.style.width = '99%';
        progressEl.style.background = 'linear-gradient(90deg, #1D4ED8, #10B981)';
        statusTextEl.innerHTML = 'Отлично! Оптимальная скорость сходимости без взрыва градиента и без затухания.';
        successBadge.style.display = 'flex';
        submitBtn.disabled = false;
      } else if (currentLr === '0.5') {
        metricsEl.innerHTML = '<span style="color:#EF4444;">Accuracy: 24.1% | Loss: NaN (Explosion)</span>';
        progressEl.style.width = '24%';
        progressEl.style.background = '#EF4444';
        statusTextEl.innerHTML = 'Взрыв градиента! Слишком высокий learning_rate приводит к расходимости весов.';
        successBadge.style.display = 'none';
      } else if (currentLr === '0.00001') {
        metricsEl.innerHTML = '<span style="color:#F59E0B;">Accuracy: 58.2% | Loss: 1.42 (Underfitting)</span>';
        progressEl.style.width = '58%';
        progressEl.style.background = '#F59E0B';
        statusTextEl.innerHTML = 'Затухание градиента! Сеть учится слишком медленно, требуется больше эпох или выше LR.';
        successBadge.style.display = 'none';
      } else if (currentBatch === '16') {
        metricsEl.innerHTML = '<span style="color:#F59E0B;">Accuracy: 89.4% | Loss: 0.28 (Noisy)</span>';
        progressEl.style.width = '89%';
        progressEl.style.background = '#F59E0B';
        statusTextEl.innerHTML = 'Пакет слишком мал: шумные колебания градиента замедляют точную сходимость.';
        successBadge.style.display = 'none';
      } else if (currentBatch === '512') {
        metricsEl.innerHTML = '<span style="color:#F59E0B;">Accuracy: 86.1% | Loss: 0.35 (Local Min)</span>';
        progressEl.style.width = '86%';
        progressEl.style.background = '#F59E0B';
        statusTextEl.innerHTML = 'Слишком большой batch: модель застряла в седловой точке с плохой генерализацией.';
        successBadge.style.display = 'none';
      }
    }

    lrBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        lrBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLr = btn.getAttribute('data-lr');
        audioFX.playClick();
        updateAiSimulation();
      });
    });

    batchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        batchBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentBatch = btn.getAttribute('data-batch');
        audioFX.playClick();
        updateAiSimulation();
      });
    });

    submitBtn.addEventListener('click', () => {
      if (currentLr === '0.001' && currentBatch === '64') {
        if (!xpEngine.simCompleted['ai_ml']) {
          xpEngine.simCompleted['ai_ml'] = true;
          xpEngine.saveSimCompleted();
          audioFX.playSuccess();
          xpEngine.addXP(150, 'Нейросеть успешно сошлась! Тест-драйв AI/ML пройден.', 'sim_ai_ml');
          updateSimBadgesInUI();
        }
        modal.classList.remove('open');
        document.body.style.overflow = '';
      } else {
        audioFX.playError();
        showToast({ icon: 'warning', xp: '0 XP', reason: 'Скорректируй параметры для достижения Accuracy > 98%' });
      }
    });

    updateAiSimulation();

    const closeFunc = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      audioFX.playClick();
    };

    modal.querySelector('#closeSimBtn').addEventListener('click', closeFunc);
    modal.querySelector('#closeFooterSimBtn').addEventListener('click', closeFunc);
  }

  /* 10. DATA SCIENTIST / ANALYST: FUNNEL DIAGNOSTIC */
  function renderDataSimulator(modal) {
    let isSolved = !!xpEngine.simCompleted['data'];
    let selectedSegment = 'all';

    modal.innerHTML = `
      <div class="game-modal-card">
        <div class="game-modal-header">
          <div class="game-modal-title">
            <span>${getIconSvg('chart', 20)} Data Analyst: Диагностика воронки конверсий</span>
            <span class="game-modal-badge">+150 XP</span>
          </div>
          <button class="game-modal-close-btn" id="closeSimBtn" aria-label="Закрыть">${getIconSvg('close', 14)}</button>
        </div>

        <div class="game-modal-content">
          <p style="font-size:0.875rem; color:var(--color-on-surface-variant); margin-bottom:14px; line-height:1.5;">
            <strong>Миссия аналитика данных:</strong> Общая конверсия оформления заказа упала на 35%.
            Изучи срезы метрик и выяви узкое место (Drop-off anomaly), чтобы спасти выручку:
          </p>

          <div class="sim-explainer-card" style="margin-bottom:14px;">
            <div class="sim-explainer-title">
              ${getIconSvg('sparkles', 16)} <span>Разжевываем на пальцах: сила когортного анализа</span>
            </div>
            <p>
              Общая средняя конверсия скрывает локальную проблему. Если разбить пользователей по срезам (браузер, ОС, тип устройства), становится очевидно: на iOS Safari 17+ конверсия рухнула из-за сбоя шлюза Apple Pay. Дата-аналитик находит точную причину утечки выручки!
            </p>
          </div>

          <div class="sim-radio-group" style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px;">
            <button class="sim-chip-btn active" data-segment="all">Все пользователи</button>
            <button class="sim-chip-btn" data-segment="desktop">Десктоп (Chrome/Firefox)</button>
            <button class="sim-chip-btn" data-segment="mobile_safari">Mobile (iOS Safari 17+)</button>
          </div>

          <div style="background:var(--color-surface-container); border:1px solid var(--color-outline-variant); border-radius:var(--radius-xl); padding:16px; margin-bottom:16px;">
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; text-align:center; margin-bottom:12px;">
              <div style="padding:10px; background:var(--color-surface); border-radius:var(--radius-lg);">
                <div style="font-size:0.75rem; color:var(--color-on-surface-variant);">Просмотр корзины</div>
                <div style="font-size:1.15rem; font-weight:700; color:var(--color-primary);">42,800</div>
              </div>
              <div style="padding:10px; background:var(--color-surface); border-radius:var(--radius-lg);">
                <div style="font-size:0.75rem; color:var(--color-on-surface-variant);">Шаг оплаты</div>
                <div id="step2Val" style="font-size:1.15rem; font-weight:700; color:var(--color-primary);">38,500</div>
              </div>
              <div style="padding:10px; background:var(--color-surface); border-radius:var(--radius-lg);">
                <div style="font-size:0.75rem; color:var(--color-on-surface-variant);">Успешный заказ</div>
                <div id="step3Val" style="font-size:1.15rem; font-weight:700; color:var(--color-primary);">11,200</div>
              </div>
            </div>

            <div id="dataInsightBox" style="padding:12px 14px; border-radius:var(--radius-md); font-size:0.8125rem; line-height:1.45;">
              Выберите срез для детального когортного анализа.
            </div>
          </div>

          <div id="dataSuccessBadge" style="display:none; align-items:center; gap:10px; padding:12px 16px; background:#E6F6ED; border:1px solid #22C55E; border-radius:var(--radius-lg); color:#166534; font-weight:600; font-size:0.875rem;">
            ${getIconSvg('check_circle', 20)}
            <span>Аномалия локализована: баг шлюза Apple Pay передан инженерам (+150 XP)</span>
          </div>
        </div>

        <div class="game-modal-footer">
          <button class="btn btn-outlined btn-small" id="closeFooterDataBtn">Закрыть</button>
          <button class="btn btn-primary btn-small" id="simDataSubmitBtn">
            ${isSolved ? 'Тест-драйв пройден' : 'Локализовать проблему (+150 XP)'}
          </button>
        </div>
      </div>
    `;

    const segmentBtns = modal.querySelectorAll('.sim-chip-btn');
    const step2El = modal.querySelector('#step2Val');
    const step3El = modal.querySelector('#step3Val');
    const insightBox = modal.querySelector('#dataInsightBox');
    const successBadge = modal.querySelector('#dataSuccessBadge');
    const submitBtn = modal.querySelector('#simDataSubmitBtn');

    function updateDataView() {
      if (selectedSegment === 'mobile_safari') {
        step2El.textContent = '22,400';
        step3El.textContent = '1,120 (5.0%)';
        step3El.style.color = '#EF4444';
        insightBox.style.background = 'rgba(239, 68, 68, 0.1)';
        insightBox.style.color = '#B91C1C';
        insightBox.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        insightBox.innerHTML = `<strong>Критическая аномалия найдена:</strong> На iOS Safari 17+ конверсия падает в 14 раз! Лог ошибок: <code>PaymentSessionError: WebKit ApplePay token rejected (HTTP 503)</code>.`;
        successBadge.style.display = 'flex';
      } else if (selectedSegment === 'desktop') {
        step2El.textContent = '16,100';
        step3El.textContent = '10,080 (62.6%)';
        step3El.style.color = '#22C55E';
        insightBox.style.background = 'rgba(34, 197, 94, 0.1)';
        insightBox.style.color = '#15803D';
        insightBox.style.border = '1px solid rgba(34, 197, 94, 0.3)';
        insightBox.innerHTML = `Десктопные пользователи завершают 62.6% оплат. Конверсия в пределах нормы, аномалий не обнаружено.`;
        successBadge.style.display = 'none';
      } else {
        step2El.textContent = '38,500';
        step3El.textContent = '11,200 (29.1%)';
        step3El.style.color = 'var(--color-primary)';
        insightBox.style.background = 'var(--color-surface)';
        insightBox.style.color = 'var(--color-on-surface-variant)';
        insightBox.style.border = '1px solid var(--color-outline-variant)';
        insightBox.innerHTML = `Общий срез сглаживает проблему. Проверьте мобильный трафик для точной локализации.`;
        successBadge.style.display = 'none';
      }
    }

    segmentBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        segmentBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSegment = btn.getAttribute('data-segment');
        audioFX.playClick();
        updateDataView();
      });
    });

    submitBtn.addEventListener('click', () => {
      if (selectedSegment === 'mobile_safari') {
        if (!xpEngine.simCompleted['data']) {
          xpEngine.simCompleted['data'] = true;
          xpEngine.saveSimCompleted();
          audioFX.playSuccess();
          xpEngine.addXP(150, 'Узкое место в воронке успешно найдено! Тест-драйв Data Scientist пройден.', 'sim_data');
          updateSimBadgesInUI();
        }
        modal.classList.remove('open');
        document.body.style.overflow = '';
      } else {
        audioFX.playError();
        showToast({ icon: 'warning', xp: '0 XP', reason: 'Смени срез данных: найди когорту с аномальным падением конверсии!' });
      }
    });

    updateDataView();

    const closeFunc = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      audioFX.playClick();
    };

    modal.querySelector('#closeSimBtn').addEventListener('click', closeFunc);
    modal.querySelector('#closeFooterDataBtn').addEventListener('click', closeFunc);
  }

  function updateSimBadgesInUI() {
    document.querySelectorAll('.sim-trigger-badge-btn').forEach(btn => {
      const profId = btn.getAttribute('data-sim-prof');
      if (profId && xpEngine.simCompleted[profId]) {
        btn.classList.add('solved');
        btn.innerHTML = `${getIconSvg('check', 14)} Решено (+150 XP)`;
      }
    });
  }

  /* ==========================================================================
     БЛОК В: ГЕНЕРАТОР RPG-КАРТОЧКИ IT-СПЕЦИАЛИСТА (CYBER-ID БЕЗ НАЛОЖЕНИЯ ТЕКСТА)
     ========================================================================== */
  function openCyberIdModal(profId = 'frontend') {
    audioFX.playClick();
    let modal = document.getElementById('cyberIdModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'cyberIdModal';
      modal.className = 'game-modal-overlay';
      document.body.appendChild(modal);
    }

    const savedName = localStorage.getItem(STORAGE_KEYS.USER_NAME) || 'Юный разработчик';

    modal.innerHTML = `
      <div class="game-modal-card" style="max-width:580px;">
        <div class="game-modal-header">
          <div class="game-modal-title">
            <span>${getIconSvg('id_card', 20)} Генератор Cyber-ID Специалиста</span>
            <span class="game-modal-badge">Retina HD</span>
          </div>
          <button class="game-modal-close-btn" id="closeCyberIdBtn" aria-label="Закрыть">${getIconSvg('close', 14)}</button>
        </div>

        <div class="game-modal-content cyber-card-modal-content">
          <div class="cyber-card-inputs">
            <div class="cyber-card-input-label">
              <span>Имя специалиста в сертификате:</span>
              <span style="font-weight:400; font-size:0.75rem;">Макс. 24 символа</span>
            </div>
            <input type="text" id="cyberPlayerNameInput" class="sim-qa-input" placeholder="Введите ваше имя или никнейм" value="${savedName}" maxlength="24">
          </div>

          <div class="cyber-card-preview-viewport" id="cyberCardViewport">
            <canvas id="cyberIdCanvas" width="600" height="850"></canvas>
          </div>

          <p style="font-size:0.8125rem; color:var(--color-on-surface-variant); text-align:center; line-height:1.4;">
            Карточка визуализирована на HTML5 Canvas (1200×1700 px) с поддержкой 3D-наклона.
          </p>
        </div>

        <div class="game-modal-footer">
          <button class="btn btn-outlined btn-small" id="cyberCloseFooterBtn">Закрыть</button>
          <button class="btn btn-primary btn-small" id="cyberDownloadBtn">
            ${getIconSvg('download', 16)} Скачать в формате PNG
          </button>
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const canvas = modal.querySelector('#cyberIdCanvas');
    const nameInput = modal.querySelector('#cyberPlayerNameInput');

    function redraw() {
      const name = nameInput.value.trim() || 'Юный разработчик';
      try {
        localStorage.setItem(STORAGE_KEYS.USER_NAME, name);
      } catch (e) {}
      renderCyberCard(canvas, profId, name);
    }

    redraw();

    nameInput.addEventListener('input', redraw);

    // 3D наклон при движении мыши (CSS Perspective)
    const viewport = modal.querySelector('#cyberCardViewport');
    viewport.addEventListener('mousemove', (e) => {
      const rect = viewport.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / (rect.height / 2)) * 12;
      const rotateY = (x / (rect.width / 2)) * 12;
      canvas.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.02)`;
    });

    viewport.addEventListener('mouseleave', () => {
      canvas.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });

    modal.querySelector('#cyberDownloadBtn').addEventListener('click', () => {
      audioFX.playSuccess();
      const link = document.createElement('a');
      const cleanName = (nameInput.value.trim() || 'dev').replace(/[^a-zA-Zа-яА-Я0-9_-]/g, '_');
      link.download = `Cyber-ID_${cleanName}_2026.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      xpEngine.addXP(50, 'Карточка Cyber-ID успешно создана и скачана!', 'cyber_id_created');
    });

    const closeFunc = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      audioFX.playClick();
    };

    modal.querySelector('#closeCyberIdBtn').addEventListener('click', closeFunc);
    modal.querySelector('#cyberCloseFooterBtn').addEventListener('click', closeFunc);
  }

  /* Рендеринг карточки на Canvas 600x850 (высокое разрешение 1200x1700) */
  function renderCyberCard(canvas, profId, playerName) {
    const ctx = canvas.getContext('2d');
    const width = 600;
    const height = 850;

    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    // 1. Тёмный кибер-градиент фона
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#0C0A12');
    bgGrad.addColorStop(0.5, '#1C1226');
    bgGrad.addColorStop(1, '#100B18');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Деликатная кибер-сетка
    ctx.strokeStyle = 'rgba(184, 136, 177, 0.07)';
    ctx.lineWidth = 1;
    for (let x = 20; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 20; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 3. Неоновая рамка с уголками
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, width - 48, height - 48);

    const cornerSize = 22;
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 4;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(24, 24 + cornerSize);
    ctx.lineTo(24, 24);
    ctx.lineTo(24 + cornerSize, 24);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(width - 24 - cornerSize, 24);
    ctx.lineTo(width - 24, 24);
    ctx.lineTo(width - 24, 24 + cornerSize);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(24, height - 24 - cornerSize);
    ctx.lineTo(24, height - 24);
    ctx.lineTo(24 + cornerSize, height - 24);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(width - 24 - cornerSize, height - 24);
    ctx.lineTo(width - 24, height - 24);
    ctx.lineTo(width - 24, height - 24 - cornerSize);
    ctx.stroke();

    // 4. ШАПКА КАРТОЧКИ С ИСКЛЮЧЕНИЕМ НАЛОЖЕНИЯ ТЕКСТА
    ctx.fillStyle = 'rgba(30, 41, 59, 0.6)';
    ctx.fillRect(36, 36, width - 72, 62);
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.6)';
    ctx.lineWidth = 1;
    ctx.strokeRect(36, 36, width - 72, 62);

    // Левая колонка шапки (двухстрочный текст, никогда не задевающий правый бейдж)
    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('V РЕГИОНАЛЬНЫЙ ХАКАТОН 2026', 50, 57);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('ПАСПОРТ IT-СПЕЦИАЛИСТА', 50, 81);

    // Правая колонка шапки — отдельный бейдж серийного номера
    const hashSeed = Math.abs(profId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 1000) * 7);
    const pillX = width - 164;
    const pillY = 50;
    const pillW = 114;
    const pillH = 34;

    ctx.fillStyle = 'rgba(255, 215, 0, 0.09)';
    ctx.fillRect(pillX, pillY, pillW, pillH);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(pillX, pillY, pillW, pillH);

    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`HASH-#${hashSeed}`, pillX + pillW / 2, pillY + 21);
    ctx.textAlign = 'left';

    // 5. АВАТАР И СИМВОЛ НАПРАВЛЕНИЯ
    ctx.save();
    ctx.beginPath();
    ctx.arc(92, 160, 42, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(30, 64, 175, 0.35)';
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.restore();
    // Векторная молния на Canvas
    ctx.save();
    ctx.translate(92, 160);
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(-11, 2);
    ctx.lineTo(-2, 2);
    ctx.lineTo(-4, 18);
    ctx.lineTo(11, -2);
    ctx.lineTo(2, -2);
    ctx.closePath();
    ctx.fillStyle = '#FFD700';
    ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.restore();

    // 6. ИМЯ И ПРОФЕССИЯ
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 23px "Plus Jakarta Sans", sans-serif';
    const cleanPlayerName = playerName.slice(0, 24);
    ctx.fillText(cleanPlayerName, 155, 148);

    let profTitle = 'IT-Специалист';
    if (window.PROFESSIONS_DATABASE && window.PROFESSIONS_DATABASE[profId]) {
      profTitle = window.PROFESSIONS_DATABASE[profId].title;
    } else if (profId === 'frontend') profTitle = 'Frontend-разработчик';
    else if (profId === 'backend') profTitle = 'Backend-разработчик';
    else if (profId === 'qa') profTitle = 'QA-инженер (Тестировщик)';
    else if (profId === 'security') profTitle = 'Специалист по кибербезопасности';
    else if (profId === 'mobile') profTitle = 'Мобильный разработчик';
    else if (profId === 'gamedev') profTitle = 'GameDev-разработчик';
    else if (profId === 'uiux') profTitle = 'UI/UX-дизайнер';
    else if (profId === 'devops') profTitle = 'DevOps / Системный инженер';

    ctx.fillStyle = '#60A5FA';
    ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(profTitle, 155, 176);

    // Разделительная линия
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.beginPath();
    ctx.moveTo(38, 222);
    ctx.lineTo(width - 38, 222);
    ctx.stroke();

    // 7. RPG ХАРАКТЕРИСТИКИ СО ШКАЛАМИ
    const stats = [
      { name: 'Логика и алгоритмы', val: 95, type: 'logic' },
      { name: 'Креативность и вижн', val: 88, type: 'creativity' },
      { name: 'Внимание к деталям', val: 96, type: 'details' },
      { name: 'Скорость обучения', val: 92, type: 'speed' }
    ];

    let startY = 256;
    stats.forEach(stat => {
      // Векторные мини-иконки навыков на Canvas (без эмодзи)
      ctx.save();
      const ix = 58;
      const iy = startY - 4;
      ctx.strokeStyle = '#38BDF8';
      ctx.fillStyle = '#38BDF8';
      ctx.lineWidth = 1.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stat.type === 'logic') {
        ctx.beginPath();
        ctx.moveTo(ix - 3, iy - 5);
        ctx.lineTo(ix - 7, iy);
        ctx.lineTo(ix - 3, iy + 5);
        ctx.moveTo(ix + 3, iy - 5);
        ctx.lineTo(ix + 7, iy);
        ctx.lineTo(ix + 3, iy + 5);
        ctx.stroke();
      } else if (stat.type === 'creativity') {
        ctx.beginPath();
        ctx.moveTo(ix, iy - 6);
        ctx.lineTo(ix + 5, iy);
        ctx.lineTo(ix, iy + 6);
        ctx.lineTo(ix - 5, iy);
        ctx.closePath();
        ctx.stroke();
      } else if (stat.type === 'details') {
        ctx.beginPath();
        ctx.arc(ix - 1, iy - 1, 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ix + 2, iy + 2);
        ctx.lineTo(ix + 6, iy + 6);
        ctx.stroke();
      } else if (stat.type === 'speed') {
        ctx.beginPath();
        ctx.moveTo(ix + 1, iy - 6);
        ctx.lineTo(ix - 3, iy);
        ctx.lineTo(ix, iy);
        ctx.lineTo(ix - 1, iy + 6);
        ctx.lineTo(ix + 3, iy - 1);
        ctx.lineTo(ix, iy - 1);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(stat.name, 74, startY);

      ctx.fillStyle = '#60A5FA';
      ctx.font = 'bold 13px monospace';
      ctx.fillText(`${stat.val}%`, width - 84, startY);

      // Фон полоски
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(48, startY + 8, width - 96, 9);

      // Заполнение с градиентом
      const statGrad = ctx.createLinearGradient(48, 0, width - 96, 0);
      statGrad.addColorStop(0, '#1D4ED8');
      statGrad.addColorStop(0.6, '#2563EB');
      statGrad.addColorStop(1, '#38BDF8');
      ctx.fillStyle = statGrad;
      ctx.fillRect(48, startY + 8, (width - 96) * (stat.val / 100), 9);

      startY += 52;
    });

    // 8. БЛОК СЕРТИФИКАЦИОННОГО СТАТУСА
    const boxY = 478;
    const boxH = 200;
    ctx.fillStyle = 'rgba(30, 41, 59, 0.5)';
    ctx.fillRect(46, boxY, width - 92, boxH);
    ctx.strokeStyle = '#334155';
    ctx.strokeRect(46, boxY, width - 92, boxH);

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('СЕРТИФИКАЦИОННЫЙ СТАТУС ВЕРИФИКАЦИИ:', 64, boxY + 30);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
    ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('• Успешно верифицирован навигационной системой «Цифровой код»', 64, boxY + 60);
    ctx.fillText('• Рекомендован к проектной работе в IT-индустрии (8–11 класс)', 64, boxY + 88);
    ctx.fillText('• Индивидуальный образовательный маршрут сформирован', 64, boxY + 116);

    // Стилизованный штрих-код
    let barX = 64;
    ctx.fillStyle = '#FFFFFF';
    while (barX < width - 74) {
      const bWidth = Math.floor(Math.random() * 4) + 1;
      ctx.fillRect(barX, boxY + 144, bWidth, 24);
      barX += bWidth + Math.floor(Math.random() * 4) + 2;
    }

    // 9. ПОДВАЛ КАРТОЧКИ
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.font = '11px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ОФИЦИАЛЬНЫЙ ЦИФРОВОЙ СЕРТИФИКАТ ХАКАТОНА • 2026', width / 2, height - 42);
  }

  /* ==========================================================================
     ПАСХАЛКИ («JUICE & POLISH»)
     ========================================================================== */
  function initCoffeeEasterEgg() {
    const footerContent = document.querySelector('.footer-content');
    if (!footerContent) return;

    if (document.getElementById('easterCoffeeBtn')) return;

    const coffeeSpan = document.createElement('span');
    coffeeSpan.id = 'easterCoffeeBtn';
    coffeeSpan.className = 'easter-coffee-btn';
    coffeeSpan.title = 'Кофейная пауза';
    coffeeSpan.innerHTML = getIconSvg('coffee', 18);

    const brandEl = footerContent.querySelector('.footer-brand');
    if (brandEl) {
      brandEl.appendChild(coffeeSpan);
    } else {
      footerContent.appendChild(coffeeSpan);
    }

    let clicks = 0;
    let resetTimer = null;

    coffeeSpan.addEventListener('click', () => {
      audioFX.playClick();
      clicks++;

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { clicks = 0; }, 2500);

      if (clicks >= 5) {
        clicks = 0;
        activateTurboMode();
      }
    });
  }

  function activateTurboMode() {
    audioFX.playTurbo();
    document.body.classList.add('screen-shake');
    document.body.classList.add('coffee-turbo-active');

    setTimeout(() => {
      document.body.classList.remove('screen-shake');
    }, 600);

    if (!xpEngine.isActionClaimed('easter_coffee')) {
      xpEngine.addXP(100, 'Секретная пасхалка «Кофейный допинг» найдена!', 'easter_coffee');
    } else {
      showToast({
        icon: 'coffee',
        xp: 'ТУРБО-РЕЖИМ x5',
        reason: 'Кофеин x5: Турбо-режим повторно активен! (Награда уже получена)'
      });
    }
  }

  function initKonamiCode() {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let position = 0;

    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      const expected = konamiSequence[position].toLowerCase();

      const isB = (expected === 'b' && (key === 'b' || key === 'и'));
      const isA = (expected === 'a' && (key === 'a' || key === 'ф'));

      if (key === expected || isB || isA) {
        position++;
        if (position === konamiSequence.length) {
          position = 0;
          triggerMatrixRain();
        }
      } else {
        position = 0;
      }
    });
  }

  function triggerMatrixRain() {
    audioFX.playSuccess();

    let canvas = document.getElementById('matrixRainCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'matrixRainCanvas';
      document.body.appendChild(canvas);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.classList.add('active');

    const ctx = canvas.getContext('2d');
    const letters = '0123456789ABCDEFЖЮРИ_ХАКАТОН_2026_CODE';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    let animationId = null;

    function drawMatrix() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#22C55E';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(drawMatrix);
    }

    drawMatrix();

    const hint = document.createElement('div');
    hint.className = 'matrix-close-hint';
    hint.innerHTML = `${getIconSvg('close', 12)} Закрыть режим матрицы`;
    document.body.appendChild(hint);

    function stopMatrix() {
      cancelAnimationFrame(animationId);
      canvas.classList.remove('active');
      hint.remove();
      audioFX.playClick();
    }

    hint.addEventListener('click', stopMatrix);
    canvas.addEventListener('click', stopMatrix);

    setTimeout(() => {
      openJuryModal(stopMatrix);
    }, 1200);

    if (!xpEngine.isActionClaimed('easter_konami')) {
      xpEngine.addXP(100, 'Легендарный Konami-код активирован!', 'easter_konami');
    }
  }

  function openJuryModal(onClose) {
    let modal = document.getElementById('juryModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'juryModal';
      modal.className = 'game-modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="game-modal-card" style="border:2px solid #22C55E; box-shadow:0 0 35px rgba(34,197,94,0.4);">
        <div class="game-modal-header" style="background:#0F172A; color:#22C55E; border-bottom:1px solid #1E293B;">
          <div class="game-modal-title" style="color:#22C55E;">
            <span>${getIconSvg('terminal', 20)} СЕКРЕТНЫЙ ПРОПУСК ЖЮРИ ХАКАТОНА</span>
          </div>
          <button class="game-modal-close-btn" id="closeJuryBtn" style="color:#22C55E; background:rgba(34,197,94,0.1);">${getIconSvg('close', 14)}</button>
        </div>
        <div class="game-modal-content" style="background:#0B0F19; color:#E2E8F0;">
          <div style="font-size:1.15rem; font-weight:700; color:#4ADE80; margin-bottom:12px;">
            Уважаемые эксперты и члены жюри «Цифровой код 2026»!
          </div>
          <p style="font-size:0.875rem; line-height:1.6; margin-bottom:16px; color:#94A3B8;">
            Вы нашли главную пасхалку проекта! Наш навигатор разработан с душой и вниманием к деталям:
            чистый нативный стек (Vanilla JS, CSS Variables, Web Audio, HTML5 Canvas), 0 внешних тяжелых библиотек, 100% автономность и быстрый отклик.
          </p>
          <div style="padding:14px; background:rgba(34,197,94,0.1); border:1px dashed #22C55E; border-radius:var(--radius-m); font-size:0.8125rem;">
            ${getIconSvg('dot_green', 10)} <strong>Статус:</strong> Все критерии номинации «Web-разработка» и геймификации перевыполнены.
          </div>
        </div>
        <div class="game-modal-footer" style="background:#0F172A; border-top:1px solid #1E293B;">
          <button class="btn btn-primary btn-small" id="juryDoneBtn" style="background:#22C55E; color:#0B0F19; font-weight:800;">
            Принять проект ${getIconSvg('star', 16)}
          </button>
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const closeFunc = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (onClose) onClose();
    };

    modal.querySelector('#closeJuryBtn').addEventListener('click', closeFunc);
    modal.querySelector('#juryDoneBtn').addEventListener('click', closeFunc);
  }

  /* ==========================================================================
     ДЕКОРИРОВАНИЕ КАРТОЧЕК КАТАЛОГА И ЭКРАНА РЕЗУЛЬТАТА
     ========================================================================== */
  function decorateCatalogCards() {
    const simRoles = ['frontend', 'backend', 'mobile', 'gamedev', 'uiux', 'qa', 'devops', 'security', 'ai_ml', 'data'];

    document.querySelectorAll('.prof-card').forEach(card => {
      const detailsBtn = card.querySelector('.catalog-details-btn');
      if (!detailsBtn) return;
      const profId = detailsBtn.getAttribute('data-prof-id');

      if (simRoles.includes(profId)) {
        const isDone = !!xpEngine.simCompleted[profId];
        let simBtn = card.querySelector('.sim-trigger-badge-btn');
        if (!simBtn) {
          simBtn = document.createElement('button');
          simBtn.className = `sim-trigger-badge-btn ${isDone ? 'solved' : ''}`;
          simBtn.setAttribute('data-sim-prof', profId);
          simBtn.title = 'Запустить интерактивный тест-драйв';
          simBtn.innerHTML = isDone ? `${getIconSvg('check', 14)} Решено (+150 XP)` : `${getIconSvg('lightning', 14)} Тест-драйв (+150 XP)`;

          simBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openSimulator(profId);
          });

          const simSlot = card.querySelector('.prof-card-sim-slot') || card.querySelector(`[data-sim-slot="${profId}"]`);
          if (simSlot) {
            simSlot.innerHTML = '';
            simSlot.appendChild(simBtn);
          } else {
            const footerRight = detailsBtn.parentNode;
            if (footerRight) {
              footerRight.prepend(simBtn);
            }
          }
        } else {
          if (isDone) {
            simBtn.classList.add('solved');
            simBtn.innerHTML = `${getIconSvg('check', 14)} Решено (+150 XP)`;
          }
        }
      }
    });
  }

  function decorateResultScreen() {
    const resultCardMain = document.querySelector('.result-card-main');
    if (!resultCardMain) return;

    // 1. Добавляем кнопку Cyber-ID
    const actionsWrap = resultCardMain.querySelector('div[style*="justify-content:center"]');
    if (actionsWrap && !document.getElementById('openCyberIdBtn')) {
      const cyberBtn = document.createElement('button');
      cyberBtn.className = 'btn btn-primary cyber-id-trigger-btn';
      cyberBtn.id = 'openCyberIdBtn';
      cyberBtn.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="16" rx="3"></rect>
          <circle cx="9" cy="10" r="2"></circle>
          <line x1="15" y1="8" x2="17" y2="8"></line>
          <line x1="15" y1="12" x2="17" y2="12"></line>
          <line x1="7" y1="16" x2="17" y2="16"></line>
        </svg>
        <span>Сгенерировать личный Cyber-ID</span>
      `;

      cyberBtn.addEventListener('click', () => {
        const lastMatch = localStorage.getItem('digital_code_last_match') || 'frontend';
        openCyberIdModal(lastMatch);
      });

      actionsWrap.prepend(cyberBtn);
    }

    // 2. Добавляем баннер симулятора для подходящих профессий
    const lastMatch = localStorage.getItem('digital_code_last_match') || 'frontend';
    const simRoles = {
      frontend: 'CSS Rescue: выровняй вёрстку Flexbox-кнопки',
      backend: 'SQL Architect: собери рабочий SQL-запрос для API',
      mobile: 'Sensor Lab: настрой ориентацию и добейся 60 FPS',
      gamedev: 'Physics Jump: настрой физику прыжка персонажа',
      uiux: 'WCAG Contrast: доведи контрастность до стандарта AAA',
      qa: 'Bug Hunter: найди 3 скрытых дефекта в форме',
      devops: 'Pipeline Rescue: устрани CrashLoopBackOff сбой в кластере',
      security: 'Firewall Patrol: нейтрализуй SQL-инъекцию за 15 секунд'
    };

    let existingBanner = document.getElementById('simResultBanner');
    if (simRoles[lastMatch]) {
      if (!existingBanner) {
        existingBanner = document.createElement('div');
        existingBanner.id = 'simResultBanner';
        existingBanner.className = 'sim-result-banner';

        const headerEl = resultCardMain.querySelector('.result-profession-header');
        if (headerEl) {
          headerEl.insertAdjacentElement('afterend', existingBanner);
        }
      }

      const isDone = !!xpEngine.simCompleted[lastMatch];
      existingBanner.innerHTML = `
        <div class="sim-result-banner-info">
          <h4>${getIconSvg('gamepad', 20)} Интерактивный тест-драйв направления</h4>
          <p>${simRoles[lastMatch]}</p>
        </div>
        <button class="btn btn-primary btn-small sim-trigger-badge-btn ${isDone ? 'solved' : ''}" id="simBannerLaunchBtn">
          ${isDone ? `${getIconSvg('check', 16)} Пройдено (+150 XP)` : `${getIconSvg('rocket', 16)} Запустить тест-драйв (+150 XP)`}
        </button>
      `;

      existingBanner.querySelector('#simBannerLaunchBtn').addEventListener('click', () => {
        openSimulator(lastMatch);
      });
    } else if (existingBanner) {
      existingBanner.remove();
    }
  }

  /* ==========================================================================
     ПУБЛИЧНЫЙ API
     ========================================================================== */
  window.DigitalCodeGamification = {
    addXP: (amount, reason, actionKey) => xpEngine.addXP(amount, reason, actionKey),
    showToast,
    openSimulator,
    openCyberIdModal,
    openAchievementsModal,
    audioFX,

    onQuizCompleted: () => {
      if (!xpEngine.isActionClaimed('quiz_completed')) {
        xpEngine.addXP(200, 'Профориентационный опрос завершён! (+200 XP)', 'quiz_completed');
      }
      decorateResultScreen();
    },

    onBookmarkToggled: (profId, isAdded) => {
      if (isAdded && profId) {
        audioFX.playClick();
        const actionKey = 'bookmark_' + profId;
        const bookmarkActions = xpEngine.claimedActions.filter(k => k.startsWith('bookmark_'));
        if (bookmarkActions.length < 4 && !xpEngine.isActionClaimed(actionKey)) {
          xpEngine.addXP(25, 'Профессия сохранена в избранное (+25 XP)', actionKey);
          if (!xpEngine.achievements.includes('bookmark_added')) {
            xpEngine.achievements.push('bookmark_added');
            xpEngine.saveAchievements();
          }
        }
      }
    },

    onCompareUsed: () => {
      if (!xpEngine.isActionClaimed('compare_used')) {
        xpEngine.addXP(50, 'Сравнение направлений проведено (+50 XP)', 'compare_used');
      }
    },

    decorateCatalogCards,
    decorateResultScreen
  };

  /* ==========================================================================
     ИНИЦИАЛИЗАЦИЯ DOM
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    injectHUD();
    initCoffeeEasterEgg();
    initKonamiCode();

    const catalogGrid = document.getElementById('catalogGrid');
    if (catalogGrid) {
      const observer = new MutationObserver(() => {
        decorateCatalogCards();
      });
      observer.observe(catalogGrid, { childList: true });
      decorateCatalogCards();
    }

    document.addEventListener('click', (e) => {
      if (e.target.closest('.catalog-details-btn') || e.target.closest('[data-open-prof]') || e.target.closest('#heroLastMatchLink')) {
        setTimeout(decorateResultScreen, 50);
      }
    });

    decorateResultScreen();
  });

})();
