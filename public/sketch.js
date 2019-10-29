const dots = [];
let Player1;
let Player2;
let ball;
const dSize = 10;
const CANVAS_HEIGHT = 500;
const CANVAS_WITDTH = 800;
const TEXT_SIZE = 15;
let Player1Score = 0;
let Player2Score = 0;
function setup(){
  Player1 = new player;
  Player2 = new Opponent;
  createCanvas(CANVAS_WITDTH, CANVAS_HEIGHT);
  ball = new Ball; 
  for (let y = dSize/2; y<CANVAS_HEIGHT; y+=dSize*2) {
    dots.push(createVector(width/2-dSize/2, y));
  }
}

function draw(){
  clear();
  noStroke();
  fill(255,100);
  background(0);
  drawSqueres();
  socket.onmessage = event => {
    if(JSON.parse(event.data).setup){
      player_num = JSON.parse(event.data).setup;
    }
    else{
      if (JSON.parse(event.data).player === 1){
      Player1[JSON.parse(event.data).move]();
  }}}
  if (keyIsDown(DOWN_ARROW)){
    Player1.down();
    console.log('down')
    socket.send(JSON.stringify({player: player_num, move: "down"}));
  }
  else if (keyIsDown(UP_ARROW)){
    Player1.up();
    console.log('up')
    socket.send(JSON.stringify({player: player_num, move: "up"}));
  }
  Player1.show();
  ball.update();
  ball.show();
  Player1.update();
  drawScores();
  Player2.show();

  function drawScores(){
    const x1 = CANVAS_WITDTH/4;
    const x2 = CANVAS_WITDTH*3/4;
    const y = TEXT_SIZE*1.5;

    noStroke();
    fill(255);
    textSize(TEXT_SIZE);
    text(Player1Score, x1, y);
    text(Player2Score, x2, y);
  }
}

function drawSqueres () {
  for (let i = 0; i<dots.length; i++){
    const x = dots[i].x;
    const y = dots[i].y;
    
    rect(x, y, dSize, dSize);
  }
}


function keyReleased(){
  if((key == "W" || keyCode == UP_ARROW) || (key == "S" || keyCode == DOWN_ARROW)){
    Player1.stop()
  }
}
