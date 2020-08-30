const defaultColor = "0x00ffff";

export class box extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, w, h) {
    super(scene, x, y, w, h, defaultColor);
    scene.add.existing(this);
    scene.matter.add.gameObject(this);
    this.move = {
      up: () => this._move({ x: 0, y: -1 }),
      down: () => this._move({ x: 0, y: 1 }),
      right: () => this._move({ x: -1, y: 0 }),
      left: () => this._move({ x: 1, y: 0 }),
    };
    console.log(this.geom);
  }
  setColor(color) {
    this.setFillStyle(color);
  }
  resetColor() {
    this.setColor(defaultColor);
  }
  _move(dir) {
    let w = this.geom.width;
    let h = this.geom.height;
    let scale = ((w / 150) * h) / 150;

    let vec = new Phaser.Math.Vector2(
      this.x + scale * dir.x - this.x,
      this.y + scale * dir.y - this.y
    );
    this.applyForce(vec);
  }
}
