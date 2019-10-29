function Opponent (){
  this.height = 80;
  this.weight = 15;
  this.pos = createVector(CANVAS_WITDTH-this.weight*2, CANVAS_HEIGHT/2- this.height/2);
  this.acc = createVector(0,0);
  this.speed = 15;
  this.maxSpeed = 15;

  this.show = () => {
    noStroke();
    fill(255);
    rect(this.pos.x, this.pos.y, this.weight, this.height);
  }
}
