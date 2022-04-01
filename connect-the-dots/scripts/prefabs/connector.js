class Connector extends Phaser.GameObjects.Line {
  constructor(scene, x, y, color) {
    super(scene, 0, 0, x, y, x + 200, y + 200, 0xaa00aa);
    this.scene = scene;
    this.init();
  }

  init() {
    this.scene.add.existing(this);
  }
}