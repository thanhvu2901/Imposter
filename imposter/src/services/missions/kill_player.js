class KillPlayer {
  constructor(scene, x, y, listOtherPlayer) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.listOtherPlayer = listOtherPlayer;
  }

  perform() {
    for (let otherPlayer of this.listOtherPlayer) {
      if (
        Math.abs(Math.floor(this.x) - Math.floor(otherPlayer.x)) <= 100 &&
        Math.abs(Math.floor(this.y) - Math.floor(otherPlayer.y)) <= 100
      ) {
        return otherPlayer;
      }
    }
  }
}
export default KillPlayer;
