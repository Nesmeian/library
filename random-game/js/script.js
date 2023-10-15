import { playAudio } from "./audio.js";
import { result } from "./cell.js";
import { Grid } from "./grid.js";
import { WorkItem } from "./workItem.js";
const game = document.querySelector(".board");
const grid = new Grid(game);
const resulTable = JSON.parse(window.localStorage.getItem("results"));
if (!localStorage.hasOwnProperty("results")) {
  localStorage.setItem("results", JSON.stringify([]));
}

grid.getRandomPlace().linkTile(new WorkItem(game));
grid.getRandomPlace().linkTile(new WorkItem(game));

setupInputOnce();

function setupInputOnce() {
  window.addEventListener("keydown", handleInput, { once: true });
}

async function handleInput(event) {
  switch (event.key) {
    case "ArrowUp":
      if (!canMoveUp()) {
        setupInputOnce();
        return;
      }
      playAudio();
      console.log(resulTable[5]);
      await moveUp();
      break;
    case "ArrowDown":
      if (!canMoveDown()) {
        setupInputOnce();
        return;
      }
      playAudio();
      await moveDown();
      break;
    case "ArrowLeft":
      if (!canMoveLeft()) {
        setupInputOnce();
        return;
      }
      playAudio();
      await moveLeft();
      break;
    case "ArrowRight":
      if (!canMoveRight()) {
        setupInputOnce();
        return;
      }
      playAudio();
      await moveRight();
      break;
    default:
      setupInputOnce();
      return;
  }
  const newTile = new WorkItem(game);
  grid.getRandomPlace().linkTile(newTile);
  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
    await newTile.waitForAnimationEnd();
    resulTable.push(result);
    sorting(resulTable);
    localStorage.setItem("results", JSON.stringify(resulTable));
    alert("Try again");
    location.reload();
  }
  setupInputOnce();
}

async function moveUp() {
  await slideTiles(grid.cellsGroupedByColumn);
}

async function moveDown() {
  await slideTiles(grid.cellsGroupedByReversedColumn);
}

async function moveLeft() {
  await slideTiles(grid.cellsGroupedByRow);
}

async function moveRight() {
  await slideTiles(grid.cellsGroupedByReversedRow);
}
async function slideTiles(groupedCells) {
  const promises = [];

  groupedCells.forEach((group) => slideTilesInGroup(group, promises));
  await Promise.all(promises);
  grid.cells.forEach((cell) => {
    cell.hasTileForMerge() && cell.mergeTiles();
  });
}

function slideTilesInGroup(group, promises) {
  for (let i = 1; i < group.length; i++) {
    if (group[i].isEmpty()) {
      continue;
    }

    const cellWithTile = group[i];

    let targetCell;
    let j = i - 1;
    while (j >= 0 && group[j].canAccept(cellWithTile.linkedTile)) {
      targetCell = group[j];
      j--;
    }

    if (!targetCell) {
      continue;
    }

    promises.push(cellWithTile.linkedTile.waitForTransitionEnd());

    if (targetCell.isEmpty()) {
      targetCell.linkTile(cellWithTile.linkedTile);
    } else {
      targetCell.linkTileForMerge(cellWithTile.linkedTile);
    }

    cellWithTile.unlinkTile();
  }
}

function canMoveUp() {
  return canMove(grid.cellsGroupedByColumn);
}

function canMoveDown() {
  return canMove(grid.cellsGroupedByReversedColumn);
}

function canMoveLeft() {
  return canMove(grid.cellsGroupedByRow);
}

function canMoveRight() {
  return canMove(grid.cellsGroupedByReversedRow);
}

function canMove(groupedCells) {
  return groupedCells.some((group) => canMoveInGroup(group));
}

function canMoveInGroup(group) {
  return group.some((cell, index) => {
    if (index === 0) {
      return false;
    }

    if (cell.isEmpty()) {
      return false;
    }

    const targetCell = group[index - 1];
    return targetCell.canAccept(cell.linkedTile);
  });
}

let visiblResult = document.querySelector(".result__count");
const resultTableDiv = document.querySelector(".results__table");
function sorting(arr) {
  return arr.sort((a, b) => b - a);
}

function showResult() {
  visiblResult.textContent = result;
}

function showResultTable() {
  resulTable.forEach((e) => {
    let value = e;
    e = document.createElement("div");
    e.classList.add("table__item");
    e.textContent = value;
    resultTableDiv.append(e);
  });
}

setInterval(() => showResult(), showResultTable(), 200);
