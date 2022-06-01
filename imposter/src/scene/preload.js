import Phaser from "phaser";
import background from "../assets/img/background.jpg";
import logo from "../assets/img/logo.png";
import play from "../assets/img/play_button.png";
import random from "../assets/img/Random.png"
import joinRoom from "../assets/img/joinRoom.png"
import createRoom from "../assets/img/Create.png"
import enterRoom from "../assets/img/enterRoom.png"
import Cpublic from "../assets/img/Public.png"
import Cprivate from "../assets/img/Private.png"
import options from "../assets/img/options_button.png";

import arrow from "../assets/img/arrow.png"
import tileImg from "../assets/img/theSkeld.png";

import MainMenuScene from "./menu";
import setting from '../assets/img/setting.png'
import playerSprite from "../assets/img/player.png";
import shipImg from "../assets/img/theSkeld.png";
import idle from "../assets/img/idle.png";
import facebook from '../assets/img/fb.png'
import fix from '../assets/img/fix_wiring/Fix_Wiring.png'
import useBtn from '../assets/img/useButton.png'
import closeBtn from '../assets/img/closeButton.png'
import sabotage from '../assets/img/sabotage.png'
import customizeBtn from '../assets/img/customize.png'
import startBtn from '../assets/img/startButton.png'
import dead from '../assets/player/Dead.png'
import killAudio from '../assets/audio/kill/impostor_kill.wav'
import footStep from "../assets/audio/amination/Walk.mp3";
import ventOpen from "../assets/audio/vent/Vent_open.mp3";
import Icon from "../assets/img/mini.png"

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
import vent_button from "../assets/img/vent_button.png"
import UseButton from "../assets/tasks/Align Engine Output/Use.webp.png";

import guideMap from "../assets/img/guideMap.png"

import SubMenu from "./submenu";

import {
  PLAYER_SPRITE_WIDTH,
  PLAYER_SPRITE_HEIGHT,
} from "../consts/constants";
import Login from "./login";
import FixWiring from "./state/minigame/fix_wiring";

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
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);



    //);
    // những thứ cần preload
    this.load.image('background', background);
    this.load.image('play', play);

    this.load.image('options', options);
    this.load.image('logo', logo);
    this.load.image('random', random)
    this.load.image('public', Cpublic)
    this.load.image('private', Cprivate)
    this.load.image('createRoom', createRoom)
    this.load.image('joinRoom', joinRoom)
    this.load.image('enterRoom', enterRoom)
    this.load.image('setting', setting)
    this.load.image('facebook', facebook)
    this.load.image("ship", shipImg);
    this.load.image('fix', fix)
    this.load.image('useBtn', useBtn)
    this.load.image('closeBtn', closeBtn)
    this.load.image('sabotage', sabotage)
    this.load.image('startBtn', startBtn);
    this.load.image('customizeBtn', customizeBtn)
    this.load.image('dead', dead)

    this.load.image('guideMap', guideMap)
    this.load.image('Icon', Icon);


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

    this.load.image("button", vent_button)
    this.load.image("KillButton", KillButton);
    this.load.image("UseButton", UseButton);
    this.load.image("arrow", arrow)
    this.load.image("tiles", tileImg);
    //audio
    this.load.audio('killAudio', killAudio)
    this.load.audio("walk", footStep);
    this.load.audio("vent", ventOpen);


    this.load.spritesheet("player_1", playerSprite, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });

    this.load.spritesheet("idle", idle, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });

    this.load.spritesheet('otherPlayer', playerSprite, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });


    this.load.on('progress', function (value) {

      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(380, 280, 380 * value, 30);
      percentText.setText(parseInt(value * 100) + '%');
    });

    this.load.on('complete', function () {
      console.log('complete');
      progressBar.destroy();
      progressBox.destroy();
      percentText.destroy();
      loadingText.destroy();

    });



  }
  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    // var background = this.add.tilemap(500, 280, 'background');

    var welcomeText = this.make.text({
      x: width / 2 - 180,
      y: height / 2 + 40,
      text: 'Welcome Imposter & click to start',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      },
      alpha: 0

    });
    //welcomeText.setOrigin(0.5, 0.5);


    var sprite = this.add.image(530, 280, 'logo').setAlpha(0);

    //chạy intro logo
    var intro = this.tweens.add({
      targets: [sprite, welcomeText],
      alphaTopLeft: { value: 1, duration: 5000, ease: 'Power1' },
      alphaBottomRight: { value: 1, duration: 5000, ease: 'Power1' },
      // onComplete: function () {
      //     console.log('menu');
      //     // this.run();
      //     this.load.sc
      // }
    });
    //this.input.on('pointerdown', () => this.scene.start('login', Login))
    this.input.on('pointerdown', () => this.scene.start('menu', MainMenuScene))
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
