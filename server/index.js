const { createServer } = require('http');
const { Server } = require('socket.io');
const httpServer = createServer();
const PORT = 8000;
const io = new Server(httpServer, {
  cros: {
    origin: 'http://localhost:3000',
  },
  /* options */
});
io.use((socket, next) => {
  const userData = socket.handshake.auth;
  console.log('The ddata is', userData);
  console.log(socket.handshake);
});
io.on('connection', (socket) => {
  // ...
});

httpServer.listen(PORT, () => {
  console.log(`Server listeing on ${PORT}...`);
});
