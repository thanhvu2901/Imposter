import Phaser from "phaser";

import Preloader from "./scene/preload.js";
import MainMenuScene from "./scene/menu.js";
import TheSkeld from "./scene/state/ingame/theskeld.js";
import Game from './scene/game.js'
var preloader = new Preloader();

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  physics:{
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  // scene: titleScene
};

const game = new Phaser.Game(config);

//game.scene.add(SceneKeys.Preloader, Preloader)

game.scene.add("preloader", preloader);
game.scene.add("menu", MainMenuScene);
game.scene.add("theskeld", TheSkeld);
game.scene.add('game', Game);
// start title

// game.scene.start("preloader");
// game.scene.start("theskeld");
//game.scene.start('menu');
// game.scene.start('game');

game.scene.start('preloader');

