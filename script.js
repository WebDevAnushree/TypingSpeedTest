// ── Sample Texts ────────────────────────────────────────────────────────────
const TEXTS = [
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump.",
  "JavaScript is a lightweight, interpreted programming language with first-class functions. It is most well-known as the scripting language for web pages.",
  "To be or not to be, that is the question. Whether tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
  "Functions are the fundamental building block of any application in JavaScript. They are JavaScript procedures — a set of statements that performs a task or calculates a value.",
  "The only way to learn a new programming language is by writing programs in it. Practice every day and you will see improvement in your skills.",
  "In the beginning was the code, and the code was with the developer, and the developer was with the coffee. And thus all great software was born.",
  "Arrays are list-like objects whose prototype has methods to perform traversal and mutation operations. Neither the length of an array nor the types of its elements are fixed.",
];

// ── State ────────────────────────────────────────────────────────────────────
let targetText = '';
let startTime  = null;
let timer      = null;
let duration   = 15;
let timeLeft   = 15;
let totalTyped = 0;
let started    = false;

// ── Duration Selector ────────────────────────────────────────────────────────
function setDur(d, btn) {
  duration = d;
  document.querySelectorAll('.dur-btn').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  resetTest();
}

// ── Reset / New Test ─────────────────────────────────────────────────────────
function resetTest() {
  clearInterval(timer);

  started    = false;
  startTime  = null;
  timeLeft   = duration;
  totalTyped = 0;

  // Pick a random passage
  targetText = TEXTS[Math.floor(Math.random() * TEXTS.length)];

  // Reset input
  const input = document.getElementById('typingInput');
  input.value    = '';
  input.disabled = false;
  input.focus();

  // Reset stat displays
  document.getElementById('wpmVal').textContent  = '0';
  document.getElementById('accVal').textContent  = '100%';
  document.getElementById('timeVal').textContent = duration + 's';
  document.getElementById('charVal').textContent = '0';
  document.getElementById('timeStat').classList.remove('active');

  renderText('');
}

// ── Render Highlighted Text ──────────────────────────────────────────────────
function renderText(typed) {
  const display = document.getElementById('textDisplay');
  let html = '';

  for (let i = 0; i < targetText.length; i++) {
    let cls = 'pending';

    if (i < typed.length) {
      cls = typed[i] === targetText[i] ? 'correct' : 'wrong';
    } else if (i === typed.length) {
      cls = 'active'; // blinking cursor position
    }

    const ch = targetText[i] === ' ' ? '&nbsp;' : escHtml(targetText[i]);
    html += `<span class="char ${cls}">${ch}</span>`;
  }

  display.innerHTML = html;
}

// ── Live Stats Update ────────────────────────────────────────────────────────
function updateStats(typed) {
  const elapsed      = startTime ? (Date.now() - startTime) / 1000 / 60 : 0;
  const correctChars = [...typed].filter((c, i) => c === targetText[i]).length;
  const wpm          = elapsed > 0 ? Math.round((correctChars / 5) / elapsed) : 0;
  const acc          = typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;

  document.getElementById('wpmVal').textContent  = wpm;
  document.getElementById('accVal').textContent  = acc + '%';
  document.getElementById('charVal').textContent = correctChars;
}

// ── Input Handler ────────────────────────────────────────────────────────────
document.getElementById('typingInput').addEventListener('input', function () {
  const typed = this.value;

  // Start timer on first keystroke
  if (!started && typed.length > 0) {
    started   = true;
    startTime = Date.now();

    timer = setInterval(() => {
      timeLeft--;
      document.getElementById('timeVal').textContent = timeLeft + 's';
      document.getElementById('timeStat').classList.add('active');

      if (timeLeft <= 0) {
        clearInterval(timer);
        this.disabled = true;
        showResults(typed);
      }
    }, 1000);
  }

  totalTyped = Math.max(totalTyped, typed.length);
  renderText(typed);
  updateStats(typed);

  // Finish early if full text typed
  if (typed.length >= targetText.length) {
    clearInterval(timer);
    this.disabled = true;
    showResults(typed);
  }
});

// ── Show Results ─────────────────────────────────────────────────────────────
function showResults(typed) {
  const elapsed      = startTime ? (Date.now() - startTime) / 1000 / 60 : duration / 60;
  const correctChars = [...typed].filter((c, i) => c === targetText[i]).length;
  const wpm          = Math.round((correctChars / 5) / Math.max(elapsed, 0.01));
  const acc          = typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;
  const errCount     = typed.length - correctChars;

  document.getElementById('resWpm').textContent    = wpm;
  document.getElementById('resAcc').textContent    = acc + '%';
  document.getElementById('resChars').textContent  = correctChars;
  document.getElementById('resErrors').textContent = errCount;

  document.getElementById('resGrade').textContent =
    wpm >= 100 ? '🏆 Blazing fast! You\'re a typing god!'  :
    wpm >= 70  ? '🚀 Excellent speed!'                      :
    wpm >= 50  ? '✅ Good — above average!'                 :
    wpm >= 30  ? '📈 Getting there, keep going!'            :
                 '💪 Practice makes perfect!';

  document.getElementById('resultsOverlay').classList.add('show');
}

// ── Close Results ─────────────────────────────────────────────────────────────
function closeResults() {
  document.getElementById('resultsOverlay').classList.remove('show');
}

// ── Utility ──────────────────────────────────────────────────────────────────
function escHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ── Init ─────────────────────────────────────────────────────────────────────
resetTest();
