class Explosives{

  constructor(location, ability, mouseLocation){
    // issue#1 use preloaded bullet image instead of loadImage

    this.loc = location;
    this.start = 5.0;
    this.radius = this.start;
    this.kills = false;
    this.ability = ability;
    if(this.ability = "cannon"){
    this.growthSpeed = 3;
    }else{
      this.growthSpeed = 4;
    }
  }

  run(){
    this.render();
    this.update();

  }

  render(){
    var ctx = towerGame.context;
    ctx.fillStyle = 'orange';
    ctx.beginPath();


    ctx.ellipse(this.loc.x, this.loc.y, this.radius, this.radius, 0, 2*Math.PI, false);
    ctx.fill();

    ctx.restore();
    
  }

  update(){

    if(this.radius <= 30){
      this.radius += this.growthSpeed;
     }  else {
 
       this.kills = true;
     }
  }
}//  end Bullet class
