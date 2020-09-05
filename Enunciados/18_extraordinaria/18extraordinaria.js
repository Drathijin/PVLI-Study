import { game } from "../../game.js";

class coin extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y, w, h, color = "0xffff00") {
    super(scene, x, y, w, h, color);
    scene.add.existing(this);
    scene.physics.add.existing(this, true);
  }
}

class box extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, w, h, color = undefined, border = undefined) {
    if (color === undefined) color = "0xffaa80";
    super(scene, x, y, w, h, color);
    if (border !== undefined) this.setStrokeStyle(2, border);
    scene.add.existing(this);
    scene.physics.add.existing(this, true);
  }
}

export class scene18e extends Phaser.Scene {
  constructor(config) {
    var realConf = {
      physics: {
        arcade: {
          debug: true,
          gravity: {
            y: 150,
          },
        },
      },
    };
    super(realConf);
  }

  preload() {
    this.load.image("playerIMG", "./Assets/Player.png");
    this.load.image("playerIMG2", "./Assets/Player2.png");
    this.load.audio("hurt", "./Assets/classic_hurt.mp3");
  }
  init() {
    this.anims.create({
      key: "walking",
      frames: [{ key: "playerIMG" }, { key: "playerIMG2" }],
      frameRate: 10,
      repeat: -1,
    });
  }
  create() {
    this.physics.world.setBounds(0, 0, game.getW(), game.getH());
    this.cursors = this.input.keyboard.createCursorKeys();

    this.points = 0;
    this.text = this.add.text(game.getW() / 2 - 20, 0, "0", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "40px",
      color: "#ccff33",
    });

    this.addPoints = () => {
      this.points++;
      this.text.text = this.points;
      this.sound.play("hurt");
    };

    this.player = this.add.sprite(game.getW() / 2, 400, "playerIMG");
    this.physics.add.existing(this.player);
    this.player.speed = 100;
    this.player.jumpSpeed = 250;
    this.player.body.setCollideWorldBounds(true);

    this.boxes = [
      new box(this, game.getW() / 2, game.getH() - 25, game.getW(), 50),
      new box(this, 200, 450, 300, 20),
      new box(this, 600, 450, 300, 20),
      new box(this, 400, 300, 300, 20),
    ];
    this.coins = [];
    let w = 20;
    let h = 50;
    for (let i = 1; i < 4; i++) {
      this.coins.push(
        new coin(this, this.boxes[i].x + w / 2, this.boxes[i].y - h, w, h)
      );
    }
    this.physics.add.collider(this.boxes, this.player);
    this.physics.add.collider(this.coins, this.player, (coin, player) => {
      coin.destroy();
      this.addPoints();
    });
  }
  update(delta) {
    if (this.cursors.space.isDown && this.player.body.onFloor()) {
      this.player.body.setVelocityY(-this.player.jumpSpeed);
      this.sound.play("hurt");
    }
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-this.player.speed);
      this.player.play("walking");
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(this.player.speed);
      this.player.play("walking");
    } else if (
      this.player.body.velocity.x > 0.2 ||
      this.player.body.velocity.x < -0.2
    ) {
      this.player.body.setVelocityX(this.player.body.velocity.x * 0.98);
    } else {
      this.player.body.setVelocityX(0);
    }
  }
}
