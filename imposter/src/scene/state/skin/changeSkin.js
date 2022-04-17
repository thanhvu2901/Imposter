import Phaser from "phaser";
import player from "../../../assets/skin/idle.png";
import hat1 from "../../../assets/skin/Hats/hats0001.png";
import hat2 from "../../../assets/skin/Hats/hats0002.png";
import hat3 from "../../../assets/skin/Hats/hats0003.png";
import hat4 from "../../../assets/skin/Hats/hats0004.png";
import hat5 from "../../../assets/skin/Hats/hats0005.png";
import hat6 from "../../../assets/skin/Hats/hats0006.png";
import hat7 from "../../../assets/skin/Hats/hats0007.png";
import hat8 from "../../../assets/skin/Hats/hats0008.png";
import hat9 from "../../../assets/skin/Hats/hats0009.png";
import hat10 from "../../../assets/skin/Hats/hats0010.png";
import hat11 from "../../../assets/skin/Hats/hats0011.png";
import hat12 from "../../../assets/skin/Hats/hats0012.png";
import hat13 from "../../../assets/skin/Hats/hats0013.png";
import hat14 from "../../../assets/skin/Hats/hats0014.png";
import hat15 from "../../../assets/skin/Hats/hats0015.png";
import hat16 from "../../../assets/skin/Hats/hats0016.png";
import hat17 from "../../../assets/skin/Hats/hats0017.png";
import hat18 from "../../../assets/skin/Hats/hats0018.png";
import hat19 from "../../../assets/skin/Hats/hats0019.png";
import hat20 from "../../../assets/skin/Hats/hats0020.png";
import hat21 from "../../../assets/skin/Hats/hats0021.png";
import hat22 from "../../../assets/skin/Hats/hats0022.png";
import hat23 from "../../../assets/skin/Hats/hats0023.png";
import hat24 from "../../../assets/skin/Hats/hats0024.png";
import hat25 from "../../../assets/skin/Hats/hats0025.png";
import hat26 from "../../../assets/skin/Hats/hats0026.png";
import hat27 from "../../../assets/skin/Hats/hats0027.png";
import hat28 from "../../../assets/skin/Hats/hats0028.png";
import hat29 from "../../../assets/skin/Hats/hats0029.png";
import hat30 from "../../../assets/skin/Hats/hats0030.png";
import hat31 from "../../../assets/skin/Hats/hats0031.png";
import hat32 from "../../../assets/skin/Hats/hats0032.png";
import hat33 from "../../../assets/skin/Hats/hats0033.png";
import hat34 from "../../../assets/skin/Hats/hats0034.png";
import hat35 from "../../../assets/skin/Hats/hats0035.png";
import hat36 from "../../../assets/skin/Hats/hats0036.png";
import hat37 from "../../../assets/skin/Hats/hats0037.png";
import hat38 from "../../../assets/skin/Hats/hats0038.png";
import hat39 from "../../../assets/skin/Hats/hats0039.png";
import hat40 from "../../../assets/skin/Hats/hats0040.png";
import hat41 from "../../../assets/skin/Hats/hats0041.png";
import hat42 from "../../../assets/skin/Hats/hats0042.png";
import hat43 from "../../../assets/skin/Hats/hats0043.png";
import hat44 from "../../../assets/skin/Hats/hats0044.png";
import hat45 from "../../../assets/skin/Hats/hats0045.png";
import hat46 from "../../../assets/skin/Hats/hats0046.png";
import hat47 from "../../../assets/skin/Hats/hats0047.png";
import hat48 from "../../../assets/skin/Hats/hats0048.png";
import trouser0 from "../../../assets/skin/Trousers/trouser0.png";
import trouser1 from "../../../assets/skin/Trousers/trouser1.png";
import trouser2 from "../../../assets/skin/Trousers/trouser2.png";
import trouser3 from "../../../assets/skin/Trousers/trouser3.png";
import trouser4 from "../../../assets/skin/Trousers/trouser4.png";
import trouser5 from "../../../assets/skin/Trousers/trouser5.png";
import trouser6 from "../../../assets/skin/Trousers/trouser6.png";
import trouser7 from "../../../assets/skin/Trousers/trouser7.png";
import trouser8 from "../../../assets/skin/Trousers/trouser8.png";
import trouser9 from "../../../assets/skin/Trousers/trouser9.png";
import trouser10 from "../../../assets/skin/Trousers/trouser10.png";
import trouser11 from "../../../assets/skin/Trousers/trouser11.png";
import trouser12 from "../../../assets/skin/Trousers/trouser12.png";
import trouser13 from "../../../assets/skin/Trousers/trouser13.png";
import trouser14 from "../../../assets/skin/Trousers/trouser14.png";
import trouser15 from "../../../assets/skin/Trousers/trouser15.png";

const arrHats = [];
const arrBackgroundHats = [];
let hatChosen;
let statusChooseHat = false;
let backgroundHatChosen;
const arrTrousers = [];
const arrBackgroundTrousers = [];
let trouserChosen;
let statusChooseTrouser;
let backgroundTrouserChosen;
class ChangeSkin extends Phaser.Scene {
  constructor() {
    super({ key: "ChangeSkin" });
  }

  preload() {
    this.load.image("player", player);
    this.load.image("hat1", hat1);
    this.load.image("hat2", hat2);
    this.load.image("hat3", hat3);
    this.load.image("hat4", hat4);
    this.load.image("hat5", hat5);
    this.load.image("hat6", hat6);
    this.load.image("hat7", hat7);
    this.load.image("hat8", hat8);
    this.load.image("hat9", hat9);
    this.load.image("hat10", hat10);
    this.load.image("hat11", hat11);
    this.load.image("hat12", hat12);
    this.load.image("hat13", hat13);
    this.load.image("hat14", hat14);
    this.load.image("hat15", hat15);
    this.load.image("hat16", hat16);
    this.load.image("hat17", hat17);
    this.load.image("hat18", hat18);
    this.load.image("hat19", hat19);
    this.load.image("hat20", hat20);
    this.load.image("hat21", hat21);
    this.load.image("hat22", hat22);
    this.load.image("hat23", hat23);
    this.load.image("hat24", hat24);
    this.load.image("hat25", hat25);
    this.load.image("hat26", hat26);
    this.load.image("hat27", hat27);
    this.load.image("hat28", hat28);
    this.load.image("hat29", hat29);
    this.load.image("hat30", hat30);
    this.load.image("hat31", hat31);
    this.load.image("hat32", hat32);
    this.load.image("hat33", hat33);
    this.load.image("hat34", hat34);
    this.load.image("hat35", hat35);
    this.load.image("hat36", hat36);
    this.load.image("hat37", hat37);
    this.load.image("hat38", hat38);
    this.load.image("hat39", hat39);
    this.load.image("hat40", hat40);
    this.load.image("hat41", hat41);
    this.load.image("hat42", hat42);
    this.load.image("hat43", hat43);
    this.load.image("hat44", hat44);
    this.load.image("hat45", hat45);
    this.load.image("hat46", hat46);
    this.load.image("hat47", hat47);
    this.load.image("hat48", hat48);
    this.load.image("trouser0", trouser0);
    this.load.image("trouser1", trouser1);
    this.load.image("trouser2", trouser2);
    this.load.image("trouser3", trouser3);
    this.load.image("trouser4", trouser4);
    this.load.image("trouser5", trouser5);
    this.load.image("trouser6", trouser6);
    this.load.image("trouser7", trouser7);
    this.load.image("trouser8", trouser8);
    this.load.image("trouser9", trouser9);
    this.load.image("trouser10", trouser10);
    this.load.image("trouser11", trouser11);
    this.load.image("trouser12", trouser12);
    this.load.image("trouser13", trouser13);
    this.load.image("trouser14", trouser14);
    this.load.image("trouser15", trouser15);
  }

  create() {
    let current_object = this;
    const base = this.add.rectangle(500, 380, 600, 480, 0xaedfc0);
    const basePlayer = this.add.rectangle(350, 420, 280, 390, 0xa1b1ae);
    const player = this.add.image(350, 460, "player");    
    let groupHats = this.add.group();
    let groupHatsBackground = this.add.group();
    let groupTrousers = this.add.group();
    let groupTrousersBackground = this.add.group();
    this.add.rectangle(255, 180, 90, 50, 0xa1b1ae);
    this.add.rectangle(355, 180, 90, 50, 0xa1b1ae);
    this.add.rectangle(455, 180, 90, 50, 0xa1b1ae);
    this.add.rectangle(555, 180, 90, 50, 0xa1b1ae);
    this.add.rectangle(655, 180, 90, 50, 0xa1b1ae);
    const colorText = this.add.text(225, 165, "Color", { font: "27px atari" });
    const hatText = this.add.text(335, 165, "Hat", { font: "27px atari" });
    const skinText = this.add.text(430, 165, "Skin", { font: "27px atari" });
    const petText = this.add.text(540, 165, "Pet", { font: "27px atari" });
    const gameText = this.add.text(625, 165, "Game", { font: "27px atari" });
    colorText.setInteractive();
    hatText.setInteractive();
    skinText.setInteractive();
    petText.setInteractive();
    gameText.setInteractive();

    this.input.on(
      "gameobjectdown",
      function (pointer, gameObject, deltaX, deltaY, deltaZ) {
        if (gameObject === hatText) {
          groupTrousersBackground.clear(true, true);
          groupTrousers.clear(true, true);          
          const changeX = 69;
          const changeY = 69;
          let countNameHat = 0;
          for (let i = 0; i < 12; i++) {
            const x = 550;
            const y = 260;
            for (let j = 0; j < 4; j++) {
              arrBackgroundHats[countNameHat] = current_object.add.rectangle(
                x + changeX * j,
                y + changeY * i,
                64,
                64,
                0xa1b1ae
              );
              arrHats[countNameHat] = current_object.add.sprite(
                x + changeX * j,
                y + changeY * i,
                `hat${countNameHat + 1}`
              );
              arrHats[countNameHat].scale = 0.85;
              arrHats[countNameHat].setInteractive();
              groupHatsBackground.add(arrBackgroundHats[countNameHat]);
              groupHats.add(arrHats[countNameHat]);
              countNameHat++;
            }
          }
          // let boundaryImages = current_object.add.tileSprite(300, 300, "groupHats");
        } else if (gameObject === skinText) {
          groupHatsBackground.clear(true, true);
          groupHats.clear(true, true);
          const changeX = 69;
          const changeY = 69;
          let countNameTrouser = 0;
          for (let i = 0; i < 4; i++) {
            const x = 550;
            const y = 260;
            for (let j = 0; j < 4; j++) {
              arrBackgroundTrousers[countNameTrouser] =
                current_object.add.rectangle(
                  x + changeX * j,
                  y + changeY * i,
                  64,
                  64,
                  0xa1b1ae
                );
              arrTrousers[countNameTrouser] = current_object.add.sprite(
                x + changeX * j,
                y + changeY * i,
                `trouser${countNameTrouser}`
              );
              arrTrousers[countNameTrouser].scale = 0.85;
              arrTrousers[countNameTrouser].setInteractive();
              groupTrousersBackground.add(
                arrBackgroundTrousers[countNameTrouser]
              );
              groupTrousers.add(arrTrousers[countNameTrouser]);
              countNameTrouser++;
            }
          }
          // let boundaryImages = current_object.add.tileSprite(300, 300, "groupHats");
        }
      }
    );

    current_object.input.on(
      "gameobjectdown",
      function (pointer, gameObject, deltaX, deltaY, deltaZ) {
        for (let i = 0; i < groupHats.getLength(); i++) {
          if (
            gameObject === arrHats[i] ||
            gameObject === arrBackgroundHats[i]
          ) {
            if (statusChooseHat) {
              hatChosen.destroy();
              backgroundHatChosen.setFillStyle("0xa1b1ae");
            }
            backgroundHatChosen = arrBackgroundHats[i];
            arrBackgroundHats[i].setFillStyle("0x505655");
            hatChosen = current_object.add.sprite(345, 350, `hat${i + 1}`);
            hatChosen.scale = 1.5;
            // current_object.add.image(350, 460, "player");
            statusChooseHat = true;
            break;
          }
        }
        for (let i = 0; i < groupTrousers.getLength(); i++) {
          if (
            gameObject === arrTrousers[i] ||
            gameObject === arrBackgroundTrousers[i]
          ) {
            if (statusChooseTrouser) {
              trouserChosen.destroy();
              backgroundTrouserChosen.setFillStyle("0xa1b1ae");
            }
            backgroundTrouserChosen = arrBackgroundTrousers[i];
            arrBackgroundTrousers[i].setFillStyle("0x505655");
            trouserChosen = current_object.add.sprite(360, 510, `trouser${i}`);
            trouserChosen.scale = 1.9;
            // current_object.add.image(350, 460, "player");
            statusChooseTrouser = true;
            break;
          }
        }
      }
    );
  }
}

export default ChangeSkin;
