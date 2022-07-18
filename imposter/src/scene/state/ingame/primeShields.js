import Phaser from "phaser";
import shieldGauge from "../../../assets/tasks/Prime Shields/shield_Gauge100.png";
import shieldPanel from "../../../assets/tasks/Prime Shields/shield_Panel.png";
import shieldScreen from "../../../assets/tasks/Prime Shields/shield_screen.png";
import shieldMiraBase from "../../../assets/tasks/Prime Shields/shields_MiraBase.png";

let shieldPanel_1,
  shieldPanel_2,
  shieldPanel_3,
  shieldPanel_4,
  shieldPanel_5,
  shieldPanel_6,
  shieldPanel_7;
const TOTAL_DESTROY = 4;
let destroyed = 0;
let x, y;
let sprite, current_scene;
let eventsCenter;

class PrimeShields extends Phaser.Scene {
  init(data) {
    x = data.x;
    y = data.y;
    sprite = data.sprite;
    eventsCenter = data.eventsCenter;
  }

  constructor() {
    super({ key: "PrimeShields" });
  }

  preload() {
    this.load.image("shieldMiraBase", shieldMiraBase, 300 + 200, 600 + 50);
    this.load.image("shieldGauge", shieldGauge);
    this.load.image("shieldPanel", shieldPanel);
  }

  create() {
    current_scene = this.scene;
    const shieldMiraBase = this.add.image(300 + 200, 300 + 50, "shieldMiraBase");
    const shieldGauge = this.add.image(300 + 200, 300 + 50, "shieldGauge");
    shieldPanel_1 = this.add.sprite(300 + 200, 300 + 50, "shieldPanel");
    shieldPanel_2 = this.add.sprite(300 + 200, 160 + 50, "shieldPanel");
    shieldPanel_3 = this.add.sprite(300 + 200, 440 + 50, "shieldPanel");
    shieldPanel_4 = this.add.sprite(180 + 200, 230 + 50, "shieldPanel");
    shieldPanel_5 = this.add.sprite(180 + 200, 370 + 50, "shieldPanel");
    shieldPanel_6 = this.add.sprite(420 + 200, 230 + 50, "shieldPanel");
    shieldPanel_7 = this.add.sprite(420 + 200, 370 + 50, "shieldPanel");
    shieldGauge.tint = 0xf23e83;
    shieldPanel_2.tint = 0xf70a15;
    shieldPanel_3.tint = 0xf70a15;
    shieldPanel_4.tint = 0xf70a15;
    shieldPanel_5.tint = 0xf70a15;

    shieldPanel_2.setInteractive();
    shieldPanel_3.setInteractive();
    shieldPanel_4.setInteractive();
    shieldPanel_5.setInteractive();

    this.input.on("gameobjectdown", function (pointer, gameObject) {
      if (gameObject == shieldPanel_2) {
        shieldPanel_2.tint = 0xffffff;
        destroyed++;
      } else if (gameObject == shieldPanel_3) {
        shieldPanel_3.tint = 0xffffff;
        destroyed++;
      } else if (gameObject == shieldPanel_4) {
        shieldPanel_4.tint = 0xffffff;
        destroyed++;
      } else if (gameObject == shieldPanel_5) {
        shieldPanel_5.tint = 0xffffff;
        destroyed++
      }
      if (destroyed === TOTAL_DESTROY) {
        sprite.tint = 0;
        eventsCenter.emit("continue_scene_game", { x: x, y: y, mission: "PrimeShields" });
        current_scene.stop("PrimeShields");
      }
    });
    let closeBtn = this.add.image(830, 135, 'closeBtn').setInteractive({ useHandCursor: true })

    closeBtn.on('pointerdown', () => {
      this.scene.stop('PrimeShields')
    })
  }

  update() { }
}

export default PrimeShields;
