/*
  КАК РЕДАКТИРОВАТЬ ВОПРОСЫ:
  - Каждый объект в QUESTIONS = один вопрос
  - text: текст вопроса
  - image: путь к картинке/гифке в папке assets/ (или null если без картинки)
  - answers: массив ответов
  - weights: сколько очков каждый ответ даёт каждой роли (sb, dev, ceo, acc, mgr)
  - Сумма весов в одном ответе обычно 3 очка суммарно

  КАК ДОБАВИТЬ ФОТО КОЛЛЕГ:
  - Положи фото в assets/ с именем role-sb.jpg / role-dev.jpg / role-ceo.jpg / role-acc.jpg / role-mgr.jpg
  - Фото должны быть квадратные, минимум 200×200px
*/

const TIE_BREAK_ORDER = ['dev', 'sb', 'ceo', 'acc', 'mgr'];

const QUESTIONS = [
  {
    text: "Пятница 18:01. UnitPay упал. Ты:",
    image: "assets/q1.jpg",
    answers: [
      { text: "🚪 18:00 и меня уже нет на работе", weights: { sb: 3, dev: 0, ceo: 0, acc: 0, mgr: 0 } },
      { text: "📣 Поднимаю всех", weights: { sb: 0, dev: 0, ceo: 3, acc: 0, mgr: 0 } },
      { text: "🔍 Проверяю что случилось", weights: { sb: 0, dev: 3, ceo: 0, acc: 0, mgr: 0 } },
      { text: "✉️ Иду писать мерчам", weights: { sb: 0, dev: 0, ceo: 0, acc: 3, mgr: 0 } },
      { text: "😤 Выясняю причину, ругаюсь на виновных, отчитываюсь на Мите", weights: { sb: 0, dev: 0, ceo: 0, acc: 0, mgr: 3 } },
    ]
  },
  {
    text: "Тебя зовут на корпоратив. Первая мысль:",
    image: "assets/q2.jpg",
    answers: [
      { text: "💻 Возьму ноут, мало ли", weights: { sb: 0, dev: 0, ceo: 0, acc: 0, mgr: 3 } },
      { text: "🤔 Кто будет?", weights: { sb: 0, dev: 0, ceo: 0, acc: 3, mgr: 0 } },
      { text: "💰 Какой бюджет и где корпоратив будет", weights: { sb: 0, dev: 0, ceo: 3, acc: 0, mgr: 0 } },
      { text: "🙅 Я не приду", weights: { sb: 0, dev: 3, ceo: 0, acc: 0, mgr: 0 } },
      { text: "🔎 Можно ли доверять локации и коллегам -_-", weights: { sb: 3, dev: 0, ceo: 0, acc: 0, mgr: 0 } },
    ]
  },
  {
    text: "Лучшее описание твоего рабочего стола:",
    image: "assets/q3.png",
    answers: [
      { text: "📁 Папочки с документами, чарджбеки", weights: { sb: 3, dev: 0, ceo: 0, acc: 0, mgr: 0 } },
      { text: "🌪 Всё что только можно", weights: { sb: 0, dev: 0, ceo: 3, acc: 0, mgr: 0 } },
      { text: "💬 Куча чатов и документация", weights: { sb: 0, dev: 0, ceo: 0, acc: 3, mgr: 0 } },
      { text: "🖤 Код и чат с мемами на втором экране", weights: { sb: 0, dev: 3, ceo: 0, acc: 0, mgr: 0 } },
      { text: "🤯 Документация, чаты, Claude, ChatGPT, терминал, код, почта и ещё куча вкладок", weights: { sb: 0, dev: 0, ceo: 0, acc: 0, mgr: 3 } },
    ]
  },
  {
    text: "Взял бы ты в UnitPay ООО «Тмыв денег» или АО «Куда деньги»?",
    image: null,
    answers: [
      { text: "🚫 Категорически нет", weights: { sb: 3, dev: 0, ceo: 0, acc: 0, mgr: 0 } },
      { text: "📈 Если оборот большой — возьмём, порешаем", weights: { sb: 0, dev: 0, ceo: 3, acc: 0, mgr: 0 } },
      { text: "🤷 Как скажут, так и сделаю", weights: { sb: 0, dev: 0, ceo: 0, acc: 3, mgr: 0 } },
      { text: "💡 Создадим для них отдельный UnitPay с другим названием", weights: { sb: 0, dev: 0, ceo: 0, acc: 0, mgr: 3 } },
      { text: "😶 Я тут вообще причём?", weights: { sb: 0, dev: 3, ceo: 0, acc: 0, mgr: 0 } },
    ]
  },
  {
    text: "Чем тебе больше всего нравится заниматься?",
    image: "assets/q5.jpg",
    answers: [
      { text: "💻 Писать код", weights: { sb: 0, dev: 3, ceo: 0, acc: 0, mgr: 0 } },
      { text: "🚀 Приносить новые идеи и ставить задачи", weights: { sb: 0, dev: 0, ceo: 0, acc: 0, mgr: 3 } },
      { text: "🤝 Общаться с мерчантами и партнёрами", weights: { sb: 0, dev: 0, ceo: 0, acc: 3, mgr: 0 } },
      { text: "🔒 Всех проверять", weights: { sb: 3, dev: 0, ceo: 0, acc: 0, mgr: 0 } },
      { text: "🌀 Делать всё подряд", weights: { sb: 0, dev: 0, ceo: 3, acc: 0, mgr: 0 } },
    ]
  },
  {
    text: "Кто из Смешариков больше подходит тебе по вайбу?",
    image: "assets/q6.webp",
    answers: [
      { text: "Совунья", weights: { sb: 3, dev: 0, ceo: 0, acc: 0, mgr: 0 } },
      { text: "Бараш", weights: { sb: 3, dev: 0, ceo: 0, acc: 0, mgr: 0 } },
      { text: "Нюша", weights: { sb: 0, dev: 0, ceo: 0, acc: 3, mgr: 0 } },
      { text: "Пин", weights: { sb: 0, dev: 3, ceo: 0, acc: 0, mgr: 0 } },
      { text: "Крош", weights: { sb: 0, dev: 3, ceo: 0, acc: 0, mgr: 0 } },
      { text: "Ёжик", weights: { sb: 0, dev: 0, ceo: 0, acc: 0, mgr: 3 } },
      { text: "Кар Карыч", weights: { sb: 0, dev: 0, ceo: 0, acc: 0, mgr: 3 } },
      { text: "Копатыч", weights: { sb: 0, dev: 0, ceo: 3, acc: 0, mgr: 0 } },
      { text: "Лосяш", weights: { sb: 0, dev: 0, ceo: 3, acc: 0, mgr: 0 } },
    ]
  },
  {
    text: "Ходишь ли ты в офис?",
    image: "assets/q7.jpg",
    answers: [
      { text: "🏠 Нет, мне и на удалёнке хорошо", weights: { sb: 0, dev: 3, ceo: 0, acc: 0, mgr: 0 } },
      { text: "🏢 Да, 5 дней в неделю я в офисе", weights: { sb: 0, dev: 0, ceo: 3, acc: 0, mgr: 0 } },
      { text: "⚡ Я вообще 7/0: и в офисе и не в офисе, всегда работаю", weights: { sb: 0, dev: 0, ceo: 0, acc: 0, mgr: 3 } },
      { text: "🗓 Я 2/2 прихожу", weights: { sb: 0, dev: 0, ceo: 0, acc: 3, mgr: 0 } },
      { text: "🤔 Иногда прихожу", weights: { sb: 3, dev: 0, ceo: 0, acc: 0, mgr: 0 } },
    ]
  },
  {
    text: "Выбери смайлик:",
    image: null,
    answers: [
      { text: "🤐", weights: { sb: 3, dev: 0, ceo: 0, acc: 0, mgr: 0 } },
      { text: "🤨", weights: { sb: 0, dev: 0, ceo: 0, acc: 3, mgr: 0 } },
      { text: "😁", weights: { sb: 0, dev: 0, ceo: 0, acc: 0, mgr: 3 } },
      { text: "😴", weights: { sb: 0, dev: 0, ceo: 3, acc: 0, mgr: 0 } },
      { text: "🙂", weights: { sb: 0, dev: 3, ceo: 0, acc: 0, mgr: 0 } },
    ]
  },
  {
    text: "Ты сломал(!) UnitPay. Что будешь делать?",
    image: "assets/q9.jpg",
    answers: [
      { text: "🏃 Сбегу", weights: { sb: 0, dev: 0, ceo: 3, acc: 0, mgr: 0 } },
      { text: "😭 Буду плакать", weights: { sb: 0, dev: 0, ceo: 0, acc: 0, mgr: 3 } },
      { text: "🔨 Буду доламывать", weights: { sb: 0, dev: 0, ceo: 0, acc: 3, mgr: 0 } },
      { text: "🔧 Попробую починить", weights: { sb: 3, dev: 0, ceo: 0, acc: 0, mgr: 0 } },
      { text: "😇 Я ничего не ломал.", weights: { sb: 0, dev: 3, ceo: 0, acc: 0, mgr: 0 } },
    ]
  },
  {
    text: "У тебя есть кнопка «Удалить UnitPay». Нажмёшь?)",
    image: "assets/q10.jpg",
    answers: [
      { text: "😈 Да", weights: { sb: 0, dev: 2, ceo: 2, acc: 2, mgr: 0 } },
      { text: "😤 Нет", weights: { sb: 3, dev: 0, ceo: 0, acc: 0, mgr: 3 } },
    ]
  },
];

const ROLES = {
  sb: {
    name: "Служба безопасности",
    emoji: "🔒",
    description: "Ты видишь угрозу там, где другие видят кофе-брейк. Каждый новый сотрудник — потенциальная утечка, каждый флешнакопитель — бомба замедленного действия. UnitPay существует только потому, что ты ещё не ушёл домой. Коллеги немного боятся тебя. Это правильно.",
    photo: "assets/role-sb.jpg"
  },
  dev: {
    name: "Разработка",
    emoji: "💻",
    description: "Ты пишешь код в 2 ночи и называешь это 'продуктивным вечером'. На совещаниях думаешь о рефакторинге. UnitPay упал? Ты уже смотришь логи. UnitPay сломался? Ты его не ломал — и это статистически невозможно доказать.",
    photo: "assets/role-dev.jpg"
  },
  ceo: {
    name: "Директор",
    emoji: "👑",
    description: "Ты видишь картину целиком, пока все остальные смотрят в пиксели. Твоё любимое слово — 'стратегически'. Если UnitPay упал — ты уже поднял всех. Если кнопка «Удалить» — ты просто ушёл. Это тоже стратегия.",
    photo: "assets/role-ceo.jpg"
  },
  acc: {
    name: "Аккаунтинг",
    emoji: "💰",
    description: "Твоя настоящая роль — аккаунтинг. Если ты уже тут — поздравляю. Если нет... стоит задуматься.",
    photo: "assets/role-acc.jpg"
  },
  mgr: {
    name: "Менеджер",
    emoji: "📋",
    description: "Ты никогда не выключаешься. Ноутбук на корпоративе — это не странность, это необходимость. Ты одновременно в пяти чатах, приносишь идеи быстрее, чем их успевают реализовать, и ругаешься на всех кто виноват. UnitPay не удалишь никогда — ты же его и строишь.",
    photo: "assets/role-mgr.jpg"
  },
};
