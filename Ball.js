function Ball () {
	let self = {
    start : false,
    pos : {
      x : 400,
      y : 250,
    },
    radius : 20,
    speed : {
      x : 25,
      y : 20,
    },
    Player1Score : 0,
    Player2Score : 0,
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
    if (Object.keys(Ball.player_list).length >= 2 ) {
      self.start = true;
    }else{
      self.start = false;
    }

    if (self.start) {
      if ( self.pos.y < self.radius || self.pos.y > 500 - self.radius ) {
        self.acc.y *= -1;
      };
      self.pos.x += self.acc.x;
      self.pos.y += self.acc.y;
      self.out();
      self.collision();
    };

    return {pos : { x : self.pos.x, y : self.pos.y}, radius : self.radius, scores: {Player1Score: self.Player1Score, Player2Score : self.Player2Score}};
  };
  
  self.out = () => {
    if (self.pos.x <= 0){
      self.Player2Score++;
      self.setAcc();
      self.pos = { x : 400, y : 250 };
    }else if ( self.pos.x >= 800 ) {
      self.Player1Score++;  
      self.setAcc();
      self.pos = { x : 400, y : 250 };
    }
  };

  self.collision = () => {
    for (let id in Ball.player_list){
      let player = Ball.player_list[id];
      let deltaX = self.pos.x - Math.max(player.pos.x, Math.min(self.pos.x, player.pos.x + player.width));
      let deltaY = self.pos.y - Math.max(player.pos.y, Math.min(self.pos.y, player.pos.y + player.height));
      if ((Math.pow(deltaX, 2) + Math.pow(deltaY, 2))< Math.pow(self.radius, 2)){
        self.acc.x *= -1;
      };
    };
  };

  self.reset = () => {
    Ball.player_list = {};
    self.start = false;
    self.pos = {
      x : 400,
      y : 250,
      };
    self.Player1Score = 0;
    self.Player2Score = 0;
    };

  return self;
};

module.exports = { Ball };