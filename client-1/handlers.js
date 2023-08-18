'use strict';
const { EventNames, chance } = require('../utilities');

const event = {
  name: chance.name(),
  account: chance.integer({ min: 1, max: 100 }),
  amount: chance.dollar(),
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
  client: EventNames.client3,
};

function sendEvent(client) {
  console.log(
    `Client 1 - ${event.type} - ${event.date} - ${event.account} - ${event.amount} , ${event.transactionId}`
  );
  client.emit(EventNames.connect, payload.client);
  client.emit(EventNames.send, { target: EventNames.client3, ...payload });
  client.emit(EventNames.send, { target: EventNames.client2, ...payload });
}

function startClient(client) {
  console.log('Client 1 started ...');
  let loopCounter = 0;
  const maxLoopIterations = 10; // Set the desired number of iterations

  function ready() {
    if (loopCounter >= maxLoopIterations) {
      console.log('Max Transaction Meet For The Day.');
      return; // Exit the loop
    }
    sendEvent(client);
    setTimeout(() => {
      loopCounter++;
      ready(); // Continue the loop
    }, chance.integer({ min: 1000, max: 5000 }));
  }
  ready();
}

module.exports = {
  startClient,
};
