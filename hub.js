const { Server } = require('socket.io');
const { EventNames } = require('./utilities');
const io = new Server();

io.listen(3000);

const caps = io.of('/caps');

function handleSend(payload, socket) {
  console.log('The money has been sent', payload.transactionId);
  socket.emit('send', { message: 'sent acknowledged' });
  caps.emit(EventNames.received, {
    message: ' The money is ready to be received',
    ...payload,
  });
}

function handleDelivered(payload) {
  console.log(`the money for ${payload.name} has been received`);
  caps.emit(EventNames.received, {
    orderId: payload.transactionId,
  });
}

function handleConnection(socket) {
  console.log('we have a new connection', socket.id);

  socket.on(EventNames.send, (payload) => handleSend(payload, socket));
  socket.on(EventNames.received, handleDelivered);
}

function startServer() {
  console.log('The server has been started');
  caps.on('connection', handleConnection);
}

module.exports = {
  startServer,
  handleSend,
  handleDelivered,
  io,
  caps,
};
