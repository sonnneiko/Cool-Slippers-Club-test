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
  currentQuestion = 0;
  scores = { sb: 0, dev: 0, ceo: 0, acc: 0 };
  selectedAnswer = null;
  showScreen('question');
  renderQuestion();
});

document.getElementById('btn-restart').addEventListener('click', (e) => {
  e.preventDefault();
  resetQuiz();
});

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

// On load: check for ?result= param
(function checkResultParam() {
  const params = new URLSearchParams(location.search);
  const resultId = params.get('result');
  if (resultId && ROLES[resultId]) {
    showResult(resultId);
  }
})();
