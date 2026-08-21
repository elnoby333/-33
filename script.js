const bgMusic=document.getElementById("bgMusic");
const musicToggle=document.getElementById("musicToggle");
async function startMusic(){try{bgMusic.volume=.55;await bgMusic.play();musicToggle.textContent="🔊";}catch(e){musicToggle.textContent="🔇";}}
musicToggle.addEventListener("click",async()=>{if(bgMusic.paused){await startMusic();}else{bgMusic.pause();musicToggle.textContent="🔇";}});
const screens = document.querySelectorAll(".screen");
const hearts = document.getElementById("hearts");
const toast = document.getElementById("toast");
const typedText = document.getElementById("typedText");
const continueBtn = document.getElementById("continueBtn");

const message = `يمكن تكوني مش واخدة بالك...
بس وجودك في حياتي عمل فرق أكبر مما تتخيلي.

في ناس بنقابلهم وننساهم،
وفي ناس بنقابلهم ونفتكرهم،
وفي شخص واحد...
مجرد وجوده بيخلي اليوم نفسه مختلف.

وأنتِ بالنسبة لي من النوع الأخير. ❤️`;

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
}

function createHeart() {
  const heart = document.createElement("span");
  const symbols = ["❤", "♡", "💕", "✨", "💗"];
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random() * 20) + "px";
  heart.style.animationDuration = (5 + Math.random() * 6) + "s";
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 12000);
}

setInterval(createHeart, 450);

document.getElementById("startBtn").addEventListener("click", async () => {
  await startMusic();
  showScreen("question");
});

document.getElementById("noBtn").addEventListener("mouseenter", moveNoButton);
document.getElementById("noBtn").addEventListener("click", () => {
  showToast("هو إنتِ فاكرة إنك هتهربي كده؟ 😂❤️");
  moveNoButton();
});

function moveNoButton() {
  const btn = document.getElementById("noBtn");
  const x = (Math.random() - 0.5) * 180;
  const y = (Math.random() - 0.5) * 80;
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

document.getElementById("yesAnswer").addEventListener("click", () => {
  showScreen("message");
  typeMessage();
});

document.getElementById("maybeAnswer").addEventListener("click", () => {
  document.getElementById("hint").textContent =
    "خدي وقتك... بس أنا تقريبًا متأكد من الإجابة 🤭❤️";
});

let typedStarted = false;

function typeMessage() {
  if (typedStarted) return;
  typedStarted = true;
  let i = 0;
  typedText.textContent = "";

  const timer = setInterval(() => {
    typedText.textContent += message[i];
    i++;

    if (i >= message.length) {
      clearInterval(timer);
      setTimeout(() => continueBtn.classList.remove("hidden"), 500);
    }
  }, 28);
}

continueBtn.addEventListener("click", () => {
  showScreen("final");
  launchConfetti();
});

document.getElementById("againBtn").addEventListener("click", () => {
  typedStarted = false;
  continueBtn.classList.add("hidden");
  showScreen("welcome");
});

function launchConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const pieces = Array.from({ length: 130 }, () => ({
    x: canvas.width / 2 + (Math.random() - .5) * 80,
    y: canvas.height * .45,
    vx: (Math.random() - .5) * 11,
    vy: -Math.random() * 13 - 4,
    size: Math.random() * 7 + 3,
    rotation: Math.random() * 6,
    gravity: .25 + Math.random() * .15,
    life: 1
  }));

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += .12;
      p.life -= .008;

      if (p.life > 0 && p.y < canvas.height + 20) alive = true;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = ["#ff4f81", "#ffd166", "#ffffff", "#c77dff"][Math.floor(Math.random() * 4)];
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.7);
      ctx.restore();
    });

    if (alive) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  frame();
}

window.addEventListener("resize", () => {
  const canvas = document.getElementById("confetti");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
