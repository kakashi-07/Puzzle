alert("JS LOADED");
const IMAGE_SRC = "https://www.dropbox.com/scl/fi/mnv8my1mslchjaoqfjzh9/oo.png?rlkey=j3h3oznj0u1gystzi9wtbm3vo&st=4kz6r18x&dl=1";
const CORRECT_PASSWORD = "nishkala";

const ROWS = 5;
const COLS = 5;
const TOTAL = ROWS * COLS;

const board = document.getElementById("board");
const piecesContainer = document.getElementById("pieces");
const message = document.getElementById("message");
const bgm = document.getElementById("bgm");

let draggedPiece = null;
let placedCount = 0;
let musicStarted = false;

/* 🔓 Unlock */
function unlockGame() {
  const input = document.getElementById("passwordInput").value;
  const error = document.getElementById("errorMsg");

  if (input === CORRECT_PASSWORD) {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("gameContent").style.display = "block";
  } else {
    error.textContent = "Wrong password 💔";
  }
}

/* 🧩 Board */
for (let i = 0; i < TOTAL; i++) {
  const slot = document.createElement("div");
  slot.className = "slot";
  slot.dataset.index = i;
  slot.addEventListener("dragover", e => e.preventDefault());
  slot.addEventListener("drop", dropPiece);
  board.appendChild(slot);
}

/* 🧩 Pieces */
let pieces = [];

for (let i = 0; i < TOTAL; i++) {
  const piece = document.createElement("div");
  piece.className = "piece";
  piece.draggable = true;
  piece.dataset.index = i;

  const x = i % COLS;
  const y = Math.floor(i / COLS);

  piece.style.backgroundImage = `url(${IMAGE_SRC})`;
  piece.style.backgroundPosition =
    `${(x * 100) / (COLS - 1)}% ${(y * 100) / (ROWS - 1)}%`;

  piece.addEventListener("dragstart", dragStart);
  pieces.push(piece);
}

pieces.sort(() => Math.random() - 0.5);
pieces.forEach(p => piecesContainer.appendChild(p));

function dragStart() {
  draggedPiece = this;
  if (!musicStarted) {
    bgm.play().catch(() => {});
    musicStarted = true;
  }
}

function dropPiece() {
  if (!draggedPiece) return;
  if (this.dataset.index === draggedPiece.dataset.index) {
    this.appendChild(draggedPiece);
    draggedPiece.classList.add("locked");
    draggedPiece.draggable = false;
    draggedPiece = null;
    placedCount++;

    if (placedCount === TOTAL) {
      message.style.display = "block";
    }
  }
}
