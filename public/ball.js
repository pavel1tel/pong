function Ball () {
  this.pos = createVector(CANVAS_WITDTH/2, CANVAS_HEIGHT/2);
  this.radius = 10;
  this.maxSpd = createVector(20,15);

  this.show = () => {
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.radius*2)
  }

  this.update = () => {
    this.pos.add(this.acc);
    if (this.pos.y<this.radius || this.pos.y > CANVAS_HEIGHT - this.radius){
      this.acc.y *= -1;
    }
  }

  this.setAcc = (x, y) => {
    this.acc = createVector(x, y);
  }

  this.setPos = (x, y) => {
    this.pos = createVector(x, y);
  }
}
