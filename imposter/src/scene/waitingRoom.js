import Phaser from "phaser";
import dropShip from "../assets/img/Dropship.png";
import lobby from "../assets/tilemaps/lobby.json";

import playerpng from "../assets/player/player_sprite/player_base.png";
import playerjson from "../assets/player/player_sprite/player_base.json";
import Archaeologist_Walk_png from "../assets/player/player_sprite/Archaeologist_Walk.png";
import Archaeologist_Walk_json from "../assets/player/player_sprite/Archaeologist_Walk.json";

import { PLAYER_SPEED } from "../consts/constants";


// Player color
import playerpng_red from "../assets/player/player_sprite/player_base_red.png";
import playerjson_red from "../assets/player/player_sprite/player_base_red.json";
import playerpng_blue from "../assets/player/player_sprite/player_base_blue.png";
import playerjson_blue from "../assets/player/player_sprite/player_base_blue.json";
import playerpng_blue_dark from "../assets/player/player_sprite/player_base_blue_dark.png";
import playerjson_blue_dark from "../assets/player/player_sprite/player_base_blue_dark.json";
import playerpng_blue_light from "../assets/player/player_sprite/player_base_blue_light.png";
import playerjson_blue_light from "../assets/player/player_sprite/player_base_blue_light.json";
import playerpng_gray_dark from "../assets/player/player_sprite/player_base_gray_dark.png";
import playerjson_gray_dark from "../assets/player/player_sprite/player_base_gray_dark.json";
import playerpng_gray_light from "../assets/player/player_sprite/player_base_gray_light.png";
import playerjson_gray_light from "../assets/player/player_sprite/player_base_gray_light.json";
import playerpng_green_dark from "../assets/player/player_sprite/player_base_green_dark.png";
import playerjson_green_dark from "../assets/player/player_sprite/player_base_green_dark.json";
import playerpng_green_light from "../assets/player/player_sprite/player_base_green_light.png";
import playerjson_green_light from "../assets/player/player_sprite/player_base_green_light.json";
import playerpng_orange from "../assets/player/player_sprite/player_base_orange.png";
import playerjson_orange from "../assets/player/player_sprite/player_base_orange.json";
import playerpng_purple from "../assets/player/player_sprite/player_base_purple.png";
import playerjson_purple from "../assets/player/player_sprite/player_base_purple.json";
import playerpng_yellow from "../assets/player/player_sprite/player_base_yellow.png";
import playerjson_yellow from "../assets/player/player_sprite/player_base_yellow.json";
import playerpng_pink from "../assets/player/player_sprite/player_base_pink.png";
import playerjson_pink from "../assets/player/player_sprite/player_base_pink.json";


import {

  PLAYER_BLUE,
  PLAYER_RED,
  PLAYER_BLUE_DARK,
  PLAYER_BLUE_LIGHT,
  PLAYER_GRAY_DARK,
  PLAYER_GRAY_LIGHT,
  PLAYER_GREEN_DARK,
  PLAYER_GREEN_LIGHT,
  PLAYER_ORANGE,
  PLAYER_PURPLE,
  PLAYER_YELLOW,
  PLAYER_PINK,
} from "../consts/constants";
import { debugDraw } from "../scene/debugDraw";
import eventsCenter from "./eventsCenter";
let player;
let pants_skin;
let cursors;

let otherPlayer = new Array();
let otherPlayerId = new Array();
let pressedKeys = [];
let stt = 0;
var color = "";
let defaultPlayer={};
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
    this.test = data.test
  }
  preload() {
    this.load.image("dropShip", dropShip);
    this.load.tilemapTiledJSON("lobby", lobby);
    this.load.atlas("playerbase", playerpng, playerjson);

    //Player color
    this.load.atlas(PLAYER_RED, playerpng_red, playerjson_red);
    this.load.atlas(PLAYER_BLUE, playerpng_blue, playerjson_blue);
    this.load.atlas(
      PLAYER_BLUE_DARK,
      playerpng_blue_dark,
      playerjson_blue_dark
    );
    this.load.atlas(
      PLAYER_BLUE_LIGHT,
      playerpng_blue_light,
      playerjson_blue_light
    );
    this.load.atlas(
      PLAYER_GRAY_DARK,
      playerpng_gray_dark,
      playerjson_gray_dark
    );
    this.load.atlas(
      PLAYER_GRAY_LIGHT,
      playerpng_gray_light,
      playerjson_gray_light
    );
    this.load.atlas(
      PLAYER_GREEN_DARK,
      playerpng_green_dark,
      playerjson_green_dark
    );
    this.load.atlas(
      PLAYER_GREEN_LIGHT,
      playerpng_green_light,
      playerjson_green_light
    );
    this.load.atlas(PLAYER_ORANGE, playerpng_orange, playerjson_orange);
    this.load.atlas(PLAYER_PURPLE, playerpng_purple, playerjson_purple);
    this.load.atlas(PLAYER_PINK, playerpng_pink, playerjson_pink);
    this.load.atlas(PLAYER_YELLOW, playerpng_yellow, playerjson_yellow);

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

    player = this.physics.add.sprite(-45, 26, PLAYER_BLUE, "idle.png");
    color = "blue";
    defaultPlayer.player= player;
    this.playerChangedSkin= defaultPlayer;

    // pants_skin = this.physics.add.sprite(
    //   player.x,
    //   player.y,
    //   "archaeologist_walk",
    //   "Archaeologist_Spawn0051.png"
    // );
    // tạo theo số lượng other player vào

    // for (let i = 0; i < otherPlayerId.length; i++) {
    //   otherPlayer[i] = this.physics.add.sprite(
    //     -45 + 20 * i,
    //     26 + 20 * i,
    //     "playerbase",
    //     "idle.png"
    //   );
    // }
    // stt = otherPlayer.length;

    this.anims.create({
      key: "player-idle",
      frames: [{ key: "playerbase", frame: "idle.png" }],
    });

    //Red
    this.anims.create({
      key: "player-idle_red",
      frames: [{ key: PLAYER_RED, frame: "idle.png" }],
    });

    //Blue
    this.anims.create({
      key: "player-idle_blue",
      frames: [{ key: PLAYER_BLUE, frame: "idle.png" }],
    });

    //Blue dark
    this.anims.create({
      key: "player-idle_blue_dark",
      frames: [{ key: PLAYER_BLUE_DARK, frame: "idle.png" }],
    });

    //Blue light
    this.anims.create({
      key: "player-idle_blue_light",
      frames: [{ key: PLAYER_BLUE_LIGHT, frame: "idle.png" }],
    });

    //Gray dark
    this.anims.create({
      key: "player-idle_gray_dark",
      frames: [{ key: PLAYER_GRAY_DARK, frame: "idle.png" }],
    });

    //Gray light
    this.anims.create({
      key: "player-idle_gray_light",
      frames: [{ key: PLAYER_GRAY_LIGHT, frame: "idle.png" }],
    });

    //Green dark
    this.anims.create({
      key: "player-idle_green_dark",
      frames: [{ key: PLAYER_GREEN_DARK, frame: "idle.png" }],
    });

    //Green light
    this.anims.create({
      key: "player-idle_green_light",
      frames: [{ key: PLAYER_GREEN_LIGHT, frame: "idle.png" }],
    });

    //Orange
    this.anims.create({
      key: "player-idle_orange",
      frames: [{ key: PLAYER_ORANGE, frame: "idle.png" }],
    });

    //Pink
    this.anims.create({
      key: "player-idle_pink",
      frames: [{ key: PLAYER_PINK, frame: "idle.png" }],
    });

    //Purple
    this.anims.create({
      key: "player-idle_purple",
      frames: [{ key: PLAYER_PURPLE, frame: "idle.png" }],
    });

    //Yellow
    this.anims.create({
      key: "player-idle_yellow",
      frames: [{ key: PLAYER_YELLOW, frame: "idle.png" }],
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
      }
    });
    //Red
    this.anims.create({
      key: "player-walk_red",
      frames: this.anims.generateFrameNames(PLAYER_RED, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Blue
    this.anims.create({
      key: "player-walk_blue",
      frames: this.anims.generateFrameNames(PLAYER_BLUE, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Blue dark
    this.anims.create({
      key: "player-walk_blue_dark",
      frames: this.anims.generateFrameNames(PLAYER_BLUE_DARK, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Blue light
    this.anims.create({
      key: "player-walk_blue_light",
      frames: this.anims.generateFrameNames(PLAYER_BLUE_LIGHT, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Gray dark
    this.anims.create({
      key: "player-walk_gray_dark",
      frames: this.anims.generateFrameNames(PLAYER_GRAY_DARK, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Gray light
    this.anims.create({
      key: "player-walk_gray_light",
      frames: this.anims.generateFrameNames(PLAYER_GRAY_LIGHT, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Green dark
    this.anims.create({
      key: "player-walk_green_dark",
      frames: this.anims.generateFrameNames(PLAYER_GREEN_DARK, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Green light
    this.anims.create({
      key: "player-walk_green_light",
      frames: this.anims.generateFrameNames(PLAYER_GREEN_LIGHT, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Orange
    this.anims.create({
      key: "player-walk_orange",
      frames: this.anims.generateFrameNames(PLAYER_ORANGE, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Pink
    this.anims.create({
      key: "player-walk_pink",
      frames: this.anims.generateFrameNames(PLAYER_PINK, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Purple
    this.anims.create({
      key: "player-walk_purple",
      frames: this.anims.generateFrameNames(PLAYER_PURPLE, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

    //Yellow
    this.anims.create({
      key: "player-walk_yellow",
      frames: this.anims.generateFrameNames(PLAYER_YELLOW, {
        start: 1,
        end: 12,
        prefix: "Walk",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 16,
    });

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
      this.state.host = Object.keys((states).players)[0]


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

    //update skin current in room
    this.socket.on('changeSkin', ({ color, id }) => {
      let index = otherPlayerId.findIndex((Element) => Element == id)
      otherPlayer[index].destroy();
      otherPlayer[index] = this.physics.add.sprite(-45, 26, 'player_base_' + color, "idle.png");
    })


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
        playerChangedSkin: this.playerChangedSkin
      });
      this.game.scene.stop("waitingRoom");
    });

    eventsCenter.on("update", (data) => {
      this.playerChangedSkin = data.playerChangedSkin;
      this.numberImposter = data.numberImposter;
      this.numberPlayer = data.numberPlayer;
      let colorPlayerChanged = this.playerChangedSkin.player.texture.key ?? 'nothing';
      switch (colorPlayerChanged) {
        case "player0":
          player.destroy();
          player = this.physics.add.sprite(-45, 26, PLAYER_BLUE, "idle.png");
          color = "blue";
          break;
        case "player1":
          player.destroy();
          player = this.physics.add.sprite(-45, 26, PLAYER_YELLOW, "idle.png");
          color = "yellow";
          break;
        case "player2":
          player.destroy();
          player = this.physics.add.sprite(-45, 26, PLAYER_PINK, "idle.png");
          color = "pink";
          break;
        case "player3":
          player.destroy();
          player = this.physics.add.sprite(-45, 26, PLAYER_ORANGE, "idle.png");
          color = "orange";
          break;
        case "player4":
          player.destroy();
          player = this.physics.add.sprite(
            -45,
            26,
            PLAYER_GRAY_DARK,
            "idle.png"
          );
          color = "gray_dark";
          break;
        case "player5":
          player.destroy();
          player = this.physics.add.sprite(
            -45,
            26,
            PLAYER_GRAY_LIGHT,
            "idle.png"
          );
          color = "gray_light";
          break;
        case "player6":
          player.destroy();
          player = this.physics.add.sprite(-45, 26, PLAYER_PURPLE, "idle.png");
          color = "purple";
          break;
        case "player7":
          player.destroy();
          player = this.physics.add.sprite(
            -45,
            26,
            PLAYER_BLUE_LIGHT,
            "idle.png"
          );
          color = "blue_light";
          break;
        case "player8":
          player.destroy();
          player = this.physics.add.sprite(
            -45,
            26,
            PLAYER_BLUE_DARK,
            "idle.png"
          );
          color = "blue_dark";
          break;
        case "player9":
          player.destroy();
          player = this.physics.add.sprite(-45, 26, PLAYER_RED, "idle.png");
          color = "red";
          break;
        case "player10":
          player.destroy();
          player = this.physics.add.sprite(
            -45,
            26,
            PLAYER_GREEN_LIGHT,
            "idle.png"
          );
          color = "green_light";
          break;
        case "player11":
          player.destroy();
          player = this.physics.add.sprite(
            -45,
            26,
            PLAYER_GREEN_DARK,
            "idle.png"
          );
          color = "green_dark";
          break;
        default:
          player.destroy();
          player = this.physics.add.sprite(-45, 26, PLAYER_BLUE, "idle.png");
          color = "blue";
          break;
      }
      //send color player change
      console.log(color + " " + this.socket.id);
      this.socket.emit('changeSkin', ({ color: color, id: this.socket.id, room: this.state.roomKey }))
      this.physics.add.collider(player, lobby_tileset);
      this.cameras.main.startFollow(player, true);
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
    var suffix = color;
    if (
      !cursors.left.isDown &&
      !cursors.right.isDown &&
      !cursors.up.isDown &&
      !cursors.down.isDown
    ) {
      player.anims.play("player-idle_" + suffix);
    }

    // when move
    if (cursors.left.isDown) {
      player.anims.play("player-walk_" + suffix, true);
      player.setVelocityX(-PLAYER_SPEED);
      player.scaleX = -1;
      player.body.offset.x = 40;
      playerMoved = true;
    } else if (cursors.right.isDown) {
      player.anims.play("player-walk_" + suffix, true);
      player.setVelocityX(PLAYER_SPEED);
      player.scaleX = 1;
      player.body.offset.x = 0;
      playerMoved = true;
    }

    if (cursors.up.isDown) {
      player.anims.play("player-walk_" + suffix, true);
      player.setVelocityY(-PLAYER_SPEED);
      playerMoved = true;
    } else if (cursors.down.isDown) {
      player.anims.play("player-walk_" + suffix, true);
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
