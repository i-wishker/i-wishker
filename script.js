const board = document.getElementById("board");
const status = document.getElementById("status");
const reset = document.getElementById("reset");

let cells = [];
let currentPlayer = "❌";
let gameOver = false;

function createBoard() {
  board.innerHTML = "";
  cells = [];
  gameOver = false;
  currentPlayer = "❌";
  status.textContent = "Current Player: " + currentPlayer;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick, { once: true });
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(e) {
  const cell = e.target;
  cell.textContent = currentPlayer;
  if (currentPlayer === "⭕") cell.classList.add("O");

  if (checkWin()) {
    status.textContent = `${currentPlayer} wins! 🎉`;
    gameOver = true;
    return;
  }

  if (cells.every(c => c.textContent !== "")) {
    status.textContent = "Draw! 😐";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
  status.textContent = "Current Player: " + currentPlayer;
}

function checkWin() {
  const combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return combos.some(([a,b,c]) =>
    cells[a].textContent &&
    cells[a].textContent === cells[b].textContent &&
    cells[a].textContent === cells[c].textContent
  );
}

reset.addEventListener("click", createBoard);

createBoard();
