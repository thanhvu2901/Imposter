import Base from "./base";

const CLEAN_02_FILTER_MARKED_X = 865
const CLEAN_02_FILTER_MARKED_Y = -270


class CleanO2Filter extends Base {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    perform() {
        const check_mission = Base.prototype.is_mission_show(CLEAN_02_FILTER_MARKED_X,
            CLEAN_02_FILTER_MARKED_Y,
            this.x,
            this.y);
        if (check_mission) {
            let sprite = this.scene.scene.add.sprite(CLEAN_02_FILTER_MARKED_X, CLEAN_02_FILTER_MARKED_Y, "CleanO2Filter_mission_marked");
            sprite.tint =  Math.random() * 0xffff00;  
            return { scene: "CleanO2Filter", x: this.x, y: this.y, sprite: sprite }

        }
        return;
    }
}

export default CleanO2Filter