import Base from "./base";
import MissionMarked from "../../assets/tasks/Align Engine Output/mission_marked.png";

const ALIGN_ENGINE_OUTPUT_X = -980
const ALIGN_ENGINE_OUTPUT_Y = -385

class AlignEngineOutput extends Base{
    constructor(scene, x, y)
    {
        super(scene, x, y);
    }

    perform(){
        if(
            (Math.floor(this.x) <= ALIGN_ENGINE_OUTPUT_X) && 
            (Math.floor(this.y) <= ALIGN_ENGINE_OUTPUT_Y)
        )
        {
            const a = this.scene.scene.add.image(-1384, -500, "AlignEngineOutput_mission_marked");
            // this.scene.pause("game")
            // this.scene.start("align_engine_output", {x: this.x, y: this.y});
            return {scene: "align_engine_output", x: this.x, y: this.y}
        }
    }

}


// colides 

// missions 
export default AlignEngineOutput