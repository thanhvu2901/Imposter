import Phaser from "phaser";
import admin_BG from "../../../assets/tasks/Swipe Card/admin_BG.png";
import admin_Card from "../../../assets/tasks/Swipe Card/admin_Card.png";
import admin_sliderBottom from "../../../assets/tasks/Swipe Card/admin_sliderBottom.png";
import admin_sliderTop from "../../../assets/tasks/Swipe Card/admin_sliderTop.png";
import admin_textBar from "../../../assets/tasks/Swipe Card/admin_textBar.png";
import admin_Wallet from "../../../assets/tasks/Swipe Card/admin_Wallet.png";
import admin_walletFront from "../../../assets/tasks/Swipe Card/admin_walletFront.png";
import Event_Center from "../../../helper/event_center";


let text,
  textType = 0,
  textToDisplayed = [
    "PLEASE INSERT CARD",
    "PLEASE SWIPE CARD",
    "TOO FAST. TRY AGAIN",
    "TOO SLOW. TRY AGAIN",
    "ACCEPTED. THANK YOU",
  ];
var board, mini_card, card_holder, wallet, textBar, slider_bot, slider_top;
var target1 = new Phaser.Math.Vector2();
var target2 = new Phaser.Math.Vector2();
var start = new Phaser.Math.Vector2();
var distance1, distance2;
let leave = false;
let move;
let step = 0;
let scale = 0.75;
let finished = 0;
let x;
let y;
let sprite;
let current_scene;

class SwipeCard extends Phaser.Scene {
  init(data) {
    x = data.x;
    y = data.y;
    sprite = data.sprite;
  }

  preload() {
    this.load.image("admin_BG", admin_BG);
    this.load.image("admin_Card", admin_Card);
    this.load.image("admin_sliderBottom", admin_sliderBottom);
    this.load.image("admin_sliderTop", admin_sliderTop);
    this.load.image("admin_textBar", admin_textBar);
    this.load.image("admin_Wallet", admin_Wallet);
    this.load.image("admin_walletFront", admin_walletFront);
  }
  create() {
    current_scene = this.scene
    board = this.add.image(512, 384, "admin_BG");
    textBar = this.add.image(512, 165, "admin_textBar");
    textBar.setDepth(3);
    mini_card = this.physics.add.image(400, 570, "admin_Card");
    mini_card.setScale(0.75, 0.75);
    mini_card.setDepth(1);
    mini_card.setInteractive();
    start.x = mini_card.x;
    start.y = mini_card.y;
    wallet = this.add.image(512, 550, "admin_Wallet");
    card_holder = this.add.image(405, 588, "admin_walletFront");
    card_holder.setDepth(2);
    slider_top = this.add.image(512, 220, "admin_sliderTop");
    slider_top.setDepth(2);
    slider_bot = this.add.image(512, 325, "admin_sliderBottom");

    this.input.on(
      "pointerdown",
      function () {
        if (mini_card.x != 800 && mini_card.y != 312 && leave == false) {
          target1.x = 280;
          target1.y = 312;
          target2.x = 750;
          target2.y = 312;
          leave = true;
          // Move at 300 px/s:
          move = this.physics.moveToObject(mini_card, target1, 300);

          this.input.setDraggable(mini_card);
          textType = 1;
        }
      },
      this
    );
    this.input.on(
      "pointerup",
      function () {
        if (mini_card.x == target2.x && mini_card.y == target2.y) {
          finished = 1;
        }
      },
      this
    );
    text = this.add
      .text(312, 152, "Cursors to move", {
        font: "28px Courier",
        fill: "#ffffff",
      })
      .setScrollFactor(0);
    text.setDepth(3);

    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
    });
  }

  update() {
    step += 1;
    // Update the scale of card when it is selected from wallet
    if (leave === true && scale <= 1) {
      mini_card.setScale(scale);
      scale += 0.0075;
    }
    // Update the scale of card when game is finished and it is returned to wallet
    if (finished == -1 && scale >= 0.75) {
      scale -= 0.0075;
      mini_card.setScale(scale);
    }
    distance1 = Phaser.Math.Distance.Between(
      mini_card.x,
      mini_card.y,
      target1.x,
      target1.y
    );
    distance2 = Phaser.Math.Distance.Between(
      mini_card.x,
      mini_card.y,
      start.x,
      start.y
    );

    // Check the boundary of the slider for dragging
    if (mini_card.x >= target2.x && leave) {
      mini_card.x = target2.x;
    }
    if (mini_card.x <= target1.x && leave) {
      mini_card.x = target1.x;
    }

    // Return card to wallet when game is finished
    if (finished == 1) {

      move = this.physics.moveToObject(mini_card, start, 300);
      finished = -1;
      leave = false;
      textType = 4;

      sprite.tint = 0;
      Event_Center.emit("continue_scene_game", {x: x, y: y, mission: "SwipeCard"});
      current_scene.stop("SwipeCard");
    }

    // Check if card is in the right place
    if (mini_card.body.speed > 0) {
      if (distance1 < 4 && leave === true) {
        mini_card.body.reset(target1.x, target1.y);
      }
      if (distance2 < 4 && leave === false) {
        mini_card.body.reset(start.x, start.y);
      }
    }

    switch (textType) {
      case 0:
        text.setText(textToDisplayed[0]);
        break;
      case 1:
        text.setText(textToDisplayed[1]);
        break;
      case 2:
        text.setText(textToDisplayed[2]);
        break;
      case 3:
        text.setText(textToDisplayed[3]);
        break;
      case 4:
        text.setText(textToDisplayed[4]);
        break;
      default:
        break;
    }
  }
}

export default SwipeCard;
