import Phaser from "phaser"
import CalibratorBaseWWires from "../../../assets/tasks/Calibrate Distributor/CalibratorBaseWWires.png"
import calibratorButton from "../../../assets/tasks/Calibrate Distributor/calibratorButton.png"
import calibratorContactBase1Lit from "../../../assets/tasks/Calibrate Distributor/calibratorContactBase1Lit.png";
import calibratorContactBase2Lit from "../../../assets/tasks/Calibrate Distributor/calibratorContactBase2Lit.png";
import calibratorContactBase3Lit from "../../../assets/tasks/Calibrate Distributor/calibratorContactBase3Lit.png";
import calibratorGauge from "../../../assets/tasks/Calibrate Distributor/calibratorGauge.png";
import calibratorGaugeBorder from "../../../assets/tasks/Calibrate Distributor/calibratorGaugeBorder.png";
import calibratorSpin1 from "../../../assets/tasks/Calibrate Distributor/calibratorSpin1.png";
import calibratorSpin2 from "../../../assets/tasks/Calibrate Distributor/calibratorSpin2.png";
import calibratorSpin3 from "../../../assets/tasks/Calibrate Distributor/calibratorSpin3.png";
var spin1
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
    
    create(){
        const current_object = this;
        this.add.image(512, 384, "CalibratorBaseWWires");

        var gauge1 = this.add.image(665, 210, "calibratorGauge");
        var button1 = this.add.image(665, 260, "calibratorButton");
        spin1 = this.add.image(375, 230, "calibratorSpin1");
        var container1 = this.add.container(0, -1, [gauge1, button1, spin1]);

        container1.setInteractive();
        gauge1.setInteractive();
        button1.setInteractive();
        gauge1.on('pointerover', function () {
            gauge1.setTintFill(0x44ff44);
        })
        gauge1.on('pointerout', function () {
    
            gauge1.clearTint();
    
        });
        button1.on('pointerdown', function() {
            button1.setTint(0x44ffff);
        })
        button1.on('pointerup', function () {
            button1.clearTint();
        })

        var gauge2 = this.add.image(665, 360, "calibratorGauge");
        var button2 = this.add.image(665, 410, "calibratorButton");
        var spin2 = this.add.image(375, 380, "calibratorSpin2");
        var gauge3 = this.add.image(665, 510, "calibratorGauge");
        var button3 = this.add.image(665, 560, "calibratorButton");
        var spin3 = this.add.image(375, 530, "calibratorSpin3");

    }

    update(){
            spin1.rotation += 0.02
            if(  spin1.rotation<0.05&&spin1.rotation>-0.1){
                console.log("checked")
            }

    }
}

export default CalibratorDistributor;
