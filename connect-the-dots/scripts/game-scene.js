class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.dots = new Dots(this);
  }

  update() {
    const activeDot = this.dots.children.entries.find((dot) => dot.isActive);
    if (activeDot) {
      activeDot.startDrawingLine();
    }
  }
}