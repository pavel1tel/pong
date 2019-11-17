const socket = io('http://localhost:3000');
const CANVAS_HEIGHT = 500;
const CANVAS_WITDTH = 800;
const dSize = 10;
const dots = [];

function setup(){
  noStroke();
  fill(255,100);
  background(0);
  createCanvas(CANVAS_WITDTH, CANVAS_HEIGHT);
  for (let y = dSize/2; y<CANVAS_HEIGHT; y+=dSize*2) {
    dots.push(createVector(width/2-dSize/2, y));
  }
  socket.on('newPosition', data => {
    noStroke();
    fill(255,100);
    background(0);
    drawSqueres();
    drawPlayers();
    drawBall();


    function drawSqueres () {
      for (let i = 0; i<dots.length; i++){
  	    const x = dots[i].x;
    		const y = dots[i].y;
    		rect(x, y, dSize, dSize);
  		};
    };

    function drawPlayers () {
      for(let player of data.players){
  		  noStroke();
  		  fill(255);
  		  rect(player.self.pos.x, player.self.pos.y, player.self.width, player.self.height);
  		};
    };

    function drawBall () {
      noStroke();
      fill(255);
      console.log(data);
      ellipse(data.ball.pos.x, data.ball.pos.y, data.ball.radius);
    }
  });
};

document.onkeydown = event => {
  if(event.keyCode === 83){ //s
    socket.emit('keyPressed', {inputId : 'down', state : true});
  }else if(event.keyCode === 87) { //w
    socket.emit('keyPressed', {inputId : 'up', state : true});
  };
}; 

document.onkeyup = event => {
  if(event.keyCode === 83){ //s
    socket.emit('keyPressed', {inputId : 'down', state : false});
  }else if(event.keyCode === 87) { //w
    socket.emit('keyPressed', {inputId : 'up', state : false});
  };
}; 

