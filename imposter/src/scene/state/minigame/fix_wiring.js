import Phaser from "phaser";
import fix from '../../../assets/img/fix_wiring/Fix_Wiring.png'
import head1 from '../../../assets/tasks/Fix_Wiring/electricity_wires1.png'

let isDragging = false;
let lineStartPosition = { x: 0, y: 0 };

let line
let text, text3;
let graphics
let path = new Array;
let curve = new Array;
let point = new Array;
let endreg = new Array;
let reg = new Array
let tail = new Array
let count = new Set();
let color = ['0000FF', 'FF0000', 'FFFF00', 'FF00FF']
let color_left = ['FF0000', 'FF00FF', '0000FF', 'FFFF00'];

let x;
let y;
let current_scene;
let sprite;
let eventsCenter;

class FixWiring extends Phaser.Scene {
    init(data) {
        x = data.x;
        y = data.y;
        sprite = data.sprite;
        eventsCenter = data.eventsCenter;
    }

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
        let closeBtn = this.add.image(830, 135, 'closeBtn').setInteractive({ useHandCursor: true })

        closeBtn.on('pointerdown', () => {
            this.scene.stop('fixWiring')
        })
        current_scene = this.scene;

        //********** */\

        //loop
        for (let i = 0; i < 4; i++) {
            reg[i] = this.add.rectangle(260 + 20, 226 + 10 + 103 * i, 35, 20, parseInt(color[i], 16)).setDepth(1)
            graphics = this.add.graphics();
            path[i] = { vec: new Phaser.Math.Vector2() };
            curve[i] = new Phaser.Curves.Line([290, 226 + 10 + 103 * i, 306, 226 + 10 + 103 * i]);


            //  var point0 = this.add.image(306, 226 + 10, 'head1', 0)

            point[i] = [this.add.image(306, 236 + 103 * i, 'head1', 0).setInteractive(), reg[i].fillColor];

            point[i][0].setDepth(0);

            //  point0.setData('vector', curve.p0);
            point[i][0].setData('vector', curve[i].p1);


            //   console.log(point[i]);


            this.input.setDraggable(point[i][0])

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


            tail[i] = [this.add.image(720, 236 + 103 * i, 'head1',).setDepth(0), endreg[i].fillColor]

            tail[i][0].setFlipX(true);


        }

        //
        this.input.on('dragstart', function (pointer, gameObject) {

            gameObject.setFrame(1);
        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;



            gameObject.data.get('vector').set(dragX, dragY);

            check(point[0], tail[2], 1)
            check(point[1], tail[0], 2)
            check(point[2], tail[3], 3)
            check(point[3], tail[1], 4)




        });

        this.input.on('dragend', function (pointer, gameObject) {

            gameObject.setFrame(0);



        });



    }
    update() {

        text.setText([
            'screen x: ' + this.input.x,
            'screen y: ' + this.input.y,

        ])

        // console.log(graphics[0]);
        //console.log(endreg[0].color);
        //   console.log(tail[0][0].x, tail[0][0].y, tail[0][1])
        graphics.clear();
        for (let i = 0; i < 4; i++) {


            graphics.lineStyle(20, parseInt(color[i], 16));
            curve[i].draw(graphics);


        }
        // console.log(graphics[0].lineStyle)set
        if (count.size === 4) {
            // console.log('done');
            // text3 = this.add.text(317, 327, 'TASK COMPLETE!!', { font: '50px Courier', fill: '#FFFFFF' }).setDepth(1);
            sprite.tint = 0;
            eventsCenter.emit("continue_scene_game", {x: x, y: y, mission: "FixWiring"});
            current_scene.stop("fixWiring");

        }
    }



}
function check(point1, point2, num) {
    if (point1[0].x > point2[0].x - 20 && point1[0].x < point2[0].x + 20 && point1[0].y > point2[0].y - 20 && point1[0].y < point2[0].y + 20 && point1[1] == point2[1]) {
        count.add(num)

    }
    //console.log(count);

    //  return false
}

export default FixWiring;