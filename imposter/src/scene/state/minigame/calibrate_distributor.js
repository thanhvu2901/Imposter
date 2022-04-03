import Phaser from "phaser";
import CalibratorBaseWWires from "../../../assets/tasks/Calibrate Distributor/CalibratorBaseWWires.png";
import calibratorButton from "../../../assets/tasks/Calibrate Distributor/calibratorButton.png";
import calibratorContactBase1Lit from "../../../assets/tasks/Calibrate Distributor/calibratorContactBase1Lit.png";
import calibratorContactBase2Lit from "../../../assets/tasks/Calibrate Distributor/calibratorContactBase2Lit.png";
import calibratorContactBase3Lit from "../../../assets/tasks/Calibrate Distributor/calibratorContactBase3Lit.png";
import calibratorGauge from "../../../assets/tasks/Calibrate Distributor/calibratorGauge.png";
import calibratorGaugeBorder from "../../../assets/tasks/Calibrate Distributor/calibratorGaugeBorder.png";
import calibratorSpin1 from "../../../assets/tasks/Calibrate Distributor/calibratorSpin1.png";
import calibratorSpin2 from "../../../assets/tasks/Calibrate Distributor/calibratorSpin2.png";
import calibratorSpin3 from "../../../assets/tasks/Calibrate Distributor/calibratorSpin3.png";
var spin1,
  gauge1,
  border1,
  button1,
  contact1,
  checkSpin1 = false;
var spin2,
  gauge2,
  border2,
  button2,
  contact2,
  checkSpin2 = false;
var spin3,
  gauge3,
  border3,
  button3,
  contact3,
  checkSpin3 = false;
var pointer;
var table;

let r1,step = false;
class CalibratorDistributor extends Phaser.Scene {
  preload() {
    this.load.image("CalibratorBaseWWires", CalibratorBaseWWires);
    this.load.image("calibratorButton", calibratorButton);
    this.load.image("calibratorContactBase1Lit", calibratorContactBase1Lit);
    this.load.image("calibratorContactBase2Lit", calibratorContactBase2Lit);
    this.load.image("calibratorContactBase3Lit", calibratorContactBase3Lit);
    this.load.image("calibratorGauge", calibratorGauge);
    this.load.image("calibratorGaugeBorder", calibratorGaugeBorder);
    this.load.image("calibratorSpin1", calibratorSpin1);
    this.load.image("calibratorSpin2", calibratorSpin2);
    this.load.image("calibratorSpin3", calibratorSpin3);
  }

  create() {
    pointer = this.input.activePointer;
    table = this.add.image(512, 384, "CalibratorBaseWWires");
    table.setDepth(-2);

    gauge1 = this.add.image(665, 210, "calibratorGauge");
    border1 = this.add.image(665, 210, "calibratorGaugeBorder");
    button1 = this.add.image(665, 260, "calibratorButton");
    spin1 = this.add.sprite(375, 230, "calibratorSpin1");
    contact1 = this.add.image(455, 231, "calibratorContactBase1Lit");
    contact1.setDepth(-1);
    contact1.visible = false;
    spin1.rotation = 1.3;

    gauge1.setInteractive();
    button1.setInteractive();
    button1.on("pointerdown", function () {
      if (spin1.rotation < 0.06 && spin1.rotation > -0.12) {
        contact1.visible = true;
        checkSpin1 = true;
      }
    });
    button1.on("pointerup", function () {
      button1.clearTint();
    });

    gauge2 = this.add.image(665, 360, "calibratorGauge");
    border2 = this.add.image(665, 360, "calibratorGaugeBorder");
    button2 = this.add.image(665, 410, "calibratorButton");
    spin2 = this.add.sprite(375, 380, "calibratorSpin2");
    contact2 = this.add.image(454, 379, "calibratorContactBase2Lit");
    contact2.setDepth(-1);
    spin2.rotation = 2.5;

    gauge2.setInteractive();
    button2.setInteractive();
    button2.on("pointerdown", function () {
      if (spin2.rotation < 0.06 && spin2.rotation > -0.12) {
        contact2.visible = true;
        checkSpin2 = true;
      }
    });
    button2.on("pointerup", function () {
      button2.clearTint();
    });

    gauge3 = this.add.image(665, 510, "calibratorGauge");
    border3 = this.add.image(665, 510, "calibratorGaugeBorder");
    button3 = this.add.image(665, 560, "calibratorButton");
    spin3 = this.add.sprite(375, 530, "calibratorSpin3");
    contact3 = this.add.image(454, 531, "calibratorContactBase3Lit");
    contact3.setDepth(-1);
    spin3.rotation = 2.7;

    gauge3.setInteractive();
    button3.setInteractive();
    button3.on("pointerdown", function () {
      if (spin3.rotation < 0.06 && spin3.rotation > -0.12) {
        contact3.visible = true;
        checkSpin3 = true;
      }
    });
    button3.on("pointerup", function () {
      button3.clearTint();
    });

    // r1 = this.add.rectangle(605, 210, 15, 25, 0xf8ff00);
  }

  update() {
    spin1.angle -= 1.8;
    if (spin1.rotation < 0.05 && spin1.rotation > -0.1) {
      contact1.visible = true;
      gauge1.setTintFill(0xffd33c);
    } else {
      if (!checkSpin1) {
        contact1.visible = false;
        gauge1.clearTint();
      }
    }
    if (checkSpin1) {
      spin1.angle = 0;
      spin2.angle -= 1.8;
    }

    if (spin2.rotation < 0.05 && spin2.rotation > -0.1) {
      contact2.visible = true;
      gauge2.setTintFill(0x0d5dff);
    } else {
      if (!checkSpin2) {
        contact2.visible = false;
        gauge2.clearTint();
      }
    }
    if (checkSpin2) {
      spin2.angle = 0;
      spin3.angle -= 1.8;
    }

    if (spin3.rotation < 0.05 && spin3.rotation > -0.1) {
      contact3.visible = true;
      gauge3.setTintFill(0xa5ffff);
    } else {
      if (!checkSpin3) {
        contact3.visible = false;
        gauge3.clearTint();
      }
    }
    if (checkSpin3) {
      spin3.angle = 0;
      this.add.text(390, 250, "Mission Completed");
    }
  }
}

export default CalibratorDistributor;
