import Phaser from "phaser";
import boardBase from "../../../assets/tasks/Clean O2 Filter/o2_bgBase.png";
import leaf1 from "../../../assets/tasks/Clean O2 Filter/o2_leafs/o2_leaf1.png";
import leaf2 from "../../../assets/tasks/Clean O2 Filter/o2_leafs/o2_leaf2.png";
import leaf3 from "../../../assets/tasks/Clean O2 Filter/o2_leafs/o2_leaf3.png";
import leaf4 from "../../../assets/tasks/Clean O2 Filter/o2_leafs/o2_leaf4.png";
import leaf5 from "../../../assets/tasks/Clean O2 Filter/o2_leafs/o2_leaf5.png";
import leaf6 from "../../../assets/tasks/Clean O2 Filter/o2_leafs/o2_leaf6.png";
import leaf7 from "../../../assets/tasks/Clean O2 Filter/o2_leafs/o2_leaf7.png";
import boardTop from "../../../assets/tasks/Clean O2 Filter/o2_bgTop.png";
import leftArrow1 from "../../../assets/tasks/Clean O2 Filter/leftArrow-o2_arrowFlash/leftArrow-o2_arrowFlash0001.png";
import rightArrow1 from "../../../assets/tasks/Clean O2 Filter/rightArrow-o2_arrowFlash/rightArrow-o2_arrowFlash0001.png";
import leftComplete from "../../../assets/tasks/Clean O2 Filter/o2_arrowFinishedLeft.png";
import rightComplete from "../../../assets/tasks/Clean O2 Filter/o2_arrowFinishedRight.png";

import Event_Center from "../../../helper/event_center";

let leaf_1, leaf_2, leaf_3, leaf_4, leaf_5, leaf_6, leaf_7;
const TOTAL_LEAF = 7;
let x;
let y;
let sprite;
let eventsCenter;

class CleanO2Filter extends Phaser.Scene {
  init(data) {
    x = data.x;
    y = data.y;
    sprite = data.sprite;
    eventsCenter = data.eventsCenter;
  }

  constructor() {
    super({ key: "CleanO2Filter" });
  }

  preload() {
    this.load.image("boardBase", boardBase, 300, 600);
    this.load.image("leaf1", leaf1);
    this.load.image("leaf2", leaf2);
    this.load.image("leaf3", leaf3);
    this.load.image("leaf4", leaf4);
    this.load.image("leaf5", leaf5);
    this.load.image("leaf6", leaf6);
    this.load.image("leaf7", leaf7);
    this.load.image("boardTop", boardTop);
    this.load.image("leftArrow1", leftArrow1);
    this.load.image("rightArrow1", rightArrow1);
    this.load.image("leftComplete", leftComplete);
    this.load.image("rightComplete", rightComplete);
  }

  create() {
    let current_object = this;
    let number_leaf = 0;
    const current_scene = this.scene;
    const boardBase = this.add.image(303, 303, "boardBase");
    leaf_1 = this.add.image(260, 132, "leaf1");
    leaf_2 = this.add.image(360, 232, "leaf2");
    leaf_3 = this.add.image(310, 373, "leaf3");
    leaf_4 = this.add.image(460, 308, "leaf4");
    leaf_5 = this.add.image(230, 470, "leaf5");
    leaf_6 = this.add.image(390, 182, "leaf6");
    leaf_7 = this.add.image(450, 391, "leaf7");
    const boardTop = this.add.image(104.5, 303, "boardTop");

    leaf_1.setInteractive();
    this.input.setDraggable(leaf_1);
    leaf_2.setInteractive();
    this.input.setDraggable(leaf_2);
    leaf_3.setInteractive();
    this.input.setDraggable(leaf_3);
    leaf_4.setInteractive();
    this.input.setDraggable(leaf_4);
    leaf_5.setInteractive();
    this.input.setDraggable(leaf_5);
    leaf_6.setInteractive();
    this.input.setDraggable(leaf_6);
    leaf_7.setInteractive();
    this.input.setDraggable(leaf_7);

    let closeBtn = this.add.image(830, 135, 'closeBtn').setInteractive({ useHandCursor: true })

    closeBtn.on('pointerdown', () => {
      this.scene.stop('CleanO2Filter')
    })

    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
      if (gameObject.x < 104.5 && 252 < gameObject.y && gameObject.y < 357) {
        gameObject.destroy();
        number_leaf++;
        if (number_leaf === TOTAL_LEAF) {
          current_object.add.image(80, 300, "leftComplete");
          current_object.add.image(140, 303, "rightComplete");
          current_object.add.text(290, 250, "Task Completed");
          sprite.tint = 0;
          eventsCenter.emit("continue_scene_game", { x: x, y: y, mission: "CleanO2Filter" });
          current_scene.stop("CleanO2Filter");
        }
      }
      if (number_leaf !== TOTAL_LEAF) {
        current_object.add.image(80, 300, "leftArrow1");
        current_object.add.image(140, 303, "rightArrow1");
      }
    });
  }

  update() {
    leaf_1.rotation -= 0.005;
    leaf_2.rotation += 0.005;
    leaf_3.rotation -= 0.005;
    leaf_4.rotation += 0.005;
    leaf_5.rotation -= 0.005;
    leaf_6.rotation -= 0.005;
    leaf_7.rotation += 0.005;
  }
}

export default CleanO2Filter;
