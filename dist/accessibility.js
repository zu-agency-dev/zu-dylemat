"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/accessibility.ts
  var fontPlus = document.querySelector('[zu-dylemat="font-plus"]');
  var fontMinus = document.querySelector('[zu-dylemat="font-minus"]');
  var minFontSize = 12;
  var maxFontSize = 24;
  var txt = document.body;
  function increaseFontSize() {
    const style = window.getComputedStyle(txt, null).getPropertyValue("font-size");
    const currentSize = parseFloat(style);
    const newSize = currentSize + 1;
    if (newSize <= maxFontSize) {
      txt.style.fontSize = `${newSize}px`;
      saveFontSize(newSize);
    }
  }
  function decreaseFontSize() {
    const style = window.getComputedStyle(txt, null).getPropertyValue("font-size");
    const currentSize = parseFloat(style);
    const newSize = currentSize - 1;
    if (newSize >= minFontSize) {
      txt.style.fontSize = `${newSize}px`;
      saveFontSize(newSize);
    }
  }
  function saveFontSize(fontSize) {
    sessionStorage.setItem("fontSize", String(fontSize));
  }
  function loadFontSize() {
    const savedFontSize = sessionStorage.getItem("fontSize");
    if (savedFontSize) {
      const fontSize = parseFloat(savedFontSize);
      txt.style.fontSize = `${fontSize}px`;
    }
  }
  window.addEventListener("DOMContentLoaded", loadFontSize);
  fontPlus.addEventListener("click", increaseFontSize);
  fontMinus.addEventListener("click", decreaseFontSize);
})();
//# sourceMappingURL=accessibility.js.map
