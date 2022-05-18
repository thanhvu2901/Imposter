//import mission 
import AlignEngineOutput from "../services/missions/align_engine_output";
import CleanO2Filter from "../services/missions/cleanO2Filter";
import FixWiring from "../services/missions/fix_wiring";
import CleanAsteroids from "../services/missions/cleanAsteroids";
import StabilizeSteering from "../services/missions/stabilize_steering";


class MapMissionsExporter {
    constructor(map) {
        this.map = map;
        this.missions = this.missions();
        this.map_missions_number = 5;
        this.total_missions_completed = 0;
        this.list_missions_completed = [];
    }

    create() {
        //get current length of mission's map
        const mission_number = Object.keys(this.missions[this.map]).length;
        const missions_random = this.choose_mission(mission_number);

        let mission_picked = {};
        for (const [index, [key, value]] of Object.entries(Object.entries(this.missions[this.map]))) {
            if (missions_random.includes(+index)) {
                mission_picked[key] = value;
            }
        }

        this.missions_picked = mission_picked;
        return mission_picked;
    }

    //all mission we have defined
    missions() {
        return {
            "theSkeld": {
                "AlignEngineOutput": AlignEngineOutput,
                "CleanO2Filter": CleanO2Filter,
                "FixWiring": FixWiring,
                "CleanAsteroids": CleanAsteroids,
                "StabilizeSteering": StabilizeSteering
            }
        }
    }
    // get all mission of a specific map
    by_map_name() {
        return this.missions[this.map]
    }

    completed(mission_name) {
        delete this.missions[this.map][mission_name];
    }

    count_missions_completed(number) {
        this.total_missions_completed = number;
        this.update_total_mission_complete();
    }

    update_list_missions_completed(list_missions) {
        this.list_missions_completed = list_missions;
        this.update_show_mission();
    }
    is_completed(mission_name) {
        return this.missions[this.map][mission_name] ? true : false;
    }

    update_show_mission() {
        let y = 50;
        if (!this.scence) {
            this.scence = scence;
        }
        for (let mission_name in this.missions_picked) {
            if (!this.list_missions_completed.includes(mission_name)) {
                this.scence.add.text(22, y, mission_name).setScrollFactor(0, 0);
            }
            else {
                this.scence.add.text(22, y, mission_name, { fill: '#ffff00' }).setScrollFactor(0, 0);
            }
            y += 20;
        }
    }
    choose_mission(mission_number) {
        let mission_picked = []
        for (let i = 0; i < this.map_missions_number; i++) {
            //random number in mission_number range
            let i = 0;
            while (i < 1000) {
                let picked_number = Math.floor(Math.random() * mission_number);
                if (!mission_picked.includes(picked_number)) {
                    mission_picked.push(picked_number)
                    break;
                }
                i++;
            }
        }

        return mission_picked
    }

    show_mission(scence) {
        let y = 50;
        if (!this.scence) {
            this.scence = scence;
        }

        for (let mission_name in this.missions_picked) {
            if (!this.list_missions_completed.includes(mission_name)) {
                scence.add.text(22, y, mission_name).setScrollFactor(0, 0);
            }
            else {
                scence.add.text(22, y, mission_name, { fill: '#ffff00' }).setScrollFactor(0, 0);
            }
            y += 20;
        }

        for (let i = 0; i < 5; i++) {
            this.draw_rectangle(60 + (i * 70), 25, false)
        }

        scence.add.text(100, 19, "TOTAL TASK COMPLETED").setScrollFactor(0, 0);
    }

    update_total_mission_complete() {
        if (this.total_missions_completed < 6) {
            for (let i = 0; i < this.total_missions_completed; i++) {
                this.draw_rectangle(60 + (i * 70), 25, true)
            }
        }
        this.scence.add.text(100, 19, "TOTAL TASK COMPLETED").setScrollFactor(0, 0);
    }

    draw_rectangle(x, y, is_mission_completed) {
        let rectangle = this.scence.add.rectangle(x, y, 70, 30, 0X203233).setScrollFactor(0, 0);
        if (is_mission_completed) {
            rectangle = this.scence.add.rectangle(x, y, 70, 30, 0x07667a).setScrollFactor(0, 0);
        }
        rectangle.setStrokeStyle(2, 0Xe9f2f2);
    }
}

export default MapMissionsExporter;