export class Cell {
  constructor(gridElement, x, y) {
    const item = document.createElement("div");
    item.classList.add("item");
    gridElement.append(item);
    this.x = x;
    this.y = y;
  }
  linkWorkItem(workItem) {
    workItem.setXY(this.x, this.y);
    this.linkWorkItem = workItem;
  }
  isEmpty() {
    return !this.linkedWorkItem;
  }
}
