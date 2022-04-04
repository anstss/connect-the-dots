const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: '#fff',
  rows: 6,
  cols: 6,
  dotColors: ['#E9FF00', '#00D7FF', '#1AEC00', '#FF0000', '#B600FF'],
  dotDiameter: 40,
  scene: new GameScene()
}

const game = new Phaser.Game(config);