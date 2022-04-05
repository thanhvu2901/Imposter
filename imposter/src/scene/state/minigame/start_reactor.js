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

let left, right;
let num = new Array;
let reg = new Array;
let lightleft = new Array
let lightright = new Array
let count = 1;
let x, y

let gen_arr = new Array;
let input_arr = new Array;
let can_input = false
let level = 1
let temp;
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

        num[2] = [this.add.image(this.game.renderer.width * 5 / 8, this.game.renderer.height / 2 - 40, 'btn2').setDepth(1).setInteractive(), 2]
        num[5] = [this.add.image(this.game.renderer.width * 5 / 8, this.game.renderer.height / 2 + 10, 'btn5').setDepth(1).setInteractive(), 5]
        num[8] = [this.add.image(this.game.renderer.width * 5 / 8, this.game.renderer.height / 2 + 60, 'btn8').setDepth(1).setInteractive(), 8]

        num[1] = [this.add.image(this.game.renderer.width * 5 / 8 - 50, this.game.renderer.height / 2 - 40, 'btn1').setDepth(1).setInteractive(), 1]
        num[4] = [this.add.image(this.game.renderer.width * 5 / 8 - 50, this.game.renderer.height / 2 + 10, 'btn4').setDepth(1).setInteractive(), 4]
        num[7] = [this.add.image(this.game.renderer.width * 5 / 8 - 50, this.game.renderer.height / 2 + 60, 'btn7').setDepth(1).setInteractive(), 7]

        num[3] = [this.add.image(this.game.renderer.width * 5 / 8 + 50, this.game.renderer.height / 2 - 40, 'btn3').setDepth(1).setInteractive(), 3]
        num[6] = [this.add.image(this.game.renderer.width * 5 / 8 + 50, this.game.renderer.height / 2 + 10, 'btn6').setDepth(1).setInteractive(), 6]
        num[9] = [this.add.image(this.game.renderer.width * 5 / 8 + 50, this.game.renderer.height / 2 + 60, 'btn9').setDepth(1).setInteractive(), 9]

        reg[2] = [this.add.rectangle(this.game.renderer.width * 3 / 8, this.game.renderer.height / 2 - 40, 45, 45, '0x6666ff').setDepth(2), 2]
        reg[5] = [this.add.rectangle(this.game.renderer.width * 3 / 8, this.game.renderer.height / 2 + 10, 45, 45, '0x6666ff').setDepth(2), 5]
        reg[8] = [this.add.rectangle(this.game.renderer.width * 3 / 8, this.game.renderer.height / 2 + 60, 45, 45, '0x6666ff').setDepth(2), 8]

        reg[1] = [this.add.rectangle(this.game.renderer.width * 3 / 8 - 50, this.game.renderer.height / 2 - 40, 45, 45, '0x6666ff').setDepth(2), 1]
        reg[4] = [this.add.rectangle(this.game.renderer.width * 3 / 8 - 50, this.game.renderer.height / 2 + 10, 45, 45, '0x6666ff').setDepth(2), 4]
        reg[7] = [this.add.rectangle(this.game.renderer.width * 3 / 8 - 50, this.game.renderer.height / 2 + 60, 45, 45, '0x6666ff').setDepth(2), 7]

        reg[3] = [this.add.rectangle(this.game.renderer.width * 3 / 8 + 50, this.game.renderer.height / 2 - 40, 45, 45, '0x6666ff').setDepth(2), 3]
        reg[6] = [this.add.rectangle(this.game.renderer.width * 3 / 8 + 50, this.game.renderer.height / 2 + 10, 45, 45, '0x6666ff').setDepth(2), 6]
        reg[9] = [this.add.rectangle(this.game.renderer.width * 3 / 8 + 50, this.game.renderer.height / 2 + 60, 45, 45, '0x6666ff').setDepth(2), 9]

        for (let i = 0; i < 5; i++) {

            lightleft[i] = this.add.image(this.game.renderer.width * 3 / 8 - 68 + 34 * i, this.game.renderer.height / 2 - 93, 'sslight').setDepth(2)
            lightright[i] = this.add.image(this.game.renderer.width * 5 / 8 - 68 + 34 * i, this.game.renderer.height / 2 - 93, 'sslight').setDepth(2)
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

        for (let i = 0; i < 4; i++) {
            setTimeout(function () {
                out_put(i)
                level++

            }, i * temp * 5000)
        }








        // if (check(5) == reg[5][1]) {
        //     if (count == 2) {
        //         count++;
        //         console.log('2');
        //         continue;
        //     }
        //     else {
        //         count = 1;
        //     }
        // }
        // reg[3][0].setFillStyle('0x0000FF')

        // reg[7][0].setFillStyle('0x0000FF')

        // reg[4][0].setFillStyle('0x0000FF')







    }
    update() {

    }


}


function out_put(i) {
    // setTimeout(() => {
    //for (let i = 0; i < level; i++) {
    // console.log('level' + level);

    // console.log(i);
    if (i < level) {
        console.log(level);
        if (i == 0) {
            input_arr.push(reg[gen_arr[0]])
            // input_arr.push(reg[gen_arr[1]])
            // console.log('input');
            //level++;
        }
        if (i == 1) {
            input_arr.push(reg[gen_arr[1]])
            // level++;
        }
        if (i == 2) {
            input_arr.push(reg[gen_arr[2]])
            //level++;
        }
        if (i == 3) {
            input_arr.push(reg[gen_arr[3]])
            // level++;
        }
        for (let j = 0; j < input_arr.length; j++) {
            temp = j
            setTimeout(() => input_arr[j][0].setFillStyle('0x0000FF'), j * 3000 + 1000)
            // input_arr[j][0].setFillStyle('0x0000FF')

            setTimeout(() => {
                input_arr[j][0].setFillStyle('0x6666ff')
                // level++;
                // console.log('level' + level);

            }, j * 3000 + 2000)

        }


        //console.log(input_arr);


        // }, i * 3000)
        //  level++;
        //}

        // 

        //     // if (check(element) === true) {
        //     //     console.log(element);
        //     //     //level++;
        //     // }

        //     //reg[element][0].setFillStyle('0x6666ff')

    }


    //}, 2000)


    //console.log('break');
    // }
}
async function check(x) {
    await num[x][0].on('pointerdown', () => {
        let icheck = num[x][1]
        if (icheck == reg[x][1]) {
            console.log('true');
            return true
        }
        console.log('false');
        return false;
    })
}

export default StartReactor