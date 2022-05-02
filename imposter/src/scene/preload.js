import Phaser from "phaser";
import background from "../assets/img/background.jpg";
import logo from "../assets/img/logo.png";
import play from "../assets/img/play_button.png";
import options from "../assets/img/options_button.png";

import MainMenuScene from "./menu";
import setting from '../assets/img/setting.png'
import playerSprite from "../assets/img/player.png";
import shipImg from "../assets/img/theSkeld.png";
import idle from "../assets/img/idle.png";
import facebook from '../assets/img/fb.png'
import fix from '../assets/img/fix_wiring/Fix_Wiring.png'
import useBtn from '../assets/img/useButton.png'
import closeBtn from '../assets/img/closeButton.png'
import customizeBtn from '../assets/img/customize.png'
import startBtn from '../assets/img/startButton.png'
import footStep1 from '../assets/audio/amination/FootstepMetal01.mp3'
import footStep2 from '../assets/audio/amination/FootstepMetal02.mp3'
import footStep3 from '../assets/audio/amination/FootstepMetal03.mp3'
import footStep4 from '../assets/audio/amination/FootstepMetal04.mp3'
import footStep5 from '../assets/audio/amination/FootstepMetal05.mp3'
import footStep6 from '../assets/audio/amination/FootstepMetal06.mp3'
import footStep7 from '../assets/audio/amination/FootstepMetal07.mp3'
import footStep8 from '../assets/audio/amination/FootstepMetal08.mp3'
import killAudio from '../assets/audio/kill/impostor_kill.wav'



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

    this.load.image('setting', setting)
    this.load.image('facebook', facebook)
    this.load.image("ship", shipImg);
    this.load.image('fix', fix)
    this.load.image('useBtn', useBtn)
    this.load.image('closeBtn', closeBtn)
    this.load.image('startBtn', startBtn);
    this.load.image('customizeBtn', customizeBtn)

    //audio
    this.load.audio('footstep1', footStep1)
    this.load.audio('footstep2', footStep2)
    this.load.audio('footstep3', footStep3)
    this.load.audio('footstep4', footStep4)
    this.load.audio('footstep5', footStep5)
    this.load.audio('footstep6', footStep6)
    this.load.audio('footstep7', footStep7)
    this.load.audio('footstep8', footStep8)
    this.load.audio('killAudio', killAudio)
    // this.load.audioSprite('footStep',
    //   [footStep2, footStep3, footStep4, footStep5, footStep6, footStep7, footStep8], {

    //   loop: true,

    //   //duration: 5000
    // }

    // )


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
    // this.input.on('pointerdown', () => this.scene.start('login', Login))
    this.input.on('pointerdown', () => this.scene.start('menu', MainMenuScene))
    //this.input.on('pointerdown', () => this.scene.start('fixWiring', FixWiring))


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
