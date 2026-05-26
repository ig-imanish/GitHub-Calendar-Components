# GitHub Calendar UI

> Design, customize, and generate React code for your GitHub contribution calendar.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=flat&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat)](LICENSE)

<p align="center">
  <img src="https://raw.githubusercontent.com/ig-imanish/FreeImageHosting/refs/heads/main/CalendarUI/og-image.png" alt="GitHub Calendar UI Preview" width="100%" />
</p>

---

## Features

- **17 Premium Themes** — From Midnight Green to Pastel Lavender, pick the perfect palette
- **Surprise Me** — Get a random theme with one click
- **9 Block Shapes** — Square, Circle, Pill, Diamond, Star, Hexagon, Triangle, Egg, GitHub logo
- **Block Radius** — Smoothly round square blocks from sharp to fully pill-shaped
- **Month Range** — Show all contributions or filter to 3, 6, or 12 months
- **Custom Labels** — Add header text and custom total count labels
- **Live Color Pickers** — Tweak individual theme colors in real time
- **Tooltips** — Hover to see contribution count and date on any block
- **One‑Click Copy** — Copy ready‑to‑use React code with your exact config
- **Generates Clean Code** — `<GitHubCalendar>` component with all your settings baked in
- **Responsive** — Works on desktop and mobile

## Themes

| Theme | Colors |
|-------|--------|
| Gray Scale | `#1a1a1a` `#333333` `#555555` `#888888` `#bbbbbb` |
| Midnight Green | `#141414` `#1e3a2f` `#2d6a4f` `#40916c` `#52b788` |
| Neon Cyber | `#0d1f17` `#064e3b` `#059669` `#10b981` `#34d399` |
| Warm Ember | `#431407` `#9a3412` `#c2410c` `#ea580c` `#fb923c` |
| Royal Purple | `#2e1065` `#5b21b6` `#7c3aed` `#a855f7` `#d8b4fe` |
| Sun Light | `#fef9c3` `#fde047` `#facc15` `#eab308` `#ca8a04` |
| Moon Dark | `#0f172a` `#1e293b` `#334155` `#475569` `#64748b` |
| White Frost | `#e2e8f0` `#cbd5e1` `#94a3b8` `#64748b` `#475569` |
| Fiery Red Sunset | `#03071e` `#370617` `#6a040f` `#9d0208` `#d00000` |
| Ocean Breeze | `#03045e` `#0077b6` `#00b4d8` `#90e0ef` `#caf0f8` |
| Soft Sand | `#2c1810` `#4a3020` `#6b4c3a` `#9c7860` `#d4bc9e` |
| Fresh Greens | `#081c15` `#2d6a4f` `#52b788` `#95d5b2` `#d8f3dc` |
| Sunset Gradient | `#583101` `#6f4518` `#a47148` `#d4a276` `#ffedd8` |
| Pastel Lavender | `#6247aa` `#7251b5` `#9163cb` `#b185db` `#dec9e9` |
| Bright Green | `#004b23` `#006400` `#007200` `#008000` `#38b000` |
| Warm Earth Tones | `#260701` `#38160d` `#532c1e` `#653a2a` `#774936` |
| Silver Lining | `#595959` `#7f7f7f` `#a5a5a5` `#cccccc` `#f2f2f2` |

## Shapes

Each block in the calendar can be rendered as one of nine shapes:

`square` `circle` `pill` `diamond` `star` `hexagon` `triangle` `egg` `github`

The **square** and **pill** shapes respect the block radius slider for smooth rounding.

## Getting Started

```bash
git clone https://github.com/ig-imanish/github-calendar-ui.git
cd github-calendar-ui
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to start customizing.

## Usage

1. **Pick a theme** from the sidebar or click **Surprise me**
2. **Fine‑tune** block radius, shape, month range, labels, and colors
3. **Preview** your calendar live
4. **Copy** the generated React code
5. **Paste** into your portfolio or project

The generated code uses the `react-github-calendar` package and includes all your chosen settings, shape helpers, and tooltip logic.

## Customization Options

| Control | Description |
|---------|-------------|
| Themes | 17 preset palettes + Surprise Me |
| Block radius | 0% (sharp) to 100% (fully rounded) |
| Block shape | 9 shapes including custom SVGs |
| Show range | All / 3mo / 6mo / 12mo |
| Header label | Custom text above the calendar |
| Total count label | Custom label for the total count |
| Theme colors | 5 inline color pickers |
| Show total count | Toggle the total contributions display |
| Show color legend | Toggle the color legend |
| Show hover tooltip | Toggle tooltips on block hover |

## Tech Stack

- [Next.js 16](https://nextjs.org) — React framework
- [React 19](https://react.dev) — UI library
- [react-github-calendar](https://github.com/grubersjoe/react-github-calendar) — Calendar component
- [Lucide React](https://lucide.dev) — Icons
- [TypeScript](https://www.typescriptlang.org) — Type safety

## License

MIT © [Manixh02](https://x.com/Manixh02)
