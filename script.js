const questions = [
  { type: "text", content: "Apa hobi favoritmu?", logo: "logo.png" },
  {
    type: "text",
    content: "Ceritakan pengalaman terbaikmu di sekolah.",
    logo: "logo.png",
  },
  { type: "text", content: "Apa cita-cita kamu?", logo: "logo.png" },
  { type: "video", content: "data_video/pertanyaan1.mp4", logo: "logo.png" },
  {
    type: "text",
    content: "Siapa sosok yang paling kamu kagumi?",
    logo: "logo.png",
  },
  {
    type: "text",
    content: "Kalau kamu bisa pergi ke mana pun, kamu mau ke mana?",
    logo: "logo.png",
  },
  { type: "video", content: "data_video/pertanyaan2.mp4", logo: "logo.png" },
  {
    type: "text",
    content: "Apa buku atau film yang menginspirasimu?",
    logo: "logo.png",
  },
  {
    type: "text",
    content: "Kalau bisa punya kekuatan super, kamu ingin bisa apa?",
    logo: "logo.png",
  },
  {
    type: "text",
    content: "Apa kenangan masa kecil yang paling kamu ingat?",
    logo: "logo.png",
  },
];

const gridContainer = document.getElementById("question-grid");
const questionContent = document.getElementById("question-content");
const questionLogo = document.getElementById("question-logo");
const questionVideo = document.getElementById("question-video");
const spinBtn = document.getElementById("spin-btn");
const spinSound = document.getElementById("spin-sound");

gridContainer.style.display = "none";

function revealGridAfterSound() {
  spinSound.play();
  setTimeout(() => {
    gridContainer.style.display = "grid";
    buildGrid();
  }, 3000);
}

function buildGrid() {
  questions.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.dataset.index = index;
    card.innerHTML = `<img src="${
      q.logo
    }" alt="logo pertanyaan"><div>Pertanyaan ${index + 1}</div>`;
    gridContainer.appendChild(card);
  });
}

function spinQuestion() {
  let availableIndexes = [
    ...gridContainer.querySelectorAll(".question-card:not(.disabled)"),
  ].map((el) => parseInt(el.dataset.index));

  if (availableIndexes.length === 0) {
    alert("Semua pertanyaan sudah dipilih!");
    return;
  }

  const randomIndex =
    availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
  const selected = questions[randomIndex];

  questionLogo.src = selected.logo;

  if (selected.type === "text") {
    questionContent.textContent = selected.content;
    questionContent.hidden = false;
    questionVideo.hidden = true;
    questionVideo.pause();
  } else {
    questionContent.hidden = true;
    questionVideo.src = selected.content;
    questionVideo.hidden = false;
    questionVideo.play();
  }

  const selectedCard = gridContainer.querySelector(
    `.question-card[data-index="${randomIndex}"]`
  );
  selectedCard.classList.add("disabled");
}

spinBtn.addEventListener("click", spinQuestion);
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    spinQuestion();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  revealGridAfterSound();
});
