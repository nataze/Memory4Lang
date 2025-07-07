#  [Memory4Lang](https://main.d21ai12uuembj2.amplifyapp.com/) 🧠

**Memory4Lang** is a fun, interactive drag-and-drop memory game for learning French translations. It's designed to help users practice their vocabulary by matching English and French words, all within a playful interface inspired by the classic "Memory" game.

You can access a deployed version of the game [here](https://main.d21ai12uuembj2.amplifyapp.com/)


## 🎮 How the Game Works 

- You are presented with two columns:
    - A **bank** of draggable words
    - A **target column** of fixed rows, each representing a word in the target language
- Your task is to **drag each word from the bank** and drop it on the row representing its correct translation.
- You can move words back to the bank and rearrange them freely
- Once you're done, click **GRADE** to evaluate your performance


## ✨ Scoring System
- **80% and above**: Exceptional 🎉 Confetti and sound effects celebrate your mastery.
- **50% to 79%**: Solid pass ✅ — a job well done.
- **Below 50%**: Encouragement to try again ☹️.

The game is fully **mobile-friendly**, supports **touch-based drag-and-drop**, and adjusts its layout for smaller screens.

## ⚙️ Game Settings
Accessible via the top-right **menu button (☰),** the Settings Modal allows you to:
- **Reverse the direction**: Switch from English -> French or French -> English
- **Mute sounds**: Toggle sound effects
- **Personalize**: Enter your name for custome score message when graded

Settings are saved to `sessionStorage` and persist during your session.


## ⚡ Running the App

### Prerequisites

Ensure you [Docker](https://www.docker.com/) installed >= 4.37.2

### Build image

```bash
npm run docker:build          # build app image
```

### Run app (cross-platform: Windows, macOS, Linux)

```bash
npm run docker:run          # run app on localhost
```

Visit http://localhost:3000 in your browser.

### Run test

```bash
npm run docker:build:test     # build test image
npm run docker:test           # run unit test
```


## 🔍 Features Implemented

### ✅ Core Features:
- Drag-and-drop game matching English and French words
- Two-column layout: draggable bank and fixed droppable rows
- Allow multiple words per row
- Styled using CSS Modules for a clean, custom look
- Sticky grade button
- Responsive design and touch support

## ➕ Extra Features Added
- ⚙ Settings Modal (reverse mode, mute sound effects, name input)
- Personalized score feedback
- Confetti celebration for high scores
- Sound effects: drag, drop, pass/fail
- Fully mobile-optimized (touch dragging, responsive layout)
- Persistent session settings via sessionStorage