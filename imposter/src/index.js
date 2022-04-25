import Phaser from "phaser";

import Preloader from "./scene/preload.js";
import MainMenuScene from "./scene/menu.js";
import TheSkeld from "./scene/state/ingame/theskeld.js";
import ChartCourse from "./scene/state/ingame/chartcourse.js";
import SwipeCard from "./scene/state/minigame/swipe_card.js";
import Game from './scene/game.js'
<<<<<<< HEAD
import FuelEngine from "./scene/state/ingame/fuelengine.js";
import FuelEngine_1 from "./scene/state/ingame/fuelengine_1.js";
import UnlockManifolds from "./scene/state/ingame/unlockmanifolds.js";
import UploadData from "./scene/state/ingame/uploaddata.js";
=======
import Options from "./scene/state/inmenu/options.js";
import Login from "./scene/login.js";
import SubMenu from "./scene/submenu.js";
import fixWiring from "./scene/state/minigame/fix_wiring.js";
import AlignEngineOutput from "./scene/state/minigame/align_engine_output";
import CleanO2Filter from "./scene/state/ingame/cleanO2Filter.js";
import CleanAsteroids from "./scene/state/ingame/cleanAsteroids.js"
import PrimeShields from "./scene/state/ingame/primeShields.js";

import InspectSample from "./scene/state/minigame/inspect_sample.js";
import StabilizeSteering from "./scene/state/minigame/stabilize_steering.js";
import StartReactor from "./scene/state/minigame/start_reactor.js";
import JoinGame from "./scene/joinGame.js";
import waitingRoom from "./scene/waitingRoom.js";
>>>>>>> 974eb27bb870dfd73c42056665d758badf29b6b5
var preloader = new Preloader();

const config = {

  type: [Phaser.AUTO, Phaser.CANVAS],
  width: 1080,
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

};

const game = new Phaser.Game(config);
//game.scene.add(SceneKeys.Preloader, Preloader)

game.scene.add("preloader", preloader);
game.scene.add("menu", MainMenuScene);
game.scene.add("theskeld", TheSkeld);
game.scene.add('game', Game);
<<<<<<< HEAD
game.scene.add('Course',ChartCourse)
game.scene.add('Fuel',FuelEngine)
game.scene.add('Fuel_1',FuelEngine_1)
game.scene.add('Unlock',UnlockManifolds)
game.scene.add('Upload',UploadData)
=======

game.scene.add('options', Options);
game.scene.add('login', Login);
game.scene.add('submenu', SubMenu)


game.scene.add('Course', ChartCourse)

game.scene.add('fixWiring', fixWiring)

game.scene.add("align_engine_output", AlignEngineOutput)
game.scene.add("CleanO2Filter", CleanO2Filter);

game.scene.add("CleanAsteroids", CleanAsteroids);

game.scene.add("PrimeShields", PrimeShields);


game.scene.add('inspectSample', InspectSample)
game.scene.add('stabilizeSteering', StabilizeSteering)
game.scene.add('startReactor', StartReactor)
game.scene.add('joinGame', JoinGame)
game.scene.add('waitingRoom', waitingRoom)
>>>>>>> 974eb27bb870dfd73c42056665d758badf29b6b5
// start title

//game.scene.start("preloader");
// game.scene.start("theskeld");
//game.scene.start('menu');
game.scene.start('game');
//game.scene.start('login');
// game.scene.start('Upload');

<<<<<<< HEAD
=======
game.scene.start('preloader');
//game.scene.start('Course');
// game.scene.start('Course');
//game.scene.start('CleanO2Filter');
// game.scene.start('CleanAsteroids');
//game.scene.start('PrimeShields');

//game.scene.start('fixWiring')
//game.scene.start('inspectSample')
// game.scene.start('stabilizeSteering');
//game.scene.start('startReactor')

// game.scene.start('preloader');
//game.scene.start("align_engine_output")
//game.scene.start('joinGame')
//game.scene.start('waitingRoom')
>>>>>>> 974eb27bb870dfd73c42056665d758badf29b6b5
