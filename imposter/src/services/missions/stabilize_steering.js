import Base from "./base";

const STABLE_STEERING_MARKED_X = 2033;
const STABLE_STEERING_MARKED_Y = -110;

class StabilizeSteering extends Base {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    perform() {
        const check_mission = Base.prototype.is_mission_show(STABLE_STEERING_MARKED_X,
            STABLE_STEERING_MARKED_Y,
            this.x,
            this.y);
        if (check_mission) {
            let sprite = this.scene.scene.add.sprite(STABLE_STEERING_MARKED_X, STABLE_STEERING_MARKED_Y, "StabilizeSteering");
            sprite.tint =  Math.random() * 0xffff00;
            return { scene: "stabilizeSteering", x: this.x, y: this.y, sprite: sprite }

        }
        return;
    }

}

export default StabilizeSteering