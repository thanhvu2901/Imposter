import Phaser from "phaser";
import { TextBox } from 'phaser3-rex-plugins/templates/ui/ui-components.js';

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
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
                textEntry.text += event.key;
                textInput = textEntry.text;
            }

        });

        let joinRoombtn = this.add.text(this.game.renderer.width / 2 - 50, this.game.renderer.height * 0.2 + 120, 'Join room').setInteractive({ cursor: 'pointer' })

        create.on('pointerdown', () => {
            console.log('create');
            hostCreateGame();
            // this.scene.start('game', Game);
            this.scene.launch('game', { socket: socket })
        });

        joinRoombtn.on('pointerdown', () => {
            console.log(textInput);
            //joinRoom(textInput)
            //  this.scene.start('game', Game);
            this.scene.launch('game', { socket: socket, textInput: textInput })
        })
        // socket.on('joined', () => {
        //     // this.scene.start('game', Game);
        //     this.scene.launch('game', { socket: socket })
        // })
        socket.on('connectToRoom', (data) => { console.log(data); })
        socket.on('inromm', (data) => { console.log(data); })


        // socket.on('move', ({ x, y, playerId }) => {
        //     console.log(x);
        // })
    }

}
function hostCreateGame() {
    var thisGameId = (Math.random() * 100000) | 0;
    // create new room
    socket.emit('newGameCreated', { gameId: thisGameId, mySocketId: socket.id })
    // socket.on('connectToRoom', (data) => { console.log(data); })
    //join room and wait
    console.log(thisGameId.toString());
}
function joinRoom(roomId) {
    socket.emit('joinRoom', roomId)
}

