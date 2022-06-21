import Base from "./base";

const FIX_WIRING_MARKED_X = -349;
const FIX_WIRING_MARKED_Y = 155

class FixWiring extends Base {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    perform() {
        const check_mission = Base.prototype.is_mission_show(FIX_WIRING_MARKED_X,
            FIX_WIRING_MARKED_Y,
            this.x,
            this.y);
        if (check_mission) {
            let sprite = this.scene.scene.add.sprite(FIX_WIRING_MARKED_X, FIX_WIRING_MARKED_Y, "FixWiring_mission_marked");
            sprite.tint =  Math.random() * 0xffff00
            return { scene: "fixWiring", x: this.x, y: this.y, sprite: sprite }

        }
        return;
    }
}

export default FixWiring