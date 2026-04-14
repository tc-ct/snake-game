import test from "node:test";
import assert from "node:assert/strict";

import {
  GRID_SIZE,
  createInitialState,
  placeFood,
  queueDirection,
  stepGame,
  togglePause,
} from "../src/snake-logic.js";

test("queueDirection ignores direct reversal", () => {
  assert.equal(queueDirection("right", "left"), "right");
  assert.equal(queueDirection("up", "down"), "up");
});

test("stepGame moves snake forward", () => {
  const state = createInitialState(() => 0);
  const nextState = stepGame(state, () => 0);

  assert.deepEqual(nextState.snake[0], { x: 3, y: 8 });
  assert.equal(nextState.snake.length, state.snake.length);
  assert.equal(nextState.score, 0);
});

test("stepGame grows snake and increments score when food is eaten", () => {
  const state = {
    snake: [
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ],
    direction: "right",
    queuedDirection: "right",
    food: { x: 3, y: 2 },
    score: 0,
    isGameOver: false,
    isPaused: false,
  };

  const nextState = stepGame(state, () => 0);

  assert.equal(nextState.score, 1);
  assert.equal(nextState.snake.length, 4);
  assert.deepEqual(nextState.snake[0], { x: 3, y: 2 });
  assert.notDeepEqual(nextState.food, { x: 3, y: 2 });
});

test("stepGame ends the game on wall collision", () => {
  const state = {
    snake: [{ x: GRID_SIZE - 1, y: 0 }],
    direction: "right",
    queuedDirection: "right",
    food: { x: 0, y: 0 },
    score: 0,
    isGameOver: false,
    isPaused: false,
  };

  const nextState = stepGame(state, () => 0);

  assert.equal(nextState.isGameOver, true);
});

test("stepGame ends the game on self collision", () => {
  const state = {
    snake: [
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 1, y: 1 },
    ],
    direction: "left",
    queuedDirection: "down",
    food: { x: 0, y: 0 },
    score: 0,
    isGameOver: false,
    isPaused: false,
  };

  const nextState = stepGame(state, () => 0);

  assert.equal(nextState.isGameOver, true);
});

test("placeFood never chooses an occupied cell", () => {
  const snake = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ];

  const food = placeFood(snake, 2, () => 0);

  assert.deepEqual(food, { x: 0, y: 1 });
});

test("togglePause flips pause state unless game is over", () => {
  const initial = createInitialState(() => 0);
  assert.equal(togglePause(initial).isPaused, true);
  assert.equal(togglePause({ ...initial, isGameOver: true }).isPaused, false);
});
