

const { Player } = require("./Player.js");
const { Ball } = require("./Ball.js")
const express = require('express');
const app = express();
const port = 3000;
let player_counter = 0;

const server = app.listen(process.env.port || port, () => {
  console.log('Server running on port ' + port);
});

const path = require('path');
const io = require('socket.io').listen(server);
app.use(express.static('public'));
let SOCKET_LIST = {};
let PLAYER_LIST = {};
let ball = Ball();
ball.setAcc();



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});


io.on('connection', socket => {
  console.log('a user connected');
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;
  let ball = Ball();
  let player = Player(socket.id, player_counter);
  player_counter++;
  PLAYER_LIST[player.id] = player;
  socket.on('disconnect', () => {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[player.id];
  });

  socket.on('keyPressed', (data) => {
    if (data.inputId === 'down'){
      player.pressingDown = data.state;
    }else if (data.inputId === 'up'){
      player.pressingUp = data.state;
    };
  });

}); 


setInterval(() => {
  let pack = {}; 
  let pack_player = [];
  for (let id in PLAYER_LIST){
    let player = PLAYER_LIST[id];
    ball.collision = () => {
      let deltaX = ball.pos.x - Math.max(player.pos.x, Math.min(ball.pos.x, player.pos.x + player.width));
      let deltaY = ball.pos.y - Math.max(player.pos.y, Math.min(ball.pos.y, player.pos.y + player.height));
      if ((Math.pow(deltaX, 2) + Math.pow(deltaY, 2))< Math.pow(ball.radius, 2)){
        ball.acc.x *= -1;
      };
    };
    ball.collision();
    player.updatePosition();
    pack_player.push({
      self : player,
    })
  };
  if ( Object.keys(PLAYER_LIST).length >= 2 ) {
    ball.start = true;
  };

  
  ball.out();
  pack.players = pack_player;
  pack.ball = ball.update();
  for (let id in SOCKET_LIST){
    let socket = SOCKET_LIST[id];
    socket.emit('newPosition', pack);
  };
  }, 1000/40);
