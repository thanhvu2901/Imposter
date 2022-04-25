import Phaser, { Scene } from "phaser";
import tileImg from "../assets/img/theSkeld.png";
import theskeld from "../assets/tilemaps/theskeld.json";
import playerpng from "../assets/player/player_sprite/player_base.png";
import playerjson from "../assets/player/player_sprite/player_base.json";
import { debugDraw } from "../scene/debugDraw";
import { io } from "socket.io-client";

import {
  PLAYER_SPEED
} from "../consts/constants";

let player
let otherPlayer = new Array;
let otherPlayerId = new Array;
let cursors;
let pressedKeys = [];
<<<<<<< HEAD
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
=======
let stt = 0;


// otherPlayer.indexOf

class Game extends Phaser.Scene {
  constructor() {

    super({ key: 'game' });
    //this.state = {};
    this.state = {}
>>>>>>> 974eb27bb870dfd73c42056665d758badf29b6b5
  }

  init(data) {
    this.socket = data.socket
    this.textInput = data.textInput

  }

  preload() {
    this.load.image("tiles", tileImg);
    this.load.tilemapTiledJSON("tilemap", theskeld);
    this.load.atlas("playerbase", playerpng, playerjson);
<<<<<<< HEAD
    socket = io("localhost:3000");
=======

>>>>>>> 974eb27bb870dfd73c42056665d758badf29b6b5
  }

  create() {

    const ship = this.make.tilemap({ key: "tilemap" });
    const tileset = ship.addTilesetImage("theSkeld", "tiles");

    const ship_tileset = ship.createLayer("Background", tileset);
    ship_tileset.setCollisionByProperty({ collides: true });

    const useBtn = this.add.image(1000, 700, 'useBtn').setScrollFactor(0).setInteractive({ useHandCursor: true });

    debugDraw(ship_tileset, this);


    //add player
    player = this.physics.add.sprite(250, 328, "playerbase", "idle.png");

    // tạo theo số lượng other player vào

    for (let i = 0; i < otherPlayerId.length; i++) {
      otherPlayer[i] = this.physics.add.sprite(250, 328 + 30 * i, "playerbase", "idle.png");
    }
    stt = otherPlayer.length;



    //****************** */

    //cursor to direct
    cursors = this.input.keyboard.createCursorKeys();

    //input button
    useBtn.on('pointerdown', () => {

      this.scene.launch('fixWiring')

    })

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
<<<<<<< HEAD

=======
>>>>>>> 974eb27bb870dfd73c42056665d758badf29b6b5
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

<<<<<<< HEAD
    //listen from other
    socket.on("move", ({ x, y }) => {
      console.log("revieved move");
      if (otherPlayer.x > x) {
        otherPlayer.flipX = true;
      } else if (otherPlayer.x < x) {
        otherPlayer.flipX = false;
=======




    //tải lại mới khi có player mới vào có các player đã ở trong đó
    console.log(this.textInput);
    this.socket.emit("joinRoom", this.textInput);

    this.socket.on("setState", (states) => {

      // this.physics.resume();
      // STATE
      this.state.roomKey = states.roomKey

      console.log("state: " + this.state.roomKey);
    });

    this.socket.on("currentPlayers", ({ players, numPlayers }) => {
      console.log(players);
      for (let i = 0; i < numPlayers; i++) {

        if (this.socket.id !== Object.keys(players)[i]) {
          otherPlayerId.push(Object.keys(players)[i])
          otherPlayer[stt] = this.physics.add.sprite(Object.values(players)[i].x, Object.values(players)[i].y, "playerbase", "idle.png");
          stt = stt + 1;
        }
      }
      console.log(otherPlayerId);
    })


    this.socket.on('newPlayer', ({ playerInfo, numPlayers }) => {
      // listplyer socket có khác với tại local khong
      otherPlayerId.push(playerInfo.playerId);
      console.log(otherPlayerId);
      otherPlayer[stt] = this.physics.add.sprite(250, 328 + 10 * stt, "playerbase", "idle.png");
      console.log("stt" + stt);
      stt += 1;
      console.log('new players ' + otherPlayer[stt]);
      console.log("stt" + stt);
    })

    this.socket.on('move', ({ x, y, playerId }) => {
      console.log({ x, y, playerId });

      let index = otherPlayerId.findIndex(Element => Element == playerId)
      //id = index;
      console.log(index);

      if (otherPlayer[index].x > x) {
        otherPlayer[index].flipX = true;
      } else if (otherPlayer[index].x < x) {
        otherPlayer[index].flipX = false;
      }
      otherPlayer[index].x = x;
      otherPlayer[index].y = y;
      otherPlayer[index].moving = true;

      if (otherPlayer[index].moving && !otherPlayer[index].anims.isPlaying) {
        otherPlayer[index].play('player-walk');
      } else if (!otherPlayer[index].moving && otherPlayer[index].anims.isPlaying) {
        otherPlayer[index].stop('player-walk');
>>>>>>> 974eb27bb870dfd73c42056665d758badf29b6b5
      }
    });
<<<<<<< HEAD
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
=======

    this.socket.on('moveEnd', ({ playerId }) => {
      let index = otherPlayerId.findIndex(Element => Element == playerId)
      otherPlayer[index].moving = false;
      otherPlayer[index].anims.play('player-idle')
      if (otherPlayer[index].moving && !otherPlayer[index].anims.isPlaying) {
        otherPlayer[index].play('player-walk');
      } else if (!otherPlayer[index].moving && otherPlayer[index].anims.isPlaying) {
        otherPlayer[index].stop('player-walk');
      }

    });




>>>>>>> 974eb27bb870dfd73c42056665d758badf29b6b5
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

    if (playerMoved) {
<<<<<<< HEAD
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
=======

      this.socket.emit('move', { x: player.x, y: player.y, roomId: this.state.roomKey });
      player.movedLastFrame = true;
    } else {
      if (player.movedLastFrame) {
        this.socket.emit('moveEnd', { roomId: this.state.roomKey });
      }
      player.movedLastFrame = false;
    }
>>>>>>> 974eb27bb870dfd73c42056665d758badf29b6b5
  }
}


export default Game;
