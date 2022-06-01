import Phaser from "phaser";

import Game from "../../game";
import giude from "../../../assets/img/guideMap.png";
import player from "../../../assets/img/idle.png"
let circle
class Map_1 extends Phaser.Scene {
  
  constructor() {
    super({ key: "mini-map" });
   
  }

  preload() {

   this.load.image("map",giude)
   this.load.image("player",player)
  }

  create(){
   let x =   this.game.renderer.width / 2
 let   y =   this.game.renderer.height / 2

this.add.image(x,y,"map")
circle=this.add.image(x,y,"player").setScale(0.25)
this.scene.get("game").events.on("moving",(data)=>{
    console.log(data)
    circle.x=data[0]/4+508
    circle.y=data[1]/4+380
})
  }

  update(){


  }
   
}

export default Map_1;