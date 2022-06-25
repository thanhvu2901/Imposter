import Phaser from "phaser";
import board from "../../../assets/img/SetCourse/board.png";
import ship from "../../../assets/img/SetCourse/ship.png";
import ring from "../../../assets/img/SetCourse/ring-2.png";
import ring_2 from "../../../assets/img/SetCourse/ring-1.png";
import dot_1 from "../../../assets/img/SetCourse/dot1.png";
import dot_2 from "../../../assets/img/SetCourse/dot2.png";
import dashed from "../../../assets/img/SetCourse/dashed.png";

let ring1,ring2,ring3,ring4
let dot1,dot2,dot3,dot4
let text;
var ship1;
let x, y;
let eventsCenter;
let sprite, current_scene;
let complete_ring_2 = false;
let complete_ring_3 = false;
let complete_ring_4 = false;

class ChartCourse extends Phaser.Scene {
  init(data) {
    x = data.x;
    y = data.y;
    sprite = data.sprite;
    eventsCenter = data.eventsCenter;
  }

  constructor() {
    super({ key: "Course" });
    
  }

  preload() {
    this.load.image("Course", board,300,600);
    this.load.image("Space_ship",ship)
    this.load.image("ring",ring)
    this.load.image("ring-1",ring_2)
    this.load.image("dot",dot_1)
    this.load.image("dot2",dot_2)
    this.load.image("dashed",dashed)
  }

  create() {
    current_scene = this.scene
    const board = this.add.image(303, 303, "Course");
   
     text = this.add.text(10, 10, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);
     console.log(this)
   
  var line = new Phaser.Curves.Line([141, 233, 214, 328]);
  var line1 = new Phaser.Curves.Line([214, 328, 360, 232]);
  var line2 = new Phaser.Curves.Line([360, 232, 494, 327]);
  var group = this.add.group({ key: 'dashed', frameQuantity: 15 });
  var group1 = this.add.group({ key: 'dashed', frameQuantity: 20 });
  var group2 = this.add.group({ key: 'dashed', frameQuantity: 25 });
  var path= this.add.path()
  var path1= this.add.path()
  var path2= this.add.path()
  path.add(line)
  path1.add(line1)
  path2.add(line2)
  //Phaser.Actions.PlaceOnLine(group.getChildren(), line);
  
//   var container = this.add.container(0,0,group.getChildren())
//  //this.physics.add.group({ key: 'dot', frameQuantity: 10 });
//  this.tweens.add({
//   targets: container,
//   // y: 328,
//   // x: 214,
//   repeat:-1,
//   delay:5000
// });
//group.rotation+=90
 for (var i = 0; i < group.children.entries.length; i++) {
  const mover = this.add.follower(path, 0, 0, group.children.entries[i].texture.key);

  mover.startFollow({
    positionOnPath: true,
       // duration: -1,
        yoyo: false,
        rotateToPath:90,
        repeat: -1,
       // rotateToPath: false,
    //    verticalAdjust: true,
        delay: i*100
  });
  
 // group.getChildren()[i].setVelocityXY = 40;
}
for (var i = 0; i < group.children.entries.length; i++) {
  const mover = this.add.follower(path1, 0, 0, group.children.entries[i].texture.key);

  mover.startFollow({
    positionOnPath: true,
       // duration: -1,
        yoyo: false,
        rotateToPath:90,
        repeat: -1,
       // rotateToPath: false,
    //    verticalAdjust: true,
        delay: i*100
  });
  
 // group.getChildren()[i].setVelocityXY = 40;
}

for (var i = 0; i < group.children.entries.length; i++) {
  const mover = this.add.follower(path2, 0, 0, group.children.entries[i].texture.key);

  mover.startFollow({
    positionOnPath: true,
       // duration: -1,
        yoyo: false,
        rotateToPath:90,
        repeat: -1,
       // rotateToPath: false,
    //    verticalAdjust: true,
        delay: i*100
  });
  
 // group.getChildren()[i].setVelocityXY = 40;
}

ship1 = this.add.image(140, 232, "Space_ship");
//  ring1= this.add.image(142,235,"ring")
  ring2= this.add.image(214,332,"ring")
  ring3= this.add.image(362,233,"ring")
  ring4= this.add.image(495,331,"ring")

  dot1= this.add.image(142,235,"dot2")
  dot2= this.add.image(214,332,"dot2")
  dot3= this.add.image(362,233,"dot2")
  dot4= this.add.image(495,331,"dot2")
  ship1.setInteractive()
  this.input.setDraggable(ship1);
  this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

    gameObject.x = dragX;
    gameObject.y = dragY;

});
  }

  update(){
   // ring1.rotation -=0.04
    ring2.rotation -=0.04
    ring3.rotation -=0.04
    ring4.rotation -=0.04
    text.setText([
      'screen x: ' + this.input.x,
      'screen y: ' + this.input.y,
      'ship x: ' + ship1.x,
      'ship y: ' + ship1.y,

      
  ]);
  check(ship1, ring2, dot2, this, "ring2")
  check(ship1, ring3, dot3, this, "ring3")
  check(ship1, ring4, dot4, this, "ring4")
  
  if(complete_ring_2 && complete_ring_3 && complete_ring_4)
  {
    sprite.tint = 0;
    eventsCenter.emit("continue_scene_game", {x: x, y: y, mission: "ChartCourse"});
    current_scene.stop("Course");
  }
  //ship1.body.velo
  // if (this.input.mousePointer.isDown)
  // {
  //     //  400 is the speed it will move towards the mouse
  //     this.physics.arcade.moveToPointer(ship1, 400);

  //     //  if it's overlapping the mouse, don't move any more
  //     if (Phaser.Rectangle.contains(ship1.body, this.input.x, this.input.y))
  //     {
  //         ship1.body.velocity.setTo(0, 0);
  //     }
  // }
  // else
  // {
  //     ship1.body.velocity.setTo(0, 0);
  // }
   }
   
}
function check(ob1,ob2,ob3,game, completed_ring){
  let tempx=ob2.x;
  let tempy=ob2.y;
 if(ob1.x<=ob2.x+10&&ob1.x>=ob2.x-10&&ob1.y<=ob2.y+10&&ob1.y>=ob2.y-10){
   ob2.destroy()
 //  ob2=null;
   ob3=game.add.image(tempx,tempy,"dot2");
  // ob2.rotation +=0.05;

  switch(completed_ring) {
    case "ring2":
      complete_ring_2 = true;
      break;
    case "ring3":
      complete_ring_3 = true;
      break;
    case "ring4":
      complete_ring_4 = true;
      break;
  }
  
 }


}
export default ChartCourse;