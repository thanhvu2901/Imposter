import Phaser from "phaser";
import background from "../../../assets/img/star_background.jpg";
import eject from  "../../../assets/img/logo.png";

let ejected,text,sample,count=0,count_1=0
class Vote_status extends Phaser.Scene {

  constructor() {
    super({ key: "vote_state" });

  }
init(data){
  this.num=data.num
  this.name=data.name
  this.socket=data.socket
  this.roomKey=data.roomKey
}
  preload() {
    this.load.image('star_background', background);
    this.load.image('eject', eject);
  
  }

  create() {
    count=0
    count_1=0
    sample="meo meo meo meo"
    switch (this.num) {
        case 1:
            sample="player "+`${this.name}` +" is an imposter"
            break;
        case 2:
            sample="player "+`${this.name}` +" is not an imposter"
            break;
        case 3:
            sample="skipped no one get ejected"
            break;
    
        default:
            break;
    }
    this.add.image(0, 0, 'star_background').setDepth(0).setOrigin(0).setScale(1.9);
    ejected=  this.add.image(100, 350, 'eject').setDepth(1);
    text = this.add.text(250,350,"",{
        fontSize: "40px",
        color: "#ffffff",
        fontFamily: "Arial",
        stroke: "#000000",
        strokeThickness: 3,
      })
  }

  update() {
    count++
    if(count%1===0&&count>40){
        count_1++
    }
    
if(count_1<sample.length+1){
    text.setText(sample.slice(0,count_1))
}
ejected.rotation+=0.03
ejected.x+=2

if(count==150){
  this.socket.emit("check_",this.roomKey)
    this.scene.stop()
}
  }

}

export default Vote_status;