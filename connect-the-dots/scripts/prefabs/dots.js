class Dots extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.init();
  }

  init() {
    this.fillGroup();
    this.markedDots = [];
  }

  fillGroup() {
    for (let r = 0; r < config.rows; r++) {
      for (let c = 0; c < config.cols; c++) {
        this.add(Dot.generateDot(this.scene, r, c));
      }
    }
  }

  startDrawingLine(dot) {
    this.markedDots.push(dot);
    this.activeDot = dot;
    this.activeDot.isActive = true;
    this.activeDot.isMarked = true;
    this.activeDot.connector = new Connector(this.scene, this.activeDot.x, this.activeDot.y, game.input.activePointer.x, game.input.activePointer.y, this.activeDot.fillColor);
  }

  stopDrawingLine() {
    if (this.activeDot) {
      this.activeDot.isActive = false;
      this.activeDot.connector.x2 = this.activeDot.x;
      this.activeDot.connector.y2 = this.activeDot.y;
      this.activeDot.connector.redraw();
    }
    if (this.markedDots.length > 1) {
      this.markedDots.forEach((dot) => {
        dot.connector.graphics.clear();
        dot.destroy();
      });
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
    if (game.input.activePointer.isDown && dot.isActive && this.markedDots.length > 1) {
      this.unmarkDot(dot);
    } else if (game.input.activePointer.isDown && !dot.isMarked && this.activeDot) {
      this.createDotConnection(dot);
    }
  }

  unmarkDot(dot) {
    dot.isActive = false;
    dot.isMarked = false;
    dot.connector.graphics.destroy();
    this.markedDots.pop();
    this.activeDot = this.markedDots[this.markedDots.length - 1];
    this.activeDot.isActive = true;
    this.updateLine();
  }

  connectionAllowed(prevDot, currentDot) {
    const allowedColor = prevDot.fillColor === currentDot.fillColor;
    const allowedDirections = prevDot.x === currentDot.x || prevDot.y === currentDot.y;
    const allowedAxisOffset = prevDot.margin + config.dotRadius * 2;
    const allowedX = currentDot.x === prevDot.x + allowedAxisOffset || currentDot.x === prevDot.x - allowedAxisOffset;
    const allowedY = currentDot.y === prevDot.y + allowedAxisOffset || currentDot.y === prevDot.y - allowedAxisOffset;
    return (allowedColor && allowedX || allowedColor && allowedY) && allowedDirections;
  }
}