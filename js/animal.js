class Animal {
  constructor(gameScreen, left, top, height, width, imgUrl) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.height = height;
    this.width = width;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src = imgUrl;
    this.element.style.position = "absolute";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    // console.log(111);

    this.left += this.directionX;
    this.top += this.directionY;
    if (this.top > 560) this.top = 560;
    if (this.left < 200) this.left = 200;
    if (this.left > this.gameScreen.offsetWidth - this.element.width - 50)
      this.left = this.gameScreen.offsetWidth - this.element.width - 50;
    if (this.top < 50) this.top = 50;

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }

  isCollection(fruit) {
    const animalRect = this.element.getBoundingClientRect();
    const fruitRect = fruit.element.getBoundingClientRect();
    // console.log("animal", animalRect);
    // console.log("fruit", fruitRect);

    if (
      fruitRect.bottom > animalRect.top + 150 &&
      fruitRect.right > animalRect.left + 80 &&
      fruitRect.left < animalRect.right - 80 &&
      fruitRect.top < animalRect.bottom - 80
    ) {
      // console.log("skull", fruit.element);
      if (fruit.imgUrl[fruit.random] === "./images/skull.png") {
      }
      fruit.element.remove();
      return true;
    } else return false;
  }
}
