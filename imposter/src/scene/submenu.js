import Phaser from 'phaser'

import Game from './game.js'

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

        this.sound.pauseOnBlur = false;

        /* 
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */

        // **************************button play********************
        // playButton.setInteractive({ useHandCursor: true });
        // playButton.on("pointerover", () => {
        //     //đổi màu chữ
        //     playButton.setTintFill('#00FF00')
        // })
        // playButton.on("pointerdown", () => {
        //     console.log('start game');
        //     this.scene.start('game', Game);
        // })
        // playButton.on("pointerout", () => {
        //     // this.scene.start(play);
        //     playButton.clearTint()
        // })



        // // ******************************button options********************
        // optionsButton.setInteractive({ useHandCursor: true });

        // optionsButton.on("pointerover", () => {
        //     optionsButton.setTintFill('#00FF00')
        // })
        // optionsButton.on("pointerout", () => {
        //     optionsButton.clearTint();
        // })

        // optionsButton.on("pointerdown", () => {
        //     console.log('options in pointer down');
        //     this.scene.start('options', Options.create);
        // })

    }
}