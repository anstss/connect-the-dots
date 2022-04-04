class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.dots = new Dots(this);
    this.input.on('gameobjectdown', (pointer, gameObject) => this.dots.startDrawingLine(gameObject));
    this.input.on('pointerup', this.dots.stopDrawingLine, this.dots);
    this.input.on('gameobjectover', (pointer, gameObject) => this.dots.markDot(gameObject));
    this.createText();
  }

  createText() {
    this.pointsText = this.add.text(config.width - (this.dots.children.entries[0].offsetX - config.dotDiameter / 2), 100, `Points: ${this.dots.points}`, {
      fontSize: '36px',
      fontStyle: 'bold',
      color: '#000'
    }).setOrigin(1, 0.5);
  }

  update() {
    this.dots.updateLine();
  }
}