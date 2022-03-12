import Phaser from "phaser";
import map from "../../../assets/img/theSkeld.png";

class TheSkeld extends Phaser.Scene {
  constructor() {
    super({ key: "theskeld" });
  }

  preload() {
    this.load.image("ship", map);
  }

  create() {
    const ship = this.add.image(0, 0, "ship");
  }
}

export default TheSkeld;
