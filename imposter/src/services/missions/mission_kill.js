import MapMissionsExporter from "../../helper/map_mission_exporter"
import KillPlayer from "./kill_player";


class MissionKill {
    constructor(map_name, map_missions ,current_mission, scene, x, y, listOtherPlayer) {
        this.map_name = map_name;
        this.map_missions = map_missions;
        this.current_mission = current_mission;
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.listOtherPlayer= listOtherPlayer
    }

    check_mission() {
        const map_exporter = new MapMissionsExporter(this.map_name);
        const missions = map_exporter.by_map_name();
        for(const mission_name in this.current_mission){
            if(this.map_missions.is_completed(mission_name))
            {
                const mission = new KillPlayer(this.scene, this.x, this.y, this.listOtherPlayer);
                return mission.perform();
            }
        }
        return;     
    }
}

export default MissionKill