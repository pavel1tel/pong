function Ball () {
	let self = {
    start : false,
    pos : {
      x : 400,
      y : 250,
    },
    radius : 20,
    speed : {
      x : 20,
      y : 15,
    },
  };

  self.setAcc = (x, y) => {
    do{
      x = Math.random()*12 - 6;
      y = Math.random()*12 - 6;
    }while(Math.abs(x) < 3 || Math.abs(y) < 3);

    self.acc = {
      x : x,
      y : y,
    }
  };

  self.update = () => {
    if (self.start) {
      if ( self.pos.y < self.radius || self.pos.y > 500 - self.radius ) {
        self.acc.y *= -1;
      };
      self.pos.x += self.acc.x;
      self.pos.y += self.acc.y;
    };

    return {pos : { x : self.pos.x, y : self.pos.y}, radius : self.radius};
  };
  
  self.out = () => {
    if (self.pos.x <= 0 || self.pos.x >= 800){
      self.setAcc();
      self.pos = { x : 400, y : 250 }
    };
  };
  return self;
};

module.exports = { Ball };