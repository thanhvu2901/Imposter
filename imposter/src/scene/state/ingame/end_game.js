import Phaser from "phaser";
import win from "../../../assets/img/end/win.jpg";
import lose from  "../../../assets/img/end/lose.jpg";

let ejected,text,sample,count=0,count_1=0
class End_game extends Phaser.Scene {

  constructor() {
    super({ key: "end_game" });

  }
init(data){
  this.num=data.num
 // this.name=data.name
  this.socket=data.socket
  //this.roomKey=data.roomKey
}
  preload() {
    this.load.image('win', win);
    this.load.image('lose', lose);
  
  }

  create() {
    count=0
    switch (this.num) {
        case 1:
        this.add.image(-50,10,'win').setDepth(0).setOrigin(0,0).setScale(1.05)
            break;
        case 2:
            this.add.image(-50,10,'lose').setDepth(0).setOrigin(0,0).setScale(1.05)
            break;
        case 3:
           
            break;
    
        default:
            break;
    }
  
  }

  update() {
    count++
if(count==100){
  this.socket.emit("delete_room")
  window.location.reload();
}
  }

}

export default End_game;