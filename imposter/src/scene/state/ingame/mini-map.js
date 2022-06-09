import Phaser from "phaser";

import Game from "../../game";
import giude from "../../../assets/img/guideMap.png";
import Icon from "../../../assets/img/mini.png"
import closeBtn from '../../../assets/img/closeButton.png'
let circle
class Map_1 extends Phaser.Scene {

  constructor() {
    super({ key: "mini-map" });

  }

  preload() {

    this.load.image("map", giude)
    this.load.image('Icon', Icon);
    this.load.image('closeBtn', closeBtn)
  }

  create() {
    let x = this.game.renderer.width / 2
    let y = this.game.renderer.height / 2

    this.add.image(x, y, "map")
    circle = this.add.image(x, y, "Icon").setScale(0.1)
    this.scene.get("game").events.on("moving", (data) => {
      circle.x = data[0] / 4 + 508
      circle.y = data[1] / 4 + 380
    })
    let closeBtn = this.add.image(860, 180, 'closeBtn').setScale(0.8)
    closeBtn.setInteractive({ useHandCursor: true });
    closeBtn.on('pointerdown', () => {
      this.scene.stop('mini-map')
    })
  }

  update() {


  }

}

export default Map_1;