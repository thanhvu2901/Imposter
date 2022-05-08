import Phaser from "phaser";
import audio from '../../../assets/audio/intro/Role_Reveal.mp3'
//import Imposter from '../../../assets/img/intro/introImposter.js'
class introImposter extends Phaser.Scene {
    constructor() {
        super({
            key: 'introImposter'
        })
    }
    //*********lấy socket định danh role và thông báo tới */
    //IMPOSTER?
    preload() {
        //  this.load.image('Imposter', Imposter)
        this.load.audio('intro', audio)
    }
    create() {
        var sprite = this.add.rectangle(530, 350, 1090, 180, 0x00FFFF).setAlpha(0)
        let text = this.add.text(350, 230, 'YOU ARE ImposterMATE!', { fontSize: '40px' }).setAlpha(0)
        //chạy intro logo
        let audio = this.sound.add('intro', {})
        setTimeout(audio.play(), 1000)
        // var intro = this.tweens.add({
        //     targets: [sprite, text],
        //     alpha: 1,
        //     yoyo: false,
        //     duration: 4000,
        //     ease: 'Power1',
        //     delay: 1000
        // });
        var intro = this.tweens.add({
            targets: [sprite],
            alphaTopLeft: { value: 1, duration: 5000, ease: 'Power1' },
            alphaBottomRight: { value: 1, duration: 5000, ease: 'Power1' },
            // onComplete: function () {
            //     console.log('menu');
            //     // this.run();
            //     this.load.sc
            // }
        });
    }
}

export default introImposter