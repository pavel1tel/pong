const socket = new WebSocket('ws://127.0.0.1:8000');

socket.onopen = () => {
    console.log('connected');
  };
  socket.onclose = () => {
    console.log('closed');
  };
