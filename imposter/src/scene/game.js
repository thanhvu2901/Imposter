import Phaser from "phaser";
import playerSprite from "../assets/img/player.png";
import shipImg from "../assets/img/theSkeld.png";
import idle from "../assets/img/idle.png";
import { movePlayer } from "../animation/movement";
import { animateMovement } from "../animation/animation";
import vent1 from  "../assets/img/jump vent/vent1.png";
import vent2 from  "../assets/img/jump vent/vent2.png";
import vent3 from  "../assets/img/jump vent/vent3.png";
import vent4 from  "../assets/img/jump vent/vent4.png";
import vent5 from  "../assets/img/jump vent/vent5.png";
import vent6 from  "../assets/img/jump vent/vent6.png";

import jump1 from  "../assets/img/jump vent/Vent0001.png";
import jump2 from  "../assets/img/jump vent/vent0002.png";
import jump3 from  "../assets/img/jump vent/Vent0003.png";
import jump4 from  "../assets/img/jump vent/Vent0004.png";
import jump5 from  "../assets/img/jump vent/vent0005.png";
import jump6 from  "../assets/img/jump vent/Vent0006.png";
import jump7 from  "../assets/img/jump vent/Vent0007.png";


import vent_button from "../assets/img/vent_button.png"
import {
    PLAYER_SPRITE_WIDTH,
    PLAYER_SPRITE_HEIGHT,
    PLAYER_HEIGHT,
    PLAYER_WIDTH,
    PLAYER_START_X,
    PLAYER_START_Y,
    PLAYER_SPEED,
} from "../consts/constants";

let text,vent_hole,vent_butt;
var player = {};
let pressedKeys = [];
let vent_press=false
class Game extends Phaser.Scene {

    preload() {

        this.load.image("ship", shipImg);
        this.load.spritesheet("player", playerSprite, {
            frameWidth: PLAYER_SPRITE_WIDTH,
            frameHeight: PLAYER_SPRITE_HEIGHT,
        });
        this.load.spritesheet("idle", idle, {
            frameWidth: PLAYER_SPRITE_WIDTH,
            frameHeight: PLAYER_SPRITE_HEIGHT,
        });
        this.load.image("vent_1", vent1);
        this.load.image("vent_2", vent2);
        this.load.image("vent_3", vent3);
        this.load.image("vent_4", vent4);
        this.load.image("vent_5", vent5);
        this.load.image("vent_6", vent6);
        this.load.image("jump_1", jump1);
  this.load.image("jump_2", jump2);
  this.load.image("jump_3", jump3);
  this.load.image("jump_4", jump4);
  this.load.image("jump_5", jump5);
  this.load.image("jump_6", jump6);
  this.load.image("jump_7", jump7);
        this.load.image("button",vent_button)
    }

    create() {
       
        const ship = this.add.image(0, 0, "ship");
        text = this.add.text(0, 0, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);
     vent_butt=   this.add.image(1200,650,"button").setScrollFactor(0,0).setInteractive()
        let hole= this.anims.create({
            key: 'hole',
            frames: [{key:'vent_1'},
            {key:'vent_2'},
            {key:'vent_3'},
            {key:'vent_4'},
            {key:'vent_5'},
            {key:'vent_6'}
            ],
            frameRate: 12,
            repeat:0
        });
        hole.frames[0].frame.y=8
        //hole.frames[1].frame.x=11
        hole.frames[2].frame.y=3.5
        hole.frames[3].frame.y=7
        hole.frames[4].frame.y=7
        hole.frames[4].frame.x=3
        hole.frames[5].frame.y=7
      vent_hole=  this.add.sprite(-1029,680,"vent_1")
        player.sprite = this.add.sprite(-1028, 654, "player");
        player.sprite.displayHeight = PLAYER_HEIGHT;
        player.sprite.displayWidth = PLAYER_WIDTH;

        this.anims.create({
            key: "running",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 24,
            reapeat: -1,
        });
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("idle"),
            frameRate: 1,
            reapeat: 0,
        });
        let jump= this.anims.create({
            key: 'jump',
            frames: [{key:'jump_1'},
            {key:'jump_2'},
            {key:'jump_3'},
            {key:'jump_4'},
            {key:'jump_5'},
            {key:'jump_6'},
            {key:'jump_7'}
            ],
            frameRate: 12,
            repeat:0
          });
        this.input.keyboard.on("keydown", (e) => {
            if (!pressedKeys.includes(e.code)) {
                pressedKeys.push(e.code);
            }
        });
        this.input.keyboard.on("keyup", (e) => {
            pressedKeys = pressedKeys.filter((key) => key !== e.code);
        });
        vent_butt.on('pointerdown', function (pointer) {
            console.log('a;;p')
            vent_hole.play('hole')
       //     player.sprite.play("jump")
            vent_press=true
         //   Pause(1000)
        })
        vent_butt.on('pointerup', function (pointer) {

      //      vent_hole.stop()
        })
    }

    update() {
        text.setText([
            'screen x: ' + this.input.x,
            'screen y: ' + this.input.y,
            'player x: ' + player.sprite.x,
            'player y: ' +  player.sprite.y,
      
            
        ]);
        this.scene.scene.cameras.main.centerOn(player.sprite.x, player.sprite.y);
       
     
     
        movePlayer(pressedKeys, player.sprite);
        animateMovement(pressedKeys, player.sprite,vent_press)
        
    }
}

const Pause = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

export default Game;