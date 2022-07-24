import Phaser from "phaser";
import "babel-polyfill";
class Options extends Phaser.Scene {
    constructor() {
        super({ key: 'options' })
    }
    //sau khi đã load từ preload
    init() {

    }
    create() {
    

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'setting').setDepth(1);
        this.add.image(0, 0, 'background').setOrigin(0.01).setDepth(0);

        var playSound = this.add.text(this.game.renderer.width / 2 - 50, this.game.renderer.height * 0.20 + 100, 'SOUND OFF')
        var playMusic = this.add.text(this.game.renderer.width / 2 - 50, this.game.renderer.height * 0.20 + 150, 'Mute music')
        var back = this.add.text(this.game.renderer.width / 2 - 50, this.game.renderer.height * 0.20 + 200, '<- Back ')

        let isMute = false

        playSound.setInteractive({ useHandCursor: true });
        back.setInteractive({ useHandCursor: true })
    


        //  ********on/off sound**********
        playSound.on('pointerdown', () => {
            isMute = !isMute;

            //this.game.sound.mute = isMute; // ==> true
            if (isMute === true) {
                playSound.setText("SOUND OFF");
                this.game.sound.mute = true;
               
            } else {
                playSound.setText("SOUND ON");
                this.game.sound.mute = false;
            }
       

        })




        //*****back */
        back.on('pointerdown', () => {
            this.scene.start('menu')

        })



    }

}

export default Options;
