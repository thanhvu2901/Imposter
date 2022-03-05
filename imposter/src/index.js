import Phaser from 'phaser';


import Preloader from '../src/sence/preload'
import SceneKeys from '../src/consts/SceneKeys'

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Preloader
}

const game = new Phaser.Game(config);

//game.scene.add(SceneKeys.Preloader, Preloader)

export default game
