class SubGame {
  constructor(score) {
    this.score = score;
    this.subGameScreen = document.querySelector(".subgame-screen");
    this.princess = null;
    this.platform = [];
    this.timeId;
    this.win = false;
  }

  start() {
    this.princess = new Princess(this.subGameScreen, 250, 150, this.score);

    const platform1 = new Platform(this.subGameScreen, 420, 300);
    const platform2 = new Platform(this.subGameScreen, 460, 420);
    const platform3 = new Platform(this.subGameScreen, 420, 540);
    const platform4 = new Platform(this.subGameScreen, 460, 660);
    const platform5 = new Platform(this.subGameScreen, 420, 780);
    this.platform = [platform1, platform2, platform3, platform4, platform5];
  }
}
