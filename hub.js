const { Server } = require('socket.io');
const { EventNames } = require('./utilities');
const io = new Server();

io.listen(3000);

const caps = io.of('/caps');


function handleSend(payload, socket) {
  console.log('The money has been sent', payload.transactionId);
  if(payload.target === EventNames.client1){
    io.to(EventNames.client1).emit(EventNames.send, payload);
  }
  else if (payload.target === EventNames.client2){
    io.to(EventNames.client2).emit(EventNames.client2, payload);
  }
  else if (payload.target === EventNames.client3){
    io.to(EventNames.client3).emit(EventNames.client3, payload);
  }
  else if (payload.target === EventNames.client4){
    io.to(EventNames.client4).emit(EventNames.client4, payload);
  }
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
  socket.on('client', (client) => {
    if(client === EventNames.client1){
      socket.join(EventNames.client1);
    }
    else if(client === EventNames.client2){
      socket.join(EventNames.client2);
    }
    else if(client === EventNames.client3){
      socket.join(EventNames.client3);
    }
    else if(client === EventNames.client4){
      socket.join(EventNames.client4);
    }
  });
  socket.on(EventNames.send, (payload) => handleSend(payload, socket));
  socket.on(EventNames.received, handleDelivered);
}

function startServer() {
  console.log('The server has been started');
  caps.on('connection', (socket) => handleConnection(socket));
}

module.exports = {
  startServer,
  handleSend,
  handleDelivered,
  io,
  caps,
};
