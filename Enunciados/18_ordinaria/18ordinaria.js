import { box } from "./objects.js";
import { game } from "../../game.js";

export const scene18o = {
  preload: preload,
  update: update,
  create: create,
};

const selectedColor = "0xccff33";
let boxes = [];
let selected = null;
let sizeText;

function random(min, max) {
  return Phaser.Math.RND.integerInRange(min, max);
}

function addBox(scene) {
  /*Randomizar posición y tamaño*/
  let w = random(40, 150);
  let h = random(40, 150);
  let x = random(0, game.getW());
  let y = random(0, game.getH() / 2);

  let b = new box(scene, x, y, w, h);
  /* Rotar y aplicar fuerza aleatorios*/
  boxes.push(b);
}

function preload() {
  document.getElementById("PageTitle").innerHTML = "2018 Ordinaria";
  this.load.audio("hurt", "./Assets/classic_hurt.mp3");
}

function create() {
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.refresh();

  this.matter.world.setBounds();
  let playSound = () => {
    this.sound.play("hurt");
  };

  function checkSelected() {
    if (selected !== null) {
      playSound();
      return true;
    }
    return false;
  }

  sizeText = this.add.text(game.getW() / 2 - 20, 0, "0", {
    fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    fontSize: "40px",
    color: "#ccff33",
  });

  this.input.keyboard.on("keydown-SPACE", (e) => {
    e.preventDefault(); //Para que no salte de página al pulsar espacio
    addBox(this);
    playSound();
    sizeText.text = boxes.length;
  });

  //#region cursorkeys

  /*Mover Arriba Caja Seleccionada*/
  this.input.keyboard.on("keydown-I", () => {
    if (checkSelected()) {
      selected.move.up();
    }
  });

  /*Mover Abajo Caja Seleccionada*/
  this.input.keyboard.on("keydown-K", () => {
    if (checkSelected()) {
      selected.move.down();
    }
  });

  /*Mover Arriba Caja Seleccionada*/
  this.input.keyboard.on("keydown-J", () => {
    if (checkSelected()) {
      selected.move.right();
    }
  });

  /*Mover Derecha Caja Seleccionada*/
  this.input.keyboard.on("keydown-L", () => {
    if (checkSelected()) {
      selected.move.left();
    }
  });
  //#endregion

  /*Rotar Caja Seleccionada*/
  this.input.keyboard.on("keydown-S", () => {
    if (checkSelected()) {
      //selected.setAngle(selected.angle + 15);
      //this.matter.localWorld.rotate(selected.body, 15);
      console.log(this.matter.bodies);
    }
  });

  /*Eliminar Caja Seleccionada*/
  this.input.keyboard.on("keydown-D", () => {
    if (checkSelected()) {
      boxes.splice(boxes.indexOf(selected), 1);
      selected.destroy();
      selected = null;
      sizeText.text = boxes.length;
    }
  });

  /*Seleccionar cajas aleatoriamente*/
  this.input.keyboard.on("keydown-A", () => {
    if (checkSelected()) {
      selected.resetColor();
    }
    if (boxes.length > 0) {
      let rnd = Phaser.Math.RND.integerInRange(0, boxes.length - 1);
      selected = boxes[rnd];
      selected.setColor(selectedColor);
    }
  });
}
function update(params) {}
