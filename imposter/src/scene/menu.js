import Phaser from 'phaser'


import JoinGame from './joinGame.js';
import Options from './state/inmenu/options.js'
export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'menu'
        })
    }

    init() {

    }

    create() { //creating the menu screen

        //create images (z order)

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'logo').setDepth(1);

        this.add.image(0, 0, 'background').setOrigin(0.01).setDepth(0);



        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'play').setDepth(1);

        let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, 'options').setDepth(1);

        //create sprites (if using pixel art, remove sharpen)



        //create audio, disable pauseonblur

        // this.sound.pauseOnBlur = false;
        // this.sound.play('audio', { loop: true })




        //create audio, disable pauseonblur

        this.sound.pauseOnBlur = false;
        //this.sound.play(CST.AUDIO.TITLE, {loop: true})


        //make image buttons interactive

        /* 
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */

        // **************************button play********************
        playButton.setInteractive({ useHandCursor: true });
        playButton.on("pointerover", () => {
            //đổi màu chữ
            playButton.setTintFill('#00FF00')
        })
        playButton.on("pointerdown", () => {
            console.log('start game');
            //this.scene.start('game', Game);
            this.scene.start('joinGame', JoinGame);
        })
        playButton.on("pointerout", () => {
            // this.scene.start(play);
            playButton.clearTint()
        })



        // ******************************button options********************
        optionsButton.setInteractive({ useHandCursor: true });

        optionsButton.on("pointerover", () => {
            optionsButton.setTintFill('#00FF00')
        })
        optionsButton.on("pointerout", () => {
            optionsButton.clearTint();
        })

        optionsButton.on("pointerdown", () => {
            console.log('options in pointer down');
            this.scene.start('options', Options.create);
        })

    }
}