import Base from "./base";

const ALIGN_ENGINE_OUTPUT_MARKED_X = -1384
const ALIGN_ENGINE_OUTPUT_MARKED_Y = -500

class AlignEngineOutput extends Base {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    perform() {
        const check_mission = Base.prototype.is_mission_show(ALIGN_ENGINE_OUTPUT_MARKED_X, ALIGN_ENGINE_OUTPUT_MARKED_Y, this.x, this.y);
        if (check_mission) {
            // this.scene.scene.add.image(-1384, -500, "AlignEngineOutput_mission_marked");
            let sprite = this.scene.scene.add.sprite(-1384, -500, "AlignEngineOutput_mission_marked");
            sprite.tint =  Math.random() * 0xffff00;            
            return { scene: "align_engine_output", x: this.x, y: this.y, sprite: sprite }

        }
        return;
    }

}


// colides 

// missions 
export default AlignEngineOutput