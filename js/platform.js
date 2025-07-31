class Platform {
  constructor(top, left) {
    this.platforms = document.querySelector(".platforms");
    this.left = left;
    this.top = top;
    this.height = 100;
    this.width = 100;
    this.element = document.createElement("img");
    // this.div = document.createElement("div");
    // this.div.classList.add('platforms')
    this.element.src = "./images/rock.png";
    this.element.style.position = "absolute";
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.platforms.appendChild(this.element);
  }

  hide() {
    this.element.style.display = "none";
  }

  show() {
    setTimeout(() => {
      this.element.classList.add("active");
    }, 5000);
  }
}
