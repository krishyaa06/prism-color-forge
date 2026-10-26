/* Prism Color Forge · core logic (browser + Node) */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  function parse(input) {
    const s = String(input).trim().toLowerCase();
    let m;
    if ((m = /^#?([0-9a-f]{3,8})$/.exec(s))) {
      let h = m[1];
      if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("");
      if (h.length !== 6 && h.length !== 8) return null;
      return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: h.length === 8 ? +(parseInt(h.slice(6), 16) / 255).toFixed(3) : 1 };
    }
    if ((m = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+%?))?\s*\)$/.exec(s)))
      return { r: clamp(+m[1], 0, 255), g: clamp(+m[2], 0, 255), b: clamp(+m[3], 0, 255), a: alpha(m[4]) };
    if ((m = /^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%(?:[\s,/]+([\d.]+%?))?\s*\)$/.exec(s)))
      return { ...hslToRgb(+m[1], +m[2], +m[3]), a: alpha(m[4]) };
    return null;
  }
  const alpha = (v) => (v == null ? 1 : v.endsWith("%") ? parseFloat(v) / 100 : +v);
  const toHex = ({ r, g, b, a = 1 }) => "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("") + (a < 1 ? Math.round(a * 255).toString(16).padStart(2, "0") : "");
  function rgbToHsl({ r, g, b }) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    let h = 0, s = 0;
    if (max !== min) {
      const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60;
    }
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  }
  function hslToRgb(h, s, l) {
    h = ((h % 360) + 360) % 360; s /= 100; l /= 100;
    const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
  }
  function luminance({ r, g, b }) {
    const c = [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function contrast(a, b) {
    const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
    const ratio = (x + 0.05) / (y + 0.05);
    return { ratio: +ratio.toFixed(2), AA: ratio >= 4.5, AALarge: ratio >= 3, AAA: ratio >= 7, AAALarge: ratio >= 4.5 };
  }
  const bestText = (c) => (contrast(c, { r: 255, g: 255, b: 255 }).ratio >= contrast(c, { r: 0, g: 0, b: 0 }).ratio ? "#ffffff" : "#000000");
  function formats(c) {
    const { h, s, l } = rgbToHsl(c);
    return { hex: toHex(c), rgb: `rgb(${c.r} ${c.g} ${c.b}${c.a < 1 ? ` / ${c.a}` : ""})`, hsl: `hsl(${h} ${s}% ${l}%${c.a < 1 ? ` / ${c.a}` : ""})` };
  }
  function harmony(c, kind) {
    const { h, s, l } = rgbToHsl(c);
    const offs = { complementary: [0, 180], analogous: [-30, 0, 30], triadic: [0, 120, 240], split: [0, 150, 210], tetradic: [0, 90, 180, 270], mono: null }[kind];
    if (!offs) return [-30, -15, 0, 15, 30].map((d) => toHex(hslToRgb(h, s, clamp(l + d, 4, 96))));
    return offs.map((o) => toHex(hslToRgb(h + o, s, l)));
  }
  const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const LIGHT = [97, 94, 86, 76, 64, 52, 43, 35, 27, 20, 12];
  function scale(c) {
    const { h, s, l } = rgbToHsl(c);
    const shift = l - 52;
    return STEPS.map((step, i) => ({ step, hex: toHex(hslToRgb(h, clamp(s + (i > 5 ? -4 : 0), 0, 100), clamp(LIGHT[i] + shift * (1 - Math.abs(i - 5) / 6), 3, 98))) }));
  }
  function exportScale(name, sc, kind = "css") {
    if (kind === "tailwind") return `// tailwind.config.js\ncolors: {\n  ${name}: {\n${sc.map((x) => `    ${x.step}: "${x.hex}",`).join("\n")}\n  },\n}`;
    if (kind === "scss") return sc.map((x) => `$${name}-${x.step}: ${x.hex};`).join("\n");
    if (kind === "json") return JSON.stringify(Object.fromEntries(sc.map((x) => [x.step, x.hex])), null, 2);
    return `:root {\n${sc.map((x) => `  --${name}-${x.step}: ${x.hex};`).join("\n")}\n}`;
  }
  function random() { return toHex(hslToRgb(Math.random() * 360, 55 + Math.random() * 35, 45 + Math.random() * 15)); }
  return { parse, toHex, rgbToHsl, hslToRgb, luminance, contrast, bestText, formats, harmony, scale, exportScale, random };
});
