class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.dots = this.add.group();
    this.fillGroup();
  }

  fillGroup() {
    for (let r = 0; r < config.rows; r++) {
      for (let c = 0; c < config.cols; c++) {
        this.dots.add(Dot.generateDot(this, r, c));
      }
    }
  }
}