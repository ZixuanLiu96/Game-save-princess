class Fruits {
  constructor(gameScreen, round) {
    this.gameScreen = gameScreen;
    this.round = round;
    this.top = -10;
    this.height = 120;
    this.width = 120;
    this.timerId;
    this.left = Math.floor(
      Math.random() * (this.gameScreen.offsetWidth - this.width - 50 - 200) +
        200
    );
    this.element = document.createElement("img");
    this.imgUrl = [
      "./images/apple.png",
      "./images/apple.png",
      "./images/grape.png",
      "./images/orange.png",
      "./images/orange.png",
      "./images/pear.png",
      "./images/pear.png",
      "./images/pumpkin.png",
      "./images/pumpkin.png",
      "./images/skull.png",
      "./images/skull.png",
      "./images/skull.png",
      "./images/skull.png",
      "./images/skull.png",
      "./images/skull.png",
    ];
    this.random = Math.floor(Math.random() * this.imgUrl.length);
    this.element.src = this.imgUrl[this.random];
    this.element.style.position = "absolute";

    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.top += this.round + 6;

    // console.log(this.top);
    this.updatePosition();
    // console.log(this.top, this.left);

    // console.log("window", window.innerHeight);
    // console.log("screen", this.gameScreen.style.height);
    if (this.top < window.innerHeight) {
      requestAnimationFrame(() => this.move());
    } else {
      this.element.remove();
    }
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }
}
