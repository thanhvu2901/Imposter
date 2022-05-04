//import mission 
import AlignEngineOutput from "../services/missions/align_engine_output";
import KillPlayer from "../services/missions/kill_player";


class MapMissionsExporter {
    constructor(map) {
        this.map = map;
        this.missions = this.missions();
    }

    create()
    {
        return this.missions[this.map]
    }

    //all mission we have defined
    missions() 
    {
        return {
            "theSkeld": {
                "AlignEngineOutput": AlignEngineOutput,
                "KillPlayer": KillPlayer
            }
        }
    }  
    // get all mission of a specific map
    by_map_name()
    {
        return this.missions[this.map]
    }

    completed(mission_name)
    {
        delete this.missions[this.map][mission_name];
    }

    is_completed(mission_name)
    {
        return this.missions[this.map][mission_name] ? true : false;
    }
}

export default MapMissionsExporter;