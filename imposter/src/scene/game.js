import Phaser from "phaser";
import playerSprite from "../assets/img/player.png";
import tileImg from "../assets/img/theSkeld.png";
import theskeld from "../assets/tilemaps/theskeld.json";
import idle from "../assets/img/idle.png";
import playerpng from "../assets/player/player_sprite/player_base.png";
import playerjson from "../assets/player/player_sprite/player_base.json";
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

    preload() {

        this.load.image("tiles", tileImg);
        this.load.tilemapTiledJSON("tilemap", theskeld);
        this.load.spritesheet("player", playerSprite, {
            frameWidth: PLAYER_SPRITE_WIDTH,
            frameHeight: PLAYER_SPRITE_HEIGHT,
        });
        this.load.spritesheet("idle", idle, {
            frameWidth: PLAYER_SPRITE_WIDTH,
            frameHeight: PLAYER_SPRITE_HEIGHT,
        });
        this.load.atlas("playerbase", playerpng, playerjson);
    }

    create() {
        // const ship = this.add.image(0, 0, "ship");
        const ship = this.make.tilemap({key: "tilemap"});
        const tileset = ship.addTilesetImage("theSkeld", "tiles");
        ship.createLayer("Background", tileset);

        this.add.image(PLAYER_START_X, PLAYER_START_Y, "playerbase");

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