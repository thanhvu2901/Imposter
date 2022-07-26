import Base from "./base";

const DIVERT_POWER_OUTPUT_MARKED_X = -466
const DIVERT_POWER_OUTPUT_MARKED_Y = 120

class DivertPower extends Base {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    perform() {
        const check_mission = Base.prototype.is_mission_show(DIVERT_POWER_OUTPUT_MARKED_X, DIVERT_POWER_OUTPUT_MARKED_Y, this.x, this.y);
        if (check_mission) {
            let sprite = this.scene.scene.add.sprite(DIVERT_POWER_OUTPUT_MARKED_X, DIVERT_POWER_OUTPUT_MARKED_Y, "DivertPower");
            sprite.tint =  Math.random() * 0xffff00;            
            return { scene: "divert_power", x: this.x, y: this.y, sprite: sprite }

        }
        return;
    }

}


// colides 

// missions 
export default DivertPower