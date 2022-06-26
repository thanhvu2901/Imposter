import Base from "./base";

const PRIME_SHIELDS_MARKED_X = 1025
const PRIME_SHIELDS_MARKED_Y = 725

class PrimeShields extends Base {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    perform() {
        const check_mission = Base.prototype.is_mission_show(
            PRIME_SHIELDS_MARKED_X,
            PRIME_SHIELDS_MARKED_Y,
            this.x,
            this.y);
        if (check_mission) {
            let sprite = this.scene.scene.add.sprite(PRIME_SHIELDS_MARKED_X, PRIME_SHIELDS_MARKED_Y, "PrimeSheilds");
            sprite.tint =  Math.random() * 0xffff00;
            return { scene: "PrimeShields", x: this.x, y: this.y, sprite: sprite }

        }
        return;
    }

}

export default PrimeShields