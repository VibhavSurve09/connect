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
const crypto = require('crypto');
const randomId = () => crypto.randomBytes(8).toString('hex');

const { InMemorySessionStore } = require('./sessionStore');
const sessionStore = new InMemorySessionStore();

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
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    console.log('session', session);
    if (session) {
      socket.sessionID = sessionID;
      socket.uid = session.uid;
      socket.userData = session.userData;
      return next();
    }
  }
  const { userName, auid } = socket.handshake.auth;
  if (!(userName && auid)) {
    return next(new Error('Auth Required'));
  }
  socket.userData = { userName, auid };
  socket.sessionID = randomId();
  socket.uid = randomId();

  next();
});

chatsNamespace.on('connection', (socket) => {
  // persist session
  console.log(socket.id);
  sessionStore.saveSession(socket.sessionID, {
    uid: socket.uid,
    userData: socket.userData,
    connected: true,
  });
  socket.emit('session', { sessionID: socket.sessionID, uid: socket.uid });
  // join the "userID" room
  socket.join(socket.userID);

  const users = [];
  sessionStore.findAllSessions().forEach((session) => {
    users.push({
      uid: session.uid,
      userData: session.userData,
      connected: session.connected,
    });
  });
  socket.emit('users', users);

  // forward the private message to the right recipient (and to other tabs of the sender)
  socket.on('private message', ({ message, to }) => {
    socket.to(to).to(socket.uid).emit('private message', {
      message,
      from: socket.uid,
      to,
    });
  });
  socket.on('disconnect', async () => {
    const matchingSockets = await io.in(socket.uid).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit('user disconnected', socket.uid);
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        uid: socket.uid,
        userData: socket.userData,
        connected: false,
      });
    }
  });
  // ...
  // chatsNamespace.emit('active_users_count', { count: allActiveUsersCount });
});

httpServer.listen(PORT, () => {
  console.log(`Server listeing on ${PORT}...`);
});
