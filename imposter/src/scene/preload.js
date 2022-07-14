import Phaser from "phaser";
import background from "../assets/img/background.jpg";
import logo from "../assets/img/logo.png";
import play from "../assets/img/play_button.png";
import random from "../assets/img/Random.png";
import joinRoom from "../assets/img/joinRoom.png";
import createRoom from "../assets/img/Create.png";
import enterRoom from "../assets/img/enterRoom.png";
import Cpublic from "../assets/img/Public.png";
import Cprivate from "../assets/img/Private.png";
import options from "../assets/img/options_button.png";

import arrow from "../assets/img/arrow.png";
import tileImg from "../assets/img/theSkeld.png";

import MainMenuScene from "./menu";
import setting from "../assets/img/setting.png";
import playerSprite from "../assets/img/player.png";
import shipImg from "../assets/img/theSkeld.png";
import idle from "../assets/img/idle.png";
import facebook from "../assets/img/fb.png";
import fix from "../assets/img/fix_wiring/Fix_Wiring.png";
import useBtn from "../assets/img/useButton.png";
import closeBtn from "../assets/img/closeButton.png";
import sabotage from "../assets/img/sabotage.png";
import customizeBtn from "../assets/img/customize.png";
import startBtn from "../assets/img/startButton.png";
import dead from "../assets/player/Dead.png";
import killAudio from "../assets/audio/kill/impostor_kill.wav";
import footStep from "../assets/audio/amination/Walk.mp3";
import ventOpen from "../assets/audio/vent/Vent_open.mp3";
import Icon from "../assets/img/mini.png";

import KillButton from "../assets/img/killButton.png";
import vent1 from "../assets/img/jump vent/vent1.png";
import vent2 from "../assets/img/jump vent/vent2.png";
import vent3 from "../assets/img/jump vent/vent3.png";
import vent4 from "../assets/img/jump vent/vent4.png";
import vent5 from "../assets/img/jump vent/vent5.png";
import vent6 from "../assets/img/jump vent/vent6.png";
import jump1 from "../assets/img/jump vent/Vent0001.png";
import jump2 from "../assets/img/jump vent/vent0002.png";
import jump3 from "../assets/img/jump vent/Vent0003.png";
import jump4 from "../assets/img/jump vent/Vent0004.png";
import jump5 from "../assets/img/jump vent/vent0005.png";
import jump6 from "../assets/img/jump vent/Vent0006.png";
import jump7 from "../assets/img/jump vent/Vent0007.png";
import vent_button from "../assets/img/vent_button.png";
import UseButton from "../assets/tasks/Align Engine Output/Use.webp.png";

import guideMap from "../assets/img/guideMap.png";

import SubMenu from "./submenu";

import playerpng from "../assets/player/player_sprite/player_color/player_base.png";
import playerjson from "../assets/player/player_sprite/player_color/player_base.json";
import player_ghost from "../assets/player/Base/ghost/ghost1.png";
import player_ghost_json from "../assets/player/Base/ghost/ghost1.json";

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

/* *****SKINS***** */
//PANTS
import policepng from "../assets/player/player_sprite/pants/police.png";
import policejson from "../assets/player/player_sprite/pants/police.json";
import archaeologistpng from "../assets/player/player_sprite/pants/archaeologist.png";
import archaeologistjson from "../assets/player/player_sprite/pants/archaeologist.json";
import secguardpng from "../assets/player/player_sprite/pants/secguard.png";
import secguardjson from "../assets/player/player_sprite/pants/secguard.json";
import wallpng from "../assets/player/player_sprite/pants/wall.png";
import walljson from "../assets/player/player_sprite/pants/wall.json";
import cccpng from "../assets/player/player_sprite/pants/ccc.png";
import cccjson from "../assets/player/player_sprite/pants/ccc.json";

import hazmatpng from "../assets/player/player_sprite/pants/hazmat.png";
import hazmatjson from "../assets/player/player_sprite/pants/hazmat.json";
import winterjacketpng from "../assets/player/player_sprite/pants/winterjacket.png";
import winterjacketjson from "../assets/player/player_sprite/pants/winterjacket.json";
import tarmacpng from "../assets/player/player_sprite/pants/tarmac.png";
import tarmacjson from "../assets/player/player_sprite/pants/tarmac.json";
import militarypng from "../assets/player/player_sprite/pants/military.png";
import militaryjson from "../assets/player/player_sprite/pants/military.json";
import suitblackpng from "../assets/player/player_sprite/pants/suitblack.png";
import suitblackjson from "../assets/player/player_sprite/pants/suitblack.json";
import astronautpng from "../assets/player/player_sprite/pants/astronaut.png";
import astronautjson from "../assets/player/player_sprite/pants/astronaut.json";
import captainpng from "../assets/player/player_sprite/pants/captain.png";
import captainjson from "../assets/player/player_sprite/pants/captain.json";
import scientistpng from "../assets/player/player_sprite/pants/scientist.png";
import scientistjson from "../assets/player/player_sprite/pants/scientist.json";
import mechanicpng from "../assets/player/player_sprite/pants/mechanic.png";
import mechanicjson from "../assets/player/player_sprite/pants/mechanic.json";
import suitwhitepng from "../assets/player/player_sprite/pants/suitwhite.png";
import suitwhitejson from "../assets/player/player_sprite/pants/suitwhite.json";

//HAT
import hat0 from "../assets/player/preload_assets/skin/hat/hats0001.png";
import hat1 from "../assets/player/preload_assets/skin/hat/hats0005.png";
import hat2 from "../assets/player/preload_assets/skin/hat/hats0006.png";
import hat3 from "../assets/player/preload_assets/skin/hat/hats0007.png";
import hat4 from "../assets/player/preload_assets/skin/hat/hats0008.png";
import hat5 from "../assets/player/preload_assets/skin/hat/hats0010.png";
import hat6 from "../assets/player/preload_assets/skin/hat/hats0012.png";
import hat7 from "../assets/player/preload_assets/skin/hat/hats0013.png";
import hat8 from "../assets/player/preload_assets/skin/hat/hats0015.png";
import hat9 from "../assets/player/preload_assets/skin/hat/hats0020.png";
import hat10 from "../assets/player/preload_assets/skin/hat/hats0021.png";
import hat11 from "../assets/player/preload_assets/skin/hat/hats0024.png";
import hat12 from "../assets/player/preload_assets/skin/hat/hats0025.png";
import hat13 from "../assets/player/preload_assets/skin/hat/hats0028.png";
import hat14 from "../assets/player/preload_assets/skin/hat/hats0031.png";
import hat15 from "../assets/player/preload_assets/skin/hat/hats0042.png";
import hat16 from "../assets/player/preload_assets/skin/hat/hats0043.png";
import hat17 from "../assets/player/preload_assets/skin/hat/hats0045.png";
import hat18 from "../assets/player/preload_assets/skin/hat/hats0053.png";
import hat19 from "../assets/player/preload_assets/skin/hat/hats0055.png";

// Pets
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

import {
  PLAYER_BASE,
  PLAYER_GHOST,
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
  POLICE,
  ARCHAEOLOGIST,
  SECGUARD,
  WALL,
  CCC,
  HAZMAT,
  WINTERJACKET,
  TARMAC,
  MILITARY,
  SUITBLACK,
  ASTRONAUT,
  CAPTAIN,
  SCIENTIST,
  MECHANIC,
  SUITWHITE,
} from "../consts/constants";

//element

class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: "preloader" });
  }

  preload() {
    this.load.image("logo", logo);

    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.9);
    progressBox.fillRect(380, 280, 380, 30);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    //);
    // những thứ cần preload
    this.load.image("background", background);
    this.load.image("play", play);

    this.load.image("options", options);
    this.load.image("logo", logo);
    this.load.image("random", random);
    this.load.image("public", Cpublic);
    this.load.image("private", Cprivate);
    this.load.image("createRoom", createRoom);
    this.load.image("joinRoom", joinRoom);
    this.load.image("enterRoom", enterRoom);
    this.load.image("setting", setting);
    this.load.image("facebook", facebook);
    this.load.image("ship", shipImg);
    this.load.image("fix", fix);
    this.load.image("useBtn", useBtn);
    this.load.image("closeBtn", closeBtn);
    this.load.image("sabotage", sabotage);
    this.load.image("startBtn", startBtn);
    this.load.image("customizeBtn", customizeBtn);
    this.load.image("dead", dead);

    this.load.image("guideMap", guideMap);
    this.load.image("Icon", Icon);

    this.load.image("vent_1", vent1);
    this.load.image("vent_2", vent2);
    this.load.image("vent_3", vent3);
    this.load.image("vent_4", vent4);
    this.load.image("vent_5", vent5);
    this.load.image("vent_6", vent6);
    this.load.image("jump_1", jump1, 36, 40);
    this.load.image("jump_2", jump2, 36, 40);
    this.load.image("jump_3", jump3, 36, 40);
    this.load.image("jump_4", jump4, 36, 40);
    this.load.image("jump_5", jump5, 36, 40);
    this.load.image("jump_6", jump6, 36, 40);
    this.load.image("jump_7", jump7, 36, 40);

    this.load.image("button", vent_button);
    this.load.image("KillButton", KillButton);
    this.load.image("UseButton", UseButton);
    this.load.image("arrow", arrow);
    this.load.image("tiles", tileImg);
    //audio
    this.load.audio("killAudio", killAudio);
    this.load.audio("walk", footStep);
    this.load.audio("vent", ventOpen);

    this.load.on("progress", function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(380, 280, 380 * value, 30);
      percentText.setText(parseInt(value * 100) + "%");
    });

    this.load.on("complete", function () {
      console.log("complete");
      progressBar.destroy();
      progressBox.destroy();
      percentText.destroy();
      loadingText.destroy();
    });

    this.load.atlas(PLAYER_BASE, playerpng, playerjson);
    this.load.atlas(PLAYER_GHOST, player_ghost, player_ghost_json);

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

    //pants
    this.load.atlas(`${POLICE}_pants`, policepng, policejson);
    this.load.atlas(`${ARCHAEOLOGIST}_pants`, archaeologistpng, archaeologistjson);
    this.load.atlas(`${SECGUARD}_pants`, secguardpng, secguardjson);
    this.load.atlas(`${WALL}_pants`, wallpng, walljson);
    this.load.atlas(`${CCC}_pants`, cccpng, cccjson);
    this.load.atlas(`${HAZMAT}_pants`, hazmatpng, hazmatjson);
    this.load.atlas(`${WINTERJACKET}_pants`, winterjacketpng, winterjacketjson);
    this.load.atlas(`${TARMAC}_pants`, tarmacpng, tarmacjson);
    this.load.atlas(`${MILITARY}_pants`, militarypng, militaryjson);
    this.load.atlas(`${SUITBLACK}_pants`, suitblackpng, suitblackjson);
    this.load.atlas(`${ASTRONAUT}_pants`, astronautpng, astronautjson);
    this.load.atlas(`${CAPTAIN}_pants`, captainpng, captainjson);
    this.load.atlas(`${SCIENTIST}_pants`, scientistpng, scientistjson);
    this.load.atlas(`${MECHANIC}_pants`, mechanicpng, mechanicjson);
    this.load.atlas(`${SUITWHITE}_pants`, suitwhitepng, suitwhitejson);

    //hats
    this.load.image("hat0", hat0);
    this.load.image("hat1", hat1);
    this.load.image("hat2", hat2);
    this.load.image("hat3", hat3);
    this.load.image("hat4", hat4);
    this.load.image("hat5", hat5);
    this.load.image("hat6", hat6);
    this.load.image("hat7", hat7);
    this.load.image("hat8", hat8);
    this.load.image("hat9", hat9);
    this.load.image("hat10", hat10);
    this.load.image("hat11", hat11);
    this.load.image("hat12", hat12);
    this.load.image("hat13", hat13);
    this.load.image("hat14", hat14);
    this.load.image("hat15", hat15);
    this.load.image("hat16", hat16);
    this.load.image("hat17", hat17);
    this.load.image("hat18", hat18);
    this.load.image("hat19", hat19);

    //Pets
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
  }
  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    // var background = this.add.tilemap(500, 280, 'background');

    var welcomeText = this.make.text({
      x: width / 2 - 180,
      y: height / 2 + 40,
      text: "Welcome Imposter & click to start",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
      alpha: 0,
    });
    //welcomeText.setOrigin(0.5, 0.5);

    var sprite = this.add.image(530, 280, "logo").setAlpha(0);

    //chạy intro logo
    var intro = this.tweens.add({
      targets: [sprite, welcomeText],
      alphaTopLeft: { value: 1, duration: 5000, ease: "Power1" },
      alphaBottomRight: { value: 1, duration: 5000, ease: "Power1" },
      // onComplete: function () {
      //     console.log('menu');
      //     // this.run();
      //     this.load.sc
      // }
    });
    //this.input.on('pointerdown', () => this.scene.start('login', Login))
    this.input.on("pointerdown", () => this.scene.start("menu", MainMenuScene));
    // this.input.on('pointerdown', () => this.scene.start('fixWiring', FixWiring))

    this.load.on("progress", function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(380, 280, 380 * value, 30);
      percentText.setText(parseInt(value * 100) + "%");
    });

    this.load.on("complete", function () {
      console.log("complete");
      progressBar.destroy();
      progressBox.destroy();
      percentText.destroy();
      loadingText.destroy();
    });
  }
}
export default Preloader;
