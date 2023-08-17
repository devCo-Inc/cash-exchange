const { io } = require('socket.io-client');

const events = io('ws://localhost:3000');

const { startClient } = require('./handlers');

startClient(events);
