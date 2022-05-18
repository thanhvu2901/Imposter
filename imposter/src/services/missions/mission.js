import DynamicMissionClass from "../../helper/dynamic_mission_class";
import AlignEngineOutput from "./align_engine_output";
import MapMissionsExporter from "../../helper/map_mission_exporter"


class Mission {
    constructor(map_name, map_missions, current_mission, scene, x, y) {
        this.map_name = map_name;
        this.map_missions = map_missions;
        this.current_mission = current_mission;
        this.scene = scene;
        this.x = x;
        this.y = y;
    }

    check_mission() {
        const map_exporter = new MapMissionsExporter(this.map_name);
        const missions = map_exporter.by_map_name();
        for (const mission_name in this.current_mission) {
            if (this.map_missions.is_completed(mission_name)) {
                const mission = new DynamicMissionClass(missions, mission_name, this.scene, this.x, this.y);
                const scene = mission.perform();
                if (scene)
                {
                    return scene;
                }
            }
        }
        return;
    }
}

export default Mission