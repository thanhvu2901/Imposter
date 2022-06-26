import Base from "./base";

const UPLOAD_DATA_MARKER_X = 1130
const UPLOAD_DATA_MARKER_Y = -890

class UploadData extends Base {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    perform() {
        const check_mission = Base.prototype.is_mission_show(
            UPLOAD_DATA_MARKER_X,
            UPLOAD_DATA_MARKER_Y,
            this.x,
            this.y);
        if (check_mission) {
            let sprite = this.scene.scene.add.sprite(UPLOAD_DATA_MARKER_X, UPLOAD_DATA_MARKER_Y, "UploadData_mission_marked");
            sprite.tint = Math.random() * 0xffff00;
            return { scene: "Upload", x: this.x, y: this.y, sprite: sprite }

        }
        return;
    }   
}


export default UploadData