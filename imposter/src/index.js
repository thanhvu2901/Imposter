import Phaser from "phaser";
Phaser.Core.TimeStep.prototype.resetDelta = Phaser.Utils.NOOP;
import Preloader from "./scene/preload.js";
import MainMenuScene from "./scene/menu.js";
import TheSkeld from "./scene/state/ingame/theskeld.js";
import ChartCourse from "./scene/state/ingame/chartcourse.js";
import SwipeCard from "./scene/state/minigame/swipe_card.js";
import Game from './scene/game.js'
import Options from "./scene/state/inmenu/options.js";
import Login from "./scene/login.js";
import SubMenu from "./scene/submenu.js";
import fixWiring from "./scene/state/minigame/fix_wiring.js";
import AlignEngineOutput from "./scene/state/minigame/align_engine_output";
import DivertPower from "./scene/state/minigame/divert_power.js";
import CleanO2Filter from "./scene/state/ingame/cleanO2Filter.js";
import CleanAsteroids from "./scene/state/ingame/cleanAsteroids.js"
import PrimeShields from "./scene/state/ingame/primeShields.js";
import ChangeSkin from "./scene/state/skin/changeSkin.js";
import Map_1 from "./scene/state/ingame/mini-map.js";
import InspectSample from "./scene/state/minigame/inspect_sample.js";
import StabilizeSteering from "./scene/state/minigame/stabilize_steering.js";
import StartReactor from "./scene/state/minigame/start_reactor.js";
import JoinGame from "./scene/joinGame.js";
import waitingRoom from "./scene/waitingRoom.js";
import introCrew from "./scene/state/intro/introCrew.js";
import introImposter from "./scene/state/intro/introImposter.js";
import guidemap from "./scene/state/guidemap/guidemap.js";
import votingScreen from "./scene/state/Voting/votingScreen.js"
import UploadData from "./scene/state/ingame/uploaddata.js";
import CalibratorDistributor from "./scene/state/minigame/calibrate_distributor.js";

import Vote_status from "./scene/state/ingame/vote_status.js";
import FuelEngine_1 from "./scene/state/ingame/fuelengine_1.js";

import FuelEngine from "./scene/state/ingame/fuelengine.js";
import UnlockManifolds from "./scene/state/ingame/unlockmanifolds.js";

var preloader = new Preloader();

const config = {

  type: [Phaser.AUTO, Phaser.CANVAS],
  width: 1080,
  height: 768,
  fps: {
    smoothStep: false
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },

  //enable Phaser-raycaster plugin
  plugins: {
    scene: [
      {
        key: 'PhaserRaycaster',
        plugin: PhaserRaycaster,
        mapping: 'raycasterPlugin'
      }
    ]
  }

};

const game = new Phaser.Game(config);
//game.scene.add(SceneKeys.Preloader, Preloader)

game.scene.add("preloader", preloader);
game.scene.add("vote", votingScreen);
game.scene.add("menu", MainMenuScene);
game.scene.add('joinGame', JoinGame)
game.scene.add('introCrew', introCrew)
game.scene.add('introImposter', introImposter)
game.scene.add("theskeld", TheSkeld);
game.scene.add('game', Game);
game.scene.add('mini-map', Map_1)
game.scene.add('options', Options);
game.scene.add('login', Login);
game.scene.add('submenu', SubMenu)
game.scene.add('guidemap', guidemap)
game.scene.add('vote_state', Vote_status)
game.scene.add('Course', ChartCourse)

game.scene.add('fixWiring', fixWiring)

game.scene.add("align_engine_output", AlignEngineOutput)
game.scene.add("CleanO2Filter", CleanO2Filter);

game.scene.add("CleanAsteroids", CleanAsteroids);

game.scene.add("PrimeShields", PrimeShields);

game.scene.add("ChangeSkin", ChangeSkin);

game.scene.add('inspectSample', InspectSample)
game.scene.add('stabilizeSteering', StabilizeSteering)
game.scene.add('startReactor', StartReactor)

game.scene.add('waitingRoom', waitingRoom)

game.scene.add("divert_power", DivertPower);

game.scene.add("SwipeCard", SwipeCard);
game.scene.add("Upload", UploadData);
game.scene.add("CalibratorDistributor", CalibratorDistributor);
game.scene.add("Fuel", FuelEngine);
game.scene.add("Unlock", UnlockManifolds)

// start title
//game.scene.start("joinGame");
//game.scene.start("mini-map");
// game.scene.start("theskeld");
//game.scene.start('menu');
// game.scene.start('game');
//game.scene.start('login');
// game.scene.start('Upload');

/***intro */
//game.scene.start("introCrew");
//game.scene.start("introImposter");
game.scene.start('preloader');
// game.scene.start('Course');
// game.scene.start('CleanO2Filter');
// game.scene.start('CleanAsteroids');
// game.scene.start('PrimeShields');

// game.scene.start('fixWiring')
// game.scene.start('inspectSample');

// game.scene.start("Upload")
// game.scene.start('stabilizeSteering');
// game.scene.start('startReactor') // game nay hien dang bị loi
// game.scene.start('SwipeCard')
// game.scene.start("CalibratorDistributor")
// game.scene.start("Fuel")
// game.scene.start("Fuel_1");
// game.scene.start("Unlock");

//game.scene.start('preloader');
//game.scene.start("align_engine_output")
//game.scene.start('guidemap')
