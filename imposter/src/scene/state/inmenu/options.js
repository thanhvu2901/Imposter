import Phaser from "phaser";

class Options extends Phaser.Scene {
    constructor() {
        super({ key: 'options' })
    }
    //sau khi đã load từ preload
    init() {

    }
    create() {
        console.log('in options');

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'setting').setDepth(1);
        this.add.image(0, 0, 'background').setOrigin(0.01).setDepth(0);

        var playSound = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20 + 100, 'SOUND OFF')
        var playMusic = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20 + 150, 'Mute music')
        var back = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20 + 200, '<- Back ')


        playSound.setInteractive({ useHandCursor: true });
        console.log(this.sound.mute); //
        var isMute = false
        playSound.on('pointerdown', async () => {
            isMute = !isMute;
            this.game.sound.mute = true;
            if (isMute === true) {
                playSound.setText("SOUND OFF");
            } else {
                playSound.setText("SOUND ON");
            }
            console.log(this.game.sound.mute);
        })

        // this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function (target) {
        //     playMusic = !playMusic;
        //     target.text = playMusic ? 'Mute Music' : 'Play Music';
        //     musicPlayer.volume = playMusic ? 1 : 0;
        // });
        // this.addMenuOption(playSound ? 'Mute Sound' : 'Play Sound', function (target) {
        //     playSound = !playSound;
        //     target.text = playSound ? 'Mute Sound' : 'Play Sound';
        // });
        // this.addMenuOption('<- Back', function () {
        //     game.state.start("menu");
        // });

    }

}

export default Options;
