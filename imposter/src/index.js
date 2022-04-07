import Phaser from "phaser";

import Preloader from "./scene/preload.js";
import MainMenuScene from "./scene/menu.js";
import TheSkeld from "./scene/state/ingame/theskeld.js";
import ChartCourse from "./scene/state/ingame/chartcourse.js";
import Game from './scene/game.js'
import FuelEngine from "./scene/state/ingame/fuelengine.js";
import FuelEngine_1 from "./scene/state/ingame/fuelengine_1.js";
import UnlockManifolds from "./scene/state/ingame/unlockmanifolds.js";
import UploadData from "./scene/state/ingame/uploaddata.js";
var preloader = new Preloader();

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
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
game.scene.add('Course',ChartCourse)
game.scene.add('Fuel',FuelEngine)
game.scene.add('Fuel_1',FuelEngine_1)
game.scene.add('Unlock',UnlockManifolds)
game.scene.add('Upload',UploadData)
// start title

// game.scene.start("preloader");
// game.scene.start("theskeld");
//game.scene.start('menu');
// game.scene.start('game');

game.scene.start('Upload');

