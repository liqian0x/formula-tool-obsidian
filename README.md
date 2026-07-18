# Formula Tool — Obsidian Plugin

[![Obsidian](https://img.shields.io/badge/Obsidian-%23483699.svg?style=flat&logo=obsidian&logoColor=white)](https://obsidian.md)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](manifest.json)

> 🔢 数学/物理公式符号库 & 实时预览 & MathLive 可视化编辑 — 为 Obsidian 打造的 LaTeX 公式输入利器。

**Author:** [liqian](https://github.com/liqian)

**English** | [中文](#chinese)

---

## ✨ Features

- **📐 Rich Formula Library** — 15+ categories, 400+ pre-built formulas and symbols, from Greek letters to power electronics
- **✎ Dual Editing Modes** — Code mode for raw LaTeX input + Visual mode powered by MathLive (WYSIWYG)
- **📺 Live Preview** — Real-time rendering via Obsidian's built-in MathJax
- **🔍 Quick Search** — `Ctrl+P` fuzzy search across all formulas, insert with one click
- **📋 Flexible Insertion** — Inline `$...$` or block `$$...$$` formulas at cursor position
- **↔ Resizable Layout** — Draggable splitter between editor and library panels
- **🎨 Theme Adaptive** — Automatically matches your Obsidian theme (light/dark)
- **🕐 Recent History** — Tracks recently used formulas for quick reuse
- **⌨️ Keyboard Shortcuts** — `Ctrl+Enter` block / `Ctrl+Shift+C` inline / wrap selected text

## 📸 Screenshots

```
┌──────────────────────────────────┬──────────────────┐
│  [</> Code]  [✎ Visual]         │  📐 Library [▶]  │
│                                  │  (click to open)  │
│  📝 LaTeX Input                  │                  │
│  ┌────────────────────────────┐  │  ▶ Greek (lower) │
│  │ \frac{a}{b}                │  │  ▶ Operators     │
│  └────────────────────────────┘  │  ▶ Calculus      │
│                                  │  ▶ Physics       │
│  📺 Live Preview                 │  ▶ Power Elec.   │
│  ┌────────────────────────────┐  │  ...             │
│  │          a                  │  │                  │
│  │         ───                │  │  🕐 Recent       │
│  │          b                  │  │  ┌──┐ ┌──┐     │
│  └────────────────────────────┘  │  │√x│ │∫ │     │
│                                  │  └──┘ └──┘     │
│  [📋 Inline] [📄 Block] [🗑 Clear]│                  │
└──────────────────────────────────┴──────────────────┘
        ↕ draggable                           ↕ draggable
```

## 📦 Installation

### Manual Installation

1. Download the latest release or clone this repo
2. Copy the plugin folder into your Obsidian vault:
   ```
   <vault>/.obsidian/plugins/formula-tool/
   ```
3. Required files:
   ```
   formula-tool/
   ├── manifest.json
   ├── main.js
   └── styles.css
   ```
4. Restart Obsidian
5. Go to `Settings → Community Plugins → Formula Tool → Enable`

### From Source

```bash
cd <vault>/.obsidian/plugins/
git clone https://github.com/YOUR_USERNAME/obsidian-formula-tool.git formula-tool
```

## 🚀 Usage

| Action | How |
|--------|-----|
| **Open panel** | Click ∑ ribbon icon, or `Ctrl+P` → "打开公式工具面板" |
| **Browse library** | Click "📐 公式 & 符号库" header to expand, then click any symbol |
| **Search** | Use the search box in the library, or `Ctrl+P` → "搜索并插入公式" |
| **Code mode** | Type LaTeX directly, preview updates in real-time |
| **Visual mode** | Click "✎ 可视化模式" tab for WYSIWYG MathLive editing |
| **Insert inline** | Click "📋 行内公式 $...$" or press `Ctrl+Shift+C` |
| **Insert block** | Click "📄 块级公式 $$...$$" or press `Ctrl+Enter` |
| **Wrap selection** | Select text in editor → `Ctrl+P` → "将选中文本包装为..." |
| **Resize panels** | Drag the divider between left and right panels |

## 📚 Formula Categories

| Category | Examples |
|----------|----------|
| Greek Letters (lower) | α, β, γ, δ, ε, ζ, η, θ, ... |
| Greek Letters (upper) | Γ, Δ, Θ, Λ, Ξ, Π, Σ, Φ, Ψ, Ω |
| Operators | ∑, ∏, ∫, ∬, ∭, ∮, lim, ∂, ∇, ∞ |
| Relations | ≤, ≥, ≠, ≈, ≡, ∝, ∼, ⊂, ⊃, ∈, ∀, ∃ |
| Arrows | →, ←, ⇒, ⇐, ⇔, ↑, ↓, ↦, ⇌ |
| Brackets | ( ), [ ], { }, \| \|, 〈 〉, cases |
| Fractions & Roots | ½√, ⁿ√x, binomial |
| Superscript/Subscript | xⁿ, xᵢ, xᵢⁿ, vector, hat, tilde, bar, dot |
| Calculus | derivatives, integrals, ∇ operators, limits |
| Linear Algebra | matrices, determinants, vectors, equations |
| Trigonometry | sin, cos, tan, arcsin, sinh, etc. |
| Set & Logic | ∈, ⊂, ∪, ∩, ℕ, ℤ, ℚ, ℝ, ℂ, ∧, ∨, ¬, ⇒, ⇔ |
| ⚛ Physics | Newton, gravity, energy, EM, Maxwell, quantum, waves |
| ⚡ Power Electronics | Buck/Boost, LLC, PFC, Flyback, inverters, EMI, control |

## 🛠 Tech Stack

| Component | License | Usage |
|-----------|---------|-------|
| [Obsidian Plugin API](https://docs.obsidian.md/) | MIT | Plugin framework |
| MathJax (Obsidian built-in) | Apache 2.0 | Math rendering in preview |
| [MathLive](https://cortexjs.io/mathlive/) | MIT | Visual WYSIWYG editor (CDN loaded) |

> All dependencies are open-source. MathLive is loaded at runtime from CDN and is **not** bundled in this repository.

## 📄 License

MIT © [liqian](https://github.com/liqian) — see [LICENSE](LICENSE) for full text.

---

## <a name="chinese"></a>🇨🇳 中文介绍

### 简介

Formula Tool 是一款 Obsidian 插件，为数学、物理、电力电子等领域的公式输入提供便捷的符号库和实时预览功能。支持 LaTeX 代码模式和 MathLive 所见即所得可视化编辑。

### 功能特点

- **15+ 分类、400+ 公式** — 从希腊字母到电力电子，覆盖广泛的学科公式
- **双编辑模式** — LaTeX 代码模式 + MathLive 可视化模式，一键切换
- **实时预览** — 利用 Obsidian 内置 MathJax 即时渲染，所见即所得
- **快速搜索** — 模糊搜索所有公式，一键插入
- **行内/块级插入** — 支持 `$...$` 行内公式和 `$$...$$` 块级公式
- **可拖拽布局** — 左右面板可通过分隔条自由调整大小
- **主题自适应** — 自动匹配 Obsidian 亮色/暗色主题
- **最近使用记录** — 自动记录最近使用的公式

### 快速开始

1. 将插件文件夹放入 `<vault>/.obsidian/plugins/formula-tool/`
2. 启用插件
3. 点击左侧栏 ∑ 图标打开面板
4. 在公式库中选择公式或手动输入 LaTeX
5. 点击插入按钮将公式插入笔记

### 安装要求

- Obsidian ≥ 1.5.0
- 网络连接（MathLive 可视化模式需要加载 CDN，代码模式不需要）

---

**If you find this plugin useful, please ⭐ star this repo!**
