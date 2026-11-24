// public/js/app.js - Main Application Logic (Supports Fullstack & Static/GitHub Pages)
import { sfx } from './audio-synth.js';
import { confetti } from './confetti.js';

const DEFAULT_CONFIG = {
  passcode: "120800",
  recipient_name: "Princess",
  header_subtitle: "to my favourite person ❤️",
  pov_title: "POV : TOMORROW IS HER BIRTHDAY ♡",
  intro_messages: [
    "Someone special has arrived...",
    "Loading memories...",
    "Collecting smiles...",
    "Preparing surprises..."
  ],
  balloons: [
    { id: 1, icon: "🧸", title: "First Little Memory", note: "First little memory together. 🧸", photo: "./images/memory1.jpg", caption: "Where it all began, forever tucked in my heart." },
    { id: 2, icon: "🎀", title: "Soft Memory", note: "A soft memory wrapped in love. 🧸", photo: "./images/memory2.jpg", caption: "Your laughter is my favorite sound in this whole world." },
    { id: 3, icon: "💞", title: "Cozy Moment", note: "Cute, cozy, and forever mine. 🧸", photo: "./images/memory3.jpg", caption: "Warm tea, silly inside jokes, and never-ending talks." },
    { id: 4, icon: "✨", title: "Favorite Memory", note: "My favorite person, my favorite memory. 🧸", photo: "./images/memory4.jpg", caption: "Every ordinary second turns golden with you." },
    { id: 5, icon: "🌷", title: "Pure Bloom", note: "Soft as petals, steady as stars. 🌷", photo: "./images/memory5.jpg", caption: "Here is to you blooming brighter every single day." }
  ],
  gallery: [
    { id: 1, title: "Every memory with you is a treasure", photo: "./images/gallery1.jpg", rotation: -4, note: "Sending all my love ❤️" },
    { id: 2, title: "A world more beautiful because you're in it", photo: "./images/gallery2.jpg", rotation: 3, note: "Forever my sunshine ✨" },
    { id: 3, title: "Happy Birthday to my favourite person", photo: "./images/gallery3.jpg", rotation: -2, note: "Always and forever 💕" },
    { id: 4, title: "Chasing sunsets with you", photo: "./images/gallery4.jpg", rotation: 4, note: "Every journey is sweeter with you 🌅" },
    { id: 5, title: "The prettiest smile I know", photo: "./images/gallery5.jpg", rotation: -3, note: "Never lose that radiant light 🌸" }
  ],
  letters: [
    {
      id: 1,
      title: "A letter from the heart",
      salutation: "My dearest,",
      body: "On this special day, I want you to know that every moment I've spent with you has been the greatest gift of my life. You laugh like sunshine sounds, and you make the whole world feel kinder just by being in it. Happy Birthday, my favourite person. ❤️"
    },
    {
      id: 2,
      title: "Underneath the same sky",
      salutation: "Dearest,",
      body: "If I could collect every star in the night sky to spell out how much you mean to me, the universe still wouldn't be big enough. Thank you for your warmth, your gentle patience, and the joy you sprinkle wherever you walk. May this year shower you with all the magic you give to everyone else. Happy Birthday! 💫"
    }
  ],
  playlist: [
    { id: 1, title: "Nee Choopule", artist: "GV Prakash Kumar", src: "./media/nee_choopule.mp3", cover: "./images/cover1.jpg" },
    { id: 2, title: "Love Me Like You Do", artist: "Ellie Goulding", src: "./media/love_me_like_you_do.mp3", cover: "./images/cover2.jpg" },
    { id: 3, title: "Tere Vaaste", artist: "Sachin-Jigar & Varun Jain", src: "./media/tere_vaaste.mp3", cover: "./images/cover3.jpg" },
    { id: 4, title: "No Lie", artist: "Sean Paul ft. Dua Lipa", src: "./media/no_lie.mp3", cover: "./images/cover4.jpg" }
  ],
  timeline: [
    { year: "2024 ❤️", title: "First Meeting", desc: "The universe decided two hearts should find each other, and somehow, they did. The very first moment felt like a page turning in a story that was always meant to be written." },
    { year: "2025 📸", title: "Best Memories", desc: "A year of laughter, late nights, small adventures, and moments so beautiful they deserve their own constellation. Every single one is treasured." },
    { year: "2026 ✨", title: "Today", desc: "Happy Birthday, my favourite person. Here we are, another chapter written together. May every day ahead feel as magical as you make me feel." }
  ],
  constellation_memories: [
    { id: 1, x: 20, y: 35, title: "Endless Laughter ⭐", text: "Those moments when we laughed until our cheeks hurt and couldn't even breathe." },
    { id: 2, x: 42, y: 18, title: "Late Night Talks 🌙", text: "Conversations when the world was silent, sharing secrets only the stars know." },
    { id: 3, x: 78, y: 32, title: "Gentle Comfort ☕", text: "The peace that comes effortlessly just sitting next to you." },
    { id: 4, x: 34, y: 65, title: "Tiny Adventures 🚗", text: "Getting lost on purpose, windows down, singing along off-key." },
    { id: 5, x: 62, y: 80, title: "The Cutest Smile 🌸", text: "The way your eyes crinkle whenever you're truly happy." },
    { id: 6, x: 85, y: 60, title: "Always & Forever 💫", text: "My favorite place in this entire world is right beside you." }
  ],
  mystery_gifts: [
    { id: 1, type: "gift", title: "A Teddy With Warm Wishes", msg: "A teddy carrying all my warm wishes for you 🥺", note: "Opened With Love ❤️", icon: "🧸" },
    { id: 2, type: "trick", title: "Oops!", msg: "Common babe 😭 wrong one", note: "Try another jar!", icon: "🎀" },
    { id: 3, type: "gift", title: "Infinite Sweetness", msg: "A bouquet of strawberries and pure love 🍓", note: "Opened With Love ❤️", icon: "💝" },
    { id: 4, type: "trick", title: "Almost!", msg: "Soooo close sweetie 💕", note: "Keep looking!", icon: "📦" },
    { id: 5, type: "gift", title: "Forever Yours", msg: "A golden ticket for unlimited hugs whenever you ask 🎟️", note: "Opened With Love ❤️", icon: "🎁" }
  ],
  future_plans: [
    { id: 1, title: "Dream Trip", desc: "A beautiful trip where we collect memories, sunsets, and tiny adventures hand in hand." },
    { id: 2, title: "Cozy Home", desc: "A little sanctuary filled with warmth, baking together, laughing until late, and soft blankets." },
    { id: 3, title: "Growing Old Together", desc: "Walking hand in hand through every season of life, celebrating all birthdays ahead." }
  ]
};

let appConfig = { ...DEFAULT_CONFIG };
let currentTrackIndex = 0;
let isAudioPlaying = false;
let audioEl = null;

// Game states
let mysteryGiftsFound = 0;
let heartsCaught = 0;
let heartGameActive = false;
let candlesLit = 5;

document.addEventListener('DOMContentLoaded', async () => {
  audioEl = document.getElementById('bg-audio');
  await loadConfig();
  initMusicController();
  initLockScreen();
  initCinematicStars();
  initBalloons();
  initGallery();
  initLetters();
  initTimeline();
  initConstellation();
  initMysteryGifts();
  initHeartGame();
  initCakeCandles();
  initNameUnlock();
  initFuturePlans();
  initGuestbook();
  initModal();
});

// 1. CONFIG LOADER (Supports API + LocalStorage + Defaults)
async function loadConfig() {
  // Check LocalStorage override first
  try {
    const local = localStorage.getItem('bday_config_override');
    if (local) {
      const parsed = JSON.parse(local);
      appConfig = { ...appConfig, ...parsed };
    }
  } catch (e) {}

  // Then try to fetch from server API
  try {
    const res = await fetch('/api/config');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.config) {
        appConfig = { ...appConfig, ...data.config };
      }
    }
  } catch (err) {
    // API not reachable (e.g. running on GitHub Pages / Vercel Static) - fallback smoothly!
    console.log('Running in static mode using client configuration');
  }

  applyConfigToUI(appConfig);
}

function applyConfigToUI(cfg) {
  if (cfg.pov_title) {
    document.querySelectorAll('.pov-title-text').forEach(el => el.textContent = cfg.pov_title);
  }
  if (cfg.header_subtitle) {
    const sub = document.getElementById('lock-subtitle');
    if (sub) sub.textContent = cfg.header_subtitle;
  }
  if (cfg.recipient_name) {
    const nameEl = document.getElementById('intro-recipient-name');
    if (nameEl) nameEl.textContent = cfg.recipient_name.toUpperCase();
    const promptEl = document.getElementById('name-unlock-prompt');
    if (promptEl) promptEl.textContent = `${cfg.recipient_name} enter your name to unlock the final page`;
  }
}

// 2. AUDIO & VINYL PLAYER
function initMusicController() {
  const musicPill = document.getElementById('music-pill');
  const vinylDisc = document.getElementById('vinyl-disc');
  const btnPlayPause = document.getElementById('btn-play-pause');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const trackTitle = document.getElementById('player-track-title');
  const trackArtist = document.getElementById('player-track-artist');

  const playlist = appConfig?.playlist || DEFAULT_CONFIG.playlist;

  function loadTrack(index) {
    currentTrackIndex = (index + playlist.length) % playlist.length;
    const track = playlist[currentTrackIndex];
    if (audioEl) audioEl.src = track.src;
    if (trackTitle) trackTitle.textContent = track.title;
    if (trackArtist) trackArtist.textContent = track.artist;

    document.querySelectorAll('.playlist-item').forEach((item, idx) => {
      item.classList.toggle('active', idx === currentTrackIndex);
    });
  }

  function playAudio() {
    sfx.ensureContext();
    if (!audioEl) return;
    audioEl.play().then(() => {
      isAudioPlaying = true;
      if (musicPill) musicPill.classList.remove('paused');
      if (vinylDisc) vinylDisc.classList.remove('paused');
      if (btnPlayPause) btnPlayPause.innerHTML = '⏸';
    }).catch(e => {
      console.warn('Autoplay prevented by browser policy (user interaction required):', e);
    });
  }

  function pauseAudio() {
    if (audioEl) audioEl.pause();
    isAudioPlaying = false;
    if (musicPill) musicPill.classList.add('paused');
    if (vinylDisc) vinylDisc.classList.add('paused');
    if (btnPlayPause) btnPlayPause.innerHTML = '▶';
  }

  function toggleAudio() {
    if (isAudioPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  if (musicPill) musicPill.addEventListener('click', toggleAudio);
  if (btnPlayPause) btnPlayPause.addEventListener('click', toggleAudio);

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      loadTrack(currentTrackIndex - 1);
      playAudio();
      sfx.playCardFlip();
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      loadTrack(currentTrackIndex + 1);
      playAudio();
      sfx.playCardFlip();
    });
  }

  const playlistContainer = document.getElementById('playlist-container');
  if (playlistContainer) {
    playlistContainer.innerHTML = '';
    playlist.forEach((song, idx) => {
      const item = document.createElement('div');
      item.className = `playlist-item ${idx === 0 ? 'active' : ''}`;
      item.innerHTML = `
        <span>${idx + 1}. ${song.title} — ${song.artist}</span>
        <span>🎵</span>
      `;
      item.addEventListener('click', () => {
        loadTrack(idx);
        playAudio();
        sfx.playCardFlip();
      });
      playlistContainer.appendChild(item);
    });
  }

  loadTrack(0);
  window.startBackgroundMusic = playAudio;
}

// 3. LOCK SCREEN
function initLockScreen() {
  const codeBoxes = document.querySelectorAll('.code-box');
  const lockCard = document.getElementById('lock-card');
  const lockIcon = document.getElementById('lock-icon-svg');
  const lockScreen = document.getElementById('lock-screen-section');
  const nightIntro = document.getElementById('cinematic-night-section');
  const hintBtn = document.getElementById('lock-hint-btn');

  if (hintBtn) {
    hintBtn.addEventListener('click', () => {
      alert(`Psst... The secret code is ${appConfig?.passcode || '120800'} ❤️`);
    });
  }

  codeBoxes.forEach((box, index) => {
    box.addEventListener('input', (e) => {
      const val = e.target.value.replace(/[^0-9]/g, '');
      box.value = val;
      if (val && index < codeBoxes.length - 1) {
        codeBoxes[index + 1].focus();
      }
      checkCode();
    });

    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && index > 0) {
        codeBoxes[index - 1].focus();
      }
    });

    box.addEventListener('paste', (e) => {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text').trim();
      if (/^\d+$/.test(paste)) {
        paste.split('').slice(0, codeBoxes.length).forEach((char, i) => {
          codeBoxes[i].value = char;
        });
        checkCode();
      }
    });
  });

  async function checkCode() {
    const code = Array.from(codeBoxes).map(b => b.value).join('');
    if (code.length === codeBoxes.length) {
      let isMatch = false;

      // Try API first
      try {
        const res = await fetch('/api/verify-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });
        if (res.ok) {
          const data = await res.json();
          isMatch = data.success;
        } else {
          throw new Error('Fallback to local');
        }
      } catch (err) {
        // Fallback for static GitHub Pages / Netlify / Vercel
        const expected = String(appConfig?.passcode || '120800').trim();
        isMatch = (code === expected);
      }

      if (isMatch) {
        sfx.playSparkle();
        if (lockIcon) {
          lockIcon.innerHTML = `<path d="M19 11H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm-7 6c-.83 0-1.5-.67-1.5-1.5S11.17 14 12 14s1.5.67 1.5 1.5S12.83 17 12 17zm5-6V9c0-2.76-2.24-5-5-5-2.56 0-4.65 1.93-4.95 4.45" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`;
        }
        confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 60);

        if (window.startBackgroundMusic) {
          window.startBackgroundMusic();
        }

        setTimeout(() => {
          lockScreen.style.display = 'none';
          nightIntro.style.display = 'flex';
          startCinematicSequence();
        }, 700);
      } else {
        sfx.playError();
        lockCard.classList.add('shake');
        setTimeout(() => {
          lockCard.classList.remove('shake');
          codeBoxes.forEach(b => b.value = '');
          codeBoxes[0].focus();
        }, 600);
      }
    }
  }
}

// 4. CINEMATIC STARS & INTRO
function initCinematicStars() {
  const canvas = document.getElementById('starry-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    stars = [];
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.6,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005
      });
    }
  }

  resize();
  window.addEventListener('resize', resize);

  function renderStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const star of stars) {
      star.alpha += star.speed;
      const a = (Math.sin(star.alpha) + 1) / 2;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 230, 200, ${a * 0.9})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#ffe6c8';
      ctx.fill();
    }
    requestAnimationFrame(renderStars);
  }
  renderStars();
}

function startCinematicSequence() {
  const lines = document.querySelectorAll('.intro-line');
  const headlineWrap = document.getElementById('intro-headline-wrap');
  const enterBtn = document.getElementById('btn-enter-wonderland');
  const mainExp = document.getElementById('main-experience');
  const nightIntro = document.getElementById('cinematic-night-section');

  lines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add('visible');
      sfx.playSparkle();
    }, 900 + index * 1200);
  });

  const headlineTime = 900 + lines.length * 1200 + 400;
  setTimeout(() => {
    if (headlineWrap) headlineWrap.classList.add('visible');
    sfx.playCheer();
    confetti.burst(window.innerWidth / 2, window.innerHeight * 0.45, 80);
  }, headlineTime);

  setTimeout(() => {
    if (enterBtn) enterBtn.classList.add('visible');
  }, headlineTime + 1100);

  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      sfx.playSparkle();
      nightIntro.style.display = 'none';
      mainExp.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// 5. BALLOONS
function initBalloons() {
  const container = document.getElementById('balloons-container');
  if (!container) return;

  const balloons = appConfig?.balloons || DEFAULT_CONFIG.balloons;

  container.innerHTML = '';
  balloons.forEach((b) => {
    const item = document.createElement('div');
    item.className = 'balloon-item';
    item.innerHTML = `
      <div class="balloon-body">
        <span class="balloon-icon">${b.icon}</span>
      </div>
      <div class="balloon-string"></div>
    `;

    item.addEventListener('click', () => {
      sfx.playPop();
      const rect = item.getBoundingClientRect();
      confetti.burst(rect.left + rect.width / 2, rect.top, 25);
      showModal({
        title: b.title,
        photo: b.photo,
        text: `"${b.note}"\n\n${b.caption}`
      });
    });

    container.appendChild(item);
  });
}

// 6. GALLERY CAROUSEL
function initGallery() {
  const track = document.getElementById('gallery-track');
  if (!track) return;

  const photos = appConfig?.gallery || DEFAULT_CONFIG.gallery;

  track.innerHTML = '';
  photos.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.style.transform = `rotate(${p.rotation}deg)`;
    card.innerHTML = `
      <div class="polaroid-tape"></div>
      <div class="polaroid-photo-frame">
        <img class="polaroid-img" src="${p.photo}" alt="${p.title}" loading="lazy">
      </div>
      <p class="polaroid-caption">${p.title}</p>
    `;

    card.addEventListener('click', () => {
      sfx.playCardFlip();
      showModal({
        title: p.title,
        photo: p.photo,
        text: p.note
      });
    });

    track.appendChild(card);
  });
}

// 7. LETTERS
function initLetters() {
  const letters = appConfig?.letters || DEFAULT_CONFIG.letters;

  let currentLetterIdx = 0;
  const salutationEl = document.getElementById('letter-salutation');
  const bodyEl = document.getElementById('letter-body');
  const closeBtn = document.getElementById('letter-close-btn');

  function renderLetter(idx) {
    const l = letters[idx % letters.length];
    if (salutationEl) salutationEl.textContent = l.salutation;
    if (bodyEl) bodyEl.textContent = l.body;
  }

  renderLetter(0);

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      sfx.playCardFlip();
      currentLetterIdx++;
      renderLetter(currentLetterIdx);
    });
  }
}

// 8. TIMELINE
function initTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  const milestones = appConfig?.timeline || DEFAULT_CONFIG.timeline;

  container.innerHTML = '<div class="timeline-line"></div>';
  milestones.forEach(m => {
    const node = document.createElement('div');
    node.className = 'timeline-node';
    node.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content-card">
        <div class="timeline-year">${m.year}</div>
        <div class="timeline-title">${m.title}</div>
        <div class="timeline-desc">${m.desc}</div>
      </div>
    `;
    container.appendChild(node);
  });
}

// 9. CONSTELLATION
function initConstellation() {
  const svg = document.getElementById('constellation-svg');
  if (!svg) return;

  const memories = appConfig?.constellation_memories || DEFAULT_CONFIG.constellation_memories;

  svg.innerHTML = '';

  for (let i = 0; i < memories.length - 1; i++) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', `${memories[i].x}%`);
    line.setAttribute('y1', `${memories[i].y}%`);
    line.setAttribute('x2', `${memories[i + 1].x}%`);
    line.setAttribute('y2', `${memories[i + 1].y}%`);
    line.setAttribute('stroke', 'rgba(255, 230, 200, 0.35)');
    line.setAttribute('stroke-width', '1.5');
    line.setAttribute('stroke-dasharray', '4,4');
    svg.appendChild(line);
  }

  memories.forEach(m => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'star-point');

    const circleGlow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circleGlow.setAttribute('cx', `${m.x}%`);
    circleGlow.setAttribute('cy', `${m.y}%`);
    circleGlow.setAttribute('r', '14');
    circleGlow.setAttribute('fill', 'rgba(255, 215, 0, 0.2)');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', `${m.x}%`);
    circle.setAttribute('cy', `${m.y}%`);
    circle.setAttribute('r', '6');
    circle.setAttribute('fill', '#ffffff');

    g.appendChild(circleGlow);
    g.appendChild(circle);

    g.addEventListener('click', () => {
      sfx.playSparkle();
      circle.setAttribute('fill', '#ffd700');
      showModal({
        title: m.title,
        text: m.text
      });
    });

    svg.appendChild(g);
  });
}

// 10. MYSTERY GIFTS
function initMysteryGifts() {
  const container = document.getElementById('gifts-container');
  const counterEl = document.getElementById('gifts-counter');
  if (!container) return;

  const gifts = appConfig?.mystery_gifts || DEFAULT_CONFIG.mystery_gifts;

  container.innerHTML = '';
  gifts.forEach(g => {
    const jar = document.createElement('div');
    jar.className = 'gift-jar';
    jar.innerHTML = `
      <div class="gift-jar-lid"></div>
      <div class="gift-jar-icon">${g.icon}</div>
    `;

    jar.addEventListener('click', () => {
      if (jar.classList.contains('opened')) return;
      jar.classList.add('opened');

      if (g.type === 'gift') {
        mysteryGiftsFound++;
        sfx.playSparkle();
        confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 40);
        if (counterEl) counterEl.textContent = `${mysteryGiftsFound}/3 gifts found`;

        showModal({
          title: g.title,
          text: `${g.msg}\n\n${g.note}`
        });

        if (mysteryGiftsFound >= 3) {
          setTimeout(() => {
            sfx.playCheer();
            confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 100);
            showModal({
              title: "🎉 All Mystery Gifts Found ✨",
              text: "The real gift was always YOU ❤️\n\nThank you for existing. Thank you for every smile, every laugh, every beautiful memory. You truly make this world brighter ✨"
            });
          }, 600);
        }
      } else {
        sfx.playPop();
        showModal({
          title: g.title,
          text: `${g.msg}\n\n${g.note}`
        });
      }
    });

    container.appendChild(jar);
  });
}

// 11. CATCH HEARTS GAME
function initHeartGame() {
  const startBtn = document.getElementById('btn-start-game');
  const arena = document.getElementById('heart-arena');
  const counter = document.getElementById('heart-counter');
  if (!startBtn || !arena) return;

  const emojis = ['❤️', '💖', '🍓', '🧸', '🌷', '✨', '🎀', '🌸', '💝'];

  startBtn.addEventListener('click', () => {
    if (heartGameActive) return;
    heartGameActive = true;
    heartsCaught = 0;
    counter.textContent = `0/20 hearts`;
    startBtn.style.display = 'none';

    const interval = setInterval(() => {
      if (heartsCaught >= 20 || !heartGameActive) {
        clearInterval(interval);
        return;
      }

      const item = document.createElement('div');
      item.className = 'falling-target';
      item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      item.style.left = `${Math.random() * (arena.offsetWidth - 40)}px`;
      arena.appendChild(item);

      item.addEventListener('click', () => {
        sfx.playPop();
        heartsCaught++;
        counter.textContent = `${heartsCaught}/20 hearts`;
        item.remove();

        if (heartsCaught >= 20) {
          heartGameActive = false;
          sfx.playCheer();
          confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 70);
          fetch('/api/stats/game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ game: 'catch_hearts', score: 20 })
          }).catch(() => {});

          showModal({
            title: "✨ Secret Memory Unlocked ✨",
            text: "You make every ordinary moment feel magical.\n\nThank you for being you. ❤️"
          });
          startBtn.textContent = 'Play Again ❤️';
          startBtn.style.display = 'inline-block';
        }
      });

      setTimeout(() => {
        if (item.parentElement) item.remove();
      }, 3500);
    }, 450);
  });
}

// 12. CAKE & CANDLES
function initCakeCandles() {
  const candles = document.querySelectorAll('.candle-unit');
  const wishBanner = document.getElementById('cake-wish-banner');
  const subtitle = document.getElementById('cake-subtitle');

  candles.forEach(candle => {
    candle.addEventListener('click', () => {
      if (candle.classList.contains('out')) return;
      candle.classList.add('out');
      sfx.playBlow();
      candlesLit--;

      if (subtitle) {
        subtitle.textContent = candlesLit > 0 ? `${candlesLit} candle${candlesLit > 1 ? 's' : ''} left to blow...` : 'All candles blown out!';
      }

      if (candlesLit === 0) {
        setTimeout(() => {
          sfx.playCheer();
          confetti.burst(window.innerWidth / 2, window.innerHeight * 0.4, 120);
          if (wishBanner) wishBanner.style.display = 'block';
        }, 500);
      }
    });
  });
}

// 13. NAME UNLOCK (FINAL SURPRISE)
function initNameUnlock() {
  const input = document.getElementById('recipient-name-input');
  const btn = document.getElementById('btn-unlock-surprise');
  const futurePlans = document.getElementById('future-plans-section');

  async function verifyName() {
    const name = (input.value || '').trim();
    if (!name) return;

    let isMatch = false;
    try {
      const res = await fetch('/api/verify-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        const data = await res.json();
        isMatch = data.success;
      } else {
        throw new Error('Local fallback');
      }
    } catch (err) {
      const targetName = (appConfig?.recipient_name || 'princess').trim().toLowerCase();
      const inputLower = name.trim().toLowerCase();
      isMatch = (inputLower === targetName || inputLower === 'princess' || inputLower === 'babe' || inputLower.length >= 2);
    }

    if (isMatch) {
      sfx.playSparkle();
      confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 70);
      if (futurePlans) {
        futurePlans.classList.add('active');
        futurePlans.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      sfx.playError();
      alert('Almost! Try entering the nickname or name ❤️');
    }
  }

  if (btn) btn.addEventListener('click', verifyName);
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') verifyName();
    });
  }
}

// 14. FUTURE PLANS
function initFuturePlans() {
  const cards = document.querySelectorAll('.heart-card-btn');
  const plans = appConfig?.future_plans || DEFAULT_CONFIG.future_plans;

  cards.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      sfx.playSparkle();
      const plan = plans[idx % plans.length];
      showModal({
        title: plan.title,
        text: plan.desc
      });
    });
  });
}

// 15. GUESTBOOK (Fullstack API with LocalStorage Fallback)
async function initGuestbook() {
  const list = document.getElementById('wishes-list');
  const form = document.getElementById('wish-form');
  const nameInput = document.getElementById('wish-name-input');
  const tagInput = document.getElementById('wish-tag-input');
  const msgInput = document.getElementById('wish-msg-input');
  const emojiBtns = document.querySelectorAll('.emoji-choice-btn');

  let selectedEmoji = '❤️';

  const defaultLocalWishes = [
    { id: 1, name: 'Alex', message: 'Happy Birthday Princess! May your year ahead be as breathtaking and kind as you are ✨', emoji: '💖', tag: 'Bestie', likes: 5, created_at: new Date().toISOString() },
    { id: 2, name: 'Sam & Mia', message: 'Wishing you endless smiles, love, and sweet adventures! Have the most wonderful birthday! 🎂🥂', emoji: '🎉', tag: 'Friends', likes: 3, created_at: new Date().toISOString() },
    { id: 3, name: 'Your Secret Admirer', message: 'You bring a soft glow to everyone around you. Keep shining bright! ❤️', emoji: '🌹', tag: 'Secret', likes: 8, created_at: new Date().toISOString() }
  ];

  emojiBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      emojiBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedEmoji = btn.dataset.emoji;
    });
  });

  async function loadWishes() {
    let wishes = [];
    try {
      const res = await fetch('/api/wishes');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.wishes)) {
          wishes = data.wishes;
        }
      } else {
        throw new Error('API not available');
      }
    } catch (err) {
      // LocalStorage fallback for GitHub Pages
      try {
        const stored = localStorage.getItem('bday_local_wishes');
        wishes = stored ? JSON.parse(stored) : defaultLocalWishes;
      } catch (e) {
        wishes = defaultLocalWishes;
      }
    }

    renderWishesList(wishes);
  }

  function renderWishesList(wishes) {
    if (!list) return;
    list.innerHTML = '';
    wishes.forEach(w => {
      const card = document.createElement('div');
      card.className = 'wish-item-card';
      card.innerHTML = `
        <div class="wish-item-header">
          <span class="wish-item-sender">${w.emoji} ${w.name}</span>
          <span class="wish-item-tag">${w.tag}</span>
        </div>
        <p class="wish-item-msg">${w.message}</p>
        <div class="wish-item-footer">
          <span>${new Date(w.created_at || Date.now()).toLocaleDateString()}</span>
          <button class="btn-like-wish" data-id="${w.id}">
            ❤️ <span>${w.likes || 0}</span>
          </button>
        </div>
      `;

      const likeBtn = card.querySelector('.btn-like-wish');
      likeBtn.addEventListener('click', async () => {
        sfx.playSparkle();
        let updatedLikes = (w.likes || 0) + 1;

        try {
          const res = await fetch(`/api/wishes/${w.id}/like`, { method: 'POST' });
          if (res.ok) {
            const data = await res.json();
            if (data.success) updatedLikes = data.likes;
          }
        } catch (e) {
          // Update in localStorage
          try {
            const stored = JSON.parse(localStorage.getItem('bday_local_wishes') || '[]');
            const found = stored.find(item => item.id == w.id);
            if (found) {
              found.likes = (found.likes || 0) + 1;
              updatedLikes = found.likes;
              localStorage.setItem('bday_local_wishes', JSON.stringify(stored));
            }
          } catch (err) {}
        }

        likeBtn.querySelector('span').textContent = updatedLikes;
      });

      list.appendChild(card);
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = (nameInput.value || 'Friend').trim();
      const message = (msgInput.value || '').trim();
      const tag = (tagInput.value || 'Friend').trim();

      if (!message) return;

      const newWishObj = {
        name,
        message,
        emoji: selectedEmoji,
        tag,
        likes: 0,
        created_at: new Date().toISOString()
      };

      try {
        const res = await fetch('/api/wishes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newWishObj)
        });
        if (!res.ok) throw new Error('API not available');
      } catch (err) {
        // Fallback save in LocalStorage
        try {
          const stored = JSON.parse(localStorage.getItem('bday_local_wishes') || JSON.stringify(defaultLocalWishes));
          newWishObj.id = Date.now();
          stored.unshift(newWishObj);
          localStorage.setItem('bday_local_wishes', JSON.stringify(stored));
        } catch (e) {}
      }

      sfx.playSparkle();
      confetti.burst(window.innerWidth / 2, window.innerHeight * 0.7, 40);
      msgInput.value = '';
      loadWishes();
    });
  }

  loadWishes();
}

// MODAL CONTROLLER
function initModal() {
  const modal = document.getElementById('app-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

function showModal({ title, photo, text }) {
  const modal = document.getElementById('app-modal');
  const titleEl = document.getElementById('modal-title');
  const textEl = document.getElementById('modal-text');
  const imgWrap = document.getElementById('modal-img-wrap');
  const imgEl = document.getElementById('modal-img');

  if (!modal) return;

  if (titleEl) titleEl.textContent = title || '';
  if (textEl) textEl.textContent = text || '';

  if (photo && imgWrap && imgEl) {
    imgEl.src = photo;
    imgWrap.style.display = 'block';
  } else if (imgWrap) {
    imgWrap.style.display = 'none';
  }

  modal.classList.add('active');
}
