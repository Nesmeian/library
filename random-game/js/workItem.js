export class WorkItem {
  constructor(gridElement) {
    this.workElement = document.createElement("div");
    this.workElement.classList.add("work-item");
    this.value = randValue();
    this.workElement.textContent = this.value;
    gridElement.append(this.workElement);
  }
  setXY(x, y) {
    this.x = x;
    this.y = y;
    this.workElement.style.setProperty("--x", x);
    this.workElement.style.setProperty("--y", y);
  }
}

function randValue() {
  if (Math.random() > 0.5) {
    return 4;
  } else {
    return 2;
  }
}
