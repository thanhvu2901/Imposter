import Base from "./base";

const UNLOCK_MANIFOLDS_MARKED_X = -1684
const UNLOCK_MANIFOLDS_MARKED_Y = -311

class UnlockManifolds extends Base {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    perform() {
        const check_mission = Base.prototype.is_mission_show(
            UNLOCK_MANIFOLDS_MARKED_X,
            UNLOCK_MANIFOLDS_MARKED_Y,
            this.x,
            this.y);
        if (check_mission) {
            let sprite = this.scene.scene.add.sprite(UNLOCK_MANIFOLDS_MARKED_X, UNLOCK_MANIFOLDS_MARKED_Y, "UnlockManifolds");
            sprite.tint = Math.random() * 0xffff00;
            return { scene: "Unlock", x: this.x, y: this.y, sprite: sprite }

        }
        return;
    }
}

export default UnlockManifolds;
