import Phaser from "phaser";
import guideMap from "../../../assets/img/guideMap.png"
import closeBtn from '../../../assets/img/closeButton.png'
import Icon from "../../../assets/img/mini.png"
class guidemap extends Phaser.Scene {
    constructor() {
        super({
            key: 'guidemap'
        })
    }
    preload() {
        this.load.image('guideMap', guideMap)
        this.load.image('closeBtn', closeBtn)
        this.load.image('Icon', Icon);
    }
    create() {
        let guidedmap = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'guideMap')

        let icon = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, 'Icon').setScale(0.1)

        // let map = this.add.group([guidemap])
        // map.add(icon)

        let closeBtn = this.add.image(860, 180, 'closeBtn').setScale(0.8)
        closeBtn.setInteractive({ useHandCursor: true });


        console.log(icon.x + "  " + icon.y);
        // closeBtn.on("pointerdown", () => {
        //     this.scene.stop('guidemap')
        // })


        // this.socket.on("move", ({ x, y, playerId }) => {
        //     //console.log({ x, y, playerId });

        //     let index = otherPlayerId.findIndex((Element) => Element == playerId);
        //     //id = index;
        //     // console.log(index);

        //     if (icon.x > x) {
        //         icon.flipX = true;
        //     } else if (icon.x < x) {
        //         icon.flipX = false;
        //     }
        //     icon.x = x;
        //     icon.y = y;
        //     icon.moving = true;

        //     if (icon.moving && !icon.anims.isPlaying) {
        //         icon.play("player-walk");
        //     } else if (
        //         !icon.moving &&
        //         icon.anims.isPlaying
        //     ) {
        //         icon.stop("player-walk");
        //     }
        // });

        // console.log(objectsLayer);

        //   this.socket.on("moveEnd", ({ playerId }) => {
        //     let index = otherPlayerId.findIndex((Element) => Element == playerId);
        //     icon.moving = false;
        //     icon.anims.play("player-idle");
        //     if (icon.moving && !icon.anims.isPlaying) {
        //       icon.play("player-walk");
        //     } else if (
        //       !icon.moving &&
        //       icon.anims.isPlaying
        //     ) {
        //       icon.stop("player-walk");
        //     }
        //   });
    }

    update() {

    }
}

export default guidemap;