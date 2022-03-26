import Phaser from 'phaser'

import Game from './game.js'
import Login from './login.js';

export default class SubMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'submenu'
        })
    }

    init() {

    }

    create() { //creating the menu screen

        //create images (z order)

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'logo').setDepth(1);

        this.add.image(0, 0, 'background').setOrigin(0.01).setDepth(0);

        //let guestButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'play').setDepth(1);
        var text = this.add.text(this.game.renderer.width / 2 - 40, this.game.renderer.height / 2, 'login as :')
        var guest = this.add.text(this.game.renderer.width / 2 - 40, this.game.renderer.height / 2 + 50, 'GUEST')
        let facebookButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, 'facebook').setDepth(1).setScale(0.2)


        //create audio, disable pauseonblur

        // this.sound.pauseOnBlur = false;
        // **************************facebook login button********************
        facebookButton.setInteractive({ useHandCursor: true });

        facebookButton.on("pointerdown", () => {

            this.scene.start('login', Login);
        })
        facebookButton.on("pointerout", () => {
            // this.scene.start(play);
            facebookButton.clearTint()
        })
    }
}