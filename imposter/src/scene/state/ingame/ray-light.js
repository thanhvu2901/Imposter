class Light{
constructor(scene){
this.scene= scene
this.raycaster = this.scene.raycasterPlugin.createRaycaster( );;
this.ray = this.raycaster.createRay();
this.graphics=this.scene.add.graphics();;
this.maskGraphics=null;
this.mask=null;
this.fov=null;
this.intersections = this.ray.castCircle();
this.raycaster.setBoundingBox(-2000, -2000, 4000, 4000);


    }
map(object){
    this.raycaster.mapGameObjects(object);
}

position(player){
    this.ray.setOrigin(player.x, player.y);
}
draw() {
 
this.graphics.clear();
this.maskGraphics.clear();
this.maskGraphics.fillPoints(this.intersections);

  }
createFOV(){
    this.maskGraphics = this.scene.add.graphics({ fillStyle: { color: 0xffffff, alpha: 0.2 }});
    this.mask = new Phaser.Display.Masks.GeometryMask(this.scene, this.maskGraphics);
    this.mask.setInvertAlpha();
    this.fov = this.scene.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.6 } });
    this.fov.setMask(this.mask);
    this.fov.fillRect(-2000, -2000, 4000, 4000);
  }
update(player){
    this.ray.setOrigin(player.x, player.y);
    this.intersections = this.ray.castCircle();
    //redraw
    this.draw()
   
  }
}
export default Light