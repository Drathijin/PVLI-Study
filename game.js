import { scene18o } from "./Enunciados/18_ordinaria/18ordinaria.js";
import { scene18e } from "./Enunciados/18_extraordinaria/18extraordinaria.js";

const WIDTH = 800;
const HEIGHT = 600;
var config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  physics: {
    arcade: {
      debug: true,
      gravity: {
        y: 0,
      },
    },
    matter: {
      debug: false,
      enableSleeping: true,
    },
  },
  parent: "PhaserContainer",
  backgroundColor: "0xcccccc",
  scale: "CENTER-BOTH",
  scene: [scene18e],
};

export const game = new Phaser.Game(config);

//Estas funciones solo funcionan porque el tamaño del juego será constante, si quiere hacerse
//una página "responsive" debería de accederse al dato que maneja Phaser

game.getW = () => {
  return WIDTH;
};
game.getH = () => {
  return HEIGHT;
};

const examList = {
  e19: {
    title: "Extraordinaria 2019",
    page: "Enunciados/19_extraordinaria/examen.html",
  },
  o19: {
    title: "Ordinaria 2019",
    page: "Enunciados/19_ordinaria/examen.html",
  },
  e18: {
    title: "Extraordinaria 2018",
    page: "Enunciados/18_extraordinaria/examen.html",
  },
  o18: {
    title: "Ordinaria 2018",
    page: "Enunciados/18_ordinaria/examen.html",
  },
  o17: {
    title: "Ordinaria 2017",
    page: "Enunciados/17_ordinaria/examen.html",
  },
};

let currentExam = null;
let examElem = document.getElementById("enunciado");
let titleElem = document.getElementById("PageTitle");

for (var el of document.getElementsByClassName("navElemnt1")) {
  el.addEventListener("click", (ev) => {
    if (currentExam !== null) {
      currentExam.style.backgroundColor = "#1fe0";
      currentExam.style.color = "var(--font-main)";
    }
    let examName = ev.srcElement.id;
    titleElem.innerText = examList[examName].title;
    examElem.setAttribute("w3-include-html", examList[examName].page);
    includeHTML();
    ev.srcElement.style.backgroundColor = "#e0e0e0";
    ev.srcElement.style.color = "var(--font-second)";

    currentExam = ev.srcElement;
  });
}
/*




*/
