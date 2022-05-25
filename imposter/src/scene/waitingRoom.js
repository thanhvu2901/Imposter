import Phaser from "phaser";
import dropShip from "../assets/img/Dropship.png";
import lobby from "../assets/tilemaps/lobby.json";

import playerpng from "../assets/player/player_sprite/player_base.png";
import playerjson from "../assets/player/player_sprite/player_base.json";
import Archaeologist_Walk_png from "../assets/player/player_sprite/Archaeologist_Walk.png";
import Archaeologist_Walk_json from "../assets/player/player_sprite/Archaeologist_Walk.json";

import { PLAYER_SPEED } from "../consts/constants";
import { debugDraw } from "../scene/debugDraw";
import eventsCenter from "./eventsCenter";
let player;
let pants_skin;
let cursors;

let otherPlayer = new Array();
let otherPlayerId = new Array();
let pressedKeys = [];
let stt = 0;
export default class waitingRoom extends Phaser.Scene {
  constructor() {
    super({
      key: "waitingRoom",
    });
    this.state = {};
  }
  init(data) {
    this.socket = data.socket;
    this.textInput = data.textInput;

    this.playerChangedSkin = data.playerChangedSkin;
    this.numberImposter = data.numberImposter;
    this.numberPlayer = data.numberPlayer;
    // this.test = data.test
  }
  preload() {
    this.load.image("dropShip", dropShip);
    this.load.tilemapTiledJSON("lobby", lobby);
    this.load.atlas("playerbase", playerpng, playerjson);
    this.load.atlas(
      "archaeologist_walk",
      Archaeologist_Walk_png,
      Archaeologist_Walk_json
    );


    // console.log('preload');
  }

  create() {
    const lobby = this.make.tilemap({ key: "lobby" });
    const tileset = lobby.addTilesetImage("Dropship", "dropShip");
    const lobby_tileset = lobby.createLayer("Background", tileset);
    const text = this.add
      .text(5, 5, "ID Room: " + this.textInput)
      .setScrollFactor(0);

    const customize = this.add
      .image(800, 700, "customizeBtn")
      .setScrollFactor(0)
      .setInteractive({ useHandCursor: true });

    lobby_tileset.setCollisionByProperty({ collides: true });
    debugDraw(lobby_tileset, this);

    //cursor to direct
    cursors = this.input.keyboard.createCursorKeys();

    player = this.physics.add.sprite(-45, 26, "playerbase", "idle.png");
    // pants_skin = this.physics.add.sprite(
    //   player.x,
    //   player.y,
    //   "archaeologist_walk",
    //   "Archaeologist_Spawn0051.png"
    // );
    // tạo theo số lượng other player vào

    for (let i = 0; i < otherPlayerId.length; i++) {
      otherPlayer[i] = this.physics.add.sprite(
        -45 + 20 * i,
        26 + 20 * i,
        "playerbase",
        "idle.png"
      );
    }
    stt = otherPlayer.length;

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

    this.input.keyboard.on('keydown', (e) => {
      if (
        e.code == 'ArrowDown' ||
        e.code == 'ArrowUp' ||
        e.code == 'ArrowRight' ||
        e.code == 'ArrowLeft'
      ) {
        this.sound.play('walk', { loop: true })
        this.anims.create({
          key: "archaeologist_walk",
          frames: this.anims.generateFrameNames("archaeologist_walk", {
            start: 1,
            end: 12,
            prefix: "Archaeologist_Walk",
            suffix: ".png",
          }),
          repeat: -1,
          frameRate: 16,
        });


      }
    })


    this.input.keyboard.on("keyup", (e) => {
      this.sound.stopByKey("walk");
      console.log(e.code);
      pressedKeys = pressedKeys.filter((key) => key !== e.code);

    });

    this.physics.add.collider(player, lobby_tileset);

    this.cameras.main.startFollow(player, true);

    //tải lại mới khi có player mới vào có các player đã ở trong đó
    this.socket.emit("joinRoom", this.textInput);

    this.socket.on("setState", (states) => {
      // this.physics.resume();
      // STATE
      this.state.roomKey = states.roomKey;
      this.state.host = Object.keys(states.players)[0];
      console.log("state: " + this.state.host);

      //IF HOST
      if (this.socket.id == this.state.host) {
        const start = this.add
          .image(960, 700, "startBtn")
          .setScrollFactor(0)
          .setInteractive({ useHandCursor: true });

        start.on("pointerdown", () => {
          // custom by host   *********SETTING input from customize *************
          let imposter = this.numberImposter ?? 1;
          let player = this.numberPlayer;
          // let imposter= this.numberImposter;
          // let player= this.numberPlayer;
          let roomId = this.textInput;
          this.socket.emit("letgo", { roomId, imposter, player });
          console.log("after click");
          // console.log("changedskin: ", this.playerChangedSkin);
          // console.log("number imposter: ", imposter);
          // console.log("number player: ", player);
          //this.scene.launch('game', { socket: this.socket, textInput: this.textInput, numPlayers: numPlayers })
        });
      }
    });

    this.socket.on("currentPlayers", ({ players, numPlayers }) => {

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
      // console.log(otherPlayerId);
    });

    this.socket.on("newPlayer", ({ playerInfo, numPlayers }) => {
      // listplyer socket có khác với tại local khong
      otherPlayerId.push(playerInfo.playerId);
      console.log(otherPlayerId);
      otherPlayer[stt] = this.physics.add.sprite(
        -40 + 10 * stt,
        30 + 10 * stt,
        "playerbase",
        "idle.png"
      );
      console.log("stt" + stt);
      stt += 1;
      console.log("new players " + otherPlayer[stt]);
      console.log("stt" + stt);
    });

    // this.socket.on("move", ({ x, y, playerId }) => {
    //   console.log({ x, y, playerId });

    //   let index = otherPlayerId.findIndex((Element) => Element == playerId);
    //   //id = index;
    //   console.log(index);

    //   if (otherPlayer[index].x > x) {
    //     otherPlayer[index].flipX = true;
    //   } else if (otherPlayer[index].x < x) {
    //     otherPlayer[index].flipX = false;
    //   }
    //   otherPlayer[index].x = x;
    //   otherPlayer[index].y = y;
    //   otherPlayer[index].moving = true;

    //   if (otherPlayer[index].moving && !otherPlayer[index].anims.isPlaying) {
    //     otherPlayer[index].play("player-walk");
    //   } else if (
    //     !otherPlayer[index].moving &&
    //     otherPlayer[index].anims.isPlaying
    //   ) {
    //     otherPlayer[index].stop("player-walk");
    //   }
    // });

    // this.socket.on("moveEnd", ({ playerId }) => {
    //   let index = otherPlayerId.findIndex((Element) => Element == playerId);
    //   otherPlayer[index].moving = false;
    //   otherPlayer[index].anims.play("player-idle");
    //   if (otherPlayer[index].moving && !otherPlayer[index].anims.isPlaying) {
    //     otherPlayer[index].play("player-walk");
    //   } else if (
    //     !otherPlayer[index].moving &&
    //     otherPlayer[index].anims.isPlaying
    //   ) {
    //     otherPlayer[index].stop("player-walk");
    //   }
    // });

    customize.on("pointerdown", () => {
      // this.input.on('pointerdown', () => this.scene.start('ChangeSkin'))
      // this.scene.pause("waitingRoom");
      this.scene.launch("ChangeSkin", {
        socket: this.socket,
        textInput: this.textInput,
      });
      this.scene.bringToTop("ChangeSkin");
    });

    this.socket.on("gogame", ({ numPlayers, idPlayers }) => {
      //console.log(numPlayers);
      // this.scene.stop('waitingRoom')

      // ********anouning ROLE****//

      //*****start game */
      // this.scene.launch('game', { socket: this.socket, textInput: this.textInput, numPlayers: numPlayers, idPlayers: idPlayers })
      this.scene.launch("introCrew", {
        socket: this.socket,
        textInput: this.textInput,
        numPlayers: numPlayers,
        idPlayers: idPlayers,
        numberImposter: this.numberImposter ?? 1,
      });
      this.game.scene.stop("waitingRoom");
    });

    eventsCenter.on("update", (data) => {
      this.playerChangedSkin = data.playerChangedSkin;
      this.numberImposter = data.numberImposter;
      this.numberPlayer = data.numberPlayer;
    });
    // this.events.on('resume', (data) => {
    //   console.log('resume');
    //   console.log(data);
    //   this.socket = data.socket;
    //   this.textInput = data.textInput;
    //   this.playerChangedSkin = data.playerChangedSkin;
    //   this.numberImposter = data.numberImposter;
    //   this.numberPlayer = data.numberPlayer
    //   ///  console.log(dataResume.test);

    // })
    //pants_skin.anims.play("archaeologist_walk");
  }
  update() {
    // pants_skin.setPosition(this.player.x, this.player.y);
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
