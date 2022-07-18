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
import upButton from "../../../assets/img/Upload Data/uploadbutton.png"


let x, y, file1, folder1, folder, player1, bar, rect, upload_button, is_trans = false, text
let move = 0
let sprite
let current_scene;
let eventsCenter;
// hãy nhét đoạn code này vào khi hoàn thành nhiệm vụ

// sprite.tint = 0;
// Event_Center.emit("continue_scene_game", {x: x, y: y, mission: "Upload"});
// current_scene.stop("Upload")



class UploadData extends Phaser.Scene {
  init(data) {
    x = data.x;
    y = data.y;
    sprite = data.sprite;
    eventsCenter = data.eventsCenter;
  }


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
    this.load.image("File", File);
    this.load.image("File_1", File);
    this.load.image("Bar", Bar);
    this.load.spritesheet("player", player, { frameWidth: 84, frameHeight: 128 })
    this.load.image("upload-button", upButton)
  }

  create() {
    current_scene = this.scene
    x = this.game.renderer.width / 2
    y = this.game.renderer.height / 2
    let closeBtn = this.add.image(830, 135, 'closeBtn').setInteractive({ useHandCursor: true })

    closeBtn.on('pointerdown', () => {
      this.scene.stop('Upload')
    })
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 30,
      repeat: -1
    });
    let test = this.anims.create({
      key: 'open',
      frames: [
        { key: 'Folder_2' },
        { key: 'Folder_3' },
        { key: 'Folder_4' },
        { key: 'Folder_5' }
      ],
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: 'close',
      frames: [
        { key: 'Folder_5' },
        { key: 'Folder_4' },
        { key: 'Folder_3' },
        { key: 'Folder_1' }

      ],
      frameRate: 8,
      repeat: 0
    });

    test.frames[1].frame.x = 6
    test.frames[2].frame.x = 11
    test.frames[2].frame.y = 3
    test.frames[3].frame.x = 10
    test.frames[3].frame.y = 5


    const ship = this.add.image(x, y, "Base");
    const file = this.add.image(x - 130, y - 45, "File");

    player1 = this.add.sprite(x - 80, y - 30, "player").play('walk').setActive(false).setVisible(false);
    file1 = this.add.image(x - 80, y - 30, "File_1").setActive(false).setVisible(false)
    folder = this.add.sprite(x - 137, y - 30, "Folder_1").play('open')
    folder1 = this.add.sprite(x + 137, y - 30, "Folder_1")
    bar = this.add.image(x - 20, y + 40, "Bar");
    text = this.add.text(x + 180, y + 30, "", { font: '20px Courier', fill: '#ffffff' }).setScrollFactor(0);
    rect = this.add.rectangle(x - 208, y + 40, 0, 10, 0x00ff14);
    upload_button = this.add.image(x, y + 75, "upload-button").setInteractive()
    upload_button.on('pointerdown', () => {
      upload_button.setTint(0xdadada)
      is_trans = true
      player1.setActive(true).setVisible(true)
      file1.setActive(true).setVisible(true)
    })
    upload_button.on('pointerup', () => {
      upload_button.clearTint()
    })
    folder1.flipX = true
    //const folder1 = this.add.sprite(x-137,y-30, "Folder_2")
    //   const folder2 = this.add.sprite(x-132,y-30, "Folder_3")
    //   const folder3 = this.add.sprite(x-128,y-30, "Folder_4")
    //  const folder4 = this.add.sprite(x-126,y-27, "Folder_5")
    file1.setScale(0.35)
    player1.setScale(0.5)
  }
  update() {
    if (is_trans == true) {
      rect.width += 3
      file1.x += 3
      player1.x += 3
      text.setText((rect.width / 376 * 100).toFixed(0) + "%")
      console.log()
      if (file1.x >= x + 60) {

        folder1.play('open')

      }
      if (file1.x >= x + 85) {
        file1.x = x - 80
        player1.x = x - 80
        folder1.play('close')
      }


      if (file1.x <= x - 80) {

        folder.play('open')


      }

      if (file1.x <= x - 50) {

        folder.play('close')


      }
      //mini game finished 
      if (rect.width == 375) {
        sprite.tint = 0;
        eventsCenter.emit("continue_scene_game", { x: x, y: y, mission: "Upload" });
        current_scene.stop("Upload")
      }
    }
  }
}

export default UploadData;