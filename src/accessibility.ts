const fontPlus = document.querySelector('[zu-dylemat="font-plus"]') as HTMLElement;
const fontMinus = document.querySelector('[zu-dylemat="font-minus"]') as HTMLElement;

const minFontSize = 12;
const maxFontSize = 24;
const txt = document.body;

function increaseFontSize() {
  const style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
  const currentSize = parseFloat(style);
  const newSize = currentSize + 1;
  if (newSize <= maxFontSize) {
    txt.style.fontSize = `${newSize}px`;
    saveFontSize(newSize);
  }
}

function decreaseFontSize() {
  const style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
  const currentSize = parseFloat(style);
  const newSize = currentSize - 1;
  if (newSize >= minFontSize) {
    txt.style.fontSize = `${newSize}px`;
    saveFontSize(newSize);
  }
}

function saveFontSize(fontSize: number) {
  sessionStorage.setItem('fontSize', String(fontSize));
}

function loadFontSize() {
  const savedFontSize = sessionStorage.getItem('fontSize');
  if (savedFontSize) {
    const fontSize = parseFloat(savedFontSize);
    txt.style.fontSize = `${fontSize}px`;
  }
}

window.addEventListener('DOMContentLoaded', loadFontSize);

fontPlus.addEventListener('click', increaseFontSize);
fontMinus.addEventListener('click', decreaseFontSize);
