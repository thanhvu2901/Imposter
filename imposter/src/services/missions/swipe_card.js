import Base from "./base";

const SWIPE_CARD_MARKED_X = 854;
const SWIPE_CARD_MARKED_Y = 240;

class SwipeCard extends Base {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    perform() {
        const check_mission = Base.prototype.is_mission_show(
            SWIPE_CARD_MARKED_X,
            SWIPE_CARD_MARKED_Y,
            this.x,
            this.y);
        if (check_mission) {
            let sprite = this.scene.scene.add.sprite(SWIPE_CARD_MARKED_X, SWIPE_CARD_MARKED_Y, "Swipcard_mision_marked");
            sprite.tint =  Math.random() * 0xffff00;
            return { scene: "swipeCard", x: this.x, y: this.y, sprite: sprite }

        }
        return;
    }

}

export default SwipeCard