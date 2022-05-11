import Phaser, { Scene } from "phaser";
import tileImg from "../assets/img/theSkeld.png";
import theskeld from "../assets/tilemaps/theskeld.json";
import playerpng from "../assets/player/player_sprite/player_base.png";
import playerjson from "../assets/player/player_sprite/player_base.json";
import { debugDraw } from "../scene/debugDraw";
import footStep from "../assets/audio/amination/Walk.mp3";
import MapMissionsExporter from "../helper/map_mission_exporter";
import Mission from "../services/missions/mission";
import UseButton from "../assets/tasks/Align Engine Output/Use.webp.png";
import AlignEngineOutput_mission_marked from "../assets/tasks/Align Engine Output/mission_marked.png";
import KillButton from "../assets/img/killButton.png";

import { io } from "socket.io-client";
import {
  PLAYER_SPEED,
} from "../consts/constants";


let player;
let otherPlayer = new Array();
let otherPlayerId = new Array();
let cursors;
let pressedKeys = [];
let stt = 0;
let socket;
let tables = [];
let tableObject, ventObject;
var objectsLayer;
let map_missions;
let export_missions;
let current_x, current_y, mission_name;
let useButton;
let current_scene;
let launch_scene = false;
let isRole = 0;
let playerKilled;
let indexKill = 0;
let canKill = false;
class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    this.state = {};
  }

  init(data) {
    this.socket = data.socket;
    this.textInput = data.textInput;
    this.numPlayers = data.numPlayers;
    this.idPlayers = data.idPlayers;

    current_x = data.x;
    current_y = data.y;
    mission_name = data.mission;
  }

  preload() {
    this.load.image("tiles", tileImg);
    this.load.tilemapTiledJSON("tilemap", theskeld);
    this.load.image("UseButton", UseButton);
    this.load.image("KillButton", KillButton);
    this.load.atlas("playerbase", playerpng, playerjson);

    this.load.audio("walk", footStep);

    this.load.image(
      "AlignEngineOutput_mission_marked",
      AlignEngineOutput_mission_marked
    );
    this.socket.emit('whatRole', this.textInput)
    this.socket.on('roleIs', (role) => {
      //console.log(role);
      // is imposterr
      isRole = role
    })
  }

  create() {
    current_scene = this.scene;
    const ship = this.make.tilemap({ key: "tilemap" });
    const tileset = ship.addTilesetImage("theSkeld", "tiles", 17, 17);

    const ship_tileset = ship.createLayer("Background", tileset);

    //add use button
    useButton = this.add
      .image(900, 700, "UseButton")
      .setScrollFactor(0, 0)
      .setInteractive();
    //disable button
    useButton.alpha = 0.5;

    //add kill button if imposter




    //initialize missions of this map
    map_missions = new MapMissionsExporter("theSkeld");
    export_missions = map_missions.create();

    ship_tileset.setCollisionByProperty({ collides: true });

    // debugDraw(ship_tileset, this);

    //add player
    player = this.physics.add.sprite(115, -700, "playerbase", "idle.png");

    if (current_x && current_y) {
      map_missions.completed(mission_name);
      player.x = current_x + 2;
      player.y = current_y + 2;
      // player.setPosition(current_x, current_y);
    }
    // tạo theo số lượng other player vào

    this.state.roomKey = this.textInput;

    // console.log(this.numPlayers);
    for (let i = 0; i < this.numPlayers - 1; i++) {
      otherPlayer[i] = this.physics.add.sprite(
        115,
        -740 + 30 * i,
        "playerbase",
        "idle.png"
      );
    }
    this.idPlayers.forEach((element) => {
      if (element != this.socket.id) {
        otherPlayerId.push(element);
      }
    });
    // console.log(otherPlayerId);

    // stt = otherPlayer.length;
    //****************** */

    //cursor to direct
    cursors = this.input.keyboard.createCursorKeys();

    //input button

    // tạo object và gán các thuộc tính
    this.anims.create({
      key: "player-idle",
      frames: [{ key: "playerbase", frame: "idle.png" }],
    });
    this.anims.create({
      key: "dead",
      frames: [{ key: "dead", frame: "dead.png" }],

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
      frameRate: 24,
    });

    //player death
    this.anims.create({
      key: "player-dead",
      frames: this.anims.generateFrameNames("playerbase", {
        start: 1,
        end: 12,
        prefix: "Dead",
        suffix: ".png",
      }),
      repeat: 1,
      frameRate: 24,

    });
    //input to control
    this.input.keyboard.on("keydown", (e) => {
      if (!pressedKeys.includes(e.code)) {
        this.sound.play("walk", { loop: true });
        pressedKeys.push(e.code);
      }
    });
    this.input.keyboard.on("keyup", (e) => {
      this.sound.stopByKey("walk");
      pressedKeys = pressedKeys.filter((key) => key !== e.code);
    });

    this.physics.add.collider(player, ship_tileset);

    this.cameras.main.startFollow(player, true);

    //tải lại mới khi có player mới vào có các player đã ở trong đó
    console.log(this.textInput);

    objectsLayer = ship.getObjectLayer("GameObjects");
    objectsLayer.objects.forEach((object) => {
      const { name, x, y, width, height, properties, type } = object;

      switch (type) {
        case "table":
          tableObject = new Phaser.GameObjects.Ellipse(
            this,
            object.x,
            object.y,
            object.width,
            object.height
          );
          // tableObject.setFillStyle(0xffffff, 0.5);
          // console.log(tableObject);

          this.physics.add.existing(tableObject);

          tableObject.body.immovable = true;
          tableObject.setOrigin(0, 0);
          //r.body.moves=false
          // tableObject.body.setCircle(120);
          this.physics.add.overlap(player, tableObject, null, null, this);
          this.physics.add.collider(player, tableObject);
          break;
        case "vent":
          ventObject = new Phaser.GameObjects.Rectangle(
            this,
            object.x,
            object.y,
            object.width,
            object.height,
            0xff0000,
            1
          );

          this.physics.add.existing(ventObject);
          ventObject.body.immovable = true;
          ventObject.setOrigin(0, 0);
          var cir = this.add.circle(object.x + object.width * 0.5, object.y + object.height * 0.5, object.width * 0.75, 0xff0000, 0.4);
          this.physics.add.existing(cir);
          cir.body.immovable = true;
          this.physics.add.overlap(player, cir, circleOverlap, null, this);
        // cir.setOrigin(0, 0);
        default:
          break;
      }
    });

    this.socket.on("move", ({ x, y, playerId }) => {
      //console.log({ x, y, playerId });

      let index = otherPlayerId.findIndex((Element) => Element == playerId);
      //id = index;
      // console.log(index);

      if (otherPlayer[index].x > x) {
        otherPlayer[index].flipX = true;
      } else if (otherPlayer[index].x < x) {
        otherPlayer[index].flipX = false;
      }
      otherPlayer[index].x = x;
      otherPlayer[index].y = y;
      otherPlayer[index].moving = true;

      if (otherPlayer[index].moving && !otherPlayer[index].anims.isPlaying) {
        otherPlayer[index].play("player-walk");
      } else if (
        !otherPlayer[index].moving &&
        otherPlayer[index].anims.isPlaying
      ) {
        otherPlayer[index].stop("player-walk");
      }
    });

    // console.log(objectsLayer);

    this.socket.on("moveEnd", ({ playerId }) => {
      let index = otherPlayerId.findIndex((Element) => Element == playerId);
      otherPlayer[index].moving = false;
      otherPlayer[index].anims.play("player-idle");
      if (otherPlayer[index].moving && !otherPlayer[index].anims.isPlaying) {
        otherPlayer[index].play("player-walk");
      } else if (
        !otherPlayer[index].moving &&
        otherPlayer[index].anims.isPlaying
      ) {
        otherPlayer[index].stop("player-walk");
      }
    });


  }

  update() {
    if (isRole == 1) {
      var kill = this.add
        .image(750, 700, "KillButton")
        .setScrollFactor(0, 0)
        .setInteractive()
      kill.alpha = 0.5


      kill.on("pointerdown", function (e) {
        console.log(canKill);
        if (canKill) {
          playerKilled.anims.play("player-dead", { repeat: false });
          //dánh
          // playerKilled.on('animationcomplete', () => {
          //   playerKilled.anims.play("dead", true);

          // })
          // this.socket.emit('killed', (otherPlayerId[indexKill]))

          console.log(otherPlayerId[indexKill]) // emit socket id player killed
          console.log('emitted');
          canKill = false;
        }
        else {
          console.log('no kill');
        }
      });

      let index = 0
      for (let other of otherPlayer) {
        if (
          Math.abs(Math.floor(player.x) - Math.floor(other.x)) <= 100 &&
          Math.abs(Math.floor(player.y) - Math.floor(other.y)) <= 100
        ) {
          playerKilled = other; //lấy player đứng gần
          indexKill = index;

          canKill = true;
          console.log('kill ' + index + "  " + canKill);
          //console.log(canKill);
        }
        if (playerKilled) {
          kill.alpha = 1;
          canKill = true;
        } else if (!playerKilled) {
          kill.alpha = 0.5;
          canKill = false;
        } index += 1;
        // kill.alpha = 0.5
      }
    }
    //canKill = false

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


    const mission = new Mission(
      "theSkeld",
      map_missions,
      export_missions,
      this.scene,
      player.x,
      player.y
    );
    const check_mission = mission.check_mission();
    if (check_mission) {
      //blink blink marker
      useButton.alpha = 1;
    }

    useButton.on("pointerup", function (e) {
      if (check_mission) {
        launch_scene = true;
      }
    });

    if (launch_scene && launch_scene) {
      this.scene.pause("game");
      this.scene.launch(check_mission.scene, {
        x: check_mission.x,
        y: check_mission.y,
      });
      launch_scene = false;
    }

    //



  }
}

function circleOverlap() {
  console.log("circle overlapped")
}

export default Game;
