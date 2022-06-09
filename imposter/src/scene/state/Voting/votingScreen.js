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

var main_screen, chat_icon_img, title, skip_vote_button, voting_count,timedEvent,timer=5000;
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

  preload() {
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

  create() {
    this.scene.bringToTop();

    main_screen = this.add.image(512, 384, "screen1")
    chat_icon_img = this.add.image(
      main_screen.width - 12,
      main_screen.height - 412,
      "chat_icon"
    );
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
    var players = this.bulkGeneratePlayer(coordinates, 3);
  //  console.log(players);
    // // Left side
    // player_background_img = this.add.image(305, 235, "player_background");
    // this.add.image(170, 235, "player_avatar_big");
    // this.add.text(205, 205, "Player 1", {
    //   fontSize: "27px",
    //   color: "#ffffff",
    //   fontFamily: "Arial",
    //   stroke: "#000000",
    //   strokeThickness: 3,
    // });

    // this.add.image(305, 310, "player_background");
    // this.add.image(170, 310, "player_avatar_big");
    // this.add.text(205, 280, "Player 2", {
    //   fontSize: "27px",
    //   color: "#ffffff",
    //   fontFamily: "Arial",
    //   stroke: "#000000",
    //   strokeThickness: 3,
    // });

    // this.add.image(305, 385, "player_background");
    // this.add.image(170, 385, "player_avatar_big");
    // this.add.text(205, 355, "Player 3", {
    //   fontSize: "27px",
    //   color: "#ffffff",
    //   fontFamily: "Arial",
    //   stroke: "#000000",
    //   strokeThickness: 3,
    // });

    // this.add.image(305, 460, "player_background");
    // this.add.image(170, 460, "player_avatar_big");
    // this.add.text(205, 430, "Player 4", {
    //   fontSize: "27px",
    //   color: "#ffffff",
    //   fontFamily: "Arial",
    //   stroke: "#000000",
    //   strokeThickness: 3,
    // });

    // this.add.image(305, 535, "player_background");
    // this.add.image(170, 535, "player_avatar_big");
    // this.add.text(205, 505, "Player 5", {
    //   fontSize: "27px",
    //   color: "#ffffff",
    //   fontFamily: "Arial",
    //   stroke: "#000000",
    //   strokeThickness: 3,
    // });

    // // Right side
    // this.add.image(675, 235, "player_background");
    // this.add.image(540, 235, "player_avatar_big");
    // this.add.text(575, 205, "Player 6", {
    //   fontSize: "27px",
    //   color: "#ffffff",
    //   fontFamily: "Arial",
    //   stroke: "#000000",
    //   strokeThickness: 3,
    // });

    // this.add.image(675, 310, "player_background");
    // this.add.image(540, 310, "player_avatar_big");
    // this.add.text(575, 280, "Player 7", {
    //   fontSize: "27px",
    //   color: "#ffffff",
    //   fontFamily: "Arial",
    //   stroke: "#000000",
    //   strokeThickness: 3,
    // });

    // this.add.image(675, 385, "player_background");
    // this.add.image(540, 385, "player_avatar_big");
    // this.add.text(575, 355, "Player 8", {
    //   fontSize: "27px",
    //   color: "#ffffff",
    //   fontFamily: "Arial",
    //   stroke: "#000000",
    //   strokeThickness: 3,
    // });

    // this.add.image(675, 460, "player_background");
    // this.add.image(540, 460, "player_avatar_big");
    // this.add.text(575, 430, "Player 9", {
    //   fontSize: "27px",
    //   color: "#ffffff",
    //   fontFamily: "Arial",
    //   stroke: "#000000",
    //   strokeThickness: 3,
    // });

    // this.add.image(675, 535, "player_background");
    // this.add.image(540, 535, "player_avatar_big");
    // this.add.text(575, 505, "Player 10", {
    //   fontSize: "27px",
    //   color: "#ffffff",
    //   fontFamily: "Arial",
    //   stroke: "#000000",
    //   strokeThickness: 3,
    // });

    skip_vote_button = this.add.image(205, 600, "skip_vote");
    voting_count = this.add.text(640, 582, "", {
      fontSize: "25px",
      color: "#FF0000",
      fontFamily: "Arial",
      stroke: "#000000",
      strokeThickness: 3,
    });
    timedEvent = this.time.addEvent({ delay: timer,callback:()=>{
      exit(this)
    }});
    
  }
update(){
  console.log(timer/1000,timedEvent.getElapsed())
voting_count.setText("Voting Ends In: "+((timer-timedEvent.getElapsed())/1000).toFixed(0))
}
  generatePlayerBackground(x, y, num, numOfPlayers) {
    var background = this.add.image(x, y, "player_background");

    // Circle để xác định vị trí x,y của background
    // this.add.circle(x, y, 5, 0xff0000, 0.5);
    
    var avatar = this.add.image(x - 135, y, "player_avatar_big");
    var name = this.add.text(x - 100, y - 30, "Player " + num, {
      fontSize: "25px",
      color: "#ffffff",
      fontFamily: "Arial",
      stroke: "#000000",
      strokeThickness: 3,
    });
    var speaker = this.add.image(x + 130, y, "speaker");
    speaker.setAlpha(0.5);

    var x_symbol = this.add.image(avatar.x, y, "x_symbol");
    x_symbol.setVisible(false);

    var voted_mark = this.add.image(avatar.x - 30, y - 25, "voted_mark");

    var voted_players = [];
    for (var i = 0; i < numOfPlayers; i++) {
      var votedPlayer = this.add.image(
        (avatar.x + 50) + (i * 28),
        y + 15,
        "player_avatar_small"
      );
      voted_players.push(votedPlayer);
    }

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
          numOfPlayers
        );
        players.push(player);
      }
      return players;
    } else {
      console.log("Number of players is greater than 10");
    }
  }
 
}
function exit(game){
  game.scene.stop()
    }
export default VotingScreen;
