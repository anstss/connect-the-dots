class Connector extends Phaser.Geom.Line {
  constructor(scene, x1, y1, x2, y2, color) {
    super(x1, y1, x2, y2);
    this.scene = scene;
    this.color = color;
    this.init();
  }

  init() {
    if (this.graphics) {
      this.graphics.clear();
    }
    this.graphics = this.scene.add.graphics({ lineStyle: { width: 4, color: this.color }});
    this.graphics.strokeLineShape(this);
  }
}