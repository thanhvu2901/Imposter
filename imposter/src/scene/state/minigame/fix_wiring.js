import Phaser from "phaser";
import fix from '../../../assets/img/fix_wiring/Fix_Wiring.png'
import head1 from '../../../assets/tasks/Fix_Wiring/electricity_wires1.png'


let isDragging = false;
let lineStartPosition = { x: 0, y: 0 };

let line
let text;
let graphics
let path = new Array;
let curve = new Array;
let point = new Array;
let endreg = new Array;
let reg = new Array
let tail = new Array
let color = ['0000FF', 'FF0000', 'FFFF00', 'FF00FF']
let color_left = ['FF0000', 'FF00FF', '0000FF', 'FFFF00']
class FixWiring extends Phaser.Scene {


    constructor() {
        super({
            key: 'fixWiring'
        })
    };

    preload() {
        this.load.image('fix', fix)
        this.load.image('head1', head1)
    }


    create() {



        var backdrop = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'fix')
        text = this.add.text(10, 10, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);



        //********** */\

        //loop
        for (let i = 0; i < 4; i++) {
            reg[i] = this.add.rectangle(260 + 20, 226 + 10 + 103 * i, 35, 20, parseInt(color[i], 16)).setDepth(1)
            graphics = this.add.graphics();
            path[i] = { vec: new Phaser.Math.Vector2() };
            curve[i] = new Phaser.Curves.Line([290, 226 + 10 + 103 * i, 306, 226 + 10 + 103 * i]);


            //  var point0 = this.add.image(306, 226 + 10, 'head1', 0)
            point[i] = this.add.image(306, 236 + 103 * i, 'head1', 0).setInteractive();
            point[i].setDepth(0);

            //  point0.setData('vector', curve.p0);
            point[i].setData('vector', curve[i].p1);
            this.input.setDraggable(point[i])

            this.tweens.add({
                targets: path[i],
                t: 1,
                ease: 'Sine.easeInOut',
                duration: 2000,
                yoyo: true,
                repeat: -1
            });

            // điểm cuối
            endreg[i] = this.add.rectangle(745, 236 + 103 * i, 35, 20, parseInt(color_left[i], 16)).setDepth(1)
            tail[i] = this.add.image(720, 236 + 103 * i, 'head1',).setDepth(0)

            tail[i].setFlipX(true);


        }

        //
        this.input.on('dragstart', function (pointer, gameObject) {

            gameObject.setFrame(1);

        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;


            //Nếu không đúng thì reset
            //    console.log(gameObject);
            if (gameObject.x > 720 && gameObject.y < 236) {
                console.log('fl');
            } else {
                gameObject.data.get('vector').set(dragX, dragY);
            }





        });

        this.input.on('dragend', function (pointer, gameObject) {

            gameObject.setFrame(0);
            // console.log(gameObject.);

        });



    }
    update() {

        text.setText([
            'screen x: ' + this.input.x,
            'screen y: ' + this.input.y,

        ])

        // console.log(graphics[0]);
        //console.log(endreg[0].color);
        graphics.clear();
        for (let i = 0; i < 4; i++) {


            graphics.lineStyle(20, parseInt(color[i], 16));
            curve[i].draw(graphics);
            //  console.log(curve[i].color);
            // console.log(curve[i].display.color);
            // for (let j = 0; j < 4; j++) {
            //     if (reg[i].fillColor === endreg[j].fillColor) {
            //         console.log('yes');
            //     }

            // }

        }
        // console.log(graphics[0].lineStyle);



    }



}
function check(colorHead, colorTail) {
    if (colorHead === colorTail) {
        return true

    }
    return false
}

export default FixWiring;