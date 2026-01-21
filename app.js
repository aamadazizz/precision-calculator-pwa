(() => {
  "use strict";

  // -------------------------------
  // STATE
  // -------------------------------
  const state = {
    expression: "",
    result: null
  };

  const display = document.getElementById("display");
  const keypad = document.getElementById("keypad");

  // -------------------------------
  // PURE FUNCTIONS
  // -------------------------------
  const sanitize = expr =>
    expr.replace(/[^0-9.+\-*/()%]/g, "");

  const evaluate = expr => {
    try {
      const fn = new Function(`return (${expr})`);
      const value = fn();
      return Number.isFinite(value) ? value : "Error";
    } catch {
      return "Error";
    }
  };

  // -------------------------------
  // RENDER
  // -------------------------------
  const render = () => {
    display.textContent = state.expression || "0";
  };
const animateDisplay = () => {
  display.classList.add("pulse");
  setTimeout(() => display.classList.remove("pulse"), 150);
};

  // -------------------------------
  // EVENTS (EVENT DELEGATION)
  // -------------------------------
  keypad.addEventListener("click", e => {
    if (!e.target.matches("button")) return;

    const { value, action } = e.target.dataset;

    if (value) {
      state.expression += value;
    }

    if (action === "clear") {
      state.expression = "";
    }

    if (action === "delete") {
      state.expression = state.expression.slice(0, -1);
    }

   if (action === "equals") {
  const clean = sanitize(state.expression);
  state.expression = String(evaluate(clean));
  animateDisplay();
  render();
}

    render();
  });

  // -------------------------------
// LIVE CURRENCY CONVERSION (API)
// -------------------------------
const convertBtn = document.getElementById("convert");
// -------------------------------
// CURRENCY CACHE HELPERS
// -------------------------------
const saveRatesToCache = (base, rates) => {
  const payload = {
    base,
    rates,
    timestamp: Date.now()
  };
  localStorage.setItem("currencyRates", JSON.stringify(payload));
};

const loadRatesFromCache = () => {
  const cached = localStorage.getItem("currencyRates");
  return cached ? JSON.parse(cached) : null;
};
convertBtn.addEventListener("click", async () => {
  const amount = Number(document.getElementById("amount").value);
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const output = document.getElementById("conversionResult");

  if (!Number.isFinite(amount)) {
    output.textContent = "Enter a valid amount";
    return;
  }

  output.textContent = "Converting...";

  try {
    // 🌐 Try live API first
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/e73988c39ea5885343253502/latest/${from}`
    );
    const data = await response.json();

    if (data.result !== "success") {
      throw new Error("API failed");
    }

    const rate = data.conversion_rates[to];
    const converted = amount * rate;

    // 💾 Save for offline use
    saveRatesToCache(from, data.conversion_rates);

    output.textContent = converted.toFixed(2) + " " + to;
  } catch (error) {
    // 📦 Offline fallback
    const cached = loadRatesFromCache();

    if (!cached || cached.base !== from) {
      output.textContent = "Offline & no cached data";
      return;
    }

    const rate = cached.rates[to];
    const converted = amount * rate;

    output.textContent =
      converted.toFixed(2) + " " + to + " (offline)";
  }
});


// -------------------------------
// KEYBOARD SUPPORT (SAFE VERSION)
// -------------------------------
window.addEventListener("keydown", (e) => {
  const key = e.key;

  // Numbers & operators
  if (/[0-9.+\-*/%]/.test(key)) {
    state.expression += key;
    render();
  }

  // Enter = equals
 if (key === "Enter") {
  e.preventDefault();
  const clean = sanitize(state.expression);
  state.expression = String(evaluate(clean));
  animateDisplay();
  render();
}

  // Backspace = delete
  if (key === "Backspace") {
    state.expression = state.expression.slice(0, -1);
    render();
  }

  // Escape = clear
  if (key === "Escape") {
    state.expression = "";
    render();
  }
});

// -------------------------------
// THEME TOGGLE
// -------------------------------
const themeToggle = document.getElementById("themeToggle");

// -------------------------------
// THEME PERSISTENCE
// -------------------------------
const savedTheme = localStorage.getItem("theme");

document.documentElement.setAttribute(
  "data-theme",
  savedTheme || "dark"
);


themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});
// -------------------------------
// SERVICE WORKER REGISTRATION
// -------------------------------
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
  render();
})();
