const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");

test("parses hex, rgb and hsl", () => {
  assert.deepEqual(C.parse("#0df"), { r: 0, g: 221, b: 255, a: 1 });
  assert.deepEqual(C.parse("rgb(0, 210, 255)"), { r: 0, g: 210, b: 255, a: 1 });
  assert.equal(C.toHex(C.parse("hsl(0 100% 50%)")), "#ff0000");
  assert.equal(C.parse("nope"), null);
});
test("hsl round trip", () => {
  const c = C.parse("#6c63ff");
  const { h, s, l } = C.rgbToHsl(c);
  const back = C.hslToRgb(h, s, l);
  assert.ok(Math.abs(back.r - c.r) <= 3 && Math.abs(back.b - c.b) <= 3);
});
test("WCAG contrast", () => {
  const r = C.contrast(C.parse("#000"), C.parse("#fff"));
  assert.equal(r.ratio, 21); assert.equal(r.AAA, true);
  assert.equal(C.bestText(C.parse("#ffff00")), "#000000");
});
test("scale has 11 steps getting darker", () => {
  const sc = C.scale(C.parse("#00d2ff"));
  assert.equal(sc.length, 11);
  const L = sc.map((x) => C.luminance(C.parse(x.hex)));
  for (let i = 1; i < L.length; i++) assert.ok(L[i] < L[i - 1], "step " + sc[i].step);
});
test("harmonies and exports", () => {
  assert.equal(C.harmony(C.parse("#ff0000"), "complementary")[1], "#00ffff");
  assert.match(C.exportScale("brand", C.scale(C.parse("#00d2ff")), "tailwind"), /brand: \{/);
});
