'use strict';

const { io } = require('socket.io-client');
const {EventNames} = require('../utilities');
const {startClient} = require('./handlers');

const client = io('ws//localhost:3000');

startClient(client);

