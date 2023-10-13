export class WorkItem {
  constructor(gridElement) {
    this.workElement = document.createElement("div");
    this.workElement.classList.add("work-item");
    this.setValue(randValue());
    gridElement.append(this.workElement);
  }
  setXY(x, y) {
    this.x = x;
    this.y = y;
    this.workElement.style.setProperty("--x", x);
    this.workElement.style.setProperty("--y", y);
  }
  setValue(value) {
    this.value = value;
    this.workElement.textContent = this.value;
    const bgLightness = 100 - Math.log2(value) * 9;
    this.workElement.style.setProperty("--bg-lightness", `${bgLightness}%`);
    this.workElement.style.setProperty(
      "--text-lightness",
      `${bgLightness < 50 ? 90 : 10}%`
    );
  }
}

function randValue() {
  if (Math.random() > 0.5) {
    return 4;
  } else {
    return 2;
  }
}
