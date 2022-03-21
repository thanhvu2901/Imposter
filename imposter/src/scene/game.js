import Phaser from "phaser";
import tileImg from "../assets/img/theSkeld.png";
import theskeld from "../assets/tilemaps/theskeld.json";
import playerpng from "../assets/player/player_sprite/player_base.png";
import playerjson from "../assets/player/player_sprite/player_base.json";
import { debugDraw } from "../scene/debugDraw";

import {
  PLAYER_SPRITE_WIDTH,
  PLAYER_SPRITE_HEIGHT,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_START_X,
  PLAYER_START_Y,
  PLAYER_SPEED,
} from "../consts/constants";

var player;
var cursors;
let pressedKeys = [];

class Game extends Phaser.Scene {
  preload() {
    this.load.image("tiles", tileImg);
    this.load.tilemapTiledJSON("tilemap", theskeld);
    this.load.atlas("playerbase", playerpng, playerjson);
  }

  create() {
    const ship = this.make.tilemap({ key: "tilemap" });
    const tileset = ship.addTilesetImage("theSkeld", "tiles");

    const ship_tileset = ship.createLayer("Background", tileset);
    ship_tileset.setCollisionByProperty({ collides: true });

    debugDraw(ship_tileset, this);

    player = this.physics.add.sprite(128, 128, "playerbase", "idle.png");
    cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "player-idle",
      frames: [{ key: "playerbase", frame: "idle.png" }],
    });

    this.anims.create({
      key: "player-walk",
      frames: this.anims.generateFrameNames("playerbase", {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    this.anims.create({
      key: "player-dead",
      frames: this.anims.generateFrameNames("playerbase", {
        start: 1,
        end: 42,
        prefix: "Dead",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.input.keyboard.on("keydown", (e) => {
      if (!pressedKeys.includes(e.code)) {
        pressedKeys.push(e.code);
      }
    });
    this.input.keyboard.on("keyup", (e) => {
      pressedKeys = pressedKeys.filter((key) => key !== e.code);
    });

    this.physics.add.collider(player, ship_tileset);

    this.cameras.main.startFollow(player, true);
  }

  update() {
    // this.scene.scene.cameras.main.centerOn(player.sprite.x, player.sprite.y);

    player.setVelocity(0);
    if (
      !cursors.left.isDown &&
      !cursors.right.isDown &&
      !cursors.up.isDown &&
      !cursors.down.isDown
    ) {
      player.anims.play("player-idle");
    }

    if (cursors.left.isDown) {
      player.anims.play("player-walk", true);
      player.setVelocityX(-PLAYER_SPEED);
      player.scaleX = -1;
      player.body.offset.x = 40;
    } else if (cursors.right.isDown) {
      player.anims.play("player-walk", true);
      player.setVelocityX(PLAYER_SPEED);
      player.scaleX = 1;
      player.body.offset.x = 0;
    }

    if (cursors.up.isDown) {
      player.anims.play("player-walk", true);
      player.setVelocityY(-PLAYER_SPEED);
    } else if (cursors.down.isDown) {
      player.anims.play("player-walk", true);
      player.setVelocityY(PLAYER_SPEED);
    }
  }
}

export default Game;
