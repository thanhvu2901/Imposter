import Base from "./base";

const START_REACTOR_MARKED_X = -1620
const START_REACTOR_MARKED_Y = -35

class StartReactor extends Base {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    perform() {
        const check_mission = Base.prototype.is_mission_show(
            START_REACTOR_MARKED_X,
            START_REACTOR_MARKED_Y,
            this.x,
            this.y);
        if (check_mission) {
            let sprite = this.scene.scene.add.sprite(START_REACTOR_MARKED_X, START_REACTOR_MARKED_Y, "StartReactor");
            sprite.tint =  Math.random() * 0xffff00;
            return { scene: "startReactor", x: this.x, y: this.y, sprite: sprite }

        }
        return;
    }

}

export default StartReactor