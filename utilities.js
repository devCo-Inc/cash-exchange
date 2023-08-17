const chance = require('chance')();

const EventNames = {
  send: 'send',
  // inTransit: 'inTransit',
  received: 'received',

  connect: 'client',
  // disconnects from room

  client1: 'Bob',
  client2: 'Sara',
  client3: 'Jon',
  client4: 'Julio'
// used to connect to each clients room.
};

module.exports = { EventNames, chance };
