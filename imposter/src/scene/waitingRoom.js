import Phaser from "phaser";
import dropShip from '../assets/img/Dropship.png'
export default class waitingRoom extends Phaser.Scene {
    constructor() {
        super({
            key: 'waitingRoom'
        })
    }

    preload() {
        this.load.image('dropShip', dropShip);

    }

    create() {
        this.add.image(0, 0, 'dropShip')
    }
}