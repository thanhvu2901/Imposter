import Phaser from "phaser";
import boardBase from "../../../assets/tasks/Clear Asteroids/weapons_base.png";
import explosion from "../../../assets/tasks/Clear Asteroids/weapons_explosion.png";
import target from "../../../assets/tasks/Clear Asteroids/weapons_target.png";
import asteroid1 from "../../../assets/tasks/Clear Asteroids/weapons_asteroid1.png";
import asteroid1X from "../../../assets/tasks/Clear Asteroids/weapons_asteroid1X.png";
import asteroid2 from "../../../assets/tasks/Clear Asteroids/weapons_asteroid2.png";
import asteroid2X from "../../../assets/tasks/Clear Asteroids/weapons_asteroid2X.png";
import asteroid3 from "../../../assets/tasks/Clear Asteroids/weapons_asteroid3.png";
import asteroid3X from "../../../assets/tasks/Clear Asteroids/weapons_asteroid3X.png";
import asteroid4 from "../../../assets/tasks/Clear Asteroids/weapons_asteroid4.png";
import asteroid4X from "../../../assets/tasks/Clear Asteroids/weapons_asteroid4X.png";
import asteroid5 from "../../../assets/tasks/Clear Asteroids/weapons_asteroid5.png";
import asteroid5X from "../../../assets/tasks/Clear Asteroids/weapons_asteroid5X.png";
import Event_Center from "../../../helper/event_center";


let asteroid_1, asteroid_2, asteroid_3;
const listItem = [];
const TOTAL_DESTROY = 2;
let destroyed = 0;
let text;

let x;
let y;
let sprite;

class CleanAsteroids extends Phaser.Scene {

  init(data) {
    x = data.x;
    y = data.y;
    sprite = data.sprite;
  }

  constructor() {
    super({ key: "CleanAsteroids" });
  }

  preload() {
    this.load.image("boardBase", boardBase, 300, 600);
    this.load.image("explosion", explosion);
    this.load.image("target", target);
    this.load.image("asteroid1", asteroid1);
    this.load.image("asteroid1X", asteroid1X);
    this.load.image("asteroid2", asteroid2);
    this.load.image("asteroid2X", asteroid2X);
    this.load.image("asteroid3", asteroid3);
    this.load.image("asteroid3X", asteroid3X);
    this.load.image("asteroid4", asteroid4);
    this.load.image("asteroid4X", asteroid4X);
    this.load.image("asteroid5", asteroid5);
    this.load.image("asteroid5X", asteroid5X);
  }

  create() {
    let current_object = this;
    const current_scene = this.scene;
    const boardBase = this.add.image(300, 300, "boardBase");
    asteroid_1 = this.asteroid1 = this.add.sprite(550, 303, "asteroid1");
    asteroid_2 = this.asteroid2 = this.add.sprite(550, 135, "asteroid2");
    asteroid_3 = this.asteroid3 = this.add.sprite(550, 317, "asteroid3");
    // this.asteroid4= this.add.sprite(450,223,"asteroid4");
    // this.asteroid5= this.add.sprite(450,441,"asteroid5");
    text = this.add.text(250, 500, "Destroyed: 0");
    listItem.push(this.asteroid1, this.asteroid2, this.asteroid3);
    asteroid_1.setInteractive();
    asteroid_2.setInteractive();
    asteroid_3.setInteractive();

    this.input.on("gameobjectdown", function (pointer, gameObject) {
      if (gameObject == asteroid_1) {
        this.explosion = current_object.add.sprite(
          gameObject.x,
          gameObject.y,
          "explosion"
        );
        this.asteroid1X = current_object.add.sprite(
          gameObject.x,
          gameObject.y,
          "asteroid1X"
        );
        gameObject.visible = false;
        setTimeout(() => {
          this.explosion.visible = false;
          this.asteroid1X.visible = false;
        }, 500);
        setTimeout(() => {
          gameObject.x = 550;
          gameObject.y = Phaser.Math.Between(130, 350);
          gameObject.visible = true;
        }, 500);
        destroyed++;
        text.setText("Destroyed: " + destroyed);
      } else if (gameObject == asteroid_2) {
        this.explosion = current_object.add.sprite(
          gameObject.x,
          gameObject.y,
          "explosion"
        );
        this.asteroid1X = current_object.add.sprite(
          gameObject.x,
          gameObject.y,
          "asteroid2X"
        );
        gameObject.visible = false;
        setTimeout(() => {
          this.explosion.visible = false;
          this.asteroid1X.visible = false;
        }, 500);
        setTimeout(() => {
          gameObject.x = 550;
          gameObject.y = Phaser.Math.Between(130, 350);
          gameObject.visible = true;
        }, 500);
        destroyed++;
        text.setText("Destroyed: " + destroyed);
      } else if (gameObject == asteroid_3) {
        this.explosion = current_object.add.sprite(
          gameObject.x,
          gameObject.y,
          "explosion"
        );
        this.asteroid1X = current_object.add.sprite(
          gameObject.x,
          gameObject.y,
          "asteroid3X"
        );
        gameObject.visible = false;
        setTimeout(() => {
          this.explosion.visible = false;
          this.asteroid1X.visible = false;
        }, 500);
        setTimeout(() => {
          gameObject.x = 550;
          gameObject.y = Phaser.Math.Between(130, 350);
          gameObject.visible = true;
        }, 500);
        destroyed++;
        text.setText("Destroyed: " + destroyed);
      }
      if (destroyed === TOTAL_DESTROY) {
        current_object.asteroid1.destroy();
        current_object.asteroid2.destroy();
        current_object.asteroid3.destroy();
        current_object.add.text(250, 300, "Task Complete");
        sprite.tint = 0;
        Event_Center.emit("continue_scene_game", {x: x, y: y, mission: "CleanAsteroids"});
        current_scene.stop("CleanAsteroids"); 
      }
    });
  }

  update() {
    this.asteroid1.rotation -= 0.015;
    this.asteroid2.rotation += 0.015;
    this.asteroid3.rotation += 0.015;
    // this.asteroid4.rotation +=0.015;
    // this.asteroid5.rotation -=0.015;
    let lengthListItem = Phaser.Math.Between(1, 3);
    for (let i = 0; i < lengthListItem; i++) {
      this.moveItem(listItem[i], 4);
    }
  }

  moveItem(item, speed) {
    item.x -= speed;
    if (item.x < 70) {
      this.resetItemPos(item);
    }
  }

  resetItemPos(item) {
    item.x = 550;
    let randomY = Phaser.Math.Between(100, 500);
    item.y = randomY;
  }
}

export default CleanAsteroids;
