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
import vent1 from "../assets/img/jump vent/vent1.png";
import vent2 from "../assets/img/jump vent/vent2.png";
import vent3 from "../assets/img/jump vent/vent3.png";
import vent4 from "../assets/img/jump vent/vent4.png";
import vent5 from "../assets/img/jump vent/vent5.png";
import vent6 from "../assets/img/jump vent/vent6.png";
import jump1 from "../assets/img/jump vent/Vent0001.png";
import jump2 from "../assets/img/jump vent/vent0002.png";
import jump3 from "../assets/img/jump vent/Vent0003.png";
import jump4 from "../assets/img/jump vent/Vent0004.png";
import jump5 from "../assets/img/jump vent/vent0005.png";
import jump6 from "../assets/img/jump vent/Vent0006.png";
import jump7 from "../assets/img/jump vent/Vent0007.png";
import vent_button from "../assets/img/vent_button.png"
import arrow from "../assets/img/arrow.png"
import { io } from "socket.io-client";
import { PLAYER_SPEED } from "../consts/constants";

let player;
let otherPlayer = new Array();
let otherPlayerId = new Array();
let cursors;
let pressedKeys = [];
let stt = 0;
let socket;
let tables = [];
let tableObject, ventObject, hole, vent_butt;
var objectsLayer;
let map_missions;
let export_missions;
let current_x, current_y, mission_name;
let useButton;
let launch_scene = false;
let isRole = 0;
let playerKilled;
let indexKill = 0;
let canKill = false;
let alive = true;
let kill;
let vent_map = new Map()

let vent_group, arrow_group, vent_cord = new Map(), vent_des = new Map()
let temp, key, is_vent = false, is_jump = false, is_hidden = false, keyboard
let count = 0
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
    this.load.image("vent_1", vent1);
    this.load.image("vent_2", vent2);
    this.load.image("vent_3", vent3);
    this.load.image("vent_4", vent4);
    this.load.image("vent_5", vent5);
    this.load.image("vent_6", vent6);
    this.load.image("jump_1", jump1, 36, 40);
    this.load.image("jump_2", jump2, 36, 40);
    this.load.image("jump_3", jump3, 36, 40);
    this.load.image("jump_4", jump4, 36, 40);
    this.load.image("jump_5", jump5, 36, 40);
    this.load.image("jump_6", jump6, 36, 40);
    this.load.image("jump_7", jump7, 36, 40);
    this.load.audio("walk", footStep);
    this.load.image("button", vent_button)
    this.load.image("arrow", arrow)
    this.load.image(
      "AlignEngineOutput_mission_marked",
      AlignEngineOutput_mission_marked
    );
    this.socket.emit("whatRole", this.textInput);
    this.socket.on("roleIs", (role) => {
      //console.log(role);
      // is imposterr
      isRole = role;
    });
  }

  create() {
    //this.scene.pause('game')
    // let intro = this.scene.launch('introCrew', { isRole: isRole }).bringToTop('introCrew')


    const ship = this.make.tilemap({ key: "tilemap" });
    const tileset = ship.addTilesetImage("theSkeld", "tiles", 17, 17);
    const ship_tileset = ship.createLayer("Background", tileset);

    //khởi tạo nhóm các vent 
    vent_group = this.physics.add.staticGroup({
      key: 'vent_1',
      frameQuantity: 14,
      immovable: true
    });
    //khởi tạo nhóm các arrow
    arrow_group = this.add.group({
      key: 'arrow',
      frameQuantity: 70
    });
    //add use button
    vent_butt = this.add.image(1000, 700, "button").setScrollFactor(0, 0).setInteractive().setAlpha(0.5)
    useButton = this.add
      .image(900, 700, "UseButton")
      .setScrollFactor(0, 0)
      .setInteractive();
    //disable button
    useButton.alpha = 0.5;

    //add kill button if imposter
    if (isRole == 1) {
      kill = this.add
        .image(750, 700, "KillButton")
        .setScrollFactor(0, 0)
        .setInteractive();
      kill.alpha = 0.5;
    }


    this.socket.emit('whatRole', this.textInput)
    this.socket.on('roleIs', (role) => {
      //console.log(role);
      // is imposterr
      isRole = role
    })
    //initialize missions of this map
    map_missions = new MapMissionsExporter("theSkeld");
    export_missions = map_missions.create();

    ship_tileset.setCollisionByProperty({ collides: true });

    // debugDraw(ship_tileset, this);

    //add player
    player = this.physics.add.sprite(-1528, 85, "playerbase", "idle.png");

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

    //tạo animation cho vent
    hole = this.anims.create({
      key: 'hole',
      frames: [{ key: 'vent_1' },
      { key: 'vent_2' },
      { key: 'vent_3' },
      { key: 'vent_4' },
      { key: 'vent_5' },
      { key: 'vent_6' },
      { key: 'vent_1' }
      ],
      frameRate: 23,
      repeat: 0
    });
    //chỉnh vị trí từng frame trong animation cho phù hợp
    hole.frames[0].frame.y = 8
    //hole.frames[1].frame.x=11
    hole.frames[2].frame.y = 3.5
    hole.frames[3].frame.y = 7
    hole.frames[4].frame.y = 7
    hole.frames[4].frame.x = 3
    hole.frames[5].frame.y = 7
    //animation player nhảy vent
    let jump = this.anims.create({
      key: "jump",
      frames: [{ key: 'jump_1' },
      { key: 'jump_2' },
      { key: 'jump_3' },
      { key: 'jump_4' },
      { key: 'jump_5' },
      { key: 'jump_6' },
      { key: 'jump_7' }
      ],
      frameRate: 6,
      repeat: 0
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
      frameRate: 32,
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
      repeat: 0,
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
    this.input.keyboard.enabled
    //tải lại mới khi có player mới vào có các player đã ở trong đó
    console.log(this.textInput);
    //các function liên quan đến objectlayer
    objectsLayer = ship.getObjectLayer("GameObjects");
    //khởi tạo hashmap cho vent và arrow
    objectsLayer.objects.forEach((object) => {
      if (object.type == "vent") {
        //hash map cho vent sẽ có dạng ( vent_1,2,3, [vent.x, vent.y]) nghĩa là mỗi key là string vent sẽ có value là tọa dộ x y của vent trên map
        vent_cord.set(object.name, [object.x, object.y])
        // hash map cho arrow để player di chuyển vent sẽ dạng là (vent,[arrow1,arrow2....]) nghĩa là mỗi key là string vent hiện tại sẽ có value là các arrow của vent đó
        vent_des.set(object.name, [])
      }
    })
    //lẩy mảng từ group các sprite
    let children = vent_group.getChildren()
    let children_1 = arrow_group.getChildren()
    let i = 0, j = 0
    //khởi tạo object layer để gán sprite hoặc tạo vật cản cho player      
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
          var cir = this.add.circle(
            object.x + object.width * 0.5,
            object.y + object.height * 0.5,
            object.width * 0.75,
            0xff0000,
            0.4
          );
          this.physics.add.existing(cir);
          cir.body.immovable = true;
          this.physics.add.overlap(player, cir, circleOverlap, null, this);
          // cir.setOrigin(0, 0);
          //gán vị trí cho từng phần tử con của group vent 
          children[i].setPosition(object.x, object.y - 10).setOrigin(0, 0).setScale(1.2)
          i++
          break;
        case "arrow":

          // console.log(object.name.split(" ")[1])
          //gán vị trí cho từng phần tử con của group arrow// set angle với mục đích là xoay mũi tên tới vent gần nhất dựa vào propeties rotation của object trong Tiled
          // sau đó gán interactive cho arrow để thực hiện di chuyển player tới vent gần nhất
          children_1[j].setPosition(object.x, object.y).setScale(0.4).setAngle(object.rotation).setOrigin(0, 1).setInteractive().on('pointerdown', () => {
            //trước khi di chuyển player sang vent mới thì sẽ ẩn đi các arrow ở vent cũ
            arrow_group.setVisible(false)
            // ở đây ta split object name của vent thành mảng 2 phần tử do cấu trúc name của object là (vent "cần tới"- vent"hiện tại") và 2 vent này được ngăn cách bởi dấu cách
            // như đã nói trên thì vent_cord là hash map lưu vị trí các vent dựa trên key value là name của vent, nên ta lấy vị trí [0] là vent "cần tới" dể gán tọa độ x y 
            // cho player
            player.x = vent_cord.get(object.name.split(" ")[0])[0] + 20
            player.y = vent_cord.get(object.name.split(" ")[0])[1]
          })
          // vent_des là hash map lưu các arrow của vent đó và ở đây và ứng với mỗi vent thì sẽ có 3 - 4 arrow cho vent đó  
          // ở đây ta lấy vị trí [1] là vent "hiện tại" là gốc của các arrow
          vent_des.get(object.name.split(" ")[1]).push(children_1[j])
          j++
          break
        default:
          break;
      }
    });
    vent_group.refresh()

    //ẩn hết các arrow của vent sau khi khởi tạo
    arrow_group.setVisible(false)

    //bắt sự kiện khi player overlap với 1 object khác
    player.on("overlapstart", function () {
      //hiện nút nhảy vent với điều kiện là player overlap với vent
      if (is_vent) {
        vent_butt.alpha = 1
      }
    });
    //bắt sự kiện khi player đi ra khỏi vùng overlap
    player.on("overlapend", function () {
      //ẩn nút nhảy vent
      is_vent = false
      vent_butt.alpha = 0.5
    });

    //thực hiện hàm circleOverlap khi player tới gần vent
    this.physics.add.overlap(player, vent_group, circleOverlap);
    //bắt sự kiện button nhảy vent
    vent_butt.on('pointerdown', function (pointer) {
      //nếu tới gần vent thì sẽ đi vào vòng if
      if (is_vent) {
        temp.play("hole")
        player.anims.play("jump");
        is_jump = true
        //nếu player không trốn vent thì is_hidden sẽ chuyển thành true và ngược lại
        if (is_hidden == true) {
          is_hidden = false
          //ẩn hết arrow khi player rời khỏi vent
          arrow_group.setVisible(false)
        } else {
          is_hidden = true

        }
      }

    })

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

    //update if killed
    this.socket.on("updateOtherPlayer", (playerId) => {
      console.log(this.socket.id);
      console.log(playerId);
      if (this.socket.id == playerId) {
        //run noitice died
        console.log("this player killed");
        //player.stop("player-idle")
        alive = false;

        player.anims.play("player-dead");
      } else {
        let index = otherPlayerId.findIndex((Element) => Element == playerId);
        otherPlayer[index].anims.play("player-dead", true);
      }
    });
  }

  update() {
    if (isRole == 1) {
      kill.on("pointerdown", () => {
        //console.log();

        if (canKill) {
          this.sound.play('killAudio', false)
          playerKilled.anims.play("player-dead", true);
          this.socket.emit('killed', (otherPlayerId[indexKill]))
          otherPlayer = otherPlayer.filter(player => { return player !== playerKilled });

          console.log(otherPlayerId[indexKill]); // emit socket id player killed
          otherPlayerId = otherPlayerId.filter(player => { return player !== otherPlayerId[indexKill] });
          console.log("emitted");
          canKill = false;
        } else {
          console.log("no kill");
        }
      });
      //nếu player đang trốn vent thì chạy hàm này để hiện arrow của vent đó
      if (is_hidden == true) {
        playercur()
      }

      //vì phaser chưa có phương thức xác định bắt sự kiện khi player tiếp xúc với sprite hoặc player rời xa sprite nên ta sử dụng emit để gửi sự kiện overlapstart và overlapend
      // var touching = !player.body.touching.none;
      var wasTouching = !player.body.wasTouching.none;
      // If you want 'touching or embedded' then use:
      var touching = !player.body.touching.none || player.body.embedded;
      if (touching && !wasTouching) player.emit("overlapstart");
      else if (!touching && wasTouching) player.emit("overlapend");

      //để tránh xung đột với animation idle khi vào vent thì ta sẽ delay animation idle lại để player thực hiện nhảy vent và sau đó ẩn player đi 
      if (is_vent == true && is_jump == true) {
        count++
        if (count == 40) {
          check(player)
          is_jump = false
          count = 0
        }
      }
      else if (is_vent == true && is_jump == false) {

        player.anims.play("player-idle");
      }


      let playerMoved = false;
      player.setVelocity(0);

      if (
        !cursors.left.isDown &&
        !cursors.right.isDown &&
        !cursors.up.isDown &&
        !cursors.down.isDown &&
        !is_vent
      ) {
        //     console.log("outvent")
        player.anims.play("player-idle");
      }
      //nếu is_hidden bằng true có nghĩa là player đang trốn vent nên sẽ ko di chuyển bằng input được
      if (cursors.left.isDown && is_hidden == false) {
        player.anims.play("player-walk", true);
        player.setVelocityX(-PLAYER_SPEED);
        player.scaleX = -1;
        player.body.offset.x = 40;
        playerMoved = true;
      } else if (cursors.right.isDown && is_hidden == false) {
        player.anims.play("player-walk", true);
        player.setVelocityX(PLAYER_SPEED);
        player.scaleX = 1;
        player.body.offset.x = 0;
        playerMoved = true;
      }
      if (cursors.up.isDown && is_hidden == false) {
        player.anims.play("player-walk", true);
        player.setVelocityY(-PLAYER_SPEED);
        playerMoved = true;
      } else if (cursors.down.isDown && is_hidden == false) {
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

        let index = 0;

        for (let other of otherPlayer) {
          if (
            Math.abs(Math.floor(player.x) - Math.floor(other.x)) <= 100 &&
            Math.abs(Math.floor(player.y) - Math.floor(other.y)) <= 100
          ) {
            playerKilled = other; //lấy player đứng gần
            indexKill = index;
            kill.alpha = 1;
            canKill = true;
            break;
          }
          index += 1;
        }
        if (index === otherPlayer.length) {
          canKill = false;
          kill.alpha = 0.5;
        }
      }
      //canKill = false
      if (alive == true) {
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
  };
}

function circleOverlap() {
  //console.log("circle overlapped");

  // hiện arrow của vent khi player tới gần
  function playercur() {
    vent_des.get(key).forEach(element => {
      element.setVisible(true)
    });
  }
  function circleOverlap(player, vent) {
    temp = vent
    is_vent = true
    //lấy key string của vent hiện tại dựa trên x y của sprite vent 
    key = getKey([vent.x, vent.y + 10])[0]


  }
  //hàm lấy key từ hashmap dựa trên value của key
  function getKey(val) {
    return [...vent_cord].find(([key, value]) => JSON.stringify(val) === JSON.stringify(value));
  }
  //ẩn player dựa trên giá trị của is_hidden
  function check(player) {
    if (is_hidden == true) {
      player.setActive(false).setVisible(false)

    } else {

      player.setActive(true).setVisible(true)
    }
  }
}
export default Game;
