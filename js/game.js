class Game {
  constructor() {
    this.gameStart = document.querySelector(".game-start");
    this.gameScreen = document.querySelector(".game-screen");
    this.gameOver = document.querySelector(".game-over");
    this.gameWin = document.querySelector(".game-win");
    this.body = document.body;
    this.animal = null;
    this.princess = null;
    this.platform = [];
    this.fruits = [];
    this.lives = 3;
    this.score = 0;
    this.timeId;
    this.fruitTimer;
    this.gameIsOver = false;
    this.isWin = false;
    this.gameLoopFrequency = 1000 / 60;
    this.fruitFrequency = 800;
    this.isSubGame = false;
    this.round = 0;
    this.gameTarget = [10, 20, 40, 70];
    this.time = 60;
  }

  start() {
    this.gameStart.style.display = "none";
    this.gameScreen.style.display = "block";
    this.lives = 3;
    this.score = 0;
    this.fruitFrequency = 800;
    this.round = 0;
    this.isWin = false;

    console.log("platform", this.platform);

    document.querySelector(".lives").innerHTML = `Lives: ${this.lives}`;
    document.querySelector(".score").innerHTML = `Score: ${this.score}`;
    document.querySelector(
      ".target"
    ).innerHTML = `Next target: ${this.gameTarget[0]}`;
    document.querySelector(".level").innerHTML = `Level: ${this.round + 1}`;
    document.querySelector(".platforms").style.display = "none";

    this.body.style.background = 'url("./images/background.png")';

    this.animal = new Animal(
      this.gameScreen,
      650,
      500,
      200,
      200,
      "./images/rabbit.png"
    );

    this.princess = new Princess(
      this.gameScreen,
      250,
      150,
      100,
      100,
      this.score
    );
    this.princess.element.style.display = "none";

    this.createPlatforms();

    this.timeId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);

    this.createFruits();
  }

  createFruits() {
    console.log(this.fruitFrequency);

    this.fruitTimer = setInterval(() => {
      const fruit = new Fruits(this.gameScreen, this.round);
      this.fruits.push(fruit);
      fruit.move();
    }, this.fruitFrequency);
  }

  createPlatforms() {
    const platform1 = new Platform(420, 300);
    const platform2 = new Platform(460, 420);
    const platform3 = new Platform(420, 540);
    const platform4 = new Platform(460, 660);
    const platform5 = new Platform(420, 780);
    this.platform = [platform1, platform2, platform3, platform4, platform5];
    this.platform.forEach((platform) => platform.hide());
  }
  gameLoop() {
    this.update();
  }

  update() {
    console.log("update");
    // this.animal.move();
    // console.log(this.fruits);

    this.fruits.forEach((fruit) => {
      if (this.animal.isCollection(fruit)) {
        if (fruit.imgUrl[fruit.random] === "./images/grape.png") {
          this.lives++;
          document.querySelector(".lives").innerHTML = `Lives: ${this.lives}`;
        }
        if (fruit.imgUrl[fruit.random] === "./images/skull.png") {
          this.lives--;
          document.querySelector(".lives").innerHTML = `Lives: ${this.lives}`;

          if (this.lives === 0) {
            this.gameIsOver = true;
            this.over();
          }
        } else {
          this.score++;
          document.querySelector(".score").innerHTML = `Score: ${this.score}`;
          this.subGame();
          // this.win();
        }
      }
    });
  }

  over() {
    this.update();
    if (this.gameIsOver) {
      this.gameScreen.style.display = "none";
      this.gameOver.style.display = "block";
      clearInterval(this.skullTimer);
      document.querySelector(".result").innerHTML = `Score: ${this.score}`;
    }
  }

  subGame() {
    if (
      this.score === 1 ||
      this.score === 2 ||
      this.score === 3 ||
      this.score === 4 ||
      (this.round === 4 && this.lives > 0 && this.time === 0)
    ) {
      clearInterval(this.fruitTimer);
      document.querySelector(".sub-game").style.display = `block`;
      // console.log("subgame", this.animal.element);
      this.animal.element.style.display = "none";
      this.fruits.forEach((fruit) => (fruit.element.style.display = "none"));
      this.round++;
    }
  }

  enterSubgame() {
    this.isSubGame = true;
    document.querySelector(".sub-game").style.display = "none";
    document.body.style.background = 'url("./images/river.jpg")';
    this.princess.element.style.display = "block";
    document.querySelector(".platforms").style.display = "block";

    // console.log(this.platform[this.round - 1]);

    setTimeout(() => {
      this.platform[this.round - 1].element.style.display = "block";
      setTimeout(() => {
        this.princess.top = this.platform[this.round - 1].top - 150;
        this.princess.left = this.platform[this.round - 1].left - 50;
        this.princess.move();
        this.win();
        console.log(this.princess.left);

        setTimeout(() => {
          if (this.isWin) {
            this.gameWin.style.display = "block";
            this.gameScreen.style.display = "none";
          } else document.querySelector(".back-game").style.display = "block";
        }, 800);
      }, 800);
    }, 800);
  }

  skipSkull() {
    this.fruitTimer = setInterval(() => {
      const fruit = new Fruits(this.gameScreen, this.round);

      if (fruit.imgUrl[fruit.random] === "./images/skull.png") {
        this.fruits.push(fruit);
        fruit.move();
      } else fruit.element.remove();
    }, this.fruitFrequency);
  }

  leaveSubGame() {
    this.isSubGame = false;
    this.princess.element.style.display = "none";
    document.querySelector(".platforms").style.display = "none";
    document.querySelector(".back-game").style.display = "none";
    document.body.style.background = 'url("./images/background.png")';
    this.animal.element.style.display = "block";
    document.querySelector(".level").innerHTML = `Level: ${this.round + 1}`;
    document.querySelector(".target").innerHTML = `Next target: ${
      this.gameTarget[this.round]
    }`;

    // if (this.round > this.gameTarget.length - 1)
    if (this.round === 4)
      document.querySelector(".target").innerHTML = `Time: 00:${this.time}`;
    // game.fruits.forEach((fruit) => (fruit.element.style.display = "block"));
    this.fruitFrequency -= 150;
    console.log(222222, this.fruitFrequency);

    if (this.round !== 4) {
      this.fruits = [];
      this.createFruits();
    }
    if (this.round === 4) {
      console.log(this.round);

      this.fruits = [];
      this.skipSkull();
      let timer = setInterval(() => {
        this.time--;
        document.querySelector(".target").innerHTML =
          this.time > 9 ? `Time: 00:${this.time}` : `Time: 00:0${this.time}`;
        if (this.lives === 0) {
          clearInterval(timer);
          this.over();
          this.end();
        }
        if (this.time === 0 && this.lives > 0) {
          clearInterval(timer);
          this.subGame();
        }
      }, 1000);
    }
  }

  win() {
    if (this.princess.left === 730) {
      this.isWin = true;
      document.querySelector(".back-game").style.display = "none";
    }
  }

  end() {
    clearInterval(this.timeId);
    clearInterval(this.fruitTimer);

    document.body.style.background = 'url("./images/background.png")';
    this.animal.element.remove();
    this.princess.element.remove();
    this.fruits.forEach((fruit) => fruit.element.remove());
    document.querySelector(".platforms").innerHTML = "";
    this.platform = [];
    this.fruits = [];
    this.time = 60;
  }
}
