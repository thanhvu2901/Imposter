import Phaser from "phaser";
import admin_BG from "../../../assets/tasks/Swipe Card/admin_BG.png";
import admin_Card from "../../../assets/tasks/Swipe Card/admin_Card.png";
import admin_sliderBottom from "../../../assets/tasks/Swipe Card/admin_sliderBottom.png";
import admin_sliderTop from "../../../assets/tasks/Swipe Card/admin_sliderTop.png";
import admin_textBar from "../../../assets/tasks/Swipe Card/admin_textBar.png";
import admin_Wallet from "../../../assets/tasks/Swipe Card/admin_Wallet.png";
import admin_walletFront from "../../../assets/tasks/Swipe Card/admin_walletFront.png";

let text,
  textType = 0,
  textToDisplayed = [
    "PLEASE INSERT CARD",
    "PLEASE SWIPE CARD",
    "FAIL! TRY AGAIN",
    "ACCEPTED. THANK YOU",
  ];
var board, mini_card, card_holder, wallet, textBar, slider_bot, slider_top;
var target1 = new Phaser.Math.Vector2();
var target2 = new Phaser.Math.Vector2();
var start = new Phaser.Math.Vector2();
var startToCard, cardToWallet;
let leave = false;
let failed = false;
let scale = 0.75;
let finished = 0;
let x;
let y;
let sprite;
let current_scene;
let eventsCenter;

class SwipeCard extends Phaser.Scene {
  constructor() {
    super({
      key: "swipeCard",
    });
  }

  init(data) {
    x = data.x;
    y = data.y;
    sprite = data.sprite;
    eventsCenter = data.eventsCenter;
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
    current_scene = this.scene;
    board = this.add.image(512, 384, "admin_BG");
    textBar = this.add.image(512, 165, "admin_textBar");
    textBar.setDepth(3);
    mini_card = this.physics.add.image(400, 570, "admin_Card");
    mini_card.setScale(0.75, 0.75);
    mini_card.setDepth(1);
    start.x = mini_card.x;
    start.y = mini_card.y;
    wallet = this.add.image(512, 550, "admin_Wallet");
    card_holder = this.add
      .image(405, 588, "admin_walletFront")
      .setDepth(2)
      .setInteractive({ useHandCursor: true });
    slider_top = this.add.image(512, 220, "admin_sliderTop");
    slider_top.setDepth(2);
    slider_bot = this.add.image(512, 325, "admin_sliderBottom");

    card_holder.on(
      "pointerdown",
      function () {
        if (mini_card.x != 800 && mini_card.y != 312 && leave == false) {
          target1.x = 280;
          target1.y = 312;
          target2.x = 750;
          target2.y = 312;
          leave = true;
          // Move at 300 px/s:
          this.physics.moveToObject(mini_card, target1, 300);
          mini_card.setInteractive({ draggable: true });
          textType = 1;
        }
      },
      this
    );

    // Make the card holder not interactable to prevent user from selecting
    mini_card.on("pointerdown", function () {
      card_holder.removeInteractive();
    });

    mini_card.on(
      "pointerup",
      function () {
        if (mini_card.x >= target2.x - 10 && mini_card.y == target2.y) {
          mini_card.x <= target2.x
            ? mini_card.setPosition(target2.x, target2.y)
            : null;
          finished = 1;
        }
        if (
          mini_card.x >= target2.x - 10 &&
          mini_card.y == target2.y &&
          !finished
        ) {
          failed = true;
          mini_card.setPosition(target1.x, target1.y);
        }
        if (finished) {
          leave = false;
          this.physics.moveToObject(mini_card, start, 300);

          // Make the card not interactable to prevent user from selecting
          mini_card.removeInteractive();
        } else {
          failed = true;
          console.log("Type: " + textType);
          mini_card.setPosition(target1.x, target1.y);
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

    let closeBtn = this.add
      .image(830, 135, "closeBtn")
      .setInteractive({ useHandCursor: true });

    closeBtn.on("pointerdown", () => {
      this.scene.stop("swipeCard");
    });
  }

  update() {
    startToCard = Phaser.Math.Distance.Between(
      mini_card.x,
      mini_card.y,
      target1.x,
      target1.y
    );
    cardToWallet = Phaser.Math.Distance.Between(
      mini_card.x,
      mini_card.y,
      start.x,
      start.y
    );

    if (leave) {
      !failed ? (textType = 1) : (textType = 2);
      // Resize the scale of card when it is selected from wallet
      if (scale <= 1) {
        mini_card.setScale(scale);
        scale += 0.0075;
      }

      // Reset the card's position to the correct position when use function moveToObject
      if (startToCard < 4) {
        mini_card.body.reset(target1.x, target1.y);
      }

      // Check the boundary of the slider when dragging
      if (mini_card.x >= target2.x) {
        mini_card.x = target2.x;
      }
      if (mini_card.x <= target1.x) {
        mini_card.x = target1.x;
      }
    } else {
      // Reset the card's position to the correct position when use function moveToObject
      if (cardToWallet < 4) {
        if (cardToWallet < 4 && leave === false) {
          mini_card.body.reset(start.x, start.y);
        }
      }
      if (finished) {
        textType = 3;

        // Resize the card to the starting scale when game is finished and it returns to the wallet
        if (scale >= 0.75) {
          scale -= 0.0075;
          mini_card.setScale(scale);
        }

        sprite.tint = 0;
        eventsCenter.emit("continue_scene_game", {
          x: x,
          y: y,
          mission: "SwipeCard",
        });
        current_scene.stop("swipeCard");
      } else {
        textType = 0;
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
      default:
        break;
    }
  }
}

export default SwipeCard;
