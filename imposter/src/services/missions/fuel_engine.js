import Base from "./base";

const FUEL_ENGINE_MARKED_X = 84
const FUEL_ENGINE_MARKED_Y = 709


class FuelEngine extends Base {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    perform() {
        const check_mission = Base.prototype.is_mission_show(
            FUEL_ENGINE_MARKED_X,
            FUEL_ENGINE_MARKED_Y,
            this.x,
            this.y);
        if (check_mission) {
            let sprite = this.scene.scene.add.image(FUEL_ENGINE_MARKED_X, FUEL_ENGINE_MARKED_Y, "Fuel");
            sprite.tint =  Math.random() * 0xffff00;
            return { scene: "Fuel", x: this.x, y: this.y, sprite: sprite }

        }
        return;
    }   
}

export default FuelEngine