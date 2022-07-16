//Libs and files
import Phaser, { Scene } from "phaser";
import theSkeldpng from "../assets/img/theSkeld.png";
import theSkeldjson from "../assets/tilemaps/theskeld.json";

import Light from "../scene//state/ingame/ray-light";
import eventsCenter from "./eventsCenter";
import { debugDraw } from "../scene/debugDraw";
import MapMissionsExporter from "../helper/map_mission_exporter";
import Mission from "../services/missions/mission";
import emergencyButton from "../assets/img/emergencyButton.png";
import reportbtn from "../assets/img/reportButton.png";

//Marked mission
import AlignEngineOutput_mission_marked from "../assets/tasks/Align Engine Output/mission_marked.png";

//marked mission

import CleanO2Filter_mission_marked from "../assets/tasks/Clean O2 Filter/marked.png";
import AlignEnginOutput_gallery from "../assets/tasks/Align Engine Output/gallery.png";
import FixWiring_mission_marked from "../assets/tasks/Fix_Wiring/marked.png";
import CleanAsteroids from "../assets/tasks/Clear Asteroids/marked.png";
import StabilizeSteering from "../assets/tasks/Stabilize Steering/marked.png";
import Swipcard_mision_marked from "../assets/tasks/Swipe Card/marked.png";
import UploadData_mission_marked from "../assets/tasks/Upload Data/marked.png";
import CalibratorDistributor_mission_marked from "../assets/tasks/Calibrate Distributor/marked.png";
import ChartCourse from "../assets/tasks/Chart Course/marked.png";
import FuelEngine from "../assets/tasks/Fuel Engines/marked.png";
import PrimeShields from "../assets/tasks/Prime Shields/marked.png";
import InspectSample from "../assets/tasks/Inspect Sample/marked.png";
import UnlockManifolds from "../assets/tasks/Unlock Manifolds/marked.png";
import DivertPower from "../assets/img/divert_power/marked.png";


//Constants
import {
  PLAYER_SPEED,
  PLAYER_BASE,
  PLAYER_GHOST,
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

//Variables declaration
let player, pet_type;
let otherPlayer = new Array();
let otherPlayerId = new Array();
let otherNames = new Array()
let cursors;
let pressedKeys = [];
let stt = 0;
let socket;
let tables = [];
let tableObject,
  ventObject,
  hole,
  vent_butt,
  emergency_btn,
  near_btn = false,
  report_btn;
var objectsLayer;
let map_missions;
let export_missions;
let current_x, current_y, mission_name;
let useButton;
let launch_scene = false;
let playerKilled;
let indexKill = 0;
let canKill = false;
let alive = true;
let kill;
let sabotage;
let vent_map = new Map();
let light;
let vent_group,
  arrow_group,
  vent_cord = new Map(),
  vent_des = new Map();
let temp,
  key,
  is_vent = false,
  is_jump = false,
  is_hidden = false,
  keyboard;
let count = 0;
let total_missions_completed = 0;
let list_missions_completed = [];
let color = "";
let report_button;
let deadplayer = [];
let pet = null;
let pants_skin,
  hat_skin,
  pants_type = null;
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
let otherPlayer_container = new Array();
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
    this.namePlayers = data.namePlayers
    this.isRole = data.isRole;
    this.playerChangedSkin = data.playerChangedSkin;
    this.Info = data.Info;
    this.container = data.container
  }

  preload() {
    this.load.image("report-btn", reportbtn);
    this.load.image("emergency", emergencyButton);

    this.load.image("theSkeldpng", theSkeldpng);
    this.load.tilemapTiledJSON("theSkeld_tilemap", theSkeldjson);

    // this.load.image(
    //   "AlignEngineOutput_mission_marked",
    //   AlignEngineOutput_mission_marked
    // );

    this.load.image(
      "AlignEngineOutput_mission_marked",
      AlignEnginOutput_gallery
    );

    this.load.image(
      "CleanO2Filter_mission_marked",
      CleanO2Filter_mission_marked
    );
    this.load.image("FixWiring_mission_marked", FixWiring_mission_marked);
    this.load.image("CleanAsteroids", CleanAsteroids);
    this.load.image("StabilizeSteering", StabilizeSteering);
    this.load.image("Swipcard_mision_marked", Swipcard_mision_marked);
    this.load.image("UploadData_mission_marked", UploadData_mission_marked);
    this.load.image(
      "CalibratorDistributor_mission_marked",
      CalibratorDistributor_mission_marked
    );
    this.load.image("ChartCourse", ChartCourse);
    this.load.image("FuelEngine", FuelEngine);
    this.load.image("PrimeSheilds", PrimeShields);
    this.load.image("InspectSample", InspectSample);
    this.load.image("UnlockManifolds", UnlockManifolds)

    this.load.image("InspectSample", InspectSample);
    this.load.image("UnlockManifolds", UnlockManifolds);
    this.load.image("DivertPower", DivertPower)
  }

  create() {
    this.socket.emit("send_role", this.socket.id, this.isRole, this.textInput)
    this.socket.on("end_game", (winner) => {
      console.log(winner, "pppp")
      switch (winner) {
        case 1:
          if (this.isRole == 1) {
            this.scene.launch("end_game", { num: 1 })
          } else {
            this.scene.launch("end_game", { num: 2 })
          }
          break;
        case 2:
          if (this.isRole != 1) {
            this.scene.launch("end_game", { num: 1 })
          } else {
            this.scene.launch("end_game", { num: 2 })
          }
          break;
        default:
          break;
      }
    })
    light = new Light(this);
    const ship = this.make.tilemap({ key: "theSkeld_tilemap" });
    const tileset = ship.addTilesetImage("theSkeld", "theSkeldpng");
    const ship_tileset = ship.createLayer("Background", tileset);

    ship_tileset.setCollisionByProperty({ collides: true });

    eventsCenter.on("continue_scene_game", (data) => {
      current_x = data.x;
      current_y = data.y;
      mission_name = data.mission;
      if (current_x && current_y) {
        map_missions.completed(mission_name);
        list_missions_completed.push(mission_name);
        total_missions_completed += 1;
        map_missions.count_missions_completed(total_missions_completed);
        map_missions.update_list_missions_completed(list_missions_completed);
        player_container.x = current_x + 2;
        player_container.y = current_y + 2;
      }
    });

    player_container = this.add.container(115, -750).setDepth(0.6);


    let colorPlayerChanged =
      this.playerChangedSkin.color ?? PLAYER_BLUE;
    color = colorPlayerChanged
    player = this.physics.add.sprite(0, 0, colorPlayerChanged, "idle.png").setDepth(0.6);

    player_container.setSize(player.width, player.height);
    player_container.add(player);

    this.physics.add.existing(player_container);

    this.physics.add.collider(player_container, ship_tileset);

    this.cameras.main.startFollow(player_container, true);

    this.input.keyboard.enabled;



    if (this.playerChangedSkin.hat) {
      let hatChosen = this.playerChangedSkin.hat.texture.key ?? "nothing";
      switch (hatChosen) {
        case "hat0":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat00",
            0
          );
          break;
        case "hat1":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat01",
            0
          );
          break;
        case "hat2":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat02",
            0
          );
          break;
        case "hat3":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat03",
            0
          );
          break;
        case "hat4":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat04",
            0
          );
          break;
        case "hat5":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat05",
            0
          );
          break;
        case "hat6":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat06",
            0
          );
          break;
        case "hat7":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat07",
            0
          );
          break;
        case "hat8":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat08",
            0
          );
          break;
        case "hat9":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat09",
            0
          );
          break;
        case "hat10":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat010",
            0
          );
          break;
        case "hat11":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat011",
            0
          );
          break;
        case "hat12":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat012",
            0
          );
          break;
        case "hat13":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat013",
            0
          );
          break;
        case "hat14":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat014",
            0
          );
          break;
        case "hat15":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat015",
            0
          );
          break;
        case "hat16":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat016",
            0
          );
          break;
        case "hat17":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat017",
            0
          );
          break;
        case "hat18":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat018",
            0
          );
          break;
        case "hat19":
          hat_skin = this.physics.add.sprite(
            player.x,
            player.y - 25,
            "hat019",
            0
          );
          break;
      }
      player_container.add(hat_skin);
    }

    if (this.playerChangedSkin.trouser) {
      let pantChosen = this.playerChangedSkin.trouser.texture.key ?? "nothing";
      switch (pantChosen) {
        case "trouser0":
          pants_type = null;
          pants_skin = null;
          break;
        case "trouser1":
          pants_type = POLICE;
          pants_skin = this.physics.add.sprite(
            player.x + 0.75,
            player.y + 10,
            `${pants_type}_pants`,
            `${pants_type}_Idle.png`
          );
          break;
        case "trouser2":
          pants_type = HAZMAT;
          pants_skin = this.physics.add.sprite(
            player.x + 0.75,
            player.y + 10,
            `${pants_type}_pants`,
            `${pants_type}_Idle.png`
          );
          break;
        case "trouser3":
          pants_type = ARCHAEOLOGIST;
          pants_skin = this.physics.add.sprite(
            player.x + 0.75,
            player.y + 10,
            `${pants_type}_pants`,
            `${pants_type}_Idle.png`
          );
          break;
        case "trouser4":
          pants_type = WINTERJACKET;
          pants_skin = this.physics.add.sprite(
            player.x + 0.75,
            player.y + 10,
            `${pants_type}_pants`,
            `${pants_type}_Idle.png`
          );
          break;
        case "trouser5":
          pants_type = TARMAC;
          pants_skin = this.physics.add.sprite(
            player.x + 0.75,
            player.y + 10,
            `${pants_type}_pants`,
            `${pants_type}_Idle.png`
          );
          break;
        case "trouser6":
          pants_type = MILITARY;
          pants_skin = this.physics.add.sprite(
            player.x + 0.75,
            player.y + 10,
            `${pants_type}_pants`,
            `${pants_type}_Idle.png`
          );
          break;
        case "trouser7":
          pants_type = SUITBLACK;
          pants_skin = this.physics.add.sprite(
            player.x + 0.75,
            player.y + 10,
            `${pants_type}_pants`,
            `${pants_type}_Idle.png`
          );
          break;
        case "trouser8":
          pants_type = ASTRONAUT;
          pants_skin = this.physics.add.sprite(
            player.x + 0.75,
            player.y + 10,
            `${pants_type}_pants`,
            `${pants_type}_Idle.png`
          );
          break;
        case "trouser9":
          pants_type = CAPTAIN;
          pants_skin = this.physics.add.sprite(
            player.x + 0.75,
            player.y + 10,
            `${pants_type}_pants`,
            `${pants_type}_Idle.png`
          );
          break;
        case "trouser10 ":
          pants_type = SECGUARD;
          pants_skin = this.physics.add.sprite(
            player.x + 0.75,
            player.y + 10,
            `${pants_type}_pants`,
            `${pants_type}_Idle.png`
          );
          break;
        case "trouser11":
          pants_type = SCIENTIST;
          pants_skin = this.physics.add.sprite(
            player.x + 0.75,
            player.y + 10,
            `${pants_type}_pants`,
            `${pants_type}_Idle.png`
          );
          break;
        case "trouser12":
          pants_type = MECHANIC;
          pants_skin = this.physics.add.sprite(
            player.x + 0.75,
            player.y + 10,
            `${pants_type}_pants`,
            `${pants_type}_Idle.png`
          );
          break;
        case "trouser13":
          pants_type = WALL;
          pants_skin = this.physics.add.sprite(
            player.x + 0.75,
            player.y + 10,
            `${pants_type}_pants`,
            `${pants_type}_Idle.png`
          );
          break;
        case "trouser14":
          pants_type = SUITWHITE;
          pants_skin = this.physics.add.sprite(
            player.x + 0.75,
            player.y + 10,
            `${pants_type}_pants`,
            `${pants_type}_Idle.png`
          );
          break;
        case "trouser15":
          pants_type = CCC;
          pants_skin = this.physics.add.sprite(
            player.x + 0.75,
            player.y + 10,
            `${pants_type}_pants`,
            `${pants_type}_Idle.png`
          );
          break;
      }
      player_container.add(pants_skin);
      /* *********************CREATING ANIMATIONS FOR SKINS********************* */
      //For skis that don't have mirror animations
      this.anims.create({
        key: `${pants_type}_walk`,
        frames: this.anims.generateFrameNames(`${pants_type}_pants`, {
          start: 1,
          end: 12,
          prefix: `${pants_type}_Walk`,
          suffix: ".png",
        }),
        repeat: -1,
        frameRate: 16,
      });

      this.anims.create({
        key: `${pants_type}_idle`,
        frames: [
          {
            key: `${pants_type}_pants`,
            frame: `${pants_type}_Idle.png`,
          },
        ],
      });
      //For skins that have mirror animations
      if (
        pants_type == POLICE ||
        pants_type == ARCHAEOLOGIST ||
        pants_type == SECGUARD ||
        pants_type == WALL ||
        pants_type == CCC
      ) {
        isMirror = true;
        this.anims.create({
          key: `${pants_type}_walkMirror`,
          frames: this.anims.generateFrameNames(`${pants_type}_pants`, {
            start: 1,
            end: 12,
            prefix: `${pants_type}_WalkMirror`,
            suffix: ".png",
          }),
          repeat: -1,
          frameRate: 24,
        });

        this.anims.create({
          key: `${pants_type}_idleMirror`,
          frames: [
            {
              key: `${pants_type}_pants`,
              frame: `${pants_type}_IdleMirror.png`,
            },
          ],
        });
      } else {
        isMirror = false;
      }
    }

    //Pets loading
    if (this.playerChangedSkin.pet) {
      let petChosen = this.playerChangedSkin.pet.texture.key ?? "nothing";
      switch (petChosen) {
        case "pet0":
          pet = null;
          pet_type = null;
          break;
        case "pet1":
          pet = this.physics.add.sprite(
            player.x + 50,
            player.y + 10,
            STICKMIN,
            "stickmin_idle1.png"
          );
          pet_type = STICKMIN;
          break;
        case "pet2":
          pet = this.physics.add.sprite(
            player.x + 50,
            player.y + 10,
            ELLIE,
            "ellie_idle1.png"
          );
          pet_type = ELLIE;
          break;
        case "pet3":
          pet = this.physics.add.sprite(
            player.x + 50,
            player.y + 10,
            CREWMIN,
            "crewmin_idle1.png"
          );
          pet_type = CREWMIN;
          break;
        case "pet4":
          pet = this.physics.add.sprite(
            player.x + 50,
            player.y + 10,
            DOG,
            "dog_idle1.png"
          );
          pet_type = DOG;
          break;
        case "pet5":
          pet = this.physics.add.sprite(
            player.x + 50,
            player.y + 10,
            BEDCRAB,
            "bedcrab_idle1.png"
          );
          pet_type = BEDCRAB;
          break;
        case "pet6":
          pet = this.physics.add.sprite(
            player.x + 50,
            player.y + 10,
            ROBIT,
            "robit_idle1.png"
          );
          pet_type = ROBIT;
          break;
        case "pet7":
          pet = this.physics.add.sprite(
            player.x + 50,
            player.y + 10,
            BSLUG,
            "bslug_idle1.png"
          );
          pet_type = BSLUG;
          break;
        case "pet8":
          pet = this.physics.add.sprite(
            player.x + 50,
            player.y + 10,
            HAMPSTER,
            "hampster_idle1.png"
          );
          pet_type = HAMPSTER;
          break;
        case "pet9":
          pet = this.physics.add.sprite(
            player.x + 50,
            player.y + 10,
            SQUIG,
            "squig_idle1.png"
          );
          pet_type = SQUIG;
          break;
        case "pet10":
          if (pet) {
            pet.dstroy();
          }
          pet = this.physics.add.sprite(
            player.x + 50,
            player.y + 10,
            UFO,
            "ufo_idle1.png"
          );
          pet_type = UFO;
          break;
        case "pet11":
          pet = this.physics.add.sprite(
            player.x + 50,
            player.y + 10,
            TWITCH,
            "twitch_idle1.png"
          );
          pet_type = TWITCH;
          break;
      }
      player_container.add(pet);
    }

    //add kill button if imposter
    if (this.isRole == 1) {
      kill = this.add
        .image(750, 700, "KillButton")
        .setScrollFactor(0, 0)
        .setInteractive()
        .setDepth(1);
      kill.alpha = 0.5;

      sabotage = this.add
        .image(1000, 700, "sabotage")
        .setScrollFactor(0, 0)
        .setInteractive()
        .setAlpha(1)
        .setDepth(1);
      //*****************OPEN the Mini Map ******/

      sabotage.on("pointerdown", () => {
        this.scene.launch("mini-map");
      });
    }
    //initialize missions of this map
    map_missions = new MapMissionsExporter("theSkeld");
    export_missions = map_missions.create();
    map_missions.show_mission(this);



    this.state.roomKey = this.textInput;

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
        repeat: 0,
        frameRate: 24,
      });


    });

    // tạo theo số lượng other player vào


    this.idPlayers.forEach((element) => {
      if (element != this.socket.id) {
        otherPlayerId.push(element);

      }
    });
    let count = 0
    this.idPlayers.forEach((element) => {
      if (element != this.socket.id) {
        let index = otherPlayerId.findIndex((Element) => Element == element);
        let colorOther = Object(this.Info.players)[element].color;
        otherPlayer_container[index] = this.add.container(-45, 26);
        this.physics.add.existing(otherPlayer_container[index]);

        otherPlayer[index] = this.physics.add.sprite(
          -45, 26, colorOther,
          "idle.png"
        );

        //   let index = otherPlayerId.findIndex((Element) => Element == element)
        ///   let otherPlayer[index] =this.physics.add.sprite(-45, 26, colorOther, "idle.png");
        //  console.log(index)
        //  otherPlayer_container[count] = this.add.container(-45, 26);
        //    this.physics.add.existing(otherPlayer_container[count]);
        otherPlayer_container[index].setSize(otherPlayer[index].width, otherPlayer[index].height);
        otherPlayer_container[index].add(otherPlayer[index]);
        otherPlayer_container[index].body.setVelocity(0)

        let temp_hat = Object(this.Info.players)[element].hat
        let temp_pet = Object(this.Info.players)[element].pet
        let temp_pants = Object(this.Info.players)[element].pants
        console.log(temp_hat, temp_pet, temp_pants)
        if (temp_hat) {
          let otherPlayer_hat_skin = this.physics.add.sprite(
            otherPlayer[index].x,
            otherPlayer[index].y - 25,
            String(temp_hat),
            0
          );
          otherPlayer_container[stt].add(otherPlayer_hat_skin);
        }
        if (temp_pet) {
          let otherPlayer_pet = this.physics.add.sprite(
            otherPlayer[index].x + 50,
            otherPlayer[index].y + 10,
            String(temp_pet),
          );
          otherPlayer_container[stt].add(otherPlayer_pet);
        }
        if (temp_pants) {
          let otherPlayer_pants = this.physics.add.sprite(
            otherPlayer[index].x + 0.75,
            otherPlayer[index].y + 10,
            `${temp_pants}_pants`,
            `${temp_pants}_Idle.png`
          );
          otherPlayer_container[stt].add(otherPlayer_pants);
        }
        count++
      }
    })
    console.log(otherPlayer_container);

    // stt = otherPlayer.length;
    //****************** */

    //cursor to direct
    cursors = this.input.keyboard.createCursorKeys();

    //khởi tạo nhóm các vent
    vent_group = this.physics.add.staticGroup({
      key: "vent_1",
      frameQuantity: 14,
      immovable: true,
    });
    //khởi tạo nhóm các arrow
    arrow_group = this.add.group({
      key: "arrow",
      frameQuantity: 70,
    });
    //add use button
    vent_butt = this.add
      .image(1000, 700, "button")
      .setScrollFactor(0, 0)
      .setInteractive()
      .setAlpha(0)
      .setDepth(1);
    report_btn = this.add
      .image(600, 700, "report-btn")
      .setScrollFactor(0, 0)
      .setInteractive()
      .setAlpha(0.5)
      .setDepth(10);
    useButton = this.add
      .image(900, 700, "UseButton")
      .setScrollFactor(0, 0)
      .setInteractive()
      .setDepth(1);
    //disable button
    useButton.alpha = 0.5;
    //tạo animation cho vent
    hole = this.anims.create({
      key: "hole",
      frames: [
        { key: "vent_1" },
        { key: "vent_2" },
        { key: "vent_3" },
        { key: "vent_4" },
        { key: "vent_5" },
        { key: "vent_6" },
        { key: "vent_1" },
      ],
      frameRate: 10,
      repeat: 0,
    });
    //chỉnh vị trí từng frame trong animation cho phù hợp
    hole.frames[0].frame.y = 8;
    //hole.frames[1].frame.x=11
    hole.frames[2].frame.y = 3.5;
    hole.frames[3].frame.y = 7;
    hole.frames[4].frame.y = 7;
    hole.frames[4].frame.x = 3;
    hole.frames[5].frame.y = 7;
    //animation player nhảy vent
    let jump = this.anims.create({
      key: "jump",
      frames: [
        { key: "jump_1" },
        { key: "jump_2" },
        { key: "jump_3" },
        { key: "jump_4" },
        { key: "jump_5" },
        { key: "jump_6" },
        { key: "jump_7" },
      ],
      frameRate: 36,
      repeat: 0,
    });



    //player ghost
    this.anims.create({
      key: "player-ghost",
      frames: this.anims.generateFrameNames(PLAYER_GHOST, {
        start: 1,
        end: 48,
        prefix: "ghost00",
        suffix: ".png",
      }),

      repeat: 0,
      frameRate: 12,
    });

    //Creating animation for pets
    this.anims.create({
      key: `${BSLUG}-walk`,
      frames: this.anims.generateFrameNames(BSLUG, {
        start: 1,
        end: 18,
        prefix: `${BSLUG}_walk`,
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    this.anims.create({
      key: `${BSLUG}-idle`,
      frames: this.anims.generateFrameNames(BSLUG, {
        start: 1,
        end: 48,
        prefix: `${BSLUG}_idle`,
        suffix: ".png",
      }),
      repeat: 0,
      frameRate: 12,
    });

    //BEDCRAB
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

    //CREWMIN
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
      frames: [{ key: CREWMIN, frame: `${CREWMIN}_idle1.png` }],
    });

    //DOG
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

    //ELLIE
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

    //HAMPSTER
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

    //ROBIT
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

    //SQUIG
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

    //STICKMIN
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

    //TWITCH
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

    //UFO
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

    //input to control
    this.input.keyboard.on("keydown", (e) => {
      if (!pressedKeys.includes(e.code)) {
        pressedKeys.push(e.code);
      }
    });
    this.input.keyboard.on("keydown", (e) => {
      if (
        e.code == "ArrowDown" ||
        e.code == "ArrowUp" ||
        e.code == "ArrowRight" ||
        e.code == "ArrowLeft"
      ) {
        this.sound.play("walk", { loop: true });
      }
    });
    this.input.keyboard.on("keyup", (e) => {
      this.sound.stopByKey("walk");
      if (alive == true) {
        player.anims.play(`${color}-idle`);
      }

      pressedKeys = pressedKeys.filter((key) => key !== e.code);
    });

    //tải lại mới khi có player mới vào có các player đã ở trong đó

    //các function liên quan đến objectlayer
    objectsLayer = ship.getObjectLayer("GameObjects");
    //khởi tạo hashmap cho vent và arrow
    objectsLayer.objects.forEach((object) => {
      if (object.type == "vent") {
        //hash map cho vent sẽ có dạng ( vent_1,2,3, [vent.x, vent.y]) nghĩa là mỗi key là string vent sẽ có value là tọa dộ x y của vent trên map
        vent_cord.set(object.name, [object.x, object.y]);
        // hash map cho arrow để player di chuyển vent sẽ dạng là (vent,[arrow1,arrow2....]) nghĩa là mỗi key là string vent hiện tại sẽ có value là các arrow của vent đó
        vent_des.set(object.name, []);
      }
    });
    //lẩy mảng từ group các sprite
    let children = vent_group.getChildren();
    let children_1 = arrow_group.getChildren();
    let i = 0,
      j = 0;
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

          this.physics.add.existing(tableObject);

          tableObject.body.immovable = true;
          tableObject.setOrigin(0, 0);
          this.physics.add.overlap(player_container, tableObject, null, null, this);
          this.physics.add.collider(player_container, tableObject);
          break;
        case "vent":
          //gán vị trí cho từng phần tử con của group vent
          children[i]
            .setPosition(object.x, object.y - 10)
            .setOrigin(0, 0)
            .setScale(1.2)
            .setDepth(0.5);
          i++;
          break;
        case "arrow":
          // console.log(object.name.split(" ")[1])
          //gán vị trí cho từng phần tử con của group arrow// set angle với mục đích là xoay mũi tên tới vent gần nhất dựa vào propeties rotation của object trong Tiled
          // sau đó gán interactive cho arrow để thực hiện di chuyển player tới vent gần nhất
          children_1[j]
            .setPosition(object.x, object.y)
            .setScale(0.4)
            .setAngle(object.rotation)
            .setOrigin(0, 1)
            .setInteractive()
            .on("pointerdown", () => {
              //trước khi di chuyển player sang vent mới thì sẽ ẩn đi các arrow ở vent cũ
              arrow_group.setVisible(false);
              // ở đây ta split object name của vent thành mảng 2 phần tử do cấu trúc name của object là (vent "cần tới"- vent"hiện tại") và 2 vent này được ngăn cách bởi dấu cách
              // như đã nói trên thì vent_cord là hash map lưu vị trí các vent dựa trên key value là name của vent, nên ta lấy vị trí [0] là vent "cần tới" dể gán tọa độ x y
              // cho player
              player_container.x = vent_cord.get(object.name.split(" ")[0])[0] + 20;
              player_container.y = vent_cord.get(object.name.split(" ")[0])[1];
            });
          // vent_des là hash map lưu các arrow của vent đó và ở đây và ứng với mỗi vent thì sẽ có 3 - 4 arrow cho vent đó
          // ở đây ta lấy vị trí [1] là vent "hiện tại" là gốc của các arrow
          vent_des.get(object.name.split(" ")[1]).push(children_1[j]);
          j++;
          break;
        case "bound":
          let temp = this.add
            .rectangle(object.x, object.y, object.width, object.height)
            .setAngle(object.rotation)
            .setOrigin(0, 0)
            .setDepth(29);
          light.map(temp);
          break;
        case "Button":
          let temp1 = this.add
            .rectangle(object.x, object.y, object.width - 25, object.height - 25)
            .setOrigin(0, 0);
          emergency_btn = this.add
            .image(object.x, object.y, "emergency")
            .setOrigin(-2.2, -1.25);
          this.physics.add.existing(temp1);
          this.physics.add.overlap(player_container, temp1, report);
          break;
        default:
          break;
      }
    });
    vent_group.refresh();
    light.createFOV();
    light.draw();

    //ẩn hết các arrow của vent sau khi khởi tạo
    arrow_group.setVisible(false).setDepth(1);
    let player_role = this.isRole
    //bắt sự kiện khi player overlap với 1 object khác
    player_container.on("overlapstart", function () {
      //hiện nút nhảy vent với điều kiện là player overlap với vent
      if (is_vent && player_role == 1) {
        vent_butt.alpha = 1;
        sabotage.alpha = 0;
      }
      if (near_btn) {
        report_btn.alpha = 1;
        emergency_btn.setTint(0xffed00, 0xffed00, 0xffed00, 0xffed00);
      }
    });
    //bắt sự kiện khi player đi ra khỏi vùng overlap
    player_container.on("overlapend", function () {
      console.log("end")
      is_vent = false
      if (player_role == 1) {
        vent_butt.alpha = 0
        sabotage.alpha = 1
      }
      near_btn = false;
      report_btn.alpha = 0.5;
      emergency_btn.clearTint();
    });

    //thực hiện hàm circleOverlap khi player tới gần vent
    this.physics.add.overlap(player_container, vent_group, circleOverlap);

    //bắt sự kiện button nhảy vent
    vent_butt.on("pointerdown", () => {
      //nếu tới gần vent thì sẽ đi vào vòng if
      this.sound.play("vent", false);
      if (is_vent) {
        temp.play("hole");
        player.anims.play("jump");
        player.on(
          "animationcomplete",
          (animation, frame) => {
            if ((animation.key = "jump")) {
              if (is_hidden == true) {
                player_container.setDepth(-10);
              } else {
                player_container.setDepth(0.6);
                player.play("jump");
                player.on("animationcomplete", (animation, frame) => {
                  if ((animation.key = "jump")) {
                    player.anims.play(`${color}-idle`);
                  }
                });
              }
            }
          },
          this
        );
        is_jump = true;
        //nếu player không trốn vent thì is_hidden sẽ chuyển thành true và ngược lại
        if (is_hidden == true) {
          is_hidden = false;

          //ẩn hết arrow khi player rời khỏi vent
          arrow_group.setVisible(false);
        } else {
          is_hidden = true;
        }
      }
    });
    report_btn.on("pointerdown", () => {
      if (near_btn) {
        // this.scene.launch("vote", {
        //   socket: this.socket, numPlayers: this.numPlayers,
        //   idPlayers: this.idPlayers, namePlayers:this.namePlayers, roomId: this.state.roomKey, deadlist: deadplayer, role: this.isRole
        // })
        this.socket.emit("open_vote", this.state.roomKey)

      }
    });
    // this.socket.on("move", ({ x, y, playerId }) => {
    //   //console.log({ x, y, playerId });
    this.socket.on("vote_final", (num, id) => {
      this.scene.launch("vote_state", { num: num, name: this.namePlayers[this.idPlayers.indexOf(id)], roomKey: this.textInput, socket: this.socket })
    })
    this.socket.on("open_othervote", () => {
      this.scene.launch("vote", {
        socket: this.socket, numPlayers: this.numPlayers,
        idPlayers: this.idPlayers, namePlayers: this.namePlayers, roomId: this.state.roomKey, deadlist: deadplayer, role: this.isRole
      })


    })
    let _this = this
    this.socket.on("move", ({ x, y, playerId, color }) => {


      let index = otherPlayerId.findIndex((Element) => Element == playerId);

      //console.log(otherPlayer_container[index].list[1].texture.key)
      //FLIP MIRROR
      if (otherPlayer_container[index].x > x) {
        otherPlayer[index].flipX = true;
      } else if (otherPlayer_container[index].x < x) {
        otherPlayer[index].flipX = false;
      }
      let pet_name = undefined
      if (otherPlayer_container[index].list[1] != undefined) {
        pet_name = otherPlayer_container[index].list[1].texture.key
      }

      if (pet_name != undefined) {
        if (otherPlayer[index].flipX == true) {
          otherPlayer_container[index].list[1].scaleX = -1
        } else {
          otherPlayer_container[index].list[1].scaleX = 1
        }
        otherPlayer_container[index].list[1].play(`${pet_name}-walk`, true)

      }

      //UPDATE POSITION
      otherPlayer_container[index].x = x;
      otherPlayer_container[index].y = y;
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

    this.socket.on("moveEnd", ({ playerId, color }) => {
      let index = otherPlayerId.findIndex((Element) => Element == playerId);
      otherPlayer[index].moving = false;
      otherPlayer[index].play(`${color}-idle`);
      let pet_name = undefined
      if (otherPlayer_container[index].list[1] != undefined) {
        pet_name = otherPlayer_container[index].list[1].texture.key
      }

      if (pet_name != undefined) {
        otherPlayer_container[index].list[1].play(`${pet_name}-idle`)
      }

      if (otherPlayer[index].moving) {
        otherPlayer[index].play(`${color}-walk`);
      } else if (
        !otherPlayer[index].moving
      ) {
        otherPlayer[index].stop(`${color}-walk`);
      }
    });

    //update if killed ==>> ************************TO GHOST*******************
    this.socket.on("updateOtherPlayer", ({ playerId, colorKill }) => {
      // console.log(this.socket.id);
      // console.log(playerId);
      // let colorDead = (Object((this.Info.players)[String(playerId)]).color)
      // console.log(colorDead);
      deadplayer.push(playerId);
      if (this.socket.id == playerId) {
        //run noitice died
        console.log("this player killed");
        //player.stop("player-idle")
        alive = false;
        player.anims.play("player-ghost", true);
      } else {
        let index = otherPlayerId.findIndex((Element) => Element == playerId);
        otherPlayer[index].anims.play(`${colorKill}-dead`, true);
        let temp = this.add.rectangle(
          otherPlayer_container[index].x,
          otherPlayer_container[index].y,
          200,
          200
        );
        this.physics.add.existing(temp);
        this.physics.add.overlap(player_container, temp, report);
      }
    });
  }
  update() {
    //console.log(near_btn)
    var wasTouching = !player_container.body.wasTouching.none;
    // If you want 'touching or embedded' then use:
    var touching = !player_container.body.touching.none || player_container.body.embedded;
    if (touching && !wasTouching) player_container.emit("overlapstart");
    else if (!touching && wasTouching) player_container.emit("overlapend");
    if (pants_type) {
      isLeft == true && isMirror == true
        ? pants_skin.setPosition(player.x, player.y + 10)
        : null;
    }
    if (pet) {
      pet.setPosition(player.x + 50, player.y + 10);
    }
    this.events.emit("moving", [player_container.x, player_container.y]);
    light.update(player_container);

    if (this.isRole == 1 && alive == true) {
      kill.on("pointerdown", () => {
        //console.log();
        if (canKill) {

          this.sound.play("killAudio", false);
          let killId = otherPlayerId[indexKill];
          deadplayer.push(killId);
          let colorKill = Object(this.Info.players[killId]).color;
          playerKilled.anims.play(`${colorKill}-dead`, true);
          let temp = this.add.rectangle(
            otherPlayer_container[indexKill].x,
            otherPlayer_container[indexKill].y,
            200,
            200
          );
          this.physics.add.existing(temp);
          this.physics.add.overlap(player_container, temp, report);
          this.socket.emit("killed", {
            playerId: otherPlayerId[indexKill],
            roomId: this.state.roomKey,
          });
          this.socket.emit("check_", this.textInput)
          otherPlayer = otherPlayer.filter((player) => {
            return player !== playerKilled;
          });
          console.log(otherPlayerId[indexKill]); // emit socket id player killed
          otherPlayerId = otherPlayerId.filter((player) => {
            return player !== otherPlayerId[indexKill];
          });
          console.log("emitted");
          canKill = false;
        } else {
          console.log("no kill");
        }
      });

      //nếu player đang trốn vent thì chạy hàm này để hiện arrow của vent đó
      if (is_hidden == true) {
        playercur();
      }

      //vì phaser chưa có phương thức xác định bắt sự kiện khi player tiếp xúc với sprite hoặc player rời xa sprite nên ta sử dụng emit để gửi sự kiện overlapstart và overlapend
      // var touching = !player.body.touching.none;

      //để tránh xung đột với animation idle khi vào vent thì ta sẽ delay animation idle lại để player thực hiện nhảy vent và sau đó ẩn player đi


      if (pants_type) {
        isLeft == true && isMirror == true
          ? pants_skin.setPosition(player.x, player.y + 10)
          : null;
      }
      if (pet) {
        pet.setPosition(player.x + 50, player.y + 10);
      }
      player_container.body.setVelocity(0);
      let playerMoved = false;

      if (
        !cursors.left.isDown &&
        !cursors.right.isDown &&
        !cursors.up.isDown &&
        !cursors.down.isDown &&
        !is_vent
      ) {
        if (pet) {
          pet.anims.play(`${pet_type}-idle`);
        }
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
      //nếu is_hidden bằng true có nghĩa là player đang trốn vent nên sẽ ko di chuyển bằng input được
      if (cursors.left.isDown && is_hidden == false) {
        player.anims.play(`${color}-walk`, true);
        player_container.body.setVelocityX(-PLAYER_SPEED);
        player.scaleX = -1;
        player_container.body.offset.x = 0;
        if (hat_skin) {
          hat_skin.scaleX = -1;
        }
        playerMoved = true;
        if (pet) {
          pet.anims.play(`${pet_type}-walk`, true);
          pet.scaleX = -1;
        }
        isLeft = true;
        if (pants_type) {
          if (isMirror) {
            pants_skin.anims.play(`${pants_type}_walkMirror`, true);
          } else {
            pants_skin.anims.play(`${pants_type}_walk`, true);
            pants_skin.scaleX = -1;
          }
        }
      } else if (cursors.right.isDown && is_hidden == false) {
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
        if (hat_skin) {
          hat_skin.scaleX = 1;
        }
        playerMoved = true;
      }
      if (cursors.up.isDown && is_hidden == false) {
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
      } else if (cursors.down.isDown && is_hidden == false) {
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
        this.socket.emit("move", {
          x: player_container.x,
          y: player_container.y,
          roomId: this.state.roomKey,
        });
        player.movedLastFrame = true;
        let index = 0;

        for (let other of otherPlayer_container) {
          if (
            Math.abs(Math.floor(player_container.x) - Math.floor(other.x)) <= 100 &&
            Math.abs(Math.floor(player_container.y) - Math.floor(other.y)) <= 100
          ) {
            playerKilled = otherPlayer[index]; //lấy player đứng gần
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
      } else {
        if (player.movedLastFrame) {
          this.socket.emit("moveEnd", { roomId: this.state.roomKey });
        }
        player.movedLastFrame = false;
      }
    }

    //canKill = false
    if (alive == true && this.isRole != 1) {
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
      //nếu is_hidden bằng true có nghĩa là player đang trốn vent nên sẽ ko di chuyển bằng input được
      if (cursors.left.isDown) {
        player.anims.play(`${color}-walk`, true);
        player_container.body.setVelocityX(-PLAYER_SPEED);
        player.scaleX = -1;
        player_container.body.offset.x = 0;
        if (hat_skin) {
          hat_skin.scaleX = -1;
        }
        playerMoved = true;
        if (pet) {
          pet.anims.play(`${pet_type}-walk`, true);
          pet.scaleX = -1;
        }
        isLeft = true;
        if (pants_type) {
          if (isMirror) {
            pants_skin.anims.play(`${pants_type}_walkMirror`, true);
          } else {
            pants_skin.anims.play(`${pants_type}_walk`, true);
            pants_skin.scaleX = -1;
          }
        }
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
        if (hat_skin) {
          hat_skin.scaleX = 1;
        }
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
        this.socket.emit("move", {
          x: player_container.x,
          y: player_container.y,
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
        player_container.x,
        player_container.y
      );
      const check_mission = mission.check_mission();
      // console.log("mission", check_mission);
      if (check_mission) {
        //blink blink marker
        useButton.alpha = 1;
      }
      useButton.alpha = check_mission ? 1 : 0.5;

      useButton.on("pointerup", function (e) {
        if (check_mission) {
          launch_scene = true;
        }
      });

      if (launch_scene && check_mission != undefined) {
        //this.scene.pause("game");
        //  console.log("scene", check_mission.scene);

        this.scene.launch(check_mission.scene, {
          x: check_mission.x,
          y: check_mission.y,
          sprite: check_mission.sprite,
          eventsCenter: eventsCenter
        });
        launch_scene = false;
      }
    } else if (alive == false) {
      let playerDieMoved = false;
      player.setVelocity(0);

      if (
        !cursors.left.isDown &&
        !cursors.right.isDown &&
        !cursors.up.isDown &&
        !cursors.down.isDown
      ) {
        // pet.anims.play(`${BSLUG}-idle`);
        player.anims.play("player-ghost", true);
      }

      if (cursors.left.isDown) {

        player.anims.play("player-ghost", true);
        player.setVelocityX(-PLAYER_SPEED);
        player.scaleX = -1;

        player.body.offset.x = 40;
        playerDieMoved = true;
      } else if (cursors.right.isDown) {

        player.anims.play("player-ghost", true);
        player.setVelocityX(PLAYER_SPEED);
        player.scaleX = 1;

        player.body.offset.x = 0;
        playerDieMoved = true;
      }
      if (cursors.up.isDown) {

        player.anims.play("player-ghost", true);
        player.setVelocityY(-PLAYER_SPEED);
        playerDieMoved = true;
      } else if (cursors.down.isDown) {

        player.anims.play("player-ghost", true);
        player.setVelocityY(PLAYER_SPEED);
        playerDieMoved = true;
      }
    }

    //******************GHOST */
    //
  }
}

// hiện arrow của vent khi player tới gần
function playercur() {
  vent_des.get(key).forEach((element) => {
    element.setVisible(true);
  });
}
function circleOverlap(player, vent) {
  temp = vent;
  is_vent = true;
  //lấy key string của vent hiện tại dựa trên x y của sprite vent
  key = getKey([vent.x, vent.y + 10])[0];
}
function deadreport(player, otherplayer) {
  console.log("player status", otherplayer.status);
}
function report(player, button) {
  near_btn = true;
}
// hiện arrow của vent khi player tới gần
//hàm lấy key từ hashmap dựa trên value của key
function getKey(val) {
  return [...vent_cord].find(
    ([key, value]) => JSON.stringify(val) === JSON.stringify(value)
  );
}

export default Game;
