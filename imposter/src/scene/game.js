import Phaser from "phaser";
import tileImg from "../assets/img/theSkeld.png";
import theskeld from "../assets/tilemaps/theskeld.json";
import playerpng from "../assets/player/player_sprite/player_base.png";
import playerjson from "../assets/player/player_sprite/player_base.json";
import { debugDraw } from "../scene/debugDraw";
import MapMissionsExporter from "../helper/map_mission_exporter"
import Mission from "../services/missions/mission";
import UseButton from "../assets/tasks/Align Engine Output/Use.webp.png";
import AlignEngineOutput_mission_marked from "../assets/tasks/Align Engine Output/mission_marked.png"

import { movePlayer } from "../animation/movement.js";

import { io } from 'socket.io-client';
import {

  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_START_X,
  PLAYER_START_Y,
  PLAYER_SPEED
} from "../consts/constants";

var player;
var cursors;
let pressedKeys = [];
let otherPlayer = {};
let socket;
let map_missions;
let export_missions;
let current_x, current_y, mission_name;
let useButton;
let current_scene;
let launch_scene = false;;
class Game extends Phaser.Scene {
  init(data) {
    current_x = data.x;
    current_y = data.y;
    mission_name = data.mission;
  }
  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.image("tiles", tileImg);
    this.load.tilemapTiledJSON("tilemap", theskeld);
    this.load.image("UseButton", UseButton)
    this.load.atlas("playerbase", playerpng, playerjson);
    this.load.image("AlignEngineOutput_mission_marked", AlignEngineOutput_mission_marked);
    socket = io('localhost:3000')
  }

  create() {
    current_scene = this.scene;
    const ship = this.make.tilemap({ key: "tilemap" });
    const tileset = ship.addTilesetImage("theSkeld", "tiles");
    const ship_tileset = ship.createLayer("Background", tileset);

    //add use button
    useButton = this.add.image(900,700,"UseButton").setScrollFactor(0,0).setInteractive();
    //disable button
    useButton.alpha = 0.5;
    

    //initialize missions of this map
    map_missions = new MapMissionsExporter("theSkeld")
    export_missions = map_missions.create();
    map_missions.show_mission(this);
    ship_tileset.setCollisionByProperty({ collides: true });

    debugDraw(ship_tileset, this);
    //add player
    player = this.physics.add.sprite(250, 328, "playerbase", "idle.png");
  
    if(current_x && current_y) {
      map_missions.completed(mission_name)
      player.x = current_x + 2;
      player.y = current_y + 2;
      // player.setPosition(current_x, current_y);
    }
    // tạo theo số lượng other player vào
    otherPlayer = this.physics.add.sprite(250, 228, "playerbase", "idle.png");
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

    //listen from other 
    socket.on('move', ({ x, y }) => {
      console.log('revieved move');
      if (otherPlayer.x > x) {
        otherPlayer.flipX = true;
      } else if (otherPlayer.x < x) {
        otherPlayer.flipX = false;
      }
      otherPlayer.x = x;
      otherPlayer.y = y;
      otherPlayer.moving = true;
    });
    socket.on('moveEnd', () => {
      console.log('revieved moveend');
      otherPlayer.moving = false;
      otherPlayer.anims.play('player-idle')
    });
  }

  update() {
    let playerMoved = false;  
    player.setVelocity(0)
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
      socket.emit('move', { x: player.x, y: player.y });
      //console.log(player.x);
      player.movedLastFrame = true;
    } else {
      if (player.movedLastFrame) {
        socket.emit('moveEnd');
      }
      player.movedLastFrame = false;
    }

    // update running other player
    if (otherPlayer.moving && !otherPlayer.anims.isPlaying) {
      otherPlayer.play('player-walk');
    } else if (!otherPlayer.moving && otherPlayer.anims.isPlaying) {
      otherPlayer.stop('player-walk');
    }

    const mission = new Mission("theSkeld", map_missions, export_missions, this.scene, player.x, player.y); 
    const check_mission = mission.check_mission();
    useButton.alpha = check_mission ? 1 : 0.5;
    

    useButton.on("pointerup", function(e) {
      if(check_mission)
      {
        launch_scene = true;
      }
    })

    if(launch_scene)
    {
      this.scene.pause("game")
      this.scene.launch(check_mission.scene, {x: check_mission.x, y: check_mission.y});
      launch_scene = false;
    }
  }
}

export default Game;
