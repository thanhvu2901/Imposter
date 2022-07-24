import Phaser from "phaser";
import engine_ from "../../../assets/img/Fuel Engines/engine_fuel.png";
import base from "../../../assets/img/Fuel Engines/base.png";
import button from "../../../assets/img//Fuel Engines/button.png";
import wire from "../../../assets/img//Fuel Engines/wire.png";
import light from "../../../assets/img//Fuel Engines/light.png";
let ring1,ring2,ring3,ring4
let dot1,dot2,dot3,dot4
let text;
var ship1;
let x
let y
let button_
let ispressed=false
let isfull = false
let r1
let r2
let step = 0
let light_,light_1
class FuelEngine_1 extends Phaser.Scene {
  
  constructor() {
    super({ key: "Fuel_1" });
   
  }

  preload() {
    this.load.image("fuel_", engine_);
    this.load.image("button", button);
    this.load.image("base", base);
    this.load.image("wire", wire);
    this.load.image("light", light);
  }

  create() {
 
  x =   this.game.renderer.width / 2
  y =   this.game.renderer.height / 2
    text = this.add.text(10, 10, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);
     r1 = this.add.rectangle(x-10, y+155, 80, 0, 0xFFBB35);
     r2 = this.add.rectangle(x+49, y-195, 65,45 , 0xFFBB35);
    const gas = this.add.image(x,y , "fuel_")
    
    r2.rotation=3.7
    const base_ = this.add.image(x+280,y+188 , "base");
     button_ = this.add.image(x+280,y+188 , "button");
    const wire_ = this.add.image(x+200,y+188 , "wire");
    light_ = this.add.image(x+310,y+120 , "light");
   light_1 = this.add.image(x+250,y+120 , "light");
    light_1.setTint('0xFF2828')
  button_.setInteractive().on('pointerup',() => {
    button_.clearTint()
    ispressed=false
  })
  button_.setInteractive().on('pointerout',() => {
    button_.clearTint()
  })
  
  
  button_.setInteractive().on('pointerdown', function (pointer) {
   
    button_.setTint('0xBCBCBC')
    ispressed=true
      
   

});


  }

  update(){
    text.setText([
      'screen x: ' + this.input.x,
      'screen y: ' + this.input.y,
   
      
  ]);
//   step++
//   if(step==6){
//     r2.x+=15
//   }
//   if(step==25){
//     r2.x+=25
//   }
//   if(step==35){
//     r2.x-=40
//     step=0
//   }
  if(ispressed==true&&isfull==false){
    r1.height-=5;
    r2.width-=0.96
    

  }
  if(r1.height*-197/310==197){
    console.log("ok")
    isfull=true
    light_1.clearTint()
    light_.setTint('0x04FF00')
  }
   }
   
}

export default FuelEngine_1;