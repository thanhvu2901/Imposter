import Phaser from "phaser";
import medBay_back from '../../../assets/tasks/Inspect Sample/medbay_back.png'
import medBay_buttonConfirm from '../../../assets/tasks/Inspect Sample/medbay_buttonConfirm.png'
import medBay_dispenser from '../../../assets/tasks/Inspect Sample/medbay_dispenser.png'
import medBay_glassback from '../../../assets/tasks/Inspect Sample/medbay_glassback.png'
import medBay_glassfront from '../../../assets/tasks/Inspect Sample/medbay_glassFrontTestTubes.png'
import medBay_liquid from '../../../assets/tasks/Inspect Sample/medbay_liquid.png'
import medBay_panelbottom from '../../../assets/tasks/Inspect Sample/medbay_panelbottom.png'
import medBay_panelcenter from '../../../assets/tasks/Inspect Sample/medbay_panelcenter.png'
import medBay_paneltop from '../../../assets/tasks/Inspect Sample/medbay_paneltop.png'
import medBay_sampleButton from '../../../assets/tasks/Inspect Sample/medbay_sampleButton.png'

let text, text2, text3, countdown, timedEvent
let sampleBtn, btnConfirm;
let x, y;
let sprite, current_scene;
let eventsCenter;

class InspectSample extends Phaser.Scene {
    init(data) {
        x = data.x;
        y = data.y;
        sprite = data.sprite;
        eventsCenter = data.eventsCenter;
    }

    constructor() {
        super({
            key: 'inspectSample'
        })
    }

    preload() {
        this.load.image('back', medBay_back)
        this.load.image('btnConfirm', medBay_buttonConfirm)
        this.load.image('dispenser', medBay_dispenser)
        this.load.image('glassBack', medBay_glassback)
        this.load.image('glassFront', medBay_glassfront)
        this.load.image('liquid', medBay_liquid)
        this.load.image('panelBottom', medBay_panelbottom)
        this.load.image('panelCenter', medBay_panelcenter)
        this.load.image('panelTop', medBay_paneltop)
        this.load.image('sampleButton', medBay_sampleButton)



    }
    create() {
        current_scene = this.scene
        text = this.add.text(10, 10, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);


        text2 = this.add.text(415, 590, 'PRESS TO START!!       -->', { font: '16px Courier', fill: '#00ff00' }).setDepth(1);
        countdown = this.add.text(440, 158, 'fill all liquid ', { font: '16px Courier', fill: '#00ff00' }).setDepth(1);

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'back')
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 193, 'panelBottom')
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 50, 'panelCenter')
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - 220, 'panelTop')

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 3, 'glassBack')
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - 28, 'glassFront')

        let dispase = this.add.image(415, 210, 'dispenser')

        let li1 = this.add.image(415, 365, 'liquid')
        let li2 = this.add.image(415 + 63, 365, 'liquid')
        let li3 = this.add.image(415 + 63 * 2, 365, 'liquid')
        let li4 = this.add.image(415 + 63 * 3, 365, 'liquid')
        let li5 = this.add.image(415 + 63 * 4, 365, 'liquid')

        this.add.image(415, 548, 'sampleButton')
        sampleBtn = this.add.image(415 + 63, 548, 'sampleButton');
        this.add.image(415 + 63 * 2, 548, 'sampleButton')
        this.add.image(415 + 63 * 3, 548, 'sampleButton')
        this.add.image(415 + 63 * 4, 548, 'sampleButton')

        btnConfirm = this.add.image(710, 597, 'btnConfirm').setInteractive();

        btnConfirm.on('pointerdown', () => {
            //fill liquid


            li1.setTint('0x00ff00')

            setTimeout(() => {
                dispase.setPosition(415 + 63, 210);
                li2.setTint('0x00ff00')

            }, 1000)

            setTimeout(() => {
                li3.setTint('0x00ff00')
                dispase.setPosition(415 + 63 * 2, 210)
            }, 2000)

            setTimeout(() => {
                li4.setTint('0x00ff00')
                dispase.setPosition(415 + 63 * 3, 210)
            }, 3000)

            setTimeout(() => {
                dispase.setPosition(415 + 63 * 4, 210)
                li5.setTint('0x00ff00')
                this.initialTime = 10;
                //    countdown.setText('time remaining: ' + formatTime(this.initialTime))
                timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
            }, 4000)

            setTimeout(() => {

                li2.setTint('0xFF0000')
                sampleBtn.setTint('0xFF0000')
                sampleBtn.setInteractive();

            }, 10000)


        })

        sampleBtn.on('pointerdown', () => {
            //  console.log('samplebtn');
            // this.destrtoy();
            // this.scene.remove()
            sprite.tint = 0;
            eventsCenter.emit("continue_scene_game", { x: x, y: y, mission: "InspectSample" });
            current_scene.stop("inspectSample");
        })

    }


    update() {


        //countdown.setText('time remaining: ' + formatTime(this.initialTime))
    }
}

function formatTime(seconds) {
    // Minutes
    var minutes = Math.floor(seconds / 60);
    // Seconds
    var partInSeconds = seconds % 60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2, '0');
    if (partInSeconds < 0) {
        return 0;
    }
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}

function onEvent() {
    this.initialTime -= 1; // One second
    countdown.setText('Countdown: ' + formatTime(this.initialTime));
}
export default InspectSample;