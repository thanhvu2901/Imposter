import { Runner } from "matter";
import Phaser from "phaser";
import audio from '../../../assets/audio/intro/Role_Reveal.mp3'
import crew from '../../../assets/img/intro/intro.jpg'
import imposter from '../../../assets/img/intro/imposter.jpg'
let isRole;
class introCrew extends Phaser.Scene {
    constructor() {
        super({
            key: 'introCrew'
        })
    }
    init(data) {
        this.socket = data.socket;
        this.textInput = data.textInput;
        this.numPlayers = data.numPlayers;
        this.idPlayers = data.idPlayers;
        this.numberImposter = data.numberImposter
        //  this.isRole = data.isRole
    }
    //*********lấy socket định danh role và thông báo tới */
    //IMPOSTER?
    preload() {

        this.load.image('crew', crew)
        this.load.image('imposter', imposter)
        this.load.audio('intro', audio)
        this.socket.emit("whatRole", (this.textInput));
        this.socket.on("roleIs", (role) => {
            //console.log(role);
            // is imposterr
            isRole = role;
        });
    }
    create() {
        console.log(this.numberImposter);
        if (isRole == 1) {
            var sprite = this.add.image(530, 350, 'imposter').setScale(0.6).setAlpha(0);
            let text = this.add.text(350, 230, 'YOU are Impostor!', { fontSize: '40px' }).setAlpha(0)
            //chạy intro logo
            let audio = this.sound.add('intro', {})
            setTimeout(audio.play(), 1000)
            var intro = this.tweens.add({
                targets: [sprite, text],
                alpha: 1,
                duration: 5000,
                ease: 'Power1',

                onComplete: this.time.addEvent({
                    delay: 5000,
                    callback: () => {
                        Run(this)
                    }
                })
                // onCompleteParams: [sprite, text]
                // callbackScope: this.scene.stop('introCrew')

            });

        }



        else {
            var sprite = this.add.image(530, 350, 'crew').setScale(0.6).setAlpha(0);
            let text = this.add.text(350, 230, `There is ${this.numberImposter} Imposter among us!`, { fontSize: '40px' }).setAlpha(0)
            //chạy intro logo
            let audio = this.sound.add('intro', {})
            setTimeout(audio.play(), 1000)
            var intro = this.tweens.add({
                targets: [sprite, text],
                alpha: 1,
                duration: 5000,
                ease: 'Power1',

                onComplete: this.time.addEvent({
                    delay: 5000,
                    callback: () => {
                        Run(this)
                    }
                })


            });

        }


    }

}
function Run(game) {
    game.scene.launch('game', { socket: game.socket, textInput: game.textInput, numPlayers: game.numPlayers, idPlayers: game.idPlayers })
    game.scene.stop('introCrew');
    // console.log(game.scene);
}
export default introCrew