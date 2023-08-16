
const { Server } = require('socket.io');
const { EventNames } = require('./utilities');
const { chance } = require('./utilities');
const io = new Server();

io.listen(3000);

const caps = io.of('/caps');

function handleSend(payload) {
  console.log('The money has been sent', payload.orderId);
  socket.emit('send', { message: 'sent acknowledged' });
  caps.emit(events.received, {
    message: ' The money is ready to be received',
    ...payload,
  });
}

function handleDelivered(payload) {
  console.log(`the money for ${payload.customerId} has been received`);
  caps.emit(events.received, {
    orderId: payload.orderId,
  });
}

function handleConnection(socket) {
  console.log('we have a new connection', socket.id);

  socket.on(events.send, (payload) => handleSend(payload, socket));
  socket.on(events.received, handleDelivered);
}

function startServer() {
  console.log('The server has been started');
  const name = chance.name();
  console.log(`Hello, ${name}!`);
  caps.on('connection', handleConnection);
}

module.exports = {
  startServer,
  handleSend,
  handleDelivered,
  io,
  caps,
};

