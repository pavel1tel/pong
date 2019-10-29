function Right (){
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

  this.up = () => this.acc.y -= this.speed;
  this.down = () => this.acc.y += this.speed;
  this.stop = () => this.acc.y = 0;

  this.update = () => {
    this.acc.y = constrain(this.acc.y, -this.maxSpeed, this.maxSpeed);
    this.pos.add(this.acc);
    this.pos.y = constrain(this.pos.y, 0, height-this.height);
  }
}
