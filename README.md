<div align="center">

  <h1>🎮 Play Horizon — Arcade Suite</h1>

  <p><b>A high-performance, buildless single-page browser gaming platform featuring Sudoku, Neon Snake, and QuizMaster.</b></p>

  <p>
    <a href="#-technical-stack--engineering-highlights"><img src="https://img.shields.io/badge/Frontend-React_18_(ESM)-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React 18"></a>
    <a href="#-technical-stack--engineering-highlights"><img src="https://img.shields.io/badge/Language-JavaScript_(ES6%2B)-f7df1e?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"></a>
    <a href="#-technical-stack--engineering-highlights"><img src="https://img.shields.io/badge/Engine-HTML5_Canvas-e34f26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 Canvas"></a>
    <a href="#-technical-stack--engineering-highlights"><img src="https://img.shields.io/badge/Styling-CSS3_Glassmorphism-1572b6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"></a>
    <a href="#-cicd--deployment"><img src="https://img.shields.io/badge/CI%2FCD-GitHub_Pages-2ea44f?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Pages"></a>
  </p>

  <br />
</div>

---

## 📌 Executive Summary

**Play Horizon** is a web-based arcade suite designed to demonstrate advanced frontend engineering practices, zero-bundler modular architecture, custom canvas physics, and dynamic state management without heavy build systems or backend server overhead. 

The application brings together three distinct interactive games—**Sudoku**, **Neon Snake**, and **QuizMaster**—within a unified cyberpunk glassmorphism UI ecosystem.

---

## ⚡ Technical Stack & Engineering Highlights

### 1. Buildless React & Native ES Module Architecture
- **Zero-Build Compilation**: Employs browser-native **Import Maps** (`<script type="importmap">`) and modern ES6+ Module imports via `esm.sh` CDN.
- **Pure Component Rendering**: Built directly with React 18 using `React.createElement` syntax without JSX transformation, eliminating the need for Babel, Webpack, or Vite bundlers during development or runtime.
- **Instant Cold Starts**: Zero bundle step allows instant load times, zero latency, and seamless execution directly inside standard web browsers.

### 2. High-Performance HTML5 Canvas Game Loop
- Custom 2D graphics loop for **Neon Snake** featuring coordinate grid math, direction vector clamping, collision detection algorithms, and frame-rate independent updates.
- Proper cleanup of `requestAnimationFrame` and interval timers to prevent memory leaks during component unmounts.

### 3. Reactive State Machine & Board Generator
- Matrix state validation engine for **Sudoku** supporting cell focus navigation, mistake tracking, real-time input verification, and difficulty preset configurations.
- Dual input mode supporting physical keyboard event listeners and custom responsive on-screen numpads for mobile usability.

### 4. Client-Side SPA Router & Persistent State
- Custom single-page navigation router (`App.js`) managing active module views with zero page refreshes.
- Unified `localStorage` persistence layer aggregating score data across mini-games into an interactive global leaderboard.

---

## 🕹️ Mini-Game Suite Breakdown

| Game Module | Core Mechanics & Architecture | Key Features |
| :--- | :--- | :--- |
| 🧩 **Sudoku Arcade** | Matrix-based board state evaluation, real-time cell validation, candidate entry matrix | Multi-level difficulty presets, mistake counter, interactive virtual numpad, physical keyboard mapping |
| 🐍 **Neon Snake** | HTML5 2D Canvas rendering engine, dynamic frame loop, spatial collision detection | WASD & Arrow Key controls, velocity clamping, progressive speed acceleration, animated score system |
| 🧠 **QuizMaster** | Asynchronous question provider, countdown timer state, dynamic score calculation | Category selection lobby, instant feedback indicators, time-sensitive score multipliers |

---

## 📂 Project Architecture & Directory Layout

```
Play_Horizon_Arcade/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml       # GitHub Actions CI/CD deployment pipeline
├── assets/                         # UI media & brand graphics
├── css/
│   └── styles.css                  # Glassmorphism design system & CSS variables
├── js/
│   ├── components/                 # Modular React ES components
│   │   ├── Home.js                 # Main dashboard & game launcher hub
│   │   ├── QuizLobby.js            # Quiz category selection interface
│   │   ├── Quiz.js                 # Interactive timed quiz module
│   │   ├── Snake.js                # HTML5 Canvas Neon Snake game engine
│   │   ├── Sudoku.js               # Matrix puzzle state & UI component
│   │   └── Leaderboard.js          # Unified score aggregator & persistence visualizer
│   ├── data/                       # Question datasets & static game data
│   │   └── questions.js            # Trivia questions database
│   ├── App.js                      # Central application state & SPA view router
│   └── main.js                     # React DOM root entry point
├── .gitignore                      # Git ignore definitions
├── .nojekyll                       # GitHub Pages static routing bypass
├── index.html                      # HTML5 document shell & Import Map definitions
├── package.json                    # Project script runner
└── README.md                       # Technical documentation
```

---

## 🛠️ Architecture & Design Decisions

### Why Buildless React Architecture?
> **Engineering Rationale**: Production build steps add tooling complexity and pipeline overhead. By leveraging native ES Modules (`type="module"`) alongside Import Maps, the application executes directly in modern browser engines while retaining React's component-driven state architecture.

### Memory Lifecycle Management
> **Event Cleanup**: Component lifecycle hooks bind event listeners (keyboard, canvas ticks, interval timers) and strictly unbind them (`removeEventListener`, `cancelAnimationFrame`, `clearInterval`) upon unmounting to ensure zero memory bloat or phantom listeners.

### Glassmorphism UI System
> **Design Language**: Custom CSS properties (`var(--primary-neon)`, `backdrop-filter: blur()`) are configured globally in `styles.css` to build an immersive, responsive cyberpunk visual aesthetic with dark neon highlights.

---

## 🚀 Quick Start & Local Execution

### Prerequisites
- Node.js (v16+) *or* any static web server extension (e.g., VS Code Live Server).

### Running locally via npm
From the project root directory:

```bash
# Start the development server
npm start
```

Open **`http://localhost:5173`** (or the port provided by your server) in your browser.

---

## 🌐 Deployment & CI/CD Pipeline

This application is automated for continuous deployment on **GitHub Pages**:

- **Workflow File**: `.github/workflows/deploy-pages.yml`
- **Buildless Deployment**: Direct deployment of raw static assets without bundler steps.
- **Routing Optimization**: Includes `.nojekyll` configuration file to bypass Jekyll static processing for full raw ES module compatibility.

---

## 📈 Scalability & Future Roadmap

- [ ] **WebSockets Multi-Player**: Real-time duel mode for QuizMaster and Sudoku speed runs.
- [ ] **Web Audio Engine**: Sound effect synthesizer utilizing the native Web Audio API.
- [ ] **Progressive Web App (PWA)**: Offline service worker caching for mobile playability.

---

