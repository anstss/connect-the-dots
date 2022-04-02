class Dot extends Phaser.GameObjects.Ellipse {
  constructor(scene) {
    super(scene, 0, 0, config.dotRadius, config.dotRadius);
    this.scene = scene;
    this.init();
  }

  init() {
    this.scene.add.existing(this);
    this.setInteractive();
  }

  static generateDot(scene, row, col) {
    const dot = new Dot(scene);

    const colorIndex = Phaser.Math.Between(0, config.dotColors.length - 1);
    const dotColor = Phaser.Display.Color.HexStringToColor(config.dotColors[colorIndex]).color;

    dot.margin = 30;
    const offsetX = (config.width - (config.dotRadius * 2 + dot.margin) * config.cols) / 2 + config.dotRadius + dot.margin / 2;
    const offsetY = 250;

    const x = col * config.dotRadius * 2 + dot.margin * col + offsetX;
    const y = row * config.dotRadius * 2 + dot.margin * row + offsetY;

    dot.setFillStyle(dotColor);
    dot.setPosition(x, y);

    return dot;
  }
}