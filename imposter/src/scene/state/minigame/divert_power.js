import Phaser from "phaser";
import Base from "../../../assets/img/divert_power/electricity_Divert_Base.png";
import Control from "../../../assets/img/divert_power/electricity_Divert_switch.png";
import LeftEngine from "../../../assets/img/divert_power/left_engine.jpg";
import RighEngine from "../../../assets/img/divert_power/right_engine.jpg";
import Weapon from "../../../assets/img/divert_power/weapons.jpg";
import Sheilds from "../../../assets/img/divert_power/sheilds.jpg";
import Wire from "../../../assets/img/divert_power/wire.png";
import Nav from "../../../assets/img/divert_power/nav.jpg"
import Communications from "../../../assets/img/divert_power/communications.jpg"
import Oxi from "../../../assets/img/divert_power/oxi.jpg";
import Security from "../../../assets/img/divert_power/security.jpg";

class DiverPower extends Phaser.Scene {
    preload() {
        this.load.image("Base", Base);
        this.load.image("Control", Control);
        this.load.image("LeftEngine", LeftEngine);
        this.load.image("RighEngine", RighEngine);
        this.load.image("Weapons", Weapon);
        this.load.image("Sheilds", Sheilds);
        this.load.image("Wire", Wire);
        this.load.image("Nav", Nav);
        this.load.image("Communications", Communications);
        this.load.image("Oxi",  Oxi);
        this.load.image("Security", Security)
    }

    create() {
        this.add.image(512, 384, "Base");
        const slider = ["left_engine", "right_engine", "weapons", "shields", "nav", "communications", "oxi", "security"]
        for (let i = 0; i < slider.length; i++) {
            let slider = new Switch(this, 315 + (56 * i), 525);
            slider.perform();
        }
    }
 
    update() {
    }
}


class Switch {
    constructor(gameObject, x, y) {
        this.gameObject = gameObject;
        this.x = x;
        this.y = y;
    }

    perform() {
        let image = this.gameObject.add.sprite(this.x, this.y, "Control").setInteractive();
        this.gameObject.input.setDraggable(image);
        const current = this.gameObject;

        image.on('dragstart', function (pointer) {
            this.setTint(0xff0000);
        });

        image.on('drag', function (pointer, dragX, dragY) {
            if(dragY <= 587 && dragY >= 465)
            {
                this.y = dragY;
            }
            else {
                if(dragY < 465) {
                    const x = Math.floor(pointer.downX);
                    if (x >= 0 && x < 371) {
                        current.add.image(512, 240, "LeftEngine")
                    }
                    if (x > 371 && x < 427) {
                        current.add.image(512, 240, "RighEngine")
                    }
                    if (x >= 427 && x < 483) {
                        current.add.image(512, 240, "Weapons")
                    }
                    if (x >= 483 && x < 539) {
                        current.add.image(512, 240, "Sheilds")                    
                    }
                    if (x >= 539 && x < 595) {
                        current.add.image(512, 240, "Nav")                    
                    }
                    if (x >= 595 && x < 651) {
                        current.add.image(512, 240, "Communications")                                            
                    }
                    if (x >= 651 && x < 707) {
                        current.add.image(512, 240, "Oxi")                                                                    
                    }
                    if (x >=707 && x < 763)
                    {
                        current.add.image(512, 240, "Security")                                                                                            
                    }                
                }
                 else
                {
                    current.add.image(512, 240, "Wire")
                }
            }
        });

        image.on('dragend', function (pointer) {
            this.clearTint();
        });
    }

    getY() {
        return this.y
    }

    draw_line(x, y,) {
        this.add.line(0, 384, 450, 0, 770, 0,  0xffff00);
    }
}

export default DiverPower
