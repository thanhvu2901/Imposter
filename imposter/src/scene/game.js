import Phaser from "phaser";

import { movePlayer } from "../animation/movement.js";
import { animateMovement } from "../animation/animation.js";
import { io } from 'socket.io-client';
import {

    PLAYER_HEIGHT,
    PLAYER_WIDTH,
    PLAYER_START_X,
    PLAYER_START_Y,

} from "../consts/constants";

var player = {};
let pressedKeys = [];
let otherPlayer = {};
let socket;
class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }
    preload() {
        socket = io('localhost:3000')  //==> dời qua preload
    }
    create() {
        const ship = this.add.image(0, 0, "ship");
        player.sprite = this.add.sprite(PLAYER_START_X, PLAYER_START_Y, "player");
        player.sprite.displayHeight = PLAYER_HEIGHT;
        player.sprite.displayWidth = PLAYER_WIDTH;

        otherPlayer.sprite = this.add.sprite(
            PLAYER_START_X,
            PLAYER_START_Y,
            "otherPlayer",
        );
        otherPlayer.sprite.displayHeight = PLAYER_HEIGHT;
        otherPlayer.sprite.displayWidth = PLAYER_WIDTH;

        this.anims.create({
            key: "running",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 24,
            reapeat: -1,
        });
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("idle"),
            frameRate: 1,
            reapeat: 0,
        });

        this.input.keyboard.on("keydown", (e) => {
            if (!pressedKeys.includes(e.code)) {
                pressedKeys.push(e.code);
            }
        });
        this.input.keyboard.on("keyup", (e) => {
            pressedKeys = pressedKeys.filter((key) => key !== e.code);
        });


        socket.on('move', ({ x, y }) => {
            console.log('revieved move');
            if (otherPlayer.sprite.x > x) {
                otherPlayer.sprite.flipX = true;
            } else if (otherPlayer.sprite.x < x) {
                otherPlayer.sprite.flipX = false;
            }
            otherPlayer.sprite.x = x;
            otherPlayer.sprite.y = y;
            otherPlayer.moving = true;
        });
        socket.on('moveEnd', () => {
            console.log('revieved moveend');
            otherPlayer.moving = false;
        });

    }

    update() {
        this.scene.scene.cameras.main.centerOn(player.sprite.x, player.sprite.y);
        const playerMoved = movePlayer(pressedKeys, player.sprite);
        if (playerMoved) {
            socket.emit('move', { x: player.sprite.x, y: player.sprite.y });
            player.movedLastFrame = true;
        } else {
            if (player.movedLastFrame) {
                console.log('player move');
                socket.emit('moveEnd');
            }
            player.movedLastFrame = false;
        }
        animateMovement(pressedKeys, player.sprite);
        // Aninamte other player
        if (otherPlayer.moving && !otherPlayer.sprite.anims.isPlaying) {
            otherPlayer.sprite.play('running');
        } else if (!otherPlayer.moving && otherPlayer.sprite.anims.isPlaying) {
            otherPlayer.sprite.stop('running');
        }
    }
}

export default Game;