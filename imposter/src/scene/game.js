import Phaser, { Scene } from "phaser";
import tileImg from "../assets/img/theSkeld.png";
import theskeld from "../assets/tilemaps/theskeld.json";
import playerpng from "../assets/player/player_sprite/player_base.png";
import playerjson from "../assets/player/player_sprite/player_base.json";
import { debugDraw } from "../scene/debugDraw";
import footStep from '../assets/audio/amination/Walk.mp3'
import MapMissionsExporter from "../helper/map_mission_exporter";
import Mission from "../services/missions/mission";
import UseButton from "../assets/tasks/Align Engine Output/Use.webp.png";
import AlignEngineOutput_mission_marked from "../assets/tasks/Align Engine Output/mission_marked.png";
import KillButton from "../assets/img/killButton.png";


import { io } from "socket.io-client";
import {
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_START_X,
  PLAYER_START_Y,
  PLAYER_SPEED,
} from "../consts/constants";
import MissionKill from "../services/missions/mission_kill";

let player;
let otherPlayer = new Array();
let otherPlayerId = new Array();
let cursors;
let pressedKeys = [];
let stt = 0;
let socket, r;
var objectsLayer;
let map_missions;
let export_missions;
let current_x, current_y, mission_name;
let useButton;
let current_scene;
let launch_scene = false;
let killButton;
let canKill = false;
let listOtherPlayer = [];
class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    //this.state = {};
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

    this.load.audio('walk', footStep)

    this.load.image(
      "AlignEngineOutput_mission_marked",
      AlignEngineOutput_mission_marked
    );
  }

  create() {
    current_scene = this.scene;
    const ship = this.make.tilemap({ key: "tilemap" });
    const tileset = ship.addTilesetImage("theSkeld", "tiles");

    const ship_tileset = ship.createLayer("Background", tileset);

    //add use button
    useButton = this.add
      .image(900, 700, "UseButton")
      .setScrollFactor(0, 0)
      .setInteractive();
    //disable button
    useButton.alpha = 0.5;

    //add kill button
    killButton = this.add
      .image(750, 700, "KillButton")
      .setScrollFactor(0, 0)
      .setInteractive();
    killButton.alpha = 0.5;

    //initialize missions of this map
    map_missions = new MapMissionsExporter("theSkeld");
    export_missions = map_missions.create();

    ship_tileset.setCollisionByProperty({ collides: true });


    debugDraw(ship_tileset, this);

    //add player
    player = this.physics.add.sprite(115, -700, "playerbase", "idle.png");

    if (current_x && current_y) {
      map_missions.completed(mission_name);
      player.x = current_x + 2;
      player.y = current_y + 2;
      // player.setPosition(current_x, current_y);
    }
    // tạo theo số lượng other player vào

    this.state.roomKey = this.textInput

    console.log(this.numPlayers);
    for (let i = 0; i < this.numPlayers - 1; i++) {
      otherPlayer[i] = this.physics.add.sprite(
        115,
        -740 + 30 * i,
        "playerbase",
        "idle.png"
      );
    }
    this.idPlayers.forEach(element => {
      if (element != this.socket.id) { otherPlayerId.push(element) }
    });
    console.log(otherPlayerId);
    // console.log(this.idPlayers);


    stt = otherPlayer.length;
    //****************** */

    //cursor to direct
    cursors = this.input.keyboard.createCursorKeys();

    //input button


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
      repeat: 0,
      frameRate: 24,
    });
    //input to control
    this.input.keyboard.on("keydown", (e) => {
      if (!pressedKeys.includes(e.code)) {
        this.sound.play('walk', { loop: true })
        pressedKeys.push(e.code);
      }
    });
    this.input.keyboard.on("keyup", (e) => {
      this.sound.stopByKey('walk')
      pressedKeys = pressedKeys.filter((key) => key !== e.code);
    });

    this.physics.add.collider(player, ship_tileset);

    this.cameras.main.startFollow(player, true);

    //tải lại mới khi có player mới vào có các player đã ở trong đó
    console.log(this.textInput);



    this.socket.on("move", ({ x, y, playerId }) => {
      //console.log({ x, y, playerId });

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
        otherPlayer[index].play("player-walk");

      } else if (
        !otherPlayer[index].moving &&
        otherPlayer[index].anims.isPlaying
      ) {
        otherPlayer[index].stop("player-walk");
      }
    });




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

    // update running other player
    // if (otherPlayer.moving && !otherPlayer.anims.isPlaying) {
    //   otherPlayer.play("player-walk");
    // } else if (!otherPlayer.moving && otherPlayer.anims.isPlaying) {
    //   otherPlayer.stop("player-walk");
    // }

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

    const killPlayer = new MissionKill(
      "theSkeld",
      map_missions,
      export_missions,
      this.scene,
      player.x,
      player.y,
      listOtherPlayer
    );
    const checkMissionKill = killPlayer.check_mission();
    if (checkMissionKill) {
      killButton.alpha = 1;
      canKill = true;
    } else if (!checkMissionKill) {
      killButton.alpha = 0.5;
      canKill = false;
    }
    killButton.on("pointerup", function (e) {
      if (canKill) {
        otherPlayer.anims.play("player-dead");
        listOtherPlayer = listOtherPlayer.filter((otherPlayer) => {
          return otherPlayer !== checkMissionKill;
        });
      }
    });
  }
}

export default Game;
