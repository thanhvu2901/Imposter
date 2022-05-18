import Base from "./base";

const FIX_WIRING_MARKED_X = -349;
const FIX_WIRING_MARKED_Y = 150

class FixWiring extends Base {
    constructor(scene, x, y)
    {
        super(scene, x, y);
    }

    perform()
    {
        const check_mission = Base.prototype.is_mission_show(FIX_WIRING_MARKED_X, 
                                                            FIX_WIRING_MARKED_Y, 
                                                            this.x,
                                                            this.y);                                              
        if(check_mission){
            this.scene.scene.add.image(FIX_WIRING_MARKED_X, FIX_WIRING_MARKED_Y, "FixWiring_mission_marked");
            return {scene: "fixWiring", x: this.x, y: this.y}
            
        }
        return;      
    }   
}

export default FixWiring