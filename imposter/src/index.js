import Phaser from "phaser";

import Preloader from "./scene/preload.js";
import MainMenuScene from "./scene/menu.js";
import TheSkeld from "./scene/state/ingame/theskeld.js";
import ChartCourse from "./scene/state/ingame/chartcourse.js";
import Game from './scene/game.js'
import Options from "./scene/state/inmenu/options.js";
import Login from "./scene/login.js";
import SubMenu from "./scene/submenu.js";
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
=======
game.scene.add('Course',ChartCourse)
>>>>>>> eb4438998677e1ae0890e1b697f4bc75f1968815
// start title

// game.scene.start("preloader");
// game.scene.start("theskeld");
//game.scene.start('menu');
// game.scene.start('game');
//game.scene.start('login');

<<<<<<< HEAD
game.scene.start('preloader');
=======
game.scene.start('Course');

>>>>>>> eb4438998677e1ae0890e1b697f4bc75f1968815
