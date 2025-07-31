window.onload = function () {
  const gameStartBtn = document.querySelector(".start-btn");
  const howToPlayBtn = document.querySelector(".instruction-btn");
  const backBtn = document.querySelector(".back-btn");
  const restarts = document.querySelectorAll(".restart-btn");
  const save = document.querySelector(".save-btn");
  const myReturn = document.querySelector(".return-btn");
  const music = document.querySelector("#bg-music");
  const gameOverSound = document.querySelector("#game-over-sound");
  const gameWinSound = document.querySelector("#game-win-sound");
  const game = new Game();

  gameStartBtn.addEventListener("click", startGame);
  howToPlayBtn.addEventListener("click", () => {
    document.querySelector(".game-start").style.display = "none";
    document.querySelector(".instruction").style.display = "block";
  });

  backBtn.addEventListener("click", () => {
    document.querySelector(".game-start").style.display = "block";
    document.querySelector(".instruction").style.display = "none";
  });

  window.addEventListener("keydown", handleKeyDown);

  restarts.forEach((restart) => {
    restart.addEventListener("click", () => {
      document.querySelector(".game-start").style.display = "block";
      if (game.gameIsOver) {
        document.querySelector(".game-over").style.display = "none";
        gameOverSound.pause();
        gameOverSound.currentTime = 0;
        music.play();
        game.end();
      } else if (game.isWin) {
        document.querySelector(".game-win").style.display = "none";
        game.end();
        gameWinSound.pause();
        gameWinSound.currentTime = 0;
        music.play();
      }
    });
  });

  save.addEventListener("click", () => {
    game.enterSubgame();
  });

  myReturn.addEventListener("click", () => {
    game.leaveSubGame();
  });

  function startGame() {
    console.log("game start");
    game.start();
    music.play();
  }

  function handleKeyDown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      // Update player's directionX and directionY based on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.animal.directionX = -25;
          game.animal.directionY = 0;
          break;
        case "ArrowUp":
          game.animal.directionY = -25;
          game.animal.directionX = 0;
          break;
        case "ArrowRight":
          game.animal.directionX = 25;
          game.animal.directionY = 0;
          break;
        case "ArrowDown":
          game.animal.directionY = 25;
          game.animal.directionX = 0;
          break;
      }
      requestAnimationFrame(() => game.animal.move());
    }
  }
};
