import Phaser from "phaser";
import Button01 from "../../../assets/img/Unlock Manifolds/Button01.png";
import Button02 from "../../../assets/img/Unlock Manifolds/Button02.png";
import Button03 from "../../../assets/img/Unlock Manifolds/Button03.png";
import Button04 from "../../../assets/img/Unlock Manifolds/Button04.png";
import Button05 from "../../../assets/img/Unlock Manifolds/Button05.png";
import Button06 from "../../../assets/img/Unlock Manifolds/Button06.png";
import Button07 from "../../../assets/img/Unlock Manifolds/Button07.png";
import Button08 from "../../../assets/img/Unlock Manifolds/Button08.png";
import Button09 from "../../../assets/img/Unlock Manifolds/Button09.png";
import Button10 from "../../../assets/img/Unlock Manifolds/Button10.png";
import Panel from "../../../assets/img/Unlock Manifolds/Panel.png";
import Glass from "../../../assets/img/Unlock Manifolds/PanelGlass.png";
import Wire from "../../../assets/img/Unlock Manifolds/Wire.png";
import Event_Center from "../../../helper/event_center";

let ring1, ring2, ring3, ring4
let button01, button02, button03, button04, button05, button06, button07, button08, button09, button10
let text;
let panel;
let x
let y
let glass
let wire
let ispressed = false;
let isfull = false
let r1
let r2
let step = 0
let light_, light_1
let button = []
let cords
let check = []
let ischeck = false;
let current_scene;
let eventsCenter;
let sprite;
class UnlockManifolds extends Phaser.Scene {
  init(data) {
    x = data.x;
    y = data.y;
    sprite = data.sprite;
    eventsCenter = data.eventsCenter;
  }

  constructor() {
    super({ key: "Unlock" });

  }

  preload() {
    this.load.image("Panel", Panel);
    this.load.image("Button1", Button01);
    this.load.image("Button2", Button02);
    this.load.image("Button3", Button03);
    this.load.image("Button4", Button04);
    this.load.image("Button5", Button05);
    this.load.image("Button6", Button06);
    this.load.image("Button7", Button07);
    this.load.image("Button8", Button08);
    this.load.image("Button9", Button09);
    this.load.image("Button10", Button10);
    this.load.image("Glass", Glass);
    this.load.image("Wire", Wire);
  }

  create() {
    current_scene = this.scene
    x = this.game.renderer.width / 2
    y = this.game.renderer.height / 2
    cords = [[x - 170, y - 40], [x - 85, y - 40], [x, y - 40], [x + 85, y - 40], [x + 170, y - 40], [x - 170, y + 45], [x - 85, y + 45], [x, y + 45], [x + 85, y + 45], [x + 170, y + 45]]
    panel = this.add.image(x, y, "Panel")
    cords.sort(function () {
      return 0.5 - Math.random();
    });
    let closeBtn = this.add.image(830, 135, 'closeBtn').setInteractive({ useHandCursor: true })

    closeBtn.on('pointerdown', () => {
      this.scene.stop('Unlock')
    })
    // button01 = this.add.image(x-170,y-40,"Button01")
    // button02 = this.add.image(x-85,y-40,"Button02")
    // button03 = this.add.image(x,y-40,"Button03")
    // button04 = this.add.image(x+85,y-40,"Button04")
    // button05 = this.add.image(x+170,y-40,"Button05")
    // button06 = this.add.image(x-170,y+45,"Button05")
    // button07 = this.add.image(x-85,y+45,"Button07")
    // button08 = this.add.image(x,y+45,"Button08")
    // button09 = this.add.image(x+85,y+45,"Button09")
    // button10 = this.add.image(x+170,y+45,"Button10")
    for (var i = 0; i < 10; i++) {
      let temp
      temp = [this.add.image(cords[i][0], cords[i][1], `Button${i + 1}`).setInteractive(), i + 1, false]
      button.push(temp)
      // temp[0].on('pointerup',() => {
      //   temp[0].clearTint()
      // })
      // temp[0].on('pointerout',() => {
      //   temp[0].clearTint()
      // })
      temp[0].on('pointerdown', function (pointer) {
        if (temp[2] == false) {
          temp[0].setTint('0x51ff00')
          temp[2] = true
          check.push(temp[1])

        }
        else {
          temp[0].clearTint()
          temp[2] = false
          check = check.filter((value) => value != temp[1])



        }

        //   console.log(check.length)
      })

    }
    glass = this.add.image(x, y, "Glass")
    wire = this.add.image(x - 210, y + 130, "Wire")



  }

  update() {

    if (check.length == 10) {
      let order = true
      for (var i = 0; i < 10; i++) {
        // console.log(check[i],i+1)
        if (check[i] != i + 1) {
          console.log("failed")
          check = []
          order = false
          for (var j = 0; j < 10; j++) {
            button[j][0].clearTint()
            button[j][2] = false
          }
          break
        }

      }
      if (order == true) {
        ischeck = true
      }
    }
    if (ischeck == true) {
      for (var i = 0; i < 10; i++) {
        button[i][0].removeInteractive()

      }
      sprite.tint = 0;
      eventsCenter.emit("continue_scene_game", { x: x, y: y, mission: "UnlockManifolds" });
      current_scene.stop("Unlock");
    }
  }

}


export default UnlockManifolds;