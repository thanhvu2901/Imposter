import Phaser from "phaser";
import guideMap from "../../../assets/img/guideMap.png"
import closeBtn from '../../../assets/img/closeButton.png'
class guidemap extends Phaser.Scene {
    constructor() {
        super({
            key: 'guidemap'
        })
    }
    preload() {
        this.load.image('guideMap', guideMap)
        this.load.image('closeBtn', closeBtn)
    }
    create() {
        let guidedmap = this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.5, 'guideMap').setScale(0.8)

        let closeBtn = this.add.image(860, 180, 'closeBtn').setScale(0.8)
        closeBtn.setInteractive({ useHandCursor: true });

        closeBtn.on("pointerdown", () => {
            this.scene.stop('guidemap')
        })

    }
}

export default guidemap;