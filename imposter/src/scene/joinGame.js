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


        let createPublic = this.add.text(this.game.renderer.width * 0.4, this.game.renderer.height * 0.25, 'Create new room PUBLIC ', { font: '32px Courier', fill: '#ffffff' }).setInteractive({ cursor: 'pointer' })
        let createPrivate = this.add.text(this.game.renderer.width * 0.4, this.game.renderer.height * 0.30, 'Create new room PRIVATE ', { font: '32px Courier', fill: '#ffffff' }).setInteractive({ cursor: 'pointer' })

        let check = this.add.text(this.game.renderer.width * 0.4, this.game.renderer.height * 0.3 + 60, 'Enter room ID:', { font: '32px Courier', fill: '#ffffff' })
        var textEntry = this.add.text(this.game.renderer.width * 0.4, this.game.renderer.height * 0.3 + 105, '', { font: '32px Courier', fill: '#000000' });
        textEntry.setDepth(1)
        this.input.keyboard.on('keydown', function (event) {
            if (event.keyCode === 8 && textEntry.text.length > 0) {
                textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) {
                textEntry.text += event.key;
                textInput = textEntry.text;
            }

        });
        let reg = this.add.rectangle(this.game.renderer.width * 0.4 + 90, this.game.renderer.height * 0.3 + 120, 180, 34, 0xFFFFFF).setDepth(0)

        let joinRoombtn = this.add.text(this.game.renderer.width * 0.4, this.game.renderer.height * 0.3 + 150, 'Join room', { font: '32px Courier', fill: '#ffffff' }).setInteractive({ cursor: 'pointer' })

        let randomRoom = this.add.text(this.game.renderer.width * 0.4, this.game.renderer.height * 0.3 + 210, 'Random Room', { font: '32px Courier', fill: '#ffffff' }).setInteractive({ cursor: 'pointer' })

        createPublic.on('pointerdown', () => {
            socket.emit("getRoomCode");

        });
        createPrivate.on('pointerdown', () => {
            socket.emit("getRoomCodePrivate");

        });

        joinRoombtn.on('pointerdown', () => {
            socket.emit("isKeyValid", textInput);
        })

        randomRoom.on('pointerdown', () => {
            //emit random and get 1 room random
            socket.emit('getRandomRoom')
        })
        socket.on('randomRoom', (randomRoomId) => {
            this.scene.stop('joinGame')
            this.scene.launch('waitingRoom', { socket: socket, textInput: randomRoomId })
        })

        socket.on("roomCreated", function (roomKey) {
            this.roomKey = roomKey;
            console.log(roomKey);
            textInput = roomKey
            socket.emit('ok')

        });
        socket.on('join', () => {
            this.scene.stop('joinGame')
            this.scene.launch('waitingRoom', { socket: socket, textInput: textInput })
        })

        socket.on("keyNotValid", function () {
            // scene.notValidText.setText("Invalid Room Key");
            console.log("Invalid Room Key");
            alert('can not find the room!')
        });

        socket.on("keyIsValid", () => {

            this.scene.stop("joinGame");
            this.scene.launch('waitingRoom', { socket: socket, textInput: textInput })
        });

    }

}


