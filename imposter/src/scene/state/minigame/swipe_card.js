import Phaser from "phaser";
import admin_BG from "../../../assets/tasks/Swipe Card/admin_BG.png";
import admin_Card from "../../../assets/tasks/Swipe Card/admin_Card.png";
import admin_sliderBottom from "../../../assets/tasks/Swipe Card/admin_sliderBottom.png";
import admin_textBar from "../../../assets/tasks/Swipe Card/admin_textBar.png";
import admin_Wallet from "../../../assets/tasks/Swipe Card/admin_Wallet.png";
import admin_walletFront from "../../../assets/tasks/Swipe Card/admin_walletFront.png";
let text;
var board, card, mini_card, card_holder, wallet, textBar;
var container;

var target = new Phaser.Math.Vector2();
let leave=false;
let move
let step=0
let scale=0.5
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
    mini_card = this.physics.add.image(512, 384, "admin_Card").setInteractive();
    mini_card.setScale(0.5, 0.5);
    card_holder = this.add.image(525, 384, "admin_walletFront");
    // container = this.add.container(10, 20, [card_holder, mini_card]);
    // container.setSize(card_holder.width, card_holder.height);
    wallet = this.add.image(512, 550, "admin_Wallet");
    

    this.input.on('pointerdown', function (pointer) {
if(mini_card.x!=402&& mini_card.y!=256&&leave==false){
      target.x = 402;
      target.y = 256;
      leave=true
      // Move at 200 px/s:
   move=   this.physics.moveToObject(mini_card, target, 200);
  
     
      this.input.setDraggable(mini_card);

}
  }, this);
  text = this.add.text(10, 10, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);

  this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

    gameObject.x = dragX;
   // gameObject.y = dragY;

});
  }
  
  update() {
   step+=1
   //console.log(leave)
   if(leave===true&&scale<=1){
     mini_card.setScale(scale)
     scale+=0.009
   }
  //  console.log(mini_card.getScale())
    text.setText([
      'screen x: ' + this.input.x,
      'screen y: ' + this.input.y,
  ]);
  var distance = Phaser.Math.Distance.Between(mini_card.x, mini_card.y, target.x, target.y);

  if (mini_card.body.speed > 0)
  {
      if (distance < 4)
      {
          mini_card.body.reset(target.x, target.y);
      }
  }
  }
}

export default SwipeCard;
