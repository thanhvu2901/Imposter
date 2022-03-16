import Phaser from "phaser";
import playerSprite from "../assets/img/player.png";
import shipImg from "../assets/img/theSkeld.png";
import idle from "../assets/img/idle.png";
import { movePlayer } from "../animation/movement";
import { animateMovement } from "../animation/animation";

import {
    PLAYER_SPRITE_WIDTH,
    PLAYER_SPRITE_HEIGHT,
    PLAYER_HEIGHT,
    PLAYER_WIDTH,
    PLAYER_START_X,
    PLAYER_START_Y,
    PLAYER_SPEED,
} from "../consts/constants";

var player = {};
let pressedKeys = [];

class Game extends Phaser.Scene {

    // preload() {

    //     this.load.image("ship", shipImg);
    //     this.load.spritesheet("player", playerSprite, {
    //         frameWidth: PLAYER_SPRITE_WIDTH,
    //         frameHeight: PLAYER_SPRITE_HEIGHT,
    //     });
    //     this.load.spritesheet("idle", idle, {
    //         frameWidth: PLAYER_SPRITE_WIDTH,
    //         frameHeight: PLAYER_SPRITE_HEIGHT,
    //     });
    // }

    create() {
        const ship = this.add.image(0, 0, "ship");
        player.sprite = this.add.sprite(PLAYER_START_X, PLAYER_START_Y, "player");
        player.sprite.displayHeight = PLAYER_HEIGHT;
        player.sprite.displayWidth = PLAYER_WIDTH;

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
    }

    update() {
        this.scene.scene.cameras.main.centerOn(player.sprite.x, player.sprite.y);
        movePlayer(pressedKeys, player.sprite);
        animateMovement(pressedKeys, player.sprite);
    }
}

export default Game;