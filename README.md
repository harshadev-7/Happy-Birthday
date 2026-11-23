# 🎂 Happy Birthday Princess — Fullstack Interactive Web Application

A fullstack romantic birthday web application crafted in vanilla JavaScript, Web Audio API, Canvas, and Node.js with built-in SQLite persistence (`node:sqlite`). Recreates and expands upon all 13 interactive sections from the video inspiration.

---

## ✨ Features & Sections

1. **🔐 Secret Passcode Lock Screen**
   - 6-digit PIN input with auto-advance, paste support, backspace navigation, and shake animation on wrong passcode.
   - Default Code: `120800` (customizable in `/admin`).

2. **🌌 Cinematic Starry Night Intro ("Someone special has arrived...")**
   - Canvas-rendered twinkling stars with deep celestial atmosphere.
   - Poetic lines revealing in rhythm with romantic background music.
   - Sparkling golden headline: **"HAPPY BIRTHDAY, PRINCESS ❤️"**.

3. **🎈 Memory Balloons**
   - 5 floating balloons carrying cute tokens (Teddy 🧸, Ribbon 🎀, Hearts 💞, Sparkles ✨, Tulip 🌷).
   - Click to pop balloons with sound effects and reveal polaroid memory cards with sweet stories.

4. **📸 3D Our Gallery (Interactive Drag Carousel)**
   - Polaroid-style photo frames with realistic drop-shadows, washi tape, and tilt angles.
   - Touch/drag to explore, click to zoom into memories with love dedication notes.

5. **💌 Vintage Love Letters**
   - Ruled parchment paper with ribbon bows and calligraphy lettering.
   - Switch between letters with smooth flip sounds.

6. **🎶 Vinyl Turntable Music Player**
   - Spinning grooved vinyl record with amber glow and animated bouncing equalizer bars.
   - Play/pause/skip controls, active playlist featuring romantic songs, including the authentic song from the video (*Dekha Hazaron Dafa*).
   - Floating music toggle pill accessible throughout the entire experience.

7. **⏳ Our Story (Milestone Timeline)**
   - Dotted vertical timeline tracking unforgettable relationship milestones:
     - `2023 ❤️ First Meeting`
     - `2024 📸 Best Memories`
     - `2025 ✨ Today`

8. **⭐ Our Constellation**
   - Deep sky interactive constellation.
   - Click the glowing stars to unlock intimate memories and cute confessions.

9. **🎁 Mystery Gifts Minigame**
   - 5 jars/boxes to open with bouncy lid physics.
   - Playful feedbacks (*"Common babe 😭 wrong one"*, *"Soooo close sweetie 💕"*).
   - Finding all 3 gifts unlocks the grand celebration modal: *"The real gift was always YOU ❤️"*.

10. **🍓 Catch The Love Minigame**
    - Tap falling items (hearts, strawberries, teddy bears, tulips) into the basket.
    - Catching 20 items unlocks a secret love note and records score to the backend.

11. **🎬 Our Movie (Cinema Player)**
    - Custom video cinema frame with smooth playback of the romantic film clip.

12. **🎂 Make A Wish (Birthday Cake & Interactive Candles)**
    - Two-tiered birthday cake with 5 flickering golden candles.
    - Click any candle to blow it out with a realistic smoke curl.
    - Blowing out all 5 triggers celebratory confetti bursts and warm wishes!

13. **🐱 One Last Surprise (Secret Name Password)**
    - Cute cat sticker wearing pink heart sunglasses holding a rose bouquet.
    - Prompts: *"Princess enter your name to unlock the final page"*.

14. **✈️ Our Future Plans (Dream Cards)**
    - 3 glossy heart cards that reveal future shared dreams (*Dream Trip*, *Cozy Home*, *Growing Old Together*).

15. **📝 Live Guestbook & Wishes Board (Fullstack Backend)**
    - Real-time guestbook where friends, family, and loved ones can leave heartfelt wishes.
    - Choose custom emojis (❤️, 💖, 🎂, 🥂, 🌸, 🧸, ✨) and tags (*Bestie*, *Soulmate*, *Friend*).
    - Working "Like / Heart" reaction button on every wish with live counters stored in SQLite!

16. **⚙️ Admin Customizer Portal (`/admin`)**
    - Protected with Admin PIN (`admin123`).
    - Change recipient name, lock screen passcode, header title, love letter texts, and timeline milestones.
    - View live site stats (wishes count, total likes, minigames played).

---

## 🚀 How to Run

### Requirements
- **Node.js** (v18+ recommended; Node v24 is already installed).
- Zero external package dependencies required! Uses native Node.js modules and built-in SQLite (`node:sqlite`).

### Starting the Server
From the project folder (`d:\Documents\Happy birthday\Bday2`):

```bash
npm start
```
or:
```bash
node server/server.js
```

Then open your browser to:
- **Birthday Card:** [http://localhost:3000](http://localhost:3000)
- **Admin Studio:** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🔑 Default Credentials

| Item | Default Value | Notes |
|---|---|---|
| **Lock Screen Passcode** | `120800` | Customizable in Admin |
| **Recipient Name** | `Princess` | Case-insensitive |
| **Admin PIN** | `admin123` | Used to log into `/admin` |
| **Server Port** | `3000` | Configurable via `PORT` environment variable |

---

## 📁 Project Structure

```
d:\Documents\Happy birthday\Bday2\
├── data/
│   └── birthday.db              # SQLite database (auto-created on start)
├── server/
│   ├── db.js                    # Database schema, queries & default seeds
│   └── server.js                # Fullstack HTTP server & REST API
├── public/
│   ├── index.html               # Main interactive birthday webpage
│   ├── admin.html               # Admin studio & customizer portal
│   ├── css/
│   │   └── style.css            # Styles, animations, responsive layouts
│   ├── js/
│   │   ├── app.js               # Main application orchestration & minigames
│   │   ├── audio-synth.js       # Synthesizer sound effects (pops, sparkles, blow)
│   │   ├── confetti.js          # Canvas celebration confetti engine
│   │   └── vendor/              # Vendor scripts (GSAP)
│   ├── images/                  # Photo cards, polaroids, covers, cat meme
│   └── media/
│       └── birthday_video.mp4   # Romantic video & background soundtrack
├── scripts/
│   ├── generate_images.ps1      # Aesthetic polaroids & artwork generator
│   └── test_server.js           # Automated end-to-end API test suite
├── package.json
└── README.md
```
