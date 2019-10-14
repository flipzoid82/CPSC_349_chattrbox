var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];

console.log('websockets server started');

ws.on('connection', function(socket) {
  console.log('client connection established');

  messages.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on('message', function(data) {
    console.log('message received: ' + data);
    //'/topic' command begin - extracts the first 6 characters of the message to see if it is a command (i.e /topic)
    if (data.substring(0, 6) === '/topic') {
      ws.clients.forEach(function(clientSocket) {
        //Sends to client: '*** Topic has changed to [new topic]'
        clientSocket.send('*** Topic has changed to \'' + data.substring(7) + '\'')
      });
      //Place the topic at the beginning of the messages array
      messages.unshift('*** Topic is \'' + data.substring(7) + '\'');
    } else {
      messages.push(data);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data)
      });
    }
  });
});
