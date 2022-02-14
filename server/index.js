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
let activeUsersCount = 0;
const chatsNamespace = io.of('chats');
chatsNamespace.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID != '') {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.uid = session.uid;
      socket.userData = session.userData;
      return next();
    }
  }
  const { userName, auid, photoURL, lastSeen } = socket.handshake.auth;
  if (!(userName && auid)) {
    return next(new Error('Auth Required'));
  }
  socket.userData = { userName, auid, photoURL, lastSeen };
  socket.sessionID = randomId();
  socket.uid = randomId();
  next();
});

chatsNamespace.on('connection', (socket) => {
  activeUsersCount++;
  // persist session
  sessionStore.saveSession(socket.sessionID, {
    uid: socket.uid,
    userData: socket.userData,
    connected: true,
  });
  socket.emit('session', { sessionID: socket.sessionID, uid: socket.uid });
  // join the "userID" room
  socket.join(socket.uid);

  const users = [];
  const messagesPerUser = new Map();
  messageStore.findMessagesForUser(socket.uid).forEach((message) => {
    const { from, to } = message;
    const otherUser = socket.uid === from ? to : from;
    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message);
    } else {
      messagesPerUser.set(otherUser, [message]);
    }
  });
  sessionStore.findAllSessions().forEach((session) => {
    console.log(messagesPerUser.get(session.uid));
    users.push({
      uid: session.uid,
      userData: session.userData,
      connected: session.connected,
      messages: messagesPerUser.get(session.uid) || [],
    });
  });

  socket.emit('users', users);
  // notify existing users
  socket.broadcast.emit('user_connected', {
    uid: socket.uid,
    userData: socket.userData,
    connected: true,
    messages: [],
  });

  // forward the private message to the right recipient (and to other tabs of the sender)
  socket.on('private_message', ({ message, to }) => {
    console.log('message', message, to);
    const _message = {
      message,
      from: socket.uid,
      to,
    };
    socket.to(to).to(socket.uid).emit('private_message', _message);
    messageStore.saveMessage(_message);
  });
  socket.on('disconnect', async () => {
    activeUsersCount--;
    const matchingSockets = await io.in(socket.uid).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit('user_disconnected', socket.uid);
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        uid: socket.uid,
        userData: socket.userData,
        connected: false,
      });
    }
    chatsNamespace.emit('active_users_count', { count: activeUsersCount });
  });
  // ...
  chatsNamespace.emit('active_users_count', { count: activeUsersCount });
});

httpServer.listen(PORT, () => {
  console.log(`Server listeing on ${PORT}...`);
});
