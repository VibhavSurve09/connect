const { createServer } = require('http');
const { Server } = require('socket.io');
const httpServer = createServer();
const PORT = 8000;
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
//Chats Namespace
const chatsNamespace = io.of('chats');
chatsNamespace.use((socket, next) => {
  const { userName, auid } = socket.handshake.auth;
  if (!(userName && auid)) {
    return next(new Error('Auth Required'));
  }
  socket.userData = { userName, auid };
  next();
});
chatsNamespace.on('connection', (socket) => {
  const socketActiveUsers = [];
  for (let [id, socket] of chatsNamespace.sockets) {
    socketActiveUsers.push({
      uid: id,
      userData: socket.userData,
    });
  }
  chatsNamespace.emit('users', socketActiveUsers);

  socket.on('private_message', ({ to, message }) => {
    socket.to(to).emit('private_message', { from: socket.id, message });
  });
  // ...
});

httpServer.listen(PORT, () => {
  console.log(`Server listeing on ${PORT}...`);
});
