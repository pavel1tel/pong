

const { Player } = require("./Player.js");
const { Ball } = require("./Ball.js")
const express = require('express');
const app = express();
let player_counter = 0;
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

const path = require('path');
const io = require('socket.io').listen(server);
app.use(express.static('public'));
let SOCKET_LIST = {};
let ball = Ball();
ball.setAcc();



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});


Player.list = {};
io.on('connection', socket => {
  socket.id = Math.random();
  if ( Object.keys(SOCKET_LIST).length < 2 ) {
    SOCKET_LIST[socket.id] = socket;
  };
  let player = Player(socket.id, player_counter);
  player_counter++;
  Player.list[player.id] = player;
  Ball.player_list = Player.list;
  socket.on('disconnect', () => {
    player_counter = 0;
    for ( let id in SOCKET_LIST ){
      let socket = SOCKET_LIST[id];
      socket.emit("Over");
      socket.disconnect(true);
      delete SOCKET_LIST[id];
    };
    player.onDisconnect();
    ball.reset();
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
  if ( player_counter < 2 ) {
    for (let id in SOCKET_LIST){
      let socket = SOCKET_LIST[id];
      socket.emit('Waiting');
      return;
    };
  }
  if (Object.keys(SOCKET_LIST).length === 2 ){
    let pack = {}; 
    pack.players = Player.update();
    pack.ball = ball.update();
    for (let id of Object.keys(SOCKET_LIST)){
      let socket = SOCKET_LIST[id];
      socket.emit('newPosition', pack);
    };
    return;
  };
}, 1000/40);
