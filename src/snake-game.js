import {
  GRID_SIZE,
  createInitialState,
  queueDirection,
  stepGame,
  togglePause,
} from "./snake-logic.js";

const TICK_MS = 140;
const boardElement = document.querySelector("#board");
const scoreElement = document.querySelector("#score");
const statusElement = document.querySelector("#status");
const restartButton = document.querySelector("#restart-button");
const controlButtons = document.querySelectorAll("[data-direction]");

let state = createInitialState();

const cells = [];
for (let index = 0; index < GRID_SIZE * GRID_SIZE; index += 1) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.setAttribute("role", "gridcell");
  boardElement.appendChild(cell);
  cells.push(cell);
}

function render() {
  for (const cell of cells) {
    cell.className = "cell";
  }

  for (const segment of state.snake) {
    getCell(segment.x, segment.y).classList.add("snake");
  }

  if (!state.isGameOver) {
    getCell(state.food.x, state.food.y).classList.add("food");
  }

  scoreElement.textContent = String(state.score);
  statusElement.textContent = state.isGameOver
    ? "Game over"
    : state.isPaused
      ? "Paused"
      : "Running";
}

function getCell(x, y) {
  return cells[y * GRID_SIZE + x];
}

function restart() {
  state = createInitialState();
  render();
}

function handleDirectionChange(direction) {
  state = {
    ...state,
    queuedDirection: queueDirection(state.direction, direction),
  };
}

function handleKeydown(event) {
  const keyMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    w: "up",
    a: "left",
    s: "down",
    d: "right",
    W: "up",
    A: "left",
    S: "down",
    D: "right",
  };

  if (event.code === "Space") {
    event.preventDefault();
    state = togglePause(state);
    render();
    return;
  }

  const direction = keyMap[event.key];
  if (!direction) {
    return;
  }

  event.preventDefault();
  handleDirectionChange(direction);
}

document.addEventListener("keydown", handleKeydown);
restartButton.addEventListener("click", restart);

for (const button of controlButtons) {
  button.addEventListener("click", () => {
    handleDirectionChange(button.dataset.direction);
  });
}

setInterval(() => {
  state = stepGame(state);
  render();
}, TICK_MS);

render();
