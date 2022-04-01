class Dots extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.init();
  }

  init() {
    this.dotCounter = 0;
    this.fillGroup();
  }

  fillGroup() {
    for (let r = 0; r < config.rows; r++) {
      for (let c = 0; c < config.cols; c++) {
        this.add(Dot.generateDot(this.scene, r, c));
      }
    }
  }
}