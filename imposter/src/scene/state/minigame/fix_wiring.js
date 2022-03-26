import Phaser from "phaser";


let isDragging = false;
let lineStartPosition = { x: 0, y: 0 };

let line
class FixWiring extends Phaser.Scene {


    constructor() {
        super({
            key: 'fixWiring'
        })
    };

    preload() {

    }
    dragStart(pointer, gameObjects) {

        if (gameObjects.length == 0)
            return

        lineStartPosition.x = gameObjects[0].x;
        lineStartPosition.y = gameObjects[0].y;
        isDragging = true;

        line.x = gameObjects[0].x;
        line.y = gameObjects[0].y;

        line.setTo(0, 0, 0, 0);
        line.visible = true;

    }

    drag(pointer, gameObject) {
        if (isDragging == true) {
            line.setTo(0, 0, pointer.x - lineStartPosition.x, pointer.y - lineStartPosition.y);
        }
    }

    dragEnd(pointer, gameObject) {
        isDragging = false;
    }
    create() {

        console.log('fix');

        var backdrop = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'fix')


        backdrop.setInteractive()
        line = this.add.line(0, 0, 0, 0, 100, 100, 0xffffff).setOrigin(0);
        line.setLineWidth(5);
        line.visible = false;

        // adding the events to the scene
        this.input.on('pointerdown', dragStart);
        this.input.on('pointerup', dragEnd);
        this.input.on('pointermove', drag);
    }
    update() {

    }



}

export default FixWiring;