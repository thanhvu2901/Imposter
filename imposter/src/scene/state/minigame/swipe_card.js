import Phaser from "phaser";
import admin_BG from "../../../assets/tasks/Swipe Card/admin_BG.png";
import admin_Card from "../../../assets/tasks/Swipe Card/admin_Card.png";
import admin_sliderBottom from "../../../assets/tasks/Swipe Card/admin_sliderBottom.png";
import admin_textBar from "../../../assets/tasks/Swipe Card/admin_textBar.png";
import admin_Wallet from "../../../assets/tasks/Swipe Card/admin_Wallet.png";
import admin_walletFront from "../../../assets/tasks/Swipe Card/admin_walletFront.png";

var board, card, mini_card, card_holder, wallet, textBar;
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
    mini_card = this.add.image(512, 384, "admin_Card");
    mini_card.setScale(0.5, 0.5);
    card_holder = this.add.image(525, 384, "admin_walletFront");
    container = this.add.container(10, 20, [card_holder, mini_card]);
    container.setSize(card_holder.width, card_holder.height);
    wallet = this.add.image(512, 550, "admin_Wallet");
    
  }
  update() {}
}

export default SwipeCard;
