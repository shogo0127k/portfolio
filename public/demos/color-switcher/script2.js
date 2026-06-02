// ========== 要素取得 ==========
const TshirtsShape = document.querySelector("#product-shape");
const color = document.querySelector("#colorPicker");
const txt = document.querySelector("#colorText");
const rgbText = document.querySelector("#rgbText");
const nameText = document.querySelector("#nameText");
const swatch = document.querySelector("#swatchPreview");
const liveDot = document.querySelector("#liveDot");
const presets = document.querySelectorAll(".preset");

// ========== カラー名辞書 ==========
const colorNames = {
  "#dbed64": "Lemon Zest",
  "#e8a87c": "Sunkissed Sierra",
  "#2e3440": "Midnight Ink",
  "#c84b31": "Ember Red",
  "#a3b18a": "Sage Field",
};

// ========== HEX → RGB 変換 ==========
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

// ========== UI 更新関数 ==========
function updateColor(hex) {
  const upper = hex.toUpperCase();
  TshirtsShape.style.fill = hex;
  swatch.style.background = hex;
  liveDot.style.background = hex;
  liveDot.style.boxShadow = `0 0 12px ${hex}`;
  txt.textContent = upper;
  rgbText.textContent = hexToRgb(hex);
  nameText.textContent = colorNames[hex.toLowerCase()] || "Custom Hue";
  color.value = hex;

  // プリセットのアクティブ表示
  presets.forEach((p) => {
    p.classList.toggle("is-active", p.dataset.color === hex.toLowerCase());
  });
}

// ========== イベント登録 ==========
color.addEventListener("input", (e) => updateColor(e.target.value));

presets.forEach((preset) => {
  preset.addEventListener("click", () => updateColor(preset.dataset.color));
});

// ========== 初期化 ==========
updateColor("#dbed64");