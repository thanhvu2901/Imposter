import Phaser from "phaser";
import tileImg from "../assets/img/theSkeld.png";
import theskeld from "../assets/tilemaps/theskeld.json";
import playerpng from "../assets/player/player_sprite/player_base.png";
import playerjson from "../assets/player/player_sprite/player_base.json";
import { debugDraw } from "../scene/debugDraw";

import { io } from 'socket.io-client';
import {
  PLAYER_SPEED
} from "../consts/constants";

let player
let otherPlayer = new Array;
let otherPlayerId = new Array;
let cursors;
let pressedKeys = [];
let stt = 0;

let socket;

// otherPlayer.indexOf

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }
  preload() {
    this.load.image("tiles", tileImg);
    this.load.tilemapTiledJSON("tilemap", theskeld);
    this.load.atlas("playerbase", playerpng, playerjson);
    socket = io('localhost:3000')
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




    //  otherPlayer[playerId] = this.physics.add.sprite(250, 228, "playerbase", "idle.png");

    //****************** */


    //cursor to direct
    cursors = this.input.keyboard.createCursorKeys();

    // tạo object và gán các thuộc tính
    this.anims.create({
      key: "player-idle",
      frames: [{ key: "playerbase", frame: "idle.png" },
      ],
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


    //nếu có player mới vào thì nhận và tạo mới trong map
    // socket.emit('new',({socketId: socket.id}))



    //tải lại mới khi có player mới vào có các player đã ở trong đó


    // socket.on('otherPlayer', ({ listPlayer }) => {
    //   // otherPlayer[playerId] = this.physics.add.sprite(250, 228, "playerbase", "idle.png");
    //   // listplyer socket có khác với tại local khong
    //   for (let i = 0; i < listPlayer.length; i++) {
    //     otherPlayerId[i] = listPlayer[i]
    //     otherPlayer[i] = this.physics.add.sprite(250, 328 + 10 * i, "playerbase", "idle.png");

    //   }
    //   console.log(otherPlayerId);
    // })

    socket.on('move', ({ x, y, playerId }) => {
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
      }
    });

    socket.on('moveEnd', ({ playerId }) => {
      let index = otherPlayerId.findIndex(Element => Element == playerId)
      //  console.log('revieved moveend');
      //id = index;
      otherPlayer[index].moving = false;
      otherPlayer[index].anims.play('player-idle')
      if (otherPlayer[index].moving && !otherPlayer[index].anims.isPlaying) {
        otherPlayer[index].play('player-walk');
      } else if (!otherPlayer[index].moving && otherPlayer[index].anims.isPlaying) {
        otherPlayer[index].stop('player-walk');
      }

    });


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



    if (playerMoved) {

      socket.emit('move', { x: player.x, y: player.y });
      //console.log(player.x);
      player.movedLastFrame = true;
    } else {
      if (player.movedLastFrame) {
        socket.emit('moveEnd');
      }
      player.movedLastFrame = false;
    }
    socket.on("play", (data) => {
      //emit lai lis
      console.log('new');
      console.log(data);
      // console.log(listPlayer);
      // console.log(newId);
      // otherPlayerId.push(newId);
      // otherPlayer[stt] = this.physics.add.sprite(250, 328 + 10 * stt, "playerbase", "idle.png");
      // stt += 1;

      // console.log(otherPlayerId);
      //console.log(listPlayer);

    })

  }
}

export default Game;
