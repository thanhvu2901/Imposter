import Phaser from "phaser";
import win from "../../../assets/img/end/win.jpg";
import lose from  "../../../assets/img/end/lose.jpg";
import chat from "../../../assets/chat.html"
import input from "../../../assets/test.html"
let ejected,text,sample,count=0,count_1=0
let temp = chat
class Demo extends Phaser.Scene {

  constructor() {
    super({ key: "demo" });

  }

init(data){

  this.name=data.name
  this.socket=data.socket
  this.roomKey=data.roomKey
}
  preload() {
  
  
  }

  create() {
    this.scene.bringToTop()
    
    this.input.keyboard.clearCaptures()
temp+=`	<ul id="chat">
<li class="me">
<div class="entete">
    <h3>10:12AM, Today</h3>
    <h2>Vincent</h2>
    <span class="status blue"></span>
</div>
<div class="triangle"></div>
<div class="message">
    chat open
</div>
</li>
</ul>`
let temp3=``
let temp1 = this.add.dom(500,300).createFromHTML(temp)
console.log(temp1)
let temp2= this.add.dom(500,600).createFromHTML(input)
let temp6 = temp1.getChildByID("chat")
let closeBtn = this.add.image(860, 180, 'closeBtn').setScale(0.8)
closeBtn.setInteractive({ useHandCursor: true });
closeBtn.on('pointerdown', () => {
temp1=this.add.dom(500,300).createFromHTML(temp)
temp2=this.add.dom(500,600).createFromHTML(input)
//temp6 = temp1.getChildByID("chat")
temp=chat
this.socket.removeListener("send")
  this.scene.stop("demo")
})
let game=this
let enter = this.input.keyboard.on('keydown-' + 'ENTER', function (event) {
  let temp= temp2.getChildByName('nameField')
game.socket.emit("message",game.socket.id,game.name,temp.value,game.roomKey)
temp.value=''


})
this.socket.on("send",(id,name,message)=>{
  if(id!=this.socket.id){
  temp3+=`
<li class="you">
<div class="entete">
    <h3>10:12AM, Today</h3>
    <h2>${name}</h2>
    <span class="status blue"></span>
</div>
<div class="message">
    ${message}
</div>
</li>`
let temp4=`<ul id="chat">
${temp3}
</ul>`
temp1.setHTML(chat+temp4)
let temp6=temp1.getChildByID("chat")
temp6.scrollTop=temp6.scrollHeight
}
else{
  temp3+=`
<li class="me">
<div class="entete">
    <h3>10:12AM, Today</h3>
    <h2>${name}</h2>
    <span class="status blue"></span>
</div>
<div class="message">
    ${message}
</div>
</li>`
let temp4=`<ul id="chat">
${temp3}
</ul>`
temp1.setHTML(chat+temp4)
let temp6=temp1.getChildByID("chat")
temp6.scrollTop=temp6.scrollHeight
}
})
  }
  

  update() {
    
  }

}

export default Demo;