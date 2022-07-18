import Phaser from "phaser";
import btn1 from '../../../assets/tasks/Start Reactor/ssbuton/ssbutton1.png'
import btn2 from '../../../assets/tasks/Start Reactor/ssbuton/ssbutton2.png'
import btn3 from '../../../assets/tasks/Start Reactor/ssbuton/ssbutton3.png'
import btn4 from '../../../assets/tasks/Start Reactor/ssbuton/ssbutton4.png'
import btn5 from '../../../assets/tasks/Start Reactor/ssbuton/ssbutton5.png'
import btn6 from '../../../assets/tasks/Start Reactor/ssbuton/ssbutton6.png'
import btn7 from '../../../assets/tasks/Start Reactor/ssbuton/ssbutton7.png'
import btn8 from '../../../assets/tasks/Start Reactor/ssbuton/ssbutton8.png'
import btn9 from '../../../assets/tasks/Start Reactor/ssbuton/ssbutton9.png';


import baseimg from '../../../assets/tasks/Start Reactor/simonSaysBase.png'
import btnShadow from '../../../assets/tasks/Start Reactor/simonSaysButtonsShadow.png'
import lightIndication from '../../../assets/tasks/Start Reactor/simonSaysLightsIndicationWShadows.png'
import sayScreen from '../../../assets/tasks/Start Reactor/simonSaysScreen.png'

import sslight from '../../../assets/tasks/Start Reactor/sslights/sslights1.png'


let num = new Array;
let reg = new Array;
let lightleft = new Array
let lightright = new Array


let gen_arr = new Array;
let input_arr = new Array;
let sequence_button = new Array
let button = new Array
let can_input = false
let level = 1;
let exbutton = new Array
let loop = 0
let delay = 0
let count = 0;
let isgameover = false

let ob;
let x, y, sprite;
let eventsCenter;

class StartReactor extends Phaser.Scene {
    init(data) {
        x = data.x;
        y = data.y;
        sprite = data.sprite;
        eventsCenter = data.eventsCenter;
    }

    constructor() {
        super({
            key: 'startReactor'
        })
    }

    preload() {
        this.load.image('base', baseimg);
        this.load.image('btnShadow', btnShadow);
        this.load.image('light', lightIndication)
        this.load.image('sayScreen', sayScreen)

        this.load.image('btn1', btn1)
        this.load.image('btn2', btn2)
        this.load.image('btn3', btn3)
        this.load.image('btn4', btn4)
        this.load.image('btn5', btn5)
        this.load.image('btn6', btn6)
        this.load.image('btn7', btn7)
        this.load.image('btn8', btn8)
        this.load.image('btn9', btn9)

        this.load.image('sslight', sslight)

    }
    async create() {
        const current_scene = this.scene;
        let check = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        let x = this.game.renderer.width
        let y = this.game.renderer.height
        let cords_1 = [[x * 5 / 8 - 50, y / 2 - 40], [x * 5 / 8, y / 2 - 40], [x * 5 / 8 + 50, y / 2 - 40], [x * 5 / 8 - 50, y / 2 + 10], [x * 5 / 8, y / 2 + 10], [x * 5 / 8 + 50, y / 2 + 10], [x * 5 / 8 - 50, y / 2 + 60], [x * 5 / 8, y / 2 + 60], [x * 5 / 8 + 50, y / 2 + 60]]
        let cords_2 = [[x * 3 / 8 - 50, y / 2 - 40], [x * 3 / 8, y / 2 - 40], [x * 3 / 8 + 50, y / 2 - 40], [x * 3 / 8 - 50, y / 2 + 10], [x * 3 / 8, y / 2 + 10], [x * 3 / 8 + 50, y / 2 + 10], [x * 3 / 8 - 50, y / 2 + 60], [x * 3 / 8, y / 2 + 60], [x * 3 / 8 + 50, y / 2 + 60]]
        this.add.image(x * 3 / 8, y / 2, 'base').setDepth(0)
        this.add.image(x * 5 / 8, y / 2, 'base').setDepth(0)

        this.add.image(x * 3 / 8, y / 2 - 90, 'light').setDepth(1)
        this.add.image(x * 5 / 8, y / 2 - 90, 'light').setDepth(1)


        this.add.image(x * 3 / 8, y / 2 + 10, 'sayScreen').setDepth(1)
        for (let i = 0; i < 9; i++) {
            let temp
            temp = [this.add.image(cords_1[i][0], cords_1[i][1], `btn${i + 1}`).setInteractive(), i + 1]
            button.push(temp)
            temp[0].on('pointerdown', function (pointer) {

                temp[0].setTint('0x51ff00')


            })
            temp[0].on('pointerup', function (pointer) {

                temp[0].clearTint()


            })




        }
        for (let j = 0; j < 9; j++) {
            let temp
            temp = [this.add.rectangle(cords_2[j][0], cords_2[j][1], 45, 45, '0x6666ff').setDepth(0), j + 1]
            exbutton.push(temp)
        }
        // Shuffle array
        const shuffled = check.sort(() => 0.5 - Math.random());

        num[2] = this.add.image(this.game.renderer.width * 5 / 8, this.game.renderer.height / 2 - 40, 'btn2').setDepth(1).setInteractive()
        num[5] = this.add.image(this.game.renderer.width * 5 / 8, this.game.renderer.height / 2 + 10, 'btn5').setDepth(1).setInteractive()
        num[8] = this.add.image(this.game.renderer.width * 5 / 8, this.game.renderer.height / 2 + 60, 'btn8').setDepth(1).setInteractive()

        num[1] = this.add.image(this.game.renderer.width * 5 / 8 - 50, this.game.renderer.height / 2 - 40, 'btn1').setDepth(1).setInteractive()
        num[4] = this.add.image(this.game.renderer.width * 5 / 8 - 50, this.game.renderer.height / 2 + 10, 'btn4').setDepth(1).setInteractive()
        num[7] = this.add.image(this.game.renderer.width * 5 / 8 - 50, this.game.renderer.height / 2 + 60, 'btn7').setDepth(1).setInteractive()

        num[3] = this.add.image(this.game.renderer.width * 5 / 8 + 50, this.game.renderer.height / 2 - 40, 'btn3').setDepth(1).setInteractive()
        num[6] = this.add.image(this.game.renderer.width * 5 / 8 + 50, this.game.renderer.height / 2 + 10, 'btn6').setDepth(1).setInteractive()
        num[9] = this.add.image(this.game.renderer.width * 5 / 8 + 50, this.game.renderer.height / 2 + 60, 'btn9').setDepth(1).setInteractive()

        reg[2] = this.add.rectangle(this.game.renderer.width * 3 / 8, this.game.renderer.height / 2 - 40, 45, 45, '0x6666ff').setDepth(2)
        reg[5] = this.add.rectangle(this.game.renderer.width * 3 / 8, this.game.renderer.height / 2 + 10, 45, 45, '0x6666ff').setDepth(2)
        reg[8] = this.add.rectangle(this.game.renderer.width * 3 / 8, this.game.renderer.height / 2 + 60, 45, 45, '0x6666ff').setDepth(2)
        reg[1] = this.add.rectangle(this.game.renderer.width * 3 / 8 - 50, this.game.renderer.height / 2 - 40, 45, 45, '0x6666ff').setDepth(2)
        reg[4] = this.add.rectangle(this.game.renderer.width * 3 / 8 - 50, this.game.renderer.height / 2 + 10, 45, 45, '0x6666ff').setDepth(2)
        reg[7] = this.add.rectangle(this.game.renderer.width * 3 / 8 - 50, this.game.renderer.height / 2 + 60, 45, 45, '0x6666ff').setDepth(2)
        reg[3] = this.add.rectangle(this.game.renderer.width * 3 / 8 + 50, this.game.renderer.height / 2 - 40, 45, 45, '0x6666ff').setDepth(2)
        reg[6] = this.add.rectangle(this.game.renderer.width * 3 / 8 + 50, this.game.renderer.height / 2 + 10, 45, 45, '0x6666ff').setDepth(2)
        reg[9] = this.add.rectangle(this.game.renderer.width * 3 / 8 + 50, this.game.renderer.height / 2 + 60, 45, 45, '0x6666ff').setDepth(2)

        for (let i = 0; i < 5; i++) {

            lightleft[i] = this.add.image(x * 3 / 8 - 68 + 34 * i, y / 2 - 93, 'sslight').setDepth(2)
            lightright[i] = this.add.image(x * 5 / 8 - 68 + 34 * i, y / 2 - 93, 'sslight').setDepth(2)
        }

        for (let i = 1; i <= 5; i++) {
            let rand = Math.floor(Math.random() * 9) + 1;
            gen_arr.push(rand)
        }

        //56374

        //while (count < 5) {
        //onled1
        //count = 1;
        // reg[5][0].setFillStyle('0x0000FF')
        //console.log(check(5))
        // let a = check(5);

        //reg[6][0].setFillStyle('0x0000FF')

        // for (let i = 0; i < 5; i++) {
        //     setTimeout(() => {
        //         out_put()
        //         level++
        //     }, 3000)
        // }

        for (let i = 1; i <= 9; i++) {


            num[i].on('pointerdown', () => {
                num[i].setScale(0.9, 0.9)
                //console.log('pponter down');
                num[i].on('pointerup', () => {
                    //num[i].callback.bind(callbackContext)
                    //console.log('pointerup');
                    num[i].setScale(1, 1)
                })
                input_arr.push(i);
                if (validate_input(input_arr) === true) {
                    lightleft[level - 1].setTint('0x00FF00')

                    input_arr = [];

                    if (level < 5) {
                        loop += 1;
                        level++;
                        refresh(lightright, level)
                        out_put(loop);
                    }
                    else {
                        this.add.text(317, 327, 'TASK COMPLETE!!', { font: '50px Courier', fill: '#FFFFFF' }).setDepth(2);
                        sprite.tint = 0;
                        eventsCenter.emit("continue_scene_game", { x: x, y: y, mission: "startReactor" });
                        current_scene.stop("startReactor");
                    }

                }
                else if (validate_input(input_arr) === false) {
                    this.cameras.main.shake(500);
                }
                ////  else { console.log(this.cameras.main); }

            })



        }

        out_put(loop)



    }
    update() {
        if (ob == true) {
            this.cameras.main.shake(100);
            ob = false
        }





    }
}


function out_put(i) {
    // console.log(i);
    // console.log(level);
    if (i < level) {

        sequence_button.push(reg[gen_arr[i]])

        for (let j = 0; j < sequence_button.length; j++) {

            setTimeout(() => sequence_button[j].setFillStyle('0x0000FF'), j * 1000)

            setTimeout(() => {
                sequence_button[j].setFillStyle('0x6666ff')



            }, j * 1000 + 500)


        }




    }

}
function validate_input(input) {
    // console.log(input + " vvv  " + gen_arr);
    for (let index = 0; index < input.length; index++) {
        // console.log(input[index] + "   " + gen_arr[index]);
        if (input[index] !== gen_arr[index]) {

            refresh(lightleft, level)
            refresh(lightright, level - 1)
            count = 0;
            level = 1;
            loop = 0;
            sequence_button = []
            input_arr = []

            ob = true
            return out_put(loop)

        }
        else {
            lightright[index].setTint('0x00FF00')

            if (index == level - 1) {

                return true
            }
            // console.log('passed');
        }
        //   return false;

    }


}
function refresh(light, level) {
    for (let i = 0; i < level; i++) {
        light[i].clearTint();
    }

}
function load_1(x) {


    exbutton[x][0].setDepth(2)


}
const Pause = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
// function out_put() {
//     // setTimeout(() => {
//     for (let i = 0; i < level; i++) {
//         console.log('level' + level);
//         if (i < level) {
//             setTimeout(() => {


//                 // setTimeout(() => {
//                 //console.log('day là i' + i + ' lvel ' + level);
//                 console.log(gen_arr[i]);
//                 reg[gen_arr[i]][0].setFillStyle('0x0000FF')
//                 //setTimeout(out_put, 2000)
//                 //level++;
//                 // }, 5000)

//             }, 3000)
//         }
//         // 

//         // if (check(element) === true) {
//         //     console.log(element);
//         //     //level++;
//         // }

//         //reg[element][0].setFillStyle('0x6666ff')

//     }


//     //}, 2000)



//     //console.log('break');
//     // }
// }
// async function check(x) {
//     await num[x][0].on('pointerdown', () => {
//         let icheck = num[x][1]
//         if (icheck == reg[x][1]) {
//             console.log('true');
//             return true
//         }
//         console.log('false');
//         return false;
//     })
// }




export default StartReactor