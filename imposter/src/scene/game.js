import Phaser from "phaser";
import tileImg from "../assets/img/theSkeld.png";
import theskeld from "../assets/tilemaps/theskeld.json";
import playerpng from "../assets/player/player_sprite/player_base.png";
import playerjson from "../assets/player/player_sprite/player_base.json";
import { debugDraw } from "../scene/debugDraw";

import { movePlayer } from "../animation/movement.js";

import { io } from "socket.io-client";
import {
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_START_X,
  PLAYER_START_Y,
  PLAYER_SPEED,
} from "../consts/constants";

var player;
var cursors;
let pressedKeys = [];
let otherPlayer = {};
<<<<<<< HEAD
let objectsGroup = [];
let socket;
=======
let socket,r;
>>>>>>> d48a65e6295000196c21747576df1de5aa9bb9a1
var objectsLayer;

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }
  preload() {
    this.load.image("tiles", tileImg);
    this.load.tilemapTiledJSON("tilemap", theskeld);
    this.load.atlas("playerbase", playerpng, playerjson);
    socket = io("localhost:3000");
  }

  create() {
    const ship = this.make.tilemap({ key: "tilemap" });
    const tileset = ship.addTilesetImage("theSkeld", "tiles");

    const ship_tileset = ship.createLayer("Background", tileset);
    ship_tileset.setCollisionByProperty({ collides: true });

    debugDraw(ship_tileset, this);
    //add player
    player = this.physics.add.sprite(250, 328, "playerbase", "idle.png");

    // tạo theo số lượng other player vào
    otherPlayer = this.physics.add.sprite(250, 228, "playerbase", "idle.png");
    //****************** */

    //cursor to direct
    cursors = this.input.keyboard.createCursorKeys();

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

    //input to control
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

    //listen from other
    socket.on("move", ({ x, y }) => {
      console.log("revieved move");
      if (otherPlayer.x > x) {
        otherPlayer.flipX = true;
      } else if (otherPlayer.x < x) {
        otherPlayer.flipX = false;
      }
      otherPlayer.x = x;
      otherPlayer.y = y;
      otherPlayer.moving = true;
    });
    socket.on("moveEnd", () => {
      console.log("revieved moveend");
      otherPlayer.moving = false;
      otherPlayer.anims.play("player-idle");
    });

    objectsLayer = ship.getObjectLayer("GameObjects");
    objectsLayer.objects.forEach((object) => {
      const { name, x, y, width, height, properties } = object;
<<<<<<< HEAD
      //  console.log(x, y);
      console.log(width, height);
      var circle = this.add.circle(x, y, 130, 0x6666ff);
      var obj = ship.createFromObjects("GameObjects", { name: name });
      console.log(obj);
      this.physics.add.collider(player, circle);
=======
    //  console.log(x, y);
      console.log( width,  height);
      // if (player.x <= x + 100 && player.x >= x - 100 && player.y <= y+ 100 && player.y >= y- 100 && name == "table") {
      //   console.log("collide with table")
      // } 
   //   this.add.rectangle( x, y, 20, 20, 0x6666ff);
    r=this.add.circle(x,y,100)
  
  // player.setBounce(1, 1);
 //  player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(x,y,100,100));
 //r.setStatic(true)

this.physics.add.existing(r)

r.body.immovable=true
//r.body.moves=false
r.body.setCircle(100)
this.physics.add.overlap(player, r,null, null, this);
this.physics.add.collider(player,r)
// player.body.setBoundsRectangle(r)
>>>>>>> d48a65e6295000196c21747576df1de5aa9bb9a1
    });
  }

  update() {
   // this.physics.world.collide(player, circle);
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

    //emit
    //  this.scene.scene.cameras.main.centerOn(player.sprite.x, player.sprite.y);
    //const playerMoved = movePlayer(pressedKeys, player.sprite);
    if (playerMoved) {
      socket.emit("move", { x: player.x, y: player.y });
      //console.log(player.x);
      player.movedLastFrame = true;
    } else {
      if (player.movedLastFrame) {
        socket.emit("moveEnd");
      }
      player.movedLastFrame = false;
    }

    // update running other player
    if (otherPlayer.moving && !otherPlayer.anims.isPlaying) {
      otherPlayer.play("player-walk");
    } else if (!otherPlayer.moving && otherPlayer.anims.isPlaying) {
      otherPlayer.stop("player-walk");
    }
    // console.log(objectsLayer);

    objectsLayer.objects.forEach((object) => {
      const { name, x, y, width, height, properties } = object;
      //  console.log(x, y);
      //  console.log(name)
      //  console.log( width,  height);
      // if (
      //   player.x <= x + 130 &&
      //   player.x >= x - 130 &&
      //   player.y <= y + 130 &&
      //   player.y >= y - 130 &&
      //   name == "table"
      // ) {
      //   console.log("collide with table");
      // }
      switch (name) {
        case "table": {
          if (
            player.x <= x + 130 &&
            player.x >= x - 130 &&
            player.y <= y + 130 &&
            player.y >= y - 130
          ) {
            console.log("collide with table");
          }
          break;
        }

        default:
          break;
      }
    });
    // console.log("player.x: " + player.x + " player.y: " + player.y);
  }
}

export default Game;
