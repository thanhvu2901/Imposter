import Phaser from "phaser";
import dropShip from "../assets/img/Dropship.png";
import lobby from "../assets/tilemaps/lobby.json";
import playerpng from "../assets/player/player_sprite/player_base.png";
import playerjson from "../assets/player/player_sprite/player_base.json";
import { PLAYER_SPEED } from "../consts/constants";
import { debugDraw } from "../scene/debugDraw";

let player;
let cursors;

export default class waitingRoom extends Phaser.Scene {
  constructor() {
    super({
      key: "waitingRoom",
    });
  }

  preload() {
    this.load.image("dropShip", dropShip);
    this.load.tilemapTiledJSON("lobby", lobby);
    this.load.atlas("playerbase", playerpng, playerjson);
  }

  create() {
    const lobby = this.make.tilemap({ key: "lobby" });
    const tileset = lobby.addTilesetImage("Dropship", "dropShip");
    const lobby_tileset = lobby.createLayer("Background", tileset);
    lobby_tileset.setCollisionByProperty({ collides: true });
    debugDraw(lobby_tileset, this);

    //cursor to direct
    cursors = this.input.keyboard.createCursorKeys();

    player = this.physics.add.sprite(150, 128, "playerbase", "idle.png");

    // tạo object và gán các thuộc tính
    this.anims.create({
      key: "player-idle",
      frames: [{ key: "playerbase", frame: "idle.png" }],
    });

    //animation player
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

    //player death
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

    this.physics.add.collider(player, lobby_tileset);

    this.cameras.main.startFollow(player, true);
  }

  update() {
    let playerMoved = false;

    player.setVelocity(0);
    if (
      !cursors.left.isDown &&
      !cursors.right.isDown &&
      !cursors.up.isDown &&
      !cursors.down.isDown
    ) {
      player.anims.play("player-idle");
    }

    // when move
    if (cursors.left.isDown) {
      player.anims.play("player-walk", true);
      player.setVelocityX(-PLAYER_SPEED);
      player.scaleX = -1;
      player.body.offset.x = 40;
      playerMoved = true;
    } else if (cursors.right.isDown) {
      player.anims.play("player-walk", true);
      player.setVelocityX(PLAYER_SPEED);
      player.scaleX = 1;
      player.body.offset.x = 0;
      playerMoved = true;
    }

    if (cursors.up.isDown) {
      player.anims.play("player-walk", true);
      player.setVelocityY(-PLAYER_SPEED);
      playerMoved = true;
    } else if (cursors.down.isDown) {
      player.anims.play("player-walk", true);
      player.setVelocityY(PLAYER_SPEED);
      playerMoved = true;
    }
  }
}
