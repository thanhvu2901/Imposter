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
            let sprite = this.scene.scene.add.sprite(CLEAN_ASTEROIDS_MARKED_X, CLEAN_ASTEROIDS_MARKED_Y, "CleanAsteroids");
            sprite.tint =  Math.random() * 0xffff00;  
            return {scene: "CleanAsteroids", x: this.x, y: this.y, sprite: sprite}
            
        }
        return;      
    }
}

export default CleanAsteroids