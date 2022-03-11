import Phaser from "phaser";

class option extends Phaser.Scene {
    constructor(){
        key:'options'
    }
    //sau khi đã load từ preload
    create(){
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'setting').setDepth(1);

        this.add.image(0, 0, 'background').setOrigin(0.01).setDepth(0);
        
    }

}
