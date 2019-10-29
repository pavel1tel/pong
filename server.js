const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const Websocket = require('ws');
const ws = new Websocket.Server({server, port:8000});
app.use(express.static('public'));



app.get('/',function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(process.env.port || 3000);


const clients = [null,null];

ws.on('connection', (ws) => {
  clients[clients.indexOf(null)]= ws; 
  const player_num = clients.indexOf(ws) + 1;
  ws.send(JSON.stringify({setup: player_num}));
  ws.send(JSON.stringify({setup: player_num}));
  if (ws.readyState === 1){
      
  ws.on('message', (message) => {
    console.log(message);
    clients.forEach(client => {
      if (client !== null && client.readyState === 1 && client !== ws){
      client.send(message);
      }}
)})}
  ws.on("close", (reasonCode, description) => {
    clients[clients.indexOf(ws)] = null;
  })
});



console.log('Running at Port 8000');

