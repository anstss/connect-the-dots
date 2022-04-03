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

  moveDot() {
    this.row++;
    this.addAnimation(true);
  }

  addAnimation(moving = false) {
    const {x: newX, y: newY} = this.calculatePosition();
    let delay, duration;
    if (moving) {
      delay = duration = 200;
    } else {
      delay = Phaser.Math.Between(100, 700);
      duration = Phaser.Math.Between(100, 700);
    }
    this.scene.tweens.add({
      targets: this,
      x: {from: this.x, to: newX},
      y: {from: this.y, to: newY},
      delay,
      duration,
      ease: 'Linear'
    });
  }

  calculatePosition() {
    const x = this.col * config.dotRadius * 2 + this.margin * this.col + this.offsetX;
    const y = this.row * config.dotRadius * 2 + this.margin * this.row + this.offsetY;
    return {x, y};
  }

  static generateDot(scene, row, col) {
    const dot = new Dot(scene);

    const colorIndex = Phaser.Math.Between(0, config.dotColors.length - 1);
    const dotColor = Phaser.Display.Color.HexStringToColor(config.dotColors[colorIndex]).color;

    dot.col = col;
    dot.row = row;
    dot.margin = 30;
    dot.offsetX = (config.width - (config.dotRadius * 2 + dot.margin) * config.cols) / 2 + config.dotRadius + dot.margin / 2;
    dot.offsetY = 250;

    const {x, y} = dot.calculatePosition();

    dot.setFillStyle(dotColor);
    dot.setPosition(x, -200);

    return dot;
  }
}