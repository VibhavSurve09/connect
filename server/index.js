const { createServer } = require('http');
const { Server } = require('socket.io');
const httpServer = createServer();
const PORT = 8001;
const io = new Server(httpServer, {
  cros: {
    origin: '*',
  },
  /* options */
});
//For developement only
io.engine.on('initial_headers', (headers, req) => {
  headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
  headers['Access-Control-Allow-Credentials'] = true;
});

io.engine.on('headers', (headers, req) => {
  headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
  headers['Access-Control-Allow-Credentials'] = true;
});

io.use((socket, next) => {
  const { userName, auid } = socket.handshake.auth;
  if (!(userName && auid)) {
    return next(new Error('Auth Required'));
  }
  socket.userData = { userName, auid };
  next();
});
io.on('connection', (socket) => {
  const socketActiveUsers = [];
  for (let [id, socket] of io.of('/').sockets) {
    socketActiveUsers.push({
      uid: id,
      userData: socket.userData,
    });
  }
  io.emit('users', socketActiveUsers);
  console.log(socketActiveUsers);
  // ...
});

httpServer.listen(PORT, () => {
  console.log(`Server listeing on ${PORT}...`);
});
