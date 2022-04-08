import Phaser from "phaser";
import admin_BG from "../../../assets/tasks/Swipe Card/admin_BG.png";
import admin_Card from "../../../assets/tasks/Swipe Card/admin_Card.png";
import admin_sliderBottom from "../../../assets/tasks/Swipe Card/admin_sliderBottom.png";
import admin_textBar from "../../../assets/tasks/Swipe Card/admin_textBar.png";
import admin_Wallet from "../../../assets/tasks/Swipe Card/admin_Wallet.png";
import admin_walletFront from "../../../assets/tasks/Swipe Card/admin_walletFront.png";

var board, card, mini_card, wallet_front, wallet, textBar;
var container;

class SwipeCard extends Phaser.Scene {
  preload() {
    this.load.image("admin_BG", admin_BG);
    this.load.image("admin_Card", admin_Card);
    this.load.image("admin_sliderBottom", admin_sliderBottom);
    this.load.image("admin_textBar", admin_textBar);
    this.load.image("admin_Wallet", admin_Wallet);
    this.load.image("admin_walletFront", admin_walletFront);
  }
  create() {
    board = this.add.image(512, 384, "admin_BG");
    // card = this.add.image(512, 384, "admin_Card");
    mini_card = this.add.image(-105, 20, "admin_Card");
    mini_card.setScale(0.75, 0.75);
    mini_card.setDepth(1);
    wallet = this.add.image(0, 0, "admin_Wallet");
    wallet_front = this.add.image(-105, 40, "admin_walletFront");
    wallet_front.setDepth(2);
    container = this.add.container(512, 550, [wallet, mini_card, wallet_front]);
    container.setInteractive(new Phaser.Geom.Rectangle(-220, -50, mini_card.width, mini_card.height), Phaser.Geom.Rectangle.Contains);
    this.input.enableDebug(container, 0xff00ff);
    container.on("pointerdown", function() {
      console.log("pointerdown");
    })
    // container.on("pointerup", function() {})
    
  }
  update() {}
}

export default SwipeCard;
