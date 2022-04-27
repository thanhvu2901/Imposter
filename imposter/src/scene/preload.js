import Phaser from "phaser";
import { io } from 'socket.io-client'

import background from "../assets/img/background.jpg";
import logo from "../assets/img/logo.png";
import play from "../assets/img/play_button.png";
import options from "../assets/img/options_button.png";
import cat from "../assets/img/cat.png";
import audio from "../assets/audio/audio.mp3";
import MainMenuScene from "./menu";
import setting from '../assets/img/setting.png'
import playerSprite from "../assets/img/player.png";
import shipImg from "../assets/img/theSkeld.png";
import idle from "../assets/img/idle.png";
import facebook from '../assets/img/fb.png'
import fix from '../assets/img/fix_wiring/Fix_Wiring.png'

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
    progressBox.fillRect(320, 280, 320, 30);

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
    this.load.image('cat', cat);
    this.load.image('options', options);
    this.load.image('logo', logo);
    this.load.audio('audio', audio)
    this.load.image('setting', setting)
    this.load.image('facebook', facebook)
    this.load.image("ship", shipImg);
    this.load.image('fix', fix)


    this.load.spritesheet("player", playerSprite, {
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
      progressBar.fillRect(320, 280, 320 * value, 30);
      percentText.setText(parseInt(value * 100) + '%');
    });

    this.load.on('complete', function () {
      console.log('complete');
      progressBar.destroy();
      progressBox.destroy();
      percentText.destroy();
      loadingText.destroy();

    });

    //setup socket
    // socket = io('localhost:3000')

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


    var sprite = this.add.image(500, 280, 'logo').setAlpha(0);

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
      progressBar.fillRect(320, 280, 320 * value, 30);
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
