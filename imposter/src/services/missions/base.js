class Base {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
    }

    is_mission_show(mission_marked_x, mission_marked_y, player_x, player_y) {
        if((player_x <= mission_marked_x + 100) && (player_x >= mission_marked_x - 100) 
        && 
         (player_y <= mission_marked_y + 100 ) && (player_y >= mission_marked_y - 100))
        {
            return true;
        }
        return false;
    }
    
}

export default Base;