class Dot extends Phaser.GameObjects.Ellipse {
  constructor(scene) {
    super(scene, 0, 0, config.dotRadius, config.dotRadius);
    this.scene = scene;
    this.init();
  }

  init() {
    this.scene.add.existing(this);
    this.setInteractive();
    this.on('pointerdown', this.startDrawingLine, this);
    this.scene.input.on('pointerup', this.stopDrawingLine, this);
  }

  startDrawingLine() {
    this.isActive = true;
    if (game.input.activePointer.isDown) {
      if (this.connector) {
        this.connector.x2 = game.input.activePointer.x;
        this.connector.y2 = game.input.activePointer.y;
        this.connector.init();
      } else {
        this.connector = new Connector(this.scene, this.x, this.y, game.input.activePointer.x, game.input.activePointer.y, this.fillColor);
      }
    }
  }

  stopDrawingLine() {
    this.isActive = false;
  }

  static generateDot(scene, row, col) {
    const dot = new Dot(scene);

    const colorIndex = Phaser.Math.Between(0, config.dotColors.length - 1);
    const dotColor = Phaser.Display.Color.HexStringToColor(config.dotColors[colorIndex]).color;

    const padding = 30;
    const offsetX = (config.width - (config.dotRadius * 2 + padding) * config.cols) / 2 + config.dotRadius + padding / 2;
    const offsetY = 250;

    const x = col * config.dotRadius * 2 + padding * col + offsetX;
    const y = row * config.dotRadius * 2 + padding * row + offsetY;

    dot.setFillStyle(dotColor);
    dot.setPosition(x, y);

    return dot;
  }
}