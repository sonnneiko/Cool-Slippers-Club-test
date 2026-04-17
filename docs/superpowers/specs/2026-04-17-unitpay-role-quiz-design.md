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

## Screens

### Screen 1 — Intro

- Gray background, white card with large border radius
- Cat avatar in circle (green border) centered at top — `assets/cat.jpg`
- "клуб крутых тапок" — small subtitle text
- "Твоя истинная роль в UnitPay" — large heading, font: **Igra Sans** Regular
- "10 вопросов" — small gray text
- Outline green button: `Начать тест ✦` (border: `#389e0d`, text: `#389e0d`)

### Screen 2 — Question

- Progress bar showing current question (e.g. 3/10), filled in `#389e0d`
- Optional image or GIF (`question.image`) — displayed above question text
- Question text
- 4 answer option cards — on click: green border + light green background (`#f6ffed`)
- "Далее →" button — enabled only after an answer is selected

### Screen 3 — Result

- Role emoji (large)
- Role name in Igra Sans
- Colleague photo in circle — `assets/role-{id}.jpg`
- Funny role description text
- "🔗 Поделиться" button — copies `window.location.href + ?result={roleId}` to clipboard, shows toast "Ссылка скопирована ✓" for 2 seconds
- "Пройти ещё раз" link — resets quiz to Screen 1

## Scoring

Myers-Briggs style: each answer carries hidden weights for all 4 roles. After 10 questions the role with the highest total score wins. Ties broken by role order: dev > sb > ceo > acc.

## Data Structure (`questions.js`)

```js
const QUESTIONS = [
  {
    text: "Вопрос...",
    image: "assets/q1.gif", // optional, null if none
    answers: [
      { text: "Ответ А", weights: { sb: 3, dev: 0, ceo: 1, acc: 0 } },
      { text: "Ответ Б", weights: { sb: 0, dev: 3, ceo: 0, acc: 1 } },
      { text: "Ответ В", weights: { sb: 1, dev: 0, ceo: 3, acc: 0 } },
      { text: "Ответ Г", weights: { sb: 0, dev: 1, ceo: 0, acc: 3 } },
    ]
  }
  // × 10 questions
];

const ROLES = {
  sb:  { name: "СБ",         emoji: "🔒", description: "...", photo: "assets/role-sb.jpg"  },
  dev: { name: "Разработка", emoji: "💻", description: "...", photo: "assets/role-dev.jpg" },
  ceo: { name: "Директор",   emoji: "👑", description: "...", photo: "assets/role-ceo.jpg" },
  acc: { name: "Аккаунтинг", emoji: "💰", description: "...", photo: "assets/role-acc.jpg" },
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
| Heading font | Igra Sans (Google Fonts) |
| Body font | Manrope (Google Fonts) |
| Card border-radius | `24px` |
| Button border-radius | `50px` (pill) |

## Assets Structure

```
assets/
  cat.jpg          # intro screen avatar
  role-sb.jpg      # colleague photo for СБ result
  role-dev.jpg     # colleague photo for Разработка result
  role-ceo.jpg     # colleague photo for Директор result
  role-acc.jpg     # colleague photo for Аккаунтинг result
  q1.gif           # optional media for question 1
  q2.jpg           # optional media for question 2
  ...
```

## GitHub Pages Deployment

- Enable GitHub Pages in repo Settings → Pages → Source: `main` branch, `/ (root)`
- Quiz accessible at `https://{username}.github.io/Cool-Slippers-Club-test/`
- Result sharing uses the same URL with `?result={roleId}` query param; on page load JS checks for this param and jumps directly to result screen

## Out of Scope

- Backend / database
- User accounts
- Analytics
- Mobile app
