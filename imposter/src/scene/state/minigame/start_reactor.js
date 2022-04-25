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
let can_input = false
let level = 1;

let loop = 0
let delay = 0
let count = 0;
let isgameover = false

let ob;
class StartReactor extends Phaser.Scene {
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
    create() {
        this.add.image(this.game.renderer.width * 3 / 8, this.game.renderer.height / 2, 'base').setDepth(0)
        this.add.image(this.game.renderer.width * 5 / 8, this.game.renderer.height / 2, 'base').setDepth(0)

        this.add.image(this.game.renderer.width * 3 / 8, this.game.renderer.height / 2 - 90, 'light').setDepth(1)
        this.add.image(this.game.renderer.width * 5 / 8, this.game.renderer.height / 2 - 90, 'light').setDepth(1)


        this.add.image(this.game.renderer.width * 3 / 8, this.game.renderer.height / 2 + 10, 'sayScreen').setDepth(1)

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

            lightleft[i] = this.add.image(this.game.renderer.width * 3 / 8 - 68 + 34 * i, this.game.renderer.height / 2 - 93, 'sslight').setDepth(2)
            lightright[i] = this.add.image(this.game.renderer.width * 5 / 8 - 68 + 34 * i, this.game.renderer.height / 2 - 93, 'sslight').setDepth(2)
        }

        for (let i = 1; i <= 5; i++) {
            let rand = Math.floor(Math.random() * 9) + 1;
            gen_arr.push(rand)
        }

        for (let i = 1; i <= 9; i++) {

        }

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




export default StartReactor