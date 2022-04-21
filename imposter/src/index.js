import Phaser from "phaser";

import Preloader from "./scene/preload.js";
import MainMenuScene from "./scene/menu.js";
import TheSkeld from "./scene/state/ingame/theskeld.js";
import ChartCourse from "./scene/state/ingame/chartcourse.js";
import SwipeCard from "./scene/state/minigame/swipe_card.js";
import Game from './scene/game.js'
<<<<<<< HEAD
import Options from "./scene/state/inmenu/options.js";
import Login from "./scene/login.js";
import SubMenu from "./scene/submenu.js";
import AlignEngineOutput from "./scene/state/minigame/align_engine_output";
import CalibrateDistributor from "./scene/state/minigame/calibrate_distributor";
=======
import FuelEngine from "./scene/state/ingame/fuelengine.js";
import FuelEngine_1 from "./scene/state/ingame/fuelengine_1.js";
import UnlockManifolds from "./scene/state/ingame/unlockmanifolds.js";
import UploadData from "./scene/state/ingame/uploaddata.js";
>>>>>>> d29dea5961928ffdf2965103181566eab6ecfb82
var preloader = new Preloader();

const config = {

  type: [Phaser.AUTO, Phaser.CANVAS],
  width: 1024,
  height: 768,
  physics: {
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
<<<<<<< HEAD
game.scene.add('options', Options);
game.scene.add('login', Login);
game.scene.add('submenu', SubMenu)
game.scene.add("align_engine_output", AlignEngineOutput)
game.scene.add("calibrate_distributor", CalibrateDistributor);
game.scene.add("swipe_card", SwipeCard);
=======
game.scene.add('Course',ChartCourse)
game.scene.add('Fuel',FuelEngine)
game.scene.add('Fuel_1',FuelEngine_1)
game.scene.add('Unlock',UnlockManifolds)
game.scene.add('Upload',UploadData)
>>>>>>> d29dea5961928ffdf2965103181566eab6ecfb82
// start title

// game.scene.start("preloader");
// game.scene.start("theskeld");
//game.scene.start('menu');
// game.scene.start('game');
//game.scene.start('login');

<<<<<<< HEAD
// game.scene.start('preloader');
// game.scene.start("align_engine_output")
// game.scene.start("calibrate_distributor");
game.scene.start("swipe_card");
=======
game.scene.start('Upload');

>>>>>>> d29dea5961928ffdf2965103181566eab6ecfb82
