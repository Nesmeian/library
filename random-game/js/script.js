import { Grid } from "./grid.js";
import { WorkItem } from "./workItem.js";
const game = document.querySelector(".board");

const grid = new Grid(game);
grid.getRandomPlace().linkTile(new WorkItem(game));
grid.getRandomPlace().linkTile(new WorkItem(game));

setupInputOnce();

function setupInputOnce() {
  window.addEventListener("keydown", handleInput, { once: true });
}
function handleInput(event) {
  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    default:
      setupInputOnce();
      return;
  }
  const newTile = new WorkItem(game);
  grid.getRandomPlace().linkTile(newTile);

  setupInputOnce();
}

function moveUp() {
  slideTiles(grid.cellsGroupedByColumn);
}

function moveDown() {
  slideTiles(grid.cellsGroupedByReversedColumn);
}

function moveLeft() {
  slideTiles(grid.cellsGroupedByRow);
}

function moveRight() {
  slideTiles(grid.cellsGroupedByReversedRow);
}
function slideTiles(groupedCells) {
  const promise = [];
  groupedCells.forEach((group) => slideTilesInGroup(group, promise));
  grid.cells.forEach((cell) => {
    cell.hasTileForMerge() && cell.mergeTiles();
  });
}

function slideTilesInGroup(group, promise) {
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

    promise.push(cellWithTile.linkTileForMerge.waitForTransitionEnd());

    if (targetCell.isEmpty()) {
      targetCell.linkTile(cellWithTile.linkedTile);
    } else {
      targetCell.linkTileForMerge(cellWithTile.linkedTile);
    }

    cellWithTile.unlinkTile();
  }
}
