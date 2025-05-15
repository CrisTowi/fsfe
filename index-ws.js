const express = require('express');
const server = require('http').createServer();
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

server.on('request', app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ server: server });


wss.on('connection', (ws) => {
  const numClients = wss.clients.size;
  console.log('Clients connected', numClients);

  wss.broadcast(`Current number of clients: ${numClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send(`Welcome to the server!`);
  }

  ws.on('message', (message) => {
    console.log('Received message:', message.toString());
    wss.broadcast(`Client ${numClients} says: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcast(`Client disconnected: ${numClients}`);
  });
});

wss.broadcast = function broadcast(message) {
  wss.clients.forEach((client) => {
    client.send(message);
  });
};
