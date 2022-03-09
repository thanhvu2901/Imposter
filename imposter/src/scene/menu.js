import Phaser from 'phaser'

import logo from '../assets/img/logo.png'
import background from '../assets/img/background.jpg'
import play from '../assets/img/play_button.png'
import options from '../assets/img/options_button.png'
import cat from '../assets/img/cat.png'
import audio from '../assets/audio/audio.mp3'
//import CSSString from 'url(assets/input/cursors/sword.cur), pointer'
export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'menu'
        })
    }

    init() {

    }
    // preload() {
    //     this.load.image('background', background);
    //     this.load.image('play', play);
    //     this.load.image('cat', cat);
    //     this.load.image('options', options);
    //     this.load.image('logo', logo);
    //     this.load.audio('audio', audio)
    // }
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


        var hoverSprite = new Phaser.GameObjects.Sprite(this, 100, 100, cat)

        hoverSprite.setScale(2);
        hoverSprite.setVisible(false);

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

        playButton.setInteractive({ useHandCursor: true });

        playButton.on("pointerover", () => {
            hoverSprite.setVisible(true);

            hoverSprite.x = playButton.x - playButton.width;
            hoverSprite.y = playButton.y;

        })

        playButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        playButton.on("pointerup", () => {
            // this.scene.start(play);
        })

        optionsButton.setInteractive({ useHandCursor: true });

        optionsButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = optionsButton.x - optionsButton.width;
            hoverSprite.y = optionsButton.y;

        })

        optionsButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        optionsButton.on("pointerup", () => {
            //this.scene.launch();
        })

    }
}