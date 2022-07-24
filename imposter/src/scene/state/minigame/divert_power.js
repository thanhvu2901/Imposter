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


let x;
let y;
let current_x;
let current_y;

let current_scene;
let sprite;
let eventsCenter;
let nested_divert_power_mission_picked;
let completed_mission_picked;

let right_engine;
let left_engine;
let weapons;
let shields;
let nav;
let communications;
let oxi;
let security;
let current_object;
class DiverPower extends Phaser.Scene {
    init(data) {
        current_x = data.x;
        current_y = data.y;
        sprite = data.sprite;
        eventsCenter = data.eventsCenter,
        nested_divert_power_mission_picked = data.nested_divert_power_mission_picked
    }

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
        current_scene = this.scene;
        current_object = this ;
        this.add.image(512, 384, "Base");

        right_engine = this.add.sprite(315, 525, "Control").setInteractive();
        this.input.setDraggable(right_engine);

        left_engine = this.add.sprite(371, 525, "Control").setInteractive();
        this.input.setDraggable(left_engine);

        weapons = this.add.sprite(427, 525, "Control").setInteractive();
        this.input.setDraggable(weapons);

        shields = this.add.sprite(483, 525, "Control").setInteractive();
        this.input.setDraggable(shields);

        nav = this.add.sprite(539, 525, "Control").setInteractive();
        this.input.setDraggable(nav);

        communications = this.add.sprite(595, 525, "Control").setInteractive();
        this.input.setDraggable(communications);

        oxi = this.add.sprite(651, 525, "Control").setInteractive();
        this.input.setDraggable(oxi);

        security = this.add.sprite(707, 525, "Control").setInteractive();
        this.input.setDraggable(security);
    }
 
    update() {
        right_engine.on('dragstart', function (pointer) {
            this.setTint(0xff0000);
        });

        right_engine.on("drag", function (pointer, dragX, dragY) {
            if(dragY <= 587 && dragY >= 465)
            {
                this.y = dragY;
            }
            else
            {
                if(dragY < 460)
                {
                    completed_mission_picked = 0;
                    current_object.add.image(512, 240, "RighEngine");
                }
            }
        })
    
        right_engine.on('dragend', function (pointer) {
            this.clearTint();
        });

        left_engine.on('dragstart', function (pointer) {
            this.setTint(0xff0000);
        });

        left_engine.on("drag", function (pointer, dragX, dragY) {
            if(dragY <= 587 && dragY >= 465)
            {
                this.y = dragY;
            }
            else
            {
                if(dragY < 460)
                {
                    completed_mission_picked = 1;
                    current_object.add.image(512, 240, "LeftEngine");
                }
            }
        })
    
        left_engine.on('dragend', function (pointer) {
            this.clearTint();
        });
        
        weapons.on('dragstart', function (pointer) {
            this.setTint(0xff0000);
        });

        weapons.on("drag", function (pointer, dragX, dragY) {
            if(dragY <= 587 && dragY >= 465)
            {
                this.y = dragY;
            }
            else
            {
                if(dragY < 460)
                {
                    completed_mission_picked = 2;
                    current_object.add.image(512, 240, "Weapons");
                }
            }
        })
    
        weapons.on('dragend', function (pointer) {
            this.clearTint();
        });
        
        shields.on('dragstart', function (pointer) {
            this.setTint(0xff0000);
        });

        shields.on("drag", function (pointer, dragX, dragY) {
            if(dragY <= 587 && dragY >= 465)
            {
                this.y = dragY;
            }
            else
            {
                if(dragY < 460)
                {
                    completed_mission_picked = 3;
                    current_object.add.image(512, 240, "Sheilds");
                }
            }
        })
    
        shields.on('dragend', function (pointer) {
            this.clearTint();
        });

        nav.on('dragstart', function (pointer) {
            this.setTint(0xff0000);
        });

        nav.on("drag", function (pointer, dragX, dragY) {
            if(dragY <= 587 && dragY >= 465)
            {
                this.y = dragY;
            }
            else
            {
                if(dragY < 460)
                {
                    completed_mission_picked = 4;
                    current_object.add.image(512, 240, "Nav");
                }
            }
        })
    
        nav.on('dragend', function (pointer) {
            this.clearTint();
        });

        communications.on('dragstart', function (pointer) {
            this.setTint(0xff0000);
        });

        communications.on("drag", function (pointer, dragX, dragY) {
            if(dragY <= 587 && dragY >= 465)
            {
                this.y = dragY;
            }
            else
            {
                if(dragY < 460)
                {
                    completed_mission_picked = 5;
                    current_object.add.image(512, 240, "Communications");
                }
            }
        })
    
        communications.on('dragend', function (pointer) {
            this.clearTint();
        });

        oxi.on('dragstart', function (pointer) {
            this.setTint(0xff0000);
        });

        oxi.on("drag", function (pointer, dragX, dragY) {
            if(dragY <= 587 && dragY >= 465)
            {
                this.y = dragY;
            }
            else
            {
                if(dragY < 460)
                {
                    completed_mission_picked = 6;
                    current_object.add.image(512, 240, "Oxi");
                }
            }
        })
    
        oxi.on('dragend', function (pointer) {
            this.clearTint();
        });

        security.on('dragstart', function (pointer) {
            this.setTint(0xff0000);
        });

        security.on("drag", function (pointer, dragX, dragY) {
            if(dragY <= 587 && dragY >= 465)
            {
                this.y = dragY;
            }
            else
            {
                if(dragY < 460)
                {
                    completed_mission_picked = 6;
                    current_object.add.image(512, 240, "Security");
                }
            }
        })
    
        security.on('dragend', function (pointer) {
            this.clearTint();
        });

        if(completed_mission_picked == nested_divert_power_mission_picked)
        {
            sprite.tint = 0;
            eventsCenter.emit("continue_scene_game", { x: current_x, y: current_y, mission: "DivertPower" });
            current_scene.stop("divert_power");
        }
    }
}

// eventsCenter.emit("continue_scene_game", {x: current_x, y: current_y, mission: "DivertPower"});
//                             current_scene.stop("divert_power");





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
                if(dragY < 460) {
                    const x = Math.floor(pointer.downX);
                    if (x >= 0 && x < 371) {
                        completed_mission_picked = 0;
                        current.add.image(512, 240, "RighEngine");
                    }
                    if (x >= 371 && x < 427) {
                        completed_mission_picked = 1;
                        current.add.image(512, 240, "LeftEngine");
                    }
                    if (x >= 427 && x < 483) {
                        completed_mission_picked = 2;
                        current.add.image(512, 240, "Weapons");
                    }
                    if (x >= 483 && x < 539) {
                        completed_mission_picked = 3;
                        current.add.image(512, 240, "Sheilds");
                    }
                    if (x >= 539 && x < 595) {
                        completed_mission_picked = 4;
                        current.add.image(512, 240, "Nav");
                    }
                    if (x >= 595 && x < 651) {
                        completed_mission_picked = 5;
                        current.add.image(512, 240, "Communications");
                    }
                    if (x >= 651 && x < 707) {
                        completed_mission_picked = 6;
                        current.add.image(512, 240, "Oxi");
                    }
                    if (x >=707 && x < 763)
                    {
                        completed_mission_picked = 7;
                        current.add.image(512, 240, "Security");
                    }                
                }
                 else
                {
                    current.add.image(512, 240, "Wire")
                }

                console.log("completed_mission_picked", completed_mission_picked);
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
