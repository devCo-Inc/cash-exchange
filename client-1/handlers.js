'use strict';

const { chance } = require('chance');

function createPayload() {
  const event = {
    name: chance.name(),
    account: chance.integer({min:1, max: 100}),
    amount: chance.date({string: true }),
    type: chance.pickone(['deposit', 'withdraw']),
    transactionId: chance.guid(),
  };

  const payload = {
    event: event.type,
    date: event.date,
    account: event.account,
    amount: event.amount,
    transactionId: event.transactionId
  };
}
