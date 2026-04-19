# TypeRacer — Typing Speed Test

A clean and responsive typing speed test app that measures your WPM (Words Per Minute) and accuracy in real time.

---

## Files

```
TypingSpeedTest/
├── index.html   → Structure & layout
├── style.css    → All styles and animations
└── script.js    → Typing logic, timer, stats, results
```

---

## How to Run

1. Download or clone the project
2. Open `index.html` in any browser
3. Click the textarea and start typing!

> No installation, no server, no dependencies needed.

---

## How It Works

1. Choose a duration — 15s, 30s, 60s, or 2 minutes
2. Timer starts automatically on your first keystroke
3. Type the displayed text as fast and accurately as possible
4. Results show your WPM, accuracy, and error count when time's up

---

## Features

- ⚡ Live WPM and accuracy calculated as you type
- 🎯 Character-level highlighting — green (correct), red (wrong)
- ⏱ Countdown timer with 4 duration options
- 🔄 Random passage on every new test
- 📊 Results modal with speed grade
- 📱 Fully responsive — works on mobile too

---

## Scoring Guide

| WPM       | Grade               |
|-----------|---------------------|
| 100+      | 🏆 Typing God        |
| 70 – 99   | 🚀 Excellent         |
| 50 – 69   | ✅ Above Average     |
| 30 – 49   | 📈 Getting There     |
| Below 30  | 💪 Keep Practicing   |

---

## How to Add More Texts

Open `script.js` and add a new string to the `TEXTS` array:

```js
const TEXTS = [
  "Your custom passage goes here.",
  // ... existing texts
];
```

---

## Tech Used

- HTML5
- CSS3 (custom properties, animations, grid)
- Vanilla JavaScript (no libraries)
- Google Fonts — JetBrains Mono + Outfit

---


