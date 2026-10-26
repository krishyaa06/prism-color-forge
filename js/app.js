(() => {
  const { $, copy, store, debounce, tabs } = Prism;
  let base = Core.parse(store.get("color:base", "#00d2ff")), exp = "css", harm = "complementary";
  const sw = (hex, label, sub = "") => `<button class="sw" style="background:${hex};color:${Core.bestText(Core.parse(hex))}" data-hex="${hex}" title="Copy ${hex}">${label}<span>${sub}</span></button>`;
  function render(from) {
    const f = Core.formats(base);
    store.set("color:base", f.hex);
    $("#swatch").style.background = f.hex; $("#swatch").style.color = Core.bestText(base); $("#swName").textContent = f.hex.toUpperCase();
    if (from !== "text") $("#color").value = f.hex;
    $("#picker").value = f.hex.slice(0, 7);
    $("#fmts").innerHTML = Object.entries(f).map(([k, v]) => `<div class="fmt" data-v="${v}"><small>${k}</small><span>${v}</span></div>`).join("");
    const fg = Core.parse($("#fg").value) || { r: 255, g: 255, b: 255 };
    const c = Core.contrast(base, fg);
    $("#preview").style.background = f.hex; $("#preview").style.color = Core.toHex(fg);
    $("#ratio").className = "pill " + (c.AA ? "ok" : c.AALarge ? "warn" : "bad"); $("#ratio").textContent = c.ratio + " : 1";
    $("#wcag").innerHTML = [["AA", c.AA], ["AA Large", c.AALarge], ["AAA", c.AAA], ["AAA Large", c.AAALarge]].map(([n, ok]) => `<span class="pill ${ok ? "ok" : "bad"}">${ok ? "✓" : "✕"} ${n}</span>`).join("");
    const sc = Core.scale(base);
    $("#scale").innerHTML = sc.map((x) => sw(x.hex, x.step, x.hex)).join("");
    $("#exp").textContent = Core.exportScale(($("#sname").value || "brand").replace(/[^\w-]/g, ""), sc, exp);
    $("#harm").innerHTML = Core.harmony(base, harm).map((h) => sw(h, h.toUpperCase())).join("");
  }
  const set = (hex, from) => { const c = Core.parse(hex); if (c) { base = c; render(from); } };
  $("#color").addEventListener("input", debounce((e) => set(e.target.value, "text"), 120));
  $("#picker").addEventListener("input", (e) => set(e.target.value));
  $("#fg").addEventListener("input", debounce(() => render("text"), 120));
  $("#sname").addEventListener("input", debounce(render, 150));
  $("#rand").onclick = () => set(Core.random());
  $("#swap").onclick = () => { const a = Core.formats(base).hex; set($("#fg").value); $("#fg").value = a; render(); };
  document.addEventListener("click", (e) => { const s = e.target.closest(".sw"); if (s) copy(s.dataset.hex, `Copied ${s.dataset.hex}`); const f = e.target.closest(".fmt"); if (f) copy(f.dataset.v); });
  document.addEventListener("keydown", (e) => { if (e.code === "Space" && !/INPUT|TEXTAREA|BUTTON/.test(document.activeElement.tagName)) { e.preventDefault(); set(Core.random()); } });
  tabs($("#expTabs"), (v) => { exp = v; render(); });
  tabs($("#harmTabs"), (v) => { harm = v; render(); });
  $("#copyScale").onclick = () => copy($("#exp").textContent);
  render();
})();
