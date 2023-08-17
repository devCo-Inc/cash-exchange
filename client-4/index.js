'use strict';

const { io } = require('socket.io-client');
const {startClient} = require('./handlers');

const client = io('ws//localhost:3000');

startClient(client);