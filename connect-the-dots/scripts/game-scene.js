class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.dots = new Dots(this);
    this.input.on('gameobjectdown', (pointer, gameObject) => this.dots.startDrawingLine(gameObject));
    this.input.on('pointerup', this.dots.stopDrawingLine, this.dots);
    this.input.on('gameobjectover', (pointer, gameObject) => this.dots.markDot(gameObject));
  }

  update() {
    this.dots.updateLine();
  }
}