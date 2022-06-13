//Libs and files
import Phaser, { Scene } from "phaser";
import Map_1 from "./state/ingame/mini-map";
import theskeld from "../assets/tilemaps/theskeld.json";
import playerpng from "../assets/player/player_sprite/player_color/player_base.png";
import playerjson from "../assets/player/player_sprite/player_color/player_base.json";
import player_ghost from "../assets/player/Base/ghost/ghost.png";
import player_ghost_json from "../assets/player/Base/ghost/ghost.json";
import Light from "../scene//state/ingame/ray-light";
import eventsCenter from "./eventsCenter";
import { debugDraw } from "../scene/debugDraw";
import MapMissionsExporter from "../helper/map_mission_exporter";
import Mission from "../services/missions/mission";

//Marked mission
import AlignEngineOutput_mission_marked from "../assets/tasks/Align Engine Output/mission_marked.png";




//marked mission

import CleanO2Filter_mission_marked from "../assets/tasks/Clean O2 Filter/marked.png";
import AlignEnginOutput_gallery from "../assets/tasks/Align Engine Output/gallery.png";
import FixWiring_mission_marked from "../assets/tasks/Fix_Wiring/marked.png";
import CleanAsteroids from "../assets/tasks/Clear Asteroids/marked.png";
import StabilizeSteering from "../assets/tasks/Stabilize Steering/marked.png";
import Swipcard_mision_marked from "../assets/tasks/Swipe Card/marked.png";
import UploadData_mission_marked from "../assets/tasks/Upload Data/marked.png";
import CalibratorDistributor_mission_marked from "../assets/tasks/Calibrate Distributor/marked.png"
import ChartCourse from "../assets/tasks/Chart Course/marked.png";
import FuelEngine from "../assets/tasks/Fuel Engines/marked.png";
import PrimeShields from "../assets/tasks/Prime Shields/marked.png";

// Player color
import playerpng_red from "../assets/player/player_sprite/player_color/player_base_red.png";
import playerjson_red from "../assets/player/player_sprite/player_color/player_base_red.json";
import playerpng_blue from "../assets/player/player_sprite/player_color/player_base_blue.png";
import playerjson_blue from "../assets/player/player_sprite/player_color/player_base_blue.json";
import playerpng_blue_dark from "../assets/player/player_sprite/player_color/player_base_blue_dark.png";
import playerjson_blue_dark from "../assets/player/player_sprite/player_color/player_base_blue_dark.json";
import playerpng_blue_light from "../assets/player/player_sprite/player_color/player_base_blue_light.png";
import playerjson_blue_light from "../assets/player/player_sprite/player_color/player_base_blue_light.json";
import playerpng_gray_dark from "../assets/player/player_sprite/player_color/player_base_gray_dark.png";
import playerjson_gray_dark from "../assets/player/player_sprite/player_color/player_base_gray_dark.json";
import playerpng_gray_light from "../assets/player/player_sprite/player_color/player_base_gray_light.png";
import playerjson_gray_light from "../assets/player/player_sprite/player_color/player_base_gray_light.json";
import playerpng_green_dark from "../assets/player/player_sprite/player_color/player_base_green_dark.png";
import playerjson_green_dark from "../assets/player/player_sprite/player_color/player_base_green_dark.json";
import playerpng_green_light from "../assets/player/player_sprite/player_color/player_base_green_light.png";
import playerjson_green_light from "../assets/player/player_sprite/player_color/player_base_green_light.json";
import playerpng_orange from "../assets/player/player_sprite/player_color/player_base_orange.png";
import playerjson_orange from "../assets/player/player_sprite/player_color/player_base_orange.json";
import playerpng_purple from "../assets/player/player_sprite/player_color/player_base_purple.png";
import playerjson_purple from "../assets/player/player_sprite/player_color/player_base_purple.json";
import playerpng_yellow from "../assets/player/player_sprite/player_color/player_base_yellow.png";
import playerjson_yellow from "../assets/player/player_sprite/player_color/player_base_yellow.json";
import playerpng_pink from "../assets/player/player_sprite/player_color/player_base_pink.png";
import playerjson_pink from "../assets/player/player_sprite/player_color/player_base_pink.json";

// Skins
import Archaeologist_Walk_png from "../assets/player/player_sprite/pants/Archaeologist_Walk.png";
import Archaeologist_Walk_json from "../assets/player/player_sprite/pants/Archaeologist_Walk.json";

// Pets
import bslugjson from "../assets/player/pet_sprite/bslug.json";
import bslugpng from "../assets/player/pet_sprite/bslug.png";

//Constants
import {
  PLAYER_SPEED,
  PLAYER_BLUE,
  PLAYER_RED,
  PLAYER_BLUE_DARK,
  PLAYER_BLUE_LIGHT,
  PLAYER_GRAY_DARK,
  PLAYER_GRAY_LIGHT,
  PLAYER_GREEN_DARK,
  PLAYER_GREEN_LIGHT,
  PLAYER_ORANGE,
  PLAYER_PURPLE,
  PLAYER_YELLOW,
  PLAYER_PINK,
  BSLUG,
} from "../consts/constants";

//Variables declaration
let player, pet, pet_type;
let otherPlayer = new Array();
let otherPlayerId = new Array();
let cursors;
let pressedKeys = [];
let stt = 0;
let socket;
let tables = [];
let tableObject, ventObject, hole, vent_butt;
var objectsLayer;
let map_missions;
let export_missions;
let current_x, current_y, mission_name;
let useButton;
let launch_scene = false;
let playerKilled;
let indexKill = 0;
let canKill = false;
let alive = true;
let kill;
let sabotage;
let vent_map = new Map();
let light;
let vent_group,
  arrow_group,
  vent_cord = new Map(),
  vent_des = new Map();
let temp,
  key,
  is_vent = false,
  is_jump = false,
  is_hidden = false,
  keyboard;
let count = 0;
let total_missions_completed = 0;
let list_missions_completed = [];
let color = "";

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    this.state = {};
  }

  init(data) {
    this.socket = data.socket;
    this.textInput = data.textInput;
    this.numPlayers = data.numPlayers;
    this.idPlayers = data.idPlayers;
    this.isRole = data.isRole;
    this.playerChangedSkin = data.playerChangedSkin;
    this.Info = data.Info
  }

  preload() {
    this.load.tilemapTiledJSON("tilemap", theskeld);

    this.load.atlas("playerbase", playerpng, playerjson);
    this.load.atlas("ghost", player_ghost, player_ghost_json);

    this.load.atlas(
      "Archaeologist_Walk",
      Archaeologist_Walk_png,
      Archaeologist_Walk_json
    );

    // this.load.image(
    //   "AlignEngineOutput_mission_marked",
    //   AlignEngineOutput_mission_marked
    // );

    this.load.image("AlignEngineOutput_mission_marked", AlignEnginOutput_gallery);


    this.load.image(
      "CleanO2Filter_mission_marked",
      CleanO2Filter_mission_marked
    );
    this.load.image("FixWiring_mission_marked", FixWiring_mission_marked);
    this.load.image("CleanAsteroids", CleanAsteroids);
    this.load.image("StabilizeSteering", StabilizeSteering);
    this.load.image("Swipcard_mision_marked", Swipcard_mision_marked);
    this.load.image("UploadData_mission_marked", UploadData_mission_marked);
    this.load.image("CalibratorDistributor_mission_marked", CalibratorDistributor_mission_marked);
    this.load.image("ChartCourse", ChartCourse);
    this.load.image("FuelEngine", FuelEngine);
    this.load.image("PrimeSheilds", PrimeShields);

    //Player color
    this.load.atlas(PLAYER_RED, playerpng_red, playerjson_red);
    this.load.atlas(PLAYER_BLUE, playerpng_blue, playerjson_blue);
    this.load.atlas(
      PLAYER_BLUE_DARK,
      playerpng_blue_dark,
      playerjson_blue_dark
    );
    this.load.atlas(
      PLAYER_BLUE_LIGHT,
      playerpng_blue_light,
      playerjson_blue_light
    );
    this.load.atlas(
      PLAYER_GRAY_DARK,
      playerpng_gray_dark,
      playerjson_gray_dark
    );
    this.load.atlas(
      PLAYER_GRAY_LIGHT,
      playerpng_gray_light,
      playerjson_gray_light
    );
    this.load.atlas(
      PLAYER_GREEN_DARK,
      playerpng_green_dark,
      playerjson_green_dark
    );
    this.load.atlas(
      PLAYER_GREEN_LIGHT,
      playerpng_green_light,
      playerjson_green_light
    );
    this.load.atlas(PLAYER_ORANGE, playerpng_orange, playerjson_orange);
    this.load.atlas(PLAYER_PURPLE, playerpng_purple, playerjson_purple);
    this.load.atlas(PLAYER_PINK, playerpng_pink, playerjson_pink);
    this.load.atlas(PLAYER_YELLOW, playerpng_yellow, playerjson_yellow);

    //Pets
    this.load.atlas(BSLUG, bslugpng, bslugjson);
  }

  create() {
    //this.scene.pause('game')
    // let intro = this.scene.launch('introCrew', { isRole: isRole }).bringToTop('introCrew')
    console.log(this.Info);
    light = new Light(this);
    eventsCenter.on("continue_scene_game", (data) => {
      current_x = data.x;
      current_y = data.y;
      mission_name = data.mission;
      if (current_x && current_y) {
        map_missions.completed(mission_name);
        list_missions_completed.push(mission_name);
        total_missions_completed += 1;
        map_missions.count_missions_completed(total_missions_completed);
        map_missions.update_list_missions_completed(list_missions_completed);
        player.x = current_x + 2;
        player.y = current_y + 2;
        // player.setPosition(current_x, current_y);
      }
    });

    const ship = this.make.tilemap({ key: "tilemap" });
    const tileset = ship.addTilesetImage("theSkeld", "tiles", 17, 17);
    const ship_tileset = ship.createLayer("Background", tileset);

    //Player loading based on color - default is blue
    let colorPlayer = this.Info.players[this.socket.id].color;
    console.log(colorPlayer);
    player = this.physics.add.sprite(115, -740, 'player-idle_' + colorPlayer, "idle.png");
    color = colorPlayer
    delete this.Info.players[this.socket.id]

    console.log(this.Info);

    //Pets and skins loading
    pet = this.physics.add.sprite(
      player.x + 50,
      player.y + 10,
      BSLUG,
      "bslug_idle1.png"
    );
    pet_type = BSLUG;

    //add kill button if imposter
    if (this.isRole == 1) {
      kill = this.add
        .image(750, 700, "KillButton")
        .setScrollFactor(0, 0)
        .setInteractive()
        .setDepth(1);
      kill.alpha = 0.5;

      sabotage = this.add
        .image(1000, 700, "sabotage")
        .setScrollFactor(0, 0)
        .setInteractive()
        .setAlpha(1)
        .setDepth(1);
      //*****************OPEN the Mini Map ******/

      sabotage.on("pointerdown", () => {
        this.scene.launch("mini-map");
      });
    }
    //initialize missions of this map
    map_missions = new MapMissionsExporter("theSkeld");
    export_missions = map_missions.create();
    map_missions.show_mission(this);
    ship_tileset.setCollisionByProperty({ collides: true });

    // tạo theo số lượng other player vào

    this.state.roomKey = this.textInput;

    for (let i = 0; i < this.numPlayers - 1; i++) {
      let colorOther = Object.values(this.Info.players)[i].color

      otherPlayer[i] = this.physics.add.sprite(
        120 + 50 * i,
        -745 + 50 * i,
        "player_base_" + colorOther,
        "idle.png"
      );


    }
    this.idPlayers.forEach((element) => {
      if (element != this.socket.id) {
        otherPlayerId.push(element);
      }

    });
    // console.log(otherPlayerId);

    // stt = otherPlayer.length;
    //****************** */

    //cursor to direct
    cursors = this.input.keyboard.createCursorKeys();

    //input button

    //Creating animation for player
    this.anims.create({
      key: "player-idle",
      frames: [{ key: "playerbase", frame: "idle.png" }],
    });

    //Red
    this.anims.create({
      key: "player-idle_red",
      frames: [{ key: PLAYER_RED, frame: "idle.png" }],
    });

    //Blue
    this.anims.create({
      key: "player-idle_blue",
      frames: [{ key: PLAYER_BLUE, frame: "idle.png" }],
    });

    //Blue dark
    this.anims.create({
      key: "player-idle_blue_dark",
      frames: [{ key: PLAYER_BLUE_DARK, frame: "idle.png" }],
    });

    //Blue light
    this.anims.create({
      key: "player-idle_blue_light",
      frames: [{ key: PLAYER_BLUE_LIGHT, frame: "idle.png" }],
    });

    //Gray dark
    this.anims.create({
      key: "player-idle_gray_dark",
      frames: [{ key: PLAYER_GRAY_DARK, frame: "idle.png" }],
    });

    //Gray light
    this.anims.create({
      key: "player-idle_gray_light",
      frames: [{ key: PLAYER_GRAY_LIGHT, frame: "idle.png" }],
    });

    //Green dark
    this.anims.create({
      key: "player-idle_green_dark",
      frames: [{ key: PLAYER_GREEN_DARK, frame: "idle.png" }],
    });

    //Green light
    this.anims.create({
      key: "player-idle_green_light",
      frames: [{ key: PLAYER_GREEN_LIGHT, frame: "idle.png" }],
    });

    //Orange
    this.anims.create({
      key: "player-idle_orange",
      frames: [{ key: PLAYER_ORANGE, frame: "idle.png" }],
    });

    //Pink
    this.anims.create({
      key: "player-idle_pink",
      frames: [{ key: PLAYER_PINK, frame: "idle.png" }],
    });

    //Purple
    this.anims.create({
      key: "player-idle_purple",
      frames: [{ key: PLAYER_PURPLE, frame: "idle.png" }],
    });

    //Yellow
    this.anims.create({
      key: "player-idle_yellow",
      frames: [{ key: PLAYER_YELLOW, frame: "idle.png" }],
    });

    /* DEAD ANIMATION */
    //Red
    this.anims.create({
      key: "dead_red",
      frames: [{ key: PLAYER_RED, frame: "dead.png" }],
    });

    //Blue
    this.anims.create({
      key: "dead_blue",
      frames: [{ key: PLAYER_BLUE, frame: "dead.png" }],
    });

    //Blue dark
    this.anims.create({
      key: "dead_blue_dark",
      frames: [{ key: PLAYER_BLUE_DARK, frame: "dead.png" }],
    });

    //Blue light
    this.anims.create({
      key: "dead_blue_light",
      frames: [{ key: PLAYER_BLUE_LIGHT, frame: "dead.png" }],
    });

    //Gray dark
    this.anims.create({
      key: "dead_gray_dark",
      frames: [{ key: PLAYER_GRAY_DARK, frame: "dead.png" }],
    });

    //Gray light
    this.anims.create({
      key: "dead_gray_light",
      frames: [{ key: PLAYER_GRAY_LIGHT, frame: "dead.png" }],
    });

    //Green dark
    this.anims.create({
      key: "dead_green_dark",
      frames: [{ key: PLAYER_GREEN_DARK, frame: "dead.png" }],
    });

    //Green light
    this.anims.create({
      key: "dead_green_light",
      frames: [{ key: PLAYER_GREEN_LIGHT, frame: "dead.png" }],
    });

    //Orange
    this.anims.create({
      key: "dead_orange",
      frames: [{ key: PLAYER_ORANGE, frame: "dead.png" }],
    });

    //Pink
    this.anims.create({
      key: "dead_pink",
      frames: [{ key: PLAYER_PINK, frame: "dead.png" }],
    });

    //Purple
    this.anims.create({
      key: "dead_purple",
      frames: [{ key: PLAYER_PURPLE, frame: "dead.png" }],
    });

    //Yellow
    this.anims.create({
      key: "dead_yellow",
      frames: [{ key: PLAYER_YELLOW, frame: "dead.png" }],
    });

    //khởi tạo nhóm các vent
    vent_group = this.physics.add.staticGroup({
      key: "vent_1",
      frameQuantity: 14,
      immovable: true,
    });
    //khởi tạo nhóm các arrow
    arrow_group = this.add.group({
      key: "arrow",
      frameQuantity: 70,
    });
    //add use button
    vent_butt = this.add
      .image(1000, 700, "button")
      .setScrollFactor(0, 0)
      .setInteractive()
      .setAlpha(0)
      .setDepth(1);

    useButton = this.add
      .image(900, 700, "UseButton")
      .setScrollFactor(0, 0)
      .setInteractive()
      .setDepth(1);
    //disable button
    useButton.alpha = 0.5;
    //tạo animation cho vent
    hole = this.anims.create({
      key: "hole",
      frames: [
        { key: "vent_1" },
        { key: "vent_2" },
        { key: "vent_3" },
        { key: "vent_4" },
        { key: "vent_5" },
        { key: "vent_6" },
        { key: "vent_1" },
      ],
      frameRate: 10,
      repeat: 0,
    });
    //chỉnh vị trí từng frame trong animation cho phù hợp
    hole.frames[0].frame.y = 8;
    //hole.frames[1].frame.x=11
    hole.frames[2].frame.y = 3.5;
    hole.frames[3].frame.y = 7;
    hole.frames[4].frame.y = 7;
    hole.frames[4].frame.x = 3;
    hole.frames[5].frame.y = 7;
    //animation player nhảy vent
    let jump = this.anims.create({
      key: "jump",
      frames: [
        { key: "jump_1" },
        { key: "jump_2" },
        { key: "jump_3" },
        { key: "jump_4" },
        { key: "jump_5" },
        { key: "jump_6" },
        { key: "jump_7" },
      ],
      frameRate: 36,
      repeat: 0,
    });
    //animation player
    this.anims.create({
      key: "player-walk",
      frames: this.anims.generateFrameNames("playerbase", {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    //Red
    this.anims.create({
      key: "player-walk_red",
      frames: this.anims.generateFrameNames(PLAYER_RED, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Blue
    this.anims.create({
      key: "player-walk_blue",
      frames: this.anims.generateFrameNames(PLAYER_BLUE, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Blue dark
    this.anims.create({
      key: "player-walk_blue_dark",
      frames: this.anims.generateFrameNames(PLAYER_BLUE_DARK, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Blue light
    this.anims.create({
      key: "player-walk_blue_light",
      frames: this.anims.generateFrameNames(PLAYER_BLUE_LIGHT, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Gray dark
    this.anims.create({
      key: "player-walk_gray_dark",
      frames: this.anims.generateFrameNames(PLAYER_GRAY_DARK, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Gray light
    this.anims.create({
      key: "player-walk_gray_light",
      frames: this.anims.generateFrameNames(PLAYER_GRAY_LIGHT, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Green dark
    this.anims.create({
      key: "player-walk_green_dark",
      frames: this.anims.generateFrameNames(PLAYER_GREEN_DARK, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Green light
    this.anims.create({
      key: "player-walk_green_light",
      frames: this.anims.generateFrameNames(PLAYER_GREEN_LIGHT, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Orange
    this.anims.create({
      key: "player-walk_orange",
      frames: this.anims.generateFrameNames(PLAYER_ORANGE, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Pink
    this.anims.create({
      key: "player-walk_pink",
      frames: this.anims.generateFrameNames(PLAYER_PINK, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Purple
    this.anims.create({
      key: "player-walk_purple",
      frames: this.anims.generateFrameNames(PLAYER_PURPLE, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Yellow
    this.anims.create({
      key: "player-walk_yellow",
      frames: this.anims.generateFrameNames(PLAYER_YELLOW, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //player death
    this.anims.create({
      key: "player-dead",
      frames: this.anims.generateFrameNames("playerbase", {
        start: 1,
        end: 42,
        prefix: "Dead",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });
    //player ghost
    this.anims.create({
      key: "player-ghost",
      frames: this.anims.generateFrameNames("ghost", {
        start: 1,
        end: 48,
        prefix: "ghost00",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    //Red
    this.anims.create({
      key: "player-dead_red",
      frames: this.anims.generateFrameNames(PLAYER_RED, {
        start: 1,
        end: 42,
        prefix: "Dead",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    //Blue
    this.anims.create({
      key: "player-dead_blue",
      frames: this.anims.generateFrameNames(PLAYER_BLUE, {
        start: 1,
        end: 42,
        prefix: "Dead",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    //Blue dark
    this.anims.create({
      key: "player-dead_blue_dark",
      frames: this.anims.generateFrameNames(PLAYER_BLUE_DARK, {
        start: 1,
        end: 42,
        prefix: "Dead",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    //Blue light
    this.anims.create({
      key: "player-dead_blue_light",
      frames: this.anims.generateFrameNames(PLAYER_BLUE_LIGHT, {
        start: 1,
        end: 42,
        prefix: "Dead",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    //Gray dark
    this.anims.create({
      key: "player-dead_gray_dark",
      frames: this.anims.generateFrameNames(PLAYER_GRAY_DARK, {
        start: 1,
        end: 42,
        prefix: "Dead",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    //Gray light
    this.anims.create({
      key: "player-dead_gray_light",
      frames: this.anims.generateFrameNames(PLAYER_GRAY_LIGHT, {
        start: 1,
        end: 42,
        prefix: "Dead",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    //Green dark
    this.anims.create({
      key: "player-dead_green_dark",
      frames: this.anims.generateFrameNames(PLAYER_GREEN_DARK, {
        start: 1,
        end: 42,
        prefix: "Dead",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    //Green light
    this.anims.create({
      key: "player-dead_green_light",
      frames: this.anims.generateFrameNames(PLAYER_GREEN_LIGHT, {
        start: 1,
        end: 42,
        prefix: "Dead",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    //Orange
    this.anims.create({
      key: "player-dead_orange",
      frames: this.anims.generateFrameNames(PLAYER_ORANGE, {
        start: 1,
        end: 42,
        prefix: "Dead",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    //Pink
    this.anims.create({
      key: "player-dead_pink",
      frames: this.anims.generateFrameNames(PLAYER_PINK, {
        start: 1,
        end: 42,
        prefix: "Dead",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    //Purple
    this.anims.create({
      key: "player-dead_purple",
      frames: this.anims.generateFrameNames(PLAYER_PURPLE, {
        start: 1,
        end: 42,
        prefix: "Dead",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    //Yellow
    this.anims.create({
      key: "player-dead_yellow",
      frames: this.anims.generateFrameNames(PLAYER_YELLOW, {
        start: 1,
        end: 42,
        prefix: "Dead",
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    //Creating animation for pets
    this.anims.create({
      key: `${BSLUG}-walk`,
      frames: this.anims.generateFrameNames(BSLUG, {
        start: 1,
        end: 18,
        prefix: `${BSLUG}_walk`,
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    this.anims.create({
      key: `${BSLUG}-idle`,
      frames: this.anims.generateFrameNames(BSLUG, {
        start: 1,
        end: 48,
        prefix: `${BSLUG}_idle`,
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    //input to control
    this.input.keyboard.on("keydown", (e) => {
      if (!pressedKeys.includes(e.code)) {
        pressedKeys.push(e.code);
      }
    });
    this.input.keyboard.on("keydown", (e) => {
      if (
        e.code == "ArrowDown" ||
        e.code == "ArrowUp" ||
        e.code == "ArrowRight" ||
        e.code == "ArrowLeft"
      ) {
        this.sound.play("walk", { loop: true });
      }
    });
    this.input.keyboard.on("keyup", (e) => {
      this.sound.stopByKey("walk");
      if (alive == true) {
        player.anims.play("player-idle_" + color);
      }

      pressedKeys = pressedKeys.filter((key) => key !== e.code);
    });

    this.physics.add.collider(player, ship_tileset);

    this.cameras.main.startFollow(player, true);
    this.input.keyboard.enabled;
    //tải lại mới khi có player mới vào có các player đã ở trong đó
    console.log(this.textInput);
    //các function liên quan đến objectlayer
    objectsLayer = ship.getObjectLayer("GameObjects");
    //khởi tạo hashmap cho vent và arrow
    objectsLayer.objects.forEach((object) => {
      if (object.type == "vent") {
        //hash map cho vent sẽ có dạng ( vent_1,2,3, [vent.x, vent.y]) nghĩa là mỗi key là string vent sẽ có value là tọa dộ x y của vent trên map
        vent_cord.set(object.name, [object.x, object.y]);
        // hash map cho arrow để player di chuyển vent sẽ dạng là (vent,[arrow1,arrow2....]) nghĩa là mỗi key là string vent hiện tại sẽ có value là các arrow của vent đó
        vent_des.set(object.name, []);
      }
    });
    //lẩy mảng từ group các sprite
    let children = vent_group.getChildren();
    let children_1 = arrow_group.getChildren();
    let i = 0,
      j = 0;
    //khởi tạo object layer để gán sprite hoặc tạo vật cản cho player
    objectsLayer.objects.forEach((object) => {
      const { name, x, y, width, height, properties, type } = object;

      switch (type) {
        case "table":
          tableObject = new Phaser.GameObjects.Ellipse(
            this,
            object.x,
            object.y,
            object.width,
            object.height
          );
          // tableObject.setFillStyle(0xffffff, 0.5);
          // console.log(tableObject);

          this.physics.add.existing(tableObject);

          tableObject.body.immovable = true;
          tableObject.setOrigin(0, 0);
          //r.body.moves=false
          // tableObject.body.setCircle(120);
          this.physics.add.overlap(player, tableObject, null, null, this);
          this.physics.add.collider(player, tableObject);
          break;
        case "vent":
          //gán vị trí cho từng phần tử con của group vent
          children[i]
            .setPosition(object.x, object.y - 10)
            .setOrigin(0, 0)
            .setScale(1.2)
            .setDepth(0.5);
          i++;
          break;
        case "arrow":
          // console.log(object.name.split(" ")[1])
          //gán vị trí cho từng phần tử con của group arrow// set angle với mục đích là xoay mũi tên tới vent gần nhất dựa vào propeties rotation của object trong Tiled
          // sau đó gán interactive cho arrow để thực hiện di chuyển player tới vent gần nhất
          children_1[j]
            .setPosition(object.x, object.y)
            .setScale(0.4)
            .setAngle(object.rotation)
            .setOrigin(0, 1)
            .setInteractive()
            .on("pointerdown", () => {
              //trước khi di chuyển player sang vent mới thì sẽ ẩn đi các arrow ở vent cũ
              arrow_group.setVisible(false);
              // ở đây ta split object name của vent thành mảng 2 phần tử do cấu trúc name của object là (vent "cần tới"- vent"hiện tại") và 2 vent này được ngăn cách bởi dấu cách
              // như đã nói trên thì vent_cord là hash map lưu vị trí các vent dựa trên key value là name của vent, nên ta lấy vị trí [0] là vent "cần tới" dể gán tọa độ x y
              // cho player
              player.x = vent_cord.get(object.name.split(" ")[0])[0] + 20;
              player.y = vent_cord.get(object.name.split(" ")[0])[1];
            });
          // vent_des là hash map lưu các arrow của vent đó và ở đây và ứng với mỗi vent thì sẽ có 3 - 4 arrow cho vent đó
          // ở đây ta lấy vị trí [1] là vent "hiện tại" là gốc của các arrow
          vent_des.get(object.name.split(" ")[1]).push(children_1[j]);
          j++;
          break;
        case "bound":
          let temp = this.add
            .rectangle(object.x, object.y, object.width, object.height)
            .setAngle(object.rotation)
            .setOrigin(0, 0)
            .setDepth(29);
          light.map(temp);
          break;
        default:
          break;
      }
    });
    vent_group.refresh();
    light.createFOV();
    light.draw();

    //ẩn hết các arrow của vent sau khi khởi tạo
    arrow_group.setVisible(false).setDepth(1);

    //bắt sự kiện khi player overlap với 1 object khác
    player.on("overlapstart", function () {
      //hiện nút nhảy vent với điều kiện là player overlap với vent
      if (is_vent) {
        vent_butt.alpha = 1;
        sabotage.alpha = 0;
      }
    });
    //bắt sự kiện khi player đi ra khỏi vùng overlap
    player.on("overlapend", function () {
      //ẩn nút nhảy vent
      is_vent = false;
      vent_butt.alpha = 0;
      sabotage.alpha = 1;
    });

    //thực hiện hàm circleOverlap khi player tới gần vent
    this.physics.add.overlap(player, vent_group, circleOverlap);
    //bắt sự kiện button nhảy vent
    vent_butt.on("pointerdown", () => {
      //nếu tới gần vent thì sẽ đi vào vòng if
      this.sound.play("vent", false);
      if (is_vent) {
        temp.play("hole");
        player.anims.play("jump");
        player.on(
          "animationcomplete",
          (animation, frame) => {
            if ((animation.key = "jump")) {
              if (is_hidden == true) {
                player.setDepth(-10);
              } else {
                player.setDepth(0.6);
                player.play("jump");
                player.on("animationcomplete", (animation, frame) => {
                  if ((animation.key = "jump")) {
                    player.anims.play("player-idle_" + color);
                  }
                });
              }
            }
          },
          this
        );
        is_jump = true;
        //nếu player không trốn vent thì is_hidden sẽ chuyển thành true và ngược lại
        if (is_hidden == true) {
          is_hidden = false;

          //ẩn hết arrow khi player rời khỏi vent
          arrow_group.setVisible(false);
        } else {
          is_hidden = true;
        }
      }
    });

    this.socket.on("move", ({ x, y, playerId, color }) => {
      let index = otherPlayerId.findIndex((Element) => Element == playerId);
      //id = index;
      // console.log(index);

      if (otherPlayer[index].x > x) {
        otherPlayer[index].flipX = true;
      } else if (otherPlayer[index].x < x) {
        otherPlayer[index].flipX = false;
      }
      otherPlayer[index].x = x;
      otherPlayer[index].y = y;
      otherPlayer[index].moving = true;

      if (otherPlayer[index].moving && !otherPlayer[index].anims.isPlaying) {
        otherPlayer[index].play("player-walk_" + color);
      } else if (
        !otherPlayer[index].moving &&
        otherPlayer[index].anims.isPlaying
      ) {
        otherPlayer[index].stop("player-walk_" + color);
      }
    });

    // console.log(objectsLayer);

    this.socket.on("moveEnd", ({ playerId, color }) => {
      let index = otherPlayerId.findIndex((Element) => Element == playerId);
      otherPlayer[index].moving = false;
      otherPlayer[index].anims.play("player-idle_" + color);
      if (otherPlayer[index].moving && !otherPlayer[index].anims.isPlaying) {
        otherPlayer[index].play("player-walk_" + color);
      } else if (
        !otherPlayer[index].moving &&
        otherPlayer[index].anims.isPlaying
      ) {
        otherPlayer[index].stop("player-walk_" + color);
      }
    });

    //update if killed ==>> ************************TO GHOST*******************
    this.socket.on("updateOtherPlayer", ({ playerId, colorKill }) => {
      // console.log(this.socket.id);
      // console.log(playerId);
      // let colorDead = (Object((this.Info.players)[String(playerId)]).color)
      // console.log(colorDead);
      if (this.socket.id == playerId) {
        //run noitice died
        console.log("this player killed");
        //player.stop("player-idle")
        alive = false;
        player.anims.play("player-dead_" + colorKill, true);
      } else {
        let index = otherPlayerId.findIndex((Element) => Element == playerId);
        otherPlayer[index].anims.play("player-dead_" + colorKill, true);
      }
    });
  }
  update() {
    pet.setPosition(player.x + 50, player.y + 10);

    this.events.emit("moving", [player.x, player.y]);
    light.update(player);
    if (this.isRole == 1) {
      kill.on("pointerdown", () => {
        //console.log();
        if (canKill) {
          this.sound.play("killAudio", false);
          let killId = otherPlayerId[indexKill];
          let colorKill = (Object((this.Info.players)[killId]).color)
          playerKilled.anims.play("player-dead_" + colorKill, true);
          this.socket.emit("killed", ({ playerId: otherPlayerId[indexKill], roomId: this.state.roomKey }));
          otherPlayer = otherPlayer.filter((player) => {
            return player !== playerKilled;
          });
          console.log(otherPlayerId[indexKill]); // emit socket id player killed
          otherPlayerId = otherPlayerId.filter((player) => {
            return player !== otherPlayerId[indexKill];
          });
          console.log("emitted");
          canKill = false;
        } else {
          console.log("no kill");
        }
      });

      //nếu player đang trốn vent thì chạy hàm này để hiện arrow của vent đó
      if (is_hidden == true) {
        playercur();
      }

      //vì phaser chưa có phương thức xác định bắt sự kiện khi player tiếp xúc với sprite hoặc player rời xa sprite nên ta sử dụng emit để gửi sự kiện overlapstart và overlapend
      // var touching = !player.body.touching.none;
      var wasTouching = !player.body.wasTouching.none;
      // If you want 'touching or embedded' then use:
      var touching = !player.body.touching.none || player.body.embedded;
      if (touching && !wasTouching) player.emit("overlapstart");
      else if (!touching && wasTouching) player.emit("overlapend");



      let playerMoved = false;
      player.setVelocity(0);


      //nếu is_hidden bằng true có nghĩa là player đang trốn vent nên sẽ ko di chuyển bằng input được
      if (cursors.left.isDown && is_hidden == false) {
        player.anims.play("player-walk_" + color, true);
        player.setVelocityX(-PLAYER_SPEED);
        player.scaleX = -1;
        player.body.offset.x = 40;
        playerMoved = true;
      } else if (cursors.right.isDown && is_hidden == false) {
        player.anims.play("player-walk_" + color, true);
        player.setVelocityX(PLAYER_SPEED);
        player.scaleX = 1;
        player.body.offset.x = 0;
        playerMoved = true;
      }
      if (cursors.up.isDown && is_hidden == false) {
        player.anims.play("player-walk_" + color, true);
        player.setVelocityY(-PLAYER_SPEED);
        playerMoved = true;
      } else if (cursors.down.isDown && is_hidden == false) {
        player.anims.play("player-walk_" + color, true);
        player.setVelocityY(PLAYER_SPEED);
        playerMoved = true;
      }
      if (playerMoved) {
        this.socket.emit("move", {
          x: player.x,
          y: player.y,
          roomId: this.state.roomKey,
        });

        let index = 0;

        for (let other of otherPlayer) {
          if (
            Math.abs(Math.floor(player.x) - Math.floor(other.x)) <= 100 &&
            Math.abs(Math.floor(player.y) - Math.floor(other.y)) <= 100
          ) {
            playerKilled = other; //lấy player đứng gần
            indexKill = index;
            kill.alpha = 1;
            canKill = true;
            break;
          }
          index += 1;
        }
        if (index === otherPlayer.length) {
          canKill = false;
          kill.alpha = 0.5;
        }
      }
    }
    //canKill = false
    if (alive == true) {
      let playerMoved = false;
      player.setVelocity(0);

      if (
        !cursors.left.isDown &&
        !cursors.right.isDown &&
        !cursors.up.isDown &&
        !cursors.down.isDown
      ) {
        pet.anims.play(`${BSLUG}-idle`);
      }

      if (cursors.left.isDown) {
        pet.anims.play(`${BSLUG}-walk`, true);
        player.anims.play("player-walk_" + color, true);
        player.setVelocityX(-PLAYER_SPEED);
        player.scaleX = -1;
        pet.scaleX = -1;
        player.body.offset.x = 40;
        playerMoved = true;
      } else if (cursors.right.isDown) {
        pet.anims.play(`${BSLUG}-walk`, true);
        player.anims.play("player-walk_" + color, true);
        player.setVelocityX(PLAYER_SPEED);
        player.scaleX = 1;
        pet.scaleX = 1;
        player.body.offset.x = 0;
        playerMoved = true;
      }
      if (cursors.up.isDown) {
        pet.anims.play(`${BSLUG}-walk`, true);
        player.anims.play("player-walk_" + color, true);
        player.setVelocityY(-PLAYER_SPEED);
        playerMoved = true;
      } else if (cursors.down.isDown) {
        pet.anims.play(`${BSLUG}-walk`, true);
        player.anims.play("player-walk_" + color, true);
        player.setVelocityY(PLAYER_SPEED);
        playerMoved = true;
      }

      if (playerMoved) {
        this.socket.emit("move", {
          x: player.x,
          y: player.y,
          roomId: this.state.roomKey,
        });
        player.movedLastFrame = true;
      } else {
        if (player.movedLastFrame) {
          this.socket.emit("moveEnd", { roomId: this.state.roomKey });
        }
        player.movedLastFrame = false;
      }
      const mission = new Mission(
        "theSkeld",
        map_missions,
        export_missions,
        this.scene,
        player.x,
        player.y
      );
      const check_mission = mission.check_mission();
      if (check_mission) {
        //blink blink marker
        useButton.alpha = 1;
      }
      useButton.alpha = check_mission ? 1 : 0.5;

      useButton.on("pointerup", function (e) {
        if (check_mission) {
          launch_scene = true;
        }
      });

      if (launch_scene && check_mission != undefined) {
        //this.scene.pause("game");

        this.scene.launch(check_mission.scene, {
          x: check_mission.x,
          y: check_mission.y,
          sprite: check_mission.sprite
        });
        launch_scene = false;
      }
    }

    //******************GHOST */
    //
  }
}

// hiện arrow của vent khi player tới gần
function playercur() {
  vent_des.get(key).forEach((element) => {
    element.setVisible(true);
  });
}
function circleOverlap(player, vent) {
  temp = vent;
  is_vent = true;
  //lấy key string của vent hiện tại dựa trên x y của sprite vent
  key = getKey([vent.x, vent.y + 10])[0];
}
// hiện arrow của vent khi player tới gần
//hàm lấy key từ hashmap dựa trên value của key
function getKey(val) {
  return [...vent_cord].find(
    ([key, value]) => JSON.stringify(val) === JSON.stringify(value)
  );
}

export default Game;
