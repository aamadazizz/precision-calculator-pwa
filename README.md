# Precision Calculator 🧮

A **production-grade Progressive Web App (PWA)** calculator with live currency conversion, offline support, keyboard-first UX, and a scalable design system.

This project was built to demonstrate **real-world frontend engineering practices** rather than tutorial-style code.

---

## 🚀 Live Features

### ✅ Core Calculator
- Accurate arithmetic operations  
- Keyboard support (numbers, operators, Enter, Backspace, Escape)  
- Safe expression evaluation (no raw `eval`)  
- Subtle micro-animations for professional UX feedback  

### 🌐 Live Currency Converter
- Real-time exchange rates using a **free public API**  
- Clean async/await implementation  
- User-friendly loading & error states  

### 📴 Offline-First Behavior
- Automatically caches last successful exchange rates  
- Falls back to cached data when offline  
- User is never blocked by network issues  

### 🎨 Theme System
- Dark / Light mode powered by CSS variables  
- One-click toggle  
- Theme preference persisted via `localStorage`  

### 📱 Progressive Web App (PWA)
- Installable on desktop & mobile  
- Works offline  
- App manifest + service worker  

---

## 🧠 Engineering Principles Used

- Separation of concerns (UI, state, logic, side effects)
- Single source of truth for application state
- Event delegation instead of scattered listeners
- Progressive enhancement (online → offline fallback)
- Design system mindset using CSS variables
- Graceful degradation instead of hard failures

This project intentionally avoids frameworks to showcase strong **vanilla JavaScript fundamentals**.

---

## 🧱 Tech Stack

- **HTML5** — semantic & accessible markup  
- **CSS3** — design tokens, animations, responsive layout  
- **JavaScript (ES6+)** — state-driven logic, async/await  
- **Web APIs**
  - localStorage (persistence & caching)
  - Service Worker (offline support)
  - Fetch API (live data)
- **PWA Standards** (Manifest, installability)

---

## 📂 Project Structure

```text
precision-calculator-pwa/
├── index.html
├── styles.css
├── app.js
├── manifest.json
├── service-worker.js
├── icon-192.png
└── icon-512.png
