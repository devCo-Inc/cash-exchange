const { io } = require('socket.io-client');
const events = io('ws://localhost:3000');
const { chance, eventListener: eventListener } = require('../utils');

function sendEvent() {
  const event = {
    name: chance.name(),
    account: chance.integer({ min: 1, max: 100 }),
    amount: chance.integer({ min: 1, max: 1000 }),
    date: chance.date({ string: true }),
    type: chance.pickone(['deposit', 'withdraw']),
    transactionId: chance.guid(),
  };

  const payload = {
    event: 'deposit',
    date: event.date,
    account: event.account,
    amount: event.amount,
    transactionId: event.transactionId,
  };
  console.log(
    `Client 3 - ${event.type} - ${event.date} - ${event.account} - ${event.amount}`
  );
  events.emit('deposit', payload);
}
sendEvent();
eventListener(events);

const { startClient } = require('./handlers');

startClient(client);
