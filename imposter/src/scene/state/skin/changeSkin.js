import Phaser from "phaser";
import player from "../../../assets/skin/idle.png";
import hat0 from "../../../assets/skin/Hats/hats0001.png";
import hat1 from "../../../assets/skin/Hats/hats0005.png";
import hat2 from "../../../assets/skin/Hats/hats0006.png";
import hat3 from "../../../assets/skin/Hats/hats0007.png";
import hat4 from "../../../assets/skin/Hats/hats0008.png";
import hat5 from "../../../assets/skin/Hats/hats0010.png";
import hat6 from "../../../assets/skin/Hats/hats0012.png";
import hat7 from "../../../assets/skin/Hats/hats0013.png";
import hat8 from "../../../assets/skin/Hats/hats0015.png";
import hat9 from "../../../assets/skin/Hats/hats0020.png";
import hat10 from "../../../assets/skin/Hats/hats0021.png";
import hat11 from "../../../assets/skin/Hats/hats0024.png";
import hat12 from "../../../assets/skin/Hats/hats0025.png";
import hat13 from "../../../assets/skin/Hats/hats0028.png";
import hat14 from "../../../assets/skin/Hats/hats0031.png";
import hat15 from "../../../assets/skin/Hats/hats0042.png";
import hat16 from "../../../assets/skin/Hats/hats0043.png";
import hat17 from "../../../assets/skin/Hats/hats0045.png";
import hat18 from "../../../assets/skin/Hats/hats0053.png";
import hat19 from "../../../assets/skin/Hats/hats0055.png";
import trouser0 from "../../../assets/skin/Trousers/trouser0.png";
import trouser1 from "../../../assets/skin/Trousers/trouser1.png";
import trouser3 from "../../../assets/skin/Trousers/trouser2.png";
import trouser2 from "../../../assets/skin/Trousers/trouser3.png";
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
import pet0 from "../../../assets/skin/Pets/pet0.png";
import pet1 from "../../../assets/skin/Pets/pet1.png";
import pet2 from "../../../assets/skin/Pets/pet2.png";
import pet3 from "../../../assets/skin/Pets/pet3.png";
import pet4 from "../../../assets/skin/Pets/pet4.png";
import pet5 from "../../../assets/skin/Pets/pet5.png";
import pet6 from "../../../assets/skin/Pets/pet6.png";
import pet7 from "../../../assets/skin/Pets/pet7.png";
import pet8 from "../../../assets/skin/Pets/pet8.png";
import pet9 from "../../../assets/skin/Pets/pet9.png";
import pet10 from "../../../assets/skin/Pets/pet10.png";
import pet11 from "../../../assets/skin/Pets/pet11.png";
import closeChangeSkin from "../../../assets/skin/close.png";
import plusIcon from "../../../assets/skin/Games/plus.png";
import minusIcon from "../../../assets/skin/Games/minus.png";
import eventsCenter from "../../eventsCenter";
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
const arrPets = [];
const arrBackgroundPets = [];
let petChosen;
let statusChoosePet = false;
let backgroundPetChosen;
let playerChangedSkin = {};
let numberImposter = 1;
let numberPlayer = 5;
class ChangeSkin extends Phaser.Scene {
  constructor() {
    super({ key: "ChangeSkin" });
  }

  init(data) {
    this.socket = data.socket;
    this.textInput = data.textInput;
  }
  preload() {
    this.load.image("playerchange", player);
    this.load.image("hat0", hat0);
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
    this.load.image("pet0", pet0);
    this.load.image("pet1", pet1);
    this.load.image("pet2", pet2);
    this.load.image("pet3", pet3);
    this.load.image("pet4", pet4);
    this.load.image("pet5", pet5);
    this.load.image("pet6", pet6);
    this.load.image("pet7", pet7);
    this.load.image("pet8", pet8);
    this.load.image("pet9", pet9);
    this.load.image("pet10", pet10);
    this.load.image("pet11", pet11);
    this.load.image("closeChangeSkin", closeChangeSkin);
    this.load.image("plusIcon", plusIcon);
    this.load.image("minusIcon", minusIcon);
  }

  create() {
    let current_object = this;
    const base = this.add.rectangle(500, 380, 600, 480, 0xaedfc0);
    const basePlayer = this.add.rectangle(350, 420, 280, 390, 0xa1b1ae);
    const player = this.add.image(350, 460, "playerchange");
    const closeBtn = this.add.image(760, 180, "closeChangeSkin");
    let groupHats = this.add.group();
    let groupHatsBackground = this.add.group();
    let groupTrousers = this.add.group();
    let groupTrousersBackground = this.add.group();
    let groupPets = this.add.group();
    let groupPetsBackground = this.add.group();
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
    closeBtn.scale = 0.8;
    colorText.setInteractive({ useHandCursor: true });
    hatText.setInteractive({ useHandCursor: true });
    skinText.setInteractive({ useHandCursor: true });
    petText.setInteractive({ useHandCursor: true });
    gameText.setInteractive({ useHandCursor: true });
    closeBtn.setInteractive({ useHandCursor: true });
    let plusImposterIcon;
    let plusPlayerIcon;
    let minusImposterIcon;
    let minusPlayerIcon;
    let numberImposerText;
    let numberPlayerText;
    // group background, text, icons in Game
    let groupGame = this.add.group();


    this.input.on(
      "gameobjectdown",
      function (pointer, gameObject, deltaX, deltaY, deltaZ) {
        if (gameObject === hatText) {
          basePlayer.visible = true;
          player.visible = true;
          if (hatChosen) {
            hatChosen.visible = true;
          }
          if (trouserChosen) {
            trouserChosen.visible = true;
          }
          groupTrousersBackground.clear(true, true);
          groupTrousers.clear(true, true);
          groupPets.clear(true, true);
          groupPetsBackground.clear(true, true);
          groupGame.clear(true, true);
          const changeX = 69;
          const changeY = 69;
          let countNameHat = 0;
          for (let i = 0; i < 5; i++) {
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
                `hat${countNameHat}`
              );
              arrHats[countNameHat].scale = 0.7;
              arrHats[countNameHat].setInteractive({ useHandCursor: true });
              groupHatsBackground.add(arrBackgroundHats[countNameHat]);
              groupHats.add(arrHats[countNameHat]);
              countNameHat++;
            }
          }
          // let boundaryImages = current_object.add.tileSprite(300, 300, "groupHats");
        } else if (gameObject === skinText) {
          basePlayer.visible = true;
          player.visible = true;
          if (hatChosen) {
            hatChosen.visible = true;
          }
          if (trouserChosen) {
            trouserChosen.visible = true;
          }
          groupHatsBackground.clear(true, true);
          groupHats.clear(true, true);
          groupPets.clear(true, true);
          groupPetsBackground.clear(true, true);
          groupGame.clear(true, true);
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
              arrTrousers[countNameTrouser].scale = 0.7;
              arrTrousers[countNameTrouser].setInteractive({
                useHandCursor: true,
              });
              groupTrousersBackground.add(
                arrBackgroundTrousers[countNameTrouser]
              );
              groupTrousers.add(arrTrousers[countNameTrouser]);
              countNameTrouser++;
            }
          }
          // let boundaryImages = current_object.add.tileSprite(300, 300, "groupHats");
        } else if (gameObject === petText) {
          basePlayer.visible = true;
          player.visible = true;
          if (hatChosen) {
            hatChosen.visible = true;
          }
          if (trouserChosen) {
            trouserChosen.visible = true;
          }
          groupHatsBackground.clear(true, true);
          groupHats.clear(true, true);
          groupTrousersBackground.clear(true, true);
          groupTrousers.clear(true, true);
          groupGame.clear(true, true);
          const changeX = 69;
          const changeY = 69;
          let countNamePet = 0;
          for (let i = 0; i < 3; i++) {
            const x = 550;
            const y = 260;
            for (let j = 0; j < 4; j++) {
              arrBackgroundPets[countNamePet] = current_object.add.rectangle(
                x + changeX * j,
                y + changeY * i,
                64,
                64,
                0xa1b1ae
              );
              arrPets[countNamePet] = current_object.add.sprite(
                x + changeX * j,
                y + changeY * i,
                `pet${countNamePet}`
              );
              arrPets[countNamePet].scale = 0.7;
              arrPets[countNamePet].setInteractive({ useHandCursor: true });
              groupPetsBackground.add(arrBackgroundPets[countNamePet]);
              groupPets.add(arrPets[countNamePet]);
              countNamePet++;
            }
          }
        } else if (gameObject === gameText) {
          console.log('game customs');
          basePlayer.visible = false;
          player.visible = false;
          if (hatChosen) {
            hatChosen.visible = false;
          }
          if (trouserChosen) {
            trouserChosen.visible = false;
          }
          groupHatsBackground.clear(true, true);
          groupHats.clear(true, true);
          groupTrousersBackground.clear(true, true);
          groupTrousers.clear(true, true);
          groupPetsBackground.clear(true, true);
          groupPets.clear(true, true);
          let count = 0;
          for (let i = 0; i < 2; i++) {
            groupGame.add(current_object.add.rectangle(
              470,
              280 + i * 55,
              400,
              50,
              0xa1b1ae
            ))
            if (i === 0) {
              minusImposterIcon =
                current_object.add.sprite(585, 280 + i * 55, "minusIcon");
              plusImposterIcon = current_object.add.sprite(
                650,
                280 + i * 55,
                "plusIcon"
              );
              groupGame.add(minusImposterIcon);
              groupGame.add(plusImposterIcon);
              minusImposterIcon.scale = 2.5;
              plusImposterIcon.scale = 2.5;
              minusImposterIcon.setInteractive({ useHandCursor: true });
              plusImposterIcon.setInteractive({ useHandCursor: true });
            } else if (i === 1) {
              minusPlayerIcon = current_object.add.sprite(
                585,
                280 + i * 55,
                "minusIcon"
              );
              groupGame.add(minusPlayerIcon);
              plusPlayerIcon = current_object.add.sprite(
                650,
                280 + i * 55,
                "plusIcon"
              );
              groupGame.add(plusPlayerIcon);
              minusPlayerIcon.scale = 2.5;
              plusPlayerIcon.scale = 2.5;
              minusPlayerIcon.setInteractive({ useHandCursor: true });
              plusPlayerIcon.setInteractive({ useHandCursor: true });
            }
          }
          groupGame.add(current_object.add.text(
            300,
            265,
            "# Impostors",
            { font: "27px atari" }
          ))
          groupGame.add(current_object.add.text(300, 320, "# Players", {
            font: "27px atari",
          }))
          numberImposerText = current_object.add.text(610, 265, `${numberImposter}`, {
            font: "27px atari",
          });
          groupGame.add(numberImposerText)
          numberPlayerText = current_object.add.text(610, 320, `${numberPlayer}`, {
            font: "27px atari",
          });
          groupGame.add(numberPlayerText)
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
            hatChosen = current_object.add.sprite(345, 350, `hat${i}`);
            hatChosen.scale = 1.5;
            statusChooseHat = true;
            playerChangedSkin.hat = arrHats[i];
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
            statusChooseTrouser = true;
            playerChangedSkin.trouser = arrTrousers[i];
            break;
          }
        }
        for (let i = 0; i < groupPets.getLength(); i++) {
          if (
            gameObject === arrPets[i] ||
            gameObject === arrBackgroundPets[i]
          ) {
            if (statusChoosePet) {
              backgroundPetChosen.setFillStyle("0xa1b1ae");
            }
            backgroundPetChosen = arrBackgroundPets[i];
            arrBackgroundPets[i].setFillStyle("0x505655");
            statusChoosePet = true;
            playerChangedSkin.pet = arrPets[i];
            break;
          }
        }
        if (gameObject === minusImposterIcon) {
          if (numberImposter === 2) {
            numberImposter = 1;
          }
          numberImposerText.destroy();
          numberPlayerText.destroy();
          numberImposerText = current_object.add.text(610, 265, `${numberImposter}`, {
            font: "27px atari",
          });
          numberPlayerText = current_object.add.text(610, 320, `${numberPlayer}`, {
            font: "27px atari",
          });
        }
        if (gameObject === plusImposterIcon) {
          if (numberImposter === 1) {
            numberImposter = 2;
            numberPlayer = 8;
          }
          numberImposerText.destroy();
          numberPlayerText.destroy();
          numberImposerText = current_object.add.text(610, 265, `${numberImposter}`, {
            font: "27px atari",
          });
          numberPlayerText = current_object.add.text(610, 320, `${numberPlayer}`, {
            font: "27px atari",
          });
        }
        if (gameObject === minusPlayerIcon) {
          if (numberImposter === 1 && numberPlayer > 5 && numberPlayer <= 12) {
            numberPlayer--;
          } else if (
            numberImposter === 2 &&
            numberPlayer > 8 &&
            numberPlayer <= 12
          ) {
            numberPlayer--;
          }
          numberImposerText.destroy();
          numberPlayerText.destroy();
          numberImposerText = current_object.add.text(610, 265, `${numberImposter}`, {
            font: "27px atari",
          });
          numberPlayerText = current_object.add.text(610, 320, `${numberPlayer}`, {
            font: "27px atari",
          });
        }
        if (gameObject === plusPlayerIcon) {
          if (numberImposter === 1 && numberPlayer >= 5 && numberPlayer < 12) {
            numberPlayer++;
          } else if (
            numberImposter === 2 &&
            numberPlayer >= 8 &&
            numberPlayer < 12
          ) {
            numberPlayer++;
          }
          numberImposerText.destroy();
          numberPlayerText.destroy();
          numberImposerText = current_object.add.text(610, 265, `${numberImposter}`, {
            font: "27px atari",
          });
          numberPlayerText = current_object.add.text(610, 320, `${numberPlayer}`, {
            font: "27px atari",
          });
        }
      }
    );

    closeBtn.on("pointerdown", () => {
      //  console.log(this.socket); 
      eventsCenter.emit('update', {
        playerChangedSkin: playerChangedSkin,
        numberImposter: numberImposter,
        numberPlayer: numberPlayer
      })
      // this.scene.resume("waitingRoom", {
      //   socket: this.socket,
      //   textInput: this.textInput,
      //   playerChangedSkin: playerChangedSkin,
      //   numberImposter: numberImposter,
      //   numberPlayer: numberPlayer,
      // });

      this.scene.stop("ChangeSkin");
    });
  }
}

export default ChangeSkin;
