import Phaser from "phaser";
import gas_can from "../../../assets/img/Fuel Engines/gascan.png";
import base from "../../../assets/img/Fuel Engines/base.png";
import button from "../../../assets/img//Fuel Engines/button.png";
import wire from "../../../assets/img//Fuel Engines/wire.png";
import light from "../../../assets/img//Fuel Engines/light.png";

let ring1, ring2, ring3, ring4
let dot1, dot2, dot3, dot4
let text;
var ship1;
let x
let y
let button_
let ispressed = false;
let isfull = false
let r1
let r2
let step = 0
let light_, light_1;
let sprite, current_scene;
let eventsCenter;

class FuelEngine extends Phaser.Scene {
  init(data) {
    x = data.x;
    y = data.y;
    sprite = data.sprite;
    eventsCenter = data.eventsCenter;
  }

  constructor() {
    super({ key: "Fuel" });

  }

  preload() {
    this.load.image("gas_can", gas_can);
    this.load.image("fuel-button", button);
    this.load.image("base", base);
    this.load.image("wire", wire);
    this.load.image("light", light);
  }

  create() {
    this.scene.bringToTop()
    current_scene = this.scene;
    x = this.game.renderer.width / 2
    y = this.game.renderer.height / 2
    text = this.add.text(10, 10, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);
    r1 = this.add.rectangle(x, y + 150, 300, 0, 0xFFBB35);
    const gas = this.add.image(x, y, "gas_can")
    const base_ = this.add.image(x + 280, y + 188, "base");
    button_ = this.add.image(x + 280, y + 188, "fuel-button");
    const wire_ = this.add.image(x + 200, y + 188, "wire");
    light_ = this.add.image(x + 310, y + 120, "light");
    light_1 = this.add.image(x + 250, y + 120, "light");
    light_1.setTint('0xFF2828')
    button_.setInteractive().on('pointerup', () => {
      button_.clearTint()
      ispressed = false
    })
    button_.setInteractive().on('pointerout', () => {
      button_.clearTint()
    })


    button_.setInteractive().on('pointerdown', function (pointer) {

      button_.setTint('0xBCBCBC')
      ispressed = true
    });
    let closeBtn = this.add.image(830, 135, 'closeBtn').setInteractive({ useHandCursor: true })

    closeBtn.on('pointerdown', () => {
      this.scene.stop('Fuel')
    })


  }

  update() {
    text.setText([
      'screen x: ' + this.input.x,
      'screen y: ' + this.input.y,


    ]);
    if (ispressed == true && isfull == false) {
      r1.height -= 5;
    }
    if (r1.height * -197 / 345 == 197) {
      isfull = true
      light_1.clearTint()
      light_.setTint('0x04FF00');

      sprite.tint = 0;
      eventsCenter.emit("continue_scene_game", { x: x, y: y, mission: "FuelEngine" });
      current_scene.stop("Fuel");
    }
  }

}

export default FuelEngine;