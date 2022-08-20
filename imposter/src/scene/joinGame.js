import Phaser from "phaser";
import { io, Socket } from 'socket.io-client';
import Game from "./game";
import test from "../assets/test.html"

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
        this.add.image(0, 200, 'background').setOrigin(0.2).setSize(1080, 769).setDepth(0);
        let ele = this.add.dom(this.game.renderer.width * 0.45 + 50, this.game.renderer.height * 0.35 + 100).createFromHTML(test)
        this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.2, 'createRoom').setScale(0.4).setInteractive({ cursor: 'pointer' })
        let createPublic = this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.25, 'public').setScale(0.4).setInteractive({ cursor: 'pointer' })
        let createPrivate = this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.30, 'private').setScale(0.4).setInteractive({ cursor: 'pointer' })

        let check = this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.35 + 60, 'enterRoom').setScale(0.4)

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

            var inputText = ele.getChildByName('nameField');
            textInput = inputText.value
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
            let name = window.localStorage.getItem('namePlayer')
            socket.emit('ok', { roomKey: roomKey, name: name })

        });
        socket.on('join', () => {
            this.scene.stop('joinGame')
            this.scene.launch('waitingRoom', { socket: socket, textInput: textInput })
        })

        socket.on("keyNotValid", function () {
            // scene.notValidText.setText("Invalid Room Key");

            alert('can not find the room!')
        });

        socket.on("keyIsValid", () => {

            this.scene.stop("joinGame");
            this.scene.launch('waitingRoom', { socket: socket, textInput: textInput })
        });
        createPublic.on("pointerover", () => {
            //đổi màu chữ
            createPublic.setTintFill(0x3399CC)
        })
        createPublic.on("pointerout", () => {
            // this.scene.start(play);
            createPublic.clearTint()
        })
        createPrivate.on("pointerover", () => {
            //đổi màu chữ
            createPrivate.setTintFill(0x3399CC)
        })
        createPrivate.on("pointerout", () => {
            // this.scene.start(play);
            createPrivate.clearTint()
        })

        joinRoombtn.on("pointerover", () => {
            //đổi màu chữ
            joinRoombtn.setTintFill(0x3399CC)
        })
        joinRoombtn.on("pointerout", () => {
            // this.scene.start(play);
            joinRoombtn.clearTint()
        })

        randomRoom.on("pointerover", () => {
            //đổi màu chữ
            randomRoom.setTintFill(0x3399CC)
        })
        randomRoom.on("pointerout", () => {
            // this.scene.start(play);
            randomRoom.clearTint()
        })
    }

}


