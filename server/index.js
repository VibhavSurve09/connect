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
const { InMemoryMessageStore } = require('./messageStore');
const messageStore = new InMemoryMessageStore();
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
  console.log('New Req');
  const sessionID = socket.handshake.auth.sessionID;
  console.log('Sesison ID', sessionID);
  if (sessionID != '') {
    console.log('No session Id');
    const session = sessionStore.findSession(sessionID);
    console.log('Session', session);
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
  console.log('Going to socket');
  next();
});

chatsNamespace.on('connection', (socket) => {
  // persist session
  console.log('ID', socket.id);
  sessionStore.saveSession(socket.sessionID, {
    uid: socket.uid,
    userData: socket.userData,
    connected: true,
  });
  socket.emit('session', { sessionID: socket.sessionID, uid: socket.uid });
  // join the "userID" room
  socket.join(socket.userID);

  const users = [];
  const messagesPerUser = new Map();
  messageStore.findMessagesForUser(socket.uid).forEach((message) => {
    const { from, to } = message;
    const otherUser = socket.userID === from ? to : from;
    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message);
    } else {
      messagesPerUser.set(otherUser, [message]);
    }
  });

  sessionStore.findAllSessions().forEach((session) => {
    users.push({
      uid: session.uid,
      userData: session.userData,
      connected: session.connected,
      messages: messagesPerUser.get(session.uid) || [],
    });
  });
  socket.emit('users', users);
  // notify existing users
  socket.broadcast.emit('user connected', {
    uid: socket.uid,
    userData: socket.userData,
    connected: true,
    messages: [],
  });
  console.log('Users', users);
  // forward the private message to the right recipient (and to other tabs of the sender)
  socket.on('private message', ({ message, to }) => {
    socket.to(to).to(socket.uid).emit('private message', {
      message,
      from: socket.uid,
      to,
    });
    messageStore.saveMessage(message);
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
