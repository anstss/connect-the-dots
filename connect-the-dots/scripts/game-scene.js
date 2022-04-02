class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.dots = new Dots(this);
    this.input.on('gameobjectdown', (pointer, gameObject) => this.startDrawingLine(gameObject));
    this.input.on('pointerup', this.stopDrawingLine, this);
    this.input.on('gameobjectover', (pointer, gameObject) => this.markDot(gameObject));
  }

  startDrawingLine(dot) {
    this.activeDot = dot;
    this.activeDot.isActive = true;
    this.activeDot.isMarked = true;
    this.activeDot.connector = new Connector(this, this.activeDot.x, this.activeDot.y, game.input.activePointer.x, game.input.activePointer.y, this.activeDot.fillColor);
  }

  stopDrawingLine() {
    if (this.activeDot) {
      this.activeDot.isActive = false;
      this.activeDot.connector.x2 = this.activeDot.x;
      this.activeDot.connector.y2 = this.activeDot.y;
      this.activeDot.connector.redraw();
    }
  }

  createDotConnection(newDot) {
    const connectionAllowed = this.connectionAllowed(this.activeDot, newDot);
    if (this.activeDot && connectionAllowed) {
      this.activeDot.isActive = false;
      this.activeDot.connector.x2 = newDot.x;
      this.activeDot.connector.y2 = newDot.y;
      this.activeDot.connector.redraw();
      this.startDrawingLine(newDot);
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
    if (game.input.activePointer.isDown && !dot.isMarked && this.activeDot) {
      this.createDotConnection(dot);
    }
  }

  connectionAllowed(prevDot, currentDot) {
    const allowedColor = prevDot.fillColor === currentDot.fillColor;
    const allowedDirections = prevDot.x === currentDot.x || prevDot.y === currentDot.y;
    const allowedAxisOffset = prevDot.margin + config.dotRadius * 2;
    const allowedX = currentDot.x === prevDot.x + allowedAxisOffset || currentDot.x === prevDot.x - allowedAxisOffset;
    const allowedY = currentDot.y === prevDot.y + allowedAxisOffset || currentDot.y === prevDot.y - allowedAxisOffset;
    return (allowedColor && allowedX || allowedColor && allowedY) && allowedDirections;
  }

  update() {
    this.updateLine();
  }
}