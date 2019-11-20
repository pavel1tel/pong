function Player (id, number) {
	let self = {
		id : id,
		height : 80,
		width : 15,
		speed : 20,
		number : number,
		pressingUp : false,
		pressingDown : false,
	};
	self.pos = {
		x : 30 + 740 * self.number,
		y : 210,
	};

	self.updatePosition = () => {
		if ( self.pressingUp ){
      if ( self.pos.y >= 0){
  		  self.pos.y -= self.speed;
      };
		};
		if ( self.pressingDown ){
      if (self.pos.y <= 420){
		    self.pos.y += self.speed;
      };
		};
	};
  self.onDisconnect = () => {
    Player.list = {};
  }

  Player.update = () => {
    let pack_player = [];
    for (let id in Player.list){
      let player = Player.list[id];
      player.updatePosition();
      pack_player.push({
        self : player,
      })
    };
    return pack_player;
  };

  Player.list[self.id] = self;
	return self;
};

module.exports = { Player };
