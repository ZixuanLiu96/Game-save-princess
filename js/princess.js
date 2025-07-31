class Princess {
  constructor(gameScreen, top, left, score) {
    this.gameScreen = gameScreen;
    this.top = top;
    this.left = left;
    this.height = 200;
    this.width = 200;
    this.score = score;
    this.element = document.createElement("img");
    this.element.style.position = "absolute";
    this.element.src = "./images/princess.png";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }
}
