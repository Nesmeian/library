export class Cell {
  constructor(gridElement, x, y) {
    const workItem = document.createElement("div");
    workItem.classList.add("work-item");
    gridElement.append(workItem);
    this.x = x;
    this.y = y;
  }
}
