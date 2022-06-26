import Base from "./base";

const CHART_COURSE_MARKED_X = 1973
const CHART_COURSE_MARKED_y = -235

class ChartCourse extends Base {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    perform() {
        const check_mission = Base.prototype.is_mission_show(
            CHART_COURSE_MARKED_X,
            CHART_COURSE_MARKED_y,
            this.x,
            this.y);
        if (check_mission) {
            let sprite = this.scene.scene.add.image(CHART_COURSE_MARKED_X, CHART_COURSE_MARKED_y, "ChartCourse");
            sprite.tint =  Math.random() * 0xffff00;
            return { scene: "Course", x: this.x, y: this.y, sprite: sprite }

        }
        return;
    }   
}

export default ChartCourse