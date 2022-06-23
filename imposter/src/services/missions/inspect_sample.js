import Base from "./base";

const INSPECT_SAMPLE_MARKED_X = -220;
const INSPECT_SAMPLE_MARKED_Y = -150;

class InspectSample extends Base {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    perform() {
        const check_mission = Base.prototype.is_mission_show(
            INSPECT_SAMPLE_MARKED_X,
            INSPECT_SAMPLE_MARKED_Y,
            this.x,
            this.y);
        if (check_mission) {
            let sprite = this.scene.scene.add.sprite(INSPECT_SAMPLE_MARKED_X, INSPECT_SAMPLE_MARKED_Y, "InspectSample");
            sprite.tint =  Math.random() * 0xffff00;
            return { scene: "inspectSample", x: this.x, y: this.y, sprite: sprite }

        }
        return;
    }   
}

export default InspectSample