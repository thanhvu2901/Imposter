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

    socket = io.connect('localhost:3000')

 
       
       
    }

    create() {
        this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.2, 'createRoom').setScale(0.4).setInteractive({ cursor: 'pointer' })
        let createPublic = this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.25, 'public').setScale(0.4).setInteractive({ cursor: 'pointer' })
        let createPrivate = this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.30, 'private').setScale(0.4).setInteractive({ cursor: 'pointer' })

        let check = this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.35 + 60, 'enterRoom').setScale(0.4)
        var textEntry = this.add.text(this.game.renderer.width * 0.45, this.game.renderer.height * 0.35 + 88, '', { font: '32px Courier', fill: '#000000' })
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
        let reg = this.add.rectangle(this.game.renderer.width * 0.5, this.game.renderer.height * 0.35 + 100, 180, 34, 0xFFFFFF).setDepth(0)

        let joinRoombtn = this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.35 + 160, 'joinRoom').setScale(0.4).setInteractive({ cursor: 'pointer' })

        let randomRoom = this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.35 + 210, 'random').setScale(0.4).setInteractive({ cursor: 'pointer' })

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
        createPublic.on("pointerover", () => {
            //đổi màu chữ
            createPublic.setTintFill('#00FF00')
        })
        createPublic.on("pointerout", () => {
            // this.scene.start(play);
            createPublic.clearTint()
        })
        createPrivate.on("pointerover", () => {
            //đổi màu chữ
            createPrivate.setTintFill('#00FF00')
        })
        createPrivate.on("pointerout", () => {
            // this.scene.start(play);
            createPrivate.clearTint()
        })

        joinRoombtn.on("pointerover", () => {
            //đổi màu chữ
            joinRoombtn.setTintFill('#00FF00')
        })
        joinRoombtn.on("pointerout", () => {
            // this.scene.start(play);
            joinRoombtn.clearTint()
        })

        randomRoom.on("pointerover", () => {
            //đổi màu chữ
            randomRoom.setTintFill('#00FF00')
        })
        randomRoom.on("pointerout", () => {
            // this.scene.start(play);
            randomRoom.clearTint()
        })
    }

}


