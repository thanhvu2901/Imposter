import Phaser from "phaser";
import admin_BG from "../../../assets/tasks/Swipe Card/admin_BG.png";
import admin_Card from "../../../assets/tasks/Swipe Card/admin_Card.png";
import admin_sliderBottom from "../../../assets/tasks/Swipe Card/admin_sliderBottom.png";
import admin_sliderTop from "../../../assets/tasks/Swipe Card/admin_sliderTop.png";
import admin_textBar from "../../../assets/tasks/Swipe Card/admin_textBar.png";
import admin_Wallet from "../../../assets/tasks/Swipe Card/admin_Wallet.png";
import admin_walletFront from "../../../assets/tasks/Swipe Card/admin_walletFront.png";
let text;
var board, mini_card, card_holder, wallet, textBar, slider_bot, slider_top;

var target1 = new Phaser.Math.Vector2();
var target2 = new Phaser.Math.Vector2();
var start = new Phaser.Math.Vector2();
var distance1, distance2;
let leave = false;
let move;
let outRanged = false;
let step = 0;
let scale = 0.75;
let finished = false;
class SwipeCard extends Phaser.Scene {
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
    board = this.add.image(512, 384, "admin_BG");
    // card = this.add.image(512, 384, "admin_Card");
    mini_card = this.physics.add.image(400, 570, "admin_Card").setInteractive();
    mini_card.setScale(0.75, 0.75);
    mini_card.setDepth(1);
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
      function (pointer) {
        if (mini_card.x != 800 && mini_card.y != 312 && leave == false) {
          target1.x = 280;
          target1.y = 312;
          target2.x = 750;
          target2.y = 312;
          leave = true;
          // Move at 300 px/s:
          move = this.physics.moveToObject(mini_card, target1, 300);

          this.input.setDraggable(mini_card);
        }
      },
      this
    );
    text = this.add
      .text(10, 10, "Cursors to move", {
        font: "16px Courier",
        fill: "#00ff00",
      })
      .setScrollFactor(0);

    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      console.log(gameObject.speed)
    });

  }

  update() {
    step += 1;
    //console.log(leave)
    if (leave === true && scale <= 1) {
      mini_card.setScale(scale);
      scale += 0.0075;
    }
    //  console.log(mini_card.getScale())
    distance1 = Phaser.Math.Distance.Between(
      mini_card.x,
      mini_card.y,
      target1.x,
      target1.y
    );
    distance2 = Phaser.Math.Distance.Between(
      mini_card.x,
      mini_card.y,
      target2.x,
      target2.y
    );
    if (mini_card.x >= target2.x && leave) {
      mini_card.x = target2.x;
    }
    if (mini_card.x <= target1.x && leave) {
      mini_card.x = target1.x;
    }
    if (mini_card.x == target2.x) {
      finished = true;
    }
    if (finished) {
      move = this.physics.moveToObject(mini_card, start, 300);
    }
    if (mini_card.x == start.x && mini_card.y == start.y && finished) {
      leave = false;
      finished = false;
      move.stop();
      scale = 0.75;
    }

    if (mini_card.body.speed > 0) {
      if (distance1 < 4) {
        mini_card.body.reset(target1.x, target1.y);
      }
    }
    if (outRanged) {
      mini_card.body.reset(target1.x, target1.y);
      outRanged = false;
    }

    text.setText([
      "screen x: " + this.input.x,
      "screen y: " + this.input.y,
      "card speed: " + mini_card.body.speed,
      "card x: " + mini_card.x,
    ]);
  }
}

export default SwipeCard;
