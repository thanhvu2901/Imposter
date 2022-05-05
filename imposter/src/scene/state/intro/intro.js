import Phaser from "phaser";
import audio from '../../../assets/audio/intro/Role_Reveal.mp3'
import crew from '../../../assets/img/intro/intro.jpg'
class intro extends Phaser.Scene {
    constructor() {
        super({
            key: 'intro'
        })
    }
    //*********lấy socket định danh role và thông báo tới */
    //IMPOSTER?
    preload() {
        this.load.image('crew', crew)
        this.load.audio('intro', audio)
    }
    create() {
        var sprite = this.add.image(530, 280, 'crew').setAlpha(0);

        //chạy intro logo
        this.sound.play('intro');
        var intro = this.tweens.add({
            targets: [sprite],
            alphaTopLeft: { value: 1, duration: 5000, ease: 'Power1' },
            alphaBottomRight: { value: 1, duration: 5000, ease: 'Power1' },
        });
    }
}

export default intro