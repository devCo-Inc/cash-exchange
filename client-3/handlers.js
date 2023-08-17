'use strict';

const { io } = require('socket.io-client');
const events = io('ws://localhost:3000');
const { EventNames } = require('../utilities');

const Chance = require('chance');
const chance = new Chance();

function sendEvent() {
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
  };
  console.log(
    `Client 3 - ${event.type} - ${event.date} - ${event.account} - ${event.amount} , ${event.transactionId}`
  );
  events.emit(EventNames.send, payload);
}

// function startClient(client) {
//   console.log('Client 3 started ...');
//   client.emit(EventNames.receive, (payload) =>
//     console.log(`Client 3 - ${payload} has been received`)
//   );
//   function ready() {
//     sendEvent();
//     setTimeout(ready, chance.integer({ min: 1000, max: 5000 }));
//   }
//   ready();
// }
function startClient(client) {
  console.log('Client 3 started ...');
  client.emit(EventNames.receive, (payload) =>
    console.log(`Client 3 - ${payload} has been received`)
  );

  let loopCounter = 0;
  const maxLoopIterations = 10; // Set the desired number of iterations

  function ready() {
    if (loopCounter >= maxLoopIterations) {
      console.log('Max Transaction Meet For The Day.');
      return; // Exit the loop
    }

    sendEvent();
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

