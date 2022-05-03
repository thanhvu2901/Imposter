import Phaser from "phaser";
import dropShip from "../assets/img/Dropship.png";
import lobby from "../assets/tilemaps/lobby.json";
import playerpng from "../assets/player/player_sprite/player_base.png";
import playerjson from "../assets/player/player_sprite/player_base.json";
import { PLAYER_SPEED } from "../consts/constants";
import { debugDraw } from "../scene/debugDraw";

let player;
let cursors;

let otherPlayer = new Array();
let otherPlayerId = new Array();
let socket, r;
var objectsLayer;
let pressedKeys = [];
let stt = 0
export default class waitingRoom extends Phaser.Scene {
  constructor() {
    super({
      key: "waitingRoom"
    });
    this.state = {};
  }
  init(data) {
    this.socket = data.socket;
    this.textInput = data.textInput;
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
    const text = this.add.text(5, 5, 'ID Room: ' + this.textInput).setScrollFactor(0)

    const customize = this.add
      .image(800, 700, "customizeBtn")
      .setScrollFactor(0)
      .setInteractive({ useHandCursor: true });
    //set room 

    //if host


    lobby_tileset.setCollisionByProperty({ collides: true });
    debugDraw(lobby_tileset, this);

    //cursor to direct
    cursors = this.input.keyboard.createCursorKeys();

    player = this.physics.add.sprite(-45, 26, "playerbase", "idle.png");
    // tạo theo số lượng other player vào

    for (let i = 0; i < otherPlayerId.length; i++) {
      otherPlayer[i] = this.physics.add.sprite(
        -45 + 2 * i,
        26 + 2 * i,
        "playerbase",
        "idle.png"
      );
    }
    stt = otherPlayer.length;
    // tạo object và gán các thuộc tính
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

    this.physics.add.collider(player, lobby_tileset);

    this.cameras.main.startFollow(player, true);

    //tải lại mới khi có player mới vào có các player đã ở trong đó
    console.log(this.textInput);
    this.socket.emit("joinRoom", this.textInput);

    this.socket.on("setState", (states) => {
      // this.physics.resume();
      // STATE
      this.state.roomKey = states.roomKey;
      this.state.host = Object.keys((states).players)[0]
      console.log("state: " + this.state.host);

      if (this.socket.id == this.state.host) {
        const start = this.add
          .image(960, 700, "startBtn")
          .setScrollFactor(0)
          .setInteractive({ useHandCursor: true });

        start.on('pointerdown', () => {

          // custom by host   
          let imposter = 2;
          let player = 4;
          let roomId = this.textInput
          this.socket.emit('letgo', ({ roomId, imposter, player }))
          console.log('after click');
          //this.scene.launch('game', { socket: this.socket, textInput: this.textInput, numPlayers: numPlayers })
        })
      }
    });



    this.socket.on("currentPlayers", ({ players, numPlayers }) => {
      console.log(players);
      for (let i = 0; i < numPlayers; i++) {
        if (this.socket.id !== Object.keys(players)[i]) {
          otherPlayerId.push(Object.keys(players)[i]);
          otherPlayer[stt] = this.physics.add.sprite(
            Object.values(players)[i].x,
            Object.values(players)[i].y,
            "playerbase",
            "idle.png"
          );
          stt = stt + 1;
        }
      }
      console.log(otherPlayerId);
    });

    this.socket.on("newPlayer", ({ playerInfo, numPlayers }) => {
      // listplyer socket có khác với tại local khong
      otherPlayerId.push(playerInfo.playerId);
      console.log(otherPlayerId);
      otherPlayer[stt] = this.physics.add.sprite(
        -40 + 2 * stt,
        30 + 2 * stt,
        "playerbase",
        "idle.png"
      );
      console.log("stt" + stt);
      stt += 1;
      console.log("new players " + otherPlayer[stt]);
      console.log("stt" + stt);
    });
    this.socket.on('gogame', ({ numPlayers, idPlayers }) => {
      console.log(numPlayers);
      this.scene.stop('waitingRoom')

      this.scene.launch('game', { socket: this.socket, textInput: this.textInput, numPlayers: numPlayers, idPlayers: idPlayers })
      this.game.scene.stop('waitingRoom')
    })






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
      this.socket.emit("move", {
        x: player.x,
        y: player.y,
        roomId: this.state.roomKey,
      });
      player.movedLastFrame = true;
    } else {
      if (player.movedLastFrame) {
        this.socket.emit("moveEnd", { roomId: this.state.roomKey });
      }
      player.movedLastFrame = false;
    }
  }
}
