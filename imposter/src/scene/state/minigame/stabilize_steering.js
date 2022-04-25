import Phaser from "phaser";
import base from '../../../assets/tasks/Stabilize Steering/nav_stabilize_base.png'
import graph from '../../../assets/tasks/Stabilize Steering/nav_stabilize_graph.png'
import target from '../../../assets/tasks/Stabilize Steering/nav_stabilize_target.png'


let ibase, itarget, igraph, text;
let done = false;
class StabilizeSteering extends Phaser.Scene {
    constructor() {
        super({
            key:
                'stabilizeSteering'
        })
    }


    preload() {
        this.load.image('base', base)
        this.load.image('graph', graph)
        this.load.image('target', target)
    }

    create() {
        ibase = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'base')
        igraph = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'graph')
        itarget = this.add.image(this.game.renderer.width / 2 + this.getRndInteger(-50, 50), this.game.renderer.height / 2 + this.getRndInteger(-50, 50), 'target').setInteractive()

        this.input.setDraggable(itarget)
        this.input.on('dragstart', function (pointer, gameObject) {

            gameObject.setFrame(1);

        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;


            if (gameObject.x > igraph.x - 2 && gameObject.x < igraph.x + 2 && gameObject.y > igraph.y - 2 && gameObject.y < igraph.y + 2) {
                done = true;
            }
        });

        this.input.on('dragend', function (pointer, gameObject) {

            gameObject.setFrame(0);
        });



    }


    update() {
        if (done === true) {
            text = this.add.text(317, 327, 'TASK COMPLETE!!', { font: '50px Courier', fill: '#FFFFFF' }).setDepth(1);
        }
    }
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

export default StabilizeSteering