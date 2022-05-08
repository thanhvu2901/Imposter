import Phaser from "phaser";
import audio from '../../../assets/audio/intro/Role_Reveal.mp3'
import crew from '../../../assets/img/intro/intro.jpg'

class introCrew extends Phaser.Scene {
    constructor() {
        super({
            key: 'introCrew'
        })
    }
    //*********lấy socket định danh role và thông báo tới */
    //IMPOSTER?
    preload() {
        this.load.image('crew', crew)
        this.load.audio('intro', audio)
    }
    create() {
        var sprite = this.add.image(530, 350, 'crew').setScale(0.6).setAlpha(0);
        let text = this.add.text(350, 230, 'YOU ARE CREWMATE!', { fontSize: '40px' }).setAlpha(0)
        //chạy intro logo
        let audio = this.sound.add('intro', {})
        setTimeout(audio.play(), 1000)
        var intro = this.tweens.add({
            targets: [sprite, text],
            alpha: 1,
            yoyo: false,
            duration: 4000,
            ease: 'Power1',
            delay: 1000
        });
    }
}

export default introCrew