// server/db.js - SQLite persistence using node:sqlite
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '..', 'data', 'birthday.db');

export function initDatabase() {
  const db = new DatabaseSync(DB_PATH);

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS wishes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      emoji TEXT DEFAULT '❤️',
      tag TEXT DEFAULT 'Friend',
      likes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS game_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_name TEXT NOT NULL,
      score INTEGER NOT NULL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Default configuration seeding
  const defaultSeeds = {
    passcode: "120800",
    admin_pin: "admin123",
    recipient_name: "Princess",
    header_subtitle: "to my favourite person ❤️",
    pov_title: "POV : TOMORROW IS HER BIRTHDAY ♡",
    intro_messages: JSON.stringify([
      "Someone special has arrived...",
      "Loading memories...",
      "Collecting smiles...",
      "Preparing surprises..."
    ]),
    balloons: JSON.stringify([
      {
        id: 1,
        icon: "🧸",
        title: "First Little Memory",
        note: "First little memory together. 🧸",
        photo: "/images/memory1.jpg",
        caption: "Where it all began, forever tucked in my heart."
      },
      {
        id: 2,
        icon: "🎀",
        title: "Soft Memory",
        note: "A soft memory wrapped in love. 🧸",
        photo: "/images/memory2.jpg",
        caption: "Your laughter is my favorite sound in this whole world."
      },
      {
        id: 3,
        icon: "💞",
        title: "Cozy Moment",
        note: "Cute, cozy, and forever mine. 🧸",
        photo: "/images/memory3.jpg",
        caption: "Warm tea, silly inside jokes, and never-ending talks."
      },
      {
        id: 4,
        icon: "✨",
        title: "Favorite Memory",
        note: "My favorite person, my favorite memory. 🧸",
        photo: "/images/memory4.jpg",
        caption: "Every ordinary second turns golden with you."
      },
      {
        id: 5,
        icon: "🌷",
        title: "Pure Bloom",
        note: "Soft as petals, steady as stars. 🌷",
        photo: "/images/memory5.jpg",
        caption: "Here is to you blooming brighter every single day."
      }
    ]),
    gallery: JSON.stringify([
      {
        id: 1,
        title: "Every memory with you is a treasure",
        photo: "/images/gallery1.jpg",
        rotation: -4,
        note: "Sending all my love ❤️"
      },
      {
        id: 2,
        title: "A world more beautiful because you're in it",
        photo: "/images/gallery2.jpg",
        rotation: 3,
        note: "Forever my sunshine ✨"
      },
      {
        id: 3,
        title: "Happy Birthday to my favourite person",
        photo: "/images/gallery3.jpg",
        rotation: -2,
        note: "Always and forever 💕"
      },
      {
        id: 4,
        title: "Chasing sunsets with you",
        photo: "/images/gallery4.jpg",
        rotation: 4,
        note: "Every journey is sweeter with you 🌅"
      },
      {
        id: 5,
        title: "The prettiest smile I know",
        photo: "/images/gallery5.jpg",
        rotation: -3,
        note: "Never lose that radiant light 🌸"
      }
    ]),
    letters: JSON.stringify([
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
    ]),
    playlist: JSON.stringify([
      {
        id: 1,
        title: "Nee Choopule",
        artist: "GV Prakash Kumar",
        src: "./media/nee_choopule.mp3",
        cover: "./images/cover1.jpg"
      },
      {
        id: 2,
        title: "Love Me Like You Do",
        artist: "Ellie Goulding",
        src: "./media/love_me_like_you_do.mp3",
        cover: "./images/cover2.jpg"
      },
      {
        id: 3,
        title: "Tere Vaaste",
        artist: "Sachin-Jigar & Varun Jain",
        src: "./media/tere_vaaste.mp3",
        cover: "./images/cover3.jpg"
      },
      {
        id: 4,
        title: "No Lie",
        artist: "Sean Paul ft. Dua Lipa",
        src: "./media/no_lie.mp3",
        cover: "./images/cover4.jpg"
      }
    ]),
    timeline: JSON.stringify([
      {
        year: "2024 ❤️",
        title: "First Meeting",
        desc: "You know that moment in the BCME lab when I first looked into your eyes? I honestly lost myself right then. That is first meet for me with you."
      },
      {
        year: "2025 📸",
        title: "Best Memories",
        desc: "And when I pulled your chair toward me in the FSD lab like Nick Jonas did with Priyanka, it wasn't just a filmy move—I just really wanted to be closer to you. I really like you."
      },
      {
        year: "2026 ✨",
        title: "Today",
        desc: "Happy Birthday, my favourite person. Here we are, another chapter written together. May every day ahead feel as magical as you make me feel."
      }
    ]),
    constellation_memories: JSON.stringify([
      { id: 1, x: 20, y: 35, title: "Endless Laughter ⭐", text: "Those moments when we laughed until our cheeks hurt and couldn't even breathe." },
      { id: 2, x: 42, y: 18, title: "Late Night Talks 🌙", text: "Conversations when the world was silent, sharing secrets only the stars know." },
      { id: 3, x: 78, y: 32, title: "Gentle Comfort ☕", text: "The peace that comes effortlessly just sitting next to you." },
      { id: 4, x: 34, y: 65, title: "Tiny Adventures 🚗", text: "Getting lost on purpose, windows down, singing along off-key." },
      { id: 5, x: 62, y: 80, title: "The Cutest Smile 🌸", text: "The way your eyes crinkle whenever you're truly happy." },
      { id: 6, x: 85, y: 60, title: "Always & Forever 💫", text: "My favorite place in this entire world is right beside you." }
    ]),
    mystery_gifts: JSON.stringify([
      { id: 1, type: "gift", title: "A Teddy With Warm Wishes", msg: "A teddy carrying all my warm wishes for you 🥺", note: "Opened With Love ❤️", icon: "🧸" },
      { id: 2, type: "trick", title: "Oops!", msg: "Common babe 😭 wrong one", note: "Try another jar!", icon: "🎀" },
      { id: 3, type: "gift", title: "Infinite Sweetness", msg: "A bouquet of strawberries and pure love 🍓", note: "Opened With Love ❤️", icon: "💝" },
      { id: 4, type: "trick", title: "Almost!", msg: "Soooo close sweetie 💕", note: "Keep looking!", icon: "📦" },
      { id: 5, type: "gift", title: "Forever Yours", msg: "A golden ticket for unlimited hugs whenever you ask 🎟️", note: "Opened With Love ❤️", icon: "🎁" }
    ]),
    future_plans: JSON.stringify([
      { id: 1, title: "Dream Trip", desc: "A beautiful trip where we collect memories, sunsets, and tiny adventures hand in hand." },
      { id: 2, title: "Cozy Home", desc: "A little sanctuary filled with warmth, baking together, laughing until late, and soft blankets." },
      { id: 3, title: "Growing Old Together", desc: "Walking hand in hand through every season of life, celebrating all birthdays ahead." }
    ])
  };

  const getStmt = db.prepare('SELECT value FROM config WHERE key = ?');
  const insertStmt = db.prepare('INSERT INTO config (key, value) VALUES (?, ?)');

  for (const [key, value] of Object.entries(defaultSeeds)) {
    const existing = getStmt.get(key);
    if (!existing) {
      insertStmt.run(key, value);
    }
  }

  // Guestbook starts clean without placeholder wishes
  return db;
}
