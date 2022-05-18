import Base from "./base";

const CLEAN_ASTEROIDS_MARKED_X = 1185;
const CLEAN_ASTEROIDS_MARKED_Y = -740;

class CleanAsteroids extends Base {
    constructor(scene, x, y)
    {
        super(scene, x, y);
    }

    perform()
    {
        const check_mission = Base.prototype.is_mission_show(CLEAN_ASTEROIDS_MARKED_X, 
                                                            CLEAN_ASTEROIDS_MARKED_Y, 
                                                            this.x, 
                                                            this.y);
        if(check_mission){
            this.scene.scene.add.image(CLEAN_ASTEROIDS_MARKED_X, CLEAN_ASTEROIDS_MARKED_Y, "CleanAsteroids");
            return {scene: "CleanAsteroids", x: this.x, y: this.y}
            
        }
        return;      
    }
}

export default CleanAsteroids