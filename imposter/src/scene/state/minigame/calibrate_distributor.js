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
  button1,
  checkSpin1 = false;
var spin2,
  gauge2,
  button2,
  checkSpin2 = false;
var spin3,
  gauge3,
  button3,
  checkSpin3 = false;
var pointer;
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
    this.add.image(512, 384, "CalibratorBaseWWires");

    gauge1 = this.add.image(665, 210, "calibratorGauge");
    button1 = this.add.image(665, 260, "calibratorButton");
    spin1 = this.add.sprite(375, 230, "calibratorSpin1");
    spin1.rotation = 1.3;

    gauge1.setInteractive();
    button1.setInteractive();
    button1.on("pointerdown", function () {
      button1.setTint(0x44ffff);
      if (spin1.rotation < 0.06 && spin1.rotation > -0.12) {
        checkSpin1 = true;
      }
    });
    button1.on("pointerup", function () {
      button1.clearTint();
    });

    gauge2 = this.add.image(665, 360, "calibratorGauge");
    button2 = this.add.image(665, 410, "calibratorButton");
    // spin2 = this.add.image(375, 380, "calibratorSpin2");
    spin2 = this.add.sprite(375, 380, "calibratorSpin2");
    spin2.rotation = 2.5;

    gauge2.setInteractive();
    button2.setInteractive();
    button2.on("pointerdown", function () {
      button2.setTint(0x44ffff);
      if (spin2.rotation < 0.06 && spin2.rotation > -0.12) {
        checkSpin2 = true;
      }
    });
    button2.on("pointerup", function () {
      button2.clearTint();
    });

    gauge3 = this.add.image(665, 510, "calibratorGauge");
    button3 = this.add.image(665, 560, "calibratorButton");
    // spin3 = this.add.image(375, 530, "calibratorSpin3");
    spin3 = this.add.sprite(375, 530, "calibratorSpin3");
    spin3.rotation = 2.7;

    gauge3.setInteractive();
    button3.setInteractive();
    button3.on("pointerdown", function () {
      button3.setTint(0x44ffff);
      if (spin3.rotation < 0.06 && spin3.rotation > -0.12) {
        checkSpin3 = true;
      }
    });
    button3.on("pointerup", function () {
      button3.clearTint();
    });
  }

  update() {
    spin1.angle -= 2;
    // Phaser.Actions.RotateAround(spin1, {x: 375, y: 230}, -1.5);
    if (spin1.rotation < 0.05 && spin1.rotation > -0.1) {
      gauge1.setTintFill(0x44ff44);
    } else {
      if (!checkSpin1) {
        gauge1.clearTint();
      }
    }
    if (checkSpin1) {
      spin1.angle = 0;
      spin2.angle -= 2;
    }

    if (spin2.rotation < 0.05 && spin2.rotation > -0.1) {
      gauge2.setTintFill(0x44ff44);
    } else {
      if (!checkSpin2) {
        gauge2.clearTint();
      }
    }
    if (checkSpin2) {
      spin2.angle = 0;
      spin3.angle -= 2;
    }

    if (spin3.rotation < 0.05 && spin3.rotation > -0.1) {
      gauge3.setTintFill(0x44ff44);
    } else {
      if (!checkSpin3) {
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
