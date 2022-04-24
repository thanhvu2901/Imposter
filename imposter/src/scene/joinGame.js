import Phaser from "phaser";
import { io, Socket } from 'socket.io-client';
import Game from "./game";


let textInput = ''
let socket;
export default class JoinGame extends Phaser.Scene {

    constructor() {
        super({
            key: 'joinGame'
        })
    }

    preload() {

        socket = io('localhost:3000')

    }

    create() {


        let create = this.add.text(this.game.renderer.width / 2 - 50, this.game.renderer.height * 0.2, 'Create new room!!').setInteractive({ cursor: 'pointer' })


        let check = this.add.text(this.game.renderer.width / 2 - 50, this.game.renderer.height * 0.2 + 60, 'Enter room ID V')
        var textEntry = this.add.text(this.game.renderer.width / 2 - 50, this.game.renderer.height * 0.2 + 80, '', { font: '32px Courier', fill: '#ffff00' });

        this.input.keyboard.on('keydown', function (event) {

            if (event.keyCode === 8 && textEntry.text.length > 0) {
                textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) {
                textEntry.text += event.key;
                textInput = textEntry.text;
            }

        });

        let joinRoombtn = this.add.text(this.game.renderer.width / 2 - 50, this.game.renderer.height * 0.2 + 120, 'Join room').setInteractive({ cursor: 'pointer' })

        create.on('pointerdown', () => {

            socket.emit("getRoomCode");


        });

        joinRoombtn.on('pointerdown', () => {
            socket.emit("isKeyValid", textInput);
        })


        socket.on("roomCreated", function (roomKey) {
            this.roomKey = roomKey;
            // // scene.roomKeyText.setText(scene.roomKey);

            console.log(roomKey);
            //this.scene.launch('game', { socket: socket })
            textInput = roomKey
            socket.emit('ok')

        });
        socket.on('join', () => {
            this.scene.stop('joinGame')
            this.scene.launch('game', { socket: socket, textInput: textInput })
        })

        socket.on("keyNotValid", function () {
            // scene.notValidText.setText("Invalid Room Key");
            console.log("Invalid Room Key");
        });

        socket.on("keyIsValid", () => {

            this.scene.stop("joinGame");
            this.scene.launch('game', { socket: socket, textInput: textInput })
        });

        // socket.on('joined', () => {
        //     // this.scene.start('game', Game);
        //     this.scene.launch('game', { socket: socket })
        // })



        // socket.on('move', ({ x, y, playerId }) => {
        //     console.log(x);
        // })
    }

}


