class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.dots = new Dots(this);
    this.input.on('gameobjectdown', (pointer, gameObject) => this.startDrawingLine(gameObject), this);
    this.input.on('pointerup', this.stopDrawingLine, this);
    this.input.on('gameobjectover', (pointer, gameObject) => this.markDot(gameObject), this);
  }

  startDrawingLine(dot) {
    this.activeDot = dot;
    this.activeDot.isActive = true;
    this.activeDot.isMarked = true;
    this.activeDot.connector = new Connector(this, this.activeDot.x, this.activeDot.y, game.input.activePointer.x, game.input.activePointer.y, this.activeDot.fillColor);
  }

  stopDrawingLine(dot) {
    console.log('stopDrawingLine')
    if (this.activeDot) {
      this.activeDot.isActive = false;
      this.activeDot.connector.x2 = dot.x;
      this.activeDot.connector.y2 = dot.y;
      this.activeDot.connector.redraw();
      this.startDrawingLine(dot);
    }
  }

  updateLine() {
    if (game.input.activePointer.isDown && this.activeDot && this.activeDot.isActive) {
      this.activeDot.connector.x2 = game.input.activePointer.x;
      this.activeDot.connector.y2 = game.input.activePointer.y;
      this.activeDot.connector.redraw();
    }
  }

  markDot(dot) {
    if (game.input.activePointer.isDown && !dot.isMarked) {
      this.stopDrawingLine(dot);
    }
  }

  update() {
    this.updateLine();
  }
}