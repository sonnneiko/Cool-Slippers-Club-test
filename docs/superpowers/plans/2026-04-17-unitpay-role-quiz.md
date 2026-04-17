# UnitPay Role Quiz Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fun 10-question personality quiz that reveals a user's "true role" at UnitPay, hosted on GitHub Pages.

**Architecture:** Single `index.html` with all three screens (intro, question, result) as hidden `<div>` containers switched via JS. Quiz data lives in `questions.js` loaded as a `<script>` tag. No build step, no dependencies except Google Fonts (Manrope) and self-hosted Igra Sans.

**Tech Stack:** Vanilla HTML/CSS/JS, GitHub Pages

---

## Chunk 1: Foundation — HTML, CSS, Data

### Task 1: Project scaffold + questions.js

**Files:**
- Create: `questions.js`
- Create: `.gitignore`

- [ ] **Step 1: Create `.gitignore`**

```
.superpowers/
.DS_Store
```

- [ ] **Step 2: Create `questions.js` with sample data**

```js
const TIE_BREAK_ORDER = ['dev', 'sb', 'ceo', 'acc'];

const QUESTIONS = [
  {
    text: "Пятница, 18:00. Прод упал. Ты:",
    image: null,
    answers: [
      { text: "😴 Уже дома, не моя проблема", weights: { sb: 0, dev: 0, ceo: 1, acc: 3 } },
      { text: "🔥 Поднимаю всех в общий чат", weights: { sb: 3, dev: 1, ceo: 2, acc: 0 } },
      { text: "💻 Тихо фиксю сам, никого не беспокою", weights: { sb: 0, dev: 3, ceo: 0, acc: 0 } },
      { text: "📋 Составляю отчёт об инциденте", weights: { sb: 2, dev: 0, ceo: 3, acc: 1 } },
    ]
  },
  {
    text: "Тебе прислали пароль от корпоративного аккаунта в открытом тексте. Ты:",
    image: null,
    answers: [
      { text: "😱 Паника. Немедленно меняю пароль и пишу в СБ", weights: { sb: 3, dev: 1, ceo: 1, acc: 0 } },
      { text: "🤷 Сохраняю в заметках, всё норм", weights: { sb: 0, dev: 1, ceo: 0, acc: 3 } },
      { text: "🔐 Настраиваю 2FA и хэширую", weights: { sb: 1, dev: 3, ceo: 0, acc: 0 } },
      { text: "📨 Пишу регламент по безопасности паролей", weights: { sb: 2, dev: 0, ceo: 3, acc: 1 } },
    ]
  },
  {
    text: "Идеальный понедельник утром это:",
    image: null,
    answers: [
      { text: "☕ Стендап, задачи расставлены, всё под контролем", weights: { sb: 1, dev: 0, ceo: 3, acc: 2 } },
      { text: "🖥 Тихо открыл IDE, все молчат", weights: { sb: 0, dev: 3, ceo: 0, acc: 0 } },
      { text: "🔍 Просматриваю логи за выходные", weights: { sb: 3, dev: 1, ceo: 0, acc: 0 } },
      { text: "📊 Сверяю цифры, закрываю месяц", weights: { sb: 0, dev: 0, ceo: 1, acc: 3 } },
    ]
  },
  {
    text: "Тебя попросили написать документ. Ты:",
    image: null,
    answers: [
      { text: "📝 Пишу регламент с пунктами и подпунктами", weights: { sb: 2, dev: 0, ceo: 3, acc: 1 } },
      { text: "🤖 Пишу скрипт который напишет документ", weights: { sb: 0, dev: 3, ceo: 0, acc: 0 } },
      { text: "🔒 Сначала проверяю есть ли гриф секретности", weights: { sb: 3, dev: 0, ceo: 1, acc: 0 } },
      { text: "🧾 Делаю таблицу в Excel", weights: { sb: 0, dev: 0, ceo: 0, acc: 3 } },
    ]
  },
  {
    text: "Коллега просит твой рабочий ноутбук на 5 минут. Ты:",
    image: null,
    answers: [
      { text: "🔐 Никогда. Это нарушение политики ИБ", weights: { sb: 3, dev: 1, ceo: 0, acc: 0 } },
      { text: "😅 Даю, но закрываю все вкладки с кодом", weights: { sb: 0, dev: 3, ceo: 0, acc: 1 } },
      { text: "👑 У меня есть ассистент, обратись к нему", weights: { sb: 0, dev: 0, ceo: 3, acc: 1 } },
      { text: "💰 Только если под расписку", weights: { sb: 1, dev: 0, ceo: 0, acc: 3 } },
    ]
  },
  {
    text: "Лучшее описание твоего рабочего стола:",
    image: null,
    answers: [
      { text: "🖤 Чёрный терминал, больше ничего", weights: { sb: 1, dev: 3, ceo: 0, acc: 0 } },
      { text: "📁 Папки подписаны, всё по цветам", weights: { sb: 0, dev: 0, ceo: 1, acc: 3 } },
      { text: "🚨 Дашборд с мониторингом", weights: { sb: 3, dev: 1, ceo: 0, acc: 0 } },
      { text: "📅 Календарь на полный экран", weights: { sb: 0, dev: 0, ceo: 3, acc: 1 } },
    ]
  },
  {
    text: "Тебя зовут на корпоратив. Первая мысль:",
    image: null,
    answers: [
      { text: "🎉 Кто будет? Составляю список участников", weights: { sb: 2, dev: 0, ceo: 3, acc: 1 } },
      { text: "💸 Бюджет утверждён?", weights: { sb: 0, dev: 0, ceo: 1, acc: 3 } },
      { text: "🤔 Кто организатор, можно ли доверять локации", weights: { sb: 3, dev: 0, ceo: 0, acc: 0 } },
      { text: "💻 Возьму ноут, мало ли", weights: { sb: 0, dev: 3, ceo: 0, acc: 0 } },
    ]
  },
  {
    text: "Тебе дали задачу без дедлайна. Ты:",
    image: null,
    answers: [
      { text: "📐 Декомпозирую, оцениваю, ставлю спринт", weights: { sb: 0, dev: 3, ceo: 1, acc: 0 } },
      { text: "🗓 Прошу поставить дедлайн письменно", weights: { sb: 1, dev: 0, ceo: 2, acc: 3 } },
      { text: "🚀 Делаю сразу, потом показываю", weights: { sb: 0, dev: 2, ceo: 3, acc: 0 } },
      { text: "🔍 Изучаю зачем это нужно и кто запросил", weights: { sb: 3, dev: 0, ceo: 0, acc: 1 } },
    ]
  },
  {
    text: "Что скажешь про ChatGPT?",
    image: null,
    answers: [
      { text: "⚠️ Корпоративные данные туда не вводить!", weights: { sb: 3, dev: 1, ceo: 0, acc: 0 } },
      { text: "🤝 Мой лучший junior-разработчик", weights: { sb: 0, dev: 3, ceo: 0, acc: 0 } },
      { text: "📈 Отличный инструмент для отчётов", weights: { sb: 0, dev: 0, ceo: 1, acc: 3 } },
      { text: "🎯 Хорошо, но стратегию всё равно я ставлю", weights: { sb: 0, dev: 0, ceo: 3, acc: 1 } },
    ]
  },
  {
    text: "Финальный вопрос: что для тебя работа?",
    image: null,
    answers: [
      { text: "🏰 Крепость которую надо защищать", weights: { sb: 3, dev: 0, ceo: 1, acc: 0 } },
      { text: "🧩 Задача которую надо решить элегантно", weights: { sb: 0, dev: 3, ceo: 0, acc: 1 } },
      { text: "🚀 Машина которую надо разогнать", weights: { sb: 0, dev: 1, ceo: 3, acc: 0 } },
      { text: "📒 Книга которую надо вести аккуратно", weights: { sb: 1, dev: 0, ceo: 0, acc: 3 } },
    ]
  },
];

const ROLES = {
  sb: {
    name: "Служба безопасности",
    emoji: "🔒",
    description: "Ты видишь угрозу там, где другие видят кофе-брейк. Каждый новый сотрудник — потенциальная утечка, каждый флешнакопитель — бомба замедленного действия. Коллеги немного боятся тебя. Это правильно.",
    photo: "assets/role-sb.jpg"
  },
  dev: {
    name: "Разработка",
    emoji: "💻",
    description: "Ты пишешь код в 2 ночи и называешь это 'продуктивным вечером'. На совещаниях думаешь о рефакторинге. Считаешь, что любую проблему можно автоматизировать — включая эти 10 вопросов.",
    photo: "assets/role-dev.jpg"
  },
  ceo: {
    name: "Директор",
    emoji: "👑",
    description: "Ты видишь картину целиком, пока все остальные смотрят в пиксели. Твоё любимое слово — 'стратегически'. Встречи ставишь сам, дедлайны тоже. Иногда забываешь как называются задачи в Jira — и это нормально.",
    photo: "assets/role-ceo.jpg"
  },
  acc: {
    name: "Аккаунтинг",
    emoji: "💰",
    description: "Ты знаешь сколько стоит каждая печенька на корпоративе. Твои таблицы сходятся до копейки. Слово 'приблизительно' вызывает у тебя лёгкое недомогание. Ты единственный кто читает финансовую отчётность до конца.",
    photo: "assets/role-acc.jpg"
  },
};
```

- [ ] **Step 3: Commit scaffold**

```bash
git add questions.js .gitignore
git commit -m "feat: add quiz data and project config"
```

---

### Task 2: HTML structure

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html` with three screen containers**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Твоя истинная роль в UnitPay</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- SCREEN 1: INTRO -->
  <div id="screen-intro" class="screen">
    <div class="card">
      <img id="cat-avatar" class="avatar" src="assets/cat.jpg" alt="Клуб крутых тапок"
           onerror="this.style.display='none'; document.getElementById('cat-fallback').style.display='flex'">
      <div id="cat-fallback" class="avatar avatar--fallback" style="display:none">🐱</div>
      <p class="club-label">клуб крутых тапок</p>
      <h1 class="heading">Твоя истинная роль в UnitPay</h1>
      <p class="subtext">10 вопросов</p>
      <button class="btn btn--outline" id="btn-start">Начать тест ✦</button>
    </div>
  </div>

  <!-- SCREEN 2: QUESTION -->
  <div id="screen-question" class="screen" style="display:none">
    <div class="card">
      <div class="progress-row">
        <div class="progress-track">
          <div class="progress-fill" id="progress-fill"></div>
        </div>
        <span class="progress-label" id="progress-label">1 / 10</span>
      </div>
      <!-- question image injected here by JS when present -->
      <p class="question-text" id="question-text"></p>
      <div class="answers" id="answers-container"></div>
      <button class="btn btn--filled" id="btn-next" disabled>Далее →</button>
    </div>
  </div>

  <!-- SCREEN 3: RESULT -->
  <div id="screen-result" class="screen" style="display:none">
    <div class="card card--result">
      <div class="result-emoji" id="result-emoji"></div>
      <h2 class="result-name" id="result-name"></h2>
      <img id="result-photo" class="avatar avatar--result" src="" alt=""
           onerror="this.style.display='none'; document.getElementById('result-photo-fallback').style.display='flex'">
      <div id="result-photo-fallback" class="avatar avatar--result avatar--fallback" style="display:none"></div>
      <p class="result-description" id="result-description"></p>
      <button class="btn btn--outline" id="btn-share">🔗 Поделиться</button>
      <a href="#" class="restart-link" id="btn-restart">Пройти ещё раз</a>
    </div>
  </div>

  <!-- TOAST -->
  <div id="toast" class="toast" style="display:none">Ссылка скопирована ✓</div>

  <script src="questions.js"></script>
  <script src="quiz.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add HTML skeleton for all three quiz screens"
```

---

### Task 3: CSS styles

**Files:**
- Create: `style.css`

- [ ] **Step 1: Create `style.css`**

```css
@font-face {
  font-family: 'Igra Sans';
  src: url('assets/fonts/IgraSans.otf') format('opentype'),
       url('assets/fonts/IgraSans.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Manrope', Arial, sans-serif;
  background: #f5f5f5;
  color: #121212;
  min-height: 100vh;
}

/* Page layout */
.screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 16px;
}

/* Card */
.card {
  background: #fff;
  border-radius: 24px;
  padding: 48px 32px;
  width: 100%;
  max-width: 640px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.card--result {
  gap: 12px;
}

/* Avatar */
.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 3px solid #389e0d;
  object-fit: cover;
}

.avatar--result {
  width: 80px;
  height: 80px;
}

.avatar--fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  background: #f6ffed;
}

/* Typography */
.club-label {
  font-size: 14px;
  color: #595959;
}

.heading {
  font-family: 'Igra Sans', 'Arial Black', sans-serif;
  font-size: clamp(32px, 6vw, 64px);
  font-weight: 400;
  line-height: 1.2;
  color: #121212;
}

.subtext {
  font-size: 14px;
  color: #8c8c8c;
}

/* Buttons */
.btn {
  border: none;
  border-radius: 50px;
  padding: 14px 40px;
  font-size: 16px;
  font-weight: 700;
  font-family: 'Manrope', Arial, sans-serif;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-top: 8px;
}

.btn--outline {
  background: transparent;
  border: 2px solid #389e0d;
  color: #389e0d;
}

.btn--outline:hover {
  background: #389e0d;
  color: #fff;
}

.btn--filled {
  background: #389e0d;
  color: #fff;
  border: 2px solid #389e0d;
}

.btn--filled:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn--filled:not(:disabled):hover {
  background: #237a08;
  border-color: #237a08;
}

/* Progress */
.progress-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 4px;
}

.progress-track {
  flex: 1;
  height: 4px;
  background: #e8e8e8;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #389e0d;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.progress-label {
  font-size: 12px;
  color: #8c8c8c;
  white-space: nowrap;
}

/* Question */
.question-image {
  width: 100%;
  border-radius: 12px;
  max-height: 200px;
  object-fit: cover;
  object-position: center center;
}

.question-text {
  font-size: 18px;
  font-weight: 700;
  color: #121212;
  text-align: left;
  width: 100%;
  margin-bottom: 4px;
}

/* Answers */
.answers {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  text-align: left;
}

.answer-card {
  border: 1.5px solid #e8e8e8;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 15px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  background: #fff;
}

.answer-card:hover {
  border-color: #b7eb8f;
  background: #fafff7;
}

.answer-card.selected {
  border-color: #389e0d;
  background: #f6ffed;
}

/* Result */
.result-emoji {
  font-size: 48px;
}

.result-name {
  font-family: 'Igra Sans', 'Arial Black', sans-serif;
  font-size: 36px;
  font-weight: 400;
  color: #121212;
}

.result-description {
  font-size: 15px;
  color: #595959;
  font-style: italic;
  line-height: 1.6;
  max-width: 480px;
}

.restart-link {
  color: #8c8c8c;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #121212;
  color: #fff;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-family: 'Manrope', Arial, sans-serif;
  z-index: 1000;
  white-space: nowrap;
}

/* Mobile */
@media (max-width: 640px) {
  .card {
    padding: 32px 20px;
    border-radius: 20px;
  }

  .btn {
    width: 100%;
  }
}
```

- [ ] **Step 2: Open `index.html` in browser and verify card appears centred on grey background**

Expected: White card on `#f5f5f5` grey page. Cat shows 🐱 fallback (no photo yet — expected). Heading shows in Igra Sans (or Arial Black fallback if font not yet loaded). Button visible with green outline.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: add quiz styles"
```

---

## Chunk 2: JavaScript Logic

### Task 4: Quiz engine — screen switching and intro

**Files:**
- Create: `quiz.js`

- [ ] **Step 1: Create `quiz.js` with state + showScreen + intro logic**

```js
// State
let currentQuestion = 0;
let scores = { sb: 0, dev: 0, ceo: 0, acc: 0 };
let selectedAnswer = null;
let toastTimer = null;

// DOM refs
const screens = {
  intro: document.getElementById('screen-intro'),
  question: document.getElementById('screen-question'),
  result: document.getElementById('screen-result'),
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.style.display = 'none');
  screens[name].style.display = 'flex';
}

function resetQuiz() {
  currentQuestion = 0;
  scores = { sb: 0, dev: 0, ceo: 0, acc: 0 };
  selectedAnswer = null;
  showScreen('intro');
}

// Intro
document.getElementById('btn-start').addEventListener('click', () => {
  resetQuiz();
  showScreen('question');
  renderQuestion();
});

document.getElementById('btn-restart').addEventListener('click', (e) => {
  e.preventDefault();
  resetQuiz();
});
```

- [ ] **Step 2: Open browser, click "Начать тест ✦" — verify question screen appears (empty)**

- [ ] **Step 3: Commit**

```bash
git add quiz.js
git commit -m "feat: add quiz engine with screen switching"
```

---

### Task 5: Question rendering

**Files:**
- Modify: `quiz.js`

- [ ] **Step 1: Add `renderQuestion()` to `quiz.js`**

```js
function renderQuestion() {
  const q = QUESTIONS[currentQuestion];

  // Progress
  const pct = ((currentQuestion) / QUESTIONS.length) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-label').textContent =
    (currentQuestion + 1) + ' / ' + QUESTIONS.length;

  // Image — injected into DOM only when present, removed when absent
  const existingImg = document.getElementById('question-image');
  if (existingImg) existingImg.remove();
  if (q.image) {
    const img = document.createElement('img');
    img.id = 'question-image';
    img.className = 'question-image';
    img.src = q.image;
    img.alt = '';
    document.getElementById('question-text').before(img);
  }

  // Question text
  document.getElementById('question-text').textContent = q.text;

  // Answers
  const container = document.getElementById('answers-container');
  container.innerHTML = '';
  q.answers.forEach((answer, index) => {
    const card = document.createElement('div');
    card.className = 'answer-card';
    card.textContent = answer.text;
    card.addEventListener('click', () => selectAnswer(index));
    container.appendChild(card);
  });

  // Reset selection state
  selectedAnswer = null;
  document.getElementById('btn-next').disabled = true;
}

function selectAnswer(index) {
  selectedAnswer = index;
  document.querySelectorAll('.answer-card').forEach((card, i) => {
    card.classList.toggle('selected', i === index);
  });
  document.getElementById('btn-next').disabled = false;
}
```

- [ ] **Step 2: Open browser, click Start — verify question text appears, progress bar shows 0%, answers render as clickable cards, clicking an answer highlights it in green and enables the Далее button. Note: if `assets/cat.jpg` is not yet present, the fallback 🐱 emoji is expected.**

- [ ] **Step 3: Commit**

```bash
git add quiz.js
git commit -m "feat: render questions and answer selection"
```

---

### Task 6: Scoring + next question + result screen

**Files:**
- Modify: `quiz.js`

- [ ] **Step 1: Add `advanceQuestion()`, `calculateResult()`, and `showResult()` to `quiz.js`**

```js
document.getElementById('btn-next').addEventListener('click', advanceQuestion);

function advanceQuestion() {
  if (selectedAnswer === null) return;

  // Accumulate scores
  const weights = QUESTIONS[currentQuestion].answers[selectedAnswer].weights;
  Object.keys(weights).forEach(role => {
    scores[role] += weights[role];
  });

  currentQuestion++;

  if (currentQuestion < QUESTIONS.length) {
    renderQuestion();
  } else {
    showResult(calculateResult());
  }
}

function calculateResult() {
  let winner = TIE_BREAK_ORDER[0];
  let topScore = -1;
  TIE_BREAK_ORDER.forEach(role => {
    if (scores[role] > topScore) {
      topScore = scores[role];
      winner = role;
    }
  });
  return winner;
}

function showResult(roleId) {
  const role = ROLES[roleId];

  document.getElementById('result-emoji').textContent = role.emoji;
  document.getElementById('result-name').textContent = role.name;
  document.getElementById('result-description').textContent = role.description;

  // Photo
  const photo = document.getElementById('result-photo');
  const fallback = document.getElementById('result-photo-fallback');
  photo.src = role.photo;
  photo.style.display = 'block';
  fallback.style.display = 'none';
  fallback.textContent = role.emoji;

  // Share button
  document.getElementById('btn-share').onclick = () => shareResult(roleId);

  showScreen('result');
}
```

- [ ] **Step 2: Answer all 10 questions in the browser — verify result screen appears with correct role name, emoji, and description**

- [ ] **Step 3: Click "Пройти ещё раз" — verify quiz resets to intro screen**

- [ ] **Step 4: Commit**

```bash
git add quiz.js
git commit -m "feat: scoring, result calculation, and result screen"
```

---

### Task 7: Share button + toast + URL result loading

**Files:**
- Modify: `quiz.js`

- [ ] **Step 1: Add `shareResult()` and `showToast()` to `quiz.js`**

```js
function shareResult(roleId) {
  const url = location.origin + location.pathname + '?result=' + roleId;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
      .then(() => showToast())
      .catch(() => prompt('Скопируй ссылку вручную:', url));
  } else {
    prompt('Скопируй ссылку вручную:', url);
  }
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.style.display = 'block';
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.style.display = 'none';
  }, 2000);
}
```

- [ ] **Step 2: Add URL param handling at bottom of `quiz.js` (after `showResult` definition)**

```js
// On load: check for ?result= param
(function checkResultParam() {
  const params = new URLSearchParams(location.search);
  const resultId = params.get('result');
  if (resultId && ROLES[resultId]) {
    showResult(resultId);
  }
})();
```

- [ ] **Step 3: Test share button — click it, verify toast "Ссылка скопирована ✓" appears for 2 seconds**

- [ ] **Step 4: Manually navigate to `index.html?result=dev` in browser — verify result screen shows for Разработка without going through quiz**

- [ ] **Step 5: Navigate to `index.html?result=invalid` — verify intro screen shows normally**

- [ ] **Step 6: Commit**

```bash
git add quiz.js
git commit -m "feat: share button, toast notification, and URL result loading"
```

---

## Chunk 3: Deployment

### Task 8: GitHub Pages setup

**Files:**
- No new files — verify `.gitignore` has `.superpowers/`

- [ ] **Step 1: Push all commits to GitHub**

```bash
git push origin main
```

- [ ] **Step 2: Enable GitHub Pages**

Go to repo on GitHub → Settings → Pages → Source: Deploy from branch → Branch: `main` → Folder: `/ (root)` → Save.

- [ ] **Step 3: Wait 2–5 minutes, then open the Pages URL**

URL format: `https://<username>.github.io/Cool-Slippers-Club-test/`

Expected: Intro screen loads, quiz is fully functional.

- [ ] **Step 4: Test the share URL on a different device or incognito window**

Copy the share link from the result screen, open in a new window — verify result screen loads directly.

- [ ] **Step 5: Add content owner instructions as a comment at top of `questions.js`**

```js
/*
  КАК РЕДАКТИРОВАТЬ ВОПРОСЫ:
  - Каждый объект в QUESTIONS = один вопрос
  - text: текст вопроса
  - image: путь к картинке/гифке в папке assets/ (или null если без картинки)
  - answers: массив из 4 ответов
  - weights: сколько очков каждый ответ даёт каждой роли (sb, dev, ceo, acc)
  - Сумма весов в одном ответе обычно 3-4 очка суммарно

  КАК ДОБАВИТЬ ФОТО КОЛЛЕГ:
  - Положи фото в assets/ с именем role-sb.jpg / role-dev.jpg / role-ceo.jpg / role-acc.jpg
  - Фото должны быть квадратные, минимум 200×200px
*/
```

- [ ] **Step 6: Final commit**

```bash
git add questions.js
git commit -m "docs: add content editing instructions to questions.js"
git push origin main
```
