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

class PrimeShields extends Phaser.Scene {
  constructor() {
    super({ key: "PrimeShields" });
  }

  preload() {
    this.load.image("shieldMiraBase", shieldMiraBase, 300, 600);
    this.load.image("shieldGauge", shieldGauge);
    this.load.image("shieldPanel", shieldPanel);
  }

  create() {
    let current_object = this;
    const shieldMiraBase = this.add.image(300, 300, "shieldMiraBase");
    const shieldGauge = this.add.image(300, 300, "shieldGauge");
    shieldPanel_1 = this.add.sprite(300, 300, "shieldPanel");
    shieldPanel_2 = this.add.sprite(300, 160, "shieldPanel");
    shieldPanel_3 = this.add.sprite(300, 440, "shieldPanel");
    shieldPanel_4 = this.add.sprite(180, 230, "shieldPanel");
    shieldPanel_5 = this.add.sprite(180, 370, "shieldPanel");
    shieldPanel_6 = this.add.sprite(420, 230, "shieldPanel");
    shieldPanel_7 = this.add.sprite(420, 370, "shieldPanel");
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
      if(destroyed===TOTAL_DESTROY){
        current_object.add.text(250, 300, "Task Complete");
      }
    });
  }

  update() {}
}

export default PrimeShields;
