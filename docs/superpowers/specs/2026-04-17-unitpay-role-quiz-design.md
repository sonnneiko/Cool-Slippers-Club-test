# Cool Slippers Club — UnitPay Role Quiz

**Date:** 2026-04-17  
**Status:** Approved

## Overview

A fun personality quiz hosted on GitHub Pages that determines a user's "true role" at UnitPay based on 10 questions. Results are one of four roles: СБ, Разработка, Директор, Аккаунтинг.

## Tech Stack

- Pure HTML/CSS/JS — no build step, no dependencies
- `index.html` — entire quiz UI and logic
- `questions.js` — quiz data (questions + roles), editable by non-developers
- `assets/` — images, GIFs, colleague photos
- Hosted on GitHub Pages (root of `main` branch)

## Screen Transitions

All screen switches are instant (no animation): hide current screen container, show next. No fades, no slides.

## Screens

### Screen 1 — Intro

- Page layout: `display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f5f5f5; padding: 16px; box-sizing: border-box`
- White card: `max-width: 640px; width: 100%; border-radius: 24px; padding: 48px 32px; text-align: center; background: #fff`
- Cat avatar in circle (`width: 96px`, `border: 3px solid #389e0d`, `border-radius: 50%`, `object-fit: cover`) centered at top — `assets/cat.jpg`; if image fails to load (`onerror`), show green circle with 🐱 emoji as text
- "клуб крутых тапок" — small subtitle text (`font-size: 14px`, color `#595959`)
- "Твоя истинная роль в UnitPay" — large heading, font: **Igra Sans** (self-hosted from `assets/fonts/IgraSans.woff2`, loaded via `@font-face`), `font-size: clamp(32px, 6vw, 64px)`, `font-weight: 400`, color `#121212`
- "10 вопросов" — small gray text (`font-size: 14px`, color `#8c8c8c`)
- Outline green button: `Начать тест ✦` — `border: 2px solid #389e0d`, color `#389e0d`, `border-radius: 50px`, `padding: 14px 40px`, `font-size: 16px`, `font-weight: 700`, `background: transparent`, `cursor: pointer`; hover: `background: #389e0d`, color `#fff`

### Screen 2 — Question

- Same card + page layout as Screen 1
- Progress row: `display: flex; align-items: center; gap: 10px; margin-bottom: 20px`; label `3 / 10` on the right (`font-size: 12px`, color `#8c8c8c`); bar fills remaining width — `height: 4px`, track `#e8e8e8`, fill `#389e0d`, `border-radius: 2px`; bar width animates via CSS `transition: width 0.3s ease`
- If `question.image` is not null: `<img>` above question text, `width: 100%`, `border-radius: 12px`, `max-height: 200px`, `object-fit: cover`, `object-position: center center`; if null, element is absent from DOM entirely
- Question text: `font-size: 18px`, `font-weight: 700`, color `#121212`, `margin-bottom: 16px`
- 4 answer option cards in column: `border: 1.5px solid #e8e8e8`, `border-radius: 12px`, `padding: 12px 16px`, `cursor: pointer`, `text-align: left`, `font-size: 15px`, `margin-bottom: 8px`; hover (unselected): `border-color: #b7eb8f`, `background: #fafff7`; selected: `border-color: #389e0d`, `background: #f6ffed`; clicking a different option deselects the previous one; clicking the same option again does NOT deselect it
- "Далее →" button (filled green: `background: #389e0d`, `color: #fff`, `border-radius: 50px`, `padding: 14px 40px`): `disabled` attribute + `opacity: 0.4; cursor: not-allowed` until answer selected; on last question (index 9), clicking "Далее →" calculates result and shows Screen 3

### Screen 3 — Result

- Same card + page layout
- Role emoji: `font-size: 48px`, centered
- Role name: Igra Sans, `font-size: 36px`, color `#121212`
- Colleague photo in circle (`width: 80px`, `height: 80px`, `border: 3px solid #389e0d`, `border-radius: 50%`, `object-fit: cover`) — `assets/role-{id}.jpg`; `onerror`: show green circle with role emoji as text
- Funny role description: `font-size: 15px`, color `#595959`, `font-style: italic`, centered, `margin: 16px 0`
- "🔗 Поделиться" button (outline green style): on click calls `navigator.clipboard.writeText(url)`; on success shows toast "Ссылка скопирована ✓"; on failure (API unavailable or rejected) shows `prompt("Скопируй ссылку вручную:", url)`
- Toast: fixed position `bottom: 24px; left: 50%; transform: translateX(-50%)`, `background: #121212`, `color: #fff`, `border-radius: 8px`, `padding: 10px 20px`, `font-size: 14px`, `z-index: 1000`; appears instantly, disappears after 2s; if user clicks share again while toast is visible, timer resets
- "Пройти ещё раз" link (`color: #8c8c8c`, `text-decoration: underline`, `font-size: 14px`) — resets quiz and shows Screen 1

## Scoring

Myers-Briggs style: each answer carries hidden weights for all 4 roles. After 10 questions the role with the highest total score wins.

Runtime state (module-level JS variables in `index.html`):
```js
let currentQuestion = 0;                          // 0–9
let scores = { sb: 0, dev: 0, ceo: 0, acc: 0 };  // accumulates on each answer
let selectedAnswer = null;                         // index of selected answer on current question
```

"Пройти ещё раз" resets all three variables to their initial values and shows Screen 1.

Tie-breaking is determined by the explicit priority array defined in `questions.js`:

```js
const TIE_BREAK_ORDER = ['dev', 'sb', 'ceo', 'acc'];
```

On a tie the role that appears first in this array wins.

## URL Result Sharing

On page load, JS checks for `?result=` query param:
- If the value matches a valid role key (`sb`, `dev`, `ceo`, `acc`) → skip Screens 1–2, show Screen 3 for that role directly
- If the value is invalid or absent → show Screen 1 normally (no error shown to user)

## Data Structure (`questions.js`)

Question content (`"..."` placeholders) is provided separately by the content owner. The structure a developer must implement is:

```js
const TIE_BREAK_ORDER = ['dev', 'sb', 'ceo', 'acc'];

const QUESTIONS = [
  {
    text: "Текст вопроса",
    image: "assets/q1.gif", // or null if no image
    answers: [
      { text: "Ответ А", weights: { sb: 3, dev: 0, ceo: 1, acc: 0 } },
      { text: "Ответ Б", weights: { sb: 0, dev: 3, ceo: 0, acc: 1 } },
      { text: "Ответ В", weights: { sb: 1, dev: 0, ceo: 3, acc: 0 } },
      { text: "Ответ Г", weights: { sb: 0, dev: 1, ceo: 0, acc: 3 } },
    ]
  }
  // × 10 questions total
];

const ROLES = {
  sb:  { name: "СБ",         emoji: "🔒", description: "Смешное описание...", photo: "assets/role-sb.jpg"  },
  dev: { name: "Разработка", emoji: "💻", description: "Смешное описание...", photo: "assets/role-dev.jpg" },
  ceo: { name: "Директор",   emoji: "👑", description: "Смешное описание...", photo: "assets/role-ceo.jpg" },
  acc: { name: "Аккаунтинг", emoji: "💰", description: "Смешное описание...", photo: "assets/role-acc.jpg" },
};
```

## Visual Design

| Token | Value |
|---|---|
| Primary green | `#389e0d` |
| Dark text | `#121212` |
| Gray text | `#595959`, `#8c8c8c` |
| Light green bg | `#f6ffed` |
| Card background | `#ffffff` |
| Page background | `#f5f5f5` |
| Heading font | Igra Sans — self-hosted (`assets/fonts/IgraSans.woff2`) via `@font-face` |
| Body font | Manrope — Google Fonts |
| Font fallback stack | `'Igra Sans', 'Arial Black', sans-serif` / `'Manrope', Arial, sans-serif` |
| Font display | `font-display: swap` (no invisible text while loading) |
| Card border-radius | `24px` |
| Button border-radius | `50px` (pill) |
| Card max-width | `640px` |

## Responsive / Mobile

- Card is full-width on mobile with `16px` horizontal margin (`width: calc(100% - 32px)`)
- Heading uses `clamp(32px, 6vw, 64px)` — scales naturally
- Answer cards stack vertically (already column layout)
- Images in questions: `max-height: 200px`, `object-fit: cover`
- No horizontal scrolling at any viewport width

## Assets Structure

```
assets/
  fonts/
    IgraSans.woff2   # self-hosted heading font (provided by content owner)
  cat.jpg            # intro screen avatar
  role-sb.jpg        # colleague photo for СБ result
  role-dev.jpg       # colleague photo for Разработка result
  role-ceo.jpg       # colleague photo for Директор result
  role-acc.jpg       # colleague photo for Аккаунтинг result
  q1.gif             # optional media for question 1 (null = not used)
  q2.jpg             # optional media for question 2
  ...
```

## GitHub Pages Deployment

- Enable GitHub Pages: repo Settings → Pages → Source: `main` branch, `/ (root)`
- Quiz accessible at `https://{username}.github.io/Cool-Slippers-Club-test/`
- Add `.superpowers/` to `.gitignore`

## Out of Scope

- Backend / database
- User accounts
- Analytics
- Mobile app
