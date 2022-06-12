import Base from "./base";

const CALIBRATOR_DISTRIBUTOR_MARKED_X = -190
const CALIBRATOR_DISTRIBUTOR_MARKED_Y = 140

class CalibratorDistributor extends Base {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    perform() {
        const check_mission = Base.prototype.is_mission_show(
            CALIBRATOR_DISTRIBUTOR_MARKED_X,
            CALIBRATOR_DISTRIBUTOR_MARKED_Y,
            this.x,
            this.y);
        if (check_mission) {
            let sprite = this.scene.scene.add.image(CALIBRATOR_DISTRIBUTOR_MARKED_X, CALIBRATOR_DISTRIBUTOR_MARKED_Y, "CalibratorDistributor_mission_marked");
            sprite.tint =  Math.random() * 0xffff00;
            return { scene: "CalibratorDistributor", x: this.x, y: this.y, sprite: sprite }

        }
        return;
    }   
}

export default CalibratorDistributor