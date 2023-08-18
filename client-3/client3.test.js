const { startClient } = require('./handlers');
const { EventNames } = require('../utilities');
const { Server } = require('socket.io');
const { io } = require('socket.io-client');
const Chance = require('chance');

// Mocking the socket.io server
const ioServer = new Server();
const port = 3000;
ioServer.listen(port);

// Mocking the client socket
const clientSocket = io(`http://localhost:${port}`);

// Mocking the Chance library to make it deterministic for testing
jest.mock('chance', () => {
  return jest.fn(() => ({
    name: jest.fn(),
    integer: jest.fn(),
    dollar: jest.fn(),
    date: jest.fn(),
    pickone: jest.fn(),
    guid: jest.fn(),
  }));
});

describe('Client Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    ioServer.close();

    clientSocket.close();
  });

  it('should start the client and emit events', async () => {
    // Mock the emit function of the client socket
    clientSocket.emit = jest.fn();

    // Mock the asynchronous setTimeout function to resolve immediately
    jest.spyOn(global, 'setTimeout').mockImplementation((fn) => fn());

    // Mock the console.log function
    const consoleLogSpy = jest.spyOn(console, 'log');

    startClient(clientSocket);

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay based on your needs

    expect(clientSocket.emit).toHaveBeenCalledTimes(30);

    // Ensure that the console.log statements are called as expected
    expect(consoleLogSpy).toHaveBeenCalledWith('Client 3 started ...');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Max Transaction Meet For The Day.'
    );
    // You can add more expectations for console.log if needed
  });

  // it('should emit a withdrawal event', async () => {
  //   // Mock the emit function of the client socket
  //   clientSocket.emit = jest.fn();

  //   // Mock the asynchronous setTimeout function to resolve immediately
  //   jest.spyOn(global, 'setTimeout').mockImplementation((fn) => fn());

  //   startClient(clientSocket);

  //   await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay based on your needs

  //   // Ensure that the emit function is called with the expected event name
  //   expect(clientSocket.emit).toHaveBeenCalledWith(
  //     EventNames.send,
  //     expect.objectContaining({ event: 'withdraw' })
  //   );

  //   // You can further assert specific properties of the payload if needed
  // });

  it('should handle errors gracefully', async () => {
    // Mock the emit function of the client socket to throw an error
    clientSocket.emit = jest.fn(() => {
      throw new Error('Test error');
    });

    // Mock console.error to capture error messages
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    startClient(clientSocket);

    // Wait for events to be emitted (you can adjust this delay based on your needs)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Ensure that the error messages are logged
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error sending event: Test error'
    );
  });
});
