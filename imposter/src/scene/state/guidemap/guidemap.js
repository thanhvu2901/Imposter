import Phaser from "phaser";
import guideMap from "../../../assets/img/guideMap.png"
class guidemap extends Phaser.Scene {
    constructor() {
        super({
            key: 'guidemap'
        })
    }
    preload() {
        this.load.image('guideMap', guideMap)
    }
    create() {
        let guidedmap = this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.5, 'guideMap', { width: 240, height: 139 })
    }
}

export default guidemap;