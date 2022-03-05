import Phaser from 'phaser'
import SceneKeys from '~/consts/SceneKeys'
import logo from '../assets/img/logo.png'
import loading from '../assets/img/loading.png'
export default class Preloader extends Phaser.Scene {
    preload() {
        this.load.image('logo', logo)
        this.load.image('loading', loading);


        // this.add.existing(this.logo).scale.setTo(0.5);
        // this.add.existing(this.loadingBar);





        //  this.load.setPreloadSprite(this.loadingBar);
    }

    function() {
        this.loadingBar = game.make.sprite(game.world.centerX - (387 / 2), 400, "loading");
        this.logo = game.make.sprite(game.world.centerX, 200, 'brand');
        this.status = game.make.text(game.world.centerX, 380, 'Loading...', { fill: 'white' });
        utils.centerGameObjects([this.logo, this.status]);
    }


    create() {

        this.add.image(400, 250, 'loading');
        this.add.image(400, 150, 'logo');


        // this.state.add("Game", Game);
    }
}
