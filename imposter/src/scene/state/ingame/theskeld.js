import Phaser from "phaser";
import map from "../../../assets/img/theSkeld.png";
import ship from "../../../assets/tilemaps/theskeld.json";

class TheSkeld extends Phaser.Scene {
  constructor() {
    super({ key: "theskeld" });
  }

  preload() {
    this.load.image("tiles", map);
    this.load.tilemapTiledJSON("ship", ship);
  }

  create() {
    const ship = this.make.tilemap({ key: "ship" });
    const tileset = ship.addTilesetImage("ship", "tiles");

    ship.createLayer("ground", tileset);
  }
}

export default TheSkeld;
