const chance = require('chance')();

const EventNames = {
  send: 'send',
  // inTransit: 'inTransit',
  received: 'received',
};

module.exports = { chance, EventNames };
