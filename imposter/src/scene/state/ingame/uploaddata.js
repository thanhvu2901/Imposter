import Phaser from "phaser";
import Base from "../../../assets/img/Upload Data/Base.png";
import Folder from "../../../assets/img/Upload Data/folderOpen0001.png";
import Folder_1 from "../../../assets/img/Upload Data/folderOpen0002.png";
import Folder_2 from "../../../assets/img/Upload Data/folderOpen0003.png";
import Folder_3 from "../../../assets/img/Upload Data/folderOpen0004.png";
import Folder_4 from "../../../assets/img/Upload Data/folderOpen0005.png";
import File from "../../../assets/img/Upload Data/fileFill.png";
import player from "../../../assets/img/Upload Data/player.png";
import Bar from "../../../assets/img/Upload Data/progressBar.png";
let x,y,file1,folder1,folder,player1,bar,rect
let move=0
class UploadData extends Phaser.Scene {
  constructor() {
    super({ key: "Upload" });
    
  }

  preload() {
    this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);      
    this.load.image("Base", Base);
    this.load.image("Folder_1", Folder);
    this.load.image("Folder_2", Folder_1);
    this.load.image("Folder_3", Folder_2);
    this.load.image("Folder_4", Folder_3);
    this.load.image("Folder_5", Folder_4);
    this.load.image("File", File);
    this.load.image("File_1", File);
    this.load.image("Bar", Bar);
    this.load.spritesheet("player",player,{ frameWidth: 84, frameHeight:128 })
  }

  create() {
    x =   this.game.renderer.width / 2


    y =   this.game.renderer.height / 2
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 24,
      repeat:-1
  });
  let test=  this.anims.create({
      key: 'open',
      frames: [
          { key: 'Folder_2' },
          {key: 'Folder_3' },
          { key: 'Folder_4'},
          { key: 'Folder_5' }

      ],
      frameRate: 8,
      repeat: 0
  });

  this.anims.create({
    key: 'close',
    frames: [
      { key: 'Folder_5' },
      { key: 'Folder_4'},
      {key: 'Folder_3' },
        { key: 'Folder_1' }

    ],
    frameRate: 8,
    repeat: 0
});
    
  test.frames[1].frame.x=6
  test.frames[2].frame.x=11
  test.frames[2].frame.y=3
  test.frames[3].frame.x=10
  test.frames[3].frame.y=5

  console.log(test.frames[2].frame.x)
  
    const ship = this.add.image(x,y, "Base");
    const file = this.add.image(x-130,y-45, "File");
   
    player1=  this.add.sprite(x-80,y-30, "player").play('walk');
    file1=  this.add.image(x-80,y-30, "File_1");
    folder = this.add.sprite(x-137,y-30, "Folder_1").play('open')
    folder1 = this.add.sprite(x+137,y-30, "Folder_1")
    bar =  this.add.image(x,y+40, "Bar");
    rect =this.add.rexRoundRectangle(x-180, y+40, 10, 10, 0, 0x00ff55);

   // this.add.rectangle()

    //  32px radius on the corners
    
    folder1.flipX=true
    //const folder1 = this.add.sprite(x-137,y-30, "Folder_2")
 //   const folder2 = this.add.sprite(x-132,y-30, "Folder_3")
//   const folder3 = this.add.sprite(x-128,y-30, "Folder_4")
 //  const folder4 = this.add.sprite(x-126,y-27, "Folder_5")
    file1.setScale(0.35)
    player1.setScale(0.5)
  }
  update(){
  //  this.folder.x+=0.5
 
console.log(rect)

 //rect.y+=0.1

  file1.x+=0.5
  player1.x+=0.5
  if(file1.x==x+60){
   
    folder1.play('open')
  
  }
  if(file1.x==x+85){
    file1.x=x-80
    player1.x=x-80
    folder1.play('close')
  }


  if(file1.x==x-80){
   
    folder.play('open')
    
    console.log("dcmms")
  }

  if(file1.x==x-50){
   
    folder.play('close')
    
    console.log("dcmms")
  }

  }
}

export default UploadData;