import Phaser from "phaser";
import screen1 from "../../../assets/img/Voting Screen/screens/screen1.png";
import chat_icon from "../../../assets/img/Voting Screen/icons/chat_icon.png";
import player_background from "../../../assets/img/Voting Screen/misc/player_background.png";
import player_avatar from "../../../assets/img/Voting Screen/icons/player_avatar_big.png";
import mini_avatar from "../../../assets/img/Voting Screen/icons/player_avatar_small.png";
import skip_vote from "../../../assets/img/Voting Screen/icons/skip_vote.png";
import speaker from "../../../assets/img/Voting Screen/icons/speaker.png";
import x_symbol from "../../../assets/img/Voting Screen/icons/x_symbol.png";
import voted_mark from "../../../assets/img/Voting Screen/icons/voted_mark.png";

var main_screen, chat_icon_img, title, skip_vote_button, voting_count,timedEvent,timer=30000,can_vote=true,speaker_group,dead;
let player_list =new Map()
let player_count = new Map()
let player_vote = new Map()
const coordinates = [
  [305, 235],
  [305, 310],
  [305, 385],
  [305, 460],
  [305, 535],
  [675, 235],
  [675, 310],
  [675, 385],
  [675, 460],
  [675, 535],
];

class VotingScreen extends Phaser.Scene {
  constructor() {
    super({ key: "vote" });
  }
  init(data) {
    this.socket = data.socket;
    this.numPlayers = data.numPlayers;
    this.idPlayers = data.idPlayers;
    this.namePlayers=data.namePlayers
    this.roomKey=data.roomId
    this.dead=data.deadlist
    this.role=data.role
    
  }
 async preload() {
    this.load.image("screen1", screen1);
    this.load.image("chat_icon", chat_icon);
    this.load.image("player_background", player_background);
    this.load.image("player_avatar_big", player_avatar);
    this.load.image("player_avatar_small", mini_avatar);
    this.load.image("skip_vote", skip_vote);
    this.load.image("speaker", speaker);
    this.load.image("x_symbol", x_symbol);
    this.load.image("voted_mark", voted_mark);
  }

async  create() {
 
    console.log(this.dead)
    speaker_group=this.add.group()
    this.scene.bringToTop();
    main_screen = this.add.image(512, 384, "screen1")
    chat_icon_img = this.add.image(
      main_screen.width - 12,
      main_screen.height - 412,
      "chat_icon"
    );
    chat_icon_img.setInteractive().on('pointerdown', () => {
    
      this.scene.launch('demo',{socket:this.socket,name:this.namePlayers[this.idPlayers.indexOf(this.socket.id)],roomKey:this.roomKey})
    })
    title = this.add.text(
      main_screen.width / 2 - 175,
      main_screen.height / 2 - 150,
      "Who Is The Impostor?",
      {
        stroke: "#000000",
        strokeThickness: 4,
        fontSize: "45px",
        align: "center",
        fontFamily: "Arial",
        fontStyle: "",
        color: "#ffffff",
      }
    );
    var players = this.bulkGeneratePlayer(coordinates, this.numPlayers);
    this.idPlayers.forEach(element => {
      player_count.set(element,0)
    });
    this.socket.on("vote_otherplayer",(playerid)=>{
     // console.log("id:",playerid)
     let count = player_count.get(playerid)
     count+=1
     player_count.set(playerid,count)
      //console.log(count)
     let list = player_list.get(playerid)
     list.getChildren()[count-1].setVisible(true)
    })
   this.socket.on("voter_id",(playerid)=>{
     player_vote.get(playerid).setVisible(true)
   })

    skip_vote_button = this.add.image(205, 600, "skip_vote");
    voting_count = this.add.text(640, 582, "", {
      fontSize: "25px",
      color: "#FF0000",
      fontFamily: "Arial",
      stroke: "#000000",
      strokeThickness: 3,
    });
  
    if(this.dead.includes(this.socket.id)){
      speaker_group.setVisible(false)
    }
    timedEvent = this.time.addEvent({ delay: timer,callback:()=>{
     let check = false
  if(this.numPlayers>1){
     const mapSort1 = new Map([...player_count.entries()].sort((a, b) => b[1] - a[1]));
      if([...mapSort1][0][1]==[...mapSort1][1][1]){

        this.socket.emit("vote_end",3,0,this.roomKey)
      }else if([...mapSort1][0][0]==this.socket.id){
        if(this.role==1){
          this.socket.emit("remove",this.roomKey,this.socket.id,1)
          this.socket.emit("vote_end",1,this.socket.id,this.roomKey)
        }else{
          this.socket.emit("remove",this.roomKey,this.socket.id,2)
          this.socket.emit("vote_end",2,this.socket.id,this.roomKey)
        }
      }}
    //  this.socket.emit("vote_end")
  can_vote=true
      exit(this)
    
      
   
    }});
    

    
  }
update(){
voting_count.setText("Voting Ends In: "+((timer-timedEvent.getElapsed())/1000).toFixed(0))
}
  generatePlayerBackground(x, y, num, numOfPlayers,id) {
  
    var background = this.add.image(x, y, "player_background");

    // Circle để xác định vị trí x,y của background
    // this.add.circle(x, y, 5, 0xff0000, 0.5);
    
    var avatar = this.add.image(x - 135, y, "player_avatar_big");
    var name = this.add.text(x - 100, y - 30, this.namePlayers[num-1], {
      fontSize: "25px",
    //  color: "#ffffff",
      fontFamily: "Arial",
      stroke: "#000000",
      strokeThickness: 3,
    });
    var speaker = this.add.image(x + 130, y, "speaker").setInteractive();
    if(this.socket.id==id){
      name.setColor("#fc0303")
      speaker.setVisible(false)

    }
    if(this.dead.includes(id)){
      background.setTint(0x707070)
      speaker.setVisible(false)
    }
     player_vote.set( id,this.add.image(avatar.x - 30, y - 25, "voted_mark").setVisible(false))
    
    if(this.socket.id!=id&& !this.dead.includes(id)){
    speaker.setAlpha(1);
  }
    else{
      speaker.setAlpha(0.5);
    }
    
speaker.on('pointerdown',()=>{
if(this.socket.id!=id && can_vote==true&&  !this.dead.includes(id) ){

this.socket.emit("vote",this.socket.id,id,this.roomKey)

speaker_group.setAlpha(0.5)
can_vote=false
}
})
speaker_group.add(speaker)
    var x_symbol = this.add.image(avatar.x, y, "x_symbol");
    x_symbol.setVisible(false);

  let temp=  this.add.group({
key:"player_avatar_small",
frameQuantity: 10

    })
let temp1=temp.getChildren()
    var voted_players = [];
    for (var i = 0; i < 10; i++) {
      temp1[i].setPosition( (avatar.x + 50) + (i * 28),y + 15)
      // var votedPlayer = this.add.image(
      //   (avatar.x + 50) + (i * 28),
      //   y + 15,
      //   "player_avatar_small"
      // );
     // voted_players.push(votedPlayer);
    }
    player_list.set(this.idPlayers[num-1],temp);
    temp.setVisible(false)
    var player = {
      background: background,
      avatar: avatar,
      name: name,
      speaker: speaker,
      x_symbol: x_symbol,
      voted_mark: voted_mark,
      voted_players: voted_players,
    };
    return player;
  }

  bulkGeneratePlayer(coordinates, numOfPlayers) {
    if (numOfPlayers <= coordinates.length) {
      var players = [];
      for (var i = 0; i < numOfPlayers; i++) {
        var player = this.generatePlayerBackground(
          coordinates[i][0],
          coordinates[i][1],
          i + 1,
          numOfPlayers,
          this.idPlayers[i]
        );
       
      }
      return players;
    } else {
      console.log("Number of players is greater than 10");
    }
  }
 
}
function exit(game){
  game.scene.stop()
  game.socket.removeListener("vote_otherplayer");
  game.socket.removeListener("voter_id");
  game.socket.removeListener("dead_list")
    }
   async function update(value){
    dead=value
    }
export default VotingScreen;
