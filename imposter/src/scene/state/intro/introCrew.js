import { Runner } from "matter";
import Phaser from "phaser";
import audio from '../../../assets/audio/intro/Role_Reveal.mp3'
import crew from '../../../assets/img/intro/intro.jpg'
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

        //  this.isRole = data.isRole
    }
    //*********lấy socket định danh role và thông báo tới */
    //IMPOSTER?
    preload() {
        this.load.image('crew', crew)
        this.load.audio('intro', audio)
        this.socket.emit("whatRole", (this.textInput));
        this.socket.on("roleIs", (role) => {
            //console.log(role);
            // is imposterr
            isRole = role;
        });
    }
    create() {

        if (isRole == 1) {
            var sprite = this.add.image(530, 350, 'crew').setScale(0.6).setAlpha(0);
            let text = this.add.text(350, 230, 'YOU ARE CREWMATE!', { fontSize: '40px' }).setAlpha(0)
            //chạy intro logo
            let audio = this.sound.add('intro', {})
            setTimeout(audio.play(), 1000)
            var intro = this.tweens.add({
                targets: [sprite, text],
                alpha: 1,
                duration: 5000,
                ease: 'Power1',

                completeDelay: 2000,
                // onComplete: console.log('done'),
                // callbackScope: this.scene.stop('introCrew')

            });
            intro.complete(2000)
            intro.callbacks
        }



        else {
            // imposter == 1
        }
        //setTimeout(console.log('after done'), 6000)
        //);
    }
    Run() {
        this.scene.launch('game', { socket: this.socket, textInput: this.textInput, numPlayers: this.numPlayers, idPlayers: this.idPlayers })
        this.scene.stop('introCrew');
    }
}

export default introCrew