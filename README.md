<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:FF6B8A,100:F5C561&height=200&section=header&text=Prism%20Color%20Forge&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Convert%20%C2%B7%20Contrast%20%C2%B7%20Scales%20%C2%B7%20Harmonies&descAlignY=58&descSize=16" width="100%" alt="Prism Color Forge" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=FF6B8A&center=true&vCenter=true&width=680&lines=%2300d2ff+%E2%86%92+a+full+50%E2%80%93950+scale;WCAG+AA+%2F+AAA+in+one+glance;Export+to+CSS%2C+Tailwind%2C+SCSS;Press+Space+for+a+random+color" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-color-forge/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-color-forge/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-color-forge/"><img src="https://img.shields.io/badge/Live_Demo-Open-FF6B8A?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-FF6B8A?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-color-forge?style=for-the-badge&color=F5C561" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism Color Forge screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" />

## ⚡ Overview

**Prism Color Forge** is a color workbench for building UI themes. Pick or paste any color, copy it in every format, check text contrast against WCAG, generate an eleven-step shade scale you can paste straight into Tailwind or CSS variables, and explore complementary, triadic and other harmonies.

## ✨ Features

- **Converter**: HEX, HEX8, `rgb()`, `hsl()` input and output
- **WCAG checker** with AA, AA Large, AAA and live preview
- **Shade scale** 50 → 950 tuned around your base color
- **Export** as CSS variables, Tailwind config, SCSS or JSON
- **Harmonies**: complementary, analogous, triadic, split, tetradic, monochrome
- Click any swatch to copy, `Space` for random, state saved locally

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism Color Forge on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism Color Forge on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-color-forge/](https://krishyaa06.github.io/prism-color-forge/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-color-forge.git
cd prism-color-forge
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

- Paste a color like `#6c63ff`, `rgb(108 99 255)` or `hsl(244 100% 69%)`.
- Set a text color to check contrast.
- Name your scale (e.g. `brand`) and switch export tabs to copy CSS or Tailwind config.

## 📁 Project Structure

```
prism-color-forge/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css
├── js/
│   ├── app.js   # UI wiring
│   ├── core.js   # color math, contrast and scales — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── README.md
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism Color Forge is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:F5C561,50:FF6B8A,100:07060f&height=110&section=footer" width="100%" />
