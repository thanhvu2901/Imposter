import Phaser from "phaser";
import dropShip from "../assets/img/Dropship.png";
import lobby from "../assets/tilemaps/lobby.json";

import {
  PLAYER_SPEED,
  PLAYER_BASE,
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
  BSLUG,
  BEDCRAB,
  CREWMIN,
  DOG,
  ELLIE,
  HAMPSTER,
  ROBIT,
  SQUIG,
  STICKMIN,
  TWITCH,
  UFO,
  POLICE,
  ARCHAEOLOGIST,
  SECGUARD,
  WALL,
  CCC,
  HAZMAT,
  WINTERJACKET,
  TARMAC,
  MILITARY,
  SUITBLACK,
  ASTRONAUT,
  CAPTAIN,
  SCIENTIST,
  MECHANIC,
  SUITWHITE,
} from "../consts/constants";

import eventsCenter from "./eventsCenter";

let cursors;
let otherPlayer = new Array();
let otherPlayerId = new Array();
let pressedKeys = [];
let defaultPlayer = {};
let stt = 0;

let player, pants_skin, hat_skin = null;
var color = "";
let pet = null;
var pet_type, pants_type = null;
var player_container;
var isLeft = false;
var isMirror = false;
let colorArr = [
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
  PLAYER_PINK]
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
    this.test = data.test;
  }
  preload() {
    this.load.image("dropShip", dropShip);
    this.load.tilemapTiledJSON("lobby", lobby);

    // this.load.atlas("playerbase", playerpng, playerjson);
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

    //cursor to direct
    cursors = this.input.keyboard.createCursorKeys();

    //Create base player and player container
    player_container = this.add.container(-45, 26);

    color = PLAYER_BLUE;
    player = this.physics.add.sprite(0, 0, color, "idle.png");

    player_container.setSize(player.width, player.height);

    player_container.add(player);

    defaultPlayer.player = player;
    this.playerChangedSkin = defaultPlayer;

    this.physics.add.existing(player_container);

    this.physics.add.collider(player_container, lobby_tileset);

    this.cameras.main.startFollow(player_container, true);

    /* *********************CREATING ANIMATIONS FOR PLAYER********************* */



    colorArr.forEach(element => {

      this.anims.create({
        key: `${element}-walk`,
        frames: this.anims.generateFrameNames(element, {
          start: 1,
          end: 12,
          prefix: "Walk",
          suffix: ".png",
        }),
        repeat: -1,
        frameRate: 24,
      });
      this.anims.create({
        key: `${element}-idle`,
        frames: [{ key: element, frame: "idle.png" }],
      });

      this.anims.create({
        key: `${element}-dead`,
        frames: this.anims.generateFrameNames(element, {
          start: 1,
          end: 42,
          prefix: "Dead",
          suffix: ".png",
        }),
        repeat: -1,
        frameRate: 24,
      });


    });



    /* *********************CREATING ANIMATIONS FOR PETS********************* */

    this.anims.create({
      key: `${BSLUG}-walk`,
      frames: this.anims.generateFrameNames(BSLUG, {
        start: 1,
        end: 18,
        prefix: `${BSLUG}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${BSLUG}-idle`,
      frames: this.anims.generateFrameNames(BSLUG, {
        start: 1,
        end: 48,
        prefix: `${BSLUG}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${BEDCRAB}-walk`,
      frames: this.anims.generateFrameNames(BEDCRAB, {
        start: 1,
        end: 12,
        prefix: `${BEDCRAB}_Walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${BEDCRAB}-idle`,
      frames: this.anims.generateFrameNames(BEDCRAB, {
        start: 1,
        end: 27,
        prefix: `${BEDCRAB}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${CREWMIN}-walk`,
      frames: this.anims.generateFrameNames(CREWMIN, {
        start: 1,
        end: 16,
        prefix: `${CREWMIN}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${CREWMIN}-idle`,
      frames: [{ key: CREWMIN, frame: `${CREWMIN}_idle1.png` }]
    });

    this.anims.create({
      key: `${DOG}-walk`,
      frames: this.anims.generateFrameNames(DOG, {
        start: 1,
        end: 8,
        prefix: `${DOG}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${DOG}-idle`,
      frames: this.anims.generateFrameNames(DOG, {
        start: 1,
        end: 8,
        prefix: `${DOG}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${ELLIE}-walk`,
      frames: this.anims.generateFrameNames(ELLIE, {
        start: 1,
        end: 9,
        prefix: `${ELLIE}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${ELLIE}-idle`,
      frames: this.anims.generateFrameNames(ELLIE, {
        start: 1,
        end: 34,
        prefix: `${ELLIE}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${HAMPSTER}-walk`,
      frames: this.anims.generateFrameNames(HAMPSTER, {
        start: 1,
        end: 6,
        prefix: `${HAMPSTER}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${HAMPSTER}-idle`,
      frames: this.anims.generateFrameNames(HAMPSTER, {
        start: 1,
        end: 31,
        prefix: `${HAMPSTER}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${ROBIT}-walk`,
      frames: this.anims.generateFrameNames(ROBIT, {
        start: 1,
        end: 16,
        prefix: `${ROBIT}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${ROBIT}-idle`,
      frames: this.anims.generateFrameNames(ROBIT, {
        start: 1,
        end: 122,
        prefix: `${ROBIT}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${SQUIG}-walk`,
      frames: this.anims.generateFrameNames(SQUIG, {
        start: 1,
        end: 16,
        prefix: `${SQUIG}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${SQUIG}-idle`,
      frames: this.anims.generateFrameNames(SQUIG, {
        start: 1,
        end: 40,
        prefix: `${SQUIG}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${STICKMIN}-walk`,
      frames: this.anims.generateFrameNames(STICKMIN, {
        start: 1,
        end: 9,
        prefix: `${STICKMIN}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${STICKMIN}-idle`,
      frames: this.anims.generateFrameNames(STICKMIN, {
        start: 1,
        end: 34,
        prefix: `${STICKMIN}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${TWITCH}-walk`,
      frames: this.anims.generateFrameNames(TWITCH, {
        start: 1,
        end: 12,
        prefix: `${TWITCH}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${TWITCH}-idle`,
      frames: this.anims.generateFrameNames(TWITCH, {
        start: 1,
        end: 96,
        prefix: `${TWITCH}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${UFO}-walk`,
      frames: this.anims.generateFrameNames(UFO, {
        start: 1,
        end: 18,
        prefix: `${UFO}_walk`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    this.anims.create({
      key: `${UFO}-idle`,
      frames: this.anims.generateFrameNames(UFO, {
        start: 1,
        end: 45,
        prefix: `${UFO}_idle`,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 24,
    });

    //Sound Effects
    this.input.keyboard.on("keyup", (e) => {
      this.sound.stopByKey("walk");

      pressedKeys = pressedKeys.filter((key) => key !== e.code);
    });


    //tải lại mới khi có player mới vào có các player đã ở trong đó
    this.socket.emit("joinRoom", this.textInput);

    this.socket.on("setState", (states) => {
      // this.physics.resume();
      // STATE

      //set player color AGAIN

      let colorPlayer = states.players[this.socket.id].color;
      console.log("color" + colorPlayer);
      player.destroy()
      // // let playercolor = (Object(states).players)[this.socket].color
      color = colorPlayer;
      player = this.physics.add.sprite(0, 0, color, "idle.png");
      player_container.add(player);



      // this.physics.add.collider(player, lobby_tileset);

      // this.cameras.main.startFollow(player, true);

      this.state.roomKey = states.roomKey;
      this.state.host = Object.keys(states.players)[0];

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
    //update skin current in room
    this.socket.on('changeSkin', ({ color, id }) => {
      let index = otherPlayerId.findIndex((Element) => Element == id)
      otherPlayer[index].destroy();
      otherPlayer[index] = this.physics.add.sprite(-45, 26, color, "idle.png");
    })
    this.socket.on("currentPlayers", ({ players, numPlayers, roomInfo }) => {

      for (let i = 0; i < numPlayers; i++) {
        if (this.socket.id !== Object.keys(players)[i]) {

          otherPlayerId.push(Object.keys(players)[i]);

          otherPlayer[stt] = this.physics.add.sprite(
            Object.values(players)[i].x,
            Object.values(players)[i].y,
            Object.values(roomInfo.players)[i].color,
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
        playerInfo.color,
        "idle.png"
      );
      console.log("stt" + stt);
      stt += 1;
      console.log("new players " + otherPlayer[stt]);
      console.log("stt" + stt);
    });


    customize.on("pointerdown", () => {
      // this.input.on('pointerdown', () => this.scene.start('ChangeSkin'))
      // this.scene.pause("waitingRoom");
      this.scene.launch("ChangeSkin", {
        socket: this.socket,
        textInput: this.textInput,
      });
      this.scene.bringToTop("ChangeSkin");
    });

    this.socket.on("gogame", ({ numPlayers, idPlayers, Info }) => {
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
        playerChangedSkin: this.playerChangedSkin,
        Info: Info
      });
      this.game.scene.stop("waitingRoom");
    });

    eventsCenter.on("update", (data) => {
      this.playerChangedSkin = data.playerChangedSkin;
      this.numberImposter = data.numberImposter;
      this.numberPlayer = data.numberPlayer;
      let colorPlayerChanged =
        this.playerChangedSkin.player.texture.key ?? "nothing";
      switch (colorPlayerChanged) {
        case "player0":
          player.destroy();
          color = PLAYER_BLUE;
          player = this.physics.add.sprite(0, 0, color, "idle.png");
          break;
        case "player1":
          player.destroy();
          color = PLAYER_YELLOW;
          player = this.physics.add.sprite(0, 0, color, "idle.png");
          break;
        case "player2":
          player.destroy();
          color = PLAYER_PINK;
          player = this.physics.add.sprite(0, 0, color, "idle.png");
          break;
        case "player3":
          player.destroy();
          color = PLAYER_ORANGE;
          player = this.physics.add.sprite(0, 0, color, "idle.png");
          break;
        case "player4":
          player.destroy();
          color = PLAYER_GRAY_DARK;
          player = this.physics.add.sprite(0, 0, color, "idle.png");
          break;
        case "player5":
          player.destroy();
          color = PLAYER_GRAY_LIGHT;
          player = this.physics.add.sprite(0, 0, color, "idle.png");
          break;
        case "player6":
          player.destroy();
          color = PLAYER_PURPLE;
          player = this.physics.add.sprite(0, 0, color, "idle.png");
          break;
        case "player7":
          player.destroy();
          color = PLAYER_BLUE_LIGHT;
          player = this.physics.add.sprite(0, 0, color, "idle.png");
          break;
        case "player8":
          player.destroy();
          color = PLAYER_BLUE_DARK;
          player = this.physics.add.sprite(0, 0, color, "idle.png");
          break;
        case "player9":
          player.destroy();
          color = PLAYER_RED;
          player = this.physics.add.sprite(0, 0, color, "idle.png");
          break;
        case "player10":
          player.destroy();
          color = PLAYER_GREEN_LIGHT;
          player = this.physics.add.sprite(0, 0, color, "idle.png");
          break;
        case "player11":
          player.destroy();
          color = PLAYER_GREEN_DARK;
          player = this.physics.add.sprite(0, 0, color, "idle.png");
          break;
        default:
          player.destroy();
          color = PLAYER_BLUE;
          player = this.physics.add.sprite(0, 0, color, "idle.png");
          break;
      }
      player_container.add(player);

      /* RECREATE ANIMATION OF PLAYER DUE TO COLOR CHANGED */




      //send color player change
      console.log(color + " " + this.socket.id);
      this.socket.emit("changeSkin", {
        color: color,
        id: this.socket.id,
        room: this.state.roomKey,
      });
    });

    this.socket.on("moveW", ({ x, y, playerId, color }) => {
      // console.log({ x, y, playerId });

      let index = otherPlayerId.findIndex((Element) => Element == playerId);
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
        otherPlayer[index].play(`${color}-walk`);
      } else if (
        !otherPlayer[index].moving &&
        otherPlayer[index].anims.isPlaying
      ) {
        otherPlayer[index].stop(`${color}-walk`);
      }
    });

    this.socket.on("moveEndW", ({ playerId, color }) => {
      let index = otherPlayerId.findIndex((Element) => Element == playerId);
      otherPlayer[index].moving = false;
      otherPlayer[index].anims.play(`${color}-idle`);
      if (otherPlayer[index].moving && !otherPlayer[index].anims.isPlaying) {
        otherPlayer[index].play(`${color}-walk`);
      } else if (
        !otherPlayer[index].moving &&
        otherPlayer[index].anims.isPlaying
      ) {
        otherPlayer[index].stop(`${color}-walk`);
      }
    });
  }

  update() {
    if (pants_type) {
      isLeft == true && isMirror == true
        ? pants_skin.setPosition(player.x, player.y + 10)
        : null;
    }
    if (pet) {
      pet.setPosition(player.x + 50, player.y + 10);
    }
    let playerMoved = false;
    player_container.body.setVelocity(0);
    if (
      !cursors.left.isDown &&
      !cursors.right.isDown &&
      !cursors.up.isDown &&
      !cursors.down.isDown
    ) {
      if (pet) {
        pet.anims.play(`${pet_type}-idle`);
      }
      player.anims.play(`${color}-idle`);
      if (pants_type) {
        if (isMirror) {
          isLeft == true
            ? pants_skin.anims.play(`${pants_type}_idleMirror`)
            : pants_skin.anims.play(`${pants_type}_idle`);
        } else {
          pants_skin.anims.play(`${pants_type}_idle`);
        }
      }
    }

    // when move
    if (cursors.left.isDown) {
      if (pet) {
        pet.anims.play(`${pet_type}-walk`, true);
        pet.scaleX = -1;
      }
      isLeft = true;
      player.anims.play(`${color}-walk`, true);
      if (pants_type) {
        if (isMirror) {
          pants_skin.anims.play(`${pants_type}_walkMirror`, true);
        } else {
          pants_skin.anims.play(`${pants_type}_walk`, true);
          pants_skin.scaleX = -1;
        }
      }
      player_container.body.setVelocityX(-PLAYER_SPEED);
      player.scaleX = -1;
      player_container.body.offset.x = 0;
      hat_skin != null ? hat_skin.scaleX = -1 : null;
      playerMoved = true;
    } else if (cursors.right.isDown) {
      if (pet) {
        pet.anims.play(`${pet_type}-walk`, true);
        pet.scaleX = 1;
      }
      isLeft = false;
      player.anims.play(`${color}-walk`, true);
      if (pants_type) {
        pants_skin.anims.play(`${pants_type}_walk`, true);
        isMirror == false ? (pants_skin.scaleX = 1) : null;
      }
      player_container.body.setVelocityX(PLAYER_SPEED);
      player.scaleX = 1;
      hat_skin != null ? hat_skin.scaleX = 1 : null;
      playerMoved = true;
    }

    if (cursors.up.isDown) {
      if (pet) {
        pet.anims.play(`${pet_type}-walk`, true);
      }
      player.anims.play(`${color}-walk`, true);
      if (pants_type) {
        isLeft == true && isMirror == true
          ? pants_skin.anims.play(`${pants_type}_walkMirror`, true)
          : pants_skin.anims.play(`${pants_type}_walk`, true);
      }
      player_container.body.setVelocityY(-PLAYER_SPEED);
      playerMoved = true;
    } else if (cursors.down.isDown) {
      if (pet) {
        pet.anims.play(`${pet_type}-walk`, true);
      }
      player.anims.play(`${color}-walk`, true);
      if (pants_type) {
        isLeft == true && isMirror == true
          ? pants_skin.anims.play(`${pants_type}_walkMirror`, true)
          : pants_skin.anims.play(`${pants_type}_walk`, true);
      }
      player_container.body.setVelocityY(PLAYER_SPEED);
      playerMoved = true;
    }

    if (playerMoved) {
      this.socket.emit("moveW", {
        x: player.x,
        y: player.y,
        roomId: this.state.roomKey,
      });
      player.movedLastFrame = true;
    } else {
      if (player.movedLastFrame) {
        this.socket.emit("moveEndW", { roomId: this.state.roomKey });
      }
      player.movedLastFrame = false;
    }
  }
}
