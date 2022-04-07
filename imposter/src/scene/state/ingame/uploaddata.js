import Phaser from "phaser";
import Base from "../../../assets/img/Upload Data/Base.png";
import Folder from "../../../assets/img/Upload Data/folderOpen0001.png";
import Folder_1 from "../../../assets/img/Upload Data/folderOpen0002.png";
import Folder_2 from "../../../assets/img/Upload Data/folderOpen0003.png";
import Folder_3 from "../../../assets/img/Upload Data/folderOpen0004.png";
import Folder_4 from "../../../assets/img/Upload Data/folderOpen0005.png";
let x,y
class UploadData extends Phaser.Scene {
  constructor() {
    super({ key: "Upload" });
  }

  preload() {
    this.load.image("Base", Base);
    this.load.image("Folder_1", Folder);
    this.load.image("Folder_2", Folder_1);
    this.load.image("Folder_3", Folder_2);
    this.load.image("Folder_4", Folder_3);
    this.load.image("Folder_5", Folder_4);

  }

  create() {
    x =   this.game.renderer.width / 2


    y =   this.game.renderer.height / 2
  let test=  this.anims.create({
      key: 'snooze',
      frames: [
          { key: 'Folder_2' },
          { x:x-132,y:y-30,key: 'Folder_3' },
          { key: 'Folder_4',x:x-128,y:y-30},
          { key: 'Folder_5',x:x-126,y:y-27 }
      ],
      frameRate: 1,
      repeat: -1
  });
    
  test.frames[1].frame.x=7
  test.frames[2].frame.x=12
  test.frames[2].frame.y=3
  test.frames[3].frame.x=12
  test.frames[3].frame.y=5

  console.log(test.frames[2].frame.x)
  
    const ship = this.add.image(x,y, "Base");
    const folder = this.add.sprite(x-137,y-30, "Folder_1").play('snooze')
    const folder1 = this.add.sprite(x+137,y-30, "Folder_1").play('snooze')
    folder1.flipX=true
    //const folder1 = this.add.sprite(x-137,y-30, "Folder_2")
 //   const folder2 = this.add.sprite(x-132,y-30, "Folder_3")
//   const folder3 = this.add.sprite(x-128,y-30, "Folder_4")
 //  const folder4 = this.add.sprite(x-126,y-27, "Folder_5")
    
  }
}

export default UploadData;