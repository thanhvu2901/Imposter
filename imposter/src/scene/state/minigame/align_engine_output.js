import Phaser from "Phaser";
import Align_Base from "../../../assets/img/align_egine_output/base.png";
import Align_Slider from "../../../assets/img/align_egine_output/engineAlign_slider.png";
import Align_Engine from "../../../assets/img/align_egine_output/engineAlign_engine.png";


let x;
let y;
class AlignEngineOutput extends Phaser.Scene {
    init(data) {
        x = data.x;
        y = data.y;
    }

    preload() {
        this.load.image("Align_Base", Align_Base);
        this.load.image("Align_Slider", Align_Slider);
        this.load.image("Align_Engine", Align_Engine);
    }

    create() {
        let check_y = 0;
        const current_object = this
        const current_scene = this.scene;
        this.add.image(512, 384, "Align_Base");
        let slider = this.add.image(0, 0, "Align_Slider");
        let engine = this.add.sprite(455, 384, "Align_Engine");
        engine.angle = 30
        let container = this.add.container(660, 384, [slider]);
        this.add.line(0, 384, 450, 0, 770, 0,  0xff0000);
        container.setSize(slider.width, slider.height);
        container.setInteractive();
        this.input.setDraggable(container);
        container.on('pointerover', function () {

            slider.setTint(0x44ff44);
    
        });
    
        container.on('pointerout', function () {
    
            slider.clearTint();
    
        });
    
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            if (dragY >= 344 && dragY <= 464)
            {
                engine.angle = 30 - (dragY - 384);
                check_y = dragY;
                if( Math.floor(check_y) == 414)
                {
                    current_object.add.text(390, 250, "Mission Completed");
                    current_scene.start("game", {x: x, y: y, mission: "AlignEngineOutput"});
                    current_scene.stop("align_engine_output");
                }
                gameObject.x = 660;
                gameObject.y = dragY;
            }
        });
    }

    update() {
   }
}

export default AlignEngineOutput