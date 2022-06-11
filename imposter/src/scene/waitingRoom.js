import Phaser from "phaser";
import dropShip from "../assets/img/Dropship.png";
import lobby from "../assets/tilemaps/lobby.json";

import playerpng from "../assets/player/player_sprite/player_color/player_base.png";
import playerjson from "../assets/player/player_sprite/player_color/player_base.json";

/* *****SKINS***** */
//PANTS
import archaeologistpng from "../assets/player/player_sprite/pants/archaeologist.png";
import archaeologistjson from "../assets/player/player_sprite/pants/archaeologist.json";
import policepng from "../assets/player/player_sprite/pants/police.png";
import policejson from "../assets/player/player_sprite/pants/police.json";
import hazmatpng from "../assets/player/player_sprite/pants/hazmat.png";
import hazmatjson from "../assets/player/player_sprite/pants/hazmat.json";

//HAT
import hat1 from "../assets/player/preload_assets/skin/hat/hats0005.png";

/* *****PLAYER COLORS***** */
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
  BEDCRAB,
  CREWMIN,
  DOG,
  ELLIE,
  HAMPSTER,
  ROBIT,
  SQUIG,
  STICKMIN,
  TWITCH,
  UFO,
  ARCHAEOLOGIST,
  POLICE,
  SECGUARD,
  WALL,
  CCC,
  HAZMAT,
} from "../consts/constants";
import eventsCenter from "./eventsCenter";

import bslugjson from "../assets/player/pet_sprite/bslug.json";
import bslugpng from "../assets/player/pet_sprite/bslug.png";
import bedcrabjson from "../assets/player/pet_sprite/bedcrab.json";
import bedcrabpng from "../assets/player/pet_sprite/bedcrab.png";
import crewminjson from "../assets/player/pet_sprite/crewmin.json";
import crewminpng from "../assets/player/pet_sprite/crewmin.png";
import dogjson from "../assets/player/pet_sprite/dog.json";
import dogpng from "../assets/player/pet_sprite/dog.png";
import elliejson from "../assets/player/pet_sprite/ellie.json";
import elliepng from "../assets/player/pet_sprite/ellie.png";
import hampsterjson from "../assets/player/pet_sprite/hampster.json";
import hampsterpng from "../assets/player/pet_sprite/hampster.png";
import robitjson from "../assets/player/pet_sprite/robit.json";
import robitpng from "../assets/player/pet_sprite/robit.png";
import squigjson from "../assets/player/pet_sprite/squig.json";
import squigpng from "../assets/player/pet_sprite/squig.png";
import stickminjson from "../assets/player/pet_sprite/stickmin.json";
import stickminpng from "../assets/player/pet_sprite/stickmin.png";
import twitchjson from "../assets/player/pet_sprite/twitch.json";
import twitchpng from "../assets/player/pet_sprite/twitch.png";
import ufojson from "../assets/player/pet_sprite/ufo.json";
import ufopng from "../assets/player/pet_sprite/ufo.png";

let cursors;
let otherPlayer = new Array();
let otherPlayerId = new Array();
let pressedKeys = [];
let defaultPlayer = {};
let stt = 0;

let player, pants_skin, hat_skin;
var color = "";
let pet = null;
var pet_type, pants_type, hat_type;
var player_container;
var isLeft = false;
var isMirror = false;

export default class waitingRoom extends Phaser.Scene {
  constructor() {
    super({
      key: "waitingRoom",
    });
    this.state = {};
  }
  init(data) {
    this.socket = data.socket;
    this.textInput = data.textInput;

    this.playerChangedSkin = data.playerChangedSkin;
    this.numberImposter = data.numberImposter;
    this.numberPlayer = data.numberPlayer;
    this.test = data.test;
  }
  preload() {
    this.load.image("dropShip", dropShip);
    this.load.tilemapTiledJSON("lobby", lobby);
    this.load.atlas("playerbase", playerpng, playerjson);

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

    this.load.atlas(
      `${ARCHAEOLOGIST}_pants`,
      archaeologistpng,
      archaeologistjson
    );

    this.load.atlas(`${POLICE}_pants`, policepng, policejson);
    this.load.atlas(`${HAZMAT}_pants`, hazmatpng, hazmatjson);

    this.load.image("hat", hat1);

    this.load.atlas(BSLUG, bslugpng, bslugjson);
    this.load.atlas(BEDCRAB, bedcrabpng, bedcrabjson);
    this.load.atlas(CREWMIN, crewminpng, crewminjson);
    this.load.atlas(DOG, dogpng, dogjson);
    this.load.atlas(ELLIE, elliepng, elliejson);
    this.load.atlas(HAMPSTER, hampsterpng, hampsterjson);
    this.load.atlas(ROBIT, robitpng, robitjson);
    this.load.atlas(SQUIG, squigpng, squigjson);
    this.load.atlas(STICKMIN, stickminpng, stickminjson);
    this.load.atlas(TWITCH, twitchpng, twitchjson);
    this.load.atlas(UFO, ufopng, ufojson);

    // console.log('preload');
  }

  create() {
    const lobby = this.make.tilemap({ key: "lobby" });
    const tileset = lobby.addTilesetImage("Dropship", "dropShip");
    const lobby_tileset = lobby.createLayer("Background", tileset);
    const text = this.add
      .text(5, 5, "ID Room: " + this.textInput)
      .setScrollFactor(0);

    const customize = this.add
      .image(800, 700, "customizeBtn")
      .setScrollFactor(0)
      .setInteractive({ useHandCursor: true });

    lobby_tileset.setCollisionByProperty({ collides: true });

    //cursor to direct
    cursors = this.input.keyboard.createCursorKeys();

    player = this.physics.add.sprite(0, 0, PLAYER_BLUE, "idle.png");
    color = "blue";
    defaultPlayer.player = player;
    this.playerChangedSkin = defaultPlayer;

    pants_type = POLICE;
    pants_skin = this.physics.add.sprite(
      player.x + 0.75,
      player.y + 10,
      `${pants_type}_pants`,
      `${pants_type}_Idle.png`
    );

    hat_skin = this.physics.add.sprite(player.x, player.y - 25, "hat", 0);

    player_container = this.add
      .container(player.x, player.y, [player, pants_skin, hat_skin])
      .setSize(player.width, player.height);
    this.physics.add.existing(player_container);
    // tạo theo số lượng other player vào

    // for (let i = 0; i < otherPlayerId.length; i++) {
    //   otherPlayer[i] = this.physics.add.sprite(
    //     -45 + 20 * i,
    //     26 + 20 * i,
    //     "playerbase",
    //     "idle.png"
    //   );
    // }
    // stt = otherPlayer.length;

    /* *********************CREATING ANIMATIONS FOR PLAYER COLORS********************* */

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
      frameRate: 16,
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
      repeat: -1,
      frameRate: 24,
    });

    /* *********************CREATING ANIMATIONS FOR PETS********************* */

    this.anims.create({
      key: `${BSLUG}-walk`,
      frames: this.anims.generateFrameNames(BSLUG, {
        start: 1,
        end: 18,
        prefix: `${BSLUG}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${BSLUG}-idle`,
      frames: this.anims.generateFrameNames(BSLUG, {
        start: 1,
        end: 48,
        prefix: `${BSLUG}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${BEDCRAB}-walk`,
      frames: this.anims.generateFrameNames(BEDCRAB, {
        start: 1,
        end: 18,
        prefix: `${BEDCRAB}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${BEDCRAB}-idle`,
      frames: this.anims.generateFrameNames(BEDCRAB, {
        start: 1,
        end: 48,
        prefix: `${BEDCRAB}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${CREWMIN}-walk`,
      frames: this.anims.generateFrameNames(CREWMIN, {
        start: 1,
        end: 18,
        prefix: `${CREWMIN}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${CREWMIN}-idle`,
      frames: this.anims.generateFrameNames(CREWMIN, {
        start: 1,
        end: 48,
        prefix: `${CREWMIN}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${DOG}-walk`,
      frames: this.anims.generateFrameNames(DOG, {
        start: 1,
        end: 18,
        prefix: `${DOG}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${DOG}-idle`,
      frames: this.anims.generateFrameNames(DOG, {
        start: 1,
        end: 48,
        prefix: `${DOG}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${ELLIE}-walk`,
      frames: this.anims.generateFrameNames(ELLIE, {
        start: 1,
        end: 18,
        prefix: `${ELLIE}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${ELLIE}-idle`,
      frames: this.anims.generateFrameNames(ELLIE, {
        start: 1,
        end: 48,
        prefix: `${ELLIE}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${HAMPSTER}-walk`,
      frames: this.anims.generateFrameNames(HAMPSTER, {
        start: 1,
        end: 18,
        prefix: `${HAMPSTER}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${HAMPSTER}-idle`,
      frames: this.anims.generateFrameNames(HAMPSTER, {
        start: 1,
        end: 48,
        prefix: `${HAMPSTER}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${ROBIT}-walk`,
      frames: this.anims.generateFrameNames(ROBIT, {
        start: 1,
        end: 18,
        prefix: `${ROBIT}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${ROBIT}-idle`,
      frames: this.anims.generateFrameNames(ROBIT, {
        start: 1,
        end: 48,
        prefix: `${ROBIT}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${SQUIG}-walk`,
      frames: this.anims.generateFrameNames(SQUIG, {
        start: 1,
        end: 18,
        prefix: `${SQUIG}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${SQUIG}-idle`,
      frames: this.anims.generateFrameNames(SQUIG, {
        start: 1,
        end: 48,
        prefix: `${SQUIG}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${STICKMIN}-walk`,
      frames: this.anims.generateFrameNames(STICKMIN, {
        start: 1,
        end: 18,
        prefix: `${STICKMIN}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${STICKMIN}-idle`,
      frames: this.anims.generateFrameNames(STICKMIN, {
        start: 1,
        end: 48,
        prefix: `${STICKMIN}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${TWITCH}-walk`,
      frames: this.anims.generateFrameNames(TWITCH, {
        start: 1,
        end: 18,
        prefix: `${TWITCH}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${TWITCH}-idle`,
      frames: this.anims.generateFrameNames(TWITCH, {
        start: 1,
        end: 48,
        prefix: `${TWITCH}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${UFO}-walk`,
      frames: this.anims.generateFrameNames(UFO, {
        start: 1,
        end: 18,
        prefix: `${UFO}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${UFO}-idle`,
      frames: this.anims.generateFrameNames(UFO, {
        start: 1,
        end: 48,
        prefix: `${UFO}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    /* *********************CREATING ANIMATIONS FOR SKINS********************* */

    //For skis that don't have mirror animations
    this.anims.create({
      key: `${pants_type}_walk`,
      frames: this.anims.generateFrameNames(`${pants_type}_pants`, {
        start: 1,
        end: 12,
        prefix: `${pants_type}_Walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    this.anims.create({
      key: `${pants_type}_idle`,
      frames: [
        {
          key: `${pants_type}_pants`,
          frame: `${pants_type}_Idle.png`,
        },
      ],
    });

    //For skins that have mirror animations
    if (
      pants_type == POLICE ||
      pants_type == ARCHAEOLOGIST ||
      pants_type == SECGUARD ||
      pants_type == WALL ||
      pants_type == CCC
    ) {
      isMirror = true;
      this.anims.create({
        key: `${pants_type}_walkMirror`,
        frames: this.anims.generateFrameNames(`${pants_type}_pants`, {
          start: 1,
          end: 12,
          prefix: `${pants_type}_WalkMirror`,
          suffix: ".png",
        }),
        repeat: -1,
        frameRate: 16,
      });

      this.anims.create({
        key: `${pants_type}_idleMirror`,
        frames: [
          {
            key: `${pants_type}_pants`,
            frame: `${pants_type}_IdleMirror.png`,
          },
        ],
      });
    } else isMirror = false;

    //Sound Effects
    this.input.keyboard.on("keyup", (e) => {
      this.sound.stopByKey("walk");

      pressedKeys = pressedKeys.filter((key) => key !== e.code);
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

    //Add collider with player and set camera to follow player
    this.physics.add.collider(player_container, lobby_tileset);
    this.cameras.main.startFollow(player_container, true);

    //tải lại mới khi có player mới vào có các player đã ở trong đó
    this.socket.emit("joinRoom", this.textInput);

    this.socket.on("setState", (states) => {
      // this.physics.resume();
      // STATE
      this.state.roomKey = states.roomKey;
      this.state.host = Object.keys(states.players)[0];

      //IF HOST
      if (this.socket.id == this.state.host) {
        const start = this.add
          .image(960, 700, "startBtn")
          .setScrollFactor(0)
          .setInteractive({ useHandCursor: true });

        start.on("pointerdown", () => {
          // custom by host   *********SETTING input from customize *************
          let imposter = this.numberImposter ?? 1;
          let player = this.numberPlayer;
          // let imposter= this.numberImposter;
          // let player= this.numberPlayer;
          let roomId = this.textInput;
          this.socket.emit("letgo", { roomId, imposter, player });
          console.log("after click");
          // console.log("changedskin: ", this.playerChangedSkin);
          // console.log("number imposter: ", imposter);
          // console.log("number player: ", player);
          //this.scene.launch('game', { socket: this.socket, textInput: this.textInput, numPlayers: numPlayers })
        });
      }
    });

    this.socket.on("currentPlayers", ({ players, numPlayers }) => {
      for (let i = 0; i < numPlayers; i++) {
        if (this.socket.id !== Object.keys(players)[i]) {
          otherPlayerId.push(Object.keys(players)[i]);
          otherPlayer[stt] = this.physics.add.sprite(
            Object.values(players)[i].x,
            Object.values(players)[i].y,
            "playerbase",
            "idle.png"
          );
          stt = stt + 1;
        }
      }
      // console.log(otherPlayerId);
    });

    //update skin current in room
    this.socket.on("changeSkin", ({ color, id }) => {
      let index = otherPlayerId.findIndex((Element) => Element == id);
      otherPlayer[index].destroy();
      otherPlayer[index] = this.physics.add.sprite(
        -45,
        26,
        "player_base_" + color,
        "idle.png"
      );
    });

    this.socket.on("newPlayer", ({ playerInfo, numPlayers }) => {
      // listplyer socket có khác với tại local khong
      otherPlayerId.push(playerInfo.playerId);
      console.log(otherPlayerId);
      otherPlayer[stt] = this.physics.add.sprite(
        -40 + 10 * stt,
        30 + 10 * stt,
        "playerbase",
        "idle.png"
      );
      console.log("stt" + stt);
      stt += 1;
      console.log("new players " + otherPlayer[stt]);
      console.log("stt" + stt);
    });

    // this.socket.on("move", ({ x, y, playerId }) => {
    //   console.log({ x, y, playerId });

    //   let index = otherPlayerId.findIndex((Element) => Element == playerId);
    //   //id = index;
    //   console.log(index);

    //   if (otherPlayer[index].x > x) {
    //     otherPlayer[index].flipX = true;
    //   } else if (otherPlayer[index].x < x) {
    //     otherPlayer[index].flipX = false;
    //   }
    //   otherPlayer[index].x = x;
    //   otherPlayer[index].y = y;
    //   otherPlayer[index].moving = true;

    //   if (otherPlayer[index].moving && !otherPlayer[index].anims.isPlaying) {
    //     otherPlayer[index].play("player-walk");
    //   } else if (
    //     !otherPlayer[index].moving &&
    //     otherPlayer[index].anims.isPlaying
    //   ) {
    //     otherPlayer[index].stop("player-walk");
    //   }
    // });

    // this.socket.on("moveEnd", ({ playerId }) => {
    //   let index = otherPlayerId.findIndex((Element) => Element == playerId);
    //   otherPlayer[index].moving = false;
    //   otherPlayer[index].anims.play("player-idle");
    //   if (otherPlayer[index].moving && !otherPlayer[index].anims.isPlaying) {
    //     otherPlayer[index].play("player-walk");
    //   } else if (
    //     !otherPlayer[index].moving &&
    //     otherPlayer[index].anims.isPlaying
    //   ) {
    //     otherPlayer[index].stop("player-walk");
    //   }
    // });

    customize.on("pointerdown", () => {
      // this.input.on('pointerdown', () => this.scene.start('ChangeSkin'))
      // this.scene.pause("waitingRoom");
      this.scene.launch("ChangeSkin", {
        socket: this.socket,
        textInput: this.textInput,
      });
      this.scene.bringToTop("ChangeSkin");
    });

    this.socket.on("gogame", ({ numPlayers, idPlayers }) => {
      //console.log(numPlayers);
      // this.scene.stop('waitingRoom')

      // ********anouning ROLE****//

      //*****start game */
      // this.scene.launch('game', { socket: this.socket, textInput: this.textInput, numPlayers: numPlayers, idPlayers: idPlayers })
      this.scene.launch("introCrew", {
        socket: this.socket,
        textInput: this.textInput,
        numPlayers: numPlayers,
        idPlayers: idPlayers,
        numberImposter: this.numberImposter ?? 1,
        playerChangedSkin: this.playerChangedSkin,
      });
      this.game.scene.stop("waitingRoom");
    });

    eventsCenter.on("update", (data) => {
      this.playerChangedSkin = data.playerChangedSkin;
      this.numberImposter = data.numberImposter;
      this.numberPlayer = data.numberPlayer;
      console.log("player changed skin: ", this.playerChangedSkin);
      let colorPlayerChanged =
        this.playerChangedSkin.player.texture.key ?? "nothing";
      switch (colorPlayerChanged) {
        case "player0":
          player.destroy();
          player = this.physics.add.sprite(-45, 26, PLAYER_BLUE, "idle.png");
          color = "blue";
          break;
        case "player1":
          player.destroy();
          player = this.physics.add.sprite(-45, 26, PLAYER_YELLOW, "idle.png");
          color = "yellow";
          break;
        case "player2":
          player.destroy();
          player = this.physics.add.sprite(-45, 26, PLAYER_PINK, "idle.png");
          color = "pink";
          break;
        case "player3":
          player.destroy();
          player = this.physics.add.sprite(-45, 26, PLAYER_ORANGE, "idle.png");
          color = "orange";
          break;
        case "player4":
          player.destroy();
          player = this.physics.add.sprite(
            -45,
            26,
            PLAYER_GRAY_DARK,
            "idle.png"
          );
          color = "gray_dark";
          break;
        case "player5":
          player.destroy();
          player = this.physics.add.sprite(
            -45,
            26,
            PLAYER_GRAY_LIGHT,
            "idle.png"
          );
          color = "gray_light";
          break;
        case "player6":
          player.destroy();
          player = this.physics.add.sprite(-45, 26, PLAYER_PURPLE, "idle.png");
          color = "purple";
          break;
        case "player7":
          player.destroy();
          player = this.physics.add.sprite(
            -45,
            26,
            PLAYER_BLUE_LIGHT,
            "idle.png"
          );
          color = "blue_light";
          break;
        case "player8":
          player.destroy();
          player = this.physics.add.sprite(
            -45,
            26,
            PLAYER_BLUE_DARK,
            "idle.png"
          );
          color = "blue_dark";
          break;
        case "player9":
          player.destroy();
          player = this.physics.add.sprite(-45, 26, PLAYER_RED, "idle.png");
          color = "red";
          break;
        case "player10":
          player.destroy();
          player = this.physics.add.sprite(
            -45,
            26,
            PLAYER_GREEN_LIGHT,
            "idle.png"
          );
          color = "green_light";
          break;
        case "player11":
          player.destroy();
          player = this.physics.add.sprite(
            -45,
            26,
            PLAYER_GREEN_DARK,
            "idle.png"
          );
          color = "green_dark";
          break;
        default:
          player.destroy();
          player = this.physics.add.sprite(-45, 26, PLAYER_BLUE, "idle.png");
          color = "blue";
          break;
      }

      if (this.playerChangedSkin.pet) {
        let petChosen = this.playerChangedSkin.pet.texture.key ?? "nothing";
        switch (petChosen) {
          case "pet0":
            if (pet) {
              pet.destroy();
            }
            pet = null;
            pet_type = null;
            break;
          case "pet1":
            if (pet) {
              pet.destroy();
            }
            pet = this.physics.add.sprite(
              player.x + 50,
              player.y + 10,
              STICKMIN,
              "stickmin_idle1.png"
            );
            pet_type = STICKMIN;
            break;
          case "pet2":
            if (pet) {
              pet.destroy();
            }
            pet = this.physics.add.sprite(
              player.x + 50,
              player.y + 10,
              ELLIE,
              "ellie_idle1.png"
            );
            pet_type = ELLIE;
            break;
          case "pet3":
            if (pet) {
              pet.destroy();
            }
            pet = this.physics.add.sprite(
              player.x + 50,
              player.y + 10,
              CREWMIN,
              "crewmin_idle1.png"
            );
            pet_type = CREWMIN;
            break;
          case "pet4":
            if (pet) {
              pet.destroy();
            }
            pet = this.physics.add.sprite(
              player.x + 50,
              player.y + 10,
              DOG,
              "dog_idle1.png"
            );
            pet_type = DOG;
            break;
          case "pet5":
            if (pet) {
              pet.destroy();
            }
            pet = this.physics.add.sprite(
              player.x + 50,
              player.y + 10,
              BEDCRAB,
              "bedcrab_idle1.png"
            );
            pet_type = BEDCRAB;
            break;
          case "pet6":
            if (pet) {
              pet.destroy();
            }
            pet = this.physics.add.sprite(
              player.x + 50,
              player.y + 10,
              ROBIT,
              "robit_idle1.png"
            );
            pet_type = ROBIT;
            break;
          case "pet7":
            if (pet) {
              pet.destroy();
            }
            pet = this.physics.add.sprite(
              player.x + 50,
              player.y + 10,
              BSLUG,
              "bslug_idle1.png"
            );
            pet_type = BSLUG;
            break;
          case "pet8":
            if (pet) {
              pet.destroy();
            }
            pet = this.physics.add.sprite(
              player.x + 50,
              player.y + 10,
              HAMPSTER,
              "hampster_idle1.png"
            );
            pet_type = HAMPSTER;
            break;
          case "pet9":
            if (pet) {
              pet.destroy();
            }
            pet = this.physics.add.sprite(
              player.x + 50,
              player.y + 10,
              SQUIG,
              "squig_idle1.png"
            );
            pet_type = SQUIG;
            break;
          case "pet10":
            if (pet) {
              pet.dstroy();
            }
            pet = this.physics.add.sprite(
              player.x + 50,
              player.y + 10,
              UFO,
              "ufo_idle1.png"
            );
            pet_type = UFO;
            break;
          case "pet11":
            if (pet) {
              pet.destroy();
            }
            pet = this.physics.add.sprite(
              player.x + 50,
              player.y + 10,
              TWITCH,
              "twitch_idle1.png"
            );
            pet_type = TWITCH;
            break;
        }
      }
      //send color player change
      console.log(color + " " + this.socket.id);
      this.socket.emit("changeSkin", {
        color: color,
        id: this.socket.id,
        room: this.state.roomKey,
      });
      // this.physics.add.collider(player, lobby_tileset);
      // this.physics.add.collider(player_container, lobby_tileset);
      // this.cameras.main.startFollow(player, true);
    });

    // this.events.on('resume', (data) => {
    //   console.log('resume');
    //   console.log(data);
    //   this.socket = data.socket;
    //   this.textInput = data.textInput;
    //   this.playerChangedSkin = data.playerChangedSkin;
    //   this.numberImposter = data.numberImposter;
    //   this.numberPlayer = data.numberPlayer
    //   ///  console.log(dataResume.test);

    // })
  }

  update() {
    isLeft == true && isMirror == true ? pants_skin.setPosition(player.x, player.y + 10) : null;
    if (pet) {
      pet.setPosition(player.x + 50, player.y + 10);
    }
    let playerMoved = false;
    player.setVelocity(0);
    player_container.body.setVelocity(0);
    var suffix = color;
    if (
      !cursors.left.isDown &&
      !cursors.right.isDown &&
      !cursors.up.isDown &&
      !cursors.down.isDown
    ) {
      if (pet) {
        pet.anims.play(`${pet_type}-idle`);
      }
      player.anims.play("player-idle_" + suffix);
      if (isMirror) {
        isLeft == true
        ? pants_skin.anims.play(`${pants_type}_idleMirror`)
        : pants_skin.anims.play(`${pants_type}_idle`);
      } else {
        pants_skin.anims.play(`${pants_type}_idle`);
      }
    }

    // when move
    if (cursors.left.isDown) {
      if (pet) {
        pet.anims.play(`${pet_type}-walk`, true);
        pet.scaleX = -1;
      }
      isLeft = true;
      player.anims.play("player-walk_" + suffix, true);
      if (isMirror) {
        pants_skin.anims.play(`${pants_type}_walkMirror`, true);
      } else {
        pants_skin.anims.play(`${pants_type}_walk`, true);
        pants_skin.scaleX = -1;
      }
      player_container.body.setVelocityX(-PLAYER_SPEED);
      player.scaleX = -1;
      player.body.offset.x = 40;
      hat_skin.scaleX = -1;
      playerMoved = true;
    } else if (cursors.right.isDown) {
      if (pet) {
        pet.anims.play(`${pet_type}-walk`, true);
        pet.scaleX = 1;
      }
      isLeft = false;
      player.anims.play("player-walk_" + suffix, true);
      pants_skin.anims.play(`${pants_type}_walk`, true);
      player_container.body.setVelocityX(PLAYER_SPEED);
      isMirror == false ? pants_skin.scaleX = 1 : null;
      player.scaleX = 1;
      player.body.offset.x = 0;
      hat_skin.scaleX = 1;
      playerMoved = true;
    }

    if (cursors.up.isDown) {
      if (pet) {
        pet.anims.play(`${pet_type}-walk`, true);
      }
      player.anims.play("player-walk_" + suffix, true);
      isLeft == true && isMirror == true
        ? pants_skin.anims.play(`${pants_type}_walkMirror`, true)
        : pants_skin.anims.play(`${pants_type}_walk`, true);
      player_container.body.setVelocityY(-PLAYER_SPEED);
      playerMoved = true;
    } else if (cursors.down.isDown) {
      if (pet) {
        pet.anims.play(`${pet_type}-walk`, true);
      }
      player.anims.play("player-walk_" + suffix, true);
      isLeft == true && isMirror == true
        ? pants_skin.anims.play(`${pants_type}_walkMirror`, true)
        : pants_skin.anims.play(`${pants_type}_walk`, true);
      player_container.body.setVelocityY(PLAYER_SPEED);
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
  }
}
