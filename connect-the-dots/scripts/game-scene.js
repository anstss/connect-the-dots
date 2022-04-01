class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.dots = new Dots(this);
    this.connector = new Connector(this, 0, 0);
  }

  update() {
    // this.dots.children.entries.forEach((dot) => dot.startDrawingLine());
  }
}